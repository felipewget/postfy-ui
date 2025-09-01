import { NextRequest, NextResponse } from 'next/server';
import { getSubdomain } from './utils/url.utils';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const isStaticAsset =
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname.startsWith('/favicon.ico') ||
    url.pathname.match(
      /\.(css|js|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot|otf)$/
    );

  // Return all static files with no validation
  if (isStaticAsset) return NextResponse.next(); 

  const subdomain = await getSubdomain();

  // if(subdomain){
  //   url.pathname = subdomain === 'admin'
  //     ? `/admin${url.pathname}`
  //     : `/profile${url.pathname}`
  // } else {
  //     url.pathname = `/site${url.pathname}`;
  // }
  // url.pathname = `/dashboard${url.pathname}`;
  url.pathname = `/site${url.pathname}`;

  return NextResponse.rewrite(url);
}
