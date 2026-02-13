import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "@/components/ScrollReveal";

interface CaseStudy {
    slug: string;
    industry: string;
    titleKey: string;
    descKey: string;
    stat: string;
    statLabelKey: string;
    color: string;
    image: string;
}

const caseStudies: CaseStudy[] = [
    {
        slug: "medical-clinic",
        industry: "HEALTHCARE",
        titleKey: "blog.case1.title",
        descKey: "blog.case1.desc",
        stat: "+40%",
        statLabelKey: "blog.case1.stat",
        color: "from-emerald-500/20 to-teal-500/20",
        image: "/images/medical-clinic.png",
    },
    {
        slug: "law-firm",
        industry: "LEGAL",
        titleKey: "blog.case4.title",
        descKey: "blog.case4.desc",
        stat: "100%",
        statLabelKey: "blog.case4.stat",
        color: "from-amber-500/20 to-yellow-500/20",
        image: "/images/law-firm.png",
    },
    {
        slug: "real-estate",
        industry: "REAL ESTATE",
        titleKey: "blog.case2.title",
        descKey: "blog.case2.desc",
        stat: "0",
        statLabelKey: "blog.case2.stat",
        color: "from-blue-500/20 to-indigo-500/20",
        image: "/images/real-estate.png",
    },
    {
        slug: "restaurant",
        industry: "HOSPITALITY",
        titleKey: "blog.case3.title",
        descKey: "blog.case3.desc",
        stat: "24/7",
        statLabelKey: "blog.case3.stat",
        color: "from-orange-500/20 to-red-500/20",
        image: "/images/restaurant.png",
    },
    {
        slug: "logistics",
        industry: "LOGISTICS",
        titleKey: "blog.case5.title",
        descKey: "blog.case5.desc",
        stat: "90%",
        statLabelKey: "blog.case5.stat",
        color: "from-purple-500/20 to-indigo-500/20",
        image: "/images/logistics.png",
    },
    {
        slug: "recruitment",
        industry: "RECRUITMENT",
        titleKey: "blog.case6.title",
        descKey: "blog.case6.desc",
        stat: "24h",
        statLabelKey: "blog.case6.stat",
        color: "from-cyan-500/20 to-blue-500/20",
        image: "/images/recruitment.png",
    },
    {
        slug: "automobile",
        industry: "AUTOMOTIVE",
        titleKey: "blog.case7.title",
        descKey: "blog.case7.desc",
        stat: "+50%",
        statLabelKey: "blog.case7.stat",
        color: "from-slate-500/20 to-zinc-500/20",
        image: "/images/automobile.png",
    },
    {
        slug: "finance",
        industry: "FINANCE",
        titleKey: "blog.case8.title",
        descKey: "blog.case8.desc",
        stat: "100%",
        statLabelKey: "blog.case8.stat",
        color: "from-yellow-500/20 to-orange-500/20",
        image: "/images/finance.png",
    },
    {
        slug: "ecommerce-support",
        industry: "ECOMMERCE",
        titleKey: "blog.case9.title",
        descKey: "blog.case9.desc",
        stat: "0.5s",
        statLabelKey: "blog.case9.stat",
        color: "from-fuchsia-500/20 to-pink-500/20",
        image: "/images/ecommerce.png",
    },
];

export function HomeCaseStudies() {
    const { t } = useLanguage();

    return (
        <section className="container py-20 lg:py-32">
            <ScrollReveal>
                <div className="mb-12 md:mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        {t("blog.title")}
                    </h2>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        {t("blog.subtitle")}
                    </p>
                </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudies.slice(0, 2).map((study, i) => (
                    <ScrollReveal key={study.slug} delay={i * 0.1}>
                        <Link
                            to={`/project/${study.slug}`}
                            className="group block rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-500"
                        >
                            {/* Image */}
                            <div className={`aspect-[16/10] bg-gradient-to-br ${study.color} relative overflow-hidden`}>
                                <img
                                    src={study.image}
                                    alt={t(study.titleKey)}
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Stat overlay */}
                                <div className="absolute bottom-4 right-4 rounded-xl bg-black/60 backdrop-blur-sm border border-white/[0.1] px-4 py-2 text-center">
                                    <p className="text-2xl font-bold text-white leading-none">{study.stat}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{t(study.statLabelKey)}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">
                                    {study.industry}
                                </span>
                                <h2 className="text-xl font-semibold text-white mt-2 mb-3 group-hover:text-gray-200 transition-colors">
                                    {t(study.titleKey)}
                                </h2>
                                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                                    {t(study.descKey)}
                                </p>
                                <div className="mt-5 text-xs text-gray-500 group-hover:text-white transition-colors inline-flex items-center gap-1">
                                    {t("blog.readMore")}
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    </ScrollReveal>
                ))}
            </div>

            <div className="mt-12 md:mt-20 text-center">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold px-8 py-4 rounded-full border border-white/[0.12] bg-white/[0.05] text-white hover:bg-white/[0.1] transition-all duration-300 group"
                >
                    {t("blog.viewAll")}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
            </div>
        </section>
    );
}
