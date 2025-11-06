import { getAllSongs } from '@/lib/phish-service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await getAllSongs()
    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: true, error_message: 'Failed to fetch songs', data: [] },
      { status: 500 }
    )
  }
}

