import React, { useState } from 'react';
import { Upload, FileText, DollarSign, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';

const UploadDataset = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    tags: '',
    license: 'commercial',
  });
  const [files, setFiles] = useState(null);
  const [previewFiles, setPreviewFiles] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, files, previewFiles);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upload Your Dataset
            </h1>
            <p className="text-lg text-gray-600">
              Share your valuable data with the machine learning community
            </p>
          </div>

          {/* Upload Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dataset Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter a descriptive title for your dataset"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="image">Images</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                      <option value="text">Text</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License *
                    </label>
                    <select
                      name="license"
                      value={formData.license}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="commercial">Commercial Use Allowed</option>
                      <option value="research">Research Use Only</option>
                      <option value="creative">Creative Commons</option>
                      <option value="custom">Custom License</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={6}
                      placeholder="Provide a detailed description of your dataset, including its purpose, content, and potential use cases..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="machine learning, computer vision, classification (comma-separated)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Add relevant tags to help users discover your dataset
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2" />
                  Pricing
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (Taka) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        step="1"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Set to ৳0 for free datasets
                    </p>
                  </div>
                </div>
              </div>

              {/* ********************** File Upload****************** */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-2" />
                  Upload Files
                </h2>

                <div className="space-y-6">
                  {/* Main Dataset Files */}
                {/* Dataset Files */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Dataset Files *
  </label>
  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <div className="text-lg font-medium text-gray-900 mb-2">
      Drop your dataset files here
    </div>
    <div className="text-gray-600 mb-4">or click to browse your computer</div>

    <input
      type="file"
      multiple
      onChange={(e) => setFiles(e.target.files)}
      className="hidden"
      id="dataset-files"
    />
    
    <label htmlFor="dataset-files" className="inline-block cursor-pointer">
      <Button type="button" variant="outline">
        Select Files
      </Button>
    </label>

    <p className="text-sm text-gray-500 mt-4">
      Supported formats: ZIP, TAR, CSV, JSON, and more. Max size: 10GB
    </p>
  </div>
</div>

                  {/* Preview/Sample Files */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview Samples
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Eye className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-gray-900 mb-2">
                        Upload sample files for preview
                      </div>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => setPreviewFiles(e.target.files)}
                        className="hidden"
                        id="preview-files"
                      />
                      <label htmlFor="preview-files">
                        {/* <Button type="button" variant="outline" size="sm" className="cursor-pointer"> */}
                          Select Samples
                        {/* </Button> */}
                      </label>
                      <p className="text-sm text-gray-500 mt-2">
                        Help buyers understand your dataset with sample files
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Review Process
                </h3>
                <p className="text-blue-800">
                  Your dataset will be reviewed by our admin team to ensure quality and compliance with our guidelines. 
                  This process typically takes 2-3 business days. You'll be notified via email once the review is complete.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                  Submit for Review
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDataset;
