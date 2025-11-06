import { NextRequest } from 'next/server'

interface RateLimitRecord {
  count: number
  resetTime: number
}

const rateLimit = new Map<string, RateLimitRecord>()

// Clean up old entries periodically to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of rateLimit.entries()) {
    if (now > value.resetTime) {
      rateLimit.delete(key)
    }
  }
}, 60000) // Clean up every minute

export function checkRateLimit(
  request: NextRequest,
  limit = 20, // 20 requests per window
  window = 60000 // 1 minute window
): { allowed: boolean; remaining: number; resetTime: number } {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()
  const record = rateLimit.get(ip)

  if (!record || now > record.resetTime) {
    const resetTime = now + window
    rateLimit.set(ip, { count: 1, resetTime })
    return { allowed: true, remaining: limit - 1, resetTime }
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true, remaining: limit - record.count, resetTime: record.resetTime }
}

