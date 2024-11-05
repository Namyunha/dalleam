import React from 'react';
import ListContainer from '@/components/list/ListContainer';
import GatheringHeader from './gatheringCard/GatheringHeader';
import GatheringTabs from './gatheringCard/GatheringTabs';
import GatheringCardList from './gatheringCard/GatheringCardList';

export default function Gathering() {
  return (
    <ListContainer>
      <GatheringHeader />
      <GatheringTabs />
      <GatheringCardList />
    </ListContainer>
  );
}
