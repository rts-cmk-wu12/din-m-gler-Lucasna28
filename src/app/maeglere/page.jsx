'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TeamCardSkeleton from '@/components/skeletons/TeamCardSkeleton';
import PageHero from '@/components/ui/PageHero';
import { useAgents } from '@/hooks/useAgents';
import TeamCard from '@/components/cards/TeamCard';

export default function AgentsPage() {
  const { agents, isLoading, error } = useAgents();

  if (isLoading) return (
    <>
      <PageHero 
        title="Medarbejdere i Roskilde"
        backgroundImage="/images/boliger-hero.png"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <TeamCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );

  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <>
      <section className="relative bg-cover w-full h-[10rem]">
        <PageHero />
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Medarbejdere i Roskilde
          </motion.h2>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {agents.map((agent, index) => (
              <TeamCard key={agent.id} agent={agent} index={index} />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}