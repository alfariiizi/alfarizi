import { type Metadata } from "next";
import { Maxwidthdiv } from "../_components/Maxwindthdiv";

const title = "Tech";

export const metadata: Metadata = {
  title,
};

export default function page() {
  return (
    <Maxwidthdiv className="mb-10 mt-10 flex max-w-4xl flex-col gap-8">
      <div className="space-y-3">
        <h1 className="font-display text-4xl font-bold text-primary">
          Tech 🧰
        </h1>
      </div>

      {/* List Tech */}
      <div className="mx-auto flex max-w-3xl flex-col">
        {/* Web Development */}
        <div className="relative ml-3 border-l-2 border-secondary">
          <div className="absolute -left-2 top-5 h-4 w-4 translate-y-1/2 rounded-full bg-accent" />
          <div className="py-6 pl-10 [&>p]:mb-2 [&>p]:mt-1 [&>p]:text-sm [&>p]:leading-normal [&>p]:sm:text-base">
            <h2 className="font-display text-lg font-semibold text-primary sm:text-xl">
              Web Development
            </h2>
            <p>
              I will divide this section into 3, namely the framework, styling
              libraries, and other libraries used in the framework.
            </p>
            <p>
              For <span className="font-semibold text-zinc-500">framework</span>
              , I usually use Nextjs. I personally quite like the React Server
              Component, so the Nextjs I use is Nextjs App Router.
            </p>
            <p>
              For <span className="font-semibold text-zinc-500">styling</span>,
              I usually use TailwindCSS. For component level styling I use
              Shadcn-UI which is a combination of several unstyled libraries
              such as Radix-UI combined with TailwindCSS.
            </p>
            <p>
              <span className="font-semibold text-zinc-500">
                Other libraries
              </span>{" "}
              that I usually use in Nextjs framework are: tRPC, React-Query,
              Zod, and Nextauth.
            </p>
          </div>
        </div>
        {/* Computer Graphics */}
        <div className="relative ml-3 border-l-2 border-secondary">
          <div className="absolute -left-2 top-5 h-4 w-4 translate-y-1/2 rounded-full bg-accent" />
          <div className="py-6 pl-10 [&>p]:mb-2 [&>p]:mt-1 [&>p]:text-sm [&>p]:leading-normal [&>p]:sm:text-base">
            <h2 className="font-display text-lg font-semibold text-primary sm:text-xl">
              Computer Graphics
            </h2>
            <p>
              Computer graphics is an interesting topic. I use C++ with the
              Vulkan API to render things on the computer. This use of C++ is
              because C++ is the first programming language I learned.
            </p>
          </div>
        </div>

        {/* Data Science / Data Analyst */}
        <div className="relative ml-3 border-l-2 border-secondary">
          <div className="absolute -left-2 top-5 h-4 w-4 translate-y-1/2 rounded-full bg-accent" />
          <div className="py-6 pl-10 [&>p]:mb-2 [&>p]:mt-1 [&>p]:text-sm [&>p]:leading-normal [&>p]:sm:text-base">
            <h2 className="font-display text-lg font-semibold text-primary sm:text-xl">
              Data Science and Data Analysis
            </h2>
            <p>
              Apart from web development and computer graphics, in my spare
              time, I sometimes do data processing and data modeling. The main
              language I use on DS/DA is Python. For data processing, I use
              Pandas. For data visualization, I use Matplotlib and Seaborn. As
              for modeling, so far I have used a simple model from Scikit-Learn.
            </p>
          </div>
        </div>
      </div>
    </Maxwidthdiv>
  );
}
