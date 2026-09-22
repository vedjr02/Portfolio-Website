/** A Finder folder, drawn in the macOS light-appearance blue. */
export function FolderIcon({ className, tag }: { className?: string; tag?: string }) {
  return (
    <svg viewBox="0 0 32 26" className={className} aria-hidden>
      <path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7.2c.7 0 1.3.3 1.8.8L15.4 5H27.5A2.5 2.5 0 0 1 30 7.5V9H2z" fill="#5fa4e8" />
      <path d="M2 8.2A2.2 2.2 0 0 1 4.2 6h23.6A2.2 2.2 0 0 1 30 8.2v14.6a2.2 2.2 0 0 1-2.2 2.2H4.2A2.2 2.2 0 0 1 2 22.8z" fill="#8cc4f5" />
      <path d="M2 9.4h28" stroke="#b9dcfa" strokeWidth="0.8" />
      {tag && <circle cx="25.5" cy="20.5" r="3.4" fill={tag} stroke="#fff" strokeWidth="1.2" />}
    </svg>
  );
}
