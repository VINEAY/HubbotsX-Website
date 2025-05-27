import Link from "next/link";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <div className="container px-6 mx-auto py-16">
      {/* Get to work quickly section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Get to work quickly wherever you are
            </h2>
            <p className="text-gray-400 mb-6">
              Go from opening your browser to building in minutes, not hours. Import your existing repositories from GitHub, GitLab, Bitbucket, or your local machine, with support for most tech stacks. Or use the App Prototyping agent to quickly create a new application using natural language, mockups, drawing tools, and screenshots, or select from a large catalog of popular framework or language templates. You can also customize your environment with Nix.
            </p>
            <p className="text-gray-400 mb-8">
              HubbotsX is currently available with 3 workspaces at no cost during preview. Members of the
              <Link href="https://developers.google.com/program" className="text-primary mx-1 hover:underline">
                Google Developer Program
              </Link>
              get up to 30 workspaces.
            </p>
            <Link href="/auth/signup" className="button-primary">
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="card-dark p-0 overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2510403415/3675667301.png"
                alt="HubbotsX welcome screen"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Build with Gemini section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="md:w-1/2">
            <div className="inline-block text-sm font-medium text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
              AI-powered
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Build with Gemini in HubbotsX
            </h2>
            <p className="text-gray-400 mb-6">
              Work quickly and efficiently with Gemini in HubbotsX. Complete a variety of tasks like coding, debugging, testing, refactoring, explaining, and documenting code with AI assistance that interacts with your codebase and takes actions on your behalf. Use the built-in model or select your preferred model.
            </p>
            <p className="text-gray-400 mb-8">
              New Gemini Code Assist agents help with everything from migration to AI testing.
              <Link href="https://developers.google.com/profile/badges/community/sdlcagents/gca-agents" className="text-primary mx-1 hover:underline">
                Sign up
              </Link>
              for the waitlist to get early access to Code Assist agents via the Google Developer Program.
            </p>
            <Link href="/auth/signup" className="button-primary">
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="card-dark p-0 overflow-hidden">
              <Image
                src="https://ext.same-assets.com/2510403415/3088134051.png"
                alt="Gemini AI assistance"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* End-to-end testing section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <div className="inline-block text-sm font-medium text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
              End-to-end testing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Optimize your full-stack apps across platforms
            </h2>
            <p className="text-gray-400 mb-8">
              With access to thousands of extensions in the
              <Link href="https://open-vsx.org/" className="text-primary mx-1 hover:underline">
                Open VSX Registry
              </Link>
              , you can test and optimize your API endpoints and backends as you build them. And with built-in web previews and Android emulators, you can preview your apps as your users would see them.
            </p>
            <Link href="/auth/signup" className="button-primary">
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2 relative">
            <div className="card-dark p-0 overflow-hidden">
              <div className="absolute top-3 right-3 z-10">
                <Image
                  src="https://ext.same-assets.com/2510403415/2067545548.svg"
                  alt="Devices icon"
                  width={30}
                  height={30}
                />
              </div>
              <div className="flex flex-wrap p-6 gap-2">
                <div className="bg-neutral-900 px-3 py-1 rounded-lg flex items-center gap-1">
                  <span className="text-white text-sm">Android</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
                <div className="bg-neutral-900 px-3 py-1 rounded-lg flex items-center gap-1">
                  <span className="text-white text-sm">Web</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment & monitoring section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row-reverse items-center gap-10">
          <div className="md:w-1/2">
            <div className="inline-block text-sm font-medium text-primary mb-4 px-3 py-1 bg-primary/10 rounded-full">
              Deployment & monitoring
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Develop faster, deliver with confidence
            </h2>
            <p className="text-gray-400 mb-8">
              Publish your apps to Hubbots App Hosting with a few clicks, and monitor the usage and behavior at a glance. You can also deploy your production apps to Hubbots Hosting, Cloud Run, or your own custom infrastructure with complete control of your deployment approach.
            </p>
            <Link href="/auth/signup" className="button-primary">
              Try HubbotsX
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="grid grid-cols-3 gap-4">
              <div className="card-dark flex items-center justify-center p-4">
                <Image
                  src="https://ext.same-assets.com/2510403415/2795361418.png"
                  alt="Deploy icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className="card-dark flex items-center justify-center p-4">
                <Image
                  src="https://ext.same-assets.com/2510403415/2449922631.png"
                  alt="Monitor icon"
                  width={40}
                  height={40}
                />
              </div>
              <div className="card-dark flex items-center justify-center p-4">
                <Image
                  src="https://ext.same-assets.com/2510403415/992529532.jpeg"
                  alt="Analytics icon"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovate with Hubbots section */}
      <section className="text-center mb-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Innovate with Hubbots
        </h2>
        <p className="text-gray-400 mb-8">
          For years, millions of you have relied on Hubbots to accelerate your app development and run your apps with confidence. We hope you join us as we continue to evolve Hubbots to help you take advantage of generative AI and a new way to build APIs, backends, web and mobile apps, custom agents, and more!
        </p>
        <Link href="/auth/signup" className="button-primary">
          Try HubbotsX
        </Link>
      </section>
    </div>
  );
}
