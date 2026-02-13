import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "fr";

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
    en: {
        // Navbar
        "nav.location": "Paris, FR",
        "nav.contacts": "Contacts",
        "nav.pricing": "Pricing",
        "nav.about": "About",
        "nav.blog": "Case Studies",

        // Hero
        "hero.title.line1": "Synaptics",
        "hero.title.line2": "AI Agency",
        "hero.desc": "Automate calls, emails, documents, and workflows — 24/7 with intelligent AI agents built for your business.",

        // About Hero
        "about.hero.line1": "We build ",
        "about.hero.highlight1": "AI\u00a0agents",
        "about.hero.line2": "that automate ",
        "about.hero.highlight2": "every\u00a0task",
        "about.hero.sub1": "Synaptics — Paris-based AI agency",
        "about.hero.sub2": "automating business operations with",
        "about.hero.highlight3": "intelligent",
        "about.hero.sub3": " AI-powered agents.",

        // About Content
        "about.services": "Services",
        "about.techStack": "Tech Stack",
        "about.events": "Events",
        "about.service.receptionist": "AI Voice Agent",
        "about.service.receptionist.desc": "Calls answered & booked 24/7",
        "about.service.booking": "Email & Message Triage",
        "about.service.booking.desc": "Auto-sort, prioritize, and respond",
        "about.service.leads": "Document Processing",
        "about.service.leads.desc": "Scan, extract, and organize data",
        "about.service.crm": "Invoice & Follow-up Automation",
        "about.service.crm.desc": "Send reminders, track payments",
        "about.bio1": "No business should waste hours on tasks that AI can handle in seconds.",
        "about.bio2.pre": "We build custom ",
        "about.bio2.highlight": "AI\u00a0agents",
        "about.bio2.post": " for clinics, law firms, real estate agencies, and restaurants — agents that handle calls, sort emails, process documents, and chase invoices.",
        "about.bio3.pre": "Powered by advanced ",
        "about.bio3.highlight": "LLMs",
        "about.bio3.post": " and automation, they manage complex workflows end-to-end — before your team even opens their inbox.",
        "about.bio4.pre": "Stop hiring for repetitive work. Start scaling with an ",
        "about.bio4.highlight": "AI\u00a0workforce",
        "about.bio4.post": " that never sleeps.",

        // Contact
        "contact.title.line1": "Book a",
        "contact.title.line2": "demo.",
        "contact.desc": "Ready to automate your operations? Tell us about your business, and we'll build a custom AI solution for you.",
        "contact.useCase": "Use Case",
        "contact.useCase.desc": "AI agents for calls, emails, documents, invoicing, and custom workflows.",
        "contact.onboarding": "Onboarding",
        "contact.onboarding.desc": "Most agents deployed in 48-72h. Complex integrations 1-2 weeks.",
        "contact.pricing": "Pricing",
        "contact.pricing.desc": "Flat monthly retainers based on call volume. No hidden fees.",
        "contact.form.name": "Name",
        "contact.form.email": "Email",
        "contact.form.company": "Company",
        "contact.form.useCase": "Use Case",
        "contact.form.tellMore": "Tell us more",
        "contact.form.tellMore.placeholder": "How many calls do you get? What are you trying to solve?",
        "contact.form.budget": "Budget",
        "contact.form.budgetPlaceholder": "Select range",
        "contact.form.timeline": "Timeline",
        "contact.form.timelinePlaceholder": "e.g. ASAP, 2 weeks",
        "contact.form.referral": "How you found us",
        "contact.form.referralPlaceholder": "Google, referral...",
        "contact.form.media": "Favorite movie or album",
        "contact.form.mediaPlaceholder": "Just for fun 😄",
        "contact.form.submit": "Request Demo →",
        "contact.form.submitting": "Sending...",
        "contact.toast.success": "Your inquiry has been sent! We'll get back to you soon.",
        "contact.toast.error": "Failed to send your inquiry. Please try again.",
        "contact.budget.starter": "Starter (€500-€1k/mo)",
        "contact.budget.growth": "Growth (€1k-€3k/mo)",
        "contact.budget.enterprise": "Enterprise (€3k+/mo)",

        // Project types
        "project.type.medical": "Medical Clinic",
        "project.type.realestate": "Real Estate",
        "project.type.law": "Law Firm",
        "project.type.restaurant": "Restaurant",
        "project.type.other": "Other",

        // Footer
        "footer.cta": "Stop wasting time on manual tasks.",
        "footer.networking": "For Networking",
        "footer.updates": "For Updates",
        "footer.work": "For Work",
        "footer.copyright": "All rights reserved.",
        "footer.nav.work": "Work",
        "footer.nav.about": "About",
        "footer.nav.contact": "Contact",

        // Project Detail
        "projectDetail.notFound": "Project not found",
        "projectDetail.back": "Back to work",
        "projectDetail.year": "Year",
        "projectDetail.role": "Role",
        "projectDetail.services": "Services",

        // Stats
        "stats.title": "Results that speak for themselves",
        "stats.callsAnswered": "Calls answered",
        "stats.responseTime": "Avg response",
        "stats.moreBookings": "More bookings",
        "stats.uptime": "Uptime",

        // Audio Demo
        "audio.title": "Hear the difference",
        "audio.subtitle": "Compare a traditional workflow with our AI agent handling the same situation.",
        "audio.before": "Before — Manual Process",
        "audio.beforeDesc": "Missed calls. Unsorted emails. Lost leads.",
        "audio.after": "After — AI Agent",
        "audio.afterDesc": "Instant response. Tasks automated. Clients happy.",
        "audio.listenDemo": "Listen to demo",
        "audio.comingSoon": "Demo audio coming soon",

        // Testimonials
        "testimonials.title": "What our clients say",
        "testimonial.1.quote": "Since we switched to Synaptics, we haven't missed a single appointment request. Our booking rate went up 40% in the first month.",
        "testimonial.1.name": "Dr. Sophie Martin",
        "testimonial.1.role": "Director, Clinique Belleville",
        "testimonial.2.quote": "The AI handles 80% of our inbound calls perfectly. My team can now focus on actual client work instead of answering phones.",
        "testimonial.2.name": "Maître Jean-Pierre Dubois",
        "testimonial.2.role": "Partner, Cabinet Dubois & Associés",
        "testimonial.3.quote": "We were losing 15+ reservations per week to missed calls. Now every single one is handled, even at 2am.",
        "testimonial.3.name": "Maxime Laurent",
        "testimonial.3.role": "Owner, Le Comptoir Parisien",
        "testimonial.4.quote": "Setup took less than 48 hours. The voice quality is incredible — clients often don't realize they're speaking to an AI.",
        "testimonial.4.name": "Camille Rousseau",
        "testimonial.4.role": "CEO, Rousseau Immobilier",

        // Integrations
        "integrations.title": "Plugs into your stack",
        "integrations.subtitle": "Seamless integrations with the tools you already use.",

        // ROI Calculator
        "roi.title": "Calculate the time you're wasting",
        "roi.subtitle": "See how much manual tasks are really costing your business.",
        "roi.callsPerMonth": "Calls per month",
        "roi.missedPercent": "% of missed calls",
        "roi.avgDealValue": "Avg deal value (€)",
        "roi.result.missed": "Missed calls / month",
        "roi.result.revenue": "Revenue lost / month",
        "roi.result.year": "Revenue lost / year",
        "roi.cta": "Stop losing money →",

        // FAQ
        "faq.title": "Frequently asked questions",
        "faq.q1": "Does the AI understand accents and different speaking styles?",
        "faq.a1": "Yes. Our AI is trained on diverse French and English speech patterns, including regional accents, fast speakers, and background noise. It continuously improves through real-world conversations.",
        "faq.q2": "What happens if the AI can't answer a question?",
        "faq.a2": "The AI gracefully escalates to a human. It can transfer the call, take a detailed message, or schedule a callback — depending on your preference. You're always in control.",
        "faq.q3": "How long does setup take?",
        "faq.a3": "Most agents are deployed within 48-72 hours. Complex integrations with CRM systems or custom workflows may take 1-2 weeks. We handle everything — you just approve the voice and script.",
        "faq.q4": "Can callers tell they're speaking to an AI?",
        "faq.a4": "Our voices are built with cutting-edge synthesis technology. Most callers don't realize they're speaking to an AI. We prioritize natural conversation flow, appropriate pauses, and human-like intonation.",
        "faq.q5": "What integrations do you support?",
        "faq.a5": "We integrate with Google Calendar, Doctolib, HubSpot, Salesforce, and most CRM/booking systems via API. We also connect through Zapier, Make, and n8n for custom workflows.",
        "faq.q6": "Is my data secure?",
        "faq.a6": "Absolutely. All calls are encrypted, and we comply with GDPR. Call recordings are stored securely and can be auto-deleted based on your retention policy. We never sell or share your data.",

        // Pricing
        "pricing.title": "Simple, transparent pricing",
        "pricing.subtitle": "No hidden fees. No setup costs. Cancel anytime.",
        "pricing.starter": "Starter",
        "pricing.starter.price": "€500",
        "pricing.starter.period": "/month",
        "pricing.starter.desc": "Perfect for small businesses getting started with AI.",
        "pricing.starter.f1": "Up to 200 calls/month",
        "pricing.starter.f2": "1 AI voice agent",
        "pricing.starter.f3": "Calendar integration",
        "pricing.starter.f4": "Email notifications",
        "pricing.starter.f5": "Business hours only",
        "pricing.growth": "Growth",
        "pricing.growth.price": "€1,500",
        "pricing.growth.period": "/month",
        "pricing.growth.desc": "For growing teams that need 24/7 coverage.",
        "pricing.growth.f1": "Up to 1,000 calls/month",
        "pricing.growth.f2": "3 AI voice agents",
        "pricing.growth.f3": "CRM integration",
        "pricing.growth.f4": "Lead qualification",
        "pricing.growth.f5": "24/7 availability",
        "pricing.growth.f6": "Priority support",
        "pricing.popular": "Most Popular",
        "pricing.enterprise": "Enterprise",
        "pricing.enterprise.price": "Custom",
        "pricing.enterprise.period": "",
        "pricing.enterprise.desc": "Tailored solutions for high-volume operations.",
        "pricing.enterprise.f1": "Unlimited calls",
        "pricing.enterprise.f2": "Unlimited agents",
        "pricing.enterprise.f3": "Custom integrations",
        "pricing.enterprise.f4": "Dedicated account manager",
        "pricing.enterprise.f5": "SLA guarantee",
        "pricing.enterprise.f6": "White-label option",
        "pricing.cta.start": "Get Started",
        "pricing.cta.contact": "Contact Sales",
        "pricing.custom.note": "Every project is unique — contact us for a tailored quote.",

        // How It Works
        "howItWorks.title": "How it works",
        "howItWorks.subtitle": "From first call to full deployment in 3 simple steps.",
        "howItWorks.step1.title": "Tell us about your business",
        "howItWorks.step1.desc": "We analyze your call flow, understand your industry, and design a custom voice agent that speaks like your best receptionist.",
        "howItWorks.step2.title": "We configure your AI agent",
        "howItWorks.step2.desc": "We build the AI, integrate your calendar, CRM, and booking tools, then test everything until it's perfect.",
        "howItWorks.step3.title": "Go live — calls answered instantly",
        "howItWorks.step3.desc": "Your AI receptionist goes live. Every call is answered, booked, or qualified — 24/7, without lifting a finger.",

        // Floating CTA
        "floatingCta.title": "Ready to automate your business?",
        "floatingCta.desc": "Book a free demo and see your AI agents in action.",
        "floatingCta.button": "Book a Demo",

        // Video Demo
        "videoDemo.title": "See it in action",
        "videoDemo.subtitle": "Watch our AI agents automate real business tasks in under 3 minutes.",
        "videoDemo.watchDemo": "Watch the demo",
        "videoDemo.liveCall": "LIVE CALL SIMULATION",
        "videoDemo.feature1.title": "Natural voice",
        "videoDemo.feature1.desc": "Sounds human, not robotic",
        "videoDemo.feature2.title": "Instant booking",
        "videoDemo.feature2.desc": "Syncs to your calendar in real-time",
        "videoDemo.feature3.title": "Smart routing",
        "videoDemo.feature3.desc": "Escalates to humans when needed",

        // Trust Badge
        "trustBadge.gdpr": "GDPR Compliant",
        "trustBadge.response": "< 1s response",
        "trustBadge.clients": "50+ active clients",

        // Blog / Case Studies
        "blog.title": "Case Studies",
        "blog.subtitle": "See how businesses like yours are saving time and revenue with AI agents.",
        "blog.viewAll": "View all case studies",
        "blog.readMore": "Read case study",
        "blog.case1.title": "How a Medical Clinic Boosted Bookings by 40%",
        "blog.case1.desc": "City Medical Center was drowning in appointment calls. Our AI receptionist now handles every one — zero missed, 40% more confirmed bookings.",
        "blog.case1.stat": "more bookings",
        "blog.case2.title": "Zero Missed Leads for a Real Estate Agency",
        "blog.case2.desc": "Prime Estates agents were burning hours on unqualified inquiries. Now the AI qualifies every lead before it reaches a human.",
        "blog.case2.stat": "missed leads",
        "blog.case3.title": "24/7 Reservations for a Parisian Restaurant",
        "blog.case3.desc": "La Table D'Or stopped losing reservations to missed calls. The AI concierge handles bookings even at 2am.",
        "blog.case3.stat": "availability",
        "blog.case4.title": "100% Client Intake Coverage for a Law Firm",
        "blog.case4.desc": "Sterling Law Partners never miss a potential case. The AI collects details, assesses urgency, and routes high-value cases instantly.",
        "blog.case4.stat": "intake coverage",
        "blog.cta.title": "Ready to become a case study?",
        "blog.cta.desc": "Join 50+ businesses already using Synaptics to handle their calls.",
        "blog.cta.button": "Book a Demo",
        "blog.case5.title": "Global Logistics Optimized at Scale",
        "blog.case5.desc": "AeroFlow logistics was struggling with order tracking inquiries. Our AI agent now handles 90% of status calls, rerouting drones and trucks in real-time.",
        "blog.case5.stat": "shorter handle time",
        "blog.case6.title": "AI Recruitment Shortlisted Top Talent",
        "blog.case6.desc": "TalentFlow automated their preliminary screenings. The AI recruiter calls candidates, verify skills, and delivers a ranked shortlist within minutes.",
        "blog.case6.stat": "faster screening",
        "blog.case7.title": "Automobile Dealership Boosted Test Drives",
        "blog.case7.desc": "Luxury Motors increased test drive bookings by 50% by deploying an AI agent that answers technical specs and schedules appointments 24/7.",
        "blog.case7.stat": "more test drives",
        "blog.case8.title": "Financial Advisory — Trust at Every Call",
        "blog.case8.desc": "Aurum Analytics uses AI to triage high-net-worth inquiries, ensuring private bankers only receive qualified leads with full context.",
        "blog.case8.stat": "qualified leads",
        "blog.case9.title": "Luxeify Support: 0.5s Response Time",
        "blog.case9.desc": "E-commerce giant Luxeify eliminated hold times. The AI support agent resolves 80% of order issues without human intervention.",
        "blog.case9.stat": "response time",

        // Enhanced Footer
        "footer.col.product": "Product",
        "footer.col.company": "Company",
        "footer.col.legal": "Legal",
        "footer.col.social": "Follow Us",
        "footer.link.howItWorks": "How it Works",
        "footer.link.pricing": "Pricing",
        "footer.link.caseStudies": "Case Studies",
        "footer.link.demo": "Book a Demo",
        "footer.link.about": "About",
        "footer.link.contact": "Contact",
        "footer.link.careers": "Careers",
        "footer.link.privacy": "Privacy Policy",
        "footer.link.terms": "Terms of Service",
        "footer.link.gdpr": "GDPR",

        // Form validation
        "validation.nameRequired": "Name is required",
        "validation.nameTooLong": "Name must be less than 100 characters",
        "validation.emailInvalid": "Invalid email address",
        "validation.companyRequired": "Company name is required",
        "validation.useCaseRequired": "Please select a use case",
        "validation.descRequired": "Description is required",
        "validation.budgetRequired": "Please select a budget range",
        "validation.timelineRequired": "Timeline is required",
        "validation.referralRequired": "Please tell us how you found us",
    },

    fr: {
        // Navbar
        "nav.location": "Paris, FR",
        "nav.contacts": "Contact",
        "nav.pricing": "Tarifs",
        "nav.about": "À propos",
        "nav.blog": "Études de cas",

        // Hero
        "hero.title.line1": "Synaptics",
        "hero.title.line2": "Agence IA",
        "hero.desc": "Automatisez vos appels, emails, documents et flux de travail — 24h/24 avec des agents IA sur mesure.",

        // About Hero
        "about.hero.line1": "On crée des ",
        "about.hero.highlight1": "agents\u00a0IA",
        "about.hero.line2": "qui automatisent ",
        "about.hero.highlight2": "chaque\u00a0tâche",
        "about.hero.sub1": "Synaptics — Agence IA parisienne",
        "about.hero.sub2": "qui automatise vos opérations avec des",
        "about.hero.highlight3": "agents",
        "about.hero.sub3": " intelligents.",

        // About Content
        "about.services": "Services",
        "about.techStack": "Technologies",
        "about.events": "Événements",
        "about.service.receptionist": "Agent Vocal IA",
        "about.service.receptionist.desc": "Appels décrochés et réservés 24/7",
        "about.service.booking": "Tri Emails & Messages",
        "about.service.booking.desc": "Tri, priorité et réponses automatiques",
        "about.service.leads": "Traitement de Documents",
        "about.service.leads.desc": "Scan, extraction et classement",
        "about.service.crm": "Relances & Facturation",
        "about.service.crm.desc": "Envoi de rappels, suivi des paiements",
        "about.bio1": "Aucune entreprise ne devrait perdre du temps sur des tâches que l'IA peut gérer en quelques secondes.",
        "about.bio2.pre": "Nous créons des ",
        "about.bio2.highlight": "agents\u00a0IA",
        "about.bio2.post": " sur mesure pour les cliniques, cabinets d'avocats, agences immobilières et restaurants — des agents qui décrochent les appels, trient les emails, traitent les documents et relancent les factures.",
        "about.bio3.pre": "Propulsés par les ",
        "about.bio3.highlight": "LLMs",
        "about.bio3.post": " et l'automatisation avancée, ils gèrent des workflows complexes de bout en bout — avant même que votre équipe n'ouvre sa boîte mail.",
        "about.bio4.pre": "Arrêtez de recruter pour les tâches répétitives. Passez à une ",
        "about.bio4.highlight": "équipe\u00a0IA",
        "about.bio4.post": " qui ne dort jamais.",

        // Contact
        "contact.title.line1": "Réservez une",
        "contact.title.line2": "démo.",
        "contact.desc": "Prêt à automatiser vos opérations ? Parlez-nous de votre activité, et on vous crée une solution IA sur mesure.",
        "contact.useCase": "Cas d'usage",
        "contact.useCase.desc": "Agents IA pour appels, emails, documents, facturation et workflows personnalisés.",
        "contact.onboarding": "Déploiement",
        "contact.onboarding.desc": "La plupart des agents déployés en 48-72h. Intégrations complexes : 1-2 semaines.",
        "contact.pricing": "Tarifs",
        "contact.pricing.desc": "Forfaits mensuels fixes selon le volume d'appels. Sans frais cachés.",
        "contact.form.name": "Nom",
        "contact.form.email": "Email",
        "contact.form.company": "Entreprise",
        "contact.form.useCase": "Cas d'usage",
        "contact.form.tellMore": "Décrivez votre besoin",
        "contact.form.tellMore.placeholder": "Combien d'appels recevez-vous ? Quel problème souhaitez-vous résoudre ?",
        "contact.form.budget": "Budget",
        "contact.form.budgetPlaceholder": "Sélectionnez",
        "contact.form.timeline": "Délai",
        "contact.form.timelinePlaceholder": "ex. Urgent, 2 semaines",
        "contact.form.referral": "Comment vous nous avez trouvé",
        "contact.form.referralPlaceholder": "Google, recommandation...",
        "contact.form.media": "Film ou album préféré",
        "contact.form.mediaPlaceholder": "Juste pour le fun 😄",
        "contact.form.submit": "Demander une démo →",
        "contact.form.submitting": "Envoi...",
        "contact.toast.success": "Votre demande a été envoyée ! Nous vous recontactons très vite.",
        "contact.toast.error": "Échec de l'envoi. Veuillez réessayer.",
        "contact.budget.starter": "Starter (500€-1k€/mois)",
        "contact.budget.growth": "Growth (1k€-3k€/mois)",
        "contact.budget.enterprise": "Enterprise (3k€+/mois)",

        // Project types
        "project.type.medical": "Clinique médicale",
        "project.type.realestate": "Immobilier",
        "project.type.law": "Cabinet d'avocats",
        "project.type.restaurant": "Restaurant",
        "project.type.other": "Autre",

        // Footer
        "footer.cta": "Arrêtez de perdre du temps sur les tâches manuelles.",
        "footer.networking": "Réseau",
        "footer.updates": "Actualités",
        "footer.work": "Portfolio",
        "footer.copyright": "Tous droits réservés.",
        "footer.nav.work": "Projets",
        "footer.nav.about": "À propos",
        "footer.nav.contact": "Contact",

        // Project Detail
        "projectDetail.notFound": "Projet introuvable",
        "projectDetail.back": "Retour aux projets",
        "projectDetail.year": "Année",
        "projectDetail.role": "Rôle",
        "projectDetail.services": "Services",

        // Stats
        "stats.title": "Des résultats qui parlent d'eux-mêmes",
        "stats.callsAnswered": "Appels décrochés",
        "stats.responseTime": "Temps de réponse",
        "stats.moreBookings": "Plus de réservations",
        "stats.uptime": "Disponibilité",

        // Audio Demo
        "audio.title": "Écoutez la différence",
        "audio.subtitle": "Comparez un processus classique avec notre agent IA gérant la même situation.",
        "audio.before": "Avant — Processus manuel",
        "audio.beforeDesc": "Appels manqués. Emails non triés. Leads perdus.",
        "audio.after": "Après — Agent IA",
        "audio.afterDesc": "Réponse instantanée. Tâches automatisées. Clients satisfaits.",
        "audio.listenDemo": "Écouter la démo",
        "audio.comingSoon": "Audio démo bientôt disponible",

        // Testimonials
        "testimonials.title": "Ce que disent nos clients",
        "testimonial.1.quote": "Depuis qu'on utilise Synaptics, on n'a pas manqué une seule demande de rendez-vous. Notre taux de réservation a augmenté de 40% le premier mois.",
        "testimonial.1.name": "Dr. Sophie Martin",
        "testimonial.1.role": "Directrice, Clinique Belleville",
        "testimonial.2.quote": "L'IA gère parfaitement 80% de nos appels entrants. Mon équipe peut enfin se concentrer sur le travail client au lieu de répondre au téléphone.",
        "testimonial.2.name": "Maître Jean-Pierre Dubois",
        "testimonial.2.role": "Associé, Cabinet Dubois & Associés",
        "testimonial.3.quote": "On perdait plus de 15 réservations par semaine à cause des appels manqués. Maintenant chaque appel est traité, même à 2h du matin.",
        "testimonial.3.name": "Maxime Laurent",
        "testimonial.3.role": "Gérant, Le Comptoir Parisien",
        "testimonial.4.quote": "L'installation a pris moins de 48h. La qualité vocale est incroyable — les clients ne réalisent souvent pas qu'ils parlent à une IA.",
        "testimonial.4.name": "Camille Rousseau",
        "testimonial.4.role": "PDG, Rousseau Immobilier",

        // Integrations
        "integrations.title": "S'intègre à vos outils",
        "integrations.subtitle": "Connexion transparente avec les outils que vous utilisez déjà.",

        // ROI Calculator
        "roi.title": "Calculez le temps que vous perdez",
        "roi.subtitle": "Découvrez combien les tâches manuelles coûtent vraiment à votre entreprise.",
        "roi.callsPerMonth": "Appels par mois",
        "roi.missedPercent": "% d'appels manqués",
        "roi.avgDealValue": "Valeur moyenne d'un deal (€)",
        "roi.result.missed": "Appels manqués / mois",
        "roi.result.revenue": "CA perdu / mois",
        "roi.result.year": "CA perdu / an",
        "roi.cta": "Arrêtez de perdre de l'argent →",

        // FAQ
        "faq.title": "Questions fréquentes",
        "faq.q1": "L'IA comprend-elle les accents et différents styles de parole ?",
        "faq.a1": "Oui. Notre IA est entraînée sur des schémas de parole variés en français et anglais, y compris les accents régionaux, les locuteurs rapides et le bruit de fond. Elle s'améliore en continu grâce aux conversations réelles.",
        "faq.q2": "Que se passe-t-il si l'IA ne peut pas répondre à une question ?",
        "faq.a2": "L'IA transfère élégamment à un humain. Elle peut transférer l'appel, prendre un message détaillé ou planifier un rappel — selon vos préférences. Vous gardez toujours le contrôle.",
        "faq.q3": "Combien de temps prend l'installation ?",
        "faq.a3": "La plupart des agents sont déployés sous 48-72h. Les intégrations complexes avec des systèmes CRM ou des workflows personnalisés peuvent prendre 1-2 semaines. On s'occupe de tout — vous n'avez qu'à valider la voix et le script.",
        "faq.q4": "Les appelants se rendent-ils compte qu'ils parlent à une IA ?",
        "faq.a4": "Nos voix sont construites avec une technologie de synthèse de pointe. La plupart des appelants ne réalisent pas qu'ils parlent à une IA. Nous privilégions un flux de conversation naturel, des pauses appropriées et une intonation humaine.",
        "faq.q5": "Quelles intégrations proposez-vous ?",
        "faq.a5": "Nous nous intégrons avec Google Calendar, Doctolib, HubSpot, Salesforce et la plupart des CRM/systèmes de réservation via API. Nous nous connectons aussi via Zapier, Make et n8n pour les workflows personnalisés.",
        "faq.q6": "Mes données sont-elles sécurisées ?",
        "faq.a6": "Absolument. Tous les appels sont chiffrés et nous respectons le RGPD. Les enregistrements sont stockés de manière sécurisée et peuvent être supprimés automatiquement selon votre politique de rétention. Nous ne vendons ni ne partageons jamais vos données.",

        // Pricing
        "pricing.title": "Tarifs simples et transparents",
        "pricing.subtitle": "Sans frais cachés. Sans coût d'installation. Résiliable à tout moment.",
        "pricing.starter": "Starter",
        "pricing.starter.price": "500€",
        "pricing.starter.period": "/mois",
        "pricing.starter.desc": "Idéal pour les petites entreprises qui démarrent avec l'IA.",
        "pricing.starter.f1": "Jusqu'à 200 appels/mois",
        "pricing.starter.f2": "1 agent vocal IA",
        "pricing.starter.f3": "Intégration calendrier",
        "pricing.starter.f4": "Notifications email",
        "pricing.starter.f5": "Heures ouvrables uniquement",
        "pricing.growth": "Growth",
        "pricing.growth.price": "1 500€",
        "pricing.growth.period": "/mois",
        "pricing.growth.desc": "Pour les équipes en croissance qui ont besoin d'une couverture 24/7.",
        "pricing.growth.f1": "Jusqu'à 1 000 appels/mois",
        "pricing.growth.f2": "3 agents vocaux IA",
        "pricing.growth.f3": "Intégration CRM",
        "pricing.growth.f4": "Qualification de leads",
        "pricing.growth.f5": "Disponibilité 24/7",
        "pricing.growth.f6": "Support prioritaire",
        "pricing.popular": "Le plus populaire",
        "pricing.enterprise": "Enterprise",
        "pricing.enterprise.price": "Sur mesure",
        "pricing.enterprise.period": "",
        "pricing.enterprise.desc": "Solutions sur mesure pour les opérations à fort volume.",
        "pricing.enterprise.f1": "Appels illimités",
        "pricing.enterprise.f2": "Agents illimités",
        "pricing.enterprise.f3": "Intégrations personnalisées",
        "pricing.enterprise.f4": "Account manager dédié",
        "pricing.enterprise.f5": "Garantie SLA",
        "pricing.enterprise.f6": "Option marque blanche",
        "pricing.cta.start": "Commencer",
        "pricing.cta.contact": "Contacter les ventes",
        "pricing.custom.note": "Chaque projet est unique — contactez-nous pour un devis sur mesure.",

        // How It Works
        "howItWorks.title": "Comment ça marche",
        "howItWorks.subtitle": "Du premier appel au déploiement en 3 étapes simples.",
        "howItWorks.step1.title": "Parlez-nous de votre activité",
        "howItWorks.step1.desc": "On analyse votre flux d'appels, on comprend votre secteur, et on conçoit un agent vocal sur mesure qui parle comme votre meilleur(e) réceptionniste.",
        "howItWorks.step2.title": "On configure votre agent IA",
        "howItWorks.step2.desc": "On construit l'IA, on intègre votre calendrier, CRM et outils de réservation, puis on teste tout jusqu'à la perfection.",
        "howItWorks.step3.title": "C'est live — appels décrochés instantanément",
        "howItWorks.step3.desc": "Votre réceptionniste IA est en ligne. Chaque appel est décroché, réservé ou qualifié — 24/7, sans lever le petit doigt.",

        // Floating CTA
        "floatingCta.title": "Prêt à automatiser votre business ?",
        "floatingCta.desc": "Réservez une démo gratuite et voyez vos agents IA en action.",
        "floatingCta.button": "Réserver une démo",

        // Video Demo
        "videoDemo.title": "Voyez-le en action",
        "videoDemo.subtitle": "Regardez nos agents IA automatiser de vraies tâches en moins de 3 minutes.",
        "videoDemo.watchDemo": "Regarder la démo",
        "videoDemo.liveCall": "SIMULATION D'APPEL EN DIRECT",
        "videoDemo.feature1.title": "Voix naturelle",
        "videoDemo.feature1.desc": "Sonne humain, pas robotique",
        "videoDemo.feature2.title": "Réservation instantanée",
        "videoDemo.feature2.desc": "Synchronisé avec votre agenda en temps réel",
        "videoDemo.feature3.title": "Routage intelligent",
        "videoDemo.feature3.desc": "Transfert à un humain si nécessaire",

        // Trust Badge
        "trustBadge.gdpr": "Conforme RGPD",
        "trustBadge.response": "< 1s de réponse",
        "trustBadge.clients": "50+ clients actifs",

        // Blog / Case Studies
        "blog.title": "Études de cas",
        "blog.subtitle": "Découvrez comment des entreprises comme la vôtre économisent du temps et du chiffre d'affaires grâce aux agents IA.",
        "blog.viewAll": "Voir toutes les études de cas",
        "blog.readMore": "Lire l'étude de cas",
        "blog.case1.title": "Comment une clinique a augmenté ses RDV de 40%",
        "blog.case1.desc": "City Medical Center croulait sous les appels de rendez-vous. Notre réceptionniste IA gère désormais chaque appel — zéro raté, 40% de réservations en plus.",
        "blog.case1.stat": "plus de RDV",
        "blog.case2.title": "Zéro lead perdu pour une agence immobilière",
        "blog.case2.desc": "Les agents de Prime Estates perdaient des heures sur des demandes non qualifiées. L'IA qualifie chaque lead avant qu'il n'atteigne un humain.",
        "blog.case2.stat": "leads perdus",
        "blog.case3.title": "Réservations 24/7 pour un restaurant parisien",
        "blog.case3.desc": "La Table D'Or ne perd plus de réservations à cause d'appels manqués. Le concierge IA gère les réservations même à 2h du matin.",
        "blog.case3.stat": "disponibilité",
        "blog.case4.title": "100% de couverture d'accueil pour un cabinet d'avocats",
        "blog.case4.desc": "Sterling Law Partners ne rate plus aucun dossier potentiel. L'IA collecte les détails, évalue l'urgence et route les cas importants instantanément.",
        "blog.case4.stat": "couverture accueil",
        "blog.cta.title": "Prêt à devenir une étude de cas ?",
        "blog.cta.desc": "Rejoignez plus de 50 entreprises qui utilisent déjà Synaptics.",
        "blog.cta.button": "Réserver une démo",
        "blog.case5.title": "Logistique mondiale optimisée à grande échelle",
        "blog.case5.desc": "AeroFlow gérait difficilement les demandes de suivi. Notre agent IA traite 90% des appels de statut, reroutant camions et drones en temps réel.",
        "blog.case5.stat": "moins d'attente",
        "blog.case6.title": "L'IA recrute les meilleurs talents",
        "blog.case6.desc": "TalentFlow a automatisé ses entretiens préliminaires. Le recruteur IA appelle les candidats et livre une shortlist classée en quelques minutes.",
        "blog.case6.stat": "tri plus rapide",
        "blog.case7.title": "Concessionnaire auto : +50% d'essais",
        "blog.case7.desc": "Luxury Motors a boosté ses rendez-vous d'essais en déployant un agent IA qui répond aux questions techniques et planifie les visites 24/7.",
        "blog.case7.stat": "plus de visites",
        "blog.case8.title": "Conseil financier : la confiance à chaque appel",
        "blog.case8.desc": "Aurum Analytics utilise l'IA pour trier les demandes premium, garantissant aux banquiers privés des leads qualifiés avec tout le contexte.",
        "blog.case8.stat": "leads qualifiés",
        "blog.case9.title": "Support Luxeify : 0.5s de réponse",
        "blog.case9.desc": "Le géant du e-commerce Luxeify a éliminé l'attente. L'agent de support IA résout 80% des litiges commandes sans intervention humaine.",
        "blog.case9.stat": "temps de réponse",

        // Enhanced Footer
        "footer.col.product": "Produit",
        "footer.col.company": "Entreprise",
        "footer.col.legal": "Légal",
        "footer.col.social": "Suivez-nous",
        "footer.link.howItWorks": "Comment ça marche",
        "footer.link.pricing": "Tarifs",
        "footer.link.caseStudies": "Études de cas",
        "footer.link.demo": "Réserver une démo",
        "footer.link.about": "À propos",
        "footer.link.contact": "Contact",
        "footer.link.careers": "Carrières",
        "footer.link.privacy": "Politique de confidentialité",
        "footer.link.terms": "Conditions d'utilisation",
        "footer.link.gdpr": "RGPD",

        // Form validation
        "validation.nameRequired": "Le nom est requis",
        "validation.nameTooLong": "Le nom doit faire moins de 100 caractères",
        "validation.emailInvalid": "Adresse email invalide",
        "validation.companyRequired": "Le nom de l'entreprise est requis",
        "validation.useCaseRequired": "Veuillez sélectionner un cas d'usage",
        "validation.descRequired": "La description est requise",
        "validation.budgetRequired": "Veuillez sélectionner une fourchette de budget",
        "validation.timelineRequired": "Le délai est requis",
        "validation.referralRequired": "Dites-nous comment vous nous avez trouvé",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        const saved = localStorage.getItem("synaptics-lang");
        return (saved === "fr" || saved === "en") ? saved : "en";
    });

    const handleSetLang = (newLang: Lang) => {
        // Fade out → swap → fade in
        document.documentElement.classList.add("lang-transitioning");
        setTimeout(() => {
            setLang(newLang);
            localStorage.setItem("synaptics-lang", newLang);
            // Fade back in after React re-renders
            requestAnimationFrame(() => {
                document.documentElement.classList.remove("lang-transitioning");
            });
        }, 200);
    };

    const t = (key: string): string => {
        return translations[lang][key] ?? key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
    return context;
}
