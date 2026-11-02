import { NextResponse } from 'next/server';
import dbConnect, { MissingMongoUriError } from '@/lib/mongodb';
import GuestWish from '@/models/GuestWish';

function handleDatabaseError(error, operation) {
  if (error instanceof MissingMongoUriError) {
    return NextResponse.json(
      { error: 'Database is not configured. Set MONGODB_URI in .env.local and restart the app.' },
      { status: 503 }
    );
  }

  console.error(`Wishes ${operation} error:`, error);
  return NextResponse.json(
    { error: operation === 'GET' ? 'Failed to fetch wishes.' : 'Operation failed.' },
    { status: 500 }
  );
}

export async function GET() {
  try {
    await dbConnect();
    const wishes = await GuestWish.find({ isApproved: true }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(wishes, { status: 200 });
  } catch (error) {
    return handleDatabaseError(error, 'GET');
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { guestName, message } = body;

    if (!guestName || !message) {
      return NextResponse.json({ error: 'Name and message are required.' }, { status: 400 });
    }

    const wish = await GuestWish.create({
      guestName: guestName.trim(),
      message: message.trim(),
      isApproved: true,
    });
    return NextResponse.json({ message: 'Wish submitted!', wish }, { status: 201 });
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
      return NextResponse.json({ error: 'Wish ID is required.' }, { status: 400 });
    }

    const deleted = await GuestWish.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Wish not found.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Wish deleted successfully!' }, { status: 200 });
  } catch (error) {
    return handleDatabaseError(error, 'DELETE');
  }
}
