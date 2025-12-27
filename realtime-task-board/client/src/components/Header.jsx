export default function Header({ isConnected }) {
  return (
    <header className="glass sticky top-0 z-50 px-6 py-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-xl">🚀</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              TeamSync
            </h1>
            <p className="text-sm text-gray-500">Real-time collaboration</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
          <span className="text-sm font-medium text-gray-700">
            {isConnected ? '🟢 Live' : '🔴 Reconnecting...'}
          </span>
        </div>
      </div>
    </header>
  )
}

