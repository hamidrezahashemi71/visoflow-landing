import { SITE } from "@/lib/config";

export default function Logo({ small = false }: { small?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 font-bold text-text ${small ? "justify-center text-lg" : "text-[22px]"} tracking-tight`}>
      <span
        className={`grid place-items-center rounded-[11px] bg-(--gradient-primary) pt-1 leading-none text-text ${
          small ? "h-7 w-7 rounded-[9px] text-lg" : "h-8.5 w-8.5 text-[22px]"
        }`}
      >
        و
      </span>
      {SITE.name}
    </div>
  );
}
