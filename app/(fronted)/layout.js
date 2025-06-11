// app/layout.js

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserProvider } from '@/context/UserContext';
import Script from 'next/script';
import "../../public/css/style.css";


export const metadata = {
  title: 'GYMSTER - Gym HTML Template',
  description: 'A modern gym website built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Header />
          {children}
          <Footer />
        </UserProvider>

        {/* Scripts loaded properly using next/script */}
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
