// CategoryCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ name, icon, count, description, color }) => {
  return (
    <Link to={`/browse?category=${name.toLowerCase()}`}>
      <div className={`${color} rounded-xl p-6 hover:scale-105 transition-all duration-200 cursor-pointer group`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-white/90 group-hover:text-white transition-colors">
            {icon}
          </div>
          <span className="text-white/80 text-sm font-medium">
            {count} datasets
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
