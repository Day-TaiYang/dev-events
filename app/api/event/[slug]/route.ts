import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Event, IEvent } from "@/database/index";

// Shape of the dynamic route params for this handler
interface RouteContext {
  params: { slug: string };
}

// Standard API response envelope
type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string };

/**
 * GET /api/events/:slug
 * Returns a single event by its slug.
 */
export async function GET(
  _req: NextRequest,
  { params }: RouteContext,
): Promise<NextResponse<ApiResponse<IEvent>>> {
  try {
    // 1. Validate the slug param
    const slug = params?.slug?.trim();

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug parameter is required." },
        { status: 400 },
      );
    }

    // Optional: reject obviously invalid slugs before hitting the DB
    // (tune this pattern to your slug format)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json(
        { success: false, error: "Invalid slug format." },
        { status: 400 },
      );
    }

    // 2. Ensure DB connection
    await dbConnect();

    // 3. Query the event by slug
    const event = await Event.findOne({ slug }).lean<IEvent>();

    if (!event) {
      return NextResponse.json(
        { success: false, error: `Event with slug "${slug}" not found.` },
        { status: 404 },
      );
    }

    // 4. Success
    return NextResponse.json({ success: true, data: event }, { status: 200 });
  } catch (error) {
    // Log full error server-side for debugging; return a safe message to the client
    console.error(`GET /api/events/[slug] failed:`, error);

    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 },
    );
  }
}
