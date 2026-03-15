
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, UserCircle } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { NavLink, userNavLinks, providerNavLinks, adminNavLinks } from '@/lib/nav-links';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { logout, getSession, type AuthSession } from '@/lib/auth';

export default function AppSidebar() {
  return (
    <>
      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <SidebarContent />
      </aside>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-50 bg-card">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-64 flex-col bg-card p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setIsClient(true);
    const currentSession = getSession();
    setSession(currentSession);
    const storedRole = currentSession?.role;
    if (storedRole === 'CITIZEN') {
      setNavLinks(userNavLinks);
    } else if (storedRole === 'ADMIN' || storedRole === 'EXECUTIVE') {
      setNavLinks(adminNavLinks);
    } else {
        setNavLinks(userNavLinks); // Default to user if no role
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline" prefetch={false}>
          <Logo className="h-8 w-8" />
          <span>EaaS Nexus</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto px-4 py-4 text-sm font-medium">
        {isClient ? (
          <ul className="grid gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SidebarLink link={link} pathname={pathname} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-9 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        )}
      </nav>
      <div className="mt-auto border-t p-4 space-y-2">
        {session && (
          <div className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground">
            <UserCircle className="h-4 w-4" />
            <div className="truncate">
              <p className="font-medium text-foreground truncate">{session.name}</p>
              <p className="truncate">{session.email}</p>
            </div>
          </div>
        )}
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

function SidebarLink({ link, pathname }: { link: NavLink; pathname: string }) {
  const isActive = pathname === link.href;
  return (
    <Link
      href={link.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
        isActive && 'bg-muted text-primary'
      )}
      prefetch={false}
    >
      <link.icon className="h-4 w-4" />
      {link.label}
    </Link>
  );
}
