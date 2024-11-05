import { SortType } from '@/types/gathering';
import { sortBy } from '@/types/review';

export function convertDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedHours = String(date.getHours()).padStart(2, '0');
  const formattedMinutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:00`;
}

export const convertSortType = (type: SortType) => {
  let convertType: sortBy;
  switch (type) {
    case '최신 순':
      convertType = 'createdAt';
      break;
    case '리뷰 높은 순':
      convertType = 'score';
      break;
    case '참여 인원 순':
      convertType = 'participantCount';
      break;
    case '마감 임박':
      convertType = 'registrationEnd';
  }
  return convertType;
};
