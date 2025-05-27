import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function StatusPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="container sm:px-16 pb-20 max-w-screen-lg mx-auto">
          <header className="flex flex-col items-center justify-center space-y-6 pt-32 pb-20">
            <div className="flex gap-2 items-center">
              <Image
                src="https://ext.same-assets.com/3775340280/2345090792.svg"
                alt="Status check"
                width={64}
                height={64}
                className="w-16 h-16"
              />
            </div>
            <h1 className="text-3xl font-medium text-white text-center">All systems operational</h1>
            <p className="text-sm text-gray-600 text-center">No current availability issues</p>
            <Link href="#recent-events" className="button-outline">View recent events</Link>
          </header>

          <section className="pb-4">
            <h2
              id="status-per-service"
              className="flex flex-wrap-reverse gap-10 justify-between items-start mt-20 mb-6 scroll-m-12 h-fit"
            >
              <div className="text-lg text-gray-300 font-medium">Status per service area</div>
              <div className="text-sm flex flex-wrap items-center gap-x-10 gap-y-2">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                  <span className="text-gray-400">Available</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500" />
                  <span className="text-gray-400">Maintenance</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500" />
                  <span className="text-gray-400">Degradation</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-orange-500" />
                  <span className="text-gray-400">Disruption</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500" />
                  <span className="text-gray-400">Outage</span>
                </div>
              </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2 p-4 bg-black/60 rounded-xl">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <h3 className="font-medium text-gray-300 text-lg">Workspaces</h3>
                <span className="text-gray-600 font-medium text-xs md:pt-2">Last updated on <time>4/10/2025</time></span>
              </div>
              <div className="space-y-2 p-4 bg-black/60 rounded-xl">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <h3 className="font-medium text-gray-300 text-lg">Templates</h3>
                <span className="text-gray-600 font-medium text-xs md:pt-2">Last updated on <time>7/26/2024</time></span>
              </div>
              <div className="space-y-2 p-4 bg-black/60 rounded-xl">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <h3 className="font-medium text-gray-300 text-lg">Integrations</h3>
                <span className="text-gray-600 font-medium text-xs md:pt-2">Last updated on <time>5/10/2024</time></span>
              </div>
              <div className="space-y-2 p-4 bg-black/60 rounded-xl">
                <div className="flex gap-2 items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500" />
                </div>
                <h3 className="font-medium text-gray-300 text-lg">Gemini in HubbotsX</h3>
                <span className="text-gray-600 font-medium text-xs md:pt-2">Last updated on <time>9/15/2024</time></span>
              </div>
            </div>
          </section>

          <section className="pb-4 min-h-[700px]">
            <h2
              id="recent-events"
              className="flex flex-wrap-reverse gap-10 justify-between items-start mt-20 mb-6 scroll-m-12 h-fit"
            >
              <div className="text-lg text-gray-300 font-medium">Recent events</div>
            </h2>

            <div className="text-gray-600 p-6 border-b border-x border-gray-800 bg-black/60 rounded-xl mt-3">
              <div className="flex flex-wrap justify-between gap-4">
                <h3 className="inline-block font-medium text-gray-300">App Prototyping workspace can't be created</h3>
                <time className="text-sm">4/9/2025</time>
              </div>
              <p className="my-2">Service disruption for creating new App Prototyping workspaces due to exceptionally high demand</p>
              <div className="flex gap-2 text-sm text-gray-500 mt-2">
                <ul className="flex flex-wrap gap-x-2">
                  <li>workspaces</li>
                </ul>
              </div>
            </div>

            <div className="text-gray-600 p-6 border-b border-x border-gray-800 bg-black/60 rounded-xl mt-3">
              <div className="flex flex-wrap justify-between gap-4">
                <h3 className="inline-block font-medium text-gray-300">UI glitches</h3>
                <time className="text-sm">1/22/2025</time>
              </div>
              <p className="my-2">Mostly in flutter workspaces</p>
              <div className="flex gap-2 text-sm text-gray-500 mt-2">
                <ul className="flex flex-wrap gap-x-2">
                  <li>workspaces</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
