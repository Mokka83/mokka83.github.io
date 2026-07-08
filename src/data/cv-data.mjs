const earlierCareer = [
  { period: "2023", client: "UniCredit S.p.A.", role: "Senior IT Consultant" },
  { period: "2023", client: "BTC Business Technology Consulting AG", role: "Senior IT Consultant" },
  { period: "2021-2022", client: "AVEVA", role: "Senior SCCM / Intune Implementation Specialist; Senior End User Compute Engineer" },
  { period: "2021", client: "Provectus Technologies GmbH", role: "Senior Modern Workplace Consultant" },
  { period: "2019-2020", client: "UniCredit S.p.A.", role: "Senior Windows 10 ICT Specialist" },
  { period: "2014-2019", client: "Mansoft A/S", role: "Senior Client Management Consultant" },
  { period: "2011-2014", client: "Installers A/S", role: "Desktop Management Specialist" },
  { period: "2006-2011", client: "Vestas", role: "Systems Administrator / Server Engineer" }
];

const education = [
  { title: "Data Technician", place: "EUC Syd, Sønderborg", year: "2006" },
  { title: "IT Supporter", place: "EUC Syd, Sønderborg", year: "2003" }
];

const certificationsEn = [
  "ITIL Foundation",
  "MCSA: Windows 8",
  "Microsoft Exam 70-698: Windows 10",
  "Administering and Deploying System Center 2012 Configuration Manager (70-243)",
  "Microsoft SCCM-related training"
];

const certificationsDe = [
  "ITIL Foundation",
  "MCSA: Windows 8",
  "Microsoft Exam 70-698: Windows 10",
  "Administering and Deploying System Center 2012 Configuration Manager (70-243)",
  "Microsoft-Schulungen zu SCCM"
];

const certificationsDa = [
  "ITIL Foundation",
  "MCSA: Windows 8",
  "Microsoft Exam 70-698: Windows 10",
  "Administering and Deploying System Center 2012 Configuration Manager (70-243)",
  "Microsoft SCCM-relateret træning"
];

const cvEn = {
  locale: "en",
  name: "Michael Møller",
  headline: "Independent IT Consultant",
  descriptor: "Modern Workplace · Endpoint Management · Enterprise Automation",
  linkedin: "https://www.linkedin.com/in/mokka83/",
  labels: {
    cv: "Consultant CV",
    profile: "Profile",
    selectedEngagements: "Selected Consulting Engagements",
    earlierExperience: "Earlier Consulting Experience",
    expertise: "Expertise",
    certifications: "Certifications & Training",
    education: "Education",
    languages: "Languages",
    secondaryCapabilities: "Secondary Capabilities"
  },
  engagementTitle: "Selected Consulting Engagements",
  engagementNote: "Selected independent engagements, with current mandates shown without published contract end dates.",
  availability: "I support clients through defined delivery scopes, long-term consulting engagements, architecture work, and targeted technical escalations.",
  languages: "Danish, English, German; conversational Ukrainian and Russian",
  profile: [
    "Senior independent consultant for enterprise endpoint platforms, workplace modernisation, and automation.",
    "Trusted in complex SCCM/MECM, Intune, Windows deployment, and security-hardening environments.",
    "Bridges architecture, hands-on implementation, operational handover, and technical escalation support."
  ],
  engagements: [
    {
      title: "Senior SCCM Specialist",
      client: "Rheinmetall AG",
      period: "May 2026-Present",
      summary: "Senior specialist support for Configuration Manager backend services during an IT infrastructure insourcing programme.",
      focus: [
        "Strengthen MECM/SCCM architecture, operations, and maintainability.",
        "Improve package standards, client repair patterns, and operational automation.",
        "Enable Level 2 teams through escalation support and practical technical guidance."
      ]
    },
    {
      title: "Senior SCCM Consultant",
      client: "AXA Konzern AG",
      period: "March 2024-Present",
      summary: "Long-running senior consulting mandate for enterprise SCCM operations and workplace modernisation.",
      focus: [
        "Maintain and optimise SCCM/MECM backend services in an enterprise environment.",
        "Support Windows deployment modernisation and transition planning away from MDT.",
        "Drive process improvement, automation, resilience, and Intune transition topics."
      ]
    },
    {
      title: "Senior Modern Workplace Architect",
      client: "AS-Consulting",
      period: "January 2026-June 2026",
      summary: "Architecture and delivery support for customer modern workplace environments.",
      focus: [
        "Design endpoint approaches across macOS, iPhone, Android, and surrounding tooling.",
        "Shape deployment, application-packaging, pilot, and UAT activities.",
        "Translate customer requirements into implementable workplace solutions."
      ]
    },
    {
      title: "Cloud Infrastructure / Modern Workplace Architect",
      client: "Rheinmetall AG",
      period: "July 2024-July 2025",
      summary: "Security-oriented architecture work for cloud and endpoint-management services in critical infrastructure contexts.",
      focus: [
        "Design Intune architecture, policy management, and endpoint hardening.",
        "Apply NIST and ISO/IEC 27000-aligned principles to MDM architecture.",
        "Plan offline MECM architecture for complex manufacturing infrastructure."
      ]
    },
    {
      title: "Client Solutions Manager",
      client: "Mercedes-Benz Group AG",
      period: "January 2023-July 2024",
      summary: "Solution delivery and coordination role supporting research and development departments.",
      focus: [
        "Coordinate vendors, reports, deliverables, and internal technical requirements.",
        "Support ServiceNow, change management, Microsoft 365, Intune, and Windows 11 migration topics.",
        "Represent stakeholder needs in technical advisory and delivery conversations."
      ],
      note: "Agency-employed, part-time"
    }
  ],
  earlierCareer,
  expertise: [
    { title: "Endpoint & Workplace", items: ["Microsoft Intune / Endpoint Manager", "Windows 10 / 11 deployment", "Autopilot and modern provisioning", "macOS, iOS, and Android management"] },
    { title: "SCCM / MECM", items: ["Architecture and operations", "Distribution, reporting, and troubleshooting", "PXE, task sequences, and imaging", "WSUS and patch processes"] },
    { title: "Security & Operations", items: ["Active Directory and Microsoft Entra ID", "Endpoint hardening and policy design", "NIST / ISO 27000-aligned principles", "Incident, change, and handover processes"] },
    { title: "Automation & Platforms", items: ["PowerShell, SQL, Python, C#, batch, VBScript", "Application packaging and lifecycle", "Azure administration", "VMware, Hyper-V, Citrix VDI"] },
    { title: "Applied AI", items: ["Small-scale AI-assisted documentation, research, and technical automation"] }
  ],
  education,
  certifications: certificationsEn
};

