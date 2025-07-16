import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'ឈ្មោះត្រូវតែមានយ៉ាងហោចណាស់ 2 តួអក្សរ')
    .max(50, 'ឈ្មោះមិនអាចលើស 50 តួអក្សរ'),
  email: z
    .string()
    .email('សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[\d\s-()]+$/.test(val),
      'សូមបញ្ចូលលេខទូរសព្ទត្រឹមត្រូវ'
    ),
  department: z
    .string()
    .min(1, 'សូមជ្រើសរើសផ្នែក'),
  subject: z
    .string()
    .min(5, 'ប្រធានបទត្រូវតែមានយ៉ាងហោចណាស់ 5 តួអក្សរ')
    .max(100, 'ប្រធានបទមិនអាចលើស 100 តួអក្សរ'),
  message: z
    .string()
    .min(10, 'សារត្រូវតែមានយ៉ាងហោចណាស់ 10 តួអក្សរ')
    .max(1000, 'សារមិនអាចលើស 1000 តួអក្សរ'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;