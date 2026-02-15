import { useState, useEffect, useCallback } from 'react'

export function useSpeech() {
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female')
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (!('speechSynthesis' in window)) return
    const load = () => setVoices(speechSynthesis.getVoices())
    load()
    speechSynthesis.addEventListener('voiceschanged', load)
    return () => speechSynthesis.removeEventListener('voiceschanged', load)
  }, [])

  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    const english = voices.filter(v => v.lang.startsWith('en'))

    if (english.length > 0) {
      const preferred = english.find(v => {
        const n = v.name.toLowerCase()
        if (voiceGender === 'male') {
          return n.includes('male') || n.includes('david') || n.includes('james') || n.includes('daniel') || n.includes('guy')
        }
        return n.includes('female') || n.includes('zira') || n.includes('samantha') || n.includes('karen') || n.includes('google us english')
      })
      utterance.voice = preferred || english[0]
    }

    utterance.lang = 'en-US'
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }, [voices, voiceGender])

  return { voiceGender, setVoiceGender, speak }
}
