import { useState, useEffect } from 'react'
import { socket } from '../socket'

export default function TaskModal({ onClose, editingTask }) {
  const [title, setTitle] = useState(editingTask?.title || '')
  const [description, setDescription] = useState(editingTask?.description || '')
  const [priority, setPriority] = useState(editingTask?.priority || 'medium')
  const [assignee, setAssignee] = useState(editingTask?.assignee || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setTitle(editingTask?.title || '')
    setDescription(editingTask?.description || '')
    setPriority(editingTask?.priority || 'medium')
    setAssignee(editingTask?.assignee || '')
  }, [editingTask])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)
    const payload = { title: title.trim(), description: description.trim(), priority, assignee: assignee.trim() || undefined }

    try {
      if (editingTask) {
        await new Promise((resolve, reject) => {
          socket.emit('task:update', { id: editingTask._id, updates: payload }, (result) => {
            if (result?.error) reject(new Error(result.error))
            else resolve(result)
          })
        })
      } else {
        await new Promise((resolve, reject) => {
          socket.emit('task:create', payload, (result) => {
            if (result?.error) reject(new Error(result.error))
            else resolve(result)
          })
        })
      }
      onClose()
    } catch (error) {
      console.error('Task save error:', error)
      alert('Failed to save task. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <form onSubmit={onSubmit} onClick={(e) => e.stopPropagation()} className="glass p-8 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">
          {editingTask ? '✏️ Edit Task' : '➕ New Task'}
        </h3>
        
        <div className="space-y-4 mb-6">
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-4 rounded-xl border border-white/30 focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm text-lg placeholder-gray-500"
          />
          
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-4 rounded-xl border border-white/30 focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm placeholder-gray-500"
          />
          
          <input
            placeholder="Assignee (optional)"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full p-4 rounded-xl border border-white/30 focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm placeholder-gray-500"
          />
          
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-4 rounded-xl border border-white/30 focus:border-blue-400 focus:outline-none bg-white/50 backdrop-blur-sm"
          >
            <option value="low">🟢 Low Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="high">🔴 High Priority</option>
          </select>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-white/20">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 rounded-xl bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="spinner w-5 h-5"></div>
                Saving...
              </>
            ) : (
              editingTask ? 'Update Task' : 'Create Task'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

