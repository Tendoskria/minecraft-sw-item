interface LoaderProps {
  height?: string;
}

function Loader({ height = "h-64" }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F16736]"></div>
    </div>
  );
}

export default Loader;
