import Logo from "./Logo";
import { QUIZ_URL } from "@/lib/config";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-17 max-w-280 items-center justify-between px-6">
        <Logo />
        <a href={QUIZ_URL}
          className="rounded-full bg-(--gradient-primary) px-5.5 py-2 text-sm font-bold text-text transition-transform hover:-translate-y-0.5">
          شروع ارزیابی
        </a>
      </div>
    </nav>
  );
}
