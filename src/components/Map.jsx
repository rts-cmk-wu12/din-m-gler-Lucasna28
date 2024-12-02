'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/images/marker-icon-2x.png',
  iconUrl: '/images/marker-icon.png',
  shadowUrl: '/images/marker-shadow.png',
})

export default function Map({ position, showFullscreen = false, zoom = 13 }) {
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    const map = L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: showFullscreen
    }).setView(position, zoom)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map)

    const marker = L.marker(position).addTo(map)

    // Opdater kortet når container størrelsen ændres
    setTimeout(() => {
      map.invalidateSize()
    }, 100)

    return () => {
      map.remove()
    }
  }, [position, showFullscreen, zoom])

  return <div ref={mapRef} className="h-full w-full" />
}
