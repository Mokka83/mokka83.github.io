const expertiseEn = [
  {
    title: "Endpoint Management & Modern Workplace",
    items: ["Microsoft Intune and Endpoint Manager", "Windows 10 and Windows 11 deployment and management", "macOS, iOS, and Android enterprise management", "Autopilot and modern provisioning"]
  },
  {
    title: "SCCM / MECM Architecture & Operations",
    items: ["SCCM/MECM architecture, administration, distribution, reporting, and troubleshooting", "Windows deployment, imaging, PXE, task sequences, and MDT transition", "application packaging, lifecycle management, and deployment standards", "WSUS and patch-management processes"]
  },
  {
    title: "Security Hardening & Operational Architecture",
    items: ["Active Directory and Microsoft Entra ID / Azure AD", "security hardening and policy management", "NIST and ISO/IEC 27000-aligned architecture principles", "incident, change, and operational process design"]
  },
  {
    title: "Cloud, Virtualisation & Enterprise Platforms",
    items: ["Azure administration and cloud infrastructure", "VMware, Hyper-V, Citrix VDI, and application virtualisation", "ServiceNow, Remedy, Service Manager, Omnitracker, KACE, and Sysinternals"]
  },
  {
    title: "Windows Deployment, Packaging & Automation",
    items: ["PowerShell, batch, VBScript, SQL, Python, C, C#, and HTML", "application packaging from requirements through UAT", "automation for operational resilience and escalation support"]
  },
  {
    title: "Applied AI & Automation",
    items: ["local and cloud LLM workflows", "agent-based automation concepts", "computer-vision and generative-AI experimentation", "practical use of AI tooling for documentation, research, and technical automation"]
  }
];

const expertiseDe = [
  {
    title: "Endpoint Management & Modern Workplace",
    items: ["Microsoft Intune und Endpoint Manager", "Windows 10 und Windows 11: Deployment und Management", "macOS-, iOS- und Android-Enterprise-Management", "Autopilot und moderne Bereitstellung"]
  },
  {
    title: "SCCM / MECM Architektur & Betrieb",
    items: ["SCCM/MECM-Architektur, Administration, Distribution, Reporting und Troubleshooting", "Windows Deployment, Imaging, PXE, Task Sequences und MDT-Transition", "Application Packaging, Lifecycle Management und Deployment-Standards", "WSUS und Patch-Management-Prozesse"]
  },
  {
    title: "Security Hardening & Betriebsarchitektur",
    items: ["Active Directory und Microsoft Entra ID / Azure AD", "Security Hardening und Policy Management", "NIST- und ISO/IEC-27000-orientierte Architekturprinzipien", "Incident-, Change- und Betriebsprozessdesign"]
  },
  {
    title: "Cloud, Virtualisierung & Enterprise-Plattformen",
    items: ["Azure Administration und Cloud Infrastructure", "VMware, Hyper-V, Citrix VDI und Application Virtualization", "ServiceNow, Remedy, Service Manager, Omnitracker, KACE und Sysinternals"]
  },
  {
    title: "Windows Deployment, Packaging & Automatisierung",
    items: ["PowerShell, Batch, VBScript, SQL, Python, C, C# und HTML", "Application Packaging von Anforderungen bis UAT", "Automatisierung für Betriebsstabilität und Eskalationsunterstützung"]
  },
  {
    title: "Applied AI & Automation",
    items: ["lokale und Cloud-basierte LLM-Workflows", "Konzepte für agentenbasierte Automatisierung", "Experimente mit Computer Vision und generativer KI", "praxisnaher Einsatz von KI-Tools für Dokumentation, Recherche und technische Automatisierung"]
  }
];

