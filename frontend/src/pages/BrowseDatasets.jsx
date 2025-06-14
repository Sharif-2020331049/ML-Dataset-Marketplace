import React, { useEffect, useState } from 'react';
import { Search, Filter, Grid, List, Turtle } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import DatasetCard from '../components/ui/DatasetCard.jsx';
import axios from '../api/axios.js';

const BrowseDatasets = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false)

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [datasets, setDatasets] = useState([])
  const [filteredDatasets, setFilteredDatasets] = useState([]);

  useEffect(() => {
    fetchDatasets();
  }, [page]);


  // const fetchDatasets = async () => {
  //   try {
  //     const response = await axios.get('/dataset/access'); // Adjust path if needed
  //     if (response.data.success) {
  //       setDatasets(response.data.datasets);
  //     }
  //   } catch (err) {
  //     console.error('Error fetching datasets:', err);
  //   }
  // };

  // console.log(datasets);


  // useEffect(() => {
  //   const newDatasets = datasets.filter(dataset => dataset.category.toLowerCase() === selectedCategory.toLowerCase() || selectedCategory === "all");
  //   setFilteredDatasets(newDatasets);
  // }, [priceRange, selectedCategory, sortBy]);

//   useEffect(() => {
//   let filtered = [...datasets];

//   // Filter by category
//   if (selectedCategory !== 'all') {
//     filtered = filtered.filter(dataset => 
//       dataset.category.toLowerCase() === selectedCategory.toLowerCase()
//     );
//   }

//   // Filter by price range
//   if (priceRange !== 'all') {
//     filtered = filtered.filter(dataset => {
//       switch (priceRange) {
//         case 'free':
//           return dataset.price === 0;
//         case '0-100':
//           return dataset.price > 0 && dataset.price <= 100;
//         case '100-300':
//           return dataset.price > 100 && dataset.price <= 300;
//         case '300+':
//           return dataset.price > 300;
//         default:
//           return true;
//       }
//     });
//   }

//   // Sort the datasets
//   filtered.sort((a, b) => {
//     switch (sortBy) {
//       case 'newest':
//         return new Date(b.createdAt) - new Date(a.createdAt);
//       case 'popular':
//         return (b.downloads || 0) - (a.downloads || 0);
//       case 'price-low':
//         return a.price - b.price;
//       case 'price-high':
//         return b.price - a.price;
//       default:
//         return 0;
//     }
//   });

//   setFilteredDatasets(filtered);
// }, [datasets, priceRange, selectedCategory, sortBy]);



useEffect(() => {
  let filtered = [...datasets];

  // Search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(dataset => 
      dataset.datasetTitle.toLowerCase().includes(query) || 
      dataset.description.toLowerCase().includes(query) ||
      (dataset.tags && dataset.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }

  // Filter by category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(dataset => 
      dataset.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  // Filter by price range
  if (priceRange !== 'all') {
    filtered = filtered.filter(dataset => {
      switch (priceRange) {
        case 'free':
          return dataset.price === 0;
        case '0-100':
          return dataset.price > 0 && dataset.price <= 100;
        case '100-300':
          return dataset.price > 100 && dataset.price <= 300;
        case '300+':
          return dataset.price > 300;
        default:
          return true;
      }
    });
  }

  // Sort the datasets
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'popular':
        return (b.downloads || 0) - (a.downloads || 0);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  setFilteredDatasets(filtered);
}, [datasets, searchQuery, priceRange, selectedCategory, sortBy]);

  const fetchDatasets = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/dataset/access?page=${page}`);
      if (response.data.success) {
        setDatasets(response.data.datasets);
        setFilteredDatasets(response.data.datasets);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.error('Error fetching datasets:', err);
    } finally {
      setLoading(false)
    }
  };


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
                  <option value="images">Images</option>
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

            {loading ? (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white h-48 rounded-xl shadow-sm" />
                ))}
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredDatasets.map((dataset) => (
                  <DatasetCard
                    key={dataset._id}
                    id={dataset._id}
                    title={dataset.datasetTitle}
                    description={dataset.description}
                    price={dataset.price}
                    thumbnail={dataset.thumbnail?.url}
                    seller={dataset.uploadedBy?.email}
                    category={dataset.category}
                    downloads={dataset.downloads || 0}
                    views={dataset.views || 0}
                  />
                ))}
              </div>
            )}



            {datasets.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                No datasets found.
              </div>
            )}

            <div className="flex justify-center mt-12 space-x-4">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="text-gray-600 self-center">Page {page} of {totalPages}</span>
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseDatasets;
