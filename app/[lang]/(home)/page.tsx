import { Data } from "@/app/data/data.types";
import Image from "next/image";
import Link from "next/link";

export default async function Projects({params: {lang} = {lang : "es"}} : {params?: {lang?: string}}) {
  const data:Data = await import(`@/app/data/${lang}.json`)
    .then((module) => module.default)

  const dataSummary = data.basics.summary.split("\n").map((p, i) => <p key={i}>{p}</p>);
    
  return (
    <main className="flex min-h-screen flex-col items-center gap-40">
      <section className="flex flex-row gap-24 items-start">
      <div>
      <h1 className="text-6xl text-bold mb-9">{lang === "es" ? "Hola, soy " : "Hey, I'm "}{data.basics.name}</h1>
      {dataSummary}
      </div>
      <Image src={data.basics.image} alt="Franco Carrara" width={128} height={128} className="rounded-lg" />
      </section>

      <section id="projects" className="flex flex-col items-start w-full">
      <h2 className="text-5xl text-bold mb-9">{lang === "es" ? "Proyectos" : "Projects"}</h2>
      <ul className="flex flex-col gap-16">
        {data.projects.slice(0, 3).map((project, i) => (
          <li key={i}>
            <article className="flex flex-row gap-8 justify-between">
            <Link href={project.url}>
              <div className="relative w-96 h-64">
              <Image src={project.image} alt={project.name} layout="fill" objectFit="cover" className="rounded-lg transition duration-500 hover:scale-105 cursor-pointer"  />
              </div>
            </Link>
            <div className="flex flex-col justify-between">
            <header className="flex flex-col gap-4">
              <h3 className="text-4xl text-bold">{project.name}</h3>
              <div className="flex gap-2">
              {project.tags.map((tag, i) => (<span key={i} className="text-sm bg-gray-200 dark:bg-slate-900 rounded-md px-2 py-1">{tag}</span>))}
              </div>
              <p>{project.description}</p>
            </header>
            <nav className="flex gap-4">
              <Link href={project.url} className="text-xl text-bold flex items-center gap-2 bg-gray-200 dark:bg-slate-900 p-2 rounded-lg no-underline transition duration-300 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                {lang === "es" ? "Sitio Web" : "Website"}
              </Link>

              <Link href={project.url} className="text-xl text-bold flex items-center gap-2 bg-gray-200 dark:bg-slate-900 p-2 rounded-lg no-underline transition duration-300 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                {lang === "es" ? "Ver código" : "View code"}
              </Link>
            </nav>
            </div>
            
            </article>
          </li>
        ))}
      </ul>
      </section>
      
    </main>
  );
}
