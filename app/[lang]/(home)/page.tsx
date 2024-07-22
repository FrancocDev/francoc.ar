import Chat from "@/app/components/chat";
import { Data } from "@/app/data/data.types";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/tina/__generated__/client";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import React from "react";

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

    const projectsResponse = await client.queries.projectsConnection({
        filter: { published: { eq: true } },
        sort: "featured-date",
        last: 10,
    });
    const technologiesResponse = await client.queries.technologiesConnection();
    const socialNetworksResponse =
        await client.queries.socialNetworksConnection();

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
                {data.basics.image && (
                    <Image
                        src={data.basics.image}
                        alt={data.basics.name}
                        width={128}
                        height={128}
                        className="rounded-lg"
                    />
                )}
            </section>

            <section id="projects" className="flex flex-col items-start w-full">
                <h2 className="text-5xl text-bold mb-9">
                    {lang === "es" ? "Proyectos" : "Projects"}
                </h2>
                <ul className="flex flex-col gap-16">
                    {projectsResponse?.data?.projectsConnection?.edges
                        ?.filter(
                            (projects) =>
                                projects?.node?._sys.breadcrumbs[0] === lang
                        )
                        .map((project, i) => (
                            <li key={i}>
                                <article className="flex flex-col md:flex-row gap-8 justify-between">
                                    {project?.node?.website && (
                                        <Link href={project?.node?.website}>
                                            <div className="relative w-96 h-64">
                                                <Image
                                                    src={project.node.image}
                                                    alt={project.node.title}
                                                    fill
                                                    layout=""
                                                    loading="lazy"
                                                    className="rounded-lg transition duration-500 hover:scale-105 cursor-pointer"
                                                />
                                            </div>
                                        </Link>
                                    )}
                                    <div className="flex flex-col justify-between flex-1">
                                        <header className="flex flex-col gap-4">
                                            <h3 className="text-4xl text-bold">
                                                {project?.node?.title}
                                            </h3>
                                            <div className="flex gap-2 flex-wrap">
                                                {project?.node?.technologies.map(
                                                    (tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-sm bg-gray-200 dark:bg-slate-900 rounded-md px-2 py-1"
                                                        >
                                                            {
                                                                tech?.technology
                                                                    .name
                                                            }
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                            <p>{project?.node?.description}</p>
                                        </header>
                                        <nav className="flex gap-4">
                                            {project?.node?.website && (
                                                <Link
                                                    href={
                                                        project?.node?.website
                                                    }
                                                    className="text-xl text-bold flex items-center gap-2 bg-gray-200 dark:bg-slate-900 p-2 rounded-lg no-underline transition duration-300 hover:scale-105"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    <IconExternalLink />
                                                    {lang === "es"
                                                        ? "Sitio Web"
                                                        : "Website"}
                                                </Link>
                                            )}

                                            {project?.node?.github && (
                                                <Link
                                                    href={project.node.github}
                                                    className="text-xl text-bold flex items-center gap-2 bg-gray-200 dark:bg-slate-900 p-2 rounded-lg no-underline transition duration-300 hover:scale-105"
                                                    rel="noopener noreferrer"
                                                    target="_blank"
                                                >
                                                    <IconBrandGithub />
                                                    {lang === "es"
                                                        ? "Ver código"
                                                        : "View code"}
                                                </Link>
                                            )}
                                        </nav>
                                    </div>
                                </article>
                            </li>
                        ))}
                </ul>
            </section>
            <section className="w-full">
                <h2 className="text-5xl text-bold mb-9">
                    {lang === "es" ? "Habilidades" : "Skills"}
                </h2>
                <ul className="flex gap-4 flex-wrap w-full justify-start">
                    {technologiesResponse?.data?.technologiesConnection?.edges
                        ?.filter(
                            (projects) =>
                                projects?.node?._sys.breadcrumbs[0] === lang
                        )
                        .map((skill, i) => {
                            return (
                                <li
                                    key={i}
                                    className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-2 rounded-md"
                                >
                                    {skill?.node && (
                                        <Image
                                            src={skill?.node?.icon}
                                            alt={skill?.node?.name}
                                            width={24}
                                            height={24}
                                            className="dark:invert"
                                        />
                                    )}
                                    <span>{skill?.node?.name}</span>
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
                        {socialNetworksResponse?.data?.socialNetworksConnection?.edges
                            ?.filter(
                                (socialNetwork) =>
                                    socialNetwork?.node?._sys.breadcrumbs[0] ===
                                    lang
                            )
                            .map((profile, i) => {
                                if (!profile?.node?.icon) return;
                                return (
                                    <Link
                                        href={profile?.node?.url}
                                        key={i}
                                        className="flex flex-row gap-2"
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        <Image
                                            src={profile?.node?.icon}
                                            alt={profile?.node?.name}
                                            width={24}
                                            height={24}
                                            className="dark:invert"
                                        />
                                        <span className="text-lg">
                                            {profile?.node?.name}
                                        </span>
                                    </Link>
                                );
                            })}
                    </section>
                </article>
            </section>
        </main>
    );
}
