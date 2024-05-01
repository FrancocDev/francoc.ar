import Chat from "@/app/components/chat";
import { Data } from "@/app/data/data.types";
import Image from "next/image";
import Link from "next/link";
import {
  IconBrandLinkedin,
  IconMail,
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandJavascript,
  IconBrandCss3,
  IconBrandHtml5,
  IconBrandMongodb,
  IconBrandGit,
  IconExternalLink,
  IconFileCv,
} from "@tabler/icons-react";
import React from "react";
import { IconBrandMysql } from "@tabler/icons-react";

const socialNetworks: Record<string, React.ElementType> = {
  linkedin: IconBrandLinkedin,
  twitter: IconBrandTwitter,
  github: IconBrandGithub,
  email: IconMail,
  cv: IconFileCv
};

const skillsIcons: Record<string, React.ElementType> = {
  react: IconBrandReact,
  nextjs: IconBrandNextjs,
  tailwind: IconBrandTailwind,
  typescript: IconBrandTypescript,
  javascript: IconBrandJavascript,
  css: IconBrandCss3,
  html: IconBrandHtml5,
  mongodb: IconBrandMongodb,
  git: IconBrandGit,
  github: IconBrandGithub,
  mysql: IconBrandMysql
}

export default async function Home({
  params: { lang } = { lang: "es" },
}: {
  params?: { lang?: string };
}) {
  const data: Data = await import(`@/app/data/${lang}.json`).then(
    (module) => module.default
  );
  const dataSummary = data.basics.summary
    .split("\n")
    .map((p, i) => <p key={i}>{p}</p>);

  return (
    <main className="flex min-h-screen flex-col items-center gap-40">
      <section className="flex flex-row gap-24 items-start w-full">
        <div>
          <h1 className="text-6xl text-bold mb-9">
            {lang === "es" ? "Hola, soy " : "Hey, I'm "}
            {data.basics.name}
          </h1>
          {dataSummary}
        </div>
        {data.basics.image && 
        <Image
          src={data.basics.image}
          alt={data.basics.name}
          width={128}
          height={128}
          className="rounded-lg"
        />}
      </section>

      <section id="projects" className="flex flex-col items-start w-full">
        <h2 className="text-5xl text-bold mb-9">
          {lang === "es" ? "Proyectos" : "Projects"}
        </h2>
        <ul className="flex flex-col gap-16">
          {data.projects.slice(0, 3).map((project, i) => (
            <li key={i}>
              <article className="flex flex-col md:flex-row gap-8 justify-between">
                <Link href={project.url}>
                  <div className="relative w-96 h-64">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      layout=""
                      loading="lazy"
                      className="rounded-lg transition duration-500 hover:scale-105 cursor-pointer"
                    />
                  </div>
                </Link>
                <div className="flex flex-col justify-between flex-1">
                  <header className="flex flex-col gap-4">
                    <h3 className="text-4xl text-bold">{project.name}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-sm bg-gray-200 dark:bg-slate-900 rounded-md px-2 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p>{project.description}</p>
                  </header>
                  <nav className="flex gap-4">
                    <Link
                      href={project.url}
                      className="text-xl text-bold flex items-center gap-2 bg-gray-200 dark:bg-slate-900 p-2 rounded-lg no-underline transition duration-300 hover:scale-105"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IconExternalLink />
                      {lang === "es" ? "Sitio Web" : "Website"}
                    </Link>

                    {project.repository && 
                    <Link
                      href={project.repository}
                      className="text-xl text-bold flex items-center gap-2 bg-gray-200 dark:bg-slate-900 p-2 rounded-lg no-underline transition duration-300 hover:scale-105"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IconBrandGithub />
                      {lang === "es" ? "Ver código" : "View code"}
                    </Link>}
                  </nav>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-5xl text-bold mb-9">{lang === "es" ? "Habilidades" : "Skills"}</h2>
        <ul className="flex gap-4 flex-wrap">
          {data.skills.map((skill, i) => {
            const IconComponent = skillsIcons[skill.name.toLowerCase().replaceAll(".", "") as keyof typeof skillsIcons];
            return (
              <li key={i} className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-md">
                {IconComponent && <IconComponent />}
                <span>{skill.name}</span>
              </li>
            );
          })}
        </ul>
      </section>
      <section id="contact" className="w-full">
        <h2 className="text-5xl text-bold mb-9">
          {lang === "es" ? "Contacto" : "Contact"}
        </h2>
        <article className="flex flex-col md:flex-row gap-8">
          <Chat
            firstMessage={
              lang === "es"
                ? "Hola, preguntame lo que quieras..."
                : "Hi, ask me anything..."
            }
            language={lang as "es" | "en"}
          />
          <section className="flex flex-row flex-wrap md:flex-col gap-6 flex-shrink">
            {data.basics.profiles.map((profile, i) => {
              const IconComponent =
                socialNetworks[
                  profile.network.toLowerCase() as keyof typeof socialNetworks
                ];
              return (
                <Link
                  href={profile.url}
                  key={i}
                  className="flex flex-row gap-2"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {IconComponent && <IconComponent />}
                  <span className="text-lg">{profile.username}</span>
                </Link>
              );
            })}
          </section>
        </article>
      </section>
    </main>
  );
}
