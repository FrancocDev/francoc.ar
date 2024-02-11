import { cookies } from "next/headers";

export default async function IntroPage({params: {lang} = {lang : "es"}} : {params?: {lang?: string}}) {
    const visitor = cookies().get('visitor')?.value;
    if (!visitor) return null;

    try {
        const VisitorComponent = await import(`./visitors/${visitor}.tsx`)
            .then((module) => (module).default)
        return <VisitorComponent lang={lang}/>;
    } catch (e) {
        return null;
    }
}