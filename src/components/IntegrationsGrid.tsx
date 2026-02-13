import { useLanguage } from "@/contexts/LanguageContext";

const integrations = [
    { name: "Google Calendar", logo: "/images/logos/google-calendar.svg" },
    { name: "HubSpot", logo: "/images/logos/hubspot.svg" },
    { name: "Salesforce", logo: "/images/logos/salesforce.svg" },
    { name: "Doctolib", logo: "/images/logos/doctolib.svg" },
    { name: "Twilio", logo: "/images/logos/twilio.svg" },
    { name: "n8n", logo: "/images/logos/n8n.svg" },
    { name: "Make", logo: "/images/logos/make.svg" },
    { name: "Zapier", logo: "/images/logos/zapier.svg" },
];

export function IntegrationsGrid() {
    const { t } = useLanguage();

    return (
        <section className="py-24 md:py-32 bg-black relative overflow-hidden">
            <div className="container relative">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[-0.03em] mb-4">
                        {t("integrations.title")}
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        {t("integrations.subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
                    {integrations.map((integration, i) => (
                        <div
                            key={i}
                            className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 flex flex-col items-center gap-3 hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-500 cursor-default"
                        >
                            <img
                                src={integration.logo}
                                alt={integration.name}
                                className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-xs text-gray-400 font-medium tracking-wide text-center group-hover:text-white transition-colors duration-300">
                                {integration.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
