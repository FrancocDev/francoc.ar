import { Data } from "@/app/data/data.types";
import Image from "next/image";

export default async function Projects({params: {lang} = {lang : "es"}} : {params?: {lang?: string}}) {
  const data:Data = await import(`@/app/data/${lang}.json`)
    .then((module) => module.default)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {data.basics.name}
    </main>
  );
}
