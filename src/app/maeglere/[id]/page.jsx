'use client';

import { useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Phone, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import PageHero from '@/components/ui/PageHero';
import { useAgent } from '@/hooks/useAgent';

const AgentCard = dynamic(() => import('@/components/cards/AgentCard'), {
  ssr: false,
});

const ContactForm = ({ formData, handleChange, handleSubmit }) => (
  <div className="bg-white p-8 rounded-lg">
    <form onSubmit={handleSubmit} className="space-y-4 border border-gray-200 p-6">
      <h3 className="text-xl font-bold mb-6">Kontakt {formData.name}</h3>
      <div className="grid grid-cols-2 gap-4">
        {['name', 'email'].map((field) => (
          <div key={field}>
            <label className="block text-sm mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder={`Indtast ${field}`}
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-sm mb-1">Emne</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Hvad drejer din henvendelse sig om?"
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Besked</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border rounded"
          placeholder="Skriv din besked her..."
        />
      </div>
      <button
        type="submit"
        className="w-1/4 bg-primary-color01 text-white py-2 px-4 rounded hover:bg-primary-color01/90"
      >
        Send besked
      </button>
    </form>
  </div>
);

const AgentDetails = ({ agent }) => (
  <div className="bg-white p-8 rounded-lg">
    <div className="flex flex-col md:flex-row gap-8">
      <AgentCard agent={agent} />
      <div>
        <h2 className="text-2xl font-bold mb-2">{agent.name}</h2>
        <p className="text-gray-600 mb-2 text-nowrap">{agent.title}</p>
        <hr className='h-0.5 bg-shape-shape01 w-1/4 mb-5' />
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-5 h-5 text-primary-color01 fill-primary-color01" />
          <span>{agent.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/svg/paperplane.svg" className='fill-primary-color01' width={20} height={20} alt='mail' />
          <span>{agent.email}</span>
        </div>
      </div>
    </div>
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-1">Om {agent.name}</h3>
      <hr className='h-1 bg-primary-color01 w-14 mb-4' />
      <p className="text-gray-600 text-pretty whitespace-pre-line">
        {agent.description}
      </p>
    </div>
  </div>
);

export default function AgentDetailsPage() {
  const { id } = useParams();
  const { agent, isLoading, error } = useAgent(id);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-color01"></div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <>
      <PageHero title="Kontakt en medarbejder" />
      <section className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col border-2 border-gray-200">
          <AgentDetails agent={agent} />
          <ContactForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
        </div>
        <div className='h-1/2 flex flex-col justify-between'>
          <div className='border p-6 border-gray-200 bg-shape-shape02 w-1/2 flex flex-col gap-2 h-1/3'>
            <p>Search Property</p>
            <hr />
            <input type="search" placeholder="Search" className='w-full p-2 border rounded mt-4' />
            <Search />
          </div>
          <div className='bg-primary-color01 text-white p-4 w-1/2 flex flex-col items-center justify-center h-full mt-8'>
            <p className='text-center w-1/2 text-pretty whitespace-pre-line font-semibold text-2xl'>
              Find The Best 
              Property
              For Rent Or Buy
            </p>
            <hr className='h-0.5 w-1/4 bg-white my-3' />
            <p className='text-center'>Call Us Now</p>
            <p className='text-center font-semibold text-xl'>+00 123 456 789</p>
          </div>
        </div>
      </section>
    </>
  );
}