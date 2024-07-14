import { NextResponse } from 'next/server'

const protectedRoutes = ["/middleware"];
const isLoginRegister = ["/login", "/register"]
export function middleware(request) {
    const currentUser = request.cookies.get('loggedIn')?.value
    const isProtected = protectedRoutes.includes(request.nextUrl.pathname)
    const isLoginRegisterProtected = isLoginRegister.includes(request.nextUrl.pathname)
    if (!currentUser && isProtected) {
        return NextResponse.redirect(new URL('/login', request.url))
    } else if (currentUser && isLoginRegisterProtected) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}