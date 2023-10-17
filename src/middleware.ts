import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    let selector = request.cookies.get('user')

    const AppNavigators = [
        "/",
        '/about-us',
        '/employee',
        '/blog',
    ];

    const AuthNavigators = [
        "/login",
        "/signin",
        "/forgot-password"
    ];

    if (selector) {
        if (
            AppNavigators.includes(path) &&
            path !== "/" &&
            path !== "/about-us" &&
            path !== "/employee" &&
            path !== "/blog"
        ) {
            return NextResponse.redirect(new URL(path, request.url));
        }
        if (AuthNavigators.includes(path) && path !== "/") {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (
            AuthNavigators.includes(path) &&
            path !== "/login" &&
            path !== "/signin" &&
            path !== "/forgot-password"
        ) {
            return NextResponse.redirect(new URL(path, request.url));
        }
        if (AppNavigators.includes(path) &&
            path !== "/login"
        ) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}