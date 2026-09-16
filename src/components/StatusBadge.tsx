interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config: Record<string, { label: string; className: string }> = {
    pending: { label: 'Pending', className: 'bg-amber-50 text-amber-700 border-amber-200' },
    'under-review': { label: 'Under Review', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    approved: { label: 'Approved', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    rejected: { label: 'Rejected', className: 'bg-red-50 text-red-700 border-red-200' },
    completed: { label: 'Completed', className: 'bg-primary-50 text-primary-700 border-primary-200' },
    draft: { label: 'Draft', className: 'bg-gray-50 text-gray-700 border-gray-200' },
    submitted: { label: 'Submitted', className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    'inspection-scheduled': { label: 'Inspection Scheduled', className: 'bg-blue-50 text-blue-700 border-blue-200' },
    'inspection-completed': { label: 'Inspection Completed', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    'assessment-completed': { label: 'Assessment Done', className: 'bg-purple-50 text-purple-700 border-purple-200' },
    archived: { label: 'Archived', className: 'bg-gray-50 text-gray-500 border-gray-200' }
  }

  const { label, className } = config[status] || config.pending

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${className}`}>
      {label}
    </span>
  )
}
