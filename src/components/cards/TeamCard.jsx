'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TeamCard({ agent, index }) {
  return (
    <motion.div
      key={agent.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="border-shape-shape01 border-2 rounded-md flex flex-col"
    >
      <Link 
        href={`/maeglere/${agent.id}`}
        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div className="relative h-[300px]">
          <Image
            src={agent.image.url}
            alt={agent.name}
            sizes='32'
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-2">{agent.name}</h3>
          <p className="text-gray-500 mb-4">{agent.title}</p>
          <div className="flex items-center gap-2 text-gray-400">
            <Mail className='fill-primary-color01'/>
            <p className='text-primary-color01'>{agent.email}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 