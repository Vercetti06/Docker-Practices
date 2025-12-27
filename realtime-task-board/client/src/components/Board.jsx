import { useState } from 'react'
import Column from './Column'
import TaskModal from './TaskModal'
import { socket } from '../socket'

const STATUSES = ["todo", "in-progress", "done"]

export default function Board({ tasks }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const openNewTask = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEditTask = (task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const moveTask = (task, nextStatus) => {
    socket.emit("task:update", { 
      id: task._id, 
      updates: { status: nextStatus } 
    })
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Task Board</h2>
          <p className="text-xl text-gray-600">Total tasks: {tasks.length}</p>
        </div>
        <button
          onClick={openNewTask}
          className="glass px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition-all duration-200 shadow-xl"
        >
          ➕ New Task
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 -mb-8">
        {STATUSES.map(status => (
          <Column
            key={status}
            status={status}
            tasks={tasks.filter(t => t.status === status)}
            onMove={moveTask}
            onEdit={openEditTask}
            count={tasks.filter(t => t.status === status).length}
          />
        ))}
      </div>

      {modalOpen && (
        <TaskModal 
          onClose={() => setModalOpen(false)} 
          editingTask={editingTask} 
        />
      )}
    </main>
  )
}

