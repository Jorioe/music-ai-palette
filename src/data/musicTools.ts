import { MusicTool } from "../types/MusicTool";

// Voorbeeld Youtube-embeds, je mag deze urls vervangen
export const musicTools: MusicTool[] = [
  {
    id: "1",
    name: "Suno AI",
    description: "Een krachtige AI-tool die volledige nummers genereert op basis van tekstprompts, inclusief zang.",
    longDescription: "Suno AI, of kortweg Suno, is een muziekcreatieprogramma met generatieve kunstmatige intelligentie, ontworpen om realistische nummers te genereren die zang en instrumentatie combineren, of puur instrumentaal zijn. Suno is sinds 20 december 2023 breed beschikbaar, na de lancering van een webapplicatie en een partnerschap met Microsoft, waarbij Suno als plug-in in Microsoft Copilot werd opgenomen.",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Ik heb Suno getest op 2 verschillende manieren. Allereerst heb ik een bestaand rapnummer \"Alaka\" omgezet naar een hollandse meezinger. Dit heeft erg goed en grappig uitgepakt. Hiervoor heb ik enkel de songtekst van het rapnummer en de gewenste stijl van de muziek moeten invoeren.'
      },
      {
        type: 'paragraph',
        content: 'De tweede test was een intro voor een hardstyle nummer. Ik heb deze prompt gebruikt: \"An intro for a raw hardstyle song in F major. Spoontech style. With a powerful lead melody\". Dit heeft ook erg goed uitgepakt. De gegenereerde track is iets wat ik goed zou kunnen gebruiken ter inspiratie voor een hardstyle nummer. Echter is de kwaliteit niet goed genoeg om het gegenereerde stuk te gebruiken in een echt nummer.'
      },
      {
        type: 'paragraph',
        content: 'In het algemeen vind ik Suno een uitstekende tool voor het genereren van muziek. De interface is makkelijk te begrijpen en de snelheid van generatie is top. De kwaliteit van de gegenereerde muziek is echter niet altijd even goed. Het is vooral handig om te gebruiken voor inspiratie en voor het creëren van unieke/grappige muziek.'
      },
      {
        type: 'paragraph',
        content: 'Luister hieronder naar de 2 nummers die ik heb gemaakt met Suno.'
      }
    ],
    websiteUrl: "https://suno.com/",
    category: ["music generation"],
    audioDemo2: "/audio/suno-hs-intro.mp3",
    audioDemo3: "/audio/suno-rap-vz.mp3",
    demoText2: "Het intro voor een hardstyle nummer",
    demoText3: "Het rapnummer omgezet naar een hollandse meezinger",
    rating: 4,
    ratingsCount: 34,
    imageUrl: "/img/suno.png",
    extraInfo: "Zoals je hierboven ziet heb je ook een gratis versie van Suno. Met deze gratis versie kun je al erg veel. Het verouderde model dat je krijgt werkt al super. Het enige nadeel is dat je maar 50 credits krijgt per dag.",
    // videoUrl: "https://www.youtube.com/embed/zpOULjyy-n8?rel=0",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based",
    hasDesktopApp: false,
    hasMobileApp: true,
    hasVoice: true,
    genreSupport: "Breed",
    exportOptions: "MP3",
    useEase: 4,
    speed: 5,
    whatLicence: "Alleen bij betaalde abonnementen",
    hasFreeVersion: true,
    priceModel: "Abonnement",
    price: "Gratis tot $24/maand",
    subscriptionInfo: [
      {
        name: "Free",
        price: "Gratis",
        features: [
          "Toegang tot verouderd model",
          "50 credits per dag (10 nummers)",
          "Basis muziekgeneratie"
        ]
      },
      {
        name: "Pro",
        price: "$8/maand",
        features: [
          "Toegang tot nieuwste model",
          "2.500 credits per maand (500 nummers)",
          "Commerciële licentie",
          "toegang tot pro functies (bewerken, persona's)",
          "Prioriteitswachtrij, maximaal 10 nummers tegelijk"
        ]
      },
      {
        name: "Premium",
        price: "$24/maand",
        features: [
          "Toegang tot nieuwste model",
          "10.000 credits per maand (2.000 nummers)",
          "Commerciële licentie",
          "toegang tot pro functies (bewerken, persona's)",
          "Prioriteitswachtrij, maximaal 10 nummers tegelijk"
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Udio Ai",
    description: "Een AI-muziektool die zowel vocals als instrumentals genereert vanuit tekstprompts.",
    longDescription: "Udio is een generatief model voor kunstmatige intelligentie dat muziek produceert op basis van eenvoudige tekstberichten. Het kan zang en instrumenten genereren, en biedt een breed scala aan muziekstijlen en genres. Udio is ontworpen om het creatieve proces van muzikanten te versnellen en te vereenvoudigen.",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Ik heb Udio getest op 2 verschillende manieren. Allereerst heb ik een bestaand rapnummer \"Alaka\" omgezet naar een hollandse meezinger. Hiervoor heb ik enkel de songtekst van het rapnummer en de gewenste stijl van de muziek moeten invoeren. Dit heeft niet super goed uitgepakt. Je hoort dat het model nog erg veel moite heeft met zang in tegenstelling tot Suno.'
      },
      {
        type: 'paragraph',
        content: 'De tweede test was een intro voor een hardstyle nummer. Ik heb deze prompt gebruikt: \"An intro for a raw hardstyle song in F major. Spoontech style. With a powerful lead melody\". Ook dit heeft niet uitgepakt zoals verwacht. De gegenereerde track is een totaal andere stijl dan dat ik heb ingegeven. Dit zijn dus geen goede resultaten.'
      },
      {
        type: 'paragraph',
        content: 'Wel is de interface van Udio makkelijk te begrijpen. De snelheid van genereren is ook niet super snel, maar wel prima.'
      },
      {
        type: 'paragraph',
        content: 'Luister hieronder naar de 2 nummers die ik heb gemaakt met Udio.'
      }
    ],
    websiteUrl: "https://www.udio.com/home",
    category: ["music generation"],
    audioDemo2: "/audio/udio-hs-intro.mp3",
    audioDemo3: "/audio/udio-rap-vz.mp3",
    demoText2: "Het intro voor een hardstyle nummer",
    demoText3: "Het rapnummer omgezet naar een hollandse meezinger",
    rating: 3,
    ratingsCount: 28,
    imageUrl: "/img/udio.png",
    extraInfo: "Zoals je hierboven ziet heb je ook een gratis versie van Udio. Deze is echter beperkt in functies. Je krijgt eerst een generatie van 32 seconden, deze kan je naderhand verlengen. Hierdoor vormt het nummer niet altijd een geheel.",
    // videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4?rel=0",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based",
    hasDesktopApp: false,
    hasMobileApp: false,
    hasVoice: true,
    genreSupport: "Breed",
    exportOptions: "MP3, (WAV vanaf $10/maand)",
    useEase: 4,
    speed: 4,
    whatLicence: "Alleen bij betaalde abonnementen",
    hasFreeVersion: true,
    priceModel: "Abonnement",
    price: "Gratis tot $30/maand",
    subscriptionInfo: [
      {
        name: "Free",
        price: "Gratis",
        features: [
          "10 credits per dag",
          "Maximaal 4 nummers tegelijk",
          "Limiet van 3 volledige (2:10s) songgeneraties per dag"
        ]
      },
      {
        name: "Standard",
        price: "$10/maand",
        features: [
          "1200 credits per maand",
          "Maximaal 6 nummers tegelijk",
          "MP3, WAV & stems export",
          "Commerciële licentie",
          "Prioriteit support"
        ]
      },
      {
        name: "Pro",
        price: "$30/maand",
        features: [
          "100 credits per maand",
          "Premium muziekgeneratie",
          "MP3, WAV & stems export",
          "Commerciële licentie",
          "Premium support",
          "API toegang"
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Soundraw",
    description: "Een AI-tool die rechtenvrije muziek maakt. Vooral handig voor contentproductie.",
    longDescription: "Soundraw is een geavanceerde AI-muziekgenerator die gebruikers in staat stelt om originele, rechtenvrije muziek te creëren die perfect aansluit bij hun projecten. Met een intuïtieve interface kunnen gebruikers eenvoudig parameters zoals genre, stemming, tempo en instrumentatie instellen om gepersonaliseerde tracks te genereren. Het platform biedt een breed scala aan genres en stemmingen, waardoor het geschikt is voor diverse toepassingen zoals video's, podcasts, games en meer. ",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Bij het testen van Soundraw viel de gebruiksvriendelijkheid direct op. Je kan geen prompt invoeren maar je kan via bepaalde parameters de stijl, stemming, snelheid en het thema invoeren. Dit zorgt er wel voor dat je beperkt ben in de generaties. Zo kan je bijvoorbeeld niet proberen een hardstyle of tech house nummer te laten genereren.'
      },
      {
        type: 'paragraph',
        content: 'De kwaliteit van de gegenereerde tracks is indrukwekkend. De mogelijkheid om tracks aan te passen en te downloaden in hoge kwaliteit (mits je een abonnement hebt) maakt het een waardevolle tool voor zowel professionals als hobbyisten. '
      },
      {
        type: 'paragraph',
        content: 'Voor de test heb ik geprobeerd een cinematisch nummer te genereren dat gebruik maakt van een orkest. Ik was blij verrast met het resultaat. Wel vind ik dat het niet iets is wat ik zou kunnen gebuiken in mijn producties. Het is echt gericht op muziek voor content.'
      }
    ],
    websiteUrl: "https://soundraw.io/",
    category: ["music generation"],
    audioDemo: "/audio/soundraw-gen1.mp3",
    demoText: "Luister naar het cinematische nummer dat ik heb gemaakt met Soundraw.",
    rating: 4,
    ratingsCount: 41,
    imageUrl: "/img/soundraw.jpg",
    // videoUrl: "https://www.youtube.com/embed/IUN664s7N-c?rel=0",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based",
    hasDesktopApp: false,
    hasMobileApp: false,
    hasVoice: false,
    genreSupport: "kaas",
    exportOptions: "MP3, (WAV & stems vanaf $39/maand)",
    useEase: 4,
    speed: 4,
    whatLicence: "Ja",
    hasFreeVersion: false,
    priceModel: "Abonnement",
    price: "$13 tot $65/maand",
    subscriptionInfo: [
      {
        name: "Creator",
        price: "$13/maand",
        features: [
          "Onbeperkt maandelijkse downloads",
          "MP3 export",
          "Commerciële licentie"
        ]
      },
      {
        name: "Artist Starter",
        price: "$26/maand",
        features: [
          "10 maandelijkse downloads",
          "MP3 & WAV export",
          "Commerciële licentie",
          "Distribueren van muziek op streamingplatforms"
        ]
      },
      {
        name: "Artist Pro",
        price: "$39/maand",
        features: [
          "20 maandelijkse downloads",
          "MP3, WAV & stems export",
          "Commerciële licentie",
          "Distribueren van muziek op streamingplatforms"
        ]
      },
      {
        name: "Artist Unlimited",
        price: "$65/maand",
        features: [
          "Onbeperkt maandelijkse downloads",
          "Premium muziekgeneratie",
          "MP3, WAV & stems export",
          "Commerciële licentie",
          "Distribueren van muziek op streamingplatforms"
        ]
      }
    ]
  },
  {
    id: "4",
    name: "Mubert AI",
    description: "Een AI-tool die rechtenvrije muziek genereert op basis van AI-combinaties van loops en samples. Vooral populair bij streamers en app-ontwikkelaars.",
    longDescription: "Mubert AI genereert royaltyvrije muziek voor streaming, video's en podcasts. Het biedt zowel gratis als betaalde plannen met verschillende licentie-opties, waardoor het een flexibele keuze is voor contentcreators.",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Ik heb Mubert getest op drie verschillende manieren. Allereerst heb ik de prompt gebruikt: \"An intro for a raw hardstyle song in F major. Spoontech style. With a powerful lead melody.\" Het resultaat viel tegen. Er zat totaal geen raw hardstyle-sfeer in, en het had ook niks met Spoontech te maken. Het is meer een soort melodische techno. Het voelde alsof de tool niet goed om kan gaan met genres die wat complexer of harder zijn. Eerlijk gezegd had ik dit ook wel verwacht omdat Mubert wordt beschreven als een tool die muziek genereert voor video\'s en podcasts. '
      },
      {
        type: 'paragraph',
        content: 'Daarna heb ik door middel van de standaard parameters geprobeerd om een tech house track te maken. Dit genre stond ertussen dus ik was benieuwd of het zou lukken. Wederom viel het resultaat tegen. Het is niet wat ik zou noemen een tech house nummer, maar eerder een mix van bass house, techno en tech house.'
      },
      {
        type: 'paragraph',
        content: 'Tot slot heb ik de prompt gebruikt: "A cinematic intro of an orchestra. It must be very intense." Dit resultaat is al een stuk beter. De intensiteit zat er zeker in. Wel is de plaatsing van sommige elementen een beetje raar.'
      },
      {
        type: 'paragraph',
        content: 'Over het algemeen zou ik Mubert vooral aanraden voor content creators die snel passende achtergrondmuziek nodig hebben. Als je echte muziekproductie doet, zoals hardstyle of elektronische tracks, dan is het gewoon te beperkt.'
      },
      {
        type: 'paragraph',
        content: 'Luister hieronder naar de 3 nummers die ik heb gemaakt met Mubert.'
      }
    ],
    websiteUrl: "https://mubert.com/",
    category: ["music generation"],
    audioDemo: "/audio/mb-raw.mp3",
    audioDemo2: "/audio/mb-tech.mp3",
    audioDemo3: "/audio/mb-cin.mp3",
    demoText: "Luister naar het \"hardstyle\" nummer",
    demoText2: "Luister naar het \"tech house\" nummer",
    demoText3: "Luister naar het cinematische nummer",
    rating: 3,
    ratingsCount: 19,
    imageUrl: "/img/mubert.jpg",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based",
    hasDesktopApp: false,
    hasMobileApp: false,
    hasVoice: false,
    genreSupport: "Breed",
    exportOptions: "MP3, (WAV vanaf $14/maand)",
    useEase: 4,
    speed: 4,
    whatLicence: "Vanaf $39 per maand",
    hasFreeVersion: true,
    priceModel: "Abonnement",
    price: "Gratis tot $199/maand",
    subscriptionInfo: [
      {
        name: "Free",
        price: "Gratis",
        features: [
          "25 nummers per maand",
          "MP3 export"
        ]
      },
      {
        name: "Creator",
        price: "$14/maand",
        features: [
          "500 nummers per maand",
          "Voor socials en NFT's",
          "MP3 & WAV export",
          "Geen watermerk"
        ]
      },
      {
        name: "Pro",
        price: "$39/maand",
        features: [
          "500 nummers per maand",
          "MP3 & WAV export",
          "Commerciële licentie",
          "Gebruik in advertenties",
          "Geen watermerk"
        ]
      },
      {
        name: "Business",
        price: "$199/maand",
        features: [
          "1000 nummers per maand",
          "MP3 & WAV export",
          "Commerciële licentie",
          "Gebruik in advertenties",
          "Gebruik in applicaties",
          "Geen watermerk",
        ]
      }
    ]
  },
  // {
  //   id: "5",
  //   name: "Loudly",
  //   description: "Een AI-tool die muziek genereertvoor video's en social content via een eenvoudige interface. Het mikt op snelle productie zonder technische kennis.",
  //   longDescription: "Loudly is een AI-muziekgenerator die tracks produceert op basis van gebruikersvoorkeuren. Het is geschikt voor contentcreators die snel muziek nodig hebben voor hun projecten, en biedt een breed scala aan muziekstijlen en genres.",
  //   websiteUrl: "https://www.loudly.com/music",
  //   category: ["music generation"],
  //   audioDemo: "https://cdn.freesound.org/previews/628/628403_13612441-lq.mp3",
  //   demoText: "Luister naar de instrumenten",
  //   rating: 4.8,
  //   ratingsCount: 55,
  //   imageUrl: "/img/loudly.jpg",
  //   extraInfo: "MasterMix levert professionele masterings met één klik, direct geschikt voor streaming.",
  //   videoUrl: "https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0",
  //   // Nieuwe eigenschappen voor vergelijking
  //   typeTool: "Web-based",
  //   hasDesktopApp: false,
  //   hasMobileApp: false,
  //   hasVoice: false,
  //   genreSupport: "Breed",
  //   exportOptions: "MP3, (WAV vanaf $10/maand)",
  //   useEase: 4,
  //   speed: 4,
  //   whatLicence: "Alleen bij betaalde abonnementen",
  //   hasFreeVersion: true,
  //   priceModel: "Abonnement",
  //   price: "Gratis tot $30/maand",
  //   subscriptionInfo: [
  //     {
  //       name: "Free",
  //       price: "Gratis",
  //       features: [
  //         "Beperkt aantal nummers",
  //         "1 download per dag",
  //         "MP3 export"
  //       ]
  //     },
  //     {
  //       name: "Personal",
  //       price: "$10/maand",
  //       features: [
  //         "900 nummers per maand",
  //         "Maximale lengte van 7 minuten",
  //         "300 downloads per maand",
  //         "MP3 & WAV export",
  //         "Commerciële licentie"
  //       ]
  //     },
  //     {
  //       name: "Studio",
  //       price: "$30/maand",
  //       features: [
  //         "3000 nummers per maand",
  //         "Maximale lengte van 30 minuten",
  //         "500 downloads per maand",
  //         "MP3 & WAV export",
  //         "Commerciële licentie"
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "6",
  //   name: "Aiva",
  //   description: "AI-componist voor klassieke en filmmuziek, met opties voor bewerking van partituren. Gericht op muzikale creatie, niet op sounddesign.",
  //   longDescription: "Aiva is een geavanceerde AI-componist die ideaal is voor filmmuziek, klassieke composities en soundtracks. Het biedt gebruikers de mogelijkheid om unieke muziekstukken te creëren die passen bij hun specifieke behoeften.",
  //   websiteUrl: "https://example.com/chordgenius",
  //   category: ["music generation"],
  //   audioDemo: "https://cdn.freesound.org/previews/649/649217_11861866-lq.mp3",
  //   demoText: "Luister naar de instrumenten",
  //   rating: 4.1,
  //   ratingsCount: 9,
  //   imageUrl: "/img/aiva.png",
  //   extraInfo: "ChordGenius helpt originele akkoordprogressies te vinden op basis van stijl en stemming.",
  //   videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0?rel=0",
  //   // Nieuwe eigenschappen voor vergelijking
  //   typeTool: "Web-based",
  //   hasDesktopApp: false,
  //   hasMobileApp: true,
  //   hasVoice: true,
  //   genreSupport: "kaas",
  //   exportOptions: "mp3, wav, midi",
  //   useEase: 4,
  //   speed: 3,
  //   whatLicence: "Vanaf $55/maand",
  //   hasFreeVersion: true,
  //   priceModel: "Abonnement",
  //   price: "Gratis tot $55/maand",
  //   subscriptionInfo: [
  //     {
  //       name: "Free",
  //       price: "Gratis",
  //       features: [
  //         "3 downloads per maand",
  //         "Maximale lengte van 3 minuten",
  //         "MP3 & MIDI export"
  //       ]
  //     },
  //     {
  //       name: "Standard",
  //       price: "$17/maand",
  //       features: [
  //         "15 downloads per maand",
  //         "Maximale lengte van 5 minuten",
  //         "MP3 & MIDI export"
  //       ]
  //     },
  //     {
  //       name: "Pro",
  //       price: "$55/maand",
  //       features: [
  //         "300 downloads per maand",
  //         "Maximale lengte van 5,5 minuten",
  //         "Alle export opties",
  //         "Commerciële licentie"
  //       ]
  //     }
  //   ]
  // },
  // {
  //   id: "7",
  //   name: "Boomy AI",
  //   description: "Laat gebruikers binnen enkele minuten muziek genereren en uitbrengen. Ideaal voor beginnende artiesten.",
  //   longDescription: "Boomy AI laat gebruikers binnen enkele minuten muziek componeren en uitbrengen. Het is ideaal voor beginnende artiesten die snel en eenvoudig muziek willen maken zonder diepgaande kennis van muziekproductie.",
  //   websiteUrl: "https://example.com/vocalenhancer",
  //   category: ["music generation"],
  //   audioDemo: "https://cdn.freesound.org/previews/612/612495_5674468-lq.mp3",
  //   demoText: "Luister naar de instrumenten",
  //   rating: 4.4,
  //   ratingsCount: 22,
  //   imageUrl: "/img/boomy.png",
  //   extraInfo: "Ideaal voor podcasters en producers: VocalEnhancer verwijdert ruis en verbetert helderheid.",
  //   videoUrl: "https://www.youtube.com/embed/UVxU2HzPGug?rel=0",
  //   // Nieuwe eigenschappen voor vergelijking
  //   typeTool: "Web-based",
  //   hasDesktopApp: false,
  //   hasMobileApp: true,
  //   hasVoice: true,
  //   genreSupport: "kaas",
  //   exportOptions: "WAV",
  //   useEase: 4,
  //   speed: 3,
  //   whatLicence: "Alleen bij betaalde abonnementen",
  //   hasFreeVersion: true,
  //   priceModel: "Abonnement",
  //   price: "Gratis tot $30/maand",
  //   subscriptionInfo: [
  //     {
  //       name: "Free",
  //       price: "Gratis",
  //       features: [
  //         "25 nummers per maand",
  //         "Geen export opties"
  //       ]
  //     },
  //     {
  //       name: "Creator",
  //       price: "$10/maand",
  //       features: [
  //         "500 nummers per maand",
  //         "25 WAV exports per maand",
  //         "Commerciële licentie",
  //       ]
  //     },
  //     {
  //       name: "Pro",
  //       price: "$30/maand",
  //       features: [
  //         "Onbeperkt nummers per maand",
  //         "250 WAV exports per maand",
  //         "Commerciële licentie",
  //       ]
  //     }
  //   ]
  // },
  {
    id: "8",
    name: "Lalal.ai",
    description: "Een AI-tool die vocals en instrumenten uit nummers scheidt, handig voor remixing en karaoke.",
    longDescription: "Lalal.ai is een AI-tool die vocalen en instrumenten van bestaande tracks scheidt. Het is handig voor remixing en karaoke, en biedt gebruikers de mogelijkheid om hun eigen versies van populaire nummers te maken.",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Ik heb LALAL.AI getest met het nummer Beetje van mij van Antoon. Ik wilde de vocal loshalen van de instrumental. Het resultaat was erg netjes. De stem werd goed gescheiden van de muziek. De instrumental die overbleef klonk goed. Je hoort nog wel dat het geen perfecte scheiding is. Je merkt dat de tool nog moeite heeft met frequenties die overlappen.'
      },
      {
        type: 'paragraph',
        content: 'Daarbuiten nog het feit dat je $22 betaald voor 90 minuten muziekverwerking. Ook kan je de gescheiden stems niet downloaden zonder dat je hebt betaald. Dat vind ik persoonlijk belachelijk omdat er gratis alternatieven zijn die net zo goed zijn of zelfs beter.'
      },
      {
        type: 'paragraph',
        content: 'Luister hieronder naar het originele nummer en de gescheiden vocals en instrumenten.'
      }
    ],
    websiteUrl: "https://www.lalal.ai/",
    category: ["stem separation"],
    audioDemo: "/audio/Antoon-BeetjevanMij.mp3",
    audioDemo2: "/audio/bvm-lala-vox.mp3",
    audioDemo3: "/audio/bvm-lala-ins.mp3",
    demoText: "Luister naar het origineel (Antoon - Beetje van Mij)",
    demoText2: "Luister naar de vocals",
    demoText3: "Luister naar de instrumental",
    rating: 3.5,
    ratingsCount: 14,
    imageUrl: "/img/lalalai.jpg",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based",
    hasDesktopApp: true,
    hasMobileApp: true,
    whatStems: "Vocals, muziek, drums, bass, gitaar, piano, synthesizer",
    exportOptions: "MP3, OGG, WAV, FLAC, AVI, MP4, MKV, AIFF & AAC",
    useEase: 3.5,
    speed: 3,
    hasFreeVersion: true,
    priceModel: "Credits",
    price: "$22 per 90 minuten muziek",
    subscriptionInfo: [
      {
        name: "Starter",
        price: "Gratis",
        features: [
          "10 minuten verwerking",
          "Maximaal 200MB upload per bestand",
          "Geen export opties"
        ]
      },
      {
        name: "Lite",
        price: "$22",
        features: [
          "90 minuten verwerking",
          "Maximaal 2GB upload per bestand",
          "MP3, OGG, WAV, FLAC, AVI, MP4, MKV, AIFF & AAC export",
        ]
      },
      {
        name: "Plus",
        price: "$30",
        features: [
          "300 minuten verwerking",
          "Snelle wachtrij",
          "Maximaal 2GB upload per bestand",
          "MP3, OGG, WAV, FLAC, AVI, MP4, MKV, AIFF & AAC export"
        ]
      },
      {
        name: "Pro",
        price: "$40",
        features: [
          "500 minuten verwerking",
          "Snelle wachtrij",
          "Maximaal 2GB upload per bestand",
          "MP3, OGG, WAV, FLAC, AVI, MP4, MKV, AIFF & AAC export"
        ]
      }
    ]
  },
  {
    id: "9",
    name: "VocalRemover.org",
    description: "Een AI-tool die vocals en instrumenten uit numemrs scheidt, handig voor remixing en karaoke.",
    descriptionBlocks: [
      {
        type: 'paragraph',
        content: 'VocalRemover.org is een webgebaseerde applicatie die gebruikmaakt van AI-algoritmen om zang en instrumentale delen van een audiotrack te scheiden. Gebruikers kunnen eenvoudig een audiobestand uploaden, waarna de tool binnen enkele seconden twee afzonderlijke tracks genereert: een karaokeversie zonder vocals en een acapellaversie met alleen de zang. Naast vocal removal biedt de site aanvullende functies zoals:'
      },
      {
        type: 'list',
        content: [
          'AI-gegenereerde vocals en instrumenten',
          'Verschillende stijlen en genres',
          'Intuïtieve tekstprompts om nummers te maken',
          'Beschikbaar als webapplicatie en via Microsoft Copilot',
          'Gratis en betaalde abonnementen'
        ]
      }
    ],
    review: "VocalRemover.org biedt een indrukwekkende reeks functies voor een gratis online tool. De vocal removal is over het algemeen effectief. De extra tools zoals pitch- en tempowijziging, evenals de toonsoort- en BPM-detectie, voegen waarde toe voor gebruikers die meer controle willen over hun audiobestanden. Echter, bij complexere tracks met veel overlappende frequenties kan de kwaliteit van de gescheiden tracks variëren, en kunnen er artefacten of verlies van bepaalde elementen optreden. Desondanks is het een uitstekende tool voor snelle stemisolatie.",
    reviewDesc: "Luister hieronder naar het originele nummer en de gescheiden vocals en instrumenten.",
    websiteUrl: "https://vocalremover.org/",
    category: ["stem separation"],
    audioDemo: "/audio/Antoon-BeetjevanMij.mp3",
    audioDemo2: "/audio/bvm-vr-vox.mp3",
    audioDemo3: "/audio/bvm-vr-ins.mp3",
    demoText: "Het origineel (Antoon - Beetje van Mij)",
    demoText2: "De gescheiden vocals",
    demoText3: "De gescheiden instrumental",
    rating: 4.5,
    ratingsCount: 14,
    imageUrl: "/img/vocalremover.jpg",
    extraInfo: "Krijg direct suggesties voor de beste opbouw en structuur van je nieuwe track.",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based",
    hasDesktopApp: false,
    hasMobileApp: false,
    whatStems: "Vocals, muziek, drums, bass",
    exportOptions: "MP3 & WAV",
    useEase: 5,
    speed: 4,
    hasFreeVersion: true,
    priceModel: "Abonnement",
    price: "Gratis tot $15/maand",
    subscriptionInfo: [
      {
        name: "Free",
        price: "Gratis",
        features: [
          "1 nummer per 30 minuten",
          "Maximaal 10 minuten per dag",
          "MP3 & WAV export",
        ]
      },
      {
        name: "Pro",
        price: "$15/maand",
        features: [
          "Onbeperkt aantal nummers",
          "Maximaal 500 minuten per dag",
          "MP3 & WAV export",
        ]
      }
    ]
  },
  {
    id: "10",
    name: "iZotope Ozone 11",
    description: "Een professionele masteringtool die AI gebruikt om suggesties te doen voor EQ, compressie en andere effecten.",
    longDescription: "iZotope Ozone 11 is een professioneel masteringpakket met ingebouwde AI-functies. De tool analyseert automatisch je mix en stelt op basis daarvan een mastering chain samen. Denk aan EQ, compressie, stereo imaging, exciter en limiter. Alles wordt op maat ingesteld. Je hebt daarna zelf de controle om dingen aan te passen. Ozone is vooral gericht op producers die professionele resultaten willen zonder alles handmatig te hoeven instellen.",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Ik heb Ozone 11 vergeleken met een eigen master die ik zelf heb gemaakt van een tech house nummer. Nadat ik mijn nummer had ingeladen liet ik de AI-assistent van Ozone 11 zijn werk doen. Het duurde ongeveer 2 minuten voordat ik het resultaat kreeg. Het resultaat was meteen goed uitgebalanceerd en luid genoeg, zonder dat het te hard of \"overcompressed\" klonk. De helderheid en punch van de AI-master vielen op.'
      },
      {
        type: 'paragraph',
        content: 'Toch vond ik mijn eigen master naar mijn mening net wat beter. Die van mij klinkt net wat luider en helderder. Als snelle en effectieve tool om een goede referentie te hebben of om een snelle master te maken, is Ozone 11 wel echt top. Voor beginnende producers is het een oplossing voor het masteren, en zelfs als je ervaring hebt is het handig als back-up.'
      },      
      {
        type: 'image',
        content: '/img/ozone-mstr.png',
        caption: 'Overzicht van de verschillende masters. Boven is niet gemasterd, midden is mijn eigen master en onder is de AI-master van Ozone 11.',
        alt: 'Screenshot van de verschillende masters'
      },
      {
        type: 'paragraph',
        content: 'Luister hieronder naar de 2 verschillende masters.'
      }
    ],
    websiteUrl: "https://www.izotope.com/en/products/ozone.html?srsltid=AfmBOorb2HtE9B0Ul02TkAyYJpC97XJtHQx_1xC32LGmKvcXHg9g3SUW",
    category: ["mastering"],
    audioDemo2: "/audio/jorioe-mttr-ozone.wav",
    audioDemo3: "/audio/jorioe-mttr-cm.wav",
    demoText2: "Luister naar de gemasterde versie van Ozone 11",
    demoText3: "Luister naar de gemasterde versie van mijzelf",
    rating: 4.5,
    ratingsCount: 14,
    imageUrl: "/img/izotope.png",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "VST of AAX",
    hasDesktopApp: false,
    hasMobileApp: false,
    exportOptions: "Alles wat DAWs kunnen exproteren",
    useEase: 4,
    speed: 3,
    hasFreeVersion: true,
    priceModel: "Eenmalig",
    price: "$199",
    subscriptionInfo: [
      {
        name: "Free Trial",
        price: "Gratis",
        features: [
          "10 dagen gratis toegang tot Ozone 11 Advanced",
        ]
      },
      {
        name: "Advanced",
        price: "$499",
        features: [
          "Lifetime licentie",
        ]
      }
    ]
  },
  {
    id: "11",
    name: "LANDR Studio",
    description: "Biedt AI-gestuurde masteringdiensten die automatisch tracks analyseren en optimaliseren voor verschillende platforms.",
    longDescription: "LANDR Studio is een compleet platform voor muzikanten en producers. Je krijgt toegang tot AI-mastering, muziekdistributie, samenwerkingstools, sample packs en nog veel meer. De focus ligt op snelheid en gemak: je uploadt een track, laat de AI een master maken en kunt die meteen publiceren op streamingplatformen als Spotify en Apple Music.",
    reviewBlocks: [
      {
        type: 'paragraph',
        content: 'Ik heb bij LANDR een nog ongemasterd tech house nummer geüpload en deze vergeleken met mijn eigen master (om het voor jullie wat beter luisterbaar te maken😉). De AI-master van LANDR was verrassend goed: punchy, gebalanceerd en helder. Maar toen ik het vergeleek met mijn eigen master merkte ik wel verschil. Mijn eigen versie klonk dynamischer, luider en iets subtieler qua hoog en stereo. De AI-master van LANDR was net wat minder luid en past bijvoorbeeld niet het volume aan voor de drop. Voor iemand die geen verstand heeft van masteren is het wel echt prima.'
      },      
      {
        type: 'image',
        content: '/img/landr-mstr.png',
        caption: 'Overzicht van de verschillende masters. Boven is niet gemasterd, midden is mijn eigen master en onder is de AI-master van LANDR.',
        alt: 'Screenshot van de verschillende masters'
      },
      {
        type: 'paragraph',
        content: 'Wat LANDR heel aantrekkelijk maakt, is dat je er alles in één hebt. Je hoeft niet apart je masters te exporteren, te uploaden en te distribueren. Alles gebeurt op één plek. Ook krijg je toegang tot een library met samples en loops.'
      },
      {
        type: 'paragraph',
        content: 'Luister hieronder naar de 2 verschillende masters.'
      }
    ],
    websiteUrl: "https://www.landr.com/",
    category: ["mastering"],
    audioDemo2: "/audio/jorioe-mttr-landr.mp3",
    audioDemo3: "/audio/jorioe-mttr-cm.wav",
    demoText2: "Luister naar de gemasterde versie van LANDR",
    demoText3: "Luister naar de gemasterde versie van mijzelf",
    rating: 4.0,
    ratingsCount: 14,
    imageUrl: "/img/landr.jpg",
    // Nieuwe eigenschappen voor vergelijking
    typeTool: "Web-based of VST plugin",
    hasDesktopApp: true,
    hasMobileApp: true,
    exportOptions: "MP3, WAV, HD-WAV",
    useEase: 5,
    speed: 4,
    hasFreeVersion: false,
    priceModel: "Abonnement",
    price: "$18 of $22,5/maand",
    subscriptionInfo: [
      {
        name: "Standard",
        price: "$18/maand",
        features: [
          "Onbeperkt MP3 mastering",
          "3 WAV masters per maand",
          "Onbeperkt distributie",
          "150 sample credits per maand",
          "Plugins, VSTs en meer"
        ]
      },
      {
        name: "Pro",
        price: "$22,5/maand",
        features: [
          "Onbeperkt MP3 mastering",
          "Onbeperkt WAV & HD-WAV mastering",
          "Onbeperkt distributie",
          "150 sample credits per maand",
          "Plugins, VSTs en meer"
        ]
      }
    ]
  },
];
