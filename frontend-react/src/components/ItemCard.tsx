interface ItemCardProps {
  name: string;
  category?: string;
  vanillaImageUrl?: string;
}

function ItemCard({ name, category, vanillaImageUrl }: ItemCardProps) {
  return (
    <div 
      className="bg-[#3A3D44] rounded-lg p-4 hover:bg-[#43464E] transition-colors flex flex-col items-center text-center"
    >
      {/* Sprite Image */}
      <div className="w-16 h-16 mb-3 flex items-center justify-center">
        {vanillaImageUrl ? (
          <img 
            src={vanillaImageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain pixelated"
            style={{ imageRendering: 'pixelated' }}
          />
        ) : (
          <div className="w-16 h-16 bg-[#2D3037] rounded flex items-center justify-center text-gray-500 text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Item Name */}
      <h3 className="text-base font-semibold mb-2 break-words w-full">
        {name}
      </h3>

      {/* Category */}
      {category && (
        <p className="text-xs text-[#F16736] uppercase tracking-wide">
          {category}
        </p>
      )}
    </div>
  )
}

export default ItemCard