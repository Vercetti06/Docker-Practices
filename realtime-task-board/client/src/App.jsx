import { useState, useEffect } from 'react'
import { socket } from './socket'
import Splash from './components/Splash'
import Header from './components/Header'
import Board from './components/Board'
import LoadingSpinner from './components/LoadingSpinner'
import { fetchTasks } from './api'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showSplash, setShowSplash] = useState(true)
  const [tasks, setTasks] = useState([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Splash screen
    const timer = setTimeout(() => setShowSplash(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showSplash) {
      loadTasks()
      setupSocketListeners()
    }
  }, [showSplash])

  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Socket connected')
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
      setIsConnected(false)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      const data = await fetchTasks()
      setTasks(data)
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const setupSocketListeners = () => {
    socket.on("task:created", (task) => {
      setTasks(prev => [task, ...prev])
    })
    socket.on("task:updated", (task) => {
      setTasks(prev => prev.map(t => t._id === task._id ? task : t))
    })
    socket.on("task:deleted", (id) => {
      setTasks(prev => prev.filter(t => t._id !== id))
    })
  }

  if (showSplash) return <Splash />
  if (isLoading) return <LoadingSpinner />

  return (
    <div className="min-h-screen">
      <Header isConnected={isConnected} />
      <Board tasks={tasks} />
    </div>
  )
}

export default App

