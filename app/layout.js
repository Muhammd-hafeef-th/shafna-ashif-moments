import './globals.css';

export const metadata = {
  title: 'Shafna & Ashif — Wedding Invitation',
  description:
    'Join us for the Nikah of Shafna and Ashif on November 21, 2026 at Masjid Kunjali, Ayipuzha, and their reception on November 22 at the bride’s residence.',
  keywords: ['wedding', 'invitation', 'Shafna', 'Ashif', 'Ayipuzha', 'Nikah'],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'Shafna & Ashif — Wedding Invitation',
    description: 'You are cordially invited to the Nikah on November 21, 2026 and reception on November 22, 2026.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Great+Vibes&family=Pinyon+Script&family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;0,6..96,400;0,6..96,500;1,6..96,400&family=Italiana&family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500;600&family=Poppins:wght@300;400;500&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
