import React from 'react';
import ListContainer from '@/components/list/ListContainer';
import ReviewsTabs from './ReviewsTabs';
import ReviewScores from './ReviewScores';
import ReviewList from './ReviewList';
import ReviewHeader from './ReviewHeader';

export default function Reviews() {
  return (
    <ListContainer>
      <ReviewHeader />
      <ReviewsTabs />
      <ReviewScores />
      <ReviewList />
    </ListContainer>
  );
}
