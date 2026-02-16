import { useState, useMemo, useEffect, useCallback } from 'react'
import Layout from '../components/Layout'
import wordsData from '../data/words.json'
import exercisesData from '../data/exercises.json' // IMPORTANTE: Asegúrate de que este archivo exista
import { useSpeech } from '../hooks/useSpeech'
import type { Word } from '../types'

const words: Word[] = wordsData
// Definimos el tipo para los ejercicios localmente si no está en types.ts
type Exercise = {
  id: string
  level: number
  english: string
  spanish: string
}

const exercises: Exercise[] = exercisesData as Exercise[]

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

export default function Practice() {
  // --- Estados Generales ---
  const [activeLevel, setActiveLevel] = useState(0)
  const { voiceGender, setVoiceGender, speak } = useSpeech()
  
  // 'cards' = Flashcards normales, 'stories' = Ejercicios de traducción
  const [mode, setMode] = useState<'cards' | 'stories'>('cards')

  // --- Lógica de Flashcards (Tu código original) ---
  const [revealed, setRevealed] = useState(false)
  const [seenIndices, setSeenIndices] = useState<Set<number>>(new Set())
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const pool = useMemo(() => {
    if (activeLevel === 0) return words
    return words.filter(w => w.level === activeLevel)
  }, [activeLevel])

  // Reset when level changes
  useEffect(() => {
    // Reset Flashcards
    if (pool.length > 0) {
      const first = Math.floor(Math.random() * pool.length)
      setCurrentIndex(first)
      setSeenIndices(new Set([first]))
      setRevealed(false)
    }
    // Al cambiar de nivel, volvemos al modo cartas por defecto
    setMode('cards')
    // Reset Stories
    setCurrentStoryIndex(0)
    setStoryInput('')
    setStoryFeedback(null)
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

  // --- Lógica de Historias/Ejercicios (NUEVO) ---
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [storyInput, setStoryInput] = useState('')
  const [storyFeedback, setStoryFeedback] = useState<'success' | 'error' | null>(null)

  // Filtramos las historias del nivel activo
  const storiesPool = useMemo(() => {
    if (activeLevel === 0) return [] // No mostrar historias en "Todas" para evitar mezclas raras, o puedes dejarlo
    return exercises.filter(e => e.level === activeLevel)
  }, [activeLevel])

  const currentStory = storiesPool[currentStoryIndex] || null

  // Función para normalizar texto (quitar puntos, comas, mayúsculas para comparar)
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim()
  }

  const checkTranslation = () => {
    if (!currentStory) return

    const userClean = normalizeText(storyInput)
    const answerClean = normalizeText(currentStory.spanish)

    if (userClean === answerClean) {
      setStoryFeedback('success')
      // Sonido de éxito opcional
    } else {
      setStoryFeedback('error')
    }
  }

  const nextStory = () => {
    if (currentStoryIndex < storiesPool.length - 1) {
      setCurrentStoryIndex(prev => prev + 1)
      setStoryInput('')
      setStoryFeedback(null)
    } else {
      // Loop o mensaje de fin
      alert("¡Has completado las historias de este nivel!")
      setCurrentStoryIndex(0)
      setStoryInput('')
      setStoryFeedback(null)
    }
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold mb-1">Practica</h1>
            <p className="text-sm text-neutral-500">
              {mode === 'cards' 
                ? `${seenIndices.size} de ${pool.length} palabras vistas`
                : `${currentStoryIndex + 1} de ${storiesPool.length} historias`
              }
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
                onClick={() => setActiveLevel(l.level)}
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

        {/* Selector de MODO (Palabras vs Historias) */}
        {activeLevel > 0 && storiesPool.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="bg-neutral-100 p-1 rounded-lg flex gap-1">
              <button
                onClick={() => setMode('cards')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  mode === 'cards' ? 'bg-white shadow text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Palabras (Flashcards)
              </button>
              <button
                onClick={() => setMode('stories')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  mode === 'stories' ? 'bg-white shadow text-neutral-900' : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                Historias (Traducción)
              </button>
            </div>
          </div>
        )}

        {/* --- CONTENIDO PRINCIPAL --- */}

        {/* MODO 1: FLASHCARDS (Tu código original) */}
        {mode === 'cards' && currentWord && (
          <div className="flex flex-col items-center">
            <div
              onClick={() => setRevealed(!revealed)}
              className="w-full max-w-lg h-72 sm:h-80 border border-neutral-200 rounded-xl p-6 sm:p-8 hover:border-neutral-400 transition-all duration-200 cursor-pointer relative overflow-hidden bg-white"
            >
              {/* Word area */}
              <div
                className={`absolute inset-x-6 sm:inset-x-8 transition-all duration-500 ease-out ${
                  revealed ? 'top-6 sm:top-8' : 'top-1/2 -translate-y-1/2'
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

              {/* Revealed content */}
              <div
                className={`absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 top-28 flex flex-col justify-center transition-all duration-500 ease-out ${
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
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hint */}
              <div
                className={`absolute inset-x-6 sm:inset-x-8 bottom-6 sm:bottom-8 text-center transition-all duration-300 ${
                  revealed ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <p className="text-xs text-neutral-300">Toca para revelar</p>
              </div>
            </div>

            <button
              onClick={pickRandom}
              className="mt-6 inline-flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Siguiente
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <p className="mt-4 text-xs text-neutral-300">
               {seenIndices.size} / {pool.length}
            </p>
          </div>
        )}

        {/* MODO 2: HISTORIAS (Nuevo) */}
        {mode === 'stories' && currentStory && (
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            
            {/* Cuadro 1: Inglés (Source) */}
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Ejercicio {currentStoryIndex + 1}
                </span>
                <button
                  onClick={() => speak(currentStory.english)}
                  className="text-neutral-400 hover:text-neutral-800 transition-colors"
                  title="Escuchar"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
                  </svg>
                </button>
              </div>
              <p className="text-lg sm:text-xl text-neutral-800 leading-relaxed font-medium">
                {currentStory.english}
              </p>
            </div>

            {/* Cuadro 2: Input Usuario */}
            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium text-neutral-600 ml-1">
                Traduce al español:
              </label>
              <textarea
                value={storyInput}
                onChange={(e) => setStoryInput(e.target.value)}
                rows={4}
                placeholder="Escribe tu traducción aquí..."
                disabled={storyFeedback !== null}
                className={`w-full p-4 rounded-xl border-2 text-lg focus:outline-none transition-colors resize-none ${
                  storyFeedback === null 
                    ? 'border-neutral-200 focus:border-neutral-900' 
                    : storyFeedback === 'success' 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-red-300 bg-red-50'
                }`}
              />
              
              {/* Feedback Message */}
              {storyFeedback === 'error' && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-100 text-sm">
                  <p className="font-bold mb-1">Respuesta correcta:</p>
                  <p>{currentStory.spanish}</p>
                </div>
              )}
               {storyFeedback === 'success' && (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg border border-green-100 text-sm font-medium">
                  ¡Correcto! Muy buena traducción.
                </div>
              )}
            </div>

            {/* Botones de Acción */}
            <div className="flex justify-end pt-2">
              {storyFeedback === null ? (
                <button
                  onClick={checkTranslation}
                  disabled={!storyInput.trim()}
                  className="bg-neutral-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Comprobar
                </button>
              ) : (
                <button
                  onClick={nextStory}
                  className="bg-neutral-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-neutral-800 transition-colors flex items-center gap-2"
                >
                  Siguiente Historia
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              )}
            </div>

          </div>
        )}

        {/* Estado vacío si no hay historias */}
        {mode === 'stories' && storiesPool.length === 0 && (
          <div className="text-center py-20 bg-neutral-50 rounded-xl border border-dashed border-neutral-300">
            <p className="text-neutral-500">No hay historias disponibles para este nivel todavía.</p>
          </div>
        )}

      </div>
    </Layout>
  )
}
