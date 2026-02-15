import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const path = location.pathname

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col">
      <nav className="border-b border-neutral-200 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="bg-neutral-900 text-white text-sm font-bold tracking-widest uppercase px-2.5 py-1.5 rounded">Kilo</span>
          </Link>
          <a
            href="https://github.com/markhv-dev/Kilo"
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden text-neutral-400 hover:text-neutral-900 transition-colors"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
          <div className="hidden sm:flex items-center gap-6">
            <Link
              to="/practice"
              className={`text-sm transition-colors ${
                path === '/practice'
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Practica
            </Link>
            <Link
              to="/words"
              className={`text-sm transition-colors ${
                path === '/words'
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Vocabulario
            </Link>
            <Link
              to="/mark"
              className={`text-sm transition-colors ${
                path.startsWith('/mark')
                  ? 'text-neutral-900 font-semibold'
                  : 'text-neutral-400 hover:text-neutral-900'
              }`}
            >
              Mark
            </Link>
            <a
              href="https://github.com/markhv-dev/Kilo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1 pb-24 sm:pb-0">
        {children}
      </main>

      <footer className="border-t border-neutral-200 hidden sm:block">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-neutral-400">
          <span>Kilo — MIT License</span>
          <span>Aprende ingles, palabra por palabra.</span>
        </div>
      </footer>

      {/* Mobile dock */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 sm:hidden">
        <div className="flex items-center gap-1 bg-neutral-900/90 backdrop-blur-lg rounded-2xl px-2 py-2 shadow-lg shadow-neutral-900/20">
          <Link
            to="/practice"
            className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-colors ${
              path === '/practice'
                ? 'bg-white/15 text-white'
                : 'text-neutral-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h4v11H3zM10 3h4v18h-4zM17 7h4v14h-4z" />
            </svg>
            <span className="text-[10px] font-medium">Practica</span>
          </Link>
          <Link
            to="/words"
            className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-colors ${
              path === '/words'
                ? 'bg-white/15 text-white'
                : 'text-neutral-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            <span className="text-[10px] font-medium">Palabras</span>
          </Link>
          <Link
            to="/mark"
            className={`flex flex-col items-center gap-0.5 px-5 py-2 rounded-xl transition-colors ${
              path.startsWith('/mark')
                ? 'bg-white/15 text-white'
                : 'text-neutral-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25M6.75 17.25L1.5 12l5.25-5.25M14.25 3.75l-4.5 16.5" />
            </svg>
            <span className="text-[10px] font-medium">Mark</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}
