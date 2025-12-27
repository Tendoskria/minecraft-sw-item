import { useNavigate } from "react-router-dom";

function EventCard({ symbol, title, years }: { symbol: string; title: string; years: string[] }) {
  const navigate = useNavigate();

  const handleYearClick = (year: string) => {
    navigate(`/items?event=${encodeURIComponent(title)}&year=${year}`);
  };

  return (
    <div className="w-[350px] h-[170px] bg-[#3A3D44] hover:bg-[#43464E] transition-colors rounded-xl flex overflow-hidden">

      {/* Left */}
      <div className="w-[30%] flex items-center justify-center relative">
        <span className="text-4xl text-white">{symbol}</span>

        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#F16736]" />
      </div>

      {/* Right */}
      <div className="flex-1 px-6 flex flex-col justify-center text-white">
        <h2 className="text-2xl font-extrabold mb-3">
          {title}
        </h2>

        <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-sm">
          {years.map(year => (
            <span 
              key={year}
              onClick={() => handleYearClick(year)}
              className="cursor-pointer hover:text-[#F16736] transition-colors"
            >
              {year}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}

export default EventCard