import Image from "next/image";
import Logo from "./Logo";
import { SITE, CONTACT, ARCHITECH, FOOTER_LINKS } from "@/lib/config";

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-line bg-bg text-[13px] text-text-soft">
      <div className="mx-auto max-w-280 px-6 py-14">
        {/* Top: brand · quick links · contact */}
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Logo variant="lockup" />
            <p className="mt-3 max-w-xs leading-7">{SITE.tagline}</p>
          </div>

          {/* Quick links */}
          <nav aria-label="پیوندهای سریع">
            <h3 className="mb-3 text-xs font-bold text-text">دسترسی سریع</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-primary-deep"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-xs font-bold text-text">ارتباط با ما</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="transition-colors hover:text-primary-deep"
                  dir="ltr"
                >
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phone && (
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-primary-deep"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              {CONTACT.address && <li className="leading-7">{CONTACT.address}</li>}
            </ul>
          </div>
        </div>

        {/* Mother-company band */}
        <div className="mt-10 rounded-2xl border border-line bg-surface px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="leading-7">
              {SITE.name} محصولی از{" "}
              <a
                href={ARCHITECH.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary-deep transition-opacity hover:opacity-70"
              >
                {ARCHITECH.name}
              </a>{" "}
              است.
            </p>
            <span className="text-text-soft">
              شماره ثبت: {ARCHITECH.registerNo}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center gap-1 border-t border-line pt-6 text-center text-text-soft md:flex-row md:justify-between md:text-right">
          <span>
            © {SITE.year} {SITE.name} — تمام حقوق محفوظ است.
          </span>
          <a
            href={ARCHITECH.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-primary-deep"
          >
            <Image
              src="/architech-logomark-light-fa.png"
              alt={ARCHITECH.nameEn}
              width={120}
              height={24}
              className="inline-block h-8 w-auto align-middle"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
