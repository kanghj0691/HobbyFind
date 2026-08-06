'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
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
import { signupSchema, type SignupFormValues } from '@/lib/validations/auth';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const message = responseData.message || '회원가입 중 오류가 발생했습니다.';
        setErrorMessage(message);
        toast({
          title: '회원가입 실패',
          description: message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: '회원가입 성공',
        description: '회원가입이 완료되었습니다. 자동으로 로그인됩니다.',
      });

      const signInResult = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResult?.ok) {
        router.push('/');
        router.refresh();
        return;
      }

      toast({
        title: '자동 로그인 실패',
        description: '회원가입은 완료되었습니다. 로그인 페이지에서 다시 시도해주세요.',
        variant: 'destructive',
      });
      router.push('/login');
    } catch {
      const message = '회원가입 중 오류가 발생했습니다.';
      setErrorMessage(message);
      toast({
        title: '회원가입 실패',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthPageLayout
      title="회원가입"
      description="새로운 계정을 만들어 취미를 북마크하고 관리하세요"
      footerLink={{
        label: '이미 계정이 있으신가요?',
        href: '/login',
        linkText: '로그인',
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>사용자명</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-description" />
                    <Input
                      {...field}
                      type="text"
                      placeholder="사용자명을 입력하세요"
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
                      placeholder="비밀번호를 입력하세요 (6자 이상)"
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-description" />
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="비밀번호를 다시 입력하세요"
                      className="rounded-xl border pl-10 pr-10"
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                      aria-label={showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                    >
                      {showConfirmPassword ? (
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

          <FormField
            control={form.control}
            name="agreeToTerms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-3 rounded-xl border border-border px-4 py-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal text-body">
                      서비스 이용약관 및 개인정보 처리방침에 동의합니다.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </div>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover"
            disabled={isLoading}
          >
            {isLoading ? '가입 중...' : '회원가입'}
          </Button>
        </form>
      </Form>
    </AuthPageLayout>
  );
}
