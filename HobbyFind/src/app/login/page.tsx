'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { AuthPageLayout } from '@/components/auth/auth-page-layout';
import { loginSchema, type LoginFormValues } from '@/lib/validations/auth';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        const message =
          result.error.includes('등록되지 않은 이메일')
            ? '등록되지 않은 이메일입니다. 회원가입을 먼저 진행해주세요.'
            : result.error.includes('비밀번호가 올바르지 않습니다')
              ? '비밀번호가 올바르지 않습니다. 다시 확인해주세요.'
              : result.error;

        setErrorMessage(message);
        toast({
          title: '로그인 실패',
          description: message,
          variant: 'destructive',
        });
        return;
      }

      if (result?.ok) {
        toast({
          title: '로그인 성공',
          description: '환영합니다!',
        });
        router.push('/');
        router.refresh();
        return;
      }

      const fallbackMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      setErrorMessage(fallbackMessage);
      toast({
        title: '로그인 실패',
        description: fallbackMessage,
        variant: 'destructive',
      });
    } catch {
      const fallbackMessage = '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
      setErrorMessage(fallbackMessage);
      toast({
        title: '오류 발생',
        description: fallbackMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout
      title="로그인"
      description="계정에 로그인하여 취미를 북마크하고 관리하세요"
      footerLink={{
        label: '아직 계정이 없으신가요?',
        href: '/signup',
        linkText: '회원가입',
      }}
    >
      {errorMessage && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {errorMessage}
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-description" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="이메일을 입력하세요"
                      className="rounded-xl border pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-description" />
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 입력하세요"
                      className="rounded-xl border pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-description" />
                      ) : (
                        <Eye className="h-4 w-4 text-description" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </form>
      </Form>
    </AuthPageLayout>
  );
}
