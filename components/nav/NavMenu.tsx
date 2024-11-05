'use client';

import useSavedStore from '@/stores/savedStore';
import useUserStore from '@/stores/userStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: '모임 찾기', href: '/' },
  { name: '찜한 모임', href: '/saved-gatherings' },
  { name: '모든 리뷰', href: '/reviews' },
];

const isSelected = (currentPathname: string, href: string) => currentPathname === href;

export default function NavMenu() {
  const pathname = usePathname();
  const { hydrated: savedStoreHydrated, savedGatherings } = useSavedStore();
  const { user, hydrated: userStoreHydrated } = useUserStore();

  const filteredList = savedGatherings.filter(
    (savedGathering) => savedGathering.userId === user?.id || savedGathering.userId === 1,
  );

  return (
    <>
      {links.map((link) => {
        if (
          link.href === '/saved-gatherings' &&
          savedStoreHydrated &&
          userStoreHydrated &&
          filteredList.length > 0
        ) {
          return (
            <Link className="flex items-center" key={link.href} href={link.href}>
              <span className={isSelected(pathname, link.href) ? 'text-gray-900' : ''}>
                {link.name}
              </span>
              <div className="ml-5pxr rounded-[8.5px] min-w-27pxr h-16pxr px-7pxr bg-gray-900 text-white text-xs text-center">
                {filteredList?.length}
              </div>
            </Link>
          );
        }

        return (
          <Link key={link.href} href={link.href}>
            <span className={isSelected(pathname, link.href) ? 'text-gray-900' : ''}>
              {link.name}
            </span>
          </Link>
        );
      })}
    </>
  );
}
