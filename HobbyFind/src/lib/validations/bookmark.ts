import { z } from 'zod';
import { HOBBY_IDS } from '@/lib/data/hobbies';

export const hobbyIdSchema = z
  .string()
  .min(1, '취미 ID가 필요합니다.')
  .refine((id) => HOBBY_IDS.includes(id), {
    message: '유효하지 않은 취미 ID입니다.',
  });

export const toggleBookmarkSchema = z.object({
  hobbyId: hobbyIdSchema,
});

export const removeBookmarkSchema = z.object({
  hobbyId: hobbyIdSchema,
});
