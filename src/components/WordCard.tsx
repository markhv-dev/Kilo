import { useState } from 'react'
import type { Word } from '../types'

export default function WordCard({ word }: { word: Word }) {
  const [open, setOpen] = useState(false)

  return (
    <button
      onClick={() => setOpen(!open)}
      className="w-full text-left border border-neutral-200 rounded-lg p-5 hover:border-neutral-400 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-lg font-semibold group-hover:text-neutral-700 transition-colors">
          {word.word}
        </h3>
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
            <p className="text-sm text-neutral-600 bg-neutral-50 rounded px-3 py-2">
              <span className="text-neutral-400 text-xs mr-2">EJ</span>
              {word.example}
            </p>
          </div>
        </div>
      </div>

      <div className={`flex justify-center mt-2 transition-opacity duration-200 ${open ? 'opacity-0 h-0' : 'opacity-100'}`}>
        <svg
          className="w-4 h-4 text-neutral-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
  )
}
