import MainTab from '@/components/tab/MainTab';
import SubTab from '@/components/tab/SubTab';
import Tabs from '@/components/tab/Tabs';
import React from 'react';
import Header from './Header';
import SavedGatheringList from './SavedGatheringList';

export default function SavedGatherings() {
  return (
    <div className="h-full px-4 pt-6 min-h-dvh bg-gray-50 pb-12pxr max-w-1200pxr w-375pxr md:w-744pxr md:pl-6 md:pr-25pxr md:pb-45pxr md:pt-46pxr lg:w-1200pxr lg:px-102pxr lg:pt-41pxr">
      <div className="flex flex-col">
        <Header />
        <Tabs>
          <MainTab />
          <SubTab />
        </Tabs>
        <SavedGatheringList />
      </div>
    </div>
  );
}
