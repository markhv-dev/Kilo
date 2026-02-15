import { useState, useMemo, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import wordsData from '../data/mark-words.json'
import { useSpeech } from '../hooks/useSpeech'
import type { Word } from '../types'

const words: Word[] = wordsData

const LEVELS = [
  { level: 0, label: 'Todas' },
  { level: 1, label: 'Fundamentos', range: '1–30' },
  { level: 2, label: 'Tipos y Datos', range: '31–60' },
  { level: 3, label: 'OOP y Funciones', range: '61–90' },
  { level: 4, label: 'Asincronia', range: '91–120' },
  { level: 5, label: 'DevOps', range: '121–150' },
]

export default function MarkPractice() {
  const [activeLevel, setActiveLevel] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set())
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const { voiceGender, setVoiceGender, speak } = useSpeech()

  const pool = useMemo(() => {
    if (activeLevel === 0) return words
    return words.filter(w => w.level === activeLevel)
  }, [activeLevel])

  // Reset when level changes
  useEffect(() => {
    if (pool.length === 0) return
    const first = Math.floor(Math.random() * pool.length)
    setCurrentIndex(first)
    setSeenIndices(new Set([first]))
    setRevealed(false)
  }, [activeLevel, pool.length])

  const pickRandom = useCallback(() => {
    if (pool.length === 0) return

    setSeenIndices(prev => {
      let available = pool
        .map((_, i) => i)
        .filter(i => !prev.has(i))

      // All seen — reset, but avoid showing the same word again
      if (available.length === 0) {
        available = pool.map((_, i) => i).filter(i => i !== currentIndex)
        if (available.length === 0) available = [0]
        const idx = available[Math.floor(Math.random() * available.length)]
        setCurrentIndex(idx)
        setRevealed(false)
        return new Set([idx])
      }

      const idx = available[Math.floor(Math.random() * available.length)]
      setCurrentIndex(idx)
      setRevealed(false)
      return new Set(prev).add(idx)
    })
  }, [pool, currentIndex])

  const currentWord = pool[currentIndex] || null

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Mark — Practica</h1>
            <p className="text-sm text-neutral-500">
              {seenIndices.size} de {pool.length} palabras vistas
            </p>
            <Link
              to="/mark/words"
              className="text-xs text-neutral-400 hover:text-neutral-600 underline underline-offset-2 transition-colors"
            >
              Ver lista completa
            </Link>
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
        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0">
          {LEVELS.map((l) => {
            const count = l.level === 0
              ? words.length
              : words.filter((w) => w.level === l.level).length
            return (
              <button
                key={l.level}
                onClick={() => setActiveLevel(l.level)}
                className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
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

        {/* Flashcard */}
        {currentWord && (
          <div className="flex flex-col items-center">
            <div
              onClick={() => setRevealed(!revealed)}
              className="w-full max-w-lg h-80 border border-neutral-200 rounded-xl p-8 hover:border-neutral-400 transition-all duration-200 cursor-pointer relative overflow-hidden"
            >
              {/* Word area — centered when hidden, slides up when revealed */}
              <div
                className={`absolute inset-x-8 transition-all duration-500 ease-out ${
                  revealed ? 'top-8' : 'top-1/2 -translate-y-1/2'
                }`}
              >
                <div className="flex items-center justify-center gap-3">
                  <h2 className={`font-bold transition-all duration-500 ${revealed ? 'text-2xl' : 'text-4xl'}`}>
                    {currentWord.word}
                  </h2>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); speak(currentWord.word) }}
                    className="text-neutral-300 hover:text-neutral-600 transition-colors p-1 cursor-pointer"
                    aria-label={`Escuchar "${currentWord.word}"`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
                    </svg>
                  </button>
                </div>
                <p className={`text-center mt-1 font-mono tabular-nums transition-all duration-500 ${revealed ? 'text-[10px] text-neutral-300' : 'text-xs text-neutral-300'}`}>
                  #{currentWord.rank}
                </p>
              </div>

              {/* Revealed content — fades in from below */}
              <div
                className={`absolute inset-x-8 bottom-8 top-28 flex flex-col justify-center transition-all duration-500 ease-out ${
                  revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                <div className="border-t border-neutral-100 pt-4 space-y-3 text-center">
                  <p className="text-lg text-neutral-700 font-medium">
                    {currentWord.meaning}
                  </p>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {currentWord.explanation}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-neutral-600 bg-neutral-50 rounded px-4 py-3">
                    <p className="text-left">
                      <span className="text-neutral-400 text-xs mr-2">EJ</span>
                      {currentWord.example}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); speak(currentWord.example) }}
                      className="text-neutral-300 hover:text-neutral-600 transition-colors p-1 shrink-0 cursor-pointer"
                      aria-label="Escuchar ejemplo"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hint — fades out when revealed */}
              <div
                className={`absolute inset-x-8 bottom-8 text-center transition-all duration-300 ${
                  revealed ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <p className="text-xs text-neutral-300">Toca para revelar</p>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={pickRandom}
              className="mt-6 inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Siguiente
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            {/* Progress */}
            <p className="mt-4 text-xs text-neutral-300">
              {seenIndices.size} / {pool.length}
            </p>
          </div>
        )}
      </div>
    </Layout>
  )
}
