import React from 'react'
import { useStatus } from '@/hooks/use-status';
import { useAuth } from '@clerk/nextjs';

export const StatusComponent: React.FC = () => {
  const { data, isLoading, error, refetch } = useStatus();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-yellow-800">Please sign in to check API status</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-blue-800">Checking API status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-800 mb-2">
          Error: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <button
          onClick={() => refetch()}
          className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
    return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
      <p className="text-green-800">API Status: {data}</p>
    </div>
  );

}

export default StatusComponent