import { NextResponse } from 'next/server';

/**
 * Sanitizes input by removing potentially dangerous characters and HTML tags.
 * This is a basic mock implementation for demonstration.
 * @param input The raw input string
 * @returns The sanitized string
 */
function sanitizeInput(input: string): string {
  if (!input) return "";
  // Strip HTML tags and generic dangerous characters
  return input.replace(/<[^>]*>?/gm, '').replace(/[$;='"]/g, '');
}

/**
 * POST endpoint to verify a manifesto or protocol step securely.
 * Contains explicit input sanitization to prevent injection attacks.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawData = body?.data;

    if (!rawData || typeof rawData !== 'string') {
      return NextResponse.json(
        { error: "Invalid payload. 'data' must be a string." },
        { status: 400 }
      );
    }

    // Explicit Sanitization Logic
    const sanitizedData = sanitizeInput(rawData);

    // Simulated Verification Processing
    const isVerified = sanitizedData.length > 5;
    
    return NextResponse.json({
      success: true,
      message: "Data processed securely.",
      originalLength: rawData.length,
      sanitizedLength: sanitizedData.length,
      verified: isVerified
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error during verification processing." },
      { status: 500 }
    );
  }
}
