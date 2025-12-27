import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import PageLayout from "../layouts/PageLayout";

interface Item {
  id: number;
  name: string;
  year: string;
  category?: string;
  vanilla_image_url?: string;
}

function EventItemsPage() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const eventName = searchParams.get("event");
  const year = searchParams.get("year");

  useEffect(() => {
    const params = new URLSearchParams();
    if (eventName) params.append("event", eventName);
    if (year) params.append("year", year);

    fetch(`http://localhost:3000/api/items?${params}`)
      .then(res => res.json())
      .then(data => {
        data.sort((a: Item, b: Item) =>
          (a.category || "").localeCompare(b.category || "") ||
          a.name.localeCompare(b.name)
        );
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [eventName, year]);

  return (
    <PageLayout
      title="Items"
      breadcrumbItems={[
        { label: "ACCUEIL", path: "/" },
        { label: `${eventName} ${year}`, path: `/items?event=${eventName}&year=${year}` },
      ]}
      loading={loading}
      isEmpty={items.length === 0}
      emptyMessage="No items found"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto">
        {items.map(item => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            category={item.category}
            vanillaImageUrl={item.vanilla_image_url}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default EventItemsPage;
