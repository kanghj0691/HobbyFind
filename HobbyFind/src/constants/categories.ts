export type CategoryId = 'sports' | 'intelligence' | 'art';

export const CATEGORIES = [
  { id: 'sports' as const, name: '운동형', href: '/category/sports' },
  { id: 'intelligence' as const, name: '지능형', href: '/category/intelligence' },
  { id: 'art' as const, name: '예술형', href: '/category/art' },
];

export const FILTER_CATEGORIES = [
  { id: 'all', name: '전체' },
  ...CATEGORIES.map(({ id, name }) => ({ id, name })),
];

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  sports: '운동형',
  intelligence: '지능형',
  art: '예술형',
};

export const CATEGORY_INFO: Record<
  CategoryId,
  { name: string; description: string }
> = {
  sports: {
    name: '운동형',
    description: '체력을 기르고 건강을 유지하는 활동적인 취미들을 모아보세요.',
  },
  intelligence: {
    name: '지능형',
    description: '두뇌를 자극하고 지식을 쌓는 지적 취미들을 모아보세요.',
  },
  art: {
    name: '예술형',
    description: '창의성을 발휘하고 아름다움을 창조하는 예술적 취미들을 모아보세요.',
  },
};

export function isCategoryId(value: string): value is CategoryId {
  return value in CATEGORY_INFO;
}
