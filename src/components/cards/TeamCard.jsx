import Image from "next/image"
import Link from "next/link"
import { Mail, Linkedin } from 'lucide-react'

export default function TeamCard({ agent }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-[300px]">
        <Image
          src={agent.image.url}
          alt={agent.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-semibold text-lg">{agent.name}</h3>
        <p className="text-gray-600 text-sm mb-4">Ejendomsmægler, MDMS</p>
        <div className="flex justify-center gap-4">
          <Link 
            href={`mailto:${agent.email}`}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            aria-label={`Send email til ${agent.name}`}
          >
            <Mail className="w-5 h-5 text-gray-600" />
          </Link>
          <Link 
            href={agent.linkedin || "#"}
            className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            aria-label={`Se ${agent.name}'s LinkedIn profil`}
          >
            <Linkedin className="w-5 h-5 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  )
} 