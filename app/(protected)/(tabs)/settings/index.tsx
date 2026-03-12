import Header from '@/components/header';
import SubmitButton from '@/components/ui/submit-btn';
import ViewContainer from '@/components/view-container';
import { auth } from '@/config/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import { toast } from 'sonner-native';

export default function SettingsScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const logout = async () => {
    Alert.alert(t('ui_texts.for_sure_header'), t('ui_texts.on_logout.text'), [
      {
        text: t('ui_texts.cancel_button'),
        style: 'cancel',
      },
      {
        text: t('ui_texts.confirm_button'),
        style: 'destructive',
        onPress: async () => {
          try {
            setIsSubmitting(true);
            await signOut(auth);
            toast.info(t('ui_texts.toast.on_log_out'));
          } catch (error) {
            console.error(error);
          } finally {
            setIsSubmitting(false);
          }
        },
      },
    ]);
  };

  return (
    <ViewContainer>
      <Header title={t('screens.settings.header')} />

      <SubmitButton
        title={t('screens.settings.logout_btn')}
        onPress={logout}
        isSubmitting={isSubmitting}
        disabled={isSubmitting}
        className="mt-12"
      />
    </ViewContainer>
  );
}
