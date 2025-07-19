import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'សូមបញ្ចូលអ៊ីមែល')
    .email('សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ'),
  password: z
    .string()
    .min(1, 'សូមបញ្ចូលពាក្យសម្ងាត់')
    .min(6, 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 6 តួអក្សរ'),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'សូមបញ្ចូលឈ្មោះ')
    .min(2, 'ឈ្មោះត្រូវតែមានយ៉ាងហោចណាស់ 2 តួអក្សរ')
    .max(50, 'ឈ្មោះមិនអាចលើស 50 តួអក្សរ'),
  email: z
    .string()
    .min(1, 'សូមបញ្ចូលអ៊ីមែល')
    .email('សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ'),
  password: z
    .string()
    .min(1, 'សូមបញ្ចូលពាក្យសម្ងាត់')
    .min(8, 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ')
    .regex(/[A-Z]/, 'ពាក្យសម្ងាត់ត្រូវតែមានអក្សរធំយ៉ាងហោចណាស់ 1 តួ')
    .regex(/[a-z]/, 'ពាក្យសម្ងាត់ត្រូវតែមានអក្សរតូចយ៉ាងហោចណាស់ 1 តួ')
    .regex(/[0-9]/, 'ពាក្យសម្ងាត់ត្រូវតែមានលេខយ៉ាងហោចណាស់ 1 តួ'),
  confirmPassword: z.string().min(1, 'សូមបញ្ជាក់ពាក្យសម្ងាត់'),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'សូមយល់ព្រមលើលក្ខខណ្ឌ និងគោលការណ៍',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'ពាក្យសម្ងាត់មិនត្រូវគ្នា',
  path: ['confirmPassword'],
});

export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, 'កូដ OTP ត្រូវតែមាន 6 តួលេខ')
    .max(6, 'កូដ OTP ត្រូវតែមាន 6 តួលេខ')
    .regex(/^\d+$/, 'កូដ OTP ត្រូវតែជាលេខ'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'សូមបញ្ចូលអ៊ីមែល')
    .email('សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(1, 'សូមបញ្ចូលពាក្យសម្ងាត់ថ្មី')
    .min(8, 'ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 8 តួអក្សរ')
    .regex(/[A-Z]/, 'ពាក្យសម្ងាត់ត្រូវតែមានអក្សរធំយ៉ាងហោចណាស់ 1 តួ')
    .regex(/[a-z]/, 'ពាក្យសម្ងាត់ត្រូវតែមានអក្សរតូចយ៉ាងហោចណាស់ 1 តួ')
    .regex(/[0-9]/, 'ពាក្យសម្ងាត់ត្រូវតែមានលេខយ៉ាងហោចណាស់ 1 តួ'),
  confirmPassword: z.string().min(1, 'សូមបញ្ជាក់ពាក្យសម្ងាត់ថ្មី'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'ពាក្យសម្ងាត់មិនត្រូវគ្នា',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;