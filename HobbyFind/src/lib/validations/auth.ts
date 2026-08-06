import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

export const signupSchema = z
  .object({
    email: z.string().email('올바른 이메일 형식이 아닙니다.'),
    username: z
      .string()
      .min(2, '사용자명은 2자 이상이어야 합니다.')
      .max(20, '사용자명은 20자 이하여야 합니다.')
      .regex(/^[a-zA-Z0-9가-힣_]+$/, '사용자명은 영문, 숫자, 한글, 언더스코어만 사용할 수 있습니다.'),
    password: z
      .string()
      .min(6, '비밀번호는 6자 이상이어야 합니다.')
      .max(100, '비밀번호는 100자 이하여야 합니다.'),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((value) => value, {
      message: '약관에 동의해주세요.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;

export const signupApiSchema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  username: z
    .string()
    .min(2, '사용자명은 2자 이상이어야 합니다.')
    .max(20, '사용자명은 20자 이하여야 합니다.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
});
