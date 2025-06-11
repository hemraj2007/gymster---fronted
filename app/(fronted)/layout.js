import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';
import Script from 'next/script';

export const metadata = {
  title: 'GYMSTER - Gym HTML Template',
  description: 'A modern gym website built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* External Fonts and CSS */}
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Rubik&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="/lib/flaticon/font/flaticon.css" rel="stylesheet" />
        <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
      </head>

      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>

        {/* JS Libraries */}
        <Script src="https://code.jquery.com/jquery-3.4.1.min.js" strategy="afterInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" />
        <Script src="/lib/easing/easing.min.js" strategy="afterInteractive" />
        <Script src="/lib/waypoints/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/lib/counterup/counterup.min.js" strategy="afterInteractive" />
        <Script src="/lib/owlcarousel/owl.carousel.min.js" strategy="afterInteractive" />

        {/* Back to Top Button */}
        <a href="#" className="btn btn-dark py-3 fs-4 back-to-top">
          <i className="bi bi-arrow-up"></i>
        </a>
      </body>
    </html>
  );
}
