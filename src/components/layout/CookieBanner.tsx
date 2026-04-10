import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const { lang } = useLanguage();

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    const content = {
        fr: {
            title: "Nous respectons votre vie privée",
            desc: "Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. En cliquant sur \"Accepter\", vous consentez à l'utilisation de tous les cookies.",
            accept: "Tout accepter",
            decline: "Continuer sans accepter",
            more: "Politique de cookies"
        },
        en: {
            title: "We value your privacy",
            desc: "We use cookies to enhance your browsing experience and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
            accept: "Accept All",
            decline: "Continue without accepting",
            more: "Cookie Policy"
        }
    };

    const t = content[lang as "en" | "fr"] || content.en;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[10000]"
                >
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden relative group">
                        {/* Decorative glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                        
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                <Cookie className="w-5 h-5 text-white/70" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold mb-2">
                                    {t.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    {t.desc}{" "}
                                    <Link to="/cookies" className="text-white/60 hover:text-white underline underline-offset-4 transition-colors">
                                        {t.more}
                                    </Link>
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button 
                                        onClick={handleAccept}
                                        className="bg-white text-black hover:bg-white/90 rounded-xl px-6 h-11 font-medium text-sm transition-all active:scale-[0.98]"
                                    >
                                        {t.accept}
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        onClick={handleDecline}
                                        className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl px-6 h-11 font-medium text-sm"
                                    >
                                        {t.decline}
                                    </Button>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setIsVisible(false)}
                                className="text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