const expertiseDa = [
  {
    title: "Endpoint Management & Modern Workplace",
    items: ["Microsoft Intune og Endpoint Manager", "Windows 10 og Windows 11: deployment og management", "enterprise-management af macOS, iOS og Android", "Autopilot og moderne provisionering"]
  },
  {
    title: "SCCM / MECM arkitektur & drift",
    items: ["SCCM/MECM-arkitektur, administration, distribution, rapportering og fejlsøgning", "Windows-deployment, imaging, PXE, task sequences og MDT-transition", "applikationspakning, lifecycle management og deploymentstandarder", "WSUS og patch-management-processer"]
  },
  {
    title: "Security hardening & driftsarkitektur",
    items: ["Active Directory og Microsoft Entra ID / Azure AD", "security hardening og policy management", "NIST- og ISO/IEC-27000-orienterede arkitekturprincipper", "design af incident-, change- og driftsprocesser"]
  },
  {
    title: "Cloud, virtualisering & enterprise-platforme",
    items: ["Azure-administration og cloudinfrastruktur", "VMware, Hyper-V, Citrix VDI og application virtualisation", "ServiceNow, Remedy, Service Manager, Omnitracker, KACE og Sysinternals"]
  },
  {
    title: "Windows-deployment, pakning & automatisering",
    items: ["PowerShell, batch, VBScript, SQL, Python, C, C# og HTML", "applikationspakning fra krav til UAT", "automatisering til driftsrobusthed og eskalationssupport"]
  },
  {
    title: "Applied AI & Automation",
    items: ["lokale og cloudbaserede LLM-workflows", "koncepter for agentbaseret automatisering", "eksperimenter med computer vision og generativ AI", "praktisk brug af AI-værktøjer til dokumentation, research og teknisk automatisering"]
  }
];

const baseEngagements = [
  ["Senior SCCM Specialist", "Rheinmetall AG", "Independent Senior SCCM Specialist"],
  ["Senior Modern Workplace Architect", "AS-Consulting", "Independent Senior Modern Workplace Architect"],
  ["Senior SCCM Consultant", "AXA Konzern AG", "Independent Senior SCCM Consultant"],
  ["Senior Cloud Infrastructure Architect / Modern Workplace Architect", "Rheinmetall AG", "Independent Senior Cloud Infrastructure Architect / Modern Workplace Architect"],
  ["Client Solutions Manager", "Mercedes-Benz Group AG", "Client Solutions Manager"],
  ["Senior IT Consultant", "UniCredit S.p.A.", "Senior IT Consultant"],
  ["Senior IT Consultant", "BTC Business Technology Consulting AG", "Senior IT Consultant"],
  ["Senior End User Compute Engineer", "AVEVA", "Senior End User Compute Engineer"],
  ["Senior SCCM / Intune Implementation Specialist", "AVEVA", "Senior SCCM / Intune Implementation Specialist"],
  ["Senior Modern Workplace Consultant", "Provectus Technologies GmbH", "Senior Modern Workplace Consultant"],
  ["Senior Windows 10 ICT Specialist", "UniCredit S.p.A.", "Senior Windows 10 ICT Specialist"]
];

const earlier = [
  ["Senior Client Management Consultant", "Mansoft A/S", "September 2014-February 2019"],
  ["Desktop Management Specialist", "Installers A/S", "March 2011-September 2014"],
  ["Systems Administrator", "Vestas Wind Systems A/S", "July 2007-March 2011"],
  ["Server Engineer", "Vestas Control Systems A/S", "September 2006-July 2007"]
];

