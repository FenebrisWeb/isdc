"use client";

import { useState, useEffect, useRef } from "react";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzmm8yoaSRDsXIS9TUVnhrvMrPuBvmP1M0TtZ6dqk8Vyr2zNq46VpQdjLNJlARgwXV54Q/exec";
const WA_NUMBER    = "918527266399";
const CALL_TEL     = "tel:+918527266399";
const CALL_DISPLAY = "+91 85272 66399";

const SERVICES = [
  "Work at Height / Tower Climbing",
  "Fire Safety Training",
  "First Aid Training",
  "Scaffolding Safety",
  "Confined Space Entry & Rescue",
  "Defensive Driving & Road Safety",
  "Behaviour Based Safety (BBS)",
  "Complete EHS Services Package",
  "Fire Risk Audit",
  "EHS Consulting & Compliance",
  "Other / Not Sure",
];

interface FormData {
  name: string; phone: string; email: string;
  service: string; company: string; city: string;
  message: string;
}
interface ChatMsg { from: "bot" | "user"; text: string; time: string; }

const EMPTY: FormData = { name: "", phone: "", email: "", service: "", company: "", city: "", message: "" };

const BOT_LINES = [
  "Hi there! 👋 I'm the *ISDC assistant*.\n\nPlease share your *name*, *phone number*, and *email* so we can get back to you.",
  "Thanks! 😊 Which *service* are you interested in?\n\nAlso let us know your *company* and *city* if applicable.",
  "Almost there! 🎯 Any *specific requirements* or preferred dates?\n\n_(You can skip this — just hit Send.)_",
];

const SUCCESS_MSG =
  "✅ *Thank you!* We've received your enquiry.\n\nOur team will get back to you shortly. You're being redirected to WhatsApp now! 🚀";

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

const WA_BG: React.CSSProperties = {
  backgroundColor: "#e5ddd5",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23b2b2b2' fill-opacity='0.08'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
};

