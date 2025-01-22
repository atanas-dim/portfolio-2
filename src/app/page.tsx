"use client";
import { PROJECTS } from "@/resources/projects";
import { SOCIAL_LINKS } from "@/resources/socialLinks";
import { TOOLS } from "@/resources/tools";
import gsap from "gsap";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    gsap.set("main,section,h1,h2,h3,p,a,.card,footer", {
      opacity: 0,
      y: 6,
      transition: "none",
    });

    gsap.to("main,section,h1,h2,h3,p,a,.card,footer", {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      onComplete: () => {
        gsap.set("main,section,h1,h2,h3,p,a,.card,footer", {
          clearProps: "transition",
        });
      },
    });
  }, []);

  return (
    <>
      <div
        role="presentation"
        className="pointer-events-none grainy absolute inset-0 z-50"
      />
      <main className="opacity-0 size-full min-h-fit flex flex-col mx-auto max-w-screen-lg p-6 lg:py-12 gap-28 mb-16 motion-reduce:animate-none">
        <section className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h1 className="glossy text-3xl lg:text-6xl font-extrabold whitespace-nowrap">
              Atanas Dimitrov{" "}
              <span className="text-black text-2xl lg:text-5xl lg:leading-tight">
                🪄
              </span>
            </h1>
            <h2 className="glossy text-3xl lg:text-6xl font-extrabold whitespace-nowrap">
              React Developer{" "}
              <span className="text-black text-2xl lg:text-5xl lg:leading-tight">
                ⚛️
              </span>
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
                    className="glossy text-lg whitespace-nowrap"
                  >
                    <span className="text-black">{link.emoji}</span>{" "}
                    <span className="border-b-2 border-b-rose-950/20 hover:border-b-rose-950 transition-colors duration-500">
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="glossy text-3xl lg:text-5xl lg:leading-tight font-extrabold">
            About me
          </h2>
          <p className="glossy text-xl lg:text-2xl">
            I’m a React developer with a passion for creating beautiful and
            functional web applications. I’m always excited to experiment with
            new ideas and technologies.
          </p>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="glossy text-3xl lg:text-5xl lg:leading-tight font-extrabold">
            Projects
          </h2>
          <ul className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project, index) => {
              return (
                <li key={"project-" + index}>
                  <div className="card group flex flex-col rounded-3xl p-2 gap-1 border-2 border-rose-950 hover:bg-rose-200/50 transition-all duration-300">
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden flex justify-center items-center border-2 border-rose-950">
                      <Image
                        src={project.image}
                        alt=""
                        className="object-cover grayscale -z-10 size-full"
                        width={300}
                        height={300}
                        quality={100}
                      />
                      <span className="absolute inset-0 bg-rose-200 mix-blend-color" />
                    </div>
                    <div className="flex flex-col p-2">
                      <h3 className="glossy text-2xl font-bold mb-1">
                        {project.title}
                      </h3>
                      <p className="glossy text-base h-12 mb-3">
                        {project.technologies}
                      </p>
                      <div className="flex gap-2">
                        {project.links.map((link, index) => {
                          return (
                            <a
                              key={project.title + "-link-" + index}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg whitespace-nowrap flex justify-center items-center bg-rose-300 hover:bg-red-400 active:bg-rose-500 active:text-rose-50 text-rose-950 rounded-2xl py-2 px-4 transition-all duration-300"
                            >
                              {link.label}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="glossy text-3xl lg:text-5xl lg:leading-tight font-extrabold">
            Tools
          </h2>
          <p className="glossy text-xl lg:text-2xl">
            I use the following technologies to create my projects:
          </p>
          <ul className="glossy gap-y-2 gap-x-6 sm:gap-x-10 grid grid-flow-col grid-rows-12 sm:grid-rows-8 md:grid-rows-6 w-fit">
            {TOOLS.map((tool, index) => {
              return (
                <li key={"tool-" + index} className="text-lg whitespace-nowrap">
                  {tool}
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <footer className="opacity-0 p-6 mx-auto max-w-screen-lg">
        <p className="text-xs lg:text-sm text-rose-950">
          {new Date().getFullYear()} | Created with NextJS, TailwindCSS and GSAP
        </p>
      </footer>
    </>
  );
}
