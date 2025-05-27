"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Left side with form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <div className="mb-6">
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

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400 mb-8">{description}</p>

          {children}
        </div>
      </div>

      {/* Right side with image and gradient overlay */}
      <div className="hidden md:flex md:w-1/2 bg-black relative overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-orange-700/20 to-black/30 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://ext.same-assets.com/2510403415/3053245229.png"
            alt="HubbotsX Development Environment"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex flex-col justify-center items-center w-full p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Build with AI</h2>
          <p className="text-gray-200 text-center max-w-md">
            HubbotsX accelerates your entire development lifecycle with AI agents. Create backends, frontends, and mobile apps, all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
