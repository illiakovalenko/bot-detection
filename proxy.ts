import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default function proxy(
  request: NextRequest,
  fetchEvent: NextFetchEvent
) {
  const startTime = Date.now();
  const { pathname } = request.nextUrl;
  const { searchParams } = request.nextUrl;
  const { headers } = request;
  const { body } = request;
  const { method } = request;
  const { url } = request;

  console.log('Visitor:', {
    pathname,
    searchParams,
    headers,
    body,
    method,
    url,
    userAgent: headers.get('user-agent'),
    referer: headers.get('referer'),
    host: headers.get('host'),
    
  })

  console.log(pathname, searchParams, headers, body, method, url);
  console.log("Fetch Event:", fetchEvent);
  console.log("Wait Until:", fetchEvent.waitUntil);

  fetchEvent.waitUntil(
    new Promise((resolve) => {
      setTimeout(() => {
        console.log('Wait until post action is done!', Date.now() - startTime);
        resolve(true);
      }, 10000);
    })
  );

  console.log("Time taken:", Date.now() - startTime);

  return NextResponse.next();
}

export const config = {
    matcher: '/',
}
