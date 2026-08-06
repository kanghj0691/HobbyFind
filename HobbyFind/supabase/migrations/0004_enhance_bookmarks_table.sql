-- Enhance bookmarks table for NextAuth + Supabase integration
BEGIN;

  ALTER TABLE public.bookmarks
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

  CREATE INDEX IF NOT EXISTS idx_bookmarks_user_created
    ON public.bookmarks(user_id, created_at DESC);

  DROP TRIGGER IF EXISTS update_bookmarks_updated_at ON public.bookmarks;
  CREATE TRIGGER update_bookmarks_updated_at
    BEFORE UPDATE ON public.bookmarks
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

  COMMENT ON TABLE public.bookmarks IS '사용자 북마크 테이블 (NextAuth user_id + hobbies.ts hobby_id)';
  COMMENT ON COLUMN public.bookmarks.user_id IS 'NextAuth 세션 사용자 UUID (public.users.id)';
  COMMENT ON COLUMN public.bookmarks.hobby_id IS '고정 취미 ID (src/lib/data/hobbies.ts)';

EXCEPTION
  WHEN others THEN
    RAISE NOTICE 'Error enhancing bookmarks table: %', SQLERRM;
END;
