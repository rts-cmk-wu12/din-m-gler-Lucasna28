'use client'

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

const customIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

export default function ContactMap() {
  const [isMounted, setIsMounted] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const center = [55.641732180526754, 12.075974316097844];

      mapRef.current = L.map('contact-map', {
        center: center,
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: true,
        doubleClickZoom: true, 
        dragging: true,
        zoomAnimation: true,
        zoomAnimationThreshold: 1.5,
        zoomAnimationEasing: L.Util.EASE_IN_OUT
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(mapRef.current);

      markerRef.current = L.marker(center, { icon: customIcon })
        .addTo(mapRef.current)
        .bindPopup(`
          <div class="p-3">
            <h3 class="font-bold text-primary text-lg mb-2">Din Mægler</h3>
            <p class="text-gray-600">Stændertorvet 78</p>
            <p class="text-gray-600">4000 Roskilde</p>
          </div>
        `, {
          className: 'custom-popup',
          closeButton: true,
          maxWidth: 220,
          minWidth: 200,
          autoPan: false,
          closeOnClick: false
        })
        .openPopup();

      L.control.zoom({
        position: 'bottomright',
        zoomInText: '+',
        zoomOutText: '-'
      }).addTo(mapRef.current);

      L.control.scale({
        imperial: false,
        position: 'bottomright',
        maxWidth: 100
      }).addTo(mapRef.current);

      const markerElement = markerRef.current.getElement();
      const markerIcon = markerElement.querySelector('img');
      if (markerIcon) {
        markerIcon.style.transition = 'transform 0.2s';
        markerElement.addEventListener('mouseenter', () => {
          markerIcon.style.transform = 'scale(1.2)';
        });
        markerElement.addEventListener('mouseleave', () => {
          markerIcon.style.transform = 'scale(1)';
        });
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isMounted]);

  if (!isMounted) return null; // Return null before client-side mounting

  return (
    <motion.div 
      id="contact-map" 
      className="w-full h-full rounded-lg shadow-md z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut"
      }}
    />
  );
}