import './globals.css'
import type { Metadata } from 'next'
import { Quicksand } from "next/font/google"

import Navbar from './components/navbar';
import Footer from './components/footer';

// fetcher
import { getFooter, getNavbar, getLogo } from './lib/api';

// floating whstapp button
import WhatsappButton from './components/whatsapp-button'

const quicksand = Quicksand({
  style: ["normal"],
  weight: ["300", "400", "500", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: 'SENVIAL | Señalización Vial',
  description: 'Damos solución a toda clase de trabajos en el sector vial, cartelería, delineado, parchado, borrado, entre otros.',
  icons: {
    icon: '../../favicon.svg',
  },
}

async function getGlobalData() {
  const navbar = await getNavbar();
  const footer = await getFooter();
  return { navbar, footer };
}

export default async function RootLayout({ children, }: { children: React.ReactNode }) {

  // logo 
  const logo = await getLogo();

  const { navbar, footer } = await getGlobalData();
  const location = navbar.navbars.nodes[0].location;
  const navbarLogo = navbar.navbars.nodes[0].navbarLogo;
  const whatsapp = navbar.navbars.nodes[0].whatsapp;
  const buttons = navbar.navbars.nodes[0].buttons.nodes;
  const links = navbar.navbars.nodes[0].links.nodes;
  const socialLinks = navbar.navbars.nodes[0].socialLinks.nodes;
  const acordeonLinks = navbar.navbars.nodes[0].acordeonLinks.nodes;

  const footerLogo = footer.footers.nodes[0].footerLogo;
  const footerLinks = footer.footers.nodes[0].menuLinks.nodes;
  const footerMenuLinks = footer.footers.nodes[0].links.nodes;
  const footerLocation = footer.footers.nodes[0].location;
  const footerRouteLinks = footer.footers.nodes[0].routeLinks.nodes;
  const footerSocialLinks = footer.footers.nodes[0].socialLInks.nodes;
  const footerContactLinks = footer.footers.nodes[0].contactLinks.nodes;

  return (
    <html lang="es">
      <body className={`${quicksand.className}`}>
        <Navbar locationText={location} logoUrl={navbarLogo.mediaItemUrl} whatsappLink={whatsapp} links={links} socialLinks={socialLinks} acordeonLinks={acordeonLinks} logoText="senvial" />

        <main>
          {children}
        </main>

        <Footer logoUrl={footerLogo.mediaItemUrl} menuLinks={footerRouteLinks} pagesLinks={footerMenuLinks} socialLinks={footerSocialLinks} categoryLinks={footerLinks} logoText="Senvial" contactLinks={footerContactLinks} location={location} />
      </body>
    </html>
  )
}


