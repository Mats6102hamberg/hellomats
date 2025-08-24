// seed.js - Fyller databasen med testdata
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

const db = new sqlite3.Database('./konsulentportal.db');

async function seedDatabase() {
  console.log('🌱 Startar databasseeding...');

  try {
    // Skapa test-användare
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = [
      {
        username: 'admin',
        email: 'admin@konsulentportal.se',
        password: hashedPassword,
        role: 'admin'
      },
      {
        username: 'konsulent1',
        email: 'konsulent1@konsulentportal.se', 
        password: hashedPassword,
        role: 'consultant'
      },
      {
        username: 'konsulent2',
        email: 'konsulent2@konsulentportal.se',
        password: hashedPassword,
        role: 'consultant'
      }
    ];

    // Lägg till användare
    for (const user of users) {
      db.run(
        'INSERT OR IGNORE INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [user.username, user.email, user.password, user.role]
      );
    }

    // Moduler
    const modules = [
      {
        title: 'Anknytning',
        description: 'Grunder, trygg bas, hur vi bygger relation i vardagen. Lärandemål + slides + övningar.',
        tags: JSON.stringify(['grund', 'relation']),
        content: JSON.stringify({
          goals: [
            'Känna till trygg/otrygg anknytning (översikt).',
            'Kunna beskriva "trygg bas" och "säker hamn" i vardagen.',
            'Träna validering: se – sätt ord – normalisera.',
            'Identifiera 3 vardagssignaler och anpassa bemötande.',
            'Planera två mikrosteg som stärker trygghet kommande vecka.'
          ],
          duration: '60 minuter',
          materials: ['Slides', 'Rollspelskort', 'Checklista'],
          exercises: [
            'Triad-rollspel: Validera + rama in (20 min)',
            'Observation i vardagen (10 min)'
          ]
        }),
        created_by: 1
      },
      {
        title: 'Gränssättning',
        description: 'Varm struktur, konsekvens utan skam. Hemuppgifter och samtalsfrågor.',
        tags: JSON.stringify(['vardag', 'struktur']),
        content: JSON.stringify({
          goals: [
            'Förstå begreppet varm struktur (omtanke + tydlighet).',
            'Kunna formulera 3 gemensamma hemmaregler.',
            'Använda konsekvenskedja utan skam.',
            'Hantera utbrott – nedtrappning och reparation.',
            'Följa upp med mätbara mikrosteg.'
          ],
          duration: '60 minuter',
          materials: ['Slides', 'Mall för hemregler', 'Påminnelsefraser'],
          exercises: [
            'Rollspel: Varm struktur (15 min)',
            'Hemmareglers topp 3 (10 min)'
          ]
        }),
        created_by: 1
      },
      {
        title: 'Samarbete med biologiska föräldrar',
        description: 'Kontaktplan, respektfull kommunikation, förväntningar och roller.',
        tags: JSON.stringify(['samverkan']),
        content: JSON.stringify({
          goals: [
            'Skapa respektfull samarbetsrelation.',
            'Planera kontakt/umgänge med barnets bästa i fokus.',
            'Hantera konflikter och förväntningar tydligt.',
            'Kommunicera neutralt och dokumentera korrekt.'
          ],
          duration: '90 minuter',
          materials: ['Kontaktplan mall', 'Mötesagenda', 'Kommunikationsguide'],
          exercises: [
            'Rollspel: Samtal med bioförälder (20 min)',
            'Skriv neutralt meddelande (10 min)'
          ]
        }),
        created_by: 1
      },
      {
        title: 'Skola & lärande',
        description: 'Närvaro, anpassningar, samarbete med elevhälsa och rutiner kring läxor.',
        tags: JSON.stringify(['skola']),
        content: JSON.stringify({
          goals: [
            'Säkra närvaro och stöd i skolan.',
            'Kunna leda korta effektiva skolmöten.',
            'Stötta läxor och studiero i hemmet.',
            'Följa upp med enkla mått (närvaro, uppgifter).'
          ],
          duration: '75 minuter',
          materials: ['Mötesmall', 'Närvarotabell', 'Belöningskriterier'],
          exercises: [
            'Planera 15-min möte med skolan',
            'Morgonrutin-kort (10 min)'
          ]
        }),
        created_by: 1
      },
      {
        title: 'Nätverk & umgänge',
        description: 'Kartan runt barnet: släkt, vänner, fritid. Risk- och skyddsfaktorer.',
        tags: JSON.stringify(['nätverk']),
        content: JSON.stringify({
          goals: [
            'Kartlägga barnets nätverk systematiskt.',
            'Identifiera risk- och skyddsfaktorer.',
            'Stärka positiva relationer.',
            'Hantera problematiska kontakter.'
          ],
          duration: '60 minuter',
          materials: ['Nätverkskarta', 'Riskbedömning', 'Handlingsplan'],
          exercises: [
            'Skapa nätverkskarta (15 min)',
            'Risk/skydd analys (20 min)'
          ]
        }),
        created_by: 1
      }
    ];

    for (const module of modules) {
      db.run(
        'INSERT OR IGNORE INTO modules (title, description, tags, content, created_by) VALUES (?, ?, ?, ?, ?)',
        [module.title, module.description, module.tags, module.content, module.created_by]
      );
    }

    // Rollspel
    const roleplayScenarios = [
      {
        title: 'Familjehemmet vill avsluta uppdraget',
        level: 'Svår',
        focus: 'krishantering, validera oro, skapa alternativ',
        content: JSON.stringify({
          scenario: 'Familjehemmet ringer och säger att de inte längre kan ta hand om barnet. De är utmattade och frustrerade.',
          roles: ['Konsulent', 'Familjehem', 'Observatör'],
          goals: [
            'Validera familjehemmets känslor',
            'Utforska vad som lett till beslutet',
            'Hitta kortsiktiga lösningar',
            'Planera för barnets trygghet'
          ],
          time: '20 minuter',
          debrief_questions: [
            'Vad gjorde konsulenten bra?',
            'Vilka alternativ diskuterades?',
            'Hur tryggas barnet under processen?'
          ]
        }),
        created_by: 1
      },
      {
        title: 'Gränssättning brister i vardagen',
        level: 'Medel',
        focus: 'tydliggöra ramar, gemensamma regler, förväntningar',
        content: JSON.stringify({
          scenario: 'Barnet följer inte hemmagjorda regler. Familjen är osams om hur de ska hantera situationen.',
          roles: ['Konsulent', 'Familjehem', 'Observatör'],
          goals: [
            'Kartlägga nuvarande regelsystem',
            'Skapa samsyn mellan vuxna',
            'Föreslå konkreta förändringar',
            'Planera uppföljning'
          ],
          time: '15 minuter',
          debrief_questions: [
            'Vilka regler är viktigast?',
            'Hur skapar vi samsyn?',
            'Vad är nästa konkreta steg?'
          ]
        }),
        created_by: 1
      },
      {
        title: 'Konflikt med skolan',
        level: 'Medel',
        focus: 'samverkan, mötesstruktur, tydliga mål',
        content: JSON.stringify({
          scenario: 'Skolan klagar på barnets beteende och hotar med särskolan. Familjen känner sig maktlösa.',
          roles: ['Konsulent', 'Familjehem', 'Observatör'],
          goals: [
            'Förbereda för skolmöte',
            'Klargöra roller och ansvar',
            'Formulera konkreta förslag',
            'Planera för barnets stöd'
          ],
          time: '15 minuter'
        }),
        created_by: 1
      },
      {
        title: 'Barnet ljuger och tar saker',
        level: 'Lätt',
        focus: 'tolka beteende, minska skam, konsekvenskedja',
        content: JSON.stringify({
          scenario: 'Familjen upptäcker att barnet tagit pengar från handväskan och ljuger om det.',
          roles: ['Konsulent', 'Familjehem', 'Observatör'],
          goals: [
            'Förstå beteendets funktion',
            'Hantera situationen utan skam',
            'Sätta tydliga konsekvenser',
            'Bygga tillit framåt'
          ],
          time: '10 minuter'
        }),
        created_by: 1
      },
      {
        title: 'Umgänge med bioförälder skapar oro',
        level: 'Medel',
        focus: 'förberedelser, efterarbete, trygghetsskapande',
        content: JSON.stringify({
          scenario: 'Barnet blir alltid upprörd efter umgängen med biologiska föräldern. Familjen vet inte hur de ska hjälpa.',
          roles: ['Konsulent', 'Familjehem', 'Observatör'],
          goals: [
            'Analysera umgängets påverkan',
            'Planera förberedelser',
            'Skapa rutiner för efterarbete',
            'Stödja barnets bearbetning'
          ],
          time: '15 minuter'
        }),
        created_by: 1
      }
    ];

    for (const roleplay of roleplayScenarios) {
      db.run(
        'INSERT OR IGNORE INTO roleplay (title, level, focus, content, created_by) VALUES (?, ?, ?, ?, ?)',
        [roleplay.title, roleplay.level, roleplay.focus, roleplay.content, roleplay.created_by]
      );
    }

    // Händelser
    const events = [
      {
        title: 'Introduktionsworkshop för nya konsulenter',
        date: '2025-09-01',
        location: 'Teams',
        description: 'Genomgång av portalen och grundläggande metoder.',
        created_by: 1
      },
      {
        title: 'Rollspelsträning - Avancerad nivå',
        date: '2025-09-15',
        location: 'Stockholm kontor',
        description: 'Fördjupning i svåra samtal och krishantering.',
        created_by: 1
      },
      {
        title: 'Månatlig uppföljning och reflektion',
        date: '2025-10-01',
        location: 'Teams',
        description: 'Gemensam reflektion och erfarenhetsutbyte.',
        created_by: 1
      },
      {
        title: 'Utbildning: Trauma-informerat förhållningssätt',
        date: '2025-10-15',
        location: 'Göteborg',
        description: 'Specialistutbildning för komplicerade fall.',
        created_by: 1
      },
      {
        title: 'Årlig konferens - Familjehemsarbete 2025',
        date: '2025-11-20',
        location: 'Stockholm',
        description: 'Forskningsresultat och nya metoder inom området.',
        created_by: 1
      }
    ];

    for (const event of events) {
      db.run(
        'INSERT OR IGNORE INTO events (title, date, location, description, created_by) VALUES (?, ?, ?, ?, ?)',
        [event.title, event.date, event.location, event.description, event.created_by]
      );
    }

    // FAQ
    const faqs = [
      {
        question: 'Hur hittar jag modulerna?',
        answer: 'Du hittar dem under fliken Modulbibliotek eller via sökfältet. Du kan också filtrera på taggar för att hitta specifika ämnen.',
        category: 'Navigation',
        created_by: 1
      },
      {
        question: 'Kan jag skriva ut rollspelen?',
        answer: 'Ja, gå till fliken Rollspel & Case och välj "Skriv ut kortlek". Du kan också exportera individuella scenarier som PDF.',
        category: 'Funktioner',
        created_by: 1
      },
      {
        question: 'Hur exporterar jag kalendern?',
        answer: 'Under fliken Kalender finns en knapp för export till din egen kalender. Du kan exportera som ICS-fil som fungerar i de flesta kalenderappar.',
        category: 'Kalender',
        created_by: 1
      },
      {
        question: 'Vem kan jag kontakta vid akuta situationer?',
        answer: 'Vid akuta situationer, ring alltid 112 först. För konsultation finns jourtelefon tillgänglig dygnet runt på nummer som finns under "Akuta kontaktvägar".',
        category: 'Support',
        created_by: 1
      },
      {
        question: 'Hur lägger jag till egna moduler?',
        answer: 'Klicka på "Ny modul" i Modulbiblioteket. Du behöver vara inloggad och ha rättigheter för att skapa nytt innehåll.',
        category: 'Funktioner',
        created_by: 1
      },
      {
        question: 'Kan jag använda materialet offline?',
        answer: 'Vissa dokument kan laddas ner som PDF för offline-användning. Exportfunktioner finns vid varje modul och rollspel.',
        category: 'Teknisk',
        created_by: 1
      },
      {
        question: 'Hur fungerar taggarna i modulerna?',
        answer: 'Taggar hjälper dig att filtrera innehåll efter ämne. Exempel: "grund" för grundläggande moduler, "skola" för skolrelaterat innehåll.',
        category: 'Navigation',
        created_by: 1
      },
      {
        question: 'Vad betyder rollspelens svårighetsgrader?',
        answer: 'Lätt = grundläggande situationer, Medel = kräver mer erfarenhet, Svår = komplexa fall som behöver specialkunskap.',
        category: 'Rollspel',
        created_by: 1
      }
    ];

    for (const faq of faqs) {
      db.run(
        'INSERT OR IGNORE INTO faq (question, answer, category, created_by) VALUES (?, ?, ?, ?)',
        [faq.question, faq.answer, faq.category, faq.created_by]
      );
    }

    // Lägg till några exempel på användaraktiviteter
    const activities = [
      { user_id: 2, activity_type: 'module_completed', module_id: 1 },
      { user_id: 2, activity_type: 'module_completed', module_id: 2 },
      { user_id: 2, activity_type: 'roleplay_practiced', module_id: null },
      { user_id: 3, activity_type: 'module_completed', module_id: 1 },
      { user_id: 3, activity_type: 'module_started', module_id: 3 }
    ];

    for (const activity of activities) {
      db.run(
        'INSERT INTO user_activities (user_id, activity_type, module_id) VALUES (?, ?, ?)',
        [activity.user_id, activity.activity_type, activity.module_id]
      );
    }

    console.log('✅ Databasseeding komplett!');
    console.log('\n📋 Testanvändare skapade:');
    console.log('   Admin: admin@konsulentportal.se / password123');
    console.log('   Konsulent 1: konsulent1@konsulentportal.se / password123');
    console.log('   Konsulent 2: konsulent2@konsulentportal.se / password123');
    console.log('\n🎯 Data tillagd:');
    console.log(`   ${modules.length} moduler`);
    console.log(`   ${roleplayScenarios.length} rollspel`);
    console.log(`   ${events.length} händelser`);
    console.log(`   ${faqs.length} FAQ`);
    console.log(`   ${activities.length} användaraktiviteter`);

  } catch (error) {
    console.error('❌ Fel vid seeding:', error);
  } finally {
    db.close();
  }
}

// Kör seeding om filen körs direkt
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };