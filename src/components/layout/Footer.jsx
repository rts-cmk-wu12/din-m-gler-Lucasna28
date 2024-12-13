"use client"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const quickLinks = [
    { href: "/boliger", text: "Boliger til salg" },
    { href: "/maeglere", text: "Mæglere" },
    { href: "/kontakt", text: "Kontakt os" },
    { href: "/login", text: "Log ind / bliv bruger" },
    { href: "/afmeld-nyhedsbrev", text: "Afmeld nyhedsbrev" },
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
      icon: "/svg/Vector.svg",
      alt: "Besøg os",
      title: "Besøg os",
      content: "Stændertorvet 78, 4000 Roskilde"
    }
  ];

  return ( <>
    <footer className="bg-gradient-to-b from-[#F8F8FB] from-70% to-white to-70% gap-10 min-h-[50vh] grid grid-cols-2 grid-rows-3 p-24 pl-48">
      <section className="col-span-2 mb-16">
      <Image src="/dinmeagler.svg" alt="Din Mægler" width={500} height={300} />
        <p className='text-ellipsis w-3/4 text-gray-500 mt-4 leading-relaxed'>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.
        </p>
      </section>

      <section className="col-start-2 flex flex-col align-center -mt-12">
        <h2 className='text-2xl font-bold'>Quick Links</h2>
        <ul className='flex flex-col justify-evenly h-full'>
          {quickLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid grid-cols-2 row-start-3 row-end-4 col-start-1 col-end-3 w-full mt-24">
        <div className="col-start-2">
          <Image src="/svg/dms.svg" alt="DMS" width={100} height={100} className='w-full h-full'/>
        </div>
      </section>

      <section className="ml-4 mr-4 -mt-12 bg-white row-start-2 row-end-4 col-start-1 col-end-2 shadow-lg rounded-lg w-[70%]">
        <ul className='flex flex-col justify-evenly h-full gap-6 container p-6'>
          {contactInfo.map((info, index) => (
            <li key={index} className='flex items-start gap-4'>
              <Image 
                src={info.icon} 
                alt={info.alt} 
                width={24} 
                height={24} 
                className='bg-primary-color01 rounded-full p-3 w-12 h-12 flex items-center justify-center shrink-0' 
                />
              <div className='flex flex-col'>
                <h3 className='font-semibold'>{info.title}</h3>
                <p className='text-gray-600'>{info.content}</p>
              </div>
            </li>
          ))}
          <p className='text-gray-600 mt-4 text-pretty w-1/2'>
            Din Mægler Roskilde, er din boligibutik i lokalområdet.
          </p>
        </ul>
      </section>
    </footer>
    <section className='bg-primary-color01 w-full h-24 text-center flex justify-center items-center'>
      <p className='text-white'>Layout By Jit Banik 2020</p>
    </section>
    </>
  );
}


