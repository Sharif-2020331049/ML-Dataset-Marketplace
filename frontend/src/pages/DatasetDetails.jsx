import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, Eye, User, Calendar, FileText, Tag, Star, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';

const DatasetDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  const dataset = {
    id: '1',
    title: 'Large-Scale Image Classification Dataset',
    description: 'A comprehensive collection of over 100,000 high-resolution labeled images across 1000+ categories...',
    fullDescription: 'This dataset represents one of the most comprehensive image classification collections available today...\n\n...',
    category: 'image',
    price: 299,
    originalPrice: 399,
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    seller: {
      name: 'AI Research Lab',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face',
      rating: 4.8,
      datasets: 23,
    },
    downloads: 1234,
    views: 5678,
    uploadDate: '2024-01-15',
    lastUpdated: '2024-02-01',
    fileSize: '45.2 GB',
    fileCount: 102847,
    format: 'JPEG, JSON',
    license: 'Commercial Use Allowed',
    tags: ['Computer Vision', 'Classification', 'Deep Learning', 'CNN', 'Object Recognition'],
    samples: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop',
    ],
    reviews: [
      {
        id: 1,
        user: 'Dr. Sarah Chen',
        rating: 5,
        date: '2024-01-20',
        comment: 'Excellent dataset quality...',
      },
      {
        id: 2,
        user: 'Marcus Rodriguez',
        rating: 4,
        date: '2024-01-18',
        comment: 'Great for training CNNs...',
      },
    ],
  };

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(dataset.category)}`}>
                  {dataset.category.toUpperCase()}
                </span>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{dataset.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{dataset.downloads}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {dataset.title}
              </h1>

              <p className="text-lg text-gray-600 mb-6">{dataset.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {dataset.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {['overview', 'samples', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Dataset Details</h3>
                  <div className="prose max-w-none text-gray-600">
                    {dataset.fullDescription.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InfoItem icon={<FileText />} label="File Count" value={`${dataset.fileCount.toLocaleString()} files`} />
                      <InfoItem icon={<Download />} label="File Size" value={dataset.fileSize} />
                      <InfoItem icon={<Calendar />} label="Upload Date" value={new Date(dataset.uploadDate).toLocaleDateString()} />
                    </div>
                    <div className="space-y-4">
                      <InfoItem icon={<Shield />} label="License" value={dataset.license} />
                      <InfoItem icon={<FileText />} label="Format" value={dataset.format} />
                      <InfoItem icon={<Calendar />} label="Last Updated" value={new Date(dataset.lastUpdated).toLocaleDateString()} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'samples' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Data</h3>
                  <p className="text-gray-600 mb-6">Preview some examples from this dataset.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataset.samples.map((sample, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={sample} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Reviews & Ratings</h3>
                  <div className="space-y-6">
                    {dataset.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-gray-900">{review.user}</div>
                          <div className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">${dataset.price}</div>
                {dataset.originalPrice && (
                  <div className="text-lg text-gray-500 line-through">${dataset.originalPrice}</div>
                )}
              </div>
              <Button className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Purchase Dataset</Button>
              <Button variant="outline" className="w-full">Add to Wishlist</Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center mb-4">
                <img src={dataset.seller.avatar} alt={dataset.seller.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <div className="font-medium text-gray-900">{dataset.seller.name}</div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    <span className="text-sm text-gray-600">{dataset.seller.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 mb-4">{dataset.seller.datasets} datasets published</div>
              <Button variant="outline" className="w-full">View Profile</Button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset Stats</h3>
              <div className="space-y-3">
                <Stat label="Downloads" value={dataset.downloads} />
                <Stat label="Views" value={dataset.views} />
                <Stat label="File Size" value={dataset.fileSize} />
                <Stat label="Files" value={dataset.fileCount.toLocaleString()} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center">
    <div className="text-gray-400 mr-3">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

const Stat = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export default DatasetDetails;
