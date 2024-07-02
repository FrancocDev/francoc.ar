import next from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";

let locales = ["en", "es"];

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
        const preferredLocales = acceptLanguage
            .split(",")
            .map((locale) => locale.split(";")[0]);
        for (const preferredLocale of preferredLocales) {
            if (locales.includes(preferredLocale)) {
                return preferredLocale;
            }
        }
    }
    return "es";
}

async function logUmamiEvent(visitor: string) {
    await fetch("https://umami.francoc.ar/api/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        },
        body: JSON.stringify({
            payload: {
                name: "Visitors",
                website: process.env.UMAMI_TRAKING_CODE,
                data: { visitor: visitor },
            },
            type: "event",
        }),
    });
}

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;
    let response = NextResponse.next();
    const visitor = searchParams.get("v");

    if (visitor) {
        logUmamiEvent(visitor);
        request.nextUrl.searchParams.delete("v");
        response = NextResponse.redirect(request.nextUrl);
        response.cookies.set("visitor", visitor);
    }

    const pathnameHasLocale = locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    const pathnameLocale = pathname.split("/")[1];
    response.cookies.set("lang", pathnameLocale);
    if (pathnameHasLocale) return response;

    // Redirect if there is no locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    response.cookies.set("lang", locale);
    const cookieString = response.cookies.toString();
    return NextResponse.redirect(request.nextUrl, {
        headers: { "Set-Cookie": cookieString },
        status: 302,
    });
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        //'/((?!_next).*)'
        "/((?!api|_next/static|_next/image|images|icons|admin|cv|favicon.ico).*)",
        // Optional: only run on root (/) URL
        // '/'
    ],
};
