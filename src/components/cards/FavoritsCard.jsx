import Image from 'next/image'



export function PropertyCard({ property, onRemove }) {
  return (
    <li className="flex items-center justify-between border-b border-shape-shape01 py-4">
      <div className="flex gap-4">
        <Image
          src={property.images[0]}
          alt={property.adresse1}
          width={150}
          height={100}
          className="object-cover rounded"
        />
        <div>
          <h3 className="font-semibold text-heading-head01">{property.adresse1}</h3>
          <p className="text-paragraph-para02">{property.postnr} {property.by}</p>
          <p className="text-sm text-paragraph-para02">{property.type}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold">Kr. {property.pris.toLocaleString()}</p>
        <button 
          onClick={() => onRemove(property.id)}
          variant="secondary" 
          className="bg-primary-color01 text-white hover:bg-primary-color03"
        >
          Fjern fra favoritter
        </button>
      </div>
    </li>
  )
}