export const cv = {
  en: {
    locale: "en",
    name: "Michael Møller",
    headline: "Independent IT Consultant",
    descriptor: "Modern Workplace · Endpoint Management · Enterprise Automation",
    linkedin: "https://www.linkedin.com/in/mokka83/",
    languages: "Danish, English, German; conversational Ukrainian and Russian",
    profile: [
      "Independent senior IT infrastructure and modern workplace consultant with more than 15 years of experience designing, operating, and modernising enterprise endpoint, deployment, and cloud environments. Strong focus on SCCM/MECM, Intune, Windows deployment, security hardening, automation, and operational architecture in large international organisations.",
      "I work from requirements and design through implementation, pilot, user acceptance testing, operational handover, and technical escalation support. My consulting approach combines structured incident management, practical automation, clear documentation, and close collaboration with specialist teams and service providers."
    ],
    engagementTitle: "Selected Consulting Engagements",
    engagementNote: "Selected independent engagements. Where delivery scopes permit, multiple mandates may be delivered concurrently under separately agreed responsibilities.",
    engagements: [
      {
        title: baseEngagements[0][0], client: baseEngagements[0][1], role: baseEngagements[0][2], period: "May 2026-Present",
        summary: "Support the continued professionalisation and expansion of Configuration Manager backend services during an IT infrastructure insourcing programme.",
        focus: ["MECM/SCCM platform architecture and operations", "package standards, client repair, and operational automation", "backend security, maintainability, and scalable service design", "technical enablement and escalation support for Level 2 teams"],
        technologies: ["MECM", "SCCM", "PowerShell"]
      },
      {
        title: baseEngagements[1][0], client: baseEngagements[1][1], role: baseEngagements[1][2], period: "January 2026-June 2026",
        summary: "Delivered end-to-end modern workplace solutions for customer environments, with a focus on macOS, iPhone, Android, deployment tooling, and packaging strategy.",
        focus: ["Apple, Android, and surrounding modern workplace environments", "endpoint deployment tools and application packaging", "requirements, design, implementation, pilot, and UAT"],
        technologies: ["macOS", "iOS", "Android", "deployment tooling"]
      },
      {
        title: baseEngagements[2][0], client: baseEngagements[2][1], role: baseEngagements[2][2], period: "March 2024-Present",
        summary: "Maintain and modernise enterprise SCCM infrastructure while delivering project-based enhancements.",
        focus: ["SCCM/MECM backend operations and optimisation", "Windows deployment modernisation and MDT phase-out", "process improvement, automation, and operational resilience", "transition planning toward Intune and modern management"],
        technologies: ["SCCM", "MECM", "MDT", "Intune", "PowerShell"]
      },
      {
        title: baseEngagements[3][0], client: baseEngagements[3][1], role: baseEngagements[3][2], period: "July 2024-July 2025",
        summary: "Designed and implemented robust, security-oriented cloud and endpoint-management architecture for critical infrastructure contexts.",
        focus: ["Intune architecture, policy management, and hardening", "NIST and ISO/IEC 27000-aligned MDM architecture", "offline MECM architecture for complex manufacturing infrastructure", "security, regulatory requirements, and enterprise-scale design"],
        technologies: ["Intune", "MECM", "NIST", "ISO/IEC 27000"]
      },
      {
        title: baseEngagements[4][0], client: baseEngagements[4][1], role: baseEngagements[4][2], period: "January 2023-July 2024",
        summary: "Delivered and drove technical solutions for R&D departments, coordinated vendors, managed reports and deliverables, and represented internal requirements.",
        focus: ["solution delivery and vendor coordination", "ServiceNow, change management, Microsoft 365, and Intune", "stakeholder communication and technical advisory", "Windows 11 migration support"],
        note: "Agency-employed, part-time"
      },
      ...baseEngagements.slice(5).map(([title, client, role]) => ({ title, client, role, period: title.includes("Windows 10") ? "February 2019-February 2020" : client === "AVEVA" && title.includes("Implementation") ? "December 2021-September 2022" : client === "AVEVA" ? "September 2022-December 2022" : client.includes("BTC") ? "January 2023-September 2023" : client.includes("Provectus") ? "January 2021-December 2021" : "January 2023-December 2023", summary: "Client-safe consulting engagement covering workplace, endpoint-management, incident, deployment, and application-management responsibilities.", focus: [] }))
    ],
    earlierCareer: earlier,
    expertise: expertiseEn,
    education: [
      { title: "Data Technician", place: "EUC Syd, Sønderborg", year: "2006", description: "Technical education spanning hardware, networking, server and client infrastructure, programming fundamentals, Microsoft and Linux environments, and practical systems integration." },
      { title: "IT Supporter", place: "EUC Syd, Sønderborg", year: "2003", description: "" }
    ],
    certifications: ["ITIL Foundation", "MCSA: Windows 8", "Microsoft Exam 70-698: Windows 10", "Microsoft Certified: Azure Administrator Associate - certification status to be confirmed before public launch", "Administering and Deploying System Center 2012 Configuration Manager (70-243)", "Microsoft SCCM-related training"],
    availability: "I support clients through defined delivery scopes, long-term consulting engagements, architecture work, and targeted technical escalations. Availability for new assignments is assessed individually based on scope, urgency, and delivery requirements."
  },
  de: {
    locale: "de",
    name: "Michael Møller",
    headline: "Freiberuflicher IT-Consultant",
    descriptor: "Modern Workplace · Endpoint Management · Enterprise Automation",
    linkedin: "https://www.linkedin.com/in/mokka83/",
    languages: "Dänisch, Englisch, Deutsch; Ukrainisch und Russisch auf Konversationsniveau",
    profile: [
      "Freiberuflicher Senior Consultant für IT-Infrastruktur und Modern Workplace mit über 15 Jahren Erfahrung in der Konzeption, dem Betrieb und der Modernisierung von Enterprise-Umgebungen für Endgeräte, Deployment und Cloud.",
      "Ich begleite Vorhaben von Anforderung und Design über Implementierung, Pilotierung und UAT bis hin zu Betriebsübergabe und technischer Eskalationsunterstützung."
    ],
    engagementTitle: "Ausgewählte Beratungsmandate",
    engagementNote: "Ausgewählte freiberufliche Beratungsmandate. Sofern die Leistungsumfänge dies zulassen, können mehrere Mandate parallel innerhalb separat vereinbarter Verantwortlichkeiten erbracht werden.",
    engagements: [],
    earlierCareer: earlier,
    expertise: expertiseDe,
    education: [
      { title: "Data Technician", place: "EUC Syd, Sønderborg", year: "2006", description: "Technische Ausbildung mit Hardware, Netzwerken, Server- und Client-Infrastruktur, Programmiergrundlagen, Microsoft- und Linux-Umgebungen sowie praxisorientierter Systemintegration." },
      { title: "IT Supporter", place: "EUC Syd, Sønderborg", year: "2003", description: "" }
    ],
    certifications: ["ITIL Foundation", "MCSA: Windows 8", "Microsoft Exam 70-698: Windows 10", "Microsoft Certified: Azure Administrator Associate - Status vor Veröffentlichung bestätigen", "Administering and Deploying System Center 2012 Configuration Manager (70-243)", "Microsoft-Schulungen zu SCCM"],
    availability: "Ich unterstütze Kunden im Rahmen klar definierter Leistungsumfänge, langfristiger Beratungsmandate, Architekturarbeit und gezielter technischer Eskalationen. Die Verfügbarkeit für neue Mandate wird individuell anhand von Umfang, Dringlichkeit und Lieferanforderungen beurteilt."
  },
  da: {
    locale: "da",
    name: "Michael Møller",
    headline: "Selvstændig IT-konsulent",
    descriptor: "Modern Workplace · Endpoint Management · Enterprise Automation",
    linkedin: "https://www.linkedin.com/in/mokka83/",
    languages: "dansk, engelsk og tysk; ukrainsk og russisk på samtaleniveau",
    profile: [
      "Selvstændig senior IT-infrastruktur- og Modern Workplace-konsulent med mere end 15 års erfaring i at designe, drifte og modernisere enterprise-miljøer for endpoints, deployment og cloud.",
      "Jeg følger opgaver fra krav og design gennem implementering, pilot, UAT og driftsleverance til teknisk eskalationssupport."
    ],
    engagementTitle: "Udvalgte konsulentopgaver",
    engagementNote: "Udvalgte selvstændige konsulentopgaver. Når leveranceomfanget tillader det, kan flere opgaver gennemføres parallelt inden for særskilt aftalte ansvarsområder.",
    engagements: [],
    earlierCareer: earlier,
    expertise: expertiseDa,
    education: [
      { title: "Data Technician", place: "EUC Syd, Sønderborg", year: "2006", description: "Teknisk uddannelse inden for hardware, netværk, server- og klientinfrastruktur, programmeringsgrundlag, Microsoft- og Linux-miljøer samt praktisk systemintegration." },
      { title: "IT Supporter", place: "EUC Syd, Sønderborg", year: "2003", description: "" }
    ],
    certifications: ["ITIL Foundation", "MCSA: Windows 8", "Microsoft Exam 70-698: Windows 10", "Microsoft Certified: Azure Administrator Associate - certificeringsstatus skal bekræftes før offentliggørelse", "Administering and Deploying System Center 2012 Configuration Manager (70-243)", "Microsoft SCCM-relateret træning"],
    availability: "Jeg understøtter kunder gennem klart definerede leveranceomfang, længerevarende konsulentopgaver, arkitekturarbejde og målrettede tekniske eskalationer. Kapacitet til nye opgaver vurderes individuelt ud fra omfang, hast og leverancekrav."
  }
};

