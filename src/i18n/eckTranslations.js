/** @type {'en' | 'fr'} */
export const DEFAULT_LOCALE = "en";

/** Flat keys → string per locale */
export const translations = {
  en: {
    "lang.toFrench.aria": "Switch to French",
    "lang.toEnglish.aria": "Switch to English",

    "nav.home": "Home",
    "nav.karts": "Our Karts",
    "nav.racing": "Racing Options",
    "nav.prices": "Prices",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    "hero.slide.8772": "Racing on track",
    "hero.slide.8780": "Corner action",
    "hero.slide.8774": "Multi-kart race",
    "hero.slide.8735": "ECK track and signage",
    "hero.slide.8695": "Sodi kart",

    "hero.title1": "Feel The Speed.",
    "hero.title2": "Own The Track.",
    "hero.description":
      "The fastest outdoor go-kart track in New Brunswick. Professional Sodi karts, real competition, unforgettable racing experiences.",
    "hero.viewPrices": "View Prices",
    "hero.seeKarts": "See Our Karts",
    "hero.photosAria": "Hero photos",

    "walkIn.heading": "Walk-In Racing Today",
    "walkIn.description": "First come, first served. No reservation required. Just show up and race!",
    "walkIn.hours": "Today's Hours",
    "walkIn.status": "Status",
    "walkIn.age": "Min. Age",
    "walkIn.open": "OPEN",

    "karts.headingBefore": "Our ",
    "karts.headingAccent": "Karts",
    "karts.description":
      "We run the Sodi World Series karts — the same karts used in international karting championships around the world. Professional-grade, fast, and built for real competition. Equipped with precision lap timing so you can track every run.",
    "karts.stat.topSpeed": "Top Speed",
    "karts.stat.model": "Kart Model",
    "karts.stat.engine": "Engine",
    "karts.stat.timing": "Timing System",

    "racing.headingBefore": "Racing ",
    "racing.headingAccent": "Options",
    "racing.card1.title": "Kart Rentals",
    "racing.card1.description":
      "Walk-in racing available daily. First come, first served. No reservation needed — just show up and race!",
    "racing.card2.title": "Birthday Parties",
    "racing.card2.description":
      "Make it a birthday to remember! Exclusive track time, racing, and a celebration your group will never forget.",
    "racing.card3.title": "Corporate Events",
    "racing.card3.description":
      "Team building with a competitive edge. Custom race formats, exclusive sessions, and optional catering for your team.",
    "racing.card4.title": "Sodi World Series",
    "racing.card4.description":
      "Join the international karting championship. Compete in official Sodi World Series events right here at ECK.",

    "pricing.subheading": "Pricing",
    "pricing.headingBefore": "Simple & Transparent ",
    "pricing.headingAccent": "Race Pricing",
    "pricing.description":
      "Choose your race duration. All prices include kart rental, helmet, and full safety briefing.",
    "pricing.book": "Book Now",
    "pricing.sprint.name": "Sprint",
    "pricing.sprint.duration": "10 Minutes",
    "pricing.sprint.main": "Quick Adrenaline Rush",
    "pricing.sprint.f1": "Kart & Helmet Included",
    "pricing.sprint.f2": "Safety Briefing",
    "pricing.sprint.f3": "Lap Timing",
    "pricing.sprint.f4": "Walk-In Available",
    "pricing.gp.name": "Grand Prix",
    "pricing.gp.duration": "20 Minutes",
    "pricing.gp.main": "Most Popular Choice",
    "pricing.gp.f1": "Kart & Helmet Included",
    "pricing.gp.f2": "Safety Briefing",
    "pricing.gp.f3": "Lap Timing",
    "pricing.gp.f4": "Printable Results",
    "pricing.endurance.name": "Endurance",
    "pricing.endurance.duration": "30 Minutes",
    "pricing.endurance.main": "Ultimate Racing Experience",
    "pricing.endurance.f1": "Kart & Helmet Included",
    "pricing.endurance.f2": "Safety Briefing",
    "pricing.endurance.f3": "Lap Timing",
    "pricing.endurance.f4": "Printable Results",

    "minigp.subheading": "Mini Grand Prix",
    "minigp.headingBefore": "The Ultimate ",
    "minigp.headingAccent": "Racing Event",
    "minigp.step1.title": "Qualifying",
    "minigp.step1.description":
      "15-minute session: set your fastest lap to determine your starting position on the grid. Every millisecond counts!",
    "minigp.step2.title": "The Final Race",
    "minigp.step2.description":
      "15-minute race: lights out and away we go! Compete head-to-head for the podium. Trophies awarded to the top 3 finishers.",

    "video.subheading": "Experience The Thrill",
    "video.headingBefore": "See The ",
    "video.headingAccent": "Action",
    "video.headingAfter": " On Track",
    "video.description":
      "Watch our drivers push the limits on the fastest outdoor go-kart track in New Brunswick. Feel the speed, hear the engines, and see why ECK is the ultimate karting destination.",
    "video.button": "Watch The Action",
    "video.caption1": "Track layout",
    "video.caption2": "Racing in the rain",

    "reviews.subheading": "Testimonials",
    "reviews.headingBefore": "Our Racers ",
    "reviews.headingAccent": "Love Us",
    "reviews.description": "See what our customers have to say about their ECK racing experience.",

    "faq.subheading": "FAQ",
    "faq.headingBefore": "Have ",
    "faq.headingAccent": "Questions?",
    "faq.description": "Everything you need to know before your visit to ECK.",
    "faq.q1": "What is the minimum age to race?",
    "faq.a1":
      "Drivers must be at least 8 years old and meet the minimum height requirement to safely operate the karts. Junior karts are available for younger drivers.",
    "faq.q2": "Do I need a reservation?",
    "faq.a2":
      "Regular kart races are walk-in and first-come, first-served. No reservation required! Reservations are only needed for the Mini Grand Prix package and group/corporate events.",
    "faq.q3": "What should I wear?",
    "faq.a3":
      "Closed-toe shoes are mandatory. We recommend comfortable clothing that you don't mind getting a little dusty. Long hair must be tied back. Helmets are provided.",
    "faq.q4": "Is it safe?",
    "faq.a4":
      "Absolutely! All drivers receive a safety briefing before racing. Our karts are equipped with seat belts, bumpers, and roll bars. Track marshals monitor the circuit at all times.",
    "faq.q5": "How long does a race last?",
    "faq.a5":
      "We offer 10-minute, 20-minute, and 30-minute race sessions. The Mini Grand Prix event (with practice, qualifying, and final race) lasts approximately 1.5 hours.",
    "faq.q6": "Can I host a birthday party or corporate event?",
    "faq.a6":
      "Yes! We offer special packages for birthday parties and corporate events. These include exclusive track time, race formats, and optional catering. Contact us to plan your event.",

    "contact.subheading": "Contact Us",
    "contact.headingBefore": "Feel free to ",
    "contact.headingAccent": "get in touch",
    "contact.description":
      "Have a question or want to book a group event? Send us a message and we'll get back to you as soon as possible.",
    "contact.submit": "Send Message",
    "contact.emailPh": "Your Email Address",
    "contact.namePh": "Full Name",
    "contact.subjectPh": "Subject",
    "contact.messagePh": "Your Message Here",

    "cta.text":
      "Ready to race? Come experience the fastest outdoor go-kart track in New Brunswick.",
    "cta.primary": "View Prices",
    "cta.secondary": "Contact Us",

    "footer.address": "New Brunswick, Canada",
    "footer.quickLinks": "Quick Links",
    "footer.racing": "Racing",
    "footer.legal": "Legal",
    "footer.contact": "Contact",
    "footer.home": "Home",
    "footer.ourKarts": "Our Karts",
    "footer.prices": "Prices",
    "footer.faq": "FAQ",
    "footer.kartRentals": "Kart Rentals",
    "footer.minigp": "Mini Grand Prix",
    "footer.birthdays": "Birthday Parties",
    "footer.corporate": "Corporate Events",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.waiver": "Waiver",
    "footer.directions": "Get Directions",
    "footer.copyright": "© 2025 ECK Racing. All Rights Reserved.",
    "footer.tagline": "The fastest outdoor go-kart track in New Brunswick.",
  },

  fr: {
    "lang.toFrench.aria": "Passer en français",
    "lang.toEnglish.aria": "Passer en anglais",

    "nav.home": "Accueil",
    "nav.karts": "Nos karts",
    "nav.racing": "Options de course",
    "nav.prices": "Tarifs",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",

    "hero.slide.8772": "Course sur piste",
    "hero.slide.8780": "Action dans les virages",
    "hero.slide.8774": "Course multi-karts",
    "hero.slide.8735": "Piste et enseignes ECK",
    "hero.slide.8695": "Kart Sodi",

    "hero.title1": "Ressentez la vitesse.",
    "hero.title2": "Dominez la piste.",
    "hero.description":
      "La piste de karting extérieure la plus rapide du Nouveau-Brunswick. Karts Sodi professionnels, compétition réelle, expériences de course inoubliables.",
    "hero.viewPrices": "Voir les tarifs",
    "hero.seeKarts": "Voir nos karts",
    "hero.photosAria": "Photos du bandeau",

    "walkIn.heading": "Course libre aujourd'hui",
    "walkIn.description":
      "Premier arrivé, premier servi. Aucune réservation. Présentez-vous et coursez !",
    "walkIn.hours": "Heures du jour",
    "walkIn.status": "Statut",
    "walkIn.age": "Âge min.",
    "walkIn.open": "OUVERT",

    "karts.headingBefore": "Nos ",
    "karts.headingAccent": "karts",
    "karts.description":
      "Nous utilisons les karts Sodi World Series — les mêmes qu'en championnat international. Performants, rapides et conçus pour la compétition. Chronométrage de précision pour suivre chaque passage.",
    "karts.stat.topSpeed": "Vitesse max.",
    "karts.stat.model": "Modèle",
    "karts.stat.engine": "Moteur",
    "karts.stat.timing": "Chronométrage",

    "racing.headingBefore": "Options de ",
    "racing.headingAccent": "course",
    "racing.card1.title": "Location de karts",
    "racing.card1.description":
      "Course en libre accès tous les jours. Premier arrivé, premier servi. Sans réservation — venez rouler !",
    "racing.card2.title": "Fêtes d'anniversaire",
    "racing.card2.description":
      "Un anniversaire inoubliable ! Piste en exclusivité, courses et célébration pour votre groupe.",
    "racing.card3.title": "Événements d'entreprise",
    "racing.card3.description":
      "Team building avec esprit de compétition. Formats sur mesure, sessions privées et restauration en option.",
    "racing.card4.title": "Sodi World Series",
    "racing.card4.description":
      "Rejoignez le championnat international. Participez aux épreuves officielles Sodi World Series ici à l'ECK.",

    "pricing.subheading": "Tarifs",
    "pricing.headingBefore": "Tarifs de course ",
    "pricing.headingAccent": "simples et clairs",
    "pricing.description":
      "Choisissez la durée de votre session. Prix incluant location du kart, casque et briefing sécurité complet.",
    "pricing.book": "Réserver",
    "pricing.sprint.name": "Sprint",
    "pricing.sprint.duration": "10 minutes",
    "pricing.sprint.main": "Montée d'adrénaline express",
    "pricing.sprint.f1": "Kart et casque inclus",
    "pricing.sprint.f2": "Briefing sécurité",
    "pricing.sprint.f3": "Chronométrage des tours",
    "pricing.sprint.f4": "Accès sans réservation",
    "pricing.gp.name": "Grand Prix",
    "pricing.gp.duration": "20 minutes",
    "pricing.gp.main": "Le plus populaire",
    "pricing.gp.f1": "Kart et casque inclus",
    "pricing.gp.f2": "Briefing sécurité",
    "pricing.gp.f3": "Chronométrage des tours",
    "pricing.gp.f4": "Résultats imprimables",
    "pricing.endurance.name": "Endurance",
    "pricing.endurance.duration": "30 minutes",
    "pricing.endurance.main": "L'expérience course ultime",
    "pricing.endurance.f1": "Kart et casque inclus",
    "pricing.endurance.f2": "Briefing sécurité",
    "pricing.endurance.f3": "Chronométrage des tours",
    "pricing.endurance.f4": "Résultats imprimables",

    "minigp.subheading": "Mini Grand Prix",
    "minigp.headingBefore": "L'événement de ",
    "minigp.headingAccent": "course ultime",
    "minigp.step1.title": "Qualifications",
    "minigp.step1.description":
      "Session de 15 minutes : réalisez votre meilleur tour pour votre position sur la grille. Chaque milliseconde compte !",
    "minigp.step2.title": "La course finale",
    "minigp.step2.description":
      "Course de 15 minutes : feux verts ! Affrontez-vous pour le podium. Trophées pour les 3 premiers.",

    "video.subheading": "Vivez le frisson",
    "video.headingBefore": "Voir ",
    "video.headingAccent": "l'action",
    "video.headingAfter": " sur la piste",
    "video.description":
      "Nos pilotes repoussent les limites sur la piste extérieure la plus rapide du Nouveau-Brunswick. Vitesse, moteurs, et pourquoi l'ECK est la référence.",
    "video.button": "Voir l'action",
    "video.caption1": "Tracé de la piste",
    "video.caption2": "Sous la pluie",

    "reviews.subheading": "Témoignages",
    "reviews.headingBefore": "Nos pilotes ",
    "reviews.headingAccent": "adorent l'ECK",
    "reviews.description": "Ce que nos clients disent de leur expérience à l'ECK.",

    "faq.subheading": "FAQ",
    "faq.headingBefore": "Des ",
    "faq.headingAccent": "questions ?",
    "faq.description": "Tout savoir avant votre visite à l'ECK.",
    "faq.q1": "Quel est l'âge minimum pour rouler ?",
    "faq.a1":
      "Les pilotes doivent avoir au moins 8 ans et la taille minimale pour piloter en toute sécurité. Karts junior disponibles pour les plus jeunes.",
    "faq.q2": "Faut-il réserver ?",
    "faq.a2":
      "Les sessions libres sont sans réservation, premier arrivé, premier servi. Réservation uniquement pour le forfait Mini Grand Prix et les groupes / entreprises.",
    "faq.q3": "Comment s'habiller ?",
    "faq.a3":
      "Chaussures fermées obligatoires. Vêtements confortables (pouvant un peu salir). Cheveux longs attachés. Casques fournis.",
    "faq.q4": "Est-ce sécuritaire ?",
    "faq.a4":
      "Oui. Briefing sécurité avant chaque session. Ceintures, pare-chocs et arceaux. Marshals sur la piste en permanence.",
    "faq.q5": "Combien de temps dure une course ?",
    "faq.a5":
      "Sessions de 10, 20 ou 30 minutes. Le Mini Grand Prix (essais, qualifications, finale) dure environ 1 h 30.",
    "faq.q6": "Anniversaire ou événement d'entreprise ?",
    "faq.a6":
      "Oui ! Forfaits anniversaire et entreprise : piste en exclusivité, formats sur mesure, restauration en option. Contactez-nous.",

    "contact.subheading": "Contact",
    "contact.headingBefore": "N'hésitez pas à ",
    "contact.headingAccent": "nous contacter",
    "contact.description":
      "Une question ou un groupe à organiser ? Envoyez un message, nous répondons dès que possible.",
    "contact.submit": "Envoyer",
    "contact.emailPh": "Votre courriel",
    "contact.namePh": "Nom complet",
    "contact.subjectPh": "Sujet",
    "contact.messagePh": "Votre message",

    "cta.text":
      "Prêt à rouler ? Venez découvrir la piste de karting extérieure la plus rapide du Nouveau-Brunswick.",
    "cta.primary": "Voir les tarifs",
    "cta.secondary": "Contact",

    "footer.address": "Nouveau-Brunswick, Canada",
    "footer.quickLinks": "Liens rapides",
    "footer.racing": "Course",
    "footer.legal": "Légal",
    "footer.contact": "Contact",
    "footer.home": "Accueil",
    "footer.ourKarts": "Nos karts",
    "footer.prices": "Tarifs",
    "footer.faq": "FAQ",
    "footer.kartRentals": "Location de karts",
    "footer.minigp": "Mini Grand Prix",
    "footer.birthdays": "Anniversaires",
    "footer.corporate": "Entreprise",
    "footer.privacy": "Confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.waiver": "Décharge",
    "footer.directions": "Itinéraire",
    "footer.copyright": "© 2025 ECK Racing. Tous droits réservés.",
    "footer.tagline": "La piste de karting extérieure la plus rapide du Nouveau-Brunswick.",
  },
};
