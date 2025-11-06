import { getAllSongs } from '@/lib/phish-service'
import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

// Cache at the route level - revalidate every 24 hours
export const revalidate = 60 * 60 * 24

export async function GET(request: NextRequest) {
  // Check rate limit: 20 requests per minute per IP
  const { allowed, remaining, resetTime } = checkRateLimit(request, 20, 60000)

  if (!allowed) {
    return NextResponse.json(
      { error: true, error_message: 'Rate limit exceeded. Please try again later.', data: [] },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(resetTime).toISOString(),
          'Retry-After': String(Math.ceil((resetTime - Date.now()) / 1000)),
        }
      }
    )
  }

  try {
    const response = await getAllSongs()
    return NextResponse.json(response, {
      headers: {
        // Cache for 24 hours in browser and CDN
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=172800',
        'X-RateLimit-Limit': '20',
        'X-RateLimit-Remaining': String(remaining),
        'X-RateLimit-Reset': new Date(resetTime).toISOString(),
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: true, error_message: 'Failed to fetch songs', data: [] },
      { status: 500 }
    )
  }
}

