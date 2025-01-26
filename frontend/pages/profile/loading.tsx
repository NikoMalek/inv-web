import { Skeleton } from '../../components/ui/skeleton'; // Importa el componente de skeleton loading de shadcn/ui

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-col items-center mb-6">
          <Skeleton className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4" />
          <Skeleton className="h-8 w-48 rounded mb-2" />
          <Skeleton className="h-6 w-32 rounded" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48 rounded" />
            <Skeleton className="h-6 w-32 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;