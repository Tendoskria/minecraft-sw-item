import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import Breadcrumb from "../components/Breadcrumb";

interface Item {
  id: number;
  name: string;
  vanilla_name?: string;
  year: string;
  event_name: string;
  category?: string;
  vanilla_image_url?: string;
}

function EventItemsPage() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const eventName = searchParams.get('event');
  const year = searchParams.get('year');

  useEffect(() => {
    const params = new URLSearchParams();
    if (eventName) params.append('event', eventName);
    if (year) params.append('year', year);

    fetch(`http://localhost:3000/api/items?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        // Sort by category then by name
        const sortedItems = data.sort((a: Item, b: Item) => {
          const categoryA = a.category || '';
          const categoryB = b.category || '';

          if (categoryA !== categoryB) {
            return categoryA.localeCompare(categoryB);
          }
          return a.name.localeCompare(b.name);
        });

        setItems(sortedItems);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [eventName, year]);

  const breadcrumbItems = [
    { label: "ACCUEIL", path: "/" },
    { label: `${eventName} ${year}`, path: `/items?event=${eventName}&year=${year}` },
  ];

  if (loading) {
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F16736]"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Items</h1>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-400 text-center">No items found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto">
          {items.map(item => (
            <ItemCard
              key={item.id}
              name={item.name}
              category={item.category}
              vanillaImageUrl={item.vanilla_image_url}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventItemsPage