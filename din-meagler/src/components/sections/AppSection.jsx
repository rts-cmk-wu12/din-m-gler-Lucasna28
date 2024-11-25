import Image from "next/image";
import Link from "next/link";

export default function AppSection() {
  return (
    <section className="bg-[#162A41] py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-white">
              Hold dig opdateret<br />på salgsprocessen
            </h2>
            <p className="text-gray-300 text-sm max-w-md">
              Når du sælger din bolig hos Din Mægler, kommunikerer du nemt med den 
              ansvarlige mægler eller butik med vores app. Her kan du også se statistik på 
              interessen for din bolig i alle vores salgskanaler.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="bg-white rounded-md hover:opacity-90 transition-opacity">
                <Image
                  src="/images/google-play-badge.png"
                  alt="Google Play"
                  width={120}
                  height={36}
                  className="h-[36px] w-auto"
                />
              </Link>
              <Link href="#" className="bg-white rounded-md hover:opacity-90 transition-opacity">
                <Image
                  src="/images/app-store-badge.png"
                  alt="App Store"
                  width={120}
                  height={36}
                  className="h-[36px] w-auto"
                />
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <div className="transform -translate-y-8">
                <Image
                  src="/images/iphone-front.png"
                  alt="Din Mægler App forside"
                  width={220}
                  height={440}
                  className="w-full h-auto"
                />
              </div>
              <div className="transform translate-y-8">
                <Image
                  src="/images/iphone-back.png"
                  alt="Din Mægler App chat"
                  width={220}
                  height={440}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 