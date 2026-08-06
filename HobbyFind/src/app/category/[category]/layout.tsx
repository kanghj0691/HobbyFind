import type { Metadata } from 'next';
import { CATEGORY_INFO, CATEGORIES, isCategoryId } from '@/constants/categories';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (!isCategoryId(category)) {
    return {
      title: '카테고리를 찾을 수 없습니다 - HobbyFind',
      description: '요청하신 카테고리를 찾을 수 없습니다.',
    };
  }

  const info = CATEGORY_INFO[category];

  return {
    title: `${info.name} 취미 - HobbyFind`,
    description: info.description,
    keywords: `${info.name}, 취미, 취미 추천, ${info.name} 취미, HobbyFind`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.id }));
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
