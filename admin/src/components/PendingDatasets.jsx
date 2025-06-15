import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
import { Eye, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { DatasetReviewModal } from './DatasetReviewModal.jsx';

const PendingDatasets = () => {
  const [pendingDatasets, setPendingDatasets] = useState([]);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch pending datasets
  const fetchPendingDatasets = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('/dataset/pending-dataset');
      console.log('Pending datasets:', res.data.datasets);
      setPendingDatasets(res.data.datasets);
    } catch (err) {
      console.error('Error fetching pending datasets:', err);
      toast.error('Failed to fetch pending datasets');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPendingDatasets();
  }, []);

  // Handle direct approve/reject actions (quick actions)
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/dataset/update-status/${id}`, { status });
      setPendingDatasets(prev => prev.filter(dataset => dataset._id !== id));
      console.log(`${status} successfully`);
      toast.success(`Dataset ${status} successfully!`);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle opening review modal
  const handleReview = (dataset) => {
    setSelectedDataset(dataset);
    setIsModalOpen(true);
  };

  // Handle status update from modal
  const handleModalStatusUpdate = (datasetId, status) => {
    // Remove the dataset from pending list
    setPendingDatasets(prev => prev.filter(dataset => dataset._id !== datasetId));
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDataset(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Dataset Approvals</CardTitle>
          <CardDescription>Loading pending datasets...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <div className="text-gray-500">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Pending Dataset Approvals</CardTitle>
          <CardDescription>
            Datasets waiting for admin review and approval ({pendingDatasets.length} pending)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingDatasets.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">No pending datasets found</div>
              <Button 
                variant="outline" 
                onClick={fetchPendingDatasets}
                className="mt-4"
              >
                Refresh
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead>Seller</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingDatasets.map((dataset) => (
                  <TableRow key={dataset._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{dataset.datasetTitle}</div>
                        <div className="text-sm text-gray-500">
                          {dataset.originalFiles?.length || 0} files
                          {dataset.tags && dataset.tags.length > 0 && (
                            <span className="ml-2">
                              • {dataset.tags.slice(0, 2).join(', ')}
                              {dataset.tags.length > 2 && '...'}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{dataset.seller || "N/A"}</div>
                        <div className="text-sm text-gray-500">{dataset.uploadedBy}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{dataset.category}</Badge>
                    </TableCell>
                    <TableCell>{new Date(dataset.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="font-medium">${dataset.price}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReview(dataset)}
                          className="flex-1 min-w-[100px] border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-700 text-white"
                          onClick={() => handleStatusUpdate(dataset._id, 'approved')}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dataset Review Modal */}
      <DatasetReviewModal
        dataset={selectedDataset}
        open={isModalOpen}
        onOpenChange={handleModalClose}
        onStatusUpdate={handleModalStatusUpdate}
      />
    </>
  );
};

export { PendingDatasets };

// import React, { useEffect, useState } from 'react';
// import axios from '../api/axios.js'; // adjust path
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
// import { Button } from './ui/button.jsx';
// import { Badge } from './ui/badge.jsx';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
// import { Eye, Check, X } from 'lucide-react';
// import { toast } from 'react-toastify';

// const PendingDatasets = ({ onReview }) => {
//   const [pendingDatasets, setPendingDatasets] = useState([]);

//   useEffect(() => {
//     const fetchPending = async () => {
//       try {
//         const res = await axios.get('/dataset/pending-dataset');
//         console.log(res.data.datasets);

//         setPendingDatasets(res.data.datasets);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchPending();
//   }, []);

//   const handleStatusUpdate = async (id, status) => {
//     try {
//       await axios.patch(`/dataset/update-status/${id}`, { status });
//       setPendingDatasets(prev => prev.filter(dataset => dataset._id !== id));
//       console.log("Approved successfully")
//        toast.success(`Dataset ${status} successfully!`);
//     } catch (err) {
//       toast.error(`Failed to ${status} dataset`);
//       console.error(err);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Pending Dataset Approvals</CardTitle>
//         <CardDescription>Datasets waiting for admin review and approval</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Dataset</TableHead>
//               <TableHead>Seller</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Upload Date</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {pendingDatasets.map((dataset) => (
//               <TableRow key={dataset._id}>
//                 <TableCell>
//                   <div>
//                     <div className="font-medium">{dataset.datasetTitle}</div>
//                     <div className="text-sm text-gray-500">
//                       {/* Assume dataset size and samples are in metadata if needed */}
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div>
//                     <div className="font-medium">{dataset.seller || "N/A"}</div>
//                     <div className="text-sm text-gray-500">{dataset.uploadedBy}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="outline">{dataset.category}</Badge>
//                 </TableCell>
//                 <TableCell>{new Date(dataset.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell className="font-medium">${dataset.price}</TableCell>
//                 <TableCell>
//                   {/* <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => onReview(dataset)}
//                     >
//                       <Eye className="h-4 w-4 mr-1" />
//                       Review
//                     </Button>
//                     <Button
//                       variant="default"
//                       size="sm"
//                       className="bg-green-600 hover:bg-green-700"
//                       onClick={() => handleStatusUpdate(dataset._id, 'approved')}
//                     >
//                       <Check className="h-4 w-4 mr-1" />
//                       Approve
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="bg-red-600 hover:bg-red-700"
//                       onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
//                     >
//                       <X className="h-4 w-4 mr-1" />
//                       Reject           
//                     </Button>
//                   </div> */}

//                   {/* <div className="flex space-x-2">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => onReview(dataset)}
//                     className="flex-1 min-w-[100px]"
//                   >
//                     <Eye className="h-4 w-4 mr-1" />
//                     Review
//                   </Button>
//                   <Button
//                     variant="default"
//                     size="sm"
//                     className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1 min-w-[100px]"
//                     onClick={() => handleStatusUpdate(dataset._id, 'approved')}
//                   >
//                     <Check className="h-4 w-4 mr-1" />
//                     Approve
//                   </Button>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     className="bg-rose-500 hover:bg-rose-600 text-white flex-1 min-w-[100px]"
//                     onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
//                   >
//                     <X className="h-4 w-4 mr-1" />
//                     Reject
//                   </Button>
//                   </div> */}


//                   {/* <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => onReview(dataset)}
//                       className="flex-1 min-w-[100px] border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
//                     >
//                       <Eye className="h-4 w-4 mr-1" />
//                       Review
//                     </Button>
//                     <Button
//                       variant="default"
//                       size="sm"
//                       className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-700 text-white"
//                       onClick={() => handleStatusUpdate(dataset._id, 'approved')}
//                     >
//                       <Check className="h-4 w-4 mr-1" />
//                       Approve
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white"
//                       onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
//                     >
//                       <X className="h-4 w-4 mr-1" />
//                       Reject
//                     </Button>
//                   </div> */}

//                   <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => onReview(dataset)}
//                       className="flex-1 min-w-[100px] border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600"
//                     >
//                       <Eye className="h-4 w-4 mr-1" />
//                       Review
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-700 text-white"
//                       onClick={() => handleStatusUpdate(dataset._id, 'approved')}
//                     >
//                       <Check className="h-4 w-4 mr-1" />
//                       Approve
//                     </Button>
//                     <Button
//                       size="sm"
//                       className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white"
//                       onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
//                     >
//                       <X className="h-4 w-4 mr-1" />
//                       Reject
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export { PendingDatasets };














// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
// // import { Button } from './ui/button.jsx';
// // import { Badge } from './ui/badge.jsx';
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow
// // } from './ui/table.jsx';
// // import { Eye, Check, X } from 'lucide-react';

// // const pendingDatasets = [
// //   {
// //     id: 1,
// //     title: 'Medical Image Classification Dataset',
// //     category: 'Computer Vision',
// //     seller: 'Dr. Sarah Chen',
// //     email: 'sarah.chen@medtech.com',
// //     uploadDate: '2024-05-28',
// //     price: '$299',
// //     size: '2.4 GB',
// //     samples: 15000,
// //   },
// //   {
// //     id: 2,
// //     title: 'Financial Sentiment Analysis Dataset',
// //     category: 'NLP',
// //     seller: 'FinanceAI Corp',
// //     email: 'data@financeai.com',
// //     uploadDate: '2024-05-27',
// //     price: '$149',
// //     size: '456 MB',
// //     samples: 50000,
// //   },
// //   {
// //     id: 3,
// //     title: 'Speech Recognition Training Data',
// //     category: 'Audio',
// //     seller: 'VoiceTech Solutions',
// //     email: 'datasets@voicetech.io',
// //     uploadDate: '2024-05-26',
// //     price: '$399',
// //     size: '8.7 GB',
// //     samples: 25000,
// //   },
// // ];

// // export const PendingDatasets = ({ onReview }) => {
// //   return (
// //     <Card>
// //       <CardHeader>
// //         <CardTitle>Pending Dataset Approvals</CardTitle>
// //         <CardDescription>Datasets waiting for admin review and approval</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <Table>
// //           <TableHeader>
// //             <TableRow>
// //               <TableHead>Dataset</TableHead>
// //               <TableHead>Seller</TableHead>
// //               <TableHead>Category</TableHead>
// //               <TableHead>Upload Date</TableHead>
// //               <TableHead>Price</TableHead>
// //               <TableHead>Actions</TableHead>
// //             </TableRow>
// //           </TableHeader>
// //           <TableBody>
// //             {pendingDatasets.map((dataset) => (
// //               <TableRow key={dataset.id}>
// //                 <TableCell>
// //                   <div>
// //                     <div className="font-medium">{dataset.title}</div>
// //                     <div className="text-sm text-gray-500">
// //                       {dataset.size} • {dataset.samples.toLocaleString()} samples
// //                     </div>
// //                   </div>
// //                 </TableCell>
// //                 <TableCell>
// //                   <div>
// //                     <div className="font-medium">{dataset.seller}</div>
// //                     <div className="text-sm text-gray-500">{dataset.email}</div>
// //                   </div>
// //                 </TableCell>
// //                 <TableCell>
// //                   <Badge variant="outline">{dataset.category}</Badge>
// //                 </TableCell>
// //                 <TableCell>{dataset.uploadDate}</TableCell>
// //                 <TableCell className="font-medium">{dataset.price}</TableCell>
// //                 <TableCell>
// //                   <div className="flex space-x-2">
// //                     <Button
// //                       variant="outline"
// //                       size="sm"
// //                       onClick={() => onReview(dataset)}
// //                     >
// //                       <Eye className="h-4 w-4 mr-1" />
// //                       Review
// //                     </Button>
// //                     <Button
// //                       variant="default"
// //                       size="sm"
// //                       className="bg-green-600 hover:bg-green-700"
// //                     >
// //                       <Check className="h-4 w-4 mr-1" />
// //                       Approve
// //                     </Button>
// //                     <Button variant="destructive" size="sm">
// //                       <X className="h-4 w-4 mr-1" />
// //                       Reject
// //                     </Button>
// //                   </div>
// //                 </TableCell>
// //               </TableRow>
// //             ))}
// //           </TableBody>
// //         </Table>
// //       </CardContent>
// //     </Card>
// //   );
// // };
