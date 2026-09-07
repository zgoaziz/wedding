export type Lang = "ar" | "en";

export interface TranslationShape {
  langToggle: { ar: string; en: string };
  skipToDetails: string;
  bismillah: string;
  ayah: string;
  ayahRef: string;
  introText: string;
  groomName: string;
  brideName: string;
  dateText: string;
  atLabel: string;
  countdown: { days: string; hours: string; minutes: string; seconds: string };
  weddingDayTitle: string;
  scratchHint: string;
  scratchRevealed: string;
  revealedDay: string;
  revealedDate: string;
  revealedMonth: string;
  timeAt: string;
  venueName: string;
  mapsLink: string;
  addressLine1: string;
  addressLine2: string;
  weatherNote: string;
  viewLocationBtn: string;
  addToCalendar: string;
  loveWordTitle: string;
  loveWordText: string;
  closingText: string;
  signature: string;
  shareInvite: string;
  shareQR: string;
  shareWhatsApp: string;
  copyLink: string;
  linkCopied: string;
  downloadQR: string;
  galleryTitle: string;
  heroKicker: string;
  footerNote: string;
}

export const translations: Record<Lang, TranslationShape> = {
  ar: {
    langToggle: { ar: "عربي", en: "EN" },
    skipToDetails: "تخطي إلى التفاصيل",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    ayah:
      "( وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً )",
    ayahRef: "الروم — 21",
    introText:
      "بعد إهدائكم عاطر التحية و أزكى السلام، فإنه تتشرف عائلتا عائلة منصف الارناؤوط و عائلة محمد عتيق بدعوتكم لحضور حفل زفاف إبنيهما",
    groomName: "وائل",
    brideName: "أريج",
    dateText: "و ذلك بمشيئة الله و حفظه يوم الإثنين الموافق 14 سبتمبر 2026",
    atLabel: "في",
    countdown: { days: "يوم", hours: "ساعة", minutes: "دقيقة", seconds: "ثانية" },
    weddingDayTitle: "يوم الحفل",
    scratchHint: "✨ امسحي هنا لتكشفي الموعد",
    scratchRevealed: "🎉 لقد كشفتم الموعد",
    revealedDay: "يوم الإثنين",
    revealedDate: "14",
    revealedMonth: "سبتمبر 2026",
    timeAt: "في تمام الساعة التاسعة مساءً",
    venueName: "قاعة الأفراح الأميرة",
    mapsLink: "Maps",
    addressLine1: "V37Q+974, C27",
    addressLine2: "قليبية، ولاية نابل، تونس",
    weatherNote: "توقعات الطقس غير متوفرة حالياً، ستظهر عند اقتراب الموعد.",
    viewLocationBtn: "عرض موقع الحفل",
    addToCalendar: "إضافة إلى التقويم",
    loveWordTitle: "كلمة محبة",
    loveWordText: "حضوركم ومشاركتكم فرحتنا هي أغلى وأجمل هدية",
    closingText: "يسعدنا ويشرفنا حضوركم لتكتمل بهجتنا",
    signature: "بكل حب، وائل وأريج",
    shareInvite: "مشاركة الدعوة",
    shareQR: "رمز QR للدعوة",
    shareWhatsApp: "مشاركة عبر واتساب",
    copyLink: "نسخ رابط الدعوة",
    linkCopied: "تم النسخ بنجاح! ✓",
    downloadQR: "تحميل رمز QR",
    galleryTitle: "لحظات من قصتنا",
    heroKicker: "دعوة زفاف",
    footerNote: "صُنعت بحب لهذه المناسبة الخاصة",
  },
  en: {
    langToggle: { ar: "AR", en: "English" },
    skipToDetails: "Skip to details",
    bismillah: "In the name of Allah, the Most Gracious, the Most Merciful",
    ayah:
      "“And among His signs is that He created for you spouses from among yourselves, that you may find tranquility in them, and He placed between you affection and mercy.”",
    ayahRef: "Ar-Rum — 21",
    introText:
      "With hearts full of gratitude and warm greetings, the families of Moncef Arnaout and Mohamed Atig are honored to invite you to celebrate the wedding of their children",
    groomName: "Wael",
    brideName: "Arij",
    dateText: "God willing, on Monday, September 14th, 2026",
    atLabel: "At",
    countdown: { days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
    weddingDayTitle: "The Big Day",
    scratchHint: "✨ Scratch here to reveal the date",
    scratchRevealed: "🎉 You revealed the date!",
    revealedDay: "Monday",
    revealedDate: "14",
    revealedMonth: "September 2026",
    timeAt: "At exactly nine o'clock in the evening",
    venueName: "El Amira Wedding Hall",
    mapsLink: "Maps",
    addressLine1: "V37Q+974, C27",
    addressLine2: "Kelibia, Nabeul, Tunisia",
    weatherNote: "Weather forecast is not yet available. It will appear closer to the date.",
    viewLocationBtn: "View venue location",
    addToCalendar: "Add to calendar",
    loveWordTitle: "A Word of Love",
    loveWordText: "Your presence and joy shared with us is the most precious and beautiful gift",
    closingText: "We would be delighted and honored by your presence to complete our joy",
    signature: "With all our love, Wael & Arij",
    shareInvite: "Share invitation",
    shareQR: "Invitation QR Code",
    shareWhatsApp: "Share via WhatsApp",
    copyLink: "Copy invitation link",
    linkCopied: "Link copied successfully! ✓",
    downloadQR: "Download QR Code",
    galleryTitle: "Moments from our story",
    heroKicker: "Wedding Invitation",
    footerNote: "Made with love for this special occasion",
  },
};
