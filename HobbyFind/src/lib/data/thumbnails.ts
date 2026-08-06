export const THUMBNAILS_DIR = '/thumbnails';

export const HOBBY_THUMBNAIL_FILES = {
  running: 'running.jpg',
  yoga: 'yoga.jpg',
  swimming: 'swimming.jpg',
  cycling: 'cycling.jpg',
  climbing: 'climbing.jpg',
  dance: 'dance.jpg',
  reading: 'reading.jpg',
  puzzle: 'puzzle.jpg',
  chess: 'chess.jpg',
  programming: 'programming.jpg',
  language: 'foreign_language_learning.jpg',
  photography: 'photography.jpg',
  painting: 'drawing.jpg',
  music: 'instrument_playing.jpg',
  cooking: 'cooking.jpg',
  calligraphy: 'calligraphy.jpg',
  pottery: 'pottery.jpg',
  gardening: 'gardening.jpg',
} as const;

export type HobbyThumbnailId = keyof typeof HOBBY_THUMBNAIL_FILES;

export function getHobbyThumbnailUrl(hobbyId: string): string {
  const filename = HOBBY_THUMBNAIL_FILES[hobbyId as HobbyThumbnailId];
  if (!filename) {
    throw new Error(`썸네일 이미지를 찾을 수 없습니다: ${hobbyId}`);
  }
  return `${THUMBNAILS_DIR}/${filename}`;
}
