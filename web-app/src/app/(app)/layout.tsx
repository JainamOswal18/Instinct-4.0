import AppSidebar from '@/components/layout/app-sidebar';
import AppHeader from '@/components/layout/app-header';

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex-1 overflow-y-auto bg-background p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
