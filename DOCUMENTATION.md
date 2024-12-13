# Projektdokumentation

## Projektinformation

- **Udvikler:** [Lucas N. Anderson]
- **Hold:** [WU11]
- **Projektperiode:** [18/11/2024 - 13/12/2024]

## 🔗 Links

- **GitHub Repository:** [Link](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28)
- **Vercel URL:** [[Link](https://din-meagler.vercel.app/)]

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
   - **Kilde:** [Motion](https://www.framer.com/motion/)

2. **Google Maps**
   - **Anvendelse:** Integreres via en iframe for at vise kort og placeringer i applikationen.
   - **Kilde:** [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/start)

## 💻 Ændringer og Begrundelser

Ændringer i Projektet

<p>
  <details>
    <summary>Søgefeltet</summary>
    <p>Jeg har ændret søgefeltet, så knappen nu ligger inde i selve søgefeltet, og man kan vælge at søge mellem alle, kun mæglere eller kun boliger. Jeg syntes, at dette gav et bedre UX og så mere moderne ud.</p>
  </details>
</p>
<p>
  <details>
    <summary>Afmeld Nyhedsbrev-side</summary>
    <p>Jeg har lavet en afmeld nyhedsbrev-side, så brugerne kan afmelde sig nyhedsbrevet. Tidligere gav projektet en 500-fejl, hvis man allerede var tilmeldt og prøvede igen. Da der ikke var et design eller layout til denne side, men API’et understøttede funktionen, valgte jeg at tilføje denne side.</p>
  </details>
</p>
<p>
  <details>
    <summary>Toasts</summary>
    <p>Jeg har implementeret en toast-komponent, der popper frem ved forskellige handlinger, som f.eks. ved formularindsendelser. Dette forbedrer brugeroplevelsen ved at give feedback i realtid.</p>
  </details>
</p>
<p>
  <details>
    <summary>Skeleton Loading</summary>
    <p>Jeg har tilføjet skeletons for bedre visning under indlæsning. Dette giver brugeren en visuel indikator, mens data bliver hentet.</p>
  </details>
</p>
<p>
  <details>
    <summary>Footer på Error Page</summary>
    <p>Jeg har ændret footeren på error-siden, da den oprindelige footer ikke passede sammen med resten af designet. Figma footer designet ødelagde det overordnede tema og konsistens.</p>
  </details>
</p>
<p>
  <details>
    <summary>Login og Register Hero</summary>
    <p>På login- og registreringssiderne har jeg fjernet breadcrumbs fra hero-sektionen og beholdt kun titlen. Dette valg blev truffet for at sikre, at designet matcher de andre sider og virker mindre overfyldt.</p>
  </details>
</p>
<p>
  <details>
    <summary>Boligdetaljer - Slideshow</summary>
    <p>På boligdetaljesiden har jeg lavet et slideshow med i alt 4 billeder fra huset. API’et gav adgang til flere billeder, men der var ikke noget design til dem. For at udnytte billederne på en brugervenlig måde valgte jeg at lave et simpelt slideshow.</p>
  </details>
</p>

# 📈 Egen Indsats & Resultat

## Hvad gik godt

- Jeg blev særligt tilfreds med, hvordan **loading-oplevelsen** blev forbedret ved at tilføje **skeletons**. Det gav brugerne en bedre fornemmelse af, at data var ved at blive hentet.
- **Toasts** blev implementeret effektivt og gjorde applikationen mere brugervenlig ved at give tydelig og direkte feedback på handlinger.
- **Animationer** tilføjet med Framer Motion gjorde applikationen mere dynamisk og engagerende.
- Jeg lærte en masse om **Framer Motion** og blev bedre til at forstå og anvende det til at skabe flydende og naturlige animationer.
- Jeg er meget tilfreds med, **stylingen** og, at det ligner Figma-designet næsten 1-1.

## Udfordringer

- **Google Maps Integration**  
  Det var udfordrende at få Google Maps integreret korrekt, da API-dokumentationen ikke var helt intuitiv. Jeg løste det ved at dykke ned i dokumentationen, finde eksempler, og teste små dele af integrationen ad gangen men brugte en del tid på at få det korrekt sat ind.
- **Favoritfunktionalitet**  
  At få favoritfunktionen til at fungere korrekt med API’et krævede ekstra arbejde. og brugte en del hjælp fra forskellige ai´s til at forstå det og få det til at virke
- **Brug af AI**  
  Jeg føler, at jeg brugte lidt for meget hjælp fra AI til nogle af funktionerne, hvilket resulterede i, at nogle dele af koden blev lidt ulæselige. Hvis jeg kunne lave projektet igen, ville jeg undgå at bruge så meget AI til koden for at få bedre kontrol og forståelse af, hvordan funktionerne fungerer.
- **Tidspres på grund af sygdom**  
  Jeg var syg i starten af projektet, og det gjorde, at jeg følte mig lidt presset i starten, og ikke fik en introduktion til projektet så jeg var lidt for hurtig i starten til bare at gå til ai for at få det til at virke.
- **Mappe-struktur**  
  Jeg syntes, at **mappe-strukturen** blev lidt overskuelig til sidst, da der var så mange forskellige filer. Dette gjorde det svært at navigere i projektet, og det ville have været bedre at have en mere struktureret tilgang fra starten.

# ⭐ Særlige Punkter til Bedømmelse

1. **Loading, Toast, Skeletons og Animationer**

   - Jeg implementerede **skeletons** for at vise brugeren, at data blev hentet, hvilket forbedrede brugeroplevelsen under indlæsning. Se kode for skeleton-komponenten: [Skeleton Component](#skeleton-component).
   - **Toasts** blev brugt til at give feedback til brugeren, hvilket gjorde applikationen mere interaktiv og brugervenlig. Se kode for toast-komponenten: [Toast Component](#toast-component).
   - Jeg brugte **Framer Motion** til at tilføje animationer, hvilket gjorde applikationen mere dynamisk og engagerende for brugerne. Dette inkluderede:
     - **Page Transition**: Se kode for page transition: [Page Transition](#page-transition)
     - **App Section Animation**: Se kode for app section animation: [App Section Animation](#app-section-animation)
   - **Hvorfor det er særligt:** Disse funktioner forbedrede ikke kun UX’en betydeligt, men gjorde også applikationen mere visuelt tiltalende og interaktiv.

2. **Styling i overensstemmelse med Figma Design**

   - Jeg sørgede for, at stylingen af applikationen fulgte designet fra Figma, hvilket gav et professionelt og konsekvent udseende.
   - Jeg brugte Tailwind CSS til hurtigt at implementere de nødvendige stylingregler og få det ønskede udseende.
   - **Hvorfor det er særligt:** Dette sikrede, at designet blev implementeret præcist som foreskrevet, hvilket gav applikationen en flot og ensartet brugerflade.

## Kode Links:

### Skeleton Component

- [Skeleton Component](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28/tree/main/src/components/skeletons)
  - Denne komponent bruges til at vise en placeholder under dataindlæsning, hvilket forbedrer brugeroplevelsen.

### Toast Component

- [Toast Component](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28/blob/main/src/components/ui/Toast.jsx)
  - Bruges til at vise feedback til brugeren for forskellige handlinger i applikationen.

### Page Transition

- [Page Transition](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28/blob/main/src/components/ui/PageTransition.jsx)
  - Anvender Framer Motion til at skabe glidende overgange mellem sider, hvilket gør brugeroplevelsen mere flydende.

### App Section Animation

- [App Section Animation](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28/blob/main/src/components/sections/AppSection.jsx)
  - Anvender Framer Motion til at animere specifikke sektioner af appen, som f.eks. ved loading af indhold eller ændringer i appens tilstand.

### Google Maps Integration

- [Google Maps Component](https://github.com/rts-cmk-wu12/din-m-gler-Lucasna28/blob/main/src/components/maps/GoogleMap.jsx)
  - Denne komponent integrerer Google Maps til at vise placeringer og ruter direkte i applikationen.

## 📊 Projektstyring

[Screenshots eller links til dit projektstyringsværktøj]
