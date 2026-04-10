import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";

const TermsOfSale = () => {
    const { t } = useLanguage();
    const lastUpdated = new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <Layout variant="light">
            <div className="pt-24 pb-16 md:pt-32 md:pb-20 bg-white min-h-screen">
                <div className="container max-w-4xl mx-auto px-5 md:px-4">
                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 text-black tracking-tight">
                        Conditions Générales de Vente
                    </h1>
                    <p className="text-gray-500 mb-12">
                        Dernière mise à jour : {lastUpdated}
                    </p>

                    <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-black prose-headings:font-bold">
                        <section className="mb-12">
                            <h2>1. Objet</h2>
                            <p>
                                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre AVARİN LTD (Synaptics) et son client, dans le cadre de la fourniture de services d'automatisation par intelligence artificielle.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>2. Services</h2>
                            <p>
                                Synaptics propose des services d'agents vocaux IA, de tri d'emails, de traitement de documents et de relances automatisées. Chaque prestation fait l'objet d'un devis ou d'un contrat spécifique précisant le périmètre d'intervention.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>3. Tarifs et Paiement</h2>
                            <p>
                                Les prix sont indiqués en Euros (€) hors taxes. Le paiement s'effectue mensuellement par prélèvement ou virement, selon les modalités définies lors de la souscription. Tout retard de paiement pourra donner lieu à l'application de pénalités de retard.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>4. Durée et Résiliation</h2>
                            <p>
                                Sauf mention contraire, les contrats sont conclus pour une durée indéterminée avec une période d'engagement minimale définie dans le contrat. La résiliation peut être effectuée moyennant un préavis raisonnable.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>5. Responsabilité et Garanties</h2>
                            <p>
                                Synaptics s'engage à mettre en œuvre les moyens nécessaires pour assurer le bon fonctionnement des agents IA. Toutefois, la responsabilité de Synaptics est limitée au montant des sommes versées par le client au titre des services incriminés au cours des 12 derniers mois.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>6. Confidentialité</h2>
                            <p>
                                Les deux parties s'engagent à maintenir la confidentialité des informations échangées durant toute la durée du contrat et après sa cessation.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2>7. Droit applicable</h2>
                            <p>
                                Les présentes CGV sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution sera de la compétence exclusive des tribunaux de Paris.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TermsOfSale;
