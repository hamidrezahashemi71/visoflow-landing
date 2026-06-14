import { QUIZ_URL } from "@/lib/config";
import ArrowIcon from "./ArrowIcon";

type Props = { children: React.ReactNode; variant?: "primary" | "ghost" };

export default function CtaButton({ children, variant = "primary" }: Props) {
  const styles =
    variant === "primary"
      ? "bg-(--gradient-primary) text-text shadow-(--shadow-cta) hover:shadow-(--shadow-cta-hover)"
      : "bg-bg-deep text-text-soft border border-secondary/30 hover:border-secondary hover:bg-bg";
  return (
    <a href={QUIZ_URL}
      className={`group inline-flex items-center gap-2.5 rounded-full px-8.5 py-3.75 text-[16.5px] font-bold transition-all duration-200 hover:-translate-y-0.5 ${styles}`}>
      {children}
      <ArrowIcon />
    </a>
  );
}
