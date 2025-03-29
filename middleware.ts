import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token'); // O usa localStorage si es necesario

  // Rutas que no requieren autenticación
  const publicPaths = ['/login', '/signup'];

  // Verifica si el usuario está intentando acceder a una ruta protegida
  if (!token && !publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Define las rutas donde se aplicará el middleware
export const config = {
  matcher: ['/dashboard/:path*', '/protected/:path*'], // Ajusta según tus rutas
};