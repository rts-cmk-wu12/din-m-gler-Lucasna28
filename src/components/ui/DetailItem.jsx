export default function DetailItem({ label, value }) {
    return (
      <div className="flex justify-between">
        <span className="text-gray-600">{label}:</span>
        <span>{value}</span>
      </div>
    )
  }
  