cv.de.engagements = cv.en.engagements.map((item, index) => ({
  ...item,
  period: ["Mai 2026-Heute", "Januar 2026-Juni 2026", "März 2024-Heute", "Juli 2024-Juli 2025", "Januar 2023-Juli 2024"][index] || item.period,
  summary: index < 5 ? [
    "Unterstützung bei der weiteren Professionalisierung und Skalierung von Configuration-Manager-Backend-Services im Rahmen eines IT-Infrastruktur-Insourcings.",
    "Umsetzung von End-to-End-Modern-Workplace-Lösungen in Kundenumgebungen mit Fokus auf macOS, iPhone, Android, Deployment-Tools und Packaging-Strategien.",
    "Betrieb und Modernisierung einer Enterprise-SCCM-Infrastruktur sowie Umsetzung projektbasierter Erweiterungen.",
    "Konzeption und Umsetzung robuster, sicherheitsorientierter Cloud- und Endpoint-Management-Architekturen für kritische Infrastrukturszenarien.",
    "Technische Lösungsumsetzung für F&E-Bereiche, Koordination von Dienstleistern, Steuerung von Reports und Deliverables."
  ][index] : "Client-sichere Beratungsbeschreibung zu Workplace, Endpoint Management, Incident, Deployment und Application Management.",
  focus: index < 5 ? item.focus : []
}));

cv.da.engagements = cv.en.engagements.map((item, index) => ({
  ...item,
  period: ["Maj 2026-Nu", "Januar 2026-Juni 2026", "Marts 2024-Nu", "Juli 2024-Juli 2025", "Januar 2023-Juli 2024"][index] || item.period,
  summary: index < 5 ? [
    "Bidrager til den fortsatte professionalisering og udbygning af Configuration Manager-backendtjenester under et IT-infrastruktur-insourcingprogram.",
    "Leverede end-to-end Modern Workplace-løsninger i kundemiljøer med fokus på macOS, iPhone, Android, deploymentværktøjer og pakkestrategi.",
    "Drift og modernisering af enterprise-SCCM-infrastruktur samt levering af projektbaserede forbedringer.",
    "Designede og implementerede robuste, sikkerhedsorienterede cloud- og endpoint-management-arkitekturer til kritiske infrastrukturscenarier.",
    "Leverede og drev tekniske løsninger for R&D-afdelinger, koordinerede leverandører, håndterede rapporter og leverancer."
  ][index] : "Kundesikker konsulentbeskrivelse inden for workplace, endpoint management, incidents, deployment og application management.",
  focus: index < 5 ? item.focus : []
}));
