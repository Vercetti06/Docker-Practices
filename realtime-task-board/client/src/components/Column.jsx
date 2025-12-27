import TaskCard from './TaskCard';

const STATUS_LABELS = {
  todo: "📋 To Do",
  "in-progress": "⚡ In Progress", 
  done: "✅ Done"
}

const STATUS_COLORS = {
  todo: "border-blue-500",
  "in-progress": "border-yellow-500",
  done: "border-green-500"
}

export default function Column({ status, tasks, onMove, onEdit, count }) {
  const nextStatuses = {
    todo: ["in-progress"],
    "in-progress": ["todo", "done"],
    done: ["in-progress"]
  }[status] || []

  return (
    <section className={`glass status-${status} flex-1 min-w-[320px] p-6 rounded-3xl fade-in-up ${STATUS_COLORS[status]}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {STATUS_LABELS[status]}
        </h3>
        <span className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-sm font-medium">
          {count}
        </span>
      </div>
      
      <div className="space-y-4 min-h-[400px]">
        {tasks.map(task => (
          <div key={task._id} onClick={() => onEdit(task)}>
            <TaskCard task={task} nextStatuses={nextStatuses} onMove={onMove} />
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="glass p-8 rounded-2xl text-center opacity-50">
            <p className="text-gray-500">No tasks here yet</p>
          </div>
        )}
      </div>
    </section>
  )
}

