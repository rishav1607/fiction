export function QuickActions() {
  const items = [
    { label: 'News', icon: '📰', color: 'from-blue-500 to-blue-600' },
    { label: 'Releases', icon: '🚀', color: 'from-green-500 to-green-600' },
    { label: 'Events', icon: '🎉', color: 'from-purple-500 to-purple-600' },
    { label: 'Quests', icon: '⚔️', color: 'from-red-500 to-red-600' },
    { label: 'Community', icon: '👥', color: 'from-cyan-500 to-cyan-600' },
    { label: 'FAQ', icon: '❓', color: 'from-yellow-500 to-yellow-600' },
    { label: 'Support', icon: '🛠️', color: 'from-orange-500 to-orange-600' }
  ]
  
  return (
    <div className="container py-6">
      <div className="flex items-center justify-center gap-6 lg:gap-8 overflow-x-auto pb-2">
        {items.map((i, idx) => (
          <button
            key={i.label}
            className="stagger-item flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-complimentary/50 transition-all duration-300 group min-w-0 hover:scale-105"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${i.color} flex items-center justify-center text-lg shadow-lg group-hover:shadow-xl group-hover:shadow-${i.color.split('-')[1]}-500/20 transition-all duration-300 floating`}>
              {i.icon}
            </div>
            <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300 whitespace-nowrap">
              {i.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}


