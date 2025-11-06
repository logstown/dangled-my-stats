import { getAllShows } from '@/lib/phish-service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await getAllShows()
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: true, error_message: 'Failed to fetch shows', data: [] },
      { status: 500 }
    )
  }
}

