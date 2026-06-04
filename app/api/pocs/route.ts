import { NextResponse } from "next/server"
import { getPortfolioGlobeData } from "@/lib/poc-portfolio"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const data = await getPortfolioGlobeData()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load portfolio workbook."

    return NextResponse.json(
      { error: message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    )
  }
}