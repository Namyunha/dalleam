import React from 'react';
import MyProfile from './Myprofile';
import MyGatheringTab from './MyGatheringTab';
import MyGatheringList from './MyGatheringList';

export default function MyPages() {
  return (
    <div className="w-347pxr md:w-700pxr lg:w-996pxr gap-4 lg:gap-30pxr">
      <MyProfile />
      <div className="flex flex-col px-4 md:px-6 py-6 border-t-2 border-gray-900 bg-white">
        <MyGatheringTab />
        <MyGatheringList />
      </div>
    </div>
  );
}
