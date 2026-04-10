import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScroll } from "framer-motion";

export function FloatingCTA() {
    const { t } = useLanguage();
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.on("change", (latest) => {
            const scrollThreshold = window.innerHeight * 0.6;
            setVisible(latest > scrollThreshold);
        });
    }, [scrollY]);

    if (dismissed || !visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-6 sm:right-auto z-50 animate-slide-up">
            <div className="relative rounded-none sm:rounded-2xl border-t sm:border border-white/[0.1] bg-black/90 sm:bg-black/80 backdrop-blur-xl p-4 sm:p-5 shadow-2xl shadow-black/50 sm:max-w-xs">
                {/* Close button */}
                <button
                    onClick={() => setDismissed(true)}
                    className="absolute top-2 right-2 w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center text-gray-500 hover:text-white transition-colors"
                    aria-label="Close"
                >
                    ×
                </button>

                <p className="text-sm font-medium text-white mb-1 pr-8 sm:pr-4">
                    {t("floatingCta.title")}
                </p>
                <p className="text-xs text-gray-400 mb-3 sm:mb-4">
                    {t("floatingCta.desc")}
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-opacity"
                >
                    {t("floatingCta.button")}
                    <span>→</span>
                </Link>
            </div>
        </div>
    );
}
