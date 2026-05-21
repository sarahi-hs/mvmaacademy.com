/**
 * Blog content para mvmaacademy.com
 * 18 artículos SEO-optimizados sobre asesoría de imagen, marca personal y MVMA.
 */

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: "Asesoría de Imagen" | "Marca Personal" | "Mentalidad" | "MVMA";
  keywords: string[];
  publishedAt: string; // ISO date
  readMinutes: number;
  body: string; // markdown
}

export const POSTS: BlogPost[] = [
  {
    slug: "como-construir-marca-personal-autentica-mujeres",
    title: "Cómo construir una marca personal auténtica si eres mujer (sin caer en clichés)",
    description: "Construir marca personal no es aparentar. Te explico el método MVMA para revelar quién eres realmente y comunicarlo con coherencia desde adentro hacia afuera.",
    category: "Marca Personal",
    keywords: ["marca personal mujeres", "branding personal femenino", "MVMA", "auténtica"],
    publishedAt: "2026-05-01",
    readMinutes: 6,
    body: `
La industria de la marca personal está saturada de fórmulas. "Posicionate", "encontrá tu nicho", "definí tu propuesta de valor". Todo eso suena bien en un curso, pero **no te ayuda si todavía no sabes quién eres**.

## El error más común al empezar

La mayoría de las mujeres que asesoro llegan con la misma frustración: copiaron un template, hicieron un rebrand, contrataron un fotógrafo. Y siguen sintiendo que su marca personal **no las representa**.

¿Por qué? Porque trataron de construir la fachada antes de revisar los cimientos.

## Los 3 cimientos de una marca personal auténtica

### 1. Identidad

¿Quién eres cuando nadie te está mirando? ¿Qué te apasiona genuinamente? ¿Qué valores son innegociables para ti? Antes de pensar en "qué vendo" o "para quién", tenés que poder responder estas preguntas con claridad.

### 2. Coherencia entre fondo y forma

Acá entra la asesoría de imagen. Tu manera de vestir, tu paleta de colores, tu estética, tu tono de comunicación: todo eso son **vehículos de tu identidad**. Cuando hay desconexión entre quién eres por dentro y cómo te muestras por fuera, la gente lo nota — aunque no sepa explicar por qué.

### 3. Constancia en el tiempo

Una marca personal no se construye en un mes. Es la suma de miles de pequeñas decisiones coherentes a lo largo del tiempo. Por eso el método MVMA — Mi Versión Más Auténtica — no es un curso de 8 semanas. Es un proceso integral que combina trabajo de imagen + mentalidad + comunicación.

## El test de los 30 segundos

Si tuvieras 30 segundos para presentarte ante alguien importante, ¿podrías hacerlo sin sentir que estás recitando un guion? Si la respuesta es no, tu marca personal todavía no es auténtica — todavía estás performance-ando.

## Cómo empezar hoy

1. Dedicá 1 hora a escribir tu historia personal completa, sin filtros
2. Listá 5 valores innegociables tuyos
3. Mirá fotos tuyas de hace 5 años: ¿qué cambió? ¿qué se mantuvo?
4. Identificá 3 mujeres referentes que te inspiren — pero NO para copiarlas, para entender qué admirás de ellas (eso refleja lo que vos misma valorás)

Si querés acompañamiento profesional en este proceso, MVMA Tribe es el espacio donde lo trabajamos en comunidad cada mes.
    `.trim(),
  },
  {
    slug: "asesoria-de-imagen-vs-personal-shopper-diferencias",
    title: "Asesoría de imagen vs Personal Shopper: cuál necesitas tú",
    description: "No es lo mismo una asesora de imagen que una personal shopper. Te explico las diferencias para que elijas el servicio correcto según tu momento de vida.",
    category: "Asesoría de Imagen",
    keywords: ["asesora de imagen", "personal shopper", "diferencias", "qué contratar"],
    publishedAt: "2026-04-25",
    readMinutes: 5,
    body: `
Mucha gente las usa como sinónimos. No lo son. Aunque ambas profesiones trabajan con tu imagen, **resuelven problemas distintos**.

## Personal Shopper: optimiza tu compra

Una personal shopper te acompaña al shopping (físico o virtual) para ayudarte a comprar mejor. Su superpoder es **conocer las marcas, los cortes que te favorecen, las tendencias**, y armarte un closet funcional sin que gastes de más.

Es ideal para vos si:
- Te falta tiempo y no querés dar vueltas en mil tiendas
- Tenés un evento próximo y no sabés qué ponerte
- Querés actualizar tu guardarropa pero no sabés por dónde empezar
- Tu presupuesto es acotado y necesitás priorizar

## Asesora de Imagen: construye tu identidad visual

Una asesora de imagen trabaja un paso antes. **Antes de comprar nada**, te ayuda a definir tu **estilo personal**, tu **paleta de colores**, las **siluetas que funcionan con tu cuerpo y tu personalidad**, tu **mensaje no verbal**.

Es ideal para vos si:
- Sentís que "nada te queda bien" aunque compres mucho
- Estás en un cambio de etapa (profesional, personal, de edad)
- Querés que tu imagen comunique algo específico (autoridad, calidez, creatividad)
- Te interesa entender tu imagen como herramienta de marca personal, no solo como ropa

## El orden importa

El error más común: contratar una personal shopper sin haber trabajado primero tu asesoría de imagen. Resultado: comprás ropa hermosa pero que no te representa. **Primero la identidad, después la compra**.

## Mi enfoque MVMA

En mi programa Mi Versión Más Auténtica integro ambas disciplinas + trabajo de mentalidad + coaching de marca personal. Porque tu imagen no es solo lo que comprás, es lo que comunicás de quién sos.
    `.trim(),
  },
  {
    slug: "lo-que-tu-color-personal-dice-de-ti",
    title: "Lo que tu color personal dice de ti (y por qué pocas mujeres lo saben)",
    description: "El color que usas comunica algo de ti antes de que abras la boca. Te explico por qué importa tanto y por qué los tests de internet no son suficientes.",
    category: "Asesoría de Imagen",
    keywords: ["colorimetría personal", "paleta de color mujer", "estudio de color", "imagen personal"],
    publishedAt: "2026-04-18",
    readMinutes: 5,
    body: `
Cuando elijes un color para vestirte, no estás eligiendo solo una tela. Estás eligiendo **un mensaje**. Y la mayoría de las mujeres lo hacen sin saberlo.

## El color es comunicación silenciosa

Antes de que abras la boca, tu paleta de colores le cuenta al mundo algo sobre ti:
- Tu energía (vibrante o serena)
- Tu nivel de presencia (contenida o expansiva)
- Tu coherencia (alineada o dispersa)

El problema es que casi nadie piensa en sus colores con esta consciencia. Compramos lo que vemos en la tienda, lo que estaba en oferta, lo que copiamos de alguien.

## Por qué los tests gratis no te van a salvar

Hiciste el test de "qué estación eres", te salió "verano" y te lanzaste a comprar lavandas y rosas. Después te das cuenta de que no te ves como esperabas. ¿Qué pasó?

Que **un test escrito no puede ver tu cara**. No puede medir tu subtono real, no puede percibir cómo reacciona tu piel a la luz, no puede notar cuándo te apagas o cuándo te iluminas con un tono específico.

La colorimetría profesional requiere ver tu rostro bajo luz controlada, no contestar preguntas de internet.

## Lo que cambia cuando descubres tus colores reales

Las mujeres que han trabajado su paleta personal conmigo me dicen lo mismo:

> "Por primera vez, mi clóset entero combina entre sí."

> "Me veo descansada aunque haya dormido poco."

> "La gente empezó a notar mis ojos, no mi maquillaje."

Eso no es magia. Es lo que pasa cuando dejas de pelearte con colores que no son tuyos.

## ¿Lista para conocer los tuyos?

Si te interesa descubrir cuál es tu paleta personal real — la que te ilumina, te rejuvenece y te ayuda a comunicar quién eres — tengo dos formas de acompañarte:

- **Estudio de Color Básico** ($888 MXN en promoción) — Tu paleta dentro de las 12 estaciones en una sesión de 40 minutos.
- **Asesoría de Imagen Básica** ($2,500 MXN) — Estudio de color completo + biotipo + visagismo + book personalizado.

[Conoce todos mis servicios →](/servicios)
    `.trim(),
  },
  {
    slug: "como-vestirte-para-grabar-contenido-instagram",
    title: "Cómo vestirte para grabar contenido en Instagram y TikTok (sin verte ridícula)",
    description: "Errores comunes al elegir outfit para tus reels y videos, y qué funciona realmente en cámara según tu industria y tu marca personal.",
    category: "Marca Personal",
    keywords: ["outfit reels", "qué ponerme video", "contenido instagram", "creadora contenido"],
    publishedAt: "2026-04-11",
    readMinutes: 6,
    body: `
Si subís contenido a Instagram, TikTok o YouTube, tu **ropa es parte de tu mensaje**. Hay errores que te quitan autoridad sin que te des cuenta — y soluciones simples que multiplican tu impacto visual.

## Los 5 errores más comunes

### 1. Vestirte para la cámara, no para vos
Mucha gente se pone outfits que jamás usaría en su vida real, solo "para que se vea bien en video". Resultado: tu audiencia siente la incoherencia, aunque no la sepa nombrar.

### 2. Estampados pequeños y rayas finas
En cámara crean **efecto moiré** (vibración visual). Quedan horribles. Optá por colores sólidos o estampados grandes.

### 3. Blanco puro o negro absoluto
El blanco "quema" en cámara y el negro absoluto absorbe demasiada luz, perdiendo detalle. Si querés esos tonos, optá por **blanco hueso/crudo** o **negro suavizado** (con textura visible).

### 4. Joyería que rebota luz
Aros muy brillantes, collares con strass: distraen del rostro. Joyería **mate o de tono suave** funciona mejor.

### 5. Cuello + escote sin contraste
Si tu fondo es blanco y tu blusa es blanca, te "fundís" con el fondo. **Siempre buscá contraste entre vos y el fondo**.

## Lo que sí funciona

- **Cuellos en V o redondos limpios** (estructuran el rostro)
- **Tonos joya** sobre tu paleta personal (esmeralda, vino, mostaza)
- **Texturas visibles** (lino, seda, knit) que dan dimensión
- **Maquillaje un poco más intenso** que en la vida real (la cámara aplana)

## El truco del 80/20

El 80% de tu outfit puede ser tu estilo cotidiano. El 20% restante es un **detalle que potencia la cámara**: un labial vibrante, unos aretes de declaración, un blazer estructurado. Eso eleva sin desnaturalizar.

## Coherencia entre cuenta y mensaje

Si tu cuenta es de coaching de vida íntimo, no aparezcas siempre en blazer corporativo. Si tu cuenta es de finanzas empresariales, no grabes en pijama. **Tu ropa anuncia tu mensaje antes de que abras la boca**.

En MVMA esto es lo que llamo "coherencia entre forma y fondo" — y es uno de los entregables clave del programa.
    `.trim(),
  },
  {
    slug: "imagen-profesional-mujeres-emprendedoras",
    title: "Imagen profesional para mujeres emprendedoras: el caso de las fundadoras",
    description: "Si eres founder de tu propio negocio, tu imagen no es opcional. Te muestro cómo construirla sin perder tu esencia ni caer en el uniforme corporativo.",
    category: "Marca Personal",
    keywords: ["imagen mujer emprendedora", "founder femenina", "ceo mujer", "imagen profesional"],
    publishedAt: "2026-04-04",
    readMinutes: 6,
    body: `
Si sos founder, tu cara es tu marca. Literalmente. La gente decide si confía en tu negocio en gran parte por **cómo te percibe a vos personalmente**. Y esa percepción se forma en segundos, antes de escuchar tu pitch.

## El falso dilema "profesional vs auténtica"

Muchas emprendedoras me dicen: "Pero si me visto muy formal, dejo de ser yo". Y a la vez: "Si me visto como siempre, no me toman en serio".

La salida NO es elegir uno. Es **encontrar tu versión profesional auténtica**: ropa que te represente Y comunique autoridad.

## 4 piezas claves para una founder

### 1. Blazer estructurado en tu paleta
Olvidate del blazer negro genérico. Buscá un blazer **en tu color insignia** (el que la gente empezará a asociar contigo). Vino, camel, gris perla, verde oliva. Estructura + identidad.

### 2. Pieza icónica recurrente
¿Aros grandes? ¿Anillo statement? ¿Cinturón? Elegí UNA pieza que uses casi siempre. Convertila en parte de tu identidad visual. Anna Wintour = bob. Steve Jobs = cuello alto negro.

### 3. Zapato cómodo + presentable
Vas a estar 12 horas de pie en eventos. El zapato no es lugar para experimentar. Invertí en uno o dos pares cómodos y elegantes y rotalos.

### 4. Outfit "comodín" listo para emergencias
Ese outfit que sabés que te queda perfecto siempre, para los días que tenés que decidir rápido (reunión inesperada, entrevista, pitch). Tenelo planchado y armado.

## Lo que NO necesitás

- ❌ Cambiar tu personalidad
- ❌ Vestirte como tu "competencia masculina"
- ❌ Comprar de marca para legitimarte
- ❌ Maquillaje pesado si no sos de eso

## El test de la sala de juntas

Imaginate que entrás a una sala con 10 inversores. ¿Tu outfit te hace sentir poderosa **siendo vos**? Si la respuesta requiere disfrazarte, no es tu outfit.

## Mi experiencia con +200 mujeres

He trabajado con founders, CEOs, líderes de comunidades en México y Estados Unidos. El patrón es claro: **las que conectan más profundo con su audiencia son las que se atreven a verse como son, no como la industria espera que sean**.

Si querés trabajar tu imagen como herramienta estratégica de tu negocio, hablemos.
    `.trim(),
  },
  {
    slug: "metodo-mvma-mi-version-mas-autentica",
    title: "Qué es MVMA — Mi Versión Más Auténtica: el método explicado",
    description: "Detrás del nombre MVMA hay un método integral. Te explico las fases, qué incluye, por qué funciona y para quién está pensado.",
    category: "MVMA",
    keywords: ["MVMA", "mi versión más auténtica", "método sarahi haro", "programa mujeres"],
    publishedAt: "2026-03-28",
    readMinutes: 7,
    body: `
**MVMA** son las siglas de **Mi Versión Más Auténtica**. Es el método que diseñé después de 5 años trabajando con mujeres y darme cuenta de que el problema no era de imagen, ni de mentalidad, ni de comunicación por separado. **Era la falta de coherencia entre los tres**.

## Por qué nació MVMA

En mis primeros años como asesora de imagen, hacía lo que hace todo el mundo: análisis de colorimetría, biotipo, asesoría de closet, personal shopping. Las mujeres salían con un guardarropa hermoso. Pero a los 6 meses muchas volvían diciendo: **"vuelvo a sentir que esto no soy yo"**.

Ahí entendí que la imagen externa sin trabajo interno es una fachada. Y la fachada se cae.

## Las 3 dimensiones de MVMA

### 1. Dimensión Imagen
- Colorimetría personal
- Biotipo y proporciones
- Estilismo personal (no copiar tendencias, descubrir tu estilo)
- Edición de closet con criterios propios
- Personal shopping con paleta

### 2. Dimensión Mentalidad
- Identificar las versiones de vos que ya no te representan
- Trabajar las creencias que limitan tu marca personal
- Definir tu identidad presente y futura
- Acompañamiento de coach de vida

### 3. Dimensión Marca Personal
- Posicionamiento auténtico (no genérico)
- Coherencia entre fondo (quién sos) y forma (cómo te mostrás)
- Estrategia de comunicación en redes y vida profesional
- Construcción de comunidad alrededor de tu mensaje

## A quién acompaña MVMA

- Mujeres emprendedoras y founders
- Profesionales en transición de etapa
- Speakers y figuras públicas
- Mujeres que sienten que perdieron contacto con quiénes son

NO es para alguien que solo quiere ropa nueva. Es para alguien dispuesta a **un proceso de transformación integral**.

## Modalidades

- **MVMA Tribe (comunidad)**: 2 clases mensuales en vivo + comunidad de mujeres en proceso similar
- **MVMA 1:1 (mentoría individual)**: programa intensivo personalizado
- **Talleres y workshops corporativos**: para empresas que quieren acompañar a sus líderes mujeres

## Lo que dicen las mujeres del programa

Más de 200 mujeres han pasado por algún formato de MVMA en México y Estados Unidos. Lo común en todos los testimonios: **"volví a sentirme yo"**.

De ahí también nace el título de mi libro: *Volver a mí y no irme nunca más*.
    `.trim(),
  },
  {
    slug: "errores-imagen-mujeres-40",
    title: "Los 5 errores de imagen que te envejecen 10 años (y cómo arreglarlos)",
    description: "No es la edad lo que te suma años, son ciertas decisiones de imagen que estás tomando sin darte cuenta. Te muestro los más comunes.",
    category: "Asesoría de Imagen",
    keywords: ["errores imagen", "verse joven", "imagen mujer 40", "asesoría rejuvenecer"],
    publishedAt: "2026-03-21",
    readMinutes: 5,
    body: `
La edad no es el problema. **Hay mujeres de 60 que parecen de 45 y mujeres de 30 que parecen de 50** — y en la mayoría de los casos la diferencia no está en la genética sino en 5 decisiones específicas de imagen.

## Error 1: Estampados anticuados

Florecitas pequeñas, encajes coquetos en exceso, prints "vintage" sin ironía: comunican una época. Solución: prints geométricos modernos, monocromáticos o estampados grandes y arquitectónicos.

## Error 2: Maquillaje pesado en zona de ojos

Más maquillaje NO disimula la edad, la **revela**. Las texturas pesadas se meten en las líneas de expresión y las acentúan. Solución: bases más livianas (skin tints, BB creams), maquillaje de ojos en tonos satinados pero NO con purpurinas.

## Error 3: Cabello sin movimiento

Un corte muy plano, sin capas, hace que el rostro se vea pesado. Solución: hablalo con un buen estilista — capas estratégicas alrededor del rostro, **largo a la altura correcta para tu óvalo facial**, y movimiento.

## Error 4: Ropa demasiado holgada o demasiado pegada

Querer "tapar" todo con ropa enorme o, al revés, "demostrar" con ropa muy ajustada: ambos extremos te suman años. Solución: **estructura con caída**. Pantalón de tiro alto con caída fluida, blazer estructurado pero con tela que se mueva.

## Error 5: No invertir en tu marca personal visual

Esta es la más sutil: usar lo mismo de hace 10 años porque "siempre te gustó". Tu cuerpo, tu cara y tu vida cambiaron. **Tu imagen también debe evolucionar contigo**.

## El secreto que las revistas no te cuentan

Las mujeres que se ven jóvenes a cualquier edad **no usan trucos**. Trabajaron su imagen como una construcción consciente: paleta personal, cortes que les favorecen ahora (no hace 10 años), edición de closet anual.

## Por dónde empezar

1. Hacé una foto frontal con luz natural sin maquillaje
2. Compará con una foto tuya de hace 5 años
3. Identificá: ¿qué cambió en tu rostro? ¿Tu imagen actual lo respeta?

Si la respuesta es no, es momento de actualizar — no de empezar de cero, de **acomodar a tu versión actual**.
    `.trim(),
  },
  {
    slug: "mentalidad-mujer-empoderada-vs-fake",
    title: "Mentalidad de mujer empoderada: cómo distinguirla del 'empoderamiento fake' de Instagram",
    description: "Instagram está lleno de empoderamiento de superficie. Te muestro la diferencia entre el discurso y la práctica real del trabajo interior.",
    category: "Mentalidad",
    keywords: ["empoderamiento femenino", "mentalidad mujer", "autoestima real", "mujer empoderada"],
    publishedAt: "2026-03-14",
    readMinutes: 6,
    body: `
"Empoderamiento" se convirtió en una palabra hueca. Camisetas, frases motivacionales, hashtags. Pero el empoderamiento real **no se ve, se siente** — primero en vos misma, después se nota afuera.

## Los 3 síntomas del empoderamiento fake

### 1. Performance de fortaleza
Postear "soy una guerrera" mientras por dentro estás colapsada. El empoderamiento real **incluye permitirte ser frágil cuando lo sos**, no negarlo.

### 2. Comparación constante disfrazada de inspiración
Seguir a 50 "mujeres empoderadas" y sentirte peor cada vez. Si la "inspiración" te deja vacía, no es inspiración — es comparación con extra pasos.

### 3. Dependencia del aplauso
"Empoderada" porque te validan en redes. El día que las métricas bajan, ¿seguís sintiéndote así? Si no, el empoderamiento era externo.

## Los 5 marcadores del empoderamiento real

1. **Decisiones desde el deseo, no desde el miedo.** Aceptás trabajos, parejas, oportunidades porque las querés, no para llenar un vacío.
2. **Capacidad de decir "no" sin culpa.** El sí es valioso porque el no es posible.
3. **Independencia económica O conciencia económica.** Sabés exactamente cómo se mueve el dinero en tu vida.
4. **Cuerpo en paz con vos.** No tiene que ser amor extremo todos los días — pero sí ausencia de guerra constante.
5. **Comunidad real, no transaccional.** Tenés mujeres en tu vida con quienes podés ser vos sin filtros.

## El trabajo interno que pocas hacen

El empoderamiento real requiere terapia o coaching profesional, lectura, meditación, soledad voluntaria, escritura. No requiere comprar nada.

## Por qué la imagen sí entra acá

A veces parece contradictorio que yo, asesora de imagen, hable de trabajo interno. Pero **la imagen externa es un termómetro de la coherencia interna**. Cuando una mujer está en paz consigo misma, su imagen lo refleja sin esfuerzo. Cuando no, ninguna ropa lo disimula.

En MVMA trabajamos las 3 capas a la vez: imagen, mentalidad, marca personal. Porque cualquiera de las 3 sola es incompleta.
    `.trim(),
  },
  {
    slug: "por-que-no-tienes-estilo-personal",
    title: "Por qué sientes que no tienes estilo personal (y no es lo que crees)",
    description: "Si llevas años sintiéndote disfrazada con tu ropa, el problema casi nunca es la ropa. Es algo más profundo. Te lo explico.",
    category: "Asesoría de Imagen",
    keywords: ["estilo personal", "no tengo estilo", "identidad visual mujer", "ropa que me representa"],
    publishedAt: "2026-03-07",
    readMinutes: 5,
    body: `
"Yo no tengo estilo." Esta es probablemente la frase que más escucho en mi consultorio. Y casi siempre es mentira.

## La verdad sobre tu estilo

**Todas las mujeres tenemos estilo.** Lo que no tenemos, muchas veces, es:
- Permiso interno para vestirnos como somos
- Claridad sobre quiénes somos en este momento de nuestra vida
- Coherencia entre lo que sentimos y lo que mostramos

El estilo personal no se "descubre" probándote ropa. Se revela cuando te das permiso de ser tú.

## Por qué te sientes disfrazada con tu propia ropa

Si llevas años abriendo tu clóset y sintiendo que "nada te queda bien" aunque hayas comprado mucho — el problema no es tu cuerpo, ni la ropa, ni la tienda. El problema es que estás comprando para una versión de ti que ya no eres.

Tal vez te vestías para la mujer que tu madre quería que fueras. Para la imagen que tu pareja esperaba. Para encajar en el trabajo. Para no llamar la atención. Para llamar la atención de quien no debía.

**Antes del estilo va la identidad.** Cuando tu identidad está clara, la ropa empieza a tener sentido.

## La trampa de copiar referentes

Otra cosa que veo todos los días: mujeres que admiran a una referente y empiezan a vestirse como ella. Resultado: se sienten disfrazadas.

Si tu referente es Sofía Vergara y tú eres minimalista por dentro, copiar sus outfits te va a hacer sentir actuando. Lo que te inspira no es lo mismo que lo que te representa.

## Lo que sí funciona

Trabajar tu estilo personal **requiere primero trabajar tu identidad presente**. Quién eres hoy, qué quieres comunicar, en qué etapa de tu vida estás.

Después de eso vienen las herramientas: paleta, biotipo, siluetas, arquetipos. Pero antes va el trabajo interno.

## Cómo lo abordamos en mis asesorías

En mi **Asesoría de Imagen Intermedia** ($5,000 MXN) integro las dos cosas:
- 1 sesión de coaching de mentalidad para trabajar tu identidad presente
- Sesiones de imagen para revelar tu estilo desde esa identidad

No vendo "encontrar tu estilo" como si fuera un test. Vendo el proceso completo de regresar a ti.

[Conoce mis servicios personalizados →](/servicios)
    `.trim(),
  },
  {
    slug: "que-es-ser-personal-shopper",
    title: "Qué es ser personal shopper y por qué cada vez más mujeres contratan una",
    description: "El servicio que más crece en la industria de la moda. Te explico exactamente qué hace un personal shopper y cómo te puede cambiar la relación con tu closet.",
    category: "Asesoría de Imagen",
    keywords: ["personal shopper", "qué hace personal shopper", "contratar personal shopper"],
    publishedAt: "2026-02-28",
    readMinutes: 5,
    body: `
Hace 10 años la idea de contratar una personal shopper sonaba a lujo de celebridad. Hoy es uno de los servicios más demandados por mujeres profesionales — y no por estatus, **por practicidad pura**.

## Qué hace exactamente una personal shopper

Una personal shopper es una profesional capacitada que **investiga, selecciona y/o compra ropa por vos**, según un brief específico de tus necesidades, tu paleta, tu biotipo y tu presupuesto.

Puede trabajar en distintos formatos:

- **Acompañamiento presencial**: van juntas al shopping, ella elige opciones y vos te las probás
- **Cuentas armadas online**: te manda links de productos pre-seleccionados que solo tenés que comprar
- **Compra cerrada**: ella compra todo y te lo entrega listo
- **Edición de closet**: viene a tu casa y reorganiza/edita lo que ya tenés antes de comprar nada nuevo

## Quiénes la contratan

- Mujeres con poco tiempo (ejecutivas, founders, madres)
- Mujeres en cambio de etapa (post-embarazo, divorcio, jubilación, ascenso laboral)
- Mujeres que viajan mucho y necesitan optimizar maleta
- Mujeres que detectan que compran de más sin lograr armar outfits

## Cuánto cuesta y vale la pena

El servicio promedio en Latinoamérica va de 200 a 800 USD por sesión completa. Parece caro, pero el cálculo real:
- Una mujer promedio gasta **3,000-8,000 USD anuales** en ropa que no usa
- Un personal shopper te ayuda a reducir ese gasto entre 50-70%
- Y te devuelve **15-25 horas anuales** que ibas a gastar dando vueltas en tiendas

ROI claro.

## La diferencia con TikTok / Instagram

Las recomendaciones de creadoras de contenido están armadas para una audiencia genérica. Una personal shopper **trabaja para vos**: tu cuerpo, tus colores, tu vida, tu presupuesto. La personalización es el valor.

## Mi enfoque integrado

En mi práctica, el personal shopping nunca va solo. Va después de una asesoría de imagen completa — porque si no sabemos qué te favorece, te queda y te representa, comprar es disparar al aire.

Es por eso que en MVMA integro asesoría + personal shopping + edición de closet como un proceso único.
    `.trim(),
  },
  {
    slug: "comunidad-femenina-mvma-tribe",
    title: "Por qué toda mujer necesita una comunidad femenina real (no solo seguidoras en redes)",
    description: "La diferencia entre tener audiencia y tener comunidad. Por qué MVMA Tribe existe y qué cambia cuando una mujer encuentra su grupo.",
    category: "MVMA",
    keywords: ["comunidad femenina", "MVMA tribe", "grupo mujeres", "círculo apoyo"],
    publishedAt: "2026-02-21",
    readMinutes: 5,
    body: `
Tenemos miles de seguidoras y nos sentimos solas. Esta es la paradoja más cruel de nuestra era. **La conexión digital nunca reemplaza la comunidad real**.

## Audiencia vs Comunidad

- **Audiencia**: te consume, te aplaude, espera contenido de vos
- **Comunidad**: te conoce, te apoya, crece con vos

La audiencia es transaccional. La comunidad es relacional. Ambas son válidas, pero **solo la segunda sostiene**.

## Por qué las mujeres necesitamos comunidad femenina

No es discurso de género. Es biología, sociología y experiencia:

1. **Procesamos en grupo**: las mujeres tendemos a entender nuestras experiencias contándolas a otras mujeres
2. **El liderazgo femenino se construye en red**, no en aislamiento (a diferencia del modelo masculino tradicional)
3. **Las crisis vitales necesitan testigas**: maternidad, divorcios, cambios de carrera, duelos
4. **El crecimiento se acelera cuando otras lo modelan**: ver a otras hacerlo nos da permiso de hacerlo

## La trampa de la "mujer independiente"

Hubo una generación que creyó que ser fuerte = no necesitar a nadie. Esa generación está hoy en terapia. **Necesitar es humano**. Pedir es valentía. Recibir es entrenamiento.

## Qué es MVMA Tribe

Es la comunidad femenina que creé para las mujeres que están haciendo el trabajo de regresar a su versión más auténtica. NO es un curso. NO es un seguimiento masivo. Es:

- **2 clases mensuales en vivo** conmigo (imagen, marca personal, mentalidad — depende del tema del mes)
- **Comunidad cerrada** de mujeres en procesos similares
- **Espacio para preguntas reales** sin filtros
- **Contenido exclusivo** complementario

## Para quién es

Para mujeres que:
- Sienten que necesitan otras mujeres alrededor que entiendan su camino
- Quieren acompañamiento sostenido en el tiempo (no un curso aislado)
- Están dispuestas a comprometerse con su propio proceso
- Disfrutan aprender en comunidad más que en soledad

## Lo que NO es

- No es un grupo de chisme
- No es un espacio para "performar éxito"
- No es networking transaccional
- No es exclusivo de mujeres "ya empoderadas" — al contrario, es para las que están en el camino

Si te resuena, los detalles están en la página de la comunidad.
    `.trim(),
  },
  {
    slug: "imagen-zoom-llamadas-trabajo",
    title: "Imagen para Zoom: cómo verte profesional en llamadas de trabajo sin maquillarte",
    description: "Los detalles que pocas mujeres consideran al armar su set de home office. Iluminación, colores, encuadre y outfit para destacar en cualquier llamada.",
    category: "Marca Personal",
    keywords: ["imagen zoom", "verse bien videollamada", "home office mujer", "outfit virtual"],
    publishedAt: "2026-02-14",
    readMinutes: 5,
    body: `
Trabajamos desde casa y nuestra cara aparece en mil llamadas semanales. La imagen virtual **es tu imagen profesional**. Y se trabaja distinto a la imagen presencial.

## Iluminación: el factor número 1

Más importante que tu outfit o tu maquillaje. Una mujer linda con luz de techo amarilla se ve cansada. Una mujer en pijama con luz natural frontal se ve fresca.

**Reglas:**
- Luz frontal, NUNCA cenital (de arriba) o lateral fuerte
- Idealmente natural (cerca de una ventana, mirando hacia ella)
- Si es artificial: ring light o panel LED con temperatura neutra (5000-5500K)
- Evitar luz contraluz (ventana detrás de vos)

## Fondo: tu marca personal silenciosa

- ❌ Fondos virtuales borrosos: comunican "no me preparé"
- ❌ Cama o cocina visible: pierde profesionalismo
- ✅ Pared neutra con 1-2 objetos personales (planta, cuadro, libros)
- ✅ Fondo controlado en tu paleta de colores

## Outfit: solo lo que se ve cuenta

Esto es práctico: en Zoom solo se ve tu torso. Pero **el outfit completo cambia tu energía**. Si estás en short de pijama abajo, lo proyectás. Si estás vestida entera, también.

Mi regla: **siempre con zapatos puestos, aunque nadie los vea**. Activa modo trabajo.

## Colores que SÍ y NO en cámara

- ✅ **Tonos joya** (esmeralda, vino, mostaza, zafiro) — vibrantes, te destacan
- ✅ **Neutros cálidos** (camel, hueso, gris perla) — elegantes
- ❌ **Blanco puro** (te quema)
- ❌ **Negro absoluto** (te apaga)
- ❌ **Estampados pequeños** (efecto moiré)

## Maquillaje: menos es más

En cámara la piel se aplana. Necesitás:
- Base hidratante (no mate)
- Un poco de **blush** en la mejilla superior (te da vitalidad)
- Cejas definidas (enmarcan tu rostro en cuadro pequeño)
- Labial en tono natural-vibrante

Para mujeres que no se maquillan: blush + balm con color = suficiente.

## Encuadre

- Cámara a la altura de los ojos (NUNCA mirando hacia abajo)
- Tu rostro ocupando el tercio superior
- Espacio sobre tu cabeza (no demasiado)

## Detalles que destacan

- Un par de aretes statement (no demasiado brillantes)
- Una pieza icónica recurrente (que te identifique cliente tras cliente)
- Pelo prolijo (aunque sea recogido)

Tu Zoom es tu vitrina profesional. Trabajála como tal.
    `.trim(),
  },
  {
    slug: "como-vestir-conferencia-keynote-mujer",
    title: "Cómo vestirte para dar una conferencia o keynote (lección de speaker)",
    description: "Como speaker en México y Estados Unidos, aprendí qué funciona en el escenario. Te comparto los aciertos y los errores que pagué caro.",
    category: "Marca Personal",
    keywords: ["outfit conferencia mujer", "speaker keynote", "vestido escenario", "imagen ponente"],
    publishedAt: "2026-02-07",
    readMinutes: 6,
    body: `
Como speaker en México y Estados Unidos, he probado de todo en escenario. Algunas decisiones de imagen me potenciaron. Otras me restaron autoridad. Comparto lo aprendido.

## El escenario es brutal con la imagen

A diferencia de Zoom o una reunión, en escenario la audiencia está LEJOS y la luz es ARTIFICIAL y FUERTE. Eso cambia todo:

- Los detalles pequeños desaparecen
- Los colores se aplanan
- La silueta es lo único que se lee a 20 metros
- El contraste con el fondo del escenario importa muchísimo

## Las 5 reglas que aprendí

### 1. Silueta antes que detalle
Olvidate de los bordados delicados o las texturas sutiles. Buscá **una silueta poderosa**: blazer estructurado, vestido fluido con cinturón, pantalón sastre + camisa de buen corte.

### 2. Color saturado SIEMPRE
Negro entero te hace desaparecer en escenarios oscuros. Beige te hace desaparecer en escenarios blancos. Necesitás **un color saturado de tu paleta**: vino, esmeralda, mostaza, rojo profundo, royal blue.

### 3. NUNCA shoes nuevos
Sí, parece obvio. La cantidad de speakers que vi caminar incómodas porque estrenaron zapatos para "la foto" es infinita. Los zapatos deben estar usados, cómodos, y haber sido probados en escenarios similares.

### 4. Cero distracciones en cuello y muñecas
Aretes pequeños o estructurados. Collar opcional pero no colgante (rebota luz). Pulseras que no suenen al gesticular (los micrófonos lo amplifican).

### 5. Outfit que no necesite ajustes
En escenario no podés acomodarte la falda, el escote, el blazer. Probá el outfit **caminando, gesticulando, sentándote, levantándote** antes del evento. Si se mueve, descártalo.

## Lo que SÍ funciona en escenario

- **Jumpsuit estructurado** (no tenés que cuidar falda + blusa)
- **Vestido midi con caída + cinturón** (silueta poderosa)
- **Pantalón sastre + camisa de seda + blazer abierto** (versátil, autoridad)
- **Vestido tipo blazer largo + botas/zapatos color a tono**

## Lo que NO funciona

- Faldas cortas (te limita los movimientos, te preocupás)
- Escotes muy abiertos (en bajada de luz quedan agresivos)
- Maxi vestidos sueltos sin estructura (te aplanan)
- Colores neutros si el escenario es neutro

## El backstage también es imagen

Las fotos de detrás de cámaras también circulan. **Te ven antes y después del escenario**. No cambies a sweat pants en cuanto bajes — quedan capturas que después aparecen.

## Lo más importante: comodidad

Si no estás cómoda con tu outfit, tu cuerpo lo proyecta. Si estás cómoda y vos te ves poderosa, tu energía es imparable. **El mejor outfit es el que te hace olvidar tu outfit**.
    `.trim(),
  },
  {
    slug: "tu-closet-y-tu-relacion-contigo-misma",
    title: "Tu closet refleja tu relación contigo misma (lo veo todos los días)",
    description: "Mostrame tu closet y te digo cómo te tratas. La forma en que organizas y eliges tu ropa es un espejo emocional. Te lo explico.",
    category: "Mentalidad",
    keywords: ["closet emocional", "imagen y autoestima", "relación con la ropa", "psicología del vestir"],
    publishedAt: "2026-01-31",
    readMinutes: 5,
    body: `
Llevo años entrando a clósets de mujeres muy distintas — emprendedoras exitosas, mamás profesionales, líderes corporativas. Y descubrí algo que casi nunca se habla: **tu clóset es una radiografía emocional**.

## Lo que tu clóset cuenta de ti

### Si está lleno pero "no tienes nada que ponerte"
Probablemente estás comprando para llenar un vacío. Cada prenda nueva es una promesa de "esta vez sí me voy a sentir bien" — y nunca llega.

### Si guardas ropa que ya no te queda "por si bajas de peso"
Estás castigándote con tu cuerpo presente. Le estás diciendo a tu mente: "no mereces vestirte bien hasta que cambies".

### Si tienes muchas prendas con etiqueta
No te has dado permiso de usar lo bonito. Estás esperando "una ocasión especial" que nunca llega.

### Si tu clóset es caótico y desordenado
Tu vida interna probablemente también lo es. El orden externo refleja claridad interna.

### Si solo usas el 20% de lo que tienes
El 80% restante es ruido. Y ese ruido te agota cada mañana cuando abres el clóset y no encuentras "nada".

## La verdad incómoda

Editar un clóset no es una tarea de organización. **Es un acto de reconciliación contigo misma.**

Cada prenda que sueltas es una versión de ti que ya no eres. Cada prenda que conservas es una declaración: "esto sí soy yo."

## Por qué pocas mujeres lo logran solas

Porque editar el clóset solitario es emocional. Te encuentras con:
- La culpa de "haberte gastado dinero en eso"
- La nostalgia de la mujer que fuiste
- El miedo de "y si después me arrepiento"
- Las opiniones de tu mamá, hermana o pareja en tu cabeza

Necesitas a alguien que te acompañe sin juicio. Que te ayude a tomar decisiones desde tu hoy, no desde tu ayer ni desde lo que opinan los demás.

## Cómo lo abordo conmigo

El **detox de clóset** es parte de mi **Asesoría de Imagen Avanzada** ($10,000 MXN). No es solo "tirar ropa vieja". Es:

- Acompañamiento emocional durante la edición
- Decisión consciente prenda por prenda
- Reorganización funcional según tu estilo personal
- Plan de compras priorizado para llenar los huecos reales

Las mujeres que han pasado por este proceso me dicen lo mismo: **"siento que abrí mi clóset por primera vez."**

[Conoce el proceso completo →](/servicios)
    `.trim(),
  },
  {
    slug: "creencias-que-sabotean-tu-imagen",
    title: "Las creencias inconscientes que sabotean tu imagen (y nadie te dijo)",
    description: "Hay creencias que arrastrás desde la infancia que hoy están limitando cómo te vestís y cómo te mostrás. Te ayudo a identificarlas.",
    category: "Mentalidad",
    keywords: ["creencias limitantes imagen", "autoboicot mujer", "mentalidad imagen", "mejorar autoestima"],
    publishedAt: "2026-01-24",
    readMinutes: 7,
    body: `
"No me queda bien", "no tengo cuerpo para eso", "soy demasiado mayor", "no soy de las que se arregla", "qué van a decir si me visto así". Estas frases NO son hechos. Son **creencias** — y la mayoría las heredaste sin darte cuenta.

## De dónde vienen estas creencias

- **Familia de origen**: lo que tu mamá, tías o abuelas decían sobre cuerpo, ropa, "lugar de la mujer"
- **Bullying o comentarios en adolescencia**: una frase de una compañera puede instalarse 30 años
- **Cultura general**: ideales de belleza, "qué se ve bien", "qué es apropiado para mi edad"
- **Tu profesión**: si trabajás en un ambiente conservador puede haberte moldeado más de lo que crees

## Las 7 creencias más comunes que veo en MVMA

### 1. "Llamar la atención es vanidad"
Mostrarte tal como sos no es vanidad. Es presencia. La vanidad es performance externa vacía. La presencia es coherencia interna que se irradia.

### 2. "A mi edad ya no puedo vestirme así"
La edad NO dicta la ropa. Tu identidad sí. Hay mujeres de 65 que se ven jóvenes y vibrantes vestidas con piezas que otras consideran "demasiado para su edad". Y al revés: mujeres de 30 vestidas como si tuvieran 50 porque les dijeron "ya no estás para eso".

### 3. "No tengo cuerpo para eso"
**TODO cuerpo tiene cuerpo para todo** — el secreto está en la silueta, el corte y la proporción, no en negar lo que vestís.

### 4. "Soy demasiado intelectual para ocuparme de la imagen"
Tu marca personal te comunica antes de que abras la boca. Las mujeres más brillantes de la historia entendieron esto (de Cleopatra a Coco Chanel a Michelle Obama). Ocuparte de tu imagen NO te hace menos intelectual.

### 5. "Lo importante es lo de adentro"
SÍ. **Y** lo de afuera. No es uno O el otro. La imagen externa es **vehículo** de la identidad interna. Tener una sin la otra es disfuncional.

### 6. "Voy a esperar a estar más flaca para vestirme bien"
Esta es la más cruel. **El presente que estás esperando NUNCA llega**. Vestite como te merecés AHORA, con el cuerpo que tenés AHORA. Eso es respeto propio.

### 7. "Mi marido / pareja no aprueba"
Tu cuerpo, tu ropa, tu decisión. Punto.

## Cómo identificar las tuyas

1. Frente al espejo, ¿qué frase automática te aparece?
2. Si tuvieras 100% de libertad económica y social, ¿cómo te vestirías?
3. ¿Qué prenda nunca te animaste a comprar y por qué?
4. ¿De quién es esa voz que te limita?

## El trabajo del coaching dentro de MVMA

Por esto MVMA no es solo asesoría de imagen. Trabajamos **las creencias que sabotean la imagen** en paralelo. Sin desarmar la creencia, la nueva ropa no sirve — porque seguís siendo la mujer vieja en ropa nueva.

Empezar a notar las creencias es el primer paso. El segundo es decidir conscientemente cuál mantenés y cuál soltás.
    `.trim(),
  },
  {
    slug: "coach-marca-personal-femenina",
    title: "Qué hace un coach de marca personal femenina y cuándo conviene contratar uno",
    description: "Coach de marca personal NO es lo mismo que social media manager. Te explico qué hace, en qué se diferencia y cuándo sí o sí te conviene contratar una.",
    category: "Marca Personal",
    keywords: ["coach marca personal", "consultora branding mujer", "personal branding mujer"],
    publishedAt: "2026-01-17",
    readMinutes: 5,
    body: `
"Coach de marca personal", "consultora de branding", "estratega de comunicación", "personal brand coach": son términos que se mezclan. Te aclaro qué hace cada uno y cuándo SÍ te conviene contratar acompañamiento profesional.

## Lo que NO es un coach de marca personal

- **No es un social media manager**: no postea por vos, no edita reels
- **No es un community manager**: no responde tus mensajes
- **No es un publicista**: no hace publicidad pagada
- **No es un diseñador**: no diseña tu logo

## Lo que SÍ es

Es la profesional que **te ayuda a definir, articular y comunicar quién sos profesionalmente**, de manera que se traduzca en oportunidades reales: clientes, alianzas, oportunidades, posicionamiento.

Trabaja:

1. **Posicionamiento** (qué decís que hacés y para quién)
2. **Mensaje central** (qué problema resolvés y cómo)
3. **Voz y tono** (cómo te comunicás)
4. **Identidad visual** (NO el logo, sino la coherencia estética de tu marca personal)
5. **Estrategia de contenido y exposición** (qué decir, dónde, con qué objetivo)
6. **Coherencia entre marca personal y vida real** (que lo que mostrás sea sostenible)

## Cuándo conviene contratar uno

### Sí conviene si:
- Estás emprendiendo y necesitás clarificar tu posicionamiento
- Tenés un negocio que funciona pero sentís que tu marca personal no acompaña
- Estás en transición profesional y necesitás reposicionarte
- Tu cuenta crece pero no se traduce en clientes/oportunidades
- Sentís incoherencia entre quien sos y lo que mostrás

### No conviene si:
- Solo querés "que te ayuden a postear más"
- No estás dispuesta a hacer trabajo personal (no es solo táctica)
- Esperás resultados en 30 días

## Mi acercamiento como coach

Yo trabajo coaching de marca personal integrado con asesoría de imagen y trabajo de mentalidad. Porque mi convicción es que **las marcas personales más sostenibles son las que están integradas con la persona detrás**. Si solo construís fachada, se cae. Si construís coherencia, escala.

## Cómo es el proceso

Una mentoría MVMA 1:1 dura entre 3 y 6 meses. Empezamos con identidad (quién sos hoy, quién querés ser), pasamos por imagen (cómo se ve eso visualmente), y terminamos con marca personal (cómo se comunica al mundo).

No es para todas. Es para mujeres dispuestas a un proceso de transformación real — no un atajo.

Si te resuena, hablemos por la página de contacto.
    `.trim(),
  },
  {
    slug: "volver-a-mi-libro-sarahi-haro",
    title: "Por qué escribí 'Volver a mí y no irme nunca más' (la historia detrás del libro)",
    description: "El libro nació de un proceso personal y de cientos de conversaciones con mujeres. Te cuento por qué este título, qué encontrás dentro y a quién le sirve.",
    category: "MVMA",
    keywords: ["volver a mí libro", "sarahi haro libro", "libro mujeres empoderamiento"],
    publishedAt: "2026-01-10",
    readMinutes: 5,
    body: `
*Volver a mí y no irme nunca más* es mi primer libro. No nació planeado. Nació de una frase que escribí en mi diario un día cualquiera, después de una sesión con una clienta que me dijo: **"vuelvo a sentir que esto que tengo, ya no soy yo"**.

## La pregunta que me llevó al libro

Llevaba años escuchando esa frase, en distintas versiones, de mujeres distintas. Profesionales exitosas, madres, emprendedoras, jóvenes, mayores. Todas con la misma sensación: **se habían perdido en alguna versión de sí mismas que ya no las representaba**.

Y entonces me pregunté: ¿se puede *volver a una*?

## Lo que descubrí escribiendo

Que volver a una no es regresar al pasado. No es la versión de los 18 años. No es "antes de tener hijos" o "antes del divorcio". **Volver a una es retomar el contacto con tu núcleo identitario** — eso que siempre estuvo, aunque las capas externas lo hayan ido tapando.

Y que ese regreso no se hace solo. Se hace con herramientas, con preguntas, con acompañamiento, con comunidad.

## Qué hay dentro del libro

El libro está dividido en 3 partes que corresponden a las 3 dimensiones de mi trabajo:

### Parte 1: Volver a tu identidad
Capítulos sobre quién eras antes de las versiones que adoptaste para sobrevivir. Ejercicios de introspección. Preguntas que pocas te hacen.

### Parte 2: Volver a tu imagen
Cómo tu cuerpo, tu ropa y tu estética dejan de ser una performance y vuelven a ser una expresión coherente de quién sos.

### Parte 3: Volver a tu voz
Cómo comunicar al mundo a tu versión más auténtica sin tener miedo de perder lo que ya construiste.

## Para quién es este libro

- Para mujeres en transición de etapa (cualquier etapa)
- Para mujeres que sienten que se "perdieron" en algún momento
- Para mujeres con vidas exitosas externamente pero desconexión interna
- Para mujeres jóvenes que quieren empezar el camino más temprano
- Para mujeres en proceso de construir su marca personal con autenticidad

## Para quién NO es

- Para alguien buscando un manual de autoayuda fácil
- Para alguien que cree que "se vive una vez" sin profundidad
- Para alguien que no está dispuesta a leer preguntas incómodas

## Por qué este título

"Volver a mí" porque es lo más importante.
"Y no irme nunca más" porque el viaje no termina en el regreso — empieza en el compromiso de quedarme.

El libro se complementa con MVMA Tribe (la comunidad) y con el método MVMA en general. Pero también funciona solo.

Pronto te comparto los enlaces de compra. Mientras tanto, si querés que te avise cuando esté disponible, escribime por contacto.
    `.trim(),
  },
  {
    slug: "speaker-mujer-mexico-eeuu",
    title: "Cómo prepararte para ser speaker (lecciones de hablar en México y EEUU)",
    description: "Dar conferencias requiere mucho más que saber el tema. Te comparto lo que aprendí presentando ante audiencias femeninas en ambos países.",
    category: "Marca Personal",
    keywords: ["speaker mujer", "dar conferencia", "ponencia keynote", "habilidades oratoria"],
    publishedAt: "2026-01-03",
    readMinutes: 6,
    body: `
He dado conferencias y keynotes en México y Estados Unidos para audiencias femeninas: emprendedoras, founders, líderes de equipos. Cada audiencia es distinta, pero hay principios que se aplican siempre.

## Las 5 cosas que aprendí siendo speaker

### 1. La preparación es 80%, la presentación es 20%
Las charlas que parecen más naturales son las más preparadas. Memorizar NO es la meta — interiorizar el contenido al punto de poder improvisar variantes sí lo es.

### 2. Tu primera frase es todo
Tenés 8 segundos para enganchar a la audiencia. **No empieces con "buenos días, me llamo..."**. Empezá con una historia, una pregunta provocadora o un dato impactante.

Ejemplos:
- ❌ "Hola, soy Sarahi Haro, asesora de imagen..."
- ✅ "Hace 6 años trabajé con una mujer que me cambió la forma de entender mi profesión..."
- ✅ "¿Cuántas mujeres aquí sienten que la versión que muestran en redes ya no las representa?"

### 3. Tu cuerpo habla más que tus palabras
Postura abierta, manos visibles, movimientos pausados. **NUNCA atrás del podio si no es necesario** — te corta la conexión con la audiencia.

### 4. Conoce a tu audiencia antes de subir
Pregunta al organizador: edad promedio, profesión, qué problemas tienen, qué los trajo al evento. Tu charla genérica nunca va a impactar como una charla **calibrada para esa sala**.

### 5. El "después" es tan importante como la charla
Una buena charla sin estrategia de seguimiento es una oportunidad perdida. ¿Cómo te encuentran después? ¿Tenés algo que ofrecer? ¿Capturás contactos?

## Diferencias culturales que aprendí

### Audiencia mexicana
- Más conectada emocionalmente desde el inicio
- Aprecia humor y cercanía
- Espera contacto post-evento (foto, intercambio)
- Compra después de conexión personal

### Audiencia estadounidense (femenina latina)
- Más estructurada y orientada al "take-away"
- Aprecia data, estructura, claridad de pasos
- Pregunta más durante Q&A
- Decide compra después de evaluar ROI

## Errores que pagué caros

- **Outfit estrenado** (no podía caminar cómoda)
- **Charla genérica** para audiencia que necesitaba algo más específico
- **No comer antes** (te baja la energía a mitad de charla)
- **Aceptar mucho café** (te pone nerviosa)
- **No tener slides backup** (los proyectores fallan, créeme)

## Cómo se construye una agenda de speaker

1. Empezar con eventos pequeños / comunitarios gratis (rodaje)
2. Pedir testimonios y videos cortos de cada charla
3. Armar tu media kit con esos materiales
4. Pitch a eventos medianos
5. Eventualmente: eventos pagados, internacionales

Como speaker, tu marca personal en redes acompaña tu posicionamiento. **Si tu Instagram no comunica que sos speaker, los organizadores no te van a invitar como speaker**.

Si querés contratarme para una conferencia, escribime por la página de Conferencias.
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((p) => p.slug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return POSTS.slice(0, limit);
  return POSTS
    .filter((p) => p.slug !== currentSlug && p.category === current.category)
    .slice(0, limit);
}
