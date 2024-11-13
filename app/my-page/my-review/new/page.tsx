import { getInstance } from '@/utils/axios';

import NewReview from '../../_components/NewReview';

export default async function New() {
  const instance = getInstance();
  const res = await instance('/gatherings/joined', {
    params: {
      limit: 10,
      reviewed: false,
      completed: true,
      sortOrder: 'desc',
    },
  });

  return <NewReview initialReviews={res.data} />;
}
