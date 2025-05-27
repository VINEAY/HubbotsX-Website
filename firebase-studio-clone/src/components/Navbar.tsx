"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center space-x-1">
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-gray-300 text-sm font-medium">
            Home
          </Link>
          <Link href="https://firebase.google.com/docs/studio" className="text-white hover:text-gray-300 text-sm font-medium">
            Docs
          </Link>
          <Link href="/status" className="text-white hover:text-gray-300 text-sm font-medium">
            Status
          </Link>
          <Link href="https://firebase.google.com/support/troubleshooter/studio" className="text-white hover:text-gray-300 text-sm font-medium">
            Support
          </Link>
          <Link href="/auth/login" className="text-white hover:text-gray-300 text-sm font-medium">
            Log in
          </Link>
          <Link href="/auth/signup" className="button-primary">
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 p-4">
          <div className="space-y-4 py-2">
            <Link
              href="/"
              className="block text-white hover:text-gray-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="https://firebase.google.com/docs/studio"
              className="block text-white hover:text-gray-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/status"
              className="block text-white hover:text-gray-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Status
            </Link>
            <Link
              href="https://firebase.google.com/support/troubleshooter/studio"
              className="block text-white hover:text-gray-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            <Link
              href="/auth/login"
              className="block text-white hover:text-gray-300 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="button-primary inline-block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
