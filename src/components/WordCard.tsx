import { useState } from 'react'
import type { Word } from '../types'

interface Props {
  word: Word
  onSpeak?: (text: string) => void
}

export default function WordCard({ word, onSpeak }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold group-hover:text-neutral-700 transition-colors">
            {word.word}
          </h3>
          {onSpeak && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onSpeak(word.word) }}
              className="text-neutral-300 hover:text-neutral-600 transition-colors p-1 cursor-pointer"
              aria-label={`Escuchar "${word.word}"`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
              </svg>
            </button>
          )}
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
              {onSpeak && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onSpeak(word.example) }}
                  className="text-neutral-300 hover:text-neutral-600 transition-colors p-1 shrink-0 ml-2 cursor-pointer"
                  aria-label="Escuchar ejemplo"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M17.95 6.05a8 8 0 010 11.9M6.5 8.5H4a1 1 0 00-1 1v5a1 1 0 001 1h2.5l4.5 4V4.5l-4.5 4z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex justify-center mt-2 transition-opacity duration-200 ${open ? 'opacity-0 h-0' : 'opacity-100'}`}>
        <svg className="w-4 h-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
