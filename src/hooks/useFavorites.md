<script lang="ts">
	let searchQuery = '';
 
	let { data } = $props();
 
	let favorites = $state([]);
 
	async function fetchHomes() {
		try {
			const homeIds = data.user.homes;
			const fetchPromises = homeIds.map((id: string) =>
				fetch(`https://dinmaegler.onrender.com/homes/${id}`).then((res) => res.json())
			);
			const homes = await Promise.all(fetchPromises);
			const filteredData = homes.map((item: any) => ({
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
			favorites = filteredData;
		} catch (err) {
			console.error(err);
		}
	}
 
	$effect(() => {
		fetchHomes();
	});
 
	async function removeFavorite(id: any) {
		const newFavorites = favorites.filter((fav) => fav.id !== id).map((fav) => fav.id);
		try {
			fetch(`https://dinmaegler.onrender.com/users/${data.user.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${data.jwt}`
				},
				body: JSON.stringify({
					homes: newFavorites // Server expects an array of IDs
				})
			});
			favorites = newFavorites;
		} catch (err) {
			console.error(err);
		}
	}
 
	function formatPrice(price: any) {
		return new Intl.NumberFormat('da-DK').format(price);
	}
</script>
 
<main class="container mx-auto px-4 py-8">
<div class="mx-auto max-w-4xl">
<div class="mb-8">
<input
				type="text"
				placeholder="Søg favoritter"
				bind:value={searchQuery}
				class="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
</div>
 
		<div class="space-y-4">
			{#each favorites as property (property.id)}
<div class="rounded-lg bg-white p-4 shadow-sm">
<div class="flex flex-col items-center gap-4 sm:flex-row">
<div class="h-32 w-full sm:w-48">
<img
								src={property.image}
								alt={property.title}
								class="h-full w-full rounded-md object-cover"
							/>
</div>
 
						<div class="flex-grow">
<h2 class="text-lg font-semibold">{property.title}</h2>
<p class="text-gray-600">{property.location}</p>
<div class="mt-2">
<span class="text-sm font-medium">{property.type}</span>
<span class="text-sm text-gray-600">• Ejerudgift: {property.size}</span>
</div>
<div class="flex items-center gap-2 text-sm text-gray-600">
<span>{property.rooms} værelser</span>
<span>• {property.size}</span>
</div>
</div>
 
						<div class="flex flex-col items-end gap-4">
<div class="whitespace-nowrap text-lg font-semibold">
								Kr. {formatPrice(property.price)}
</div>
<button
								onclick={() => removeFavorite(property.id)}
								class="whitespace-nowrap rounded-md bg-[#1a3a54] px-4 py-2 text-white hover:bg-[#15304a] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
								Fjern fra favoritter
</button>
</div>
</div>
</div>
			{/each}
 
			{#if favorites.length === 0}
<div class="py-8 text-center text-gray-500">
					{searchQuery ? 'Ingen favoritter matcher din søgning' : 'Ingen favoritter endnu'}
</div>
			{/if}
</div>
</div>
</main>