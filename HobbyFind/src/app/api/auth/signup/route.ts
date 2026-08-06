import { NextRequest, NextResponse } from 'next/server';
import { createUser, CreateUserData } from '@/lib/auth-utils';
import { signupApiSchema } from '@/lib/validations/auth';
import { z } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signupApiSchema.parse(body);
    
    // 사용자 생성
    const user = await createUser(validatedData as CreateUserData);
    
    // 비밀번호 제외하고 응답
    const { password_hash, ...userWithoutPassword } = user;
    
    return NextResponse.json(
      { 
        message: '회원가입이 완료되었습니다.',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Signup API error:', error);
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: '입력 데이터가 올바르지 않습니다.',
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
