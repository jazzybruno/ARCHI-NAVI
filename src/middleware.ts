import { NextRequest, NextResponse } from 'next/server';

const USER_NAME = process.env.NEXT_PUBLIC_BASIC_AUTH_NAME || '';
const PASSWORD = process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD || '';
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV || '';

export function middleware(req: NextRequest) {
  if (USER_NAME === '' || PASSWORD === '' || APP_ENV !== 'staging') {
    return NextResponse.next();
  }

  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const auth = basicAuth.split(' ')[1];
    const [user, password] = atob(auth).split(':');

    if (user === USER_NAME && password === PASSWORD) {
      return NextResponse.next();
    }
  }

  return new Response('Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"'
    }
  });
}