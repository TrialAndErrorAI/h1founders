/**
 * Cloudflare Pages Function: CORS proxy for Tech Stack Analyzer
 *
 * Allows client to fetch external URLs without CORS blocking
 * Server-side fetch bypasses browser CORS restrictions
 */

export const onRequest: PagesFunction = async (context) => {
  const { request } = context
  const url = new URL(request.url)
  const targetUrl = url.searchParams.get('url')

  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'URL parameter required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Validate URL format
    const parsedUrl = new URL(targetUrl)
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return new Response(JSON.stringify({ error: 'Only HTTP(S) URLs allowed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Fetch the target URL (no CORS on edge)
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'H1Founders-TechStack-Analyzer/1.0',
      },
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch: ${response.status} ${response.statusText}`,
        }),
        {
          status: 502,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }

    // Return the HTML
    const html = await response.text()
    return new Response(html, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Proxy request failed',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
