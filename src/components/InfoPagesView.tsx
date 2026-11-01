import React from 'react';
import { ArrowLeft, Shield, FileText, Info, Mail } from 'lucide-react';

export type InfoTab = 'about' | 'privacy' | 'terms' | 'contact';

interface InfoPagesViewProps {
  initialTab?: InfoTab;
  onNavigateToList: () => void;
  onTabChange?: (tab: InfoTab) => void;
}

export const InfoPagesView: React.FC<InfoPagesViewProps> = ({
  initialTab = 'about',
  onNavigateToList,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = React.useState<InfoTab>(initialTab);

  const handleTabClick = (tab: InfoTab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onNavigateToList}
            className="flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Terug naar lijst
          </button>
          <h2 className="text-xl font-bold text-gray-800">Informatie & Ondersteuning</h2>
        </div>

        <div className="flex flex-wrap gap-1 border-b border-gray-100 pb-2 sm:border-0 sm:pb-0">
          <button
            onClick={() => handleTabClick('about')}
            className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'about'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Info className="mr-1.5 h-3.5 w-3.5" />
            Over de app
          </button>
          <button
            onClick={() => handleTabClick('privacy')}
            className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'privacy'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            Privacybeleid
          </button>
          <button
            onClick={() => handleTabClick('terms')}
            className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'terms'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="mr-1.5 h-3.5 w-3.5" />
            Voorwaarden
          </button>
          <button
            onClick={() => handleTabClick('contact')}
            className={`flex items-center rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'contact'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Mail className="mr-1.5 h-3.5 w-3.5" />
            Contact
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm leading-relaxed text-gray-700">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Over Replenish for Work
            </h3>
            <p className="text-sm">
              Replenish for Work is een gespecialiseerd hulpmiddel voor voorraadbeheer en tijdige vervanging van bedrijfsmiddelen en verbruiksgoederen.
              Ontworpen voor kantoren, horeca, detailhandel, klinieken, scholen en magazijnen in Nederland en Vlaanderen.
            </p>
            <h4 className="text-base font-semibold text-gray-800 pt-2">
              Belangrijkste functionaliteiten:
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>
                <strong>Lokale gegevensopslag:</strong> Geen account vereist. Al uw voorraadgegevens blijven veilig opgeslagen in uw lokale browser storage.
              </li>
              <li>
                <strong>Slimme cyclusberekening:</strong> Automatische waarschuwingen wanneer artikelen hun vervaldatum naderen.
              </li>
              <li>
                <strong>Branche-sjablonen:</strong> Directe voorraadpresets voor kantoren, restaurants, zorgpraktijken en meer.
              </li>
              <li>
                <strong>Kalender & Tijdlijn:</strong> Inzichtelijke maandoverzichten en registratie van onderhoudskosten.
              </li>
              <li>
                <strong>Back-up & Herstel:</strong> Eenvoudig exporteren en importeren via JSON-bestanden.
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Privacybeleid
            </h3>
            <p className="text-sm">
              Wij hechten grote waarde aan de bescherming van uw privacy en de naleving van de Algemene Verordening Gegevensbescherming (AVG/GDPR).
            </p>
            <h4 className="text-base font-semibold text-gray-800 pt-2">
              Opslag van gegevens
            </h4>
            <p className="text-sm">
              Alle artikelen, inventarislijsten en kostenregistraties die u in deze applicatie invoert, worden uitsluitend lokaal op uw apparaat (in de LocalStorage van uw webbrowser) opgeslagen.
              Er worden geen gegevens geüpload naar of verwerkt op externe servers.
            </p>
            <h4 className="text-base font-semibold text-gray-800 pt-2">
              Cookies en tracking
            </h4>
            <p className="text-sm">
              Deze applicatie maakt geen gebruik van trackingcookies van derden voor gepersonaliseerde advertenties.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Gebruiksvoorwaarden
            </h3>
            <p className="text-sm">
              Door gebruik te maken van Replenish for Work gaat u akkoord met de onderstaande bepalingen:
            </p>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>
                De applicatie wordt geleverd "zoals deze is" (as-is), zonder enige expliciete of impliciete garanties omtrent foutloze werking of ononderbroken beschikbaarheid.
              </li>
              <li>
                Aanbevolen vervangingscycli zijn indicatieve richtlijnen. De gebruiker blijft zelf verantwoordelijk voor de naleving van geldende veiligheids- en hygiënenormen.
              </li>
              <li>
                Omdat gegevens lokaal in uw browser worden bewaard, raden wij aan regelmatig een back-up te maken met de exportfunctie.
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">
              Contact & Ondersteuning
            </h3>
            <p className="text-sm">
              Heeft u vragen, feedback of suggesties voor verbetering van Replenish for Work? Neem gerust contact met ons op via het onderstaande e-mailadres:
            </p>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <span className="text-xs font-semibold text-gray-500 uppercase">E-mail:</span>
              <p className="text-sm font-bold text-emerald-600 mt-1">support@easy-log.app</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
