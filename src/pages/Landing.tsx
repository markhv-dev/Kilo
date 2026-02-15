import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const LEVELS = [
  { level: 1, range: '1–100', label: 'Esenciales', desc: 'Articulos, pronombres, verbos basicos y conectores fundamentales.' },
  { level: 2, range: '101–200', label: 'Construccion', desc: 'Verbos de accion, adjetivos comunes y palabras para describir el mundo.' },
  { level: 3, range: '201–300', label: 'Expansion', desc: 'Vocabulario para expresar ideas, opiniones y situaciones cotidianas.' },
  { level: 4, range: '301–400', label: 'Precision', desc: 'Palabras que agregan detalle y matiz a tu comunicacion.' },
  { level: 5, range: '401–500', label: 'Fluidez', desc: 'El vocabulario que cierra la brecha hacia la comprension real.' },
  { level: 6, range: '501–600', label: 'Contexto', desc: 'Palabras para entender noticias, conversaciones y textos del dia a dia.' },
  { level: 7, range: '601–700', label: 'Expresion', desc: 'Vocabulario que te permite opinar, argumentar y describir con precision.' },
  { level: 8, range: '701–800', label: 'Profundidad', desc: 'Palabras menos frecuentes pero esenciales para textos mas complejos.' },
  { level: 9, range: '801–900', label: 'Dominio', desc: 'Vocabulario que marca la diferencia entre entender y entender de verdad.' },
  { level: 10, range: '901–1000', label: 'Maestria', desc: 'Las ultimas palabras para completar tu base de 1,000 y alcanzar el 80%.' },
]

export default function Landing() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div>
              <p className="text-sm font-medium text-neutral-400 mb-5 tracking-wide uppercase">
                Open Source
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6">
                1,000 palabras.
                <br />
                <span className="text-neutral-400">80% del ingles.</span>
              </h1>
              <p className="text-lg text-neutral-500 max-w-md mb-8 leading-relaxed">
                La ciencia dice que un grupo reducido de palabras cubre
                casi todo el ingles cotidiano. Kilo te las ensena sin
                gramatica, sin rodeos.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/practice"
                  className="inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Comenzar a practicar
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  to="/words"
                  className="inline-flex items-center gap-2 border border-neutral-300 text-neutral-700 px-6 py-3 text-sm font-medium rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                >
                  Ver vocabulario
                </Link>
              </div>
            </div>

            {/* Right: live preview card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-neutral-50 rounded-2xl -z-10" />
              <div className="space-y-3">
                {[
                  { rank: 1, word: 'the', meaning: 'el, la, los, las', example: 'The cat is on the table.' },
                  { rank: 47, word: 'get', meaning: 'obtener, conseguir', example: 'I need to get some milk.' },
                  { rank: 93, word: 'want', meaning: 'querer, desear', example: 'I want to learn English.' },
                ].map((w) => (
                  <div
                    key={w.rank}
                    className="bg-white border border-neutral-200 rounded-lg p-4 flex items-start justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-lg font-semibold">{w.word}</span>
                        <span className="text-xs text-neutral-300 font-mono">#{w.rank}</span>
                      </div>
                      <p className="text-sm text-neutral-600 mb-1.5">{w.meaning}</p>
                      <p className="text-sm text-neutral-400 italic">"{w.example}"</p>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                  <span className="text-xs text-neutral-400 ml-2">+ 997 palabras mas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-neutral-200 py-16">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-bold tabular-nums">1,000</p>
              <p className="text-sm text-neutral-500 mt-1">palabras disponibles</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold tabular-nums">10</p>
              <p className="text-sm text-neutral-500 mt-1">niveles progresivos</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-bold tabular-nums">80%</p>
              <p className="text-sm text-neutral-500 mt-1">del ingles cubierto</p>
            </div>
          </div>
        </section>

        {/* Levels */}
        <section className="border-t border-neutral-200 py-16">
          <h2 className="text-sm font-medium text-neutral-400 mb-8 tracking-wide uppercase">
            Niveles
          </h2>
          <div className="space-y-4">
            {LEVELS.map((l) => (
              <Link
                key={l.level}
                to={`/words?level=${l.level}`}
                className="flex items-start gap-4 p-4 rounded-lg border border-neutral-200 hover:border-neutral-400 transition-colors group"
              >
                <span className="text-2xl font-bold text-neutral-200 group-hover:text-neutral-400 transition-colors w-8 shrink-0">
                  {l.level}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <p className="font-semibold">{l.label}</p>
                    <span className="text-xs text-neutral-400 font-mono">
                      #{l.range}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">{l.desc}</p>
                </div>
                <svg
                  className="w-4 h-4 text-neutral-300 group-hover:text-neutral-500 mt-1 shrink-0 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-neutral-200 py-16">
          <h2 className="text-sm font-medium text-neutral-400 mb-8 tracking-wide uppercase">
            Como funciona
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            <div>
              <p className="font-semibold mb-2">Las palabras justas</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Empiezas con las 100 palabras mas frecuentes del ingles.
                Cada una con su significado, explicacion y un ejemplo real.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Progresion natural</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Avanzas por niveles de 100 palabras. Cada nivel construye
                sobre el anterior, acumulando comprension.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Sin distracciones</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Nada de gamificacion artificial ni lecciones de gramatica.
                Solo las palabras, su uso y la practica.
              </p>
            </div>
          </div>
        </section>

        {/* Why it works */}
        <section className="border-t border-neutral-200 py-16">
          <h2 className="text-sm font-medium text-neutral-400 mb-8 tracking-wide uppercase">
            Por que funciona
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <p className="font-semibold mb-2">Ley de Zipf</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                En cualquier idioma, un pequeno grupo de palabras cubre la
                mayor parte del uso. En ingles, las primeras 1,000 palabras
                representan el 80% de cualquier texto cotidiano.
              </p>
            </div>
            <div>
              <p className="font-semibold mb-2">Input Comprensible (Krashen)</p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Adquieres un idioma cuando entiendes mensajes, no cuando
                memorizas reglas. Cada palabra se presenta en contexto
                para que la adquisicion sea natural.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
