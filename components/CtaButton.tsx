import { QUIZ_URL } from "@/lib/config";
import ArrowIcon from "./ArrowIcon";

type Props = {
  children: React.ReactNode;
  size?: "xl" | "xxl";
  className?: string;
};

export default function CtaButton({ children, size = "xxl", className = "" }: Props) {
  const sizeClasses = size === "xxl" ? "px-8 py-4 text-[16.5px]" : "px-6 py-3 text-[15px]";

  return (
    <a
      href={QUIZ_URL}
      className={`
        inline-flex items-center justify-center gap-2.5
        font-bold text-surface
        bg-primary rounded-xl
        shadow-[0_6px_0_0_var(--color-primary-deep)]
        transition-all duration-150 ease-out
        hover:brightness-105 hover:-translate-y-0.5 hover:shadow-[0_8px_0_0_var(--color-primary-deep)]
        active:translate-y-1 active:shadow-[0_2px_0_0_var(--color-primary-deep)]
        ${sizeClasses}
        ${className}
      `}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}
