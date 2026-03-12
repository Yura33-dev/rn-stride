import { z } from 'zod';
import { TFunction } from 'i18next';

export const getRegistrationSchema = (t: TFunction) => {
  const emailSchema = z
    .email({ message: t('auth_validating.email.invalid') })
    .min(1, t('auth_validating.email.required'))
    .max(100, t('auth_validating.email.tooLong'));

  const passwordSchema = z
    .string({ message: t('auth_validating.password.required') })
    .min(1, t('auth_validating.password.required'))
    .min(8, t('auth_validating.password.tooShort'))
    .max(64, t('auth_validating.password.tooLong'))
    .regex(/[A-Z]/, t('auth_validating.password.noUppercase'))
    .regex(/[a-z]/, t('auth_validating.password.noLowercase'))
    .regex(/[0-9]/, t('auth_validating.password.noDigit'))
    .regex(/[!@#$%^&*]/, t('auth_validating.password.noSpecialChar'));

  return z
    .object({
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: z
        .string({ message: t('auth_validating.confirmPassword.required') })
        .min(1, t('auth_validating.confirmPassword.required')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth_validating.confirmPassword.mismatch'),
      path: ['confirmPassword'],
    });
};

export const getAuthorizationSchema = (t: TFunction) => {
  const emailSchema = z
    .email({ message: t('auth_validating.email.invalid') })
    .min(1, t('auth_validating.email.required'))
    .max(100, t('auth_validating.email.tooLong'));

  return z.object({
    email: emailSchema,

    password: z
      .string({ message: t('auth_validating.password.required') })
      .min(1, t('auth_validating.password.required'))
      .min(8, t('auth_validating.password.tooShort'))
      .max(64, t('auth_validating.password.tooLong')),
  });
};

export type AuthorizationFormData = z.infer<ReturnType<typeof getAuthorizationSchema>>;
export type RegistrationFormData = z.infer<ReturnType<typeof getRegistrationSchema>>;

export type AuthFormData = AuthorizationFormData | RegistrationFormData;
