import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Eye, User, Calendar, FileText, Tag, Star, Shield } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import axios from '../api/axios.js';

const DatasetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await axios.get(`/dataset/${id}`);
        setDataset(response.data.dataset);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dataset:', error);
        setLoading(false);
      }
    };

    fetchDataset();
  }, [id]);

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
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

  const handlePurchaseClick = () => {
    navigate(`/dataset/${id}/payment`);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!dataset && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Failed to load dataset. Please try again later.</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(dataset.category)}`}>
                  {dataset.category.toUpperCase()}
                </span>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>0</span> {/* Views not in API, using placeholder */}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>0</span> {/* Downloads not in API, using placeholder */}
                  </div>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{dataset.datasetTitle}</h1>
              <p className="text-lg text-gray-600 mb-6">{dataset.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {dataset.tags?.length ? dataset.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                )) :
                  (
                    <p className="text-sm text-gray-500">No tags provided.</p>
                  )}
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {['overview', 'samples', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab
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

            {/* Tab Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              {activeTab === 'overview' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Dataset Details</h3>
                  <div className="prose max-w-none text-gray-600">
                    <p className="mb-4">{dataset.description}</p>
                    <p className="mb-4">This dataset contains high-quality data for {dataset.category.toLowerCase()} processing tasks.</p>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">License</div>
                          <div className="font-medium">{dataset.license}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Upload Date</div>
                          <div className="font-medium">{new Date(dataset.createdAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Uploaded By</div>
                          <div className="font-medium">{dataset.uploadedBy?.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm text-gray-500">Last Updated</div>
                          <div className="font-medium">{new Date(dataset.updatedAt).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'samples' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Sample Data</h3>
                  <p className="text-gray-600 mb-6">
                    Preview some examples from this dataset to understand its content and quality.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataset.samplePreview && (
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={dataset.samplePreview.url} alt="Sample preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {dataset.thumbnail && (
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={dataset.thumbnail.url} alt="Thumbnail" className="w-full h-full object-cover" />
                      </div>
                    )}
                    {dataset.originalFiles?.map((file, index) => (
                      <div key={index} className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img src={file.url} alt={`Original file ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Reviews & Ratings</h3>
                  <div className="text-gray-600">
                    <p>No reviews yet for this dataset.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900">${dataset.price}</div>
              </div>
              <Button
                size="lg"
                className="w-full mb-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handlePurchaseClick}
              >
                Purchase Dataset
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Add to Wishlist
              </Button>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seller Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{dataset.uploadedBy}</div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Profile
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dataset Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Downloads</span>
                  <span className="font-medium">{dataset.downloads ?? 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Views</span>
                  <span className="font-medium">{dataset.views ?? 0}</span>

                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Files</span>
                  <span className="font-medium">{dataset.originalFiles?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetails;