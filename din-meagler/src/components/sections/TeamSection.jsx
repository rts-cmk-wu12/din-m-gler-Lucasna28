"use client"
import { motion } from "framer-motion"
import { useAgents } from "@/hooks/useAgents"
import Link from "next/link"
import TeamCard from "@/components/cards/TeamCard"

export default function TeamSection() {
  const { agents, isLoading, error } = useAgents()

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-[#162A41] mb-2">
            Mød vores engagerede medarbejdere
          </h2>
          <p className="text-gray-600 text-sm">
            Din Mægler er garant for altid redelig rådgivning i dit boligsalg.<br />
            Kontakt en af vores medarbejdere.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-white rounded-lg overflow-hidden shadow">
                  <div className="h-[300px] bg-gray-200" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 w-1/2 mx-auto mb-2" />
                    <div className="h-3 bg-gray-200 w-1/3 mx-auto mb-4" />
                    <div className="flex justify-center gap-4">
                      <div className="h-9 w-9 bg-gray-200 rounded" />
                      <div className="h-9 w-9 bg-gray-200 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agents.slice(0, 3).map((agent) => (
              <TeamCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link 
            href="/maeglere" 
            className="inline-block bg-[#162A41] text-white px-8 py-2 rounded text-sm"
          >
            Se alle mæglere
          </Link>
        </div>
      </div>
    </section>
  )
} 