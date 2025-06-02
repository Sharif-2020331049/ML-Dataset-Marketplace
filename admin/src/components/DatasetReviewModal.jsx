import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Textarea } from './ui/textarea.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Check, X, Download, Play, Image } from 'lucide-react';
import { useState } from 'react';

export const DatasetReviewModal = ({ dataset, open, onOpenChange }) => {
  const [rejectionReason, setRejectionReason] = useState('');

  if (!dataset) return null;

  const sampleFiles = [
    { type: 'image', name: 'sample_001.jpg', preview: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop' },
    { type: 'image', name: 'sample_002.jpg', preview: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop' },
    { type: 'audio', name: 'audio_sample.mp3', preview: null },
    { type: 'text', name: 'data_sample.csv', preview: null },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dataset Review: {dataset.title}</DialogTitle>
          <DialogDescription>
            Review dataset details and approve or reject the submission
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Dataset Information */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dataset Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">Category</label>
                  <div><Badge variant="outline">{dataset.category}</Badge></div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Price</label>
                  <div className="text-lg font-semibold">{dataset.price}</div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Description</label>
                  <div className="text-sm">
                    This dataset contains high-quality annotated data suitable for machine learning applications.
                    It includes comprehensive metadata and follows industry standards for data formatting.
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Size</label>
                    <div>{dataset.size || '2.4 GB'}</div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Samples</label>
                    <div>{dataset.samples ? dataset.samples.toLocaleString() : '15,000'}</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Tags</label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <Badge variant="secondary">machine-learning</Badge>
                    <Badge variant="secondary">computer-vision</Badge>
                    <Badge variant="secondary">medical</Badge>
                    <Badge variant="secondary">classification</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <label className="text-sm font-medium text-gray-500">Name</label>
                  <div>{dataset.seller}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="text-sm">{dataset.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Upload Date</label>
                  <div>{dataset.uploadDate}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sample Files Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sample Files</CardTitle>
                <CardDescription>Preview of dataset contents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {sampleFiles.map((file, index) => (
                    <div key={index} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium truncate">{file.name}</span>
                        {file.type === 'image' && <Image className="h-4 w-4 text-gray-400" />}
                        {file.type === 'audio' && <Play className="h-4 w-4 text-gray-400" />}
                        {file.type === 'text' && <Download className="h-4 w-4 text-gray-400" />}
                      </div>
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-full h-20 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-20 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">Preview unavailable</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Review Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Rejection Reason (Optional)</label>
                  <Textarea
                    placeholder="Provide a reason if rejecting this dataset..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Check className="h-4 w-4 mr-2" />
                    Approve Dataset
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Reject Dataset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
