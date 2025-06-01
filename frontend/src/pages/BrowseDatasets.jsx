import React, { useState } from 'react';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import DatasetCard from '../components/ui/DatasetCard.jsx';

const BrowseDatasets = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const datasets = [
    {
      id: '1',
      title: 'Large-Scale Image Classification Dataset',
      description: 'A comprehensive collection of labeled images across 1000+ categories for computer vision tasks.',
      category: 'image',
      price: 299,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      seller: 'AI Research Lab',
      downloads: 1234,
      views: 5678,
    },
    {
      id: '2',
      title: 'Conversational Speech Dataset',
      description: 'High-quality recorded conversations in multiple languages for speech recognition training.',
      category: 'audio',
      price: 199,
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
      seller: 'AudioTech Corp',
      downloads: 567,
      views: 2341,
    },
    {
      id: '3',
      title: 'Sentiment Analysis Text Corpus',
      description: 'Million+ labeled text samples for sentiment analysis and opinion mining applications.',
      category: 'text',
      price: 149,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      seller: 'TextMining Inc',
      downloads: 891,
      views: 3456,
    },
    {
      id: '4',
      title: 'Action Recognition Video Dataset',
      description: 'Curated video clips showing various human actions for activity recognition models.',
      category: 'video',
      price: 399,
      thumbnail: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop',
      seller: 'VisionLab',
      downloads: 234,
      views: 1567,
    },
    {
      id: '5',
      title: 'Medical Image Segmentation Set',
      description: 'Annotated medical images for segmentation tasks in healthcare AI applications.',
      category: 'image',
      price: 549,
      thumbnail: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
      seller: 'MedAI Solutions',
      downloads: 445,
      views: 2890,
    },
    {
      id: '6',
      title: 'Music Genre Classification Audio',
      description: 'Diverse collection of music tracks labeled by genre for audio classification models.',
      category: 'audio',
      price: 179,
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      seller: 'SoundData Co',
      downloads: 678,
      views: 3234,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse Datasets
          </h1>
          <p className="text-lg text-gray-600">
            Discover high-quality machine learning datasets from our community
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search datasets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="image">Images</option>
                  <option value="audio">Audio</option>
                  <option value="video">Video</option>
                  <option value="text">Text</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-300">$100 - $300</option>
                  <option value="300+">$300+</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                Showing <span className="font-semibold">{datasets.length}</span> datasets
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {datasets.map((dataset) => (
                <DatasetCard key={dataset.id} {...dataset} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline">
                Load More Datasets
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDatasets;
