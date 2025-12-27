import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ItemCard from "../components/ItemCard";
import PageLayout from "../layouts/PageLayout";

interface Item {
  id: number;
  name: string;
  vanilla_name?: string;
  year: string;
  event_name?: string;
  category?: string;
  vanilla_image_url?: string;
}

function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (query.trim().length >= 2) {
      fetch(`http://localhost:3000/api/items/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          // Sort by name
          data.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
          setItems(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [query]);

  return (
    <PageLayout
      title={`Search Results for "${query}"`}
      breadcrumbItems={[
        { label: "ACCUEIL", path: "/" },
        { label: "SEARCH", path: `/search?q=${query}` },
      ]}
      loading={loading}
      isEmpty={items.length === 0}
      emptyMessage={query.trim().length < 2 ? "Please enter at least 2 characters to search" : "No items found"}
    >
      <div className="mb-4 text-gray-400 text-sm">
        Found {items.length} result{items.length !== 1 ? 's' : ''}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-4">
        {items.map(item => (
          <ItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            category={`${item.event_name} ${item.year} - ${item.category}`}
            vanillaImageUrl={item.vanilla_image_url}
          />
        ))}
      </div>
    </PageLayout>
  );
}

export default SearchResultsPage;
