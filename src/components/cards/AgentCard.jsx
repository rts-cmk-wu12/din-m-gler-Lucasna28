// components/AgentCard.jsx
'use client'

import Image from 'next/image';

function AgentCard({ agent }) {
  return (
    <div className="relative w-64 h-64 mb-[2.35rem]">
      <Image
        src={agent?.image.url || '/placeholder-agent.jpg'}
        alt={agent?.name || 'Ejendomsmægler'}
        fill
        className="object-cover"
      />
      <ul className='bg-primary-color01 p-2 w-2/4 relative top-48 flex text-white justify-evenly align-middle'>
        <li>
          <Image src="/svg/instagram.svg" alt="instagram image" width={24} height={24} />
        </li>
        <li>
          <Image src="/svg/linkedIn.svg" alt="linkedin image" width={24} height={24} />
        </li>
        <li>
          <Image src="/svg/skype.svg" alt="skype image" width={24} height={24} />
        </li>
      </ul>
    </div>
  );
}

export default AgentCard;