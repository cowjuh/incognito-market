import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    isDisabled?: boolean;
    isComingSoon?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, isDisabled, isComingSoon }) => {
    const router = useRouter();
    const isActive = router.asPath.startsWith(href);

    const linkClass = isActive
        ? 'font-semibold text-primary hover:text-primary-dark'
        : 'text-neutral-600 hover:text-neutral-900';

    return (
        <div className={`flex items-center gap-2 h-6 w-full justify-between ${isDisabled ? 'pointer-events-none' : 'cursor-pointer'}`}>
            <Link href={href} className={cn('transition-colors duration-150 ease-in-out', linkClass, isDisabled && 'text-neutral-300 hover:text-neutral-300')}>
                {children}
            </Link>
            {isComingSoon && <div className="bg-neutral-200 rounded-full px-2 py-1 text-xs font-medium text-neutral-500">Coming soon</div>}
        </div>
    );
};

export default NavLink;