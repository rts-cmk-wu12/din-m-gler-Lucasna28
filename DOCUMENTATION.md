# Projektdokumentation

## Projektinformation

- **Udvikler:** [Lucas N. Anderson]
- **Hold:** [WU11]
- **Projektperiode:** [18/11/2024 - 13/12/2024]

## 🔗 Links

- **GitHub Repository:** [Link](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28){:target="\_blank"}
- **Vercel URL:** [[Link](https://din-meagler.vercel.app/)]{:target="\_blank"}

## 🔑 Login Credentials

- **Brugernavn:** [navn@mail.dk]
- **Password:** [123456]

## 💻 Tech Stack

<details>
<summary>Next.js</summary>
<p>
-Hvordan jeg bruger det: Jeg bruger Next.js som fundamentet for mit frontend-arbejde. Dets evne til at håndtere server-side rendering (SSR) og generering af statiske sider har været afgørende for at forbedre hastigheden og SEO'en på mit projekt.
</p>
<p>  
-Hvorfor jeg valgte det: Jeg sætter pris på, hvordan det gør mine sider hurtigere og bedre optimeret til søgemaskiner. De indbyggede funktioner til routing og API-håndtering gør også udviklingsprocessen meget mere effektiv.
</p>
</details>
<details>
<summary>Tailwind CSS</summary>
<p>
-Hvordan jeg bruger det: Tailwind CSS gør det nemt at style mine brugergrænseflader ved at bruge deres utility-klasser direkte i mine komponenter. Det sparer mig tid og reducerer behovet for at skrive meget tilpasset CSS.
</p>
<p>  
-Hvorfor jeg valgte det: Jeg kan hurtigt bygge responsive og flotte designs uden at skulle bruge tid på grundlæggende styling. Tailwind giver mig friheden til at fokusere på funktionalitet og design samtidig.
</p>
</details>
   <details>
      <summary>Framer Motion</summary>
      <p> 
        -Hvordan jeg bruger det: Jeg bruger Framer Motion til at tilføje flydende animationer og overgange mellem komponenter. Det gør brugeroplevelsen mere dynamisk og engagerende.
      </p>
      <p>  
        -Hvorfor jeg valgte det: Det er nemt at implementere og gør en stor forskel i, hvordan applikationen føles for brugeren. Animationerne hjælper med at fastholde brugernes opmærksomhed og skaber et professionelt udtryk.
      </p>
  </details>
   <details>
      <summary>js-cookie</summary>
      <p> 
        -Hvordan jeg bruger det: Jeg bruger js-cookie til at håndtere cookies på klient-siden. Det gør det nemt at gemme brugerpræferencer og sessionsdata.
      </p>
      <p>  
        -Hvorfor jeg valgte det: Jeg havde brug for en simpel løsning til at arbejde med cookies, og js-cookie opfyldte alle mine behov.
      </p>
  </details>
<details>
      <summary>Lucide React</summary>
      <p> 
        -Hvordan jeg bruger det: Lucide React leverer ikoner, der forbedrer brugergrænsefladen og hjælper med at gøre designet mere intuitivt.
      </p>
      <p>  
        -Hvorfor jeg valgte det: Jeg manglede nogle specifikke ikoner, som ikke var inkluderet i Figma-designet, og Lucide React havde præcis, hvad jeg skulle bruge.
      </p>
  </details>
<details>
      <summary>Zod</summary>
      <p> 
        -Hvordan jeg bruger det: Jeg anvender Zod til validering af data i mine formularer og andre inputs. Det sikrer, at data altid følger det forventede format.
      </p>
      <p>  
        -Hvorfor jeg valgte det: Jeg lærte om Zod midt i projektet og opdagede, hvor meget det hjælper med at reducere fejl. Det gør valideringsprocessen enklere og sikrer, at applikationen kører problemfrit.
      </p>
  </details>

## 📦 Tredjepartskode

1. **Framer Motion**

   - **Anvendelse:** Bruges til at tilføje animationer og overgange i applikationen, hvilket forbedrer brugeroplevelsen.
   - **Kilde:** [Motion](https://www.framer.com/motion/{:target="_blank"})

2. **Google Maps**
   - **Anvendelse:** Integreres via en iframe for at vise kort og placeringer i applikationen.
   - **Kilde:** [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/start)

# 🛠 Valg & Argumentation

Her beskriver jeg de vigtige valg, jeg har truffet i projektet, og hvorfor:

## **Arkitektur Beslutninger**

### Ændringer og Begrundelser:

- **Søgefeltet**  
  Jeg har ændret søgefeltet, så knappen nu ligger inde i selve søgefeltet, og man kan vælge at søge mellem alle, kun mæglere eller kun boliger. Jeg syntes, at dette gav et bedre UX og så mere moderne ud.

- **Afmeld Nyhedsbrev-side**  
  Jeg har lavet en afmeld nyhedsbrev-side, så brugerne kan afmelde sig nyhedsbrevet. Tidligere gav projektet en 500-fejl, hvis man allerede var tilmeldt og prøvede igen. Da der ikke var et design eller layout til denne side, men API’et understøttede funktionen, valgte jeg at tilføje denne side.

- **Toasts**  
  Jeg har implementeret en toast-komponent, der popper frem ved forskellige handlinger, som f.eks. ved formularindsendelser. Dette forbedrer brugeroplevelsen ved at give feedback i realtid.

- **Skeleton Loading**  
  Jeg har tilføjet skeletons for bedre visning under indlæsning. Dette giver brugeren en visuel indikator, mens data bliver hentet.

- **Footer på Error Page**  
  Jeg har ændret footeren på error-siden, da den oprindelige footer ikke passede sammen med resten af designet. Figma footer designet ødelagde det overordnede tema og konsistens .

- **Login og Register Hero**  
  På login- og registreringssiderne har jeg fjernet breadcrumbs fra hero-sektionen og beholdt kun titlen. Dette valg blev truffet for at sikre, at designet matcher de andre sider og virker mindre overfyldt.

- **Boligdetaljer - Slideshow**  
  På boligdetaljesiden har jeg lavet et slideshow med i alt 4 billeder fra huset. API’et gav adgang til flere billeder, men der var ikke noget design til dem. For at udnytte billederne på en brugervenlig måde valgte jeg at lave et simpelt slideshow.

## 📈 Egen Indsats & Resultat

### Hvad gik godt

- Point 1
- Point 2

### Udfordringer

- Udfordring 1 og hvordan den blev løst
- Udfordring 2 og hvordan den blev løst

## ⭐ Særlige Punkter til Bedømmelse

1. **[Særligt punkt 1]**

   - Beskrivelse af implementering
   - Hvorfor det er særligt

2. **[Særligt punkt 2]**
   - Beskrivelse af implementering
   - Hvorfor det er særligt

## 📊 Projektstyring

[Screenshots eller links til dit projektstyringsværktøj]
