const items = [
  { type: "phrase" as const },
  { type: "phrase" as const },
  { type: "phrase" as const },
  { type: "phrase" as const },
  { type: "phrase" as const },
  { type: "phrase" as const },
];

function Phrase() {
  return (
    <span className="inline-flex items-baseline gap-4 mx-16 whitespace-nowrap">
      <span className="text-dark font-black text-5xl sm:text-6xl tracking-tight">Training</span>
      <span className="text-gray-400 italic text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>by</span>
      <span className="text-dark font-black text-5xl sm:text-6xl tracking-tight">ISDC</span>
      <span className="text-gray-300 text-4xl mx-1">·</span>
      <span className="text-primary italic text-5xl sm:text-6xl" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Experts Safety</span>
    </span>
  );
}

export default function MarqueeBanner() {
  return (
    <div className="overflow-hidden py-8 bg-white border-t border-b border-gray-100">
      {/* duplicate content ×2 so the loop is seamless */}
      <div
        className="flex"
        style={{ animation: "marqueeScroll 22s linear infinite" }}
      >
        {/* first copy */}
        {items.map((_, i) => <Phrase key={`a-${i}`} />)}
        {/* second copy — makes loop seamless */}
        {items.map((_, i) => <Phrase key={`b-${i}`} />)}
      </div>
    </div>
  );
}
