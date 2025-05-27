import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-[calc(100%-32px)] md:w-[calc(100%-80px)] text-sm relative text-gray-500 bg-black p-6 md:p-12 rounded-3xl m-4 md:m-10 max-w-[1600px] xl:mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-10 pb-10 md:pb-40">
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
        <Link
          href="/status"
          className="flex items-center gap-2.5 text-xs uppercase font-mono hover:text-gray-700 transition-colors duration-300"
        >
          CURRENT STATUS
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-14 gap-y-10">
        <div className="font-medium flex flex-col">
          <h3 className="text-white mb-4">Learn</h3>
          <Link href="https://hubbots.com/docs" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Developer guides
          </Link>
          <Link href="https://hubbots.com/docs/reference" className="hover:text-gray-800 transition-colors duration-300 py-2">
            SDK & API reference
          </Link>
          <Link href="https://hubbots.com/docs/samples" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Samples
          </Link>
          <Link href="https://hubbots.com/docs/libraries" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Libraries
          </Link>
          <Link href="https://github.com/hubbots" className="hover:text-gray-800 transition-colors duration-300 py-2">
            GitHub
          </Link>
        </div>

        <div className="font-medium flex flex-col">
          <h3 className="text-white mb-4">Stay connected</h3>
          <Link href="https://hubbots.blog" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Check out the blog
          </Link>
          <Link href="https://www.reddit.com/r/Hubbots" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Find us on Reddit
          </Link>
          <Link href="https://x.com/Hubbots" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Follow on X
          </Link>
          <Link href="https://www.youtube.com/user/Hubbots" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Subscribe on YouTube
          </Link>
          <Link href="https://hubbots.com/community/events" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Attend an event
          </Link>
        </div>

        <div className="font-medium flex flex-col">
          <h3 className="text-white mb-4">Support</h3>
          <Link href="https://hubbots.com/support" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Contact support
          </Link>
          <Link href="https://stackoverflow.com/questions/tagged/hubbots" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Stack Overflow
          </Link>
          <Link href="https://hubbots.community" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Slack community
          </Link>
          <Link href="https://hubbots.com/support/releases" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Release notes
          </Link>
          <Link href="https://hubbots.com/brand-guidelines" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Brand guidelines
          </Link>
          <Link href="https://hubbots.com/docs/studio/troubleshooting" className="hover:text-gray-800 transition-colors duration-300 py-2">
            FAQs
          </Link>
        </div>

        <div className="font-medium flex flex-col">
          <h3 className="text-white mb-4">Tools for developers</h3>
          <Link href="https://developer.android.com" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Android
          </Link>
          <Link href="https://developer.chrome.com/home" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Chrome
          </Link>
          <Link href="https://hubbots.com" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Hubbots
          </Link>
          <Link href="https://cloud.google.com" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Google Cloud Platform
          </Link>
          <Link href="https://developers.google.com/products" className="hover:text-gray-800 transition-colors duration-300 py-2">
            All products
          </Link>
        </div>
      </div>

      <div className="flex max-sm:flex-col gap-6 justify-between items-center mt-16 pt-8 border-t border-gray-800">
        <Link href="https://developers.google.com/" className="flex items-center">
          <span className="text-white font-medium">Google for Developers</span>
        </Link>
        <div className="flex items-center gap-3 text-sm font-medium">
          <Link href="https://hubbots.com/terms" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Terms
          </Link>
          <Link href="https://hubbots.com/support/privacy" className="hover:text-gray-800 transition-colors duration-300 py-2">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
