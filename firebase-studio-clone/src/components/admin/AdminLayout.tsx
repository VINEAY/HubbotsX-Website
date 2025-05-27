"use client";

import { type ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulated authentication check
  useEffect(() => {
    const checkAuth = () => {
      // In a real app, this would check for a valid token or session
      // For demo purposes, we'll just simulate being logged in
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    // Simulate an API call delay
    setTimeout(checkAuth, 500);
  }, []);

  // If not logged in, redirect to login page
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Sidebar links
  const navLinks = [
    { title: "Dashboard", href: "/admin", icon: "📊" },
    { title: "Leads", href: "/admin/leads", icon: "👥" },
    { title: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      {/* Sidebar */}
      <div className="w-64 bg-black/50 border-r border-gray-800 hidden md:block">
        <div className="p-4 border-b border-gray-800">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="https://ext.same-assets.com/2510403415/3301625649.svg"
                alt="HubbotsX"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-white">HubbotsX</span>
          </Link>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Admin Panel
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => document.getElementById('mobile-sidebar')?.classList.toggle('translate-x-0')}
          className="bg-primary text-white p-3 rounded-full shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className="fixed inset-y-0 left-0 z-50 w-64 bg-black/95 transform -translate-x-full transition-transform duration-300 ease-in-out md:hidden"
      >
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="https://ext.same-assets.com/2510403415/3301625649.svg"
                alt="HubbotsX"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-white">HubbotsX</span>
          </Link>
          <button onClick={() => document.getElementById('mobile-sidebar')?.classList.remove('translate-x-0')}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Admin Panel
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => document.getElementById('mobile-sidebar')?.classList.remove('translate-x-0')}
                >
                  <span className="mr-3">{link.icon}</span>
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-black/40 border-b border-gray-800 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-white">{title}</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Admin User</span>
              <div className="w-8 h-8 bg-primary/30 rounded-full flex items-center justify-center text-primary">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}
