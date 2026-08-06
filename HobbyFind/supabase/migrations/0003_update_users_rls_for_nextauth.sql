-- Update users table RLS policies for NextAuth + service role key pattern
BEGIN;

  DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
  DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
  DROP POLICY IF EXISTS "Service role can manage users" ON public.users;

  CREATE POLICY "Service role can manage users" ON public.users
    FOR ALL
    USING (true)
    WITH CHECK (true);

EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Error updating users RLS policies: %', SQLERRM;
END;

COMMENT ON POLICY "Service role can manage users" ON public.users IS 'NextAuth 사용자를 위한 정책 - 서비스 롤 키로 인증';
