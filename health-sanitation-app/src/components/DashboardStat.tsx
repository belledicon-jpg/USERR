interface DashboardStatProps {
  label: string
  value: string | number
  color: 'slate' | 'amber' | 'emerald' | 'blue'
}

export default function DashboardStat({ label, value, color }: DashboardStatProps) {
  const colorMap = {
    slate: 'text-gov-900',
    amber: 'text-accent-600',
    emerald: 'text-emerald-600',
    blue: 'text-blue-600'
  }

  return (
    <div className="bg-white rounded-2xl border border-gov-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-gov-500 mb-2 font-medium uppercase tracking-wider">{label}</p>
      <p className={`text-4xl font-bold ${colorMap[color]}`}>{value}</p>
    </div>
  )
}
