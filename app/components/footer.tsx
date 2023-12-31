'use client'
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "./logo";
import { CgWebsite } from "react-icons/cg";
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube, AiFillPhone, AiFillMail, AiFillHome } from "react-icons/ai";

import { MapPinIcon } from '@heroicons/react/24/outline'

interface FooterLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}

interface CategoryLink {
  id: string;
  attributes: {
    name: string;
    slug: string;
  };
}
interface PagesLink {
  id: string;
  text: string;
  url: string;
}
interface ContactLinks {
  id: string;
  contactType: string;
  text: string;
  url: string;
}

function FooterContact(data: ContactLinks) {
  return (
    <li className="flex flex-col md:flex-row md:items-center gap-4 justify-start">
      <RenderContactIcon data={data.contactType[0]} />
      <Link
        href={data.url}
        className="hover:text-primary mt-1"
      >
        {data.text}
      </Link>
    </li>
  );
}

function FooterLink({ url, text }: FooterLink) {
  const path = usePathname();
  return (
    <li className="flex">
      <Link
        href={url}
        className={`hover:text-primary ${path === url && "text-primary"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}

function CategoryLink({ attributes }: CategoryLink) {
  return (
    <li className="flex">
      <Link
        href={`/blog/${attributes.slug}`}
        className="hover:text-primary"
      >
        {attributes.name}
      </Link>
    </li>
  );
}
function PagesLink(link: PagesLink) {
  return (
    <li className="flex">
      <Link
        href={link.url}
        className="hover:text-primary"
      >
        {link.text}
      </Link>
    </li>
  );
}

function RenderSocialIcon({ social }: { social: string | undefined }) {
  switch (social) {
    case "website":
      return <CgWebsite />;
    case "facebook":
      return <AiFillFacebook />;
    case "linkedin":
      return <AiFillLinkedin />;
    case "twitter":
      return <AiFillTwitterCircle />;
    case "youtube":
      return <AiFillYoutube />;
    default:
      return null;
  }
}

function RenderContactIcon({ data }: { data: string | undefined }) {
  switch (data) {
    case "phone":
      return <AiFillPhone className="h-8 w-8 bg-black rounded-full p-2" />;
    case "email":
      return <AiFillMail className="h-8 w-8 bg-black rounded-full p-2" />;
    case "address":
      return <AiFillHome className="h-8 w-8 bg-black rounded-full p-2" />;
    default:
      return null;
  }
}
export default function Footer({
  logoUrl,
  logoText,
  menuLinks,
  categoryLinks,
  location,
  pagesLinks,
  contactLinks,
  socialLinks,
}: {
  logoUrl: any
  logoText: any;
  menuLinks: any;
  categoryLinks: any;
  location: any;
  pagesLinks: any;
  contactLinks: any;
  socialLinks: any;
}) {
  const sortedContactLinks = contactLinks.sort((a, b) => {
    // Define un orden personalizado para los tipos de enlaces.
    const order = ["phone", "email", "address"];

    const indexA = order.indexOf(a.contactType[0]);
    const indexB = order.indexOf(b.contactType[0]);

    // Ordena los enlaces en función de su posición en el arreglo "order".
    return indexA - indexB;
  });

  return (
    <footer className="py-6 bg-primary-content text-gray-50">
      <div className="container px-6 mx-auto space-y-6 divide-y md:space-y-12 divide-opacity-50">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-8">
          <div className="pb-6 col-span-full md:pb-0 md:col-span-5">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold"></h2>}
            </Logo>
          </div>

          <div className="col-span-6 text-left md:pt-0 md:text-left md:col-span-2">
            <p className="pb-1 text-lg font-medium">HISTORIA</p>
            <ul>
              {pagesLinks.map((link: any, index: number) => {
                return (
                  <PagesLink key={index} {...link} />
                )
              })}
            </ul>
          </div>

          <div className="col-span-6 text-left md:text-left md:col-span-2">
            <p className="pb-1 text-lg font-medium">ELEMENTOS</p>
            <ul>
              {menuLinks.map((link: any, index: number) => (
                <FooterLink key={index} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-6 text-left md:text-left space-y-2 xl:col-span-3">
            <p className="pb-text-lg font-medium">CONTACTO</p>
            <ul className="align-middle space-y-2">
              {sortedContactLinks.map((link: any, index: number) => (
                <FooterContact key={index} {...link} />
              ))}
            </ul>
          </div>

          <div className="col-span-6 text-left md:text-left space-y-2 xl:col-span-3">
            <div className="flex flex-row space-x-5 align-middle">
              <div className="mt-3">
                <MapPinIcon className="h-8 w-8 text-default" aria-hidden="true" />
              </div>
              <div
                className="text-lg leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: location }}
              />
            </div>
          </div>

        </div>
        <div className="grid justify-center pt-6 lg:justify-between">
          <div className="flex">
            <span className="mr-2">
              ©{new Date().getFullYear()} Derechos reservados
            </span>

          </div>
          <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13">
            {socialLinks.map((link: any) => {
              return (
                <a
                  key={link.id}
                  rel="noopener noreferrer"
                  href={link.url}
                  title={link.text}
                  target={link.newTab ? "_blank" : "_self"}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-primary-content"
                >
                  <RenderSocialIcon social={link.social[0]} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
