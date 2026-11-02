import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5EF] text-[#242424] p-4 text-center">
      <h2 className="font-heading text-4xl mb-3">Page Not Found</h2>
      <p className="font-body text-[#55514B] text-sm mb-6">Could not find the requested page.</p>
      <Link href="/" className="btn-pill-cream text-xs">
        Return Home
      </Link>
    </div>
  );
}

