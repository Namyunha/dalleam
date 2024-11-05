import React from 'react';
import MainTab from '@/components/tab/MainTab';
import SubTab from '@/components/tab/SubTab';
import Tabs from '@/components/tab/Tabs';

export default function ReviewsTabs() {
  return (
    <Tabs>
      <MainTab />
      <SubTab />
    </Tabs>
  );
}
