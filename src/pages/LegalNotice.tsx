import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const LegalNotice = () => {
    const { t } = useLanguage();
    const lastUpdated = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Layout variant="light">
            <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-white min-h-screen">
                <div className="container max-w-4xl mx-auto px-5 md:px-4">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-black tracking-tight">
                        Mentions Légales
                    </h1>
                    <p className="text-gray-500 mb-12">
                        Dernière mise à jour : {lastUpdated}
                    </p>

                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-black prose-headings:font-bold">
                        <section className="mb-12">
                            <h2>1. Éditeur du site</h2>
                            <p>
                                Le présent site web, accessible à l'adresse synaptics.fr, est édité par :
                            </p>
                            <div className="mt-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                                <p className="font-semibold text-black">AVARİN LTD</p>
                                <p>Email : <a href="mailto:hello@synaptics.fr" className="text-black underline">hello@synaptics.fr</a></p>
                                <p>Adresse : Paris, France</p>
                            </div>
                        </section>

                        <section className="mb-12">
                            <h2>2. Hébergement</h2>
                            <p>
                                Le site est hébergé par :
                                <br />
                                <strong>Vercel Inc.</strong>
                                <br />
                                340 S Lemon Ave #1192
                                <br />
                                Walnut, CA 91789, USA
                                <br />
                                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-black underline">https://vercel.com</a>
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>3. Propriété intellectuelle</h2>
                            <p>
                                L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété exclusive de Synaptics ou de ses partenaires. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Synaptics.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>4. Limitation de responsabilité</h2>
                            <p>
                                Synaptics s'efforce de fournir sur le site des informations aussi précises que possible. Toutefois, l'éditeur ne pourra être tenu responsable des omissions, des inexactitudes et des carences dans la mise à jour. L'utilisateur utilise le site à ses seuls risques.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>5. Droit applicable</h2>
                            <p>
                                Tout litige en relation avec l'utilisation du site est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default LegalNotice;
