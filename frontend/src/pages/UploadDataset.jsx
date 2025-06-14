import React, { useState } from 'react';
import { Upload, FileText, DollarSign, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { useRef } from 'react';
import axios from '../api/axios.js';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext.jsx';

const UploadDataset = () => {
  const [formData, setFormData] = useState({
    datasetTitle: '',
    category: '',
    description: '',
    price: '',
    tags: '',
    license: 'commercial',
  });
  const { navigate } = useContext(DataContext)
  const thumbnailInputRef = useRef(null);
  const datasetInputRef = useRef(null);
  const previewInputRef = useRef(null);

  const handleThumbnailClick = () => thumbnailInputRef.current?.click();
  const handleDatasetClick = () => datasetInputRef.current?.click();
  const handlePreviewClick = () => previewInputRef.current?.click();


  const [originalFiles, setOriginalFiles] = useState([]);
  const [samplePreview, setSamplePreview] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const resetForm = () => {
    setFormData({ datasetTitle: '', category: '', description: '', price: '', tags: '', license: 'commercial' });
    setThumbnail(null);
    setOriginalFiles(null);
    setSamplePreview(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData, originalFiles, samplePreview, thumbnail);

    if (!formData.datasetTitle || !formData.category || !formData.description || !formData.price || !thumbnail || !originalFiles) {
      toast.error("Please fill in all required fields and upload required files.");
      return;
    }
    // if (!window.confirm('Are you sure you want to submit this dataset for review?')) return;

    // Handle form submission logic here
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);

    });

    if (thumbnail) data.append("thumbnail", thumbnail);
    if (originalFiles && originalFiles.length > 0) {
      originalFiles.forEach(file => data.append("originalFiles", file));
    }



    // Safely append preview files if they exist
    if (samplePreview && samplePreview.length > 0) {
      samplePreview.forEach(file => data.append("samplePreview", file));
    }

    // console.log("Files to upload:");
    // console.log("Thumbnail:", thumbnail);
    // console.log("Original files:", originalFiles);
    // console.log("Preview files:", samplePreview);
 
    // return;

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token"); // Assuming you store JWT here

      if(!token) {
        toast.error('You have to SignIn first!')
        navigate('/login');
        return

      }
      const res = await axios.post("/dataset/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        // onUploadProgress: (progressEvent) => {
        //   const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        //   toast.info(`Uploading: ${percent}%`);
        // },
      });
      console.log("Upload success:", res.data);
      toast.success("Dataset uploaded successfully!");
      resetForm()
    } catch (error) {
      console.error("Upload failed:", error);
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Upload failed");
    } finally {
      setIsSubmitting(false);
    }


  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upload Your Dataset
            </h1>
            <p className="text-lg text-gray-600">
              Share your valuable data with the machine learning community
            </p>
          </div>

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
                      name="datasetTitle"
                      value={formData.datasetTitle}
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
                      <option value="Images">Images</option>
                      <option value="Audio">Audio</option>
                      <option value="Video">Video</option>
                      <option value="Text">Text</option>
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
                      Set to $0 for free datasets
                    </p>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-2" />
                  Upload Files
                </h2>

                <div className="space-y-6">
                  {/* Thumbnail Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thumbnail Image *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <div className="text-gray-900 mb-2">
                        Upload thumbnail image
                      </div>

                      {thumbnail && (
                        <p className="text-sm text-gray-700 mt-2">
                          Selected file: <span className="font-medium">{thumbnail.name}</span>
                        </p>
                      )}

                      {/* Thumbnail File Input */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={thumbnailInputRef}
                        onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" size="sm" onClick={handleThumbnailClick}>
                        Select Thumbnail
                      </Button>

                      <p className="text-sm text-gray-500 mt-2">
                        Upload a representative image for your dataset
                      </p>
                    </div>
                  </div>

                  {/* Main Dataset Files */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dataset Files *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <div className="text-lg font-medium text-gray-900 mb-2">
                        Drop your dataset files here
                      </div>
                      <div className="text-gray-600 mb-4">
                        or click to browse your computer
                      </div>

                      {/* Dataset Files Input */}
                      <input
                        type="file"
                        multiple
                        ref={datasetInputRef}
                        accept=".zip,.tar,.csv,.json"
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files);
                          setOriginalFiles((prev) => {
                            const existingNames = new Set(prev?.map(file => file.name));
                            const filteredNewFiles = newFiles.filter(file => !existingNames.has(file.name));
                            return prev ? [...prev, ...filteredNewFiles] : filteredNewFiles;
                          });
                        }}

                        className="hidden"
                      />


                      <Button type="button" variant="outline" onClick={handleDatasetClick}>
                        Select Files
                      </Button>


                      <p className="text-sm text-gray-500 mt-4">
                        Supported formats: ZIP, TAR, CSV, JSON, and more. Max size: 10GB
                      </p>

                      {originalFiles && originalFiles.length > 0 && (
                        <div className="mt-3 text-left">
                          <p className="text-sm font-medium text-gray-700 mb-1">Selected Files:</p>
                          <p className="text-sm text-gray-700">
                            {originalFiles.map(file => file.name).join(', ')}
                          </p>
                        </div>
                      )}


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
                        ref={previewInputRef}
                        onChange={(e) => {
                          const newFiles = Array.from(e.target.files);
                          setSamplePreview(prev => {
                            const existingNames = new Set(prev?.map(file => file.name));
                            const filteredNewFiles = newFiles.filter(file => !existingNames.has(file.name));
                            return prev ? [...prev, ...filteredNewFiles] : filteredNewFiles;
                          });
                        }}
                        className="hidden"
                      />

                      <Button type="button" variant="outline" size="sm" onClick={handlePreviewClick}>
                        Select Samples
                      </Button>

                      {samplePreview && samplePreview.length > 0 && (
                        <div className="mt-3 mb-3 text-left">
                          <p className="text-sm font-medium text-gray-700 mb-1">Selected Samples:</p>
                          <p className="text-sm text-gray-700">
                            {Array.from(samplePreview).map(file => file.name).join(', ')}
                          </p>
                        </div>
                      )}

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
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-1  animate-spin" />
                      Submitting...
                    </>
                  ) : ('Submit for Review')}
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
