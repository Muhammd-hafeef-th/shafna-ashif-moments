import { NextResponse } from 'next/server';
import dbConnect, { MissingMongoUriError } from '@/lib/mongodb';
import RSVP from '@/models/RSVP';

function handleDatabaseError(error, operation) {
  if (error instanceof MissingMongoUriError) {
    return NextResponse.json(
      { error: 'Database is not configured. Set MONGODB_URI in .env.local and restart the app.' },
      { status: 503 }
    );
  }

  console.error(`RSVP ${operation} error:`, error);
  return NextResponse.json(
    { error: operation === 'GET' ? 'Failed to fetch RSVPs.' : 'Operation failed.' },
    { status: 500 }
  );
}

export async function GET() {
  try {
    await dbConnect();
    const rsvps = await RSVP.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(rsvps, { status: 200 });
  } catch (error) {
    return handleDatabaseError(error, 'GET');
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { guestName, attendance, guestCount } = body;

    if (!guestName || !attendance) {
      return NextResponse.json({ error: 'Name and attendance are required.' }, { status: 400 });
    }

    const rsvp = await RSVP.create({
      guestName: guestName.trim(),
      attendance,
      guestCount: attendance === 'yes' ? (guestCount || 1) : 0,
    });

    return NextResponse.json({ message: 'RSVP submitted successfully!', rsvp }, { status: 201 });
  } catch (error) {
    return handleDatabaseError(error, 'POST');
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'RSVP ID is required.' }, { status: 400 });
    }

    const deleted = await RSVP.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'RSVP not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'RSVP deleted successfully!' }, { status: 200 });
  } catch (error) {
    return handleDatabaseError(error, 'DELETE');
  }
}
