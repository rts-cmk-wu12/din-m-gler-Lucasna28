"use client"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const quickLinks = [
    { href: "/boliger-til-salg", text: "Boliger til salg" },
    { href: "/maeglere", text: "Mæglere" },
    { href: "/kontakt", text: "Kontakt os" },
    { href: "/login", text: "Log ind / bliv bruger" },
  ];

  const contactInfo = [
    {
      icon: "/svg/call.svg",
      alt: "Ring til os",
      title: "Ring til os",
      content: "+45 7070 4000"
    },
    {
      icon: "/svg/paper-plane.svg",
      alt: "Send en mail",
      title: "Send en mail",
      content: "4000@dinmaegler.com"
    },
    {
      icon: "/svg/vector.svg",
      alt: "Besøg os",
      title: "Besøg os",
      content: "Stændertorvet 78, 4000 Roskilde"
    }
  ];

  return (
    <footer className="gap-4 min-h-[50vh] grid grid-cols-2 grid-rows-3 bg-gray-300">
  <section className="col-span-2">
    <Image src="/dinmeagler.svg" alt="Din Mægler" width={500} height={300} />
    <p className='text-ellipsis w-1/3'>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
  </section>
  <section class="col-start-2 flex flex-col gap-4">
    <h3 className='text-2xl font-bold'>Quick Links</h3>
    <ul className='flex flex-col gap-2'>
      <li><Link href={quickLinks[0].href}>{quickLinks[0].text}</Link></li>
      <li><Link href={quickLinks[1].href}>{quickLinks[1].text}</Link></li>
      <li><Link href={quickLinks[2].href}>{quickLinks[2].text}</Link></li>
      <li><Link href={quickLinks[3].href}>{quickLinks[3].text}</Link></li>
    </ul>
  </section>
  <section className="grid grid-cols-2 bg-white row-start-3 bg-red-500 row-end-4 col-start-1 col-end-3">
    <div className="col-start-2">
      <Image src="/svg/dms.svg" alt="DMS" width={200} height={200} className='w-1/2 h-1/2'/>
    </div>
  </section>
  <section className="ml-4 mr-4 mb-4 bg-white row-start-2 row-end-4 col-start-1 col-end-2 shadow-lg">
    <ul className='flex flex-col justify-between h-full gap-4 container p-8'>
      <li className='flex'>
        <Image src="/svg/call.svg" alt="Ring til os" width={24} height={24} className='bg-primary-color01 rounded-full p-3 w-12 h-12 flex items-center justify-center shrink-0' />
        <div className='flex flex-col'>
          <h4>Ring til os</h4>
          <p>+45 7070 4000</p>
        </div>
      </li>
      <li className='flex'>
        <Image src="/svg/paper-plane.svg" alt="Send en mail" width={24} height={24} className='bg-primary-color01 rounded-full p-3 w-12 h-12 flex items-center justify-center shrink-0' />
        <div className='flex flex-col'>
          <h4>Send en mail</h4>
          <p>4000@dinmaegler.com</p>
        </div>
      </li>
      <li className='flex'>
        <Image src="/svg/vector.svg" alt="Besøg os" width={24} height={24} className='bg-primary-color01 rounded-full p-3 w-12 h-12 flex items-center justify-center shrink-0' />
        <div className='flex flex-col'>
          <h4>Besøg os</h4>
          <p>Stændertorvet 78, 4000 Roskilde</p>
        </div>
      </li>
      <p>Din Mægler Roskilde er the shit</p>
    </ul>
  </section>
</footer>
  );
}


