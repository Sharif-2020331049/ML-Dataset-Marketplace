// DatasetCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Download, User } from 'lucide-react';
import { Button } from './Button.jsx';

const DatasetCard = ({
  id,
  title,
  description,
  category,
  price,
  thumbnail,
  seller,
  downloads,
  views,
}) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'image':
        return 'bg-green-100 text-green-800';
      case 'audio':
        return 'bg-yellow-100 text-yellow-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'text':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 hover:shadow-lg group">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-100 rounded-t-xl overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getCategoryColor(category)}`}>
          {category.toUpperCase()}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{downloads}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{seller}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${price}
          </div>
          <Link to={`/dataset/${id}`}>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DatasetCard;
