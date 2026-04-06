import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="bg-secondary rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-square bg-gray-300 dark:bg-gray-700"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
        
        {/* Size Buttons Skeleton */}
        <div className="flex gap-2">
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-8 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        
        {/* Buttons Skeleton */}
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton