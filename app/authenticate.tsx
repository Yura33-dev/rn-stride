import ControlledTextInput from '@/components/ui/controlled-text-input';
import CustomToast from '@/components/ui/CustomToast';
import ScrollViewContainer from '@/components/ui/scroll-view-container';
import SubmitButton from '@/components/ui/submit-btn';
import { auth } from '@/config/firebaseConfig';
import Colors from '@/constants/Colors';
import { getAuthorizationSchema, getRegistrationSchema } from '@/schemas';
import { AuthFormData } from '@/types';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, Pressable, Text, TextInput, View } from 'react-native';
import { toast } from 'sonner-native';

export default function AuthScreen() {
  const { t } = useTranslation();

  const { signIn } = useLocalSearchParams<{ signIn?: string }>();
  const isSignIn = !!signIn;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(isSignIn ? getAuthorizationSchema(t) : getRegistrationSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    reset({ email: '', password: '', confirmPassword: '' });
  }, [isSignIn, reset]);

  const onSubmit = async (data: AuthFormData) => {
    try {
      setIsSubmitting(true);
      if (isSignIn) {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        toast.custom(<CustomToast title={t('authenticate.toast.success_login')} />);
        router.replace('/(protected)/(tabs)/(tasks)');
      } else {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
        await signOut(auth);

        toast.custom(<CustomToast title={t('authenticate.toast.profile_created')} />);
        router.replace({ pathname: '/authenticate', params: { signIn: 'true' } });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            toast.error(t('authenticate.toast.inv_credential'));
            break;
          case 'auth/user-not-found':
            toast.error(t('authenticate.toast.inv_email'));
            break;
          case 'auth/wrong-password':
            toast.error(t('authenticate.toast.wrong_password'));
            break;
          case 'auth/too-many-requests':
            toast.error(t('authenticate.toast.many_requests'));
            break;
          case 'auth/invalid-email':
            toast.error(t('authenticate.toast.inv_email'));
            break;
          default:
            toast.error(t('authenticate.toast.error', { errorMessage: error.message }));
        }
      } else {
        toast.error(t('authenticate.toast.general_error'));
        console.error(error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1a237e', '#060B2900', '#1a237e']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollViewContainer>
          <View className="items-center">
            <View className="p-4 bg-primary/50 rounded-xl mb-6 justify-center items-center">
              {isSignIn ? (
                <MaterialIcons name="check-circle-outline" size={44} color={Colors.primary} />
              ) : (
                <MaterialIcons name="person-add-alt-1" size={44} color={Colors.primary} />
              )}
            </View>

            <Text className="font-bold text-3xl text-white mb-3 text-center">
              {isSignIn ? t('authenticate.header_signin') : t('authenticate.header_signup')}
            </Text>

            <Text className="text-gray-400 text-base text-center">
              {isSignIn ? t('authenticate.subheader_signin') : t('authenticate.subheader_signup')}
            </Text>
          </View>

          <View className="mt-12">
            <ControlledTextInput
              name="email"
              label={t('authenticate.form.email_input_label')}
              placeholder="name@example.com"
              errors={errors}
              control={control}
              returnKeyType="next"
              onNextElementFocus={() => passwordRef.current?.focus()}
            />

            <ControlledTextInput
              elementRef={passwordRef}
              name="password"
              label={t('authenticate.form.password_input_label')}
              placeholder={t('authenticate.form.password_input_placeholder')}
              containerClassName="mt-4"
              secureTextEntry
              errors={errors}
              control={control}
              returnKeyType="next"
              onNextElementFocus={() => confirmPasswordRef.current?.focus()}
            />

            {!isSignIn && (
              <ControlledTextInput
                elementRef={confirmPasswordRef}
                name="confirmPassword"
                label={t('authenticate.form.confirm_input_label')}
                placeholder={t('authenticate.form.confirm_input_placeholder')}
                containerClassName="mt-4"
                secureTextEntry
                errors={errors}
                control={control}
                returnKeyType="default"
              />
            )}

            <SubmitButton
              onPress={handleSubmit(onSubmit)}
              title={
                isSignIn
                  ? t('authenticate.form.submit_btn_signin')
                  : t('authenticate.form.submit_btn_signup')
              }
              className="min-h-16 mt-8"
              isSubmitting={isSubmitting}
              disabled={isSubmitting}
            />
          </View>

          <View className="mt-12 justify-center items-center flex-row gap-1">
            <Text className="text-gray-600">
              {isSignIn ? t('authenticate.suggest_to_signup') : t('authenticate.suggest_to_signin')}
            </Text>

            <Pressable
              onPress={() =>
                router.replace({
                  pathname: '/authenticate',
                  params: isSignIn ? { signIn: null } : { signIn: 'true' },
                })
              }
            >
              <Text className="text-primary font-semibold">
                {isSignIn
                  ? t('authenticate.form.submit_btn_signup')
                  : t('authenticate.form.submit_btn_signin')}
              </Text>
            </Pressable>
          </View>
        </ScrollViewContainer>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
