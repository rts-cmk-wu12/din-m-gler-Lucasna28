"use client";
import { useEffect, useState } from 'react';
import getUser from '@/utils/getUser';
import { fetchPropertyById } from '@/utils/fetch/propertyService';
import FavoritsCard from '@/components/cards/FavoritsCard';
import FavoritsCardSkeleton from '@/components/skeletons/FavoritsCardSkeleton';
import { motion } from "framer-motion";
import PageHero from '@/components/ui/PageHero';
import { Search } from 'lucide-react';
import { toggleFavorite } from '@/actions/favorites';

export default function FavoritesPage() {
  const [userData, setUserData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUser();
        setUserData(data);
      } catch (err) {
        setError("Der opstod en fejl ved hentning af brugerdata.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (userData?.homes) {
        try {
          const fetchedProperties = await Promise.all(
            userData.homes.map(homeId => fetchPropertyById(homeId))
          );
          setProperties(fetchedProperties);
        } catch (err) {
          setError("Der opstod en fejl ved hentning af favoritter.");
        } finally {
          setDataLoaded(true);
        }
      }
    };

    fetchFavorites();
  }, [userData]);

  const handleRemove = async (propertyId) => {
    const result = await toggleFavorite(propertyId);
    if (result.success) {
      setProperties(prevProperties => 
        prevProperties.filter(property => property.id !== propertyId)
      );
    } else {
      console.error(result.error);
    }
  };

  const filteredProperties = properties.filter(property =>
    property.adress1.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="h-dvh flex flex-col">
      <PageHero title="Mine Favoritter" />
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Søg i favoritter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded p-2 pl-10 w-full"
          />
          <div className="absolute left-2 top-2">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <FavoritsCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : dataLoaded && filteredProperties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <p className="text-xl text-muted-foreground">
              Ingen resultater fundet. Udforsk boliger og tilføj dem til dine favoritter!
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 space-y-4"
          >
            {filteredProperties.map(property => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FavoritsCard propertyId={property.id} onRemove={handleRemove} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}