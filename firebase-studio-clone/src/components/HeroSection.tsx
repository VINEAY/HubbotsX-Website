import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-10 md:pt-32 md:pb-20 text-center">
      <div className="container px-6 mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          The full{" "}
          <span className="inline-flex items-center">
            <Image
              src="https://ext.same-assets.com/2510403415/1998606599.svg"
              alt="HubbotsX Logo"
              width={40}
              height={40}
              className="mx-2"
            />
          </span>{" "}
          stack
          <br />
          AI workspace
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          HubbotsX accelerates your entire development lifecycle with AI agents. Build backends, front ends, and mobile apps, all in one place.
        </p>
        <Link href="/auth/signup" className="button-primary text-lg py-3 px-6">
          Try HubbotsX
        </Link>

        <div className="mt-12 md:mt-20 relative max-w-5xl mx-auto">
          {/* Gradient overlay behind the image */}
          <div className="absolute inset-0 -top-40 -bottom-40 -left-40 -right-40 bg-gradient-to-b from-orange-600/20 via-orange-700/10 to-transparent rounded-full blur-3xl z-0" />

          <div className="relative rounded-xl overflow-hidden shadow-2xl z-10">
            <Image
              src="https://ext.same-assets.com/2510403415/3053245229.png"
              alt="HubbotsX Interface"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute -left-16 top-1/3 transform -translate-y-1/2 hidden md:block z-20">
            <Image
              src="https://ext.same-assets.com/2510403415/2838098675.svg"
              alt="Decorative element"
              width={60}
              height={60}
            />
          </div>
          <div className="absolute -right-16 bottom-1/3 transform translate-y-1/2 hidden md:block z-20">
            <Image
              src="https://ext.same-assets.com/2510403415/2018733539.svg"
              alt="Decorative element"
              width={60}
              height={60}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
