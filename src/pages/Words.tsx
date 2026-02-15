import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../components/Layout'
import WordCard from '../components/WordCard'
import wordsData from '../data/words.json'
import { useSpeech } from '../hooks/useSpeech'
import type { Word } from '../types'

const words: Word[] = wordsData

const LEVELS = [
  { level: 0, label: 'Todas' },
  { level: 1, label: 'Nivel 1', range: '1–100' },
  { level: 2, label: 'Nivel 2', range: '101–200' },
  { level: 3, label: 'Nivel 3', range: '201–300' },
  { level: 4, label: 'Nivel 4', range: '301–400' },
  { level: 5, label: 'Nivel 5', range: '401–500' },
  { level: 6, label: 'Nivel 6', range: '501–600' },
  { level: 7, label: 'Nivel 7', range: '601–700' },
  { level: 8, label: 'Nivel 8', range: '701–800' },
  { level: 9, label: 'Nivel 9', range: '801–900' },
  { level: 10, label: 'Nivel 10', range: '901–1000' },
]

export default function Words() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialLevel = Number(searchParams.get('level')) || 0
  const [activeLevel, setActiveLevel] = useState(initialLevel)
  const [search, setSearch] = useState('')
  const { voiceGender, setVoiceGender, speak } = useSpeech()

  const filtered = useMemo(() => {
    let result = words
    if (activeLevel > 0) {
      result = result.filter((w) => w.level === activeLevel)
    }
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.meaning.toLowerCase().includes(q)
      )
    }
    return result
  }, [activeLevel, search])

  const handleLevelChange = (level: number) => {
    setActiveLevel(level)
    if (level > 0) {
      setSearchParams({ level: String(level) })
    } else {
      setSearchParams({})
    }
  }

  const currentLevelInfo = LEVELS.find((l) => l.level === activeLevel)

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">Vocabulario</h1>
            <p className="text-sm text-neutral-500">
              {activeLevel === 0
                ? `${words.length} palabras en total`
                : `Nivel ${activeLevel} — Palabras ${currentLevelInfo?.range}`}
            </p>
          </div>

          {/* Voice gender toggle */}
          {'speechSynthesis' in window && (
            <div className="flex items-center gap-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setVoiceGender('female')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  voiceGender === 'female'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Voz F
              </button>
              <button
                onClick={() => setVoiceGender('male')}
                className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                  voiceGender === 'male'
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Voz M
              </button>
            </div>
          )}
        </div>

        {/* Level tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0">
          {LEVELS.map((l) => {
            const count = l.level === 0
              ? words.length
              : words.filter((w) => w.level === l.level).length
            return (
              <button
                key={l.level}
                onClick={() => handleLevelChange(l.level)}
                className={`shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  activeLevel === l.level
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {l.label}
                <span className="ml-1.5 text-xs text-neutral-400">
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar palabra o significado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-neutral-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {search && (
            <p className="text-sm text-neutral-400 mt-2">
              {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
            </p>
          )}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((word) => (
            <WordCard key={word.rank} word={word} onSpeak={speak} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 mb-2">No se encontraron palabras.</p>
            <button
              onClick={() => { setSearch(''); handleLevelChange(0) }}
              className="text-sm text-neutral-500 underline underline-offset-2 hover:text-neutral-700 cursor-pointer"
            >
              Ver todas las palabras
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}
