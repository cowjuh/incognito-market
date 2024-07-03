import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuLabel } from './ui/dropdown-menu';
import { ExitIcon, PersonIcon, PlusIcon } from '@radix-ui/react-icons';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import { Separator } from './ui/separator';
import { useIsVendorRoute } from 'hooks/useIsVendorRoute';
import SearchInput from './search/SearchInput';
import { Button } from './ui/button';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();
  const isVendorRoute = useIsVendorRoute();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  }

  const handleAddEntity = () => {
    router.push('/vendor/editor');
  }

  const handleMyShops = () => {
    if (session && session.user && session.user.id) {
      router.push(`/vendor/shops`);
    } else {
      console.error("No session found or user ID is missing");
    }
  }

  const handleMyAccount = () => {
    router.push(`/account`);
  }

  return (
    <nav className='flex items-center w-full justify-between px-4 py-2 border-b sticky top-0 h-12 z-20 bg-neutral-100'>
      <Link href="/" data-active={isActive('/')} className='flex items-center gap-2'>
        <span>4o4.space</span>
        {isVendorRoute &&
          <>
            <Separator className='h-5' orientation='vertical' />
            <span className='font-semibold text-sm'>Vendor</span>
          </>
        }
      </Link>
      <div className='flex items-center gap-2'>
        <SearchInput />
        {session &&
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='flex items-center h-7 w-7 border border-neutral-300'>
                <AvatarImage src={session.user.image} alt="Avatar" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-72 text-sm'>
              <DropdownMenuLabel className='p-3'>{session.user.name} ({session.user.email})</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleMyAccount} className='flex items-center gap-2 p-3'>
                <PersonIcon className='w-4 h-4' />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleMyShops} className='flex items-center gap-2 p-3'>
                <BuildingStorefrontIcon className='w-4 h-4' />
                <span>Dashboard</span>
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={handleAddEntity} className='flex items-center gap-2 p-3'>
                <PlusIcon className='w-4 h-4' />
                <span>Create shop</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut} className='flex items-center gap-2 p-3'>
                <ExitIcon className='w-4 h-4' />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        {!session &&
          <Link href="/api/auth/signin" data-active={isActive('/signin')}>
            <Button>
              Log in
            </Button>
          </Link>
        }
      </div>
    </nav>
  );
};

export default Header;