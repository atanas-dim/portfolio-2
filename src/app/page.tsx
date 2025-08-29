import Card from '@/components/Card'
import PageAnimations from '@/components/PageAnimations'
import { PROJECTS } from '@/resources/projects'
import { SOCIAL_LINKS } from '@/resources/socialLinks'
import { TOOLS } from '@/resources/tools'

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Atanas Dimitrov',
    jobTitle: 'Software Developer',
    url: 'https://adimitrov.com',
    sameAs: ['https://github.com/atanas-dim', 'https://www.linkedin.com/in/atanas-dim/'],
    image: 'https://www.adimitrov.com/opengraph-image',
    description: 'React developer passionate about creating beautiful and functional web applications.',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-1000 overflow-hidden">
        <div role="presentation" className="grainy pointer-events-none absolute -inset-1/4 size-2/1" />
      </div>

      <main className="mx-auto mb-16 flex size-full min-h-fit max-w-5xl flex-col gap-28 px-6 py-10 opacity-0 motion-reduce:animate-none lg:py-16">
        <section className="flex flex-col gap-2">
          <h1 className="heading whitespace-nowrap">Atanas Dimitrov</h1>
          <p className="text-2xl whitespace-nowrap lg:text-3xl">
            Software Developer <span className="text-black">🪄 ⚛️</span>
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="heading whitespace-nowrap">Let&apos;s connect</h2>
          <ul className="flex size-fit gap-x-4 gap-y-2 text-4xl">
            {SOCIAL_LINKS.map((link, index) => {
              return (
                <li key={'link-' + index} className="flex size-fit">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link text-lg whitespace-nowrap lg:text-2xl">
                    <span className="text-black">{link.emoji}</span>{' '}
                    <span className="border-b-3 border-b-red-950/20 transition-colors duration-500 hover:border-b-red-950">
                      {link.label}
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="heading lg:leading-tight">About me</h2>
          <p className="max-w-180">
            I’m a React developer with a passion for creating beautiful and functional web applications. I’m always
            excited to experiment with new ideas and technologies.
          </p>
        </section>
        <section className="flex flex-col gap-8">
          <h2 className="heading lg:leading-tight">Projects</h2>
          <ul className="2xs:grid-cols-2 grid grid-cols-1 gap-8 sm:gap-6 md:grid-cols-3">
            {PROJECTS.map((project, index) => {
              return (
                <li key={'project-' + index}>
                  <Card project={project} />
                </li>
              )
            })}
          </ul>
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="heading lg:leading-tight">Tools</h2>
          <p className="mb-6">I use the following technologies to create my projects:</p>
          <div className="w-fit columns-1 gap-y-4 sm:columns-2 lg:grid lg:columns-4 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-8 lg:[column-fill:balance]">
            {TOOLS.map((section, i) => (
              <div key={'tools-col-' + i} className="mr-8 mb-8 w-fit break-inside-avoid lg:mr-0 lg:mb-0">
                <span className="tool mb-3 block text-lg font-bold sm:text-xl">{section.title}</span>
                <ul className="list-disc space-y-1 pl-5 marker:text-base">
                  {section.items.map((tool, j) => (
                    <li key={`${section.title}-${j}`} className="tool">
                      <span className="text-lg sm:text-xl">{tool}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="relative w-full overflow-hidden">
        <div className="mx-auto max-w-5xl px-6">
          <p className="border-t-3 border-t-red-950/10 py-6 text-xs! font-bold! lg:text-sm!">
            {new Date().getFullYear()} | Created with Next.js, TailwindCSS and GSAP
          </p>
        </div>
      </footer>
      <PageAnimations />
    </>
  )
}
