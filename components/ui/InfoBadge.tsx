type InfoBadgeSize = "sm" | "md" | "lg";

const sizeMap: Record<InfoBadgeSize, string> = {
  sm: "w-4 h-4 text-[9px]",
  md: "w-6 h-6 text-[12px]",
  lg: "w-8 h-8 text-[15px]",
};

interface InfoBadgeProps {
  size?: InfoBadgeSize;
  active?: boolean;
}

export function InfoBadge({ size = "sm", active = false }: InfoBadgeProps) {
  return (
    <span
      className={`${sizeMap[size]} rounded-full flex items-center justify-center shrink-0 font-bold text-bg leading-none pt-px transition-colors duration-300 ${
        active ? "bg-primary" : "bg-text"
      }`}
    >
      i
    </span>
  );
}
