type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-3 py-16">
      <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-lg text-base leading-7 text-[var(--color-muted)]">{description}</p>
    </div>
  );
}