export default function FloatingContact() {
  const [open, setOpen]             = useState(false);
  const [step, setStep]             = useState(0);
  const [form, setForm]             = useState<FormData>(EMPTY);
  const [errors, setErrors]         = useState<Partial<FormData>>({});
  const [msgs, setMsgs]             = useState<ChatMsg[]>([]);
  const [typing, setTyping]         = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone]             = useState(false);
  const [visible, setVisible]       = useState(false);
  const [showTop, setShowTop]       = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, done]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  function handleOpen() {
    if (open) { handleClose(); return; }
    setOpen(true);
    setStep(0);
    setForm(EMPTY);
    setErrors({});
    setDone(false);
    setMsgs([{ from: "bot", text: BOT_LINES[0], time: now() }]);
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => {
      setStep(0); setForm(EMPTY); setErrors({});
      setMsgs([]); setTyping(false); setDone(false);
    }, 350);
  }

  function startNew() {
    setStep(0);
    setForm(EMPTY);
    setErrors({});
    setDone(false);
    setTyping(false);
    setMsgs([{ from: "bot", text: BOT_LINES[0], time: now() }]);
  }

  function setField(f: keyof FormData, v: string) {
    setForm((p) => ({ ...p, [f]: v }));
    setErrors((p) => ({ ...p, [f]: "" }));
  }

  function validateStep(s: number): boolean {
    const e: Partial<FormData> = {};
    if (s === 0) {
      if (!form.name.trim())  e.name  = "Required";
      if (!form.phone.trim()) e.phone = "Required";
      else if (!/^[+\d\s\-(]{7,15}$/.test(form.phone)) e.phone = "Invalid number";
    }
    if (s === 1 && !form.service) e.service = "Please select a service";
    setErrors(e);
    return !Object.keys(e).length;
  }

  function next() {
    if (!validateStep(step)) return;
    const userText =
      step === 0
        ? [form.name, form.phone, form.email].filter(Boolean).join("\n")
        : step === 1
        ? [form.service, form.company, form.city].filter(Boolean).join("\n")
        : form.message || "(no additional notes)";
    setMsgs((m) => [...m, { from: "user", text: userText, time: now() }]);
    if (step < 2) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [...m, { from: "bot", text: BOT_LINES[step + 1], time: now() }]);
        setStep((s) => s + 1);
      }, 900);
    }
  }

  function submit() {
    if (!validateStep(step)) return;
    setMsgs((m) => [...m, { from: "user", text: form.message || "(no additional notes)", time: now() }]);
    setSubmitting(true);

    const waMsg = [
      "Hi ISDC Team! 👋",
      "I'd like to enquire about your EHS training services.",
      "",
      `📛 Name: ${form.name}`,
      `📱 Phone: ${form.phone}`,
      form.email   ? `📧 Email: ${form.email}`     : "",
      form.service ? `🎯 Service: ${form.service}` : "",
      form.company ? `🏢 Company: ${form.company}` : "",
      form.city    ? `📍 City: ${form.city}`       : "",
      form.message ? `💬 Note: ${form.message}`    : "",
      "",
      "Please get back to me. Thank you!",
    ].filter((l, i, a) => !(l === "" && (i === 0 || a[i - 1] === ""))).join("\n");

    // Open WhatsApp immediately — must be synchronous so browser allows the popup
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank");

    // Sheet submission in background — no await needed
    const payload = JSON.stringify({
      ...form,
      name: "🟢 " + form.name,
      source: "WhatsApp Widget",
      submittedAt: new Date().toISOString(),
    });
    fetch(`${SHEET_URL}?data=${encodeURIComponent(payload)}`, { method: "GET", mode: "no-cors" }).catch(() => {});

    setSubmitting(false);

    // Show success bubble and keep panel open
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setDone(true);
      setMsgs((m) => [...m, { from: "bot", text: SUCCESS_MSG, time: now() }]);
    }, 800);
  }

  const inp = (err?: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-2 transition-all ${
      err ? "border-red-400 focus:ring-red-100" : "border-gray-200 focus:border-[#1a9e4a] focus:ring-green-100"
    }`;

  if (!visible) return null;

  const isLastStep = step === 2;

  return (
    <>
      {/* ── Back to top — bottom left ── */}
      <div className="fixed bottom-5 left-5 z-[200]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="w-11 h-11 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-500 shadow-md hover:text-primary hover:border-primary hover:shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            opacity: showTop ? 1 : 0,
            transform: showTop ? "scale(1) translateY(0)" : "scale(0.7) translateY(8px)",
            pointerEvents: showTop ? "auto" : "none",
            transition: "opacity 0.3s ease, transform 0.3s ease, color 0.2s, border-color 0.2s",
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* ── WhatsApp + Call pill — bottom right ── */}
      <div className="fixed bottom-5 right-5 z-[200]">
        <div className="relative flex flex-col items-center gap-3">

          {/* ── WhatsApp button ── */}
          <button
            onClick={handleOpen}
            aria-label={open ? "Close chat" : "Chat on WhatsApp"}
            className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ background: "#0a5c52", boxShadow: "0 4px 20px rgba(10,92,82,0.55)" }}
          >
            {!open && (
              <span className="absolute inset-0 rounded-full animate-ping opacity-35" style={{ background: "#0a5c52" }} />
            )}
            <span className={`relative z-10 transition-all duration-300 ${open ? "rotate-90 scale-90" : "rotate-0 scale-100"}`}>
              {open ? (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <WhatsAppIcon className="w-7 h-7 text-white" />
              )}
            </span>
          </button>

          {/* ── Call button ── */}
          <a
            href={CALL_TEL}
            aria-label="Call us"
            className="group relative z-10 flex items-center overflow-hidden rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ height: "48px", paddingLeft: "13px", paddingRight: "13px", background: "#cc2128", boxShadow: "0 4px 18px rgba(204,33,40,0.50)" }}
          >
            <CallIcon className="w-5 h-5 text-white flex-shrink-0 phone-ring" />
            <span
              className="overflow-hidden whitespace-nowrap text-sm font-bold text-white transition-all duration-300"
              style={{ maxWidth: 0, opacity: 0 }}
              ref={(el) => {
                if (!el) return;
                const a = el.closest("a");
                if (!a) return;
                const show = () => { el.style.maxWidth = "155px"; el.style.opacity = "1"; el.style.marginLeft = "7px"; };
                const hide = () => { el.style.maxWidth = "0";     el.style.opacity = "0"; el.style.marginLeft = "0";  };
                a.addEventListener("mouseenter", show);
                a.addEventListener("mouseleave", hide);
              }}
            >
              {CALL_DISPLAY}
            </span>
          </a>
        </div>
      </div>

      {/* ── Backdrop ── */}
      {open && (
        <div className="fixed inset-0 z-[201] bg-black/30 backdrop-blur-[2px]" onClick={handleClose} />
      )}

      {/* ── WhatsApp chat panel ── */}
      <div
        className={`fixed z-[202] w-full sm:w-[370px] bottom-0 left-0 sm:bottom-[100px] sm:left-auto sm:right-5 sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ maxHeight: "88vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="flex items-center gap-3 px-4 py-3 flex-shrink-0" style={{ background: "#032d27" }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white/20" style={{ background: "#0a5c52" }}>
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-tight">ISDC Support</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#1a9e4a] inline-block" />
              <span className="text-white/70 text-[11px]">Online</span>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* chat messages */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-2" style={{ ...WA_BG, minHeight: "220px", maxHeight: "340px" }}>
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`relative max-w-[82%] px-3 py-2 rounded-xl text-sm leading-relaxed shadow-sm ${
                  m.from === "bot" ? "bg-white text-gray-800 rounded-tl-none" : "text-gray-800 rounded-tr-none"
                }`}
                style={m.from === "user" ? { background: "#dcf8c6" } : {}}
              >
                {m.from === "bot" && (
                  <span className="absolute -left-[6px] top-0 w-0 h-0" style={{ borderTop: "8px solid white", borderLeft: "8px solid transparent" }} />
                )}
                {m.from === "user" && (
                  <span className="absolute -right-[6px] top-0 w-0 h-0" style={{ borderTop: "8px solid #dcf8c6", borderRight: "8px solid transparent" }} />
                )}
                <p className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html:
                  m.text.replace(/\*(.*?)\*/g, "<strong>$1</strong>").replace(/_(.*?)_/g, "<em>$1</em>")
                }} />
                <p className={`text-[10px] mt-1 text-right ${m.from === "bot" ? "text-gray-400" : "text-gray-500"}`}>
                  {m.time}
                  {m.from === "user" && <span className="ml-1 text-[#53bdeb]">✓✓</span>}
                </p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex justify-start">
              <div className="bg-white rounded-xl rounded-tl-none px-4 py-3 shadow-sm relative">
                <span className="absolute -left-[6px] top-0 w-0 h-0" style={{ borderTop: "8px solid white", borderLeft: "8px solid transparent" }} />
                <div className="flex items-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-2 h-2 rounded-full bg-gray-400 inline-block"
                      style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* "Start new conversation" button shown after submission */}
          {done && !typing && (
            <div className="flex justify-center pt-2">
              <button
                onClick={startNew}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white shadow-md transition-all hover:scale-105 active:scale-95"
                style={{ background: "#0a5c52" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                Start new conversation
              </button>
            </div>
          )}
        </div>

        {/* input area — hidden after submission */}
        {!done && (
          <div className="flex-shrink-0 bg-[#f0f0f0] border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 pt-3 pb-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === step ? "24px" : "8px", background: i <= step ? "#0a5c52" : "#ccc" }} />
              ))}
            </div>

            <div className="px-3 pb-3 pt-2 space-y-2">
              {step === 0 && !typing && (
                <>
                  <div>
                    <input type="text" placeholder="Your full name *" value={form.name}
                      onChange={(e) => setField("name", e.target.value)} className={inp(errors.name)}
                      autoFocus onKeyDown={(e) => e.key === "Enter" && next()} />
                    {errors.name && <p className="text-red-500 text-xs mt-0.5 px-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="tel" placeholder="Phone number *" value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)} className={inp(errors.phone)}
                      onKeyDown={(e) => e.key === "Enter" && next()} />
                    {errors.phone && <p className="text-red-500 text-xs mt-0.5 px-1">{errors.phone}</p>}
                  </div>
                  <input type="email" placeholder="Email address (optional)" value={form.email}
                    onChange={(e) => setField("email", e.target.value)} className={inp()}
                    onKeyDown={(e) => e.key === "Enter" && next()} />
                </>
              )}

              {step === 1 && !typing && (
                <>
                  <div>
                    <select value={form.service} onChange={(e) => setField("service", e.target.value)} className={inp(errors.service)}>
                      <option value="">Select a service *</option>
                      {SERVICES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                    {errors.service && <p className="text-red-500 text-xs mt-0.5 px-1">{errors.service}</p>}
                  </div>
                  <input type="text" placeholder="Company name (optional)" value={form.company}
                    onChange={(e) => setField("company", e.target.value)} className={inp()} />
                  <input type="text" placeholder="City (optional)" value={form.city}
                    onChange={(e) => setField("city", e.target.value)} className={inp()} />
                </>
              )}

              {step === 2 && !typing && (
                <textarea rows={3} placeholder="Additional requirements (optional)…" value={form.message}
                  onChange={(e) => setField("message", e.target.value)} className={`${inp()} resize-none`} />
              )}

              {!typing && (
                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button onClick={() => { setErrors({}); setStep((s) => s - 1); }}
                      className="text-xs text-gray-500 hover:text-gray-700 font-semibold px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                      ← Back
                    </button>
                  )}
                  <div className="flex-1" />
                  <button
                    onClick={isLastStep ? submit : next}
                    disabled={submitting}
                    aria-label={isLastStep ? "Send on WhatsApp" : "Next"}
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-md transition-all hover:scale-110 active:scale-95 disabled:opacity-60"
                    style={{ background: "#0a5c52" }}
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    ) : isLastStep ? (
                      <WhatsAppIcon className="w-5 h-5 text-white" />
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0121.485 12 59.768 59.768 0 013.27 20.875L5.999 12zm0 0h7.5" />
                      </svg>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* footer */}
        <div className="bg-[#f0f0f0] pb-2 flex items-center justify-center gap-1">
          <WhatsAppIcon className="w-3 h-3 text-[#0a5c52]" />
          <p className="text-[10px] text-gray-400">End-to-end encrypted via WhatsApp</p>
        </div>
      </div>

      {/* ── keyframes ── */}
      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
        @keyframes phone-ring {
          0%,  100% { transform: rotate(0deg);   }
          5%         { transform: rotate(18deg);  }
          10%        { transform: rotate(-16deg); }
          15%        { transform: rotate(14deg);  }
          20%        { transform: rotate(-12deg); }
          25%        { transform: rotate(8deg);   }
          30%        { transform: rotate(-6deg);  }
          35%        { transform: rotate(3deg);   }
          40%        { transform: rotate(0deg);   }
        }
        .phone-ring {
          animation: phone-ring 2.4s ease-in-out infinite;
          transform-origin: bottom center;
        }
        @keyframes widget-glow-anim {
          0%   { background: radial-gradient(circle at 30% 50%, rgba(10,92,82,0.40) 0%, transparent 70%); }
          33%  { background: radial-gradient(circle at 70% 30%, rgba(204,33,40,0.28) 0%, transparent 70%); }
          66%  { background: radial-gradient(circle at 50% 80%, rgba(10,92,82,0.35) 0%, transparent 70%); }
          100% { background: radial-gradient(circle at 30% 50%, rgba(10,92,82,0.40) 0%, transparent 70%); }
        }
        .widget-glow {
          position: absolute;
          inset: 0;
          animation: widget-glow-anim 4s ease-in-out infinite;
          border-radius: 22px;
        }
      `}</style>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CallIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
