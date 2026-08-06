'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES, type CategoryId } from '@/constants/categories';
import { BarChart3 } from 'lucide-react';

interface CategoryStatsProps {
  stats: Record<string, number>;
  totalCount: number;
}

const CATEGORY_BAR_COLORS: Record<CategoryId, string> = {
  sports: 'bg-primary',
  intelligence: 'bg-brand-teal',
  art: 'bg-brand-gold',
};

export function CategoryStats({ stats, totalCount }: CategoryStatsProps) {
  const chartData = CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    count: stats[category.id] ?? 0,
  }));

  const maxCount = Math.max(...chartData.map((item) => item.count), 1);

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-title">
          <BarChart3 className="h-5 w-5 text-primary" />
          카테고리별 통계
        </CardTitle>
        <CardDescription className="text-description">
          북마크한 취미의 카테고리별 분포입니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {totalCount === 0 ? (
          <p className="py-8 text-center text-description">
            북마크한 취미가 없어 통계를 표시할 수 없습니다.
          </p>
        ) : (
          <>
            <div className="mb-8 flex h-52 items-end justify-center gap-6 sm:gap-10">
              {chartData.map((item) => {
                const height = item.count > 0 ? Math.max((item.count / maxCount) * 100, 12) : 0;

                return (
                  <div key={item.id} className="flex w-20 flex-col items-center gap-3">
                    <span className="text-sm font-semibold text-title">{item.count}</span>
                    <div className="flex h-40 w-full items-end">
                      <div
                        className={`w-full rounded-t-xl transition-all duration-300 ${CATEGORY_BAR_COLORS[item.id]}`}
                        style={{ height: `${height}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-body">{item.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-title">카테고리</th>
                    <th className="px-4 py-3 text-right font-medium text-title">개수</th>
                    <th className="px-4 py-3 text-right font-medium text-title">비율</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item) => (
                    <tr key={item.id} className="border-t border-border">
                      <td className="px-4 py-3 text-body">{item.name}</td>
                      <td className="px-4 py-3 text-right font-medium text-title">{item.count}</td>
                      <td className="px-4 py-3 text-right text-description">
                        {totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
