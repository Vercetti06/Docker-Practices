export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600">
      <div className="glass p-12 rounded-3xl text-center fade-in-up">
        <div className="spinner mx-auto mb-8 w-16 h-16 border-4"></div>
        <h2 className="text-2xl font-bold text-white mb-4">Loading your board...</h2>
        <p className="text-white/80">Connecting to real-time server</p>
      </div>
    </div>
  )
}

