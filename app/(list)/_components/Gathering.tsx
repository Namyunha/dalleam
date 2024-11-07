import React from 'react';
import ListContainer from '@/components/list/ListContainer';
import GatheringHeader from './gatheringCard/GatheringHeader';
import GatheringTabs from './gatheringCard/GatheringTabs';
import GatheringCList from './gatheringCard/GatheringList';

export default function Gathering() {
  return (
    <ListContainer>
      <GatheringHeader />
      <GatheringTabs />
      <GatheringCList />
    </ListContainer>
  );
}
