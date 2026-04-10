import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const CookiePolicy = () => {
    const { t } = useLanguage();
    const lastUpdated = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Layout variant="light">
            <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-white min-h-screen">
                <div className="container max-w-4xl mx-auto px-5 md:px-4">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-black tracking-tight">
                        Politique de Cookies
                    </h1>
                    <p className="text-gray-500 mb-12">
                        Dernière mise à jour : {lastUpdated}
                    </p>

                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-black prose-headings:font-bold">
                        <section className="mb-12">
                            <h2>1. Qu'est-ce qu'un cookie ?</h2>
                            <p>
                                Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site. Ils sont largement utilisés pour faire fonctionner les sites web, ou pour les faire fonctionner plus efficacement, ainsi que pour fournir des informations aux propriétaires du site.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>2. Comment utilisons-nous les cookies ?</h2>
                            <p>
                                Synaptics utilise des cookies pour :
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>Assurer le bon fonctionnement technique du site (cookies essentiels).</li>
                                <li>Analyser l'audience et les performances du site via des outils comme Vercel Analytics.</li>
                                <li>Mémoriser vos préférences, notamment votre choix de langue.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2>3. Types de cookies utilisés</h2>
                            <p>
                                <strong>Cookies strictement nécessaires :</strong> Ces cookies sont indispensables pour vous permettre de naviguer sur le site et d'utiliser ses fonctionnalités.
                                <br />
                                <strong>Cookies de performance et d'analyse :</strong> Ces cookies recueillent des informations sur la façon dont les visiteurs utilisent le site, afin d'en améliorer le fonctionnement.
                                <br />
                                <strong>Cookies de préférence :</strong> Ces cookies permettent au site de se souvenir de vos choix (comme votre langue).
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>4. Gestion des cookies</h2>
                            <p>
                                Vous pouvez à tout moment configurer votre navigateur pour bloquer les cookies ou vous avertir de leur présence. Notez que si vous refusez les cookies essentiels, certaines parties du site pourraient ne pas fonctionner correctement.
                            </p>
                            <p className="mt-4">
                                Pour plus d'informations sur la gestion des cookies selon votre navigateur :
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" className="underline">Google Chrome</a></li>
                                    <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" className="underline">Safari</a></li>
                                    <li><a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies-preferences" target="_blank" className="underline">Firefox</a></li>
                                </ul>
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>5. Nous contacter</h2>
                            <p>
                                Pour toute question concernant notre utilisation des cookies, contactez-nous à : <a href="mailto:compliance@synaptics.fr" className="underline">compliance@synaptics.fr</a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CookiePolicy;
