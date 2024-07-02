"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function LanguageSwitch({ language }: { language: "es" | "en" }) {
    const router = useRouter();
    const pathname = usePathname();
    const query = useSearchParams() || {};

    console.log();
    function handleToggle() {
        Cookies.set("lang", language === "es" ? "en" : "es");
        router.replace(
            `/${language === "es" ? "en" : "es"}${pathname.split("/")[2] || ""}`
        );
    }

    return (
        <a
            role="button"
            onClick={handleToggle}
            className="text-sm flex items-center"
        >
            {language.toUpperCase()}
        </a>
    );
}

export default LanguageSwitch;
