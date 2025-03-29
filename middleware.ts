import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Establece una cookie para indicar si estamos en la página de login
  const response = NextResponse.next();
  response.cookies.set('isLoginPage', isLoginPage ? 'true' : 'false');

  // Rutas que no requieren autenticación
  const publicPaths = ['/login', '/signup'];

  // Verifica si el usuario está intentando acceder a una ruta protegida
  if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

// Define las rutas donde se aplicará el middleware
export const config = {
  matcher: ['/dashboard/:path*', '/team/:path*', '/protected/:path*', '/login', '/'], // Ajusta según tus rutas
};