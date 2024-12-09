'use client';

import { useEffect, useState } from 'react';

export default function Favorites({ initialData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  async function fetchHomes() {
    try {
      const homeIds = initialData.user.homes;
      const fetchPromises = homeIds.map((id) =>
        fetch(`https://dinmaegler.onrender.com/homes/${id}`).then((res) => res.json())
      );
      const homes = await Promise.all(fetchPromises);
      const filteredData = homes.map((item) => ({
        id: item.id,
        title: item.adress1,
        location: `${item.postalcode} ${item.city}`,
        type: item.type,
        size: `${item.livingspace} m²`,
        rooms: item.rooms,
        price: item.price,
        image: item.images[0]?.url || 'https://placehold.co/200x300',
        energylabel: item.energylabel,
        cost: item.cost
      }));
      setFavorites(filteredData);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchHomes();
  }, []); // Empty dependency array means this runs once on mount

  async function removeFavorite(id) {
    const newFavorites = favorites.filter((fav) => fav.id !== id).map((fav) => fav.id);
    try {
      await fetch(`https://dinmaegler.onrender.com/users/${initialData.user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${initialData.jwt}`
        },
        body: JSON.stringify({
          homes: newFavorites
        })
      });
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  function formatPrice(price) {
    return new Intl.NumberFormat('da-DK').format(price);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Søg favoritter"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {favorites.map((property) => (
            <div key={property.id} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <div className="h-32 w-full sm:w-48">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full rounded-md object-cover"
                  />
                </div>

                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{property.title}</h2>
                  <p className="text-gray-600">{property.location}</p>
                  <div className="mt-2">
                    <span className="text-sm font-medium">{property.type}</span>
                    <span className="text-sm text-gray-600">• Ejerudgift: {property.size}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{property.rooms} værelser</span>
                    <span>• {property.size}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-4">
                  <div className="whitespace-nowrap text-lg font-semibold">
                    Kr. {formatPrice(property.price)}
                  </div>
                  <button
                    onClick={() => removeFavorite(property.id)}
                    className="whitespace-nowrap rounded-md bg-[#1a3a54] px-4 py-2 text-white hover:bg-[#15304a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Fjern fra favoritter
                  </button>
                </div>
              </div>
            </div>
          ))}

          {favorites.length === 0 && (
            <div className="py-8 text-center text-gray-500">
              {searchQuery ? 'Ingen favoritter matcher din søgning' : 'Ingen favoritter endnu'}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}