const translations = {
  de: {
    locale: "de",
    headline: "Freiberuflicher IT-Consultant",
    labels: {
      cv: "Consultant CV",
      profile: "Profil",
      selectedEngagements: "Ausgewählte Beratungsmandate",
      earlierExperience: "Frühere Beratungserfahrung",
      expertise: "Expertise",
      certifications: "Zertifizierungen & Training",
      education: "Ausbildung",
      languages: "Sprachen",
      secondaryCapabilities: "Weitere Fähigkeiten"
    },
    engagementTitle: "Ausgewählte Beratungsmandate",
    engagementNote: "Ausgewählte freiberufliche Beratungsmandate; aktuelle Mandate werden ohne veröffentlichte Vertragsenddaten dargestellt.",
    availability: "Ich unterstütze Kunden im Rahmen klar definierter Leistungsumfänge, langfristiger Beratungsmandate, Architekturarbeit und gezielter technischer Eskalationen.",
    languages: "Dänisch, Englisch, Deutsch; Ukrainisch und Russisch auf Konversationsniveau",
    profile: [
      "Freiberuflicher Senior Consultant für Enterprise-Endpoint-Plattformen, Workplace-Modernisierung und Automatisierung.",
      "Erfahren in komplexen SCCM/MECM-, Intune-, Windows-Deployment- und Security-Hardening-Umgebungen.",
      "Verbindet Architektur, praktische Umsetzung, Betriebsübergabe und technische Eskalationsunterstützung."
    ],
    engagements: [
      {
        title: "Senior SCCM Specialist",
        client: "Rheinmetall AG",
        period: "Mai 2026-Heute",
        summary: "Senior-Spezialistenunterstützung für Configuration-Manager-Backend-Services im Rahmen eines IT-Infrastruktur-Insourcings.",
        focus: [
          "Stärkung von MECM/SCCM-Architektur, Betrieb und Wartbarkeit.",
          "Verbesserung von Paketstandards, Client-Reparaturmustern und betrieblicher Automatisierung.",
          "Enablement von Level-2-Teams durch Eskalationssupport und praxisnahe technische Anleitung."
        ]
      },
      {
        title: "Senior SCCM Consultant",
        client: "AXA Konzern AG",
        period: "März 2024-Heute",
        summary: "Langfristiges Senior-Consulting-Mandat für Enterprise-SCCM-Betrieb und Workplace-Modernisierung.",
        focus: [
          "Betrieb und Optimierung von SCCM/MECM-Backend-Services in einer Enterprise-Umgebung.",
          "Unterstützung bei Windows-Deployment-Modernisierung und Ablöseplanung für MDT.",
          "Vorantreiben von Prozessverbesserung, Automatisierung, Resilienz und Intune-Transition-Themen."
        ]
      },
      {
        title: "Senior Modern Workplace Architect",
        client: "AS-Consulting",
        period: "Januar 2026-Juni 2026",
        summary: "Architektur- und Lieferunterstützung für Modern-Workplace-Umgebungen von Kunden.",
        focus: [
          "Entwurf von Endpoint-Ansätzen für macOS, iPhone, Android und angrenzende Werkzeuge.",
          "Strukturierung von Deployment, Application Packaging, Pilotierung und UAT.",
          "Übersetzung von Kundenanforderungen in umsetzbare Workplace-Lösungen."
        ]
      },
      {
        title: "Cloud Infrastructure / Modern Workplace Architect",
        client: "Rheinmetall AG",
        period: "Juli 2024-Juli 2025",
        summary: "Sicherheitsorientierte Architekturarbeit für Cloud- und Endpoint-Management-Services in kritischen Infrastrukturszenarien.",
        focus: [
          "Design von Intune-Architektur, Policy Management und Endpoint Hardening.",
          "Anwendung NIST- und ISO/IEC-27000-orientierter Prinzipien auf MDM-Architektur.",
          "Planung einer Offline-MECM-Architektur für komplexe Fertigungsinfrastruktur."
        ]
      },
      {
        title: "Client Solutions Manager",
        client: "Mercedes-Benz Group AG",
        period: "Januar 2023-Juli 2024",
        summary: "Solution Delivery und Koordination zur Unterstützung von Forschungs- und Entwicklungsbereichen.",
        focus: [
          "Koordination von Dienstleistern, Reports, Deliverables und internen technischen Anforderungen.",
          "Unterstützung bei ServiceNow, Change Management, Microsoft 365, Intune und Windows-11-Migration.",
          "Vertretung von Stakeholder-Anforderungen in technischen Beratungs- und Liefergesprächen."
        ],
        note: "Agenturangestellt, Teilzeit"
      }
    ],
    earlierCareer,
    expertise: [
      { title: "Endpoint & Workplace", items: ["Microsoft Intune / Endpoint Manager", "Windows 10 / 11 Deployment", "Autopilot und moderne Bereitstellung", "macOS-, iOS- und Android-Management"] },
      { title: "SCCM / MECM", items: ["Architektur und Betrieb", "Distribution, Reporting und Troubleshooting", "PXE, Task Sequences und Imaging", "WSUS- und Patch-Prozesse"] },
      { title: "Security & Operations", items: ["Active Directory und Microsoft Entra ID", "Endpoint Hardening und Policy Design", "NIST- / ISO-27000-orientierte Prinzipien", "Incident-, Change- und Übergabeprozesse"] },
      { title: "Automation & Plattformen", items: ["PowerShell, SQL, Python, C#, Batch, VBScript", "Application Packaging und Lifecycle", "Azure Administration", "VMware, Hyper-V, Citrix VDI"] },
      { title: "Applied AI", items: ["Gezielte KI-gestützte Dokumentation, Recherche und technische Automatisierung"] }
    ],
    education,
    certifications: certificationsDe
  },
  da: {
    locale: "da",
    headline: "Selvstændig IT-konsulent",
    labels: {
      cv: "Konsulent-CV",
      profile: "Profil",
      selectedEngagements: "Udvalgte konsulentopgaver",
      earlierExperience: "Tidligere konsulenterfaring",
      expertise: "Ekspertise",
      certifications: "Certificeringer & træning",
      education: "Uddannelse",
      languages: "Sprog",
      secondaryCapabilities: "Sekundære kompetencer"
    },
    engagementTitle: "Udvalgte konsulentopgaver",
    engagementNote: "Udvalgte selvstændige konsulentopgaver; aktuelle opgaver vises uden offentliggjorte kontraktslutdatoer.",
    availability: "Jeg understøtter kunder gennem klart definerede leveranceomfang, længerevarende konsulentopgaver, arkitekturarbejde og målrettede tekniske eskalationer.",
    languages: "Dansk, engelsk og tysk; ukrainsk og russisk på samtaleniveau",
    profile: [
      "Selvstændig seniorkonsulent inden for enterprise endpoint-platforme, workplace-modernisering og automatisering.",
      "Erfaren i komplekse SCCM/MECM-, Intune-, Windows-deployment- og security-hardening-miljøer.",
      "Forbinder arkitektur, praktisk implementering, driftsoverdragelse og teknisk eskalationssupport."
    ],
    engagements: [
      {
        title: "Senior SCCM Specialist",
        client: "Rheinmetall AG",
        period: "Maj 2026-Nu",
        summary: "Seniorspecialist-support til Configuration Manager-backendtjenester under et IT-infrastruktur-insourcingprogram.",
        focus: [
          "Styrke MECM/SCCM-arkitektur, drift og vedligeholdbarhed.",
          "Forbedre pakkestandarder, client-repair-mønstre og driftsautomatisering.",
          "Understøtte Level 2-teams med eskalationssupport og praktisk teknisk sparring."
        ]
      },
      {
        title: "Senior SCCM Consultant",
        client: "AXA Konzern AG",
        period: "Marts 2024-Nu",
        summary: "Længerevarende seniorkonsulentopgave inden for enterprise-SCCM-drift og workplace-modernisering.",
        focus: [
          "Vedligeholde og optimere SCCM/MECM-backendtjenester i et enterprise-miljø.",
          "Understøtte modernisering af Windows-deployment og transition væk fra MDT.",
          "Drive procesforbedring, automatisering, robusthed og Intune-transition-emner."
        ]
      },
      {
        title: "Senior Modern Workplace Architect",
        client: "AS-Consulting",
        period: "Januar 2026-Juni 2026",
        summary: "Arkitektur- og leverancesupport til kunders Modern Workplace-miljøer.",
        focus: [
          "Designe endpoint-tilgange på tværs af macOS, iPhone, Android og relaterede værktøjer.",
          "Forme deployment, applikationspakning, pilot og UAT-aktiviteter.",
          "Omsætte kundekrav til implementerbare workplace-løsninger."
        ]
      },
      {
        title: "Cloud Infrastructure / Modern Workplace Architect",
        client: "Rheinmetall AG",
        period: "Juli 2024-Juli 2025",
        summary: "Sikkerhedsorienteret arkitekturarbejde for cloud- og endpoint-management-services i kritiske infrastrukturscenarier.",
        focus: [
          "Designe Intune-arkitektur, policy management og endpoint hardening.",
          "Anvende NIST- og ISO/IEC-27000-orienterede principper i MDM-arkitektur.",
          "Planlægge offline MECM-arkitektur til kompleks produktionsinfrastruktur."
        ]
      },
      {
        title: "Client Solutions Manager",
        client: "Mercedes-Benz Group AG",
        period: "Januar 2023-Juli 2024",
        summary: "Løsningsleverance og koordinering til støtte for forsknings- og udviklingsafdelinger.",
        focus: [
          "Koordinere leverandører, rapporter, leverancer og interne tekniske krav.",
          "Understøtte ServiceNow, change management, Microsoft 365, Intune og Windows 11-migration.",
          "Repræsentere stakeholderbehov i tekniske rådgivnings- og leverancedialoger."
        ],
        note: "Ansat via bureau, deltid"
      }
    ],
    earlierCareer,
    expertise: [
      { title: "Endpoint & Workplace", items: ["Microsoft Intune / Endpoint Manager", "Windows 10 / 11 deployment", "Autopilot og moderne provisionering", "macOS-, iOS- og Android-management"] },
      { title: "SCCM / MECM", items: ["Arkitektur og drift", "Distribution, rapportering og fejlsøgning", "PXE, task sequences og imaging", "WSUS- og patch-processer"] },
      { title: "Security & Operations", items: ["Active Directory og Microsoft Entra ID", "Endpoint hardening og policy-design", "NIST- / ISO-27000-orienterede principper", "Incident-, change- og overdragelsesprocesser"] },
      { title: "Automation & Platforme", items: ["PowerShell, SQL, Python, C#, batch, VBScript", "Applikationspakning og lifecycle", "Azure-administration", "VMware, Hyper-V, Citrix VDI"] },
      { title: "Applied AI", items: ["Afgrænset AI-understøttet dokumentation, research og teknisk automatisering"] }
    ],
    education,
    certifications: certificationsDa
  }
};

export const cv = {
  en: cvEn,
  de: {
    ...cvEn,
    ...translations.de,
    descriptor: cvEn.descriptor,
    name: cvEn.name,
    linkedin: cvEn.linkedin
  },
  da: {
    ...cvEn,
    ...translations.da,
    descriptor: cvEn.descriptor,
    name: cvEn.name,
    linkedin: cvEn.linkedin
  }
};
