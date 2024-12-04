import Image from 'next/image'

export default function SocialLink({ href, icon }) {
  if (!href) return null
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      aria-label={`Besøg ${icon}`}
      className="hover:opacity-80 transition-opacity"
    >
      <Image src={`/icons/${icon}.svg`} alt="" width={24} height={24} />
    </a>
  )
}
