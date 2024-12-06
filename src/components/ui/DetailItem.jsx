export default function DetailItem({ label, value }) {
    return (
      <li className="flex justify-between">
        <h3 className="text-gray-600">{label}:</h3>
        <p>{value}</p>
      </li>
    )
  }
 