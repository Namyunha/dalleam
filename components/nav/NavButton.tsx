'use client';

import Link from 'next/link';
import Dropdown from '../Dropdown';
import Profile from '../profile/Profile';
import useUserStore from '@/stores/userStore';
import useDropdown from '@/hooks/useDropDown';

const logout = () => {
  document.cookie = 'token=; Max-Age=0; path=/';
  useUserStore.getState().clearUser();
  window.location.reload();
};

export default function NavButton() {
  const { dropdownRef, handleToggleDropdown } = useDropdown();
  const { user, hydrated } = useUserStore();
  console.log('user = ', user);

  if (!hydrated) return null;
  return user ? (
    <>
      <button className="dropdown-toggle" onClick={handleToggleDropdown}>
        <Profile image={user?.image} usedIn="navbar" />
      </button>
      <Dropdown ref={dropdownRef} ulClassName="top-27pxr md:top-29pxr right-10pxr">
        <Link href="/my-page">마이페이지</Link>
        <button onClick={logout}>로그아웃</button>
      </Dropdown>
    </>
  ) : (
    <Link href="/login">로그인</Link>
  );
}
