import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    product: [
      { label: t("footer.link.howItWorks"), to: "/about" },
      { label: t("footer.link.pricing"), to: "/pricing" },
      { label: t("footer.link.caseStudies"), to: "/blog" },
      { label: t("footer.link.demo"), to: "/contact" },
    ],
    company: [
      { label: t("footer.link.about"), to: "/about" },
      { label: t("footer.link.contact"), to: "/contact" },
      { label: t("footer.link.careers"), href: "#" },
    ],
    legal: [
      { label: t("footer.link.privacy"), to: "/privacy" },
      { label: t("footer.link.terms"), to: "/terms" },
      { label: t("footer.link.gdpr"), to: "/gdpr" },
    ],
  };

  const socialLinks = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" /></svg>
      ),
    },
    {
      label: "X",
      href: "https://x.com/SynapticsIA",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      ),
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/synapticsia/",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
      ),
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/[0.06]">
      <div className="container py-16 md:py-20">
        {/* Top CTA */}
        <div className="mb-14">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.95] tracking-[-0.02em] mb-4">
            {t("footer.cta")}
          </h2>
          <a
            className="text-lg md:text-xl text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
            href="mailto:hello@synaptics.fr"
          >
            hello@synaptics.fr
            <span className="inline-block transition-transform group-hover:translate-x-1 text-gray-500">→</span>
          </a>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
          {/* Product */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
              {t("footer.col.product")}
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.product.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
              {t("footer.col.company")}
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.company.map((link) =>
                link.to ? (
                  <Link key={link.label} to={link.to} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
              {t("footer.col.legal")}
            </p>
            <div className="flex flex-col gap-3">
              {footerLinks.legal.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-gray-500 mb-4">
              {t("footer.col.social")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-gray-400 hover:text-white hover:border-white/[0.2] transition-all duration-300"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-wider">SYNAPTICS</span>
            <span className="text-xs text-gray-600">·</span>
            <span className="text-xs text-gray-600">Paris, France</span>
          </div>
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Synaptics. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}