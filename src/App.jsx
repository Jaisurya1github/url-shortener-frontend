import { useState } from 'react'

export default function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleShorten = async () => {
    if (!longUrl.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch('https://linkshort-njru.onrender.com/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: longUrl })
      })
      const data = await res.json()
      setShortUrl(data.shortUrl)
    } catch (error) {
      console.error('Error shortening URL:', error)
    }
    setIsLoading(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleShorten()
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* GitHub Button */}
        <div className="absolute top-6 right-6">
          <a
            href="https://github.com/Jaisurya1github"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 008.18 10.95c.6.11.82-.26.82-.58v-2.04c-3.33.73-4.03-1.42-4.03-1.42a3.18 3.18 0 00-1.33-1.75c-1.09-.75.08-.74.08-.74a2.53 2.53 0 011.84 1.24 2.56 2.56 0 003.5 1 2.56 2.56 0 01.76-1.6c-2.66-.3-5.46-1.33-5.46-5.93a4.63 4.63 0 011.24-3.22 4.3 4.3 0 01.12-3.17s1-.32 3.3 1.23a11.4 11.4 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.17 4.63 4.63 0 011.24 3.22c0 4.61-2.8 5.62-5.47 5.92a2.88 2.88 0 01.82 2.23v3.3c0 .32.22.7.83.58A11.5 11.5 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
            </svg>
            GitHub
          </a>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">LinkShort</h1>
          </div>

          <div className="max-w-md mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Make Links Short
            </h2>
            <p className="text-lg text-slate-600">
              Transform long URLs into clean, shareable links that are easy to remember and share.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <div className="space-y-6">
              {/* Input */}
              <div className="space-y-3">
                <label htmlFor="url-input" className="block text-sm font-medium text-slate-700">
                  Enter your URL
                </label>
                <input
                  id="url-input"
                  type="text"
                  placeholder="https://example.com/very-long-url-that-needs-shortening"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Button */}
              <button
                onClick={handleShorten}
                disabled={!longUrl.trim() || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating short link...' : 'Shorten URL'}
              </button>
            </div>

            {/* Result */}
            {shortUrl && (
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-slate-700">Your short link is ready</span>
                  </div>
                  
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <a
                      href={shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-blue-600 hover:text-blue-700 font-medium break-all transition-colors"
                    >
                      {shortUrl}
                    </a>
                    
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-600">
                            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Copied
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-slate-500">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tech Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 mb-2">🔧 Built with:</p>
          <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-600">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">React</span>
            <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded-full">Tailwind CSS</span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Node.js</span>
            <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">Express</span>
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">MongoDB</span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">Redis</span>
          </div>
        </div>
      </div>
    </div>
  )
}
