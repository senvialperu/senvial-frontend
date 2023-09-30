'use client'
import Logo from "./logo";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from "@heroicons/react/24/solid";

// react icons
import { AiFillFacebook, AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

import React, { useEffect, useState, useRef } from "react";

// auto animate for auto animate 
import autoAnimate from '@formkit/auto-animate'

interface ProductCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
};
interface Service {
  id: number;
  attributes: {
    id: number;
    slug: string;
    title: string;
  }
}
interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}
interface SocialNavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
  social?: string;
}
interface NavExpandableLink extends NavLink {
  product_categories: {
    data: ProductCategory[]; // Aquí incluimos la estructura de ProductCategory
  };
  services: {
    data: Service[]; // Aquí incluimos la estructura de ProductCategory
  }
}
interface MobileNavLink extends NavLink {
  closeMenu: () => void;
}
function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="px-10 w-auto flex justify-center">
      <Link
        href={url}
        className={`flex items-center w-auto"
          }}`}
      >
        {text}
      </Link>
    </li>
  );
}
function NavExpandableLink({ url, text, product_categories, services }: any) {
  const parentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (parentRef.current) {
      autoAnimate(parentRef.current);
    }
  }, [parentRef]);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedServices, setIsExpandedServices] = useState(false);

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
  };

  const handleMouseEnterServices = () => {
    setIsExpandedServices(true);
  };

  const handleMouseLeaveServices = () => {
    setIsExpandedServices(false);
  };

  return (
    <div className="px-10 relative group w-auto justify-center lg:w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={parentRef}>
      <Link href={url} className={`flex items-center -mb-1`}>
        {text}
      </Link>

      {isExpanded && (
        <div className="absolute w-full left-0 bg-transparent z-10 pt-2" style={{ top: '100%' }}>
          <div className="w-[95%]">
            <ul className="flex flex-col gap-[2px]">
              {product_categories.nodes.map((item: any) => (
                <Link href={`/productos/${item.slug}`} className={`  p-2 bg-black w-full hover:bg-secondary hover:text-primary-content`} key={item.id}>
                  <p className="w-full">{item.name}</p>
                </Link>
              ))}
              <div
                onMouseEnter={handleMouseEnterServices}
                onMouseLeave={handleMouseLeaveServices}
                ref={parentRef}
                style={{ position: 'relative', zIndex: 10 }}
              >
                <Link href={url} className={`flex items-center bg-secondary `}>
                  <p className="p-2 w-full text-primary-content">SERVICIOS</p>
                </Link>
                {isExpandedServices && (
                  <div className="absolute left-0 bg-transparent z-10" style={{ top: '0', marginLeft: '100%' }}>
                    <ul className="flex flex-col gap-[2px]">
                      {services.nodes.map((item: any) => (
                        <li key={item.title} className="p-2 bg-black hover:bg-secondary hover:text-primary-content w-full">
                          <Link href={`/servicios/${item.slug}`} className={``}>
                            <p className="w-48">{item.title}</p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileNavLink({ url, text, closeMenu }: MobileNavLink) {
  const path = usePathname();
  const handleClick = () => {
    closeMenu();
  }
  return (
    <a className="flex">
      <Link
        href={url}
        onClick={handleClick}
        className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-default hover:text-secondary hover:bg-gray-90}`}
      >
        {text}
      </Link>
    </a>
  );
}
function MobileNavExpandableLink({ url, text, product_categories, services }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedServices, setIsExpandedServices] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleClickServices = () => {
    setIsExpandedServices(!isExpandedServices);
  };

  const path = usePathname();

  return (
    <div className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-primary-content hover:bg-gray-90 relative group">
      <div onClick={handleClick} className="flex items-center -mb-1 cursor-pointer">
        {text}
        <ChevronDownIcon width={20} height={20} />
      </div>
      {isExpanded && (
        <div className="relative w-full left-0 bg-transparent z-10 pt-2" style={{ top: '100%' }}>
          <ul className="flex flex-col">
            {product_categories.nodes.map((item: any) => (
              <li key={item.name} className="p-2 w-full hover:bg-secondary hover:text-primary-content">
                <Link href={`/productos/${item.slug}`} className="border-b-2 dark:border-transparent">
                  <p className="w-full">{item.name}</p>
                </Link>
              </li>
            ))}
            {product_categories.nodes.map((item: any) => (
              <Link href={`/productos/${item.slug}`} className={`p-2 w-full hover:bg-secondary hover:text-primary-content`} key={item.id}>
                <p className="w-full">{item.name}</p>
              </Link>
            ))}
            <li onClick={handleClickServices} className="p-2 hover:text-primary-content w-full cursor-pointer">
              <div className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent`}>
                <p className="p-2 w-full text-primary-content">SERVICIOS</p>
                <ChevronDownIcon width={20} height={20} />
              </div>
              {isExpandedServices && (
                <div className="relative w-full bg-transparent z-10" style={{ top: '100%' }}>
                  <ul className="flex flex-col">
                    {services.nodes.map((item: any, index: number) => (
                      <li key={index} className="m-2 ml-10 hover:bg-secondary hover:text-primary-content w-full">
                        <Link href={`/servicios/${item.slug}`} className={`border-b-2 dark:border-transparent`}>
                          <p className="w-full">{item.title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
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
export default function Navbar({
  links,
  logoUrl,
  logoText,
  locationText,
  socialLinks,
  acordeonLinks,
  whatsappLink,
}: {
  links: any;
  logoUrl: any;
  logoText: any;
  locationText: any;
  socialLinks: any;
  acordeonLinks: any;
  whatsappLink: any;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const closeMenu = () => {
    setMobileMenuOpen(false)
  }

  const [isSticky, setIsSticky] = useState(false);

  const linksSize = links.length;
  let linksMiddle: number;
  if (Math.floor(linksSize / 2) % 2 === 0) {
    linksMiddle = Math.floor(linksSize / 2);
  } else {
    linksMiddle = Math.floor(linksSize / 2);
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldStick = scrollY > 100

      if (shouldStick !== isSticky) {
        setIsSticky(shouldStick);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky]);



  const sortedNavLinks = links.sort((a, b) => {
    return a.order - b.order;
  });

  return (
    <>
      <div className={`p-4 text-default bg-default bg-base-100 justify-between relative w-full`}>
        <div className="flex justify-between h-24 mx-auto px-0 sm:px-6 w-[80%]">
          <Logo src={logoUrl}>
          </Logo>

          <div className="flex space-x-8">
            <div className="xl:grid grid-flow-col auto-cols-max justify-center items-center gap-2 hidden">
              <div className="align-middle mb-4">
                <MapPinIcon className="h-8 w-8 text-default" aria-hidden="true" />
              </div>
              <div className="flex flex-col justify-center items-center">
                <div
                  className="text-lg leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: locationText }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex justify-center items-center">
                <div className="md:grid grid-flow-col auto-cols-max justify content-center items-center gap-2 hidden">
                  {socialLinks.map((link: any) => (
                    <a
                      key={link.id}
                      rel="noopener noreferrer"
                      href={link.url}
                      title={link.text}
                      target={link.newTab ? "_blank" : "_self"}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-content text-base-100"
                    >
                      <RenderSocialIcon social={link.social[0]} />
                    </a>
                  ))}
                </div>
                <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-active hidden md:block mb-2">
                  {whatsappLink && <Link href={whatsappLink}>Whatsapp</Link>}
                </button>
              </div>
            </div>
          </div>

          <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed bg-base-100 inset-y-0 rtl:left-0 ltr:right-0 z-10 w-full overflow-y-auto bg-default px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
              <div className="flex items-center justify-between ">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Senvial</span>
                  {logoUrl &&
                    <Image
                      className="h-8 w-auto"
                      src={logoUrl}
                      alt=""
                      width={64}
                      height={64}
                    />
                  }
                </a>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-default"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className=" divide-y divide-gray-200/10">
                  <div className="space-y-2 py-6">
                    {links.slice(0, linksMiddle).map((item: any, index: number) => (
                      <MobileNavLink {...item} key={item.id}
                        closeMenu={closeMenu} />
                    ))}
                    {acordeonLinks.map((link: any, index: number) => (
                      <MobileNavExpandableLink key={link.id} product_categories={acordeonLinks[0].productCategories} services={acordeonLinks[0].services} url="/" newTab={false} text="PRODUCTOS Y SERVICIOS" id={index} />
                    ))}
                    {links.slice(linksMiddle).map((item: any, index: number) => (
                      <MobileNavLink key={item.id}
                        closeMenu={closeMenu} {...item} />
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
          <button
            className="p-4 lg:hidden"
            title="Open Menu"
            key={"..."}
            onClick={() => setMobileMenuOpen(true)} >
            <Bars3Icon className="h-7 w-7 text-default" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`lg:flex hidden align-middle items-center justify-center text-default w-[80%] mx-auto text-base-100 sticky ${isSticky ? 'top-0 w-full ' : 'bottom-10'} z-10`} style={{ marginBottom: "-50px", width: '100%' }}>
        <div className={`bg-primary-content w-full p-10 ${isSticky ? 'py-6 ' : ''}`} style={{ width: isSticky ? '100%' : '80%' }}>
          <ul className="flex justify-center divide-x divide-slate-500">
            {sortedNavLinks.slice(0, linksMiddle).map((item: any, index: number) => (
              <span
                className={`w-auto`}
                key={index}
              >
                <NavLink id={index} newTab={item.newTab} text={item.text} url={item.url} />
              </span>
            ))}
            {acordeonLinks.map((link: any, index: number) => (
              <span className={`w-auto`}
                key={index}>
                <NavExpandableLink key={link.id} product_categories={acordeonLinks[0].productCategories} services={acordeonLinks[0].services} url="/" newTab={false} text="PRODUCTOS Y SERVICIOS" id={index} />
              </span>
            ))}
            {sortedNavLinks.slice(linksMiddle).map((item: any, index: number) => (
              <span
                className={`w-auto`}
                key={index}
              >
                <NavLink id={index} newTab={item.newTab} text={item.text} url={item.url} />
              </span>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
