export default function Splash() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600 relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="text-center text-white z-10 glass p-12 rounded-3xl max-w-md mx-4 fade-in-up">
        <div className="w-24 h-24 mx-auto mb-8 bg-white/20 rounded-2xl flex items-center justify-center">
          <span className="text-4xl">🚀</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          TeamSync
        </h1>
        <p className="text-xl mb-8 opacity-90 leading-relaxed">
          Real-time collaborative task board
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm">⚡ Live Sync</div>
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm">🎨 Modern UI</div>
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-xl text-sm">🐳 Docker</div>
        </div>
        <p className="mt-8 text-sm opacity-75">Loading your board...</p>
      </div>
    </div>
  )
}

