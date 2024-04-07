import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from './ui/dropdown-menu';
import { ExitIcon, PlusIcon } from '@radix-ui/react-icons';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  }

  const handleAddEntity = () => {
    router.push('/editor');
  }

  const handleMyShops = () => {
    router.push('/shops');
  }

  return (
    <nav className='flex items-center w-full justify-between px-4 py-2 border-b sticky top-0 h-10 z-20 bg-neutral-100'>
      <Link href="/" data-active={isActive('/')}>
        4o4.space
      </Link>
      <div className='flex items-center gap-2'>
        {session &&
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='flex items-center h-7 w-7'>
                <AvatarImage src={session.user.image} alt="Avatar" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 text-sm'>
              <DropdownMenuLabel>{session.user.name} ({session.user.email})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleMyShops} className='flex items-center gap-2'>
                <BuildingStorefrontIcon className='w-4 h-4' />
                <span>My shops</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleAddEntity} className='flex items-center gap-2'>
                <PlusIcon className='w-4 h-4' />
                <span>Create shop</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut} className='flex items-center gap-2'>
                <ExitIcon className='w-4 h-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        {!session &&
          <Link href="/api/auth/signin" data-active={isActive('/signin')}>
            Log in
          </Link>
        }
      </div>
    </nav>
  );
};

export default Header;