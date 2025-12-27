import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import Loader from "../components/Loader";

interface Enchantment {
  id: number;
  name: string;
  level?: number;
}

interface Item {
  id: number;
  name: string;
  year: string;
  category?: string;
  event_name?: string;
  vanilla_name?: string;
  vanilla_image_url?: string;
  enchantments?: Enchantment[];
}

function ItemPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching item with id:", itemId);
    if (!itemId) return;

    fetch(`http://localhost:3000/api/items/${itemId}`)
      .then(res => {
        if (!res.ok) throw new Error('Item not found');
        return res.json();
      })
      .then(data => {
        setItem(data);
        setLoading(false);
        console.log("Fetched item data:", data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [itemId]);

  // Show loading state with minimal breadcrumb
  if (loading) {
    return (
      <div>
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center">
              <a 
                href="/"
                className="text-gray-300 hover:text-[#F16736] transition-colors uppercase font-semibold"
              >
                ACCUEIL
              </a>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              <span className="text-gray-400 uppercase font-semibold">
                Loading...
              </span>
            </li>
          </ol>
        </nav>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader />
        </div>
      </div>
    );
  }

  // Show error state
  if (!item) {
    return (
      <div>
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center">
              <a 
                href="/"
                className="text-gray-300 hover:text-[#F16736] transition-colors uppercase font-semibold"
              >
                ACCUEIL
              </a>
            </li>
          </ol>
        </nav>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-400">Item not found</div>
        </div>
      </div>
    );
  }

  // Show loaded item with full breadcrumb
  return (
    <PageLayout
      title={item.name}
      breadcrumbItems={[
        { label: "ACCUEIL", path: "/" },
        { 
          label: `${item.event_name} ${item.year}`, 
          path: `/items?event=${item.event_name}&year=${item.year}` 
        },
        { label: item.name, path: `/items/${itemId}` },
      ]}
      loading={false}
      isEmpty={false}
    >
      <div className="flex gap-6">
        {/* Left side - Item image */}
        <div className="flex-shrink-0">
          <div className="w-40 h-40 flex items-center justify-center rounded">
            {item.vanilla_image_url ? (
              <img 
                src={item.vanilla_image_url} 
                alt={item.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-white text-sm">
                {item.vanilla_name || "(Sprite de l'Item)"}
              </span>
            )}
          </div>
        </div>

        {/* Right side - Enchantments */}
        <div className="flex-grow">
          <div className="bg-gray-900 border-2 border-gray-700 rounded p-4">
            <div className="text-cyan-400 font-minecraft text-xl mb-2">
              {item.name}
            </div>
            {item.enchantments && item.enchantments.length > 0 ? (
              <div className="space-y-1">
                {item.enchantments.map((enchantment) => (
                  <div 
                    key={enchantment.id} 
                    className="text-gray-300 font-minecraft text-base"
                  >
                    {enchantment.name}
                    {enchantment.level && ` ${enchantment.level}`}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 font-minecraft text-sm">
                No enchantments
              </div>
            )}
          </div>
          
          {/* Item metadata */}
          <div className="mt-4 text-sm text-gray-400">
            {item.category && (
              <div>Category: <span className="text-gray-300">{item.category}</span></div>
            )}
            {item.event_name && (
              <div>Event: <span className="text-gray-300">{item.event_name}</span></div>
            )}
            {item.year && (
              <div>Year: <span className="text-gray-300">{item.year}</span></div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ItemPage;