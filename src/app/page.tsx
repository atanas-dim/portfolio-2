import Image from "next/image";

const SOCIAL_LINKS: {
  label: string;
  href: string;
}[] = [
  {
    label: "📧 Email",
    href: "mailto:a.dimitrov32@gmail.com",
  },
  {
    label: "🐙 GitHub",
    href: "https://github.com/atanas-dim",
  },
  {
    label: "💼 LinkedIn",
    href: "https://www.linkedin.com/in/atanas-dim/",
  },
  {
    label: "💻 CodeSandbox",
    href: "https://codesandbox.io/u/atanas-dim",
  },
];

export default function Home() {
  return (
    <>
      <main className="size-full min-h-fit flex flex-col mx-auto max-w-screen-lg p-6 gap-28 glossy motion-reduce:animate-none">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h1 className="text-3xl lg:text-6xl font-extrabold leading-tight whitespace-nowrap">
              Atanas Dimitrov
            </h1>
            <h2 className="text-3xl lg:text-6xl font-extrabold leading-tight whitespace-nowrap">
              <span className="">React Developer</span>{" "}
              <span className="text-black text-2xl lg:text-5xl">🪄</span>
            </h2>
          </div>
          <ul className="text-4xl gap-x-4 gap-y-2 grid grid-cols-[repeat(2,auto)] sm:grid-cols-[repeat(4,auto)] size-fit">
            {SOCIAL_LINKS.map((link, index) => {
              return (
                <li key={"link-" + index} className="size-fit flex">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black text-lg whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl lg:text-5xl font-extrabold">About me</h2>
          <p className="text-xl lg:text-2xl">
            I am a React developer with a passion for creating beautiful and
            functional web applications. I love to learn new things and share my
            knowledge with others.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl lg:text-5xl font-extrabold">Projects</h2>
          <ul className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {["Project 1", "Project 2", "Project 3"].map((project, index) => {
              return (
                <li key={"project-" + index}>
                  <div className="flex flex-col rounded-3xl p-2 gap-1 border-2 border-black">
                    <Image
                      src="https://via.placeholder.com/300"
                      alt=""
                      className="aspect-square w-full rounded-2xl"
                      width={300}
                      height={300}
                    />
                    <div className="flex flex-col p-2">
                      <p className="text-2xl font-bold">{project}</p>
                      <p className="text-base">Description of {project}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <footer className="p-6 mx-auto max-w-screen-lg">
        <p className="text-xs lg:text-sm text-black">
          2024 Created with NextJS, TailwindCSS and GSAP
        </p>
      </footer>
    </>
  );
}
