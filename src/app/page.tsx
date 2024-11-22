import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="size-full min-h-fit flex flex-col mx-auto max-w-screen-md p-6 gap-28 glossy">
        <section className="flex flex-col">
          <div className="flex flex-col">
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">
              <span className="">Atanas Dimitrov</span>
            </h1>
            <h2 className="text-4xl lg:text-6xl font-black leading-tight">
              <span className="">React Developer</span>{" "}
              <span className="emoji">🪄</span>
            </h2>
          </div>
          <ul className="flex text-4xl">
            {["👨‍💻", "📚", "🎨", "🎸"].map((emoji, index) => {
              return (
                <li key={"link-" + index}>
                  <a className="emoji size-12 items-center justify-center flex">
                    {emoji}
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl lg:text-5xl font-bold ">About me</h2>
          <p className="text-xl lg:text-2xl">
            I am a React developer with a passion for creating beautiful and
            functional web applications. I love to learn new things and share my
            knowledge with others.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl lg:text-5xl font-bold ">Projects</h2>
          <ul className="gap-4 grid grid-cols-1 lg:grid-cols-3">
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
      <footer className="p-6">
        <p className="text-xs lg:text-sm text-black">
          2024 Created with NextJS, TailwindCSS and GSAP
        </p>
      </footer>
    </>
  );
}
