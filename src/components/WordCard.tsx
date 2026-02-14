import { useState } from 'react'
import type { Word } from '../types'

export default function WordCard({ word }: { word: Word }) {
  const [open, setOpen] = useState(false)
  const [gender, setGender] = useState<'male' | 'female'>('female')

  // Función para reproducir el sonido
  const speak = (e: React.MouseEvent, text: string) => {
    e.stopPropagation() // Evita que se abra/cierre la card al hacer clic aquí
    window.speechSynthesis.cancel() // Detiene audios previos
    
    const utterance = new SpeechSynthesisUtterance(text)
    const voices = window.speechSynthesis.getVoices()

    // Buscamos la mejor voz según el género elegido
    const selectedVoice = voices.find(v => {
      const name = v.name.toLowerCase()
      const isEnglish = v.lang.startsWith('en')
      if (gender === 'male') {
        return isEnglish && (name.includes('david') || name.includes('male') || name.includes('guy'))
      } else {
        return isEnglish && (name.includes('google us english') || name.includes('zira') || name.includes('female'))
      }
    })

    if (selectedVoice) utterance.voice = selectedVoice
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex flex-col gap-1">
      {/* Botones de género (Hombre / Mujer) */}
      <div className="flex justify-end gap-2 pr-1">
        <button 
          onClick={() => setGender('female')}
          className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${gender === 'female' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
        >
          Mujer
        </button>
        <button 
          onClick={() => setGender('male')}
          className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${gender === 'male' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
        >
          Hombre
        </button>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-all duration-200 cursor-pointer group"
      >
        <div className="flex items-baseline justify-between mb-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold group-hover:text-neutral-700 transition-colors">
              {word.word}
            </h3>
            {/* Icono de Play */}
            <span 
              onClick={(e) => speak(e, word.word)}
              className="text-neutral-300 hover:text-neutral-600 transition-colors p-1"
            >
              🔊
            </span>
          </div>
          <span className="text-[11px] text-neutral-300 font-mono tabular-nums">
            {word.rank}
          </span>
        </div>

        <p className="text-sm text-neutral-600">
          {word.meaning}
        </p>

        <div
          className={`grid transition-all duration-200 ${
            open ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="border-t border-neutral-100 pt-3 space-y-2">
              <p className="text-sm text-neutral-500">
                {word.explanation}
              </p>
              <div className="flex items-center justify-between text-sm text-neutral-600 bg-neutral-50 rounded px-3 py-2">
                <p>
                  <span className="text-neutral-400 text-xs mr-2">EJ</span>
                  {word.example}
                </p>
                <span 
                  onClick={(e) => speak(e, word.example)}
                  className="cursor-pointer opacity-50 hover:opacity-100"
                >
                  🔊
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`flex justify-center mt-2 transition-opacity duration-200 ${open ? 'opacity-0 h-0' : 'opacity-100'}`}>
          <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
    </div>
  )
}
