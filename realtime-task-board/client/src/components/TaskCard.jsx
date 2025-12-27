const PRIORITY_COLORS = {
  high: { bg: 'bg-red-500', text: 'text-red-100' },
  medium: { bg: 'bg-yellow-500', text: 'text-yellow-100' },
  low: { bg: 'bg-green-500', text: 'text-green-100' }
}

export default function TaskCard({ task, nextStatuses, onMove }) {
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium

  return (
    <article className={`glass p-6 rounded-2xl hover:shadow-2xl transition-all duration-200 cursor-pointer priority-${task.priority} hover:scale-[1.02] hover:-translate-y-1`}>
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-lg text-gray-800 leading-tight pr-2 flex-1">
          {task.title}
        </h4>
        <div className={`px-3 py-1 ${priorityStyle.bg} ${priorityStyle.text} rounded-full text-xs font-medium min-w-[60px] text-center`}>
          {task.priority.toUpperCase()}
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}
      
      {task.assignee && (
        <div className="flex items-center text-xs text-gray-500 mb-4">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mr-2">
            <span className="text-xs font-medium">👤</span>
          </div>
          {task.assignee}
        </div>
      )}
      
      <div className="flex gap-2 pt-3 border-t border-white/20">
        {nextStatuses.map(s => (
          <button
            key={s}
            onClick={(e) => {
              e.stopPropagation()
              onMove(task, s)
            }}
            className="flex-1 px-3 py-2 text-xs bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-all duration-200 font-medium"
          >
            → {s.replace('-', ' ')}
          </button>
        ))}
      </div>
      
      <div className="absolute top-4 right-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </article>
  )
}

