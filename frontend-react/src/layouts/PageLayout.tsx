import Breadcrumb from "../components/Breadcrumb";
import Loader from "../components/Loader";

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface PageLayoutProps {
  title: string;
  breadcrumbItems: BreadcrumbItem[];
  loading: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

function PageLayout({
  title,
  breadcrumbItems,
  loading,
  isEmpty = false,
  emptyMessage = "No data found",
  children,
}: PageLayoutProps) {
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />

      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
      </div>

      {loading ? (
        <Loader />
      ) : isEmpty ? (
        <p className="text-gray-400 text-center">{emptyMessage}</p>
      ) : (
        children
      )}
    </div>
  );
}

export default PageLayout;
