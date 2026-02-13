import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavbarProps {
  variant?: "light" | "dark";
}

// Grid icon (4 squares)
function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  );
}

// List icon (3 horizontal lines)
function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="2" width="14" height="2" rx="1" />
      <rect x="1" y="7" width="14" height="2" rx="1" />
      <rect x="1" y="12" width="14" height="2" rx="1" />
    </svg>
  );
}

const SUBPAGES = ["/about", "/pricing", "/blog"];

export function Navbar({ variant = "light" }: NavbarProps) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const isDark = variant === "dark";
  const isHome = location.pathname === "/";
  const isOnSubpage = SUBPAGES.includes(location.pathname);
  // Pill is expanded if manually opened OR if on a subpage
  const [manualExpand, setManualExpand] = useState(false);
  const expanded = manualExpand || isOnSubpage;
  const pillRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorPos, setIndicatorPos] = useState({ left: 3, width: 52 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close manual expand on outside click (only if not on a subpage)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        manualExpand &&
        !isOnSubpage &&
        pillRef.current &&
        !pillRef.current.contains(e.target as Node)
      ) {
        setManualExpand(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [manualExpand, isOnSubpage]);

  // Reset manual expand when navigating to home
  useEffect(() => {
    if (isHome) {
      setManualExpand(false);
    }
  }, [isHome]);

  const handleListClick = useCallback(() => {
    if (!isOnSubpage) {
      setManualExpand((prev) => !prev);
    }
  }, [isOnSubpage]);

  const expandedLinks = [
    { label: t("nav.about"), to: "/about" },
    { label: t("nav.pricing"), to: "/pricing" },
    { label: t("nav.blog"), to: "/blog" },
  ];

  // Measure the active link position and move indicator there
  useEffect(() => {
    if (isHome && !manualExpand) {
      setIndicatorPos({ left: 3, width: 52 });
      return;
    }

    const activeIndex = expandedLinks.findIndex(link => link.to === location.pathname);

    if (activeIndex >= 0 && expanded) {
      const measure = () => {
        const el = linkRefs.current[activeIndex];
        if (el && pillRef.current) {
          const pillRect = pillRef.current.getBoundingClientRect();
          const elRect = el.getBoundingClientRect();
          if (elRect.width > 0) {
            setIndicatorPos({
              left: elRect.left - pillRect.left,
              width: elRect.width,
            });
            return true;
          }
        }
        return false;
      };

      // Measure multiple times to account for transition
      const intervals = [0, 50, 100, 200, 300, 400, 500];
      const timers = intervals.map(delay => setTimeout(measure, delay));

      return () => timers.forEach(clearTimeout);
    } else if (expanded) {
      // Manually expanded from home, not on a subpage
      setIndicatorPos({ left: 59, width: 52 });
    }
  }, [location.pathname, expanded, isHome, manualExpand, lang]); // Added lang dependency

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-20 py-4 lg:py-5 backdrop-blur-2xl bg-black/30 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
    >
      <div className="flex items-center justify-between">
        {/* Left: Name/Location */}
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="text-xs uppercase tracking-[0.12em] font-medium transition-all duration-300 hover:scale-105 hover:opacity-100 text-white flex items-center gap-2 group"
        >
          <img src="/favicon.ico" alt="Synaptics" className="w-6 h-6 rounded-sm opacity-80 group-hover:opacity-100 transition-opacity" />
          <span>
            Synaptics
            <span className="block lg:inline lg:ml-2 text-gray-500 group-hover:text-gray-400 transition-colors">
              {t("nav.location")}
            </span>
          </span>
        </Link>

        {/* Center: Expandable pill — stretches to reveal links */}
        <div
          ref={pillRef}
          className="relative flex items-center rounded-full backdrop-blur-xl bg-white/[0.07] border border-white/[0.12] shadow-[0_4px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        >
          {/* Sliding glass indicator — dynamically follows the active link */}
          <div
            className="absolute top-[3px] bottom-[3px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] bg-white/[0.15] backdrop-blur-md shadow-[0_2px_12px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.15)]"
            style={{
              width: `${indicatorPos.width}px`,
              left: `${indicatorPos.left}px`,
            }}
          />

          {/* Grid button — hover collapses (only if not on a subpage) */}
          <Link
            to="/"
            className={cn(
              "relative z-10 flex items-center justify-center w-14 h-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isHome && !expanded
                ? "text-white scale-110"
                : "text-gray-500 hover:text-gray-300 scale-100"
            )}
          >
            <GridIcon />
          </Link>

          {/* List button — toggles expansion */}
          <button
            onClick={handleListClick}
            className={cn(
              "relative z-10 flex items-center justify-center w-14 h-10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              expanded
                ? "text-white scale-110"
                : "text-gray-500 hover:text-gray-300 scale-100"
            )}
          >
            <ListIcon />
          </button>

          {/* Expanded links — appear inside the pill */}
          <div
            className={cn(
              "flex items-center overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              expanded ? "max-w-[400px] opacity-100 pr-2" : "max-w-0 opacity-0 pr-0"
            )}
          >
            {/* Subtle divider */}
            <div
              className={cn(
                "w-px h-5 bg-white/[0.12] mx-1 transition-opacity duration-300 shrink-0",
                expanded ? "opacity-100" : "opacity-0"
              )}
            />

            {expandedLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                ref={(el) => { linkRefs.current[i] = el; }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs uppercase tracking-[0.1em] font-medium whitespace-nowrap shrink-0",
                  "transition-all duration-300 ease-out",
                  "text-gray-400 hover:text-white",
                  location.pathname === link.to && "text-white",
                  expanded ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
                )}
                style={{
                  transitionDelay: expanded ? `${100 + i * 60}ms` : "0ms",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Lang Toggle + Social Links + Contact */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "fr" : "en")}
            className="relative flex items-center rounded-full overflow-hidden bg-white/[0.07] border border-white/[0.12] text-[10px] uppercase tracking-widest font-semibold"
          >
            <span
              className={cn(
                "relative z-10 px-2.5 py-1.5 transition-colors duration-300",
                lang === "en" ? "text-white" : "text-gray-500"
              )}
            >
              EN
            </span>
            <span
              className={cn(
                "relative z-10 px-2.5 py-1.5 transition-colors duration-300",
                lang === "fr" ? "text-white" : "text-gray-500"
              )}
            >
              FR
            </span>
            {/* Sliding indicator */}
            <div
              className="absolute top-[2px] bottom-[2px] w-[calc(50%-2px)] rounded-full bg-white/[0.15] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                left: lang === "en" ? "2px" : "calc(50%)",
              }}
            />
          </button>

          <Link
            to="/contact"
            className="text-xs uppercase tracking-[0.12em] font-medium px-4 py-2 rounded-full border border-white/[0.12] bg-white/[0.05] backdrop-blur-sm text-white hover:bg-white/[0.12] transition-all duration-300"
          >
            {t("nav.contacts")}
          </Link>
        </div>
      </div>
    </header>
  );
}