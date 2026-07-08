export const locales = ["en", "de", "da"];

export const localeNames = {
  en: "English",
  de: "Deutsch",
  da: "Dansk"
};

export const site = {
  name: "Michael Møller",
  urlSafeName: "Michael Moeller",
  domain: "michaelmoeller.io",
  linkedin: "https://www.linkedin.com/in/mokka83/",
  bookingUrl: process.env.CALENDLY_URL || "",
  turnstileSiteKey: process.env.PUBLIC_TURNSTILE_SITE_KEY || ""
};

export const navLabels = {
  en: {
    expertise: "Expertise",
    projects: "Projects",
    articles: "Articles",
    scripts: "Script Library",
    cv: "CV",
    contact: "Contact",
    book: "Book a conversation"
  },
  de: {
    expertise: "Expertise",
    projects: "Mandate",
    articles: "Artikel",
    scripts: "Script-Bibliothek",
    cv: "CV",
    contact: "Kontakt",
    book: "Gespräch buchen"
  },
  da: {
    expertise: "Ekspertise",
    projects: "Opgaver",
    articles: "Artikler",
    scripts: "Scriptbibliotek",
    cv: "CV",
    contact: "Kontakt",
    book: "Book samtale"
  }
};

export const ui = {
  en: {
    viewCv: "View CV",
    discuss: "Discuss an engagement",
    linkedin: "LinkedIn profile",
    selectedEngagements: "Selected Consulting Engagements",
    articlesEmpty: "Technical notes and field guides will appear here.",
    scriptsEmpty: "Reviewed, reusable administration tools will be published here.",
    downloadPdf: "Download PDF",
    downloadDocx: "Download DOCX",
    submit: "Send inquiry",
    success: "Thank you. Your inquiry has been received and will be reviewed before a reply is sent.",
    error: "The message could not be sent. Please review the form and try again.",
    consent: "I consent to this inquiry being processed so Michael can review and respond.",
    externalBooking: "Booking is handled by an external provider."
  },
  de: {
    viewCv: "CV ansehen",
    discuss: "Projekt oder Mandat anfragen",
    linkedin: "LinkedIn-Profil",
    selectedEngagements: "Ausgewählte Beratungsmandate",
    articlesEmpty: "Technische Notizen und Field Guides erscheinen hier.",
    scriptsEmpty: "Geprüfte, wiederverwendbare Administrationswerkzeuge werden hier veröffentlicht.",
    downloadPdf: "PDF herunterladen",
    downloadDocx: "DOCX herunterladen",
    submit: "Anfrage senden",
    success: "Vielen Dank. Die Anfrage wurde empfangen und wird vor einer Antwort geprüft.",
    error: "Die Nachricht konnte nicht gesendet werden. Bitte prüfen Sie das Formular und versuchen Sie es erneut.",
    consent: "Ich stimme zu, dass diese Anfrage zur Prüfung und Antwort verarbeitet wird.",
    externalBooking: "Die Buchung erfolgt über einen externen Anbieter."
  },
  da: {
    viewCv: "Se CV",
    discuss: "Drøft en opgave",
    linkedin: "LinkedIn-profil",
    selectedEngagements: "Udvalgte konsulentopgaver",
    articlesEmpty: "Tekniske noter og field guides vises her.",
    scriptsEmpty: "Gennemgåede, genanvendelige administrationsværktøjer offentliggøres her.",
    downloadPdf: "Download PDF",
    downloadDocx: "Download DOCX",
    submit: "Send forespørgsel",
    success: "Tak. Din forespørgsel er modtaget og bliver gennemgået, før der sendes svar.",
    error: "Beskeden kunne ikke sendes. Gennemgå formularen og prøv igen.",
    consent: "Jeg accepterer, at forespørgslen behandles, så Michael kan gennemgå og svare.",
    externalBooking: "Booking håndteres af en ekstern udbyder."
  }
};
