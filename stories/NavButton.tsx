'use client';

import Link from 'next/link';
import Dropdown from '@/components/Dropdown';
import Profile from '@/components/profile/Profile';
import useDropdown from '@/hooks/useDropDown';
import { useState, useEffect } from 'react';

type props = {
  userName?: string;
};

export default function NavButton({ userName }: props) {
  const [user, setUser] = useState('');
  useEffect(() => {
    userName && setUser(userName);
  }, []);
  // const user = {
  //   companyName: '마가의 다락방',
  //   createdAt: '2024-11-26T11:38:16.184Z',
  //   email: 'yunn75151@gmail.com',
  //   id: 881,
  //   image: null,
  //   name: '이민호',
  //   teamId: 'yunha',
  //   updatedAt: '2024-11-26T11',
  // };
  // console.log('userName = ', userName);
  const { dropdownRef, handleToggleDropdown } = useDropdown();

  return user ? (
    <>
      <button className="dropdown-toggle" onClick={handleToggleDropdown}>
        {/* <Profile image="@/public/icons/DefaultProfile.svg" usedIn="navbar" /> */}
        프로필사진
      </button>
      <Dropdown ref={dropdownRef} ulClassName="top-27pxr md:top-29pxr right-10pxr">
        <Link href="/my-page">마이페이지</Link>
        <button onClick={() => setUser('')}>로그아웃</button>
      </Dropdown>
    </>
  ) : (
    <button onClick={() => setUser('yunha')}>로그인</button>
  );
}
