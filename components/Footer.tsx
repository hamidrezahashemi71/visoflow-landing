import Logo from "./Logo";
import { SITE } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10 text-center text-[13px] text-text-soft">
      <div className="mx-auto max-w-280 px-6">
        <div className="mb-2"><Logo small /></div>
        <div>{SITE.tagline} · {SITE.year}</div>
      </div>
    </footer>
  );
}
