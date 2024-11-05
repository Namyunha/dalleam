import React from 'react';
import MainTab from '@/components/tab/MainTab';
import SubTab from '@/components/tab/SubTab';
import CreateMeetingButton from './CreateMeetingButton';
import Tabs from '@/components/tab/Tabs';

const GatheringTabs = () => {
  return (
    <Tabs>
      <div className="flex w-full justify-between">
        <MainTab />
        <CreateMeetingButton />
      </div>
      <SubTab />
    </Tabs>
  );
};

export default GatheringTabs;
