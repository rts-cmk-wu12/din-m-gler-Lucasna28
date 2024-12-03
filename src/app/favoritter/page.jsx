import { Suspense } from 'react'
import PageHero from '@/components/ui/PageHero'
import { PropertyCard } from '@/components/cards/FavoritsCard'
import { getFavorites } from '@/utils/fetch/getFavorites';

async function FavoritesList() {
  const favorites = await getFavorites();

  const handleRemove = async (id) => {
    const updatedFavorites = favorites.filter((property) => property.id !== id);
    await updateFavorites(updatedFavorites);
    // Optionelt: opdatér UI'et lokalt efter fjernelsen
  };

  return (
    <ul className="max-w-4xl mx-auto px-4">
      {favorites.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          onRemove={() => handleRemove(property.id)}
        />
      ))}
    </ul>
  );
}

export default async function Favoritter() {
  return (
    <>
      <PageHero title="Mine favoritboliger" />
      <section className='max-w-4xl mx-auto mt-8 space-y-4'>
        <div className="px-4">
          <input 
            type="search" 
            className='w-full border border-shape-shape01 p-2 rounded' 
            placeholder='Søg i favoritter' 
          />
        </div>
        <hr className='h-0.5 bg-shape-shape01'/>
        <Suspense fallback={<div>Loading...</div>}>
          <FavoritesList />
        </Suspense>
      </section>
    </>
  )
}

