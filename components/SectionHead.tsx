type Props = { kicker: string; title: string; lead?: string };
export default function SectionHead({ kicker, title, lead }: Props) {
  return (
    <div className="mx-auto mb-14 max-w-160 text-center">
      <div className="mb-2.5 inline-flex items-center gap-2 text-[13.5px] font-bold tracking-wide text-primary">
        <span className="h-px w-6 bg-(--gradient-line-fade)" />
        {kicker}
        <span className="h-px w-6 bg-(--gradient-line-fade)" />
      </div>
      <h2 className="mb-3 text-[clamp(30px,4vw,42px)] leading-[1.4] font-bold text-text">{title}</h2>
      {lead && <p className="text-base text-text-soft">{lead}</p>}
    </div>
  );
}
