import Image from "next/image";
import Logo from "./Logo";
import { SITE, CONTACT, ARCHITECH, FOOTER_LINKS } from "@/lib/config";

// Filled (solid) icons, white via currentColor — no badge, per the reference image.
const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: "shrink-0 text-white transition-colors group-hover:text-primary",
};

function MapPinIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M6.62 10.79a15.53 15.53 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.36 11.36 0 0 0 3.57.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.57 1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...iconProps} aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 4 8 5 8-5V6l-8 5-8-5v2Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-[#1c1c1e] text-[13px] text-white/65"
    >
      <div className="mx-auto max-w-280 px-6 py-6 md:py-8">
        <div className="grid gap-4 md:gap-12 md:grid-cols-[1.4fr_1fr_1.1fr]">
          <div className="text-center md:text-right">
            <Logo variant="wordmark" className="brightness-0 invert" />
            <p className="mx-auto max-w-md text-justify leading-8 text-white/45 md:mx-0">
              {SITE.tagline}
            </p>
          </div>
          <nav aria-label="دسترسی سریع" className="text-start">
            <h3 className="mb-5 text-sm font-bold text-white">دسترسی سریع</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-start text-start">
            <h3 className="mb-5 text-sm font-bold text-white">تماس با ما</h3>
            <ul className="space-y-4">
              {CONTACT.phone && (
                <li className="group flex items-center justify-start gap-3">
                  <MapPinIcon />
                  <span className="transition-colors group-hover:text-white">
                    {CONTACT.phone}
                  </span>
                </li>
              )}
              {CONTACT.address && (
                <li>
                  <a
                    href={`tel:${CONTACT.address.replace(/[^\d+]/g, "")}`}
                    className="group flex items-center justify-start gap-3 transition-colors hover:text-white"
                  >
                    <PhoneIcon />
                    <span>{CONTACT.address}</span>
                  </a>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="group flex items-center justify-start gap-3 transition-colors hover:text-white"
                >
                  <MailIcon />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>

      <div className=" bg-black/30">
        <div className="mx-auto flex w-full flex-col items-center gap-3 p-2 text-center text-white/40 md:flex-row md:justify-between md:text-right">
          <span className="order-3 md:order-1">
            © {SITE.name} {SITE.year} — تمامی حقوق محفوظ است.
          </span>

          <a
            href={ARCHITECH.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-1order-1 transition-opacity hover:opacity-70 md:order-3"
          >

            <p className=" leading-7">
              محصولی از گروه نرم افزاری
            </p>
            <Image
              src="/architech-logomark-light-fa.png"
              alt={ARCHITECH.nameEn}
              width={80}
              height={24}
              className="h-5 w-auto align-middle opacity-80 brightness-0 invert"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
