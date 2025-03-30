import Link from "next/link";
import { Logo } from "../logo";

interface FooterLinkProps {
  title: string;
  data: { title: string; external: boolean; href: string }[];
}

const footer_links = {
  help: [
    { title: "Help", href: "/", external: false },
    { title: "Report", href: "/", external: false },
    { title: "Status", href: "/", external: false },
  ],
  legal: [
    { title: "Terms of Service", href: "/", external: false },
    { title: "Privacy Policy", href: "/", external: false },
  ],
  others: [
    { title: "About Us", href: "/", external: false },
    {
      title: "Repository",
      href: "https://github.com/toufiqnuur/sev.my.id/",
      external: true,
    },
    {
      title: "Trakteer",
      href: "https://trakteer.id/toufiqnuurr/tip",
      external: true,
    },
  ],
};

const FooterLinkGroup = ({ title, data }: FooterLinkProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h4 className="text-md font-heading mb-2 font-semibold text-indigo-400">
        {title}
      </h4>
      {data.map((link: { title: string; external: boolean; href: string }) => (
        <div key={link.title}>
          {link.external ? (
            <a
              href={link.href}
              className="group relative"
              target="_blank"
              rel="noopener noreferrer"
            >
              &gt; {link.title}
              <span className="bg-primary-foreground absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ) : (
            <Link href={link.href} className="group relative">
              &gt; {link.title}
              <span className="bg-primary-foreground absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="mt-12 text-zinc-100 md:mt-16 lg:mt-24">
      <div className="container rounded-t-3xl bg-white/5 px-6 py-8 md:flex md:gap-32 md:px-8 md:py-12">
        <div className="max-w-48">
          <Logo />
          <span className="mt-8 block text-sm font-semibold opacity-50">
            &copy; 2024 Sev | Handmade in Special Region of Yogyakarta,
            Indonesia
          </span>
        </div>
        <div className="grid w-full grid-cols-2 gap-8 max-sm:mt-8 md:grid-cols-3">
          <FooterLinkGroup title="Help & Support" data={footer_links.help} />
          <FooterLinkGroup title="Legal" data={footer_links.legal} />
          <FooterLinkGroup title="Others" data={footer_links.others} />
        </div>
      </div>
    </footer>
  );
}
