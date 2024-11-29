'use client'

import dynamic from 'next/dynamic'

const MapWithNoSSR = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg" />
})

export default function MapComponent({ position }) {
  return <MapWithNoSSR position={position} />
}