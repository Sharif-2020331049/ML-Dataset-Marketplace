import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js'; // adjust path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
import { Eye, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';

const PendingDatasets = ({ onReview }) => {
  const [pendingDatasets, setPendingDatasets] = useState([]);

  useEffect(() => {
    const fetchPending = async () => {
      try {
        const res = await axios.get('/dataset/pending-dataset');
        console.log(res.data.datasets);

        setPendingDatasets(res.data.datasets);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPending();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/dataset/update-status/${id}`, { status });
      setPendingDatasets(prev => prev.filter(dataset => dataset._id !== id));
      console.log("Approved successfully")
       toast.success(`Dataset ${status} successfully!`);
    } catch (err) {
      toast.error(`Failed to ${status} dataset`);
      console.error(err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Dataset Approvals</CardTitle>
        <CardDescription>Datasets waiting for admin review and approval</CardDescription>
      </CardHeader>
      <CardContent>
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
                      {/* Assume dataset size and samples are in metadata if needed */}
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
                  {/* <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReview(dataset)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusUpdate(dataset._id, 'approved')}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject           
                    </Button>
                  </div> */}

                  {/* <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReview(dataset)}
                    className="flex-1 min-w-[100px]"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1 min-w-[100px]"
                    onClick={() => handleStatusUpdate(dataset._id, 'approved')}
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="bg-rose-500 hover:bg-rose-600 text-white flex-1 min-w-[100px]"
                    onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  </div> */}


                  {/* <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReview(dataset)}
                      className="flex-1 min-w-[100px] border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 min-w-[100px] bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleStatusUpdate(dataset._id, 'approved')}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 min-w-[100px] bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleStatusUpdate(dataset._id, 'rejected')}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div> */}

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onReview(dataset)}
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
      </CardContent>
    </Card>
  );
};

export { PendingDatasets };














// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
// import { Button } from './ui/button.jsx';
// import { Badge } from './ui/badge.jsx';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from './ui/table.jsx';
// import { Eye, Check, X } from 'lucide-react';

// const pendingDatasets = [
//   {
//     id: 1,
//     title: 'Medical Image Classification Dataset',
//     category: 'Computer Vision',
//     seller: 'Dr. Sarah Chen',
//     email: 'sarah.chen@medtech.com',
//     uploadDate: '2024-05-28',
//     price: '$299',
//     size: '2.4 GB',
//     samples: 15000,
//   },
//   {
//     id: 2,
//     title: 'Financial Sentiment Analysis Dataset',
//     category: 'NLP',
//     seller: 'FinanceAI Corp',
//     email: 'data@financeai.com',
//     uploadDate: '2024-05-27',
//     price: '$149',
//     size: '456 MB',
//     samples: 50000,
//   },
//   {
//     id: 3,
//     title: 'Speech Recognition Training Data',
//     category: 'Audio',
//     seller: 'VoiceTech Solutions',
//     email: 'datasets@voicetech.io',
//     uploadDate: '2024-05-26',
//     price: '$399',
//     size: '8.7 GB',
//     samples: 25000,
//   },
// ];

// export const PendingDatasets = ({ onReview }) => {
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
//               <TableRow key={dataset.id}>
//                 <TableCell>
//                   <div>
//                     <div className="font-medium">{dataset.title}</div>
//                     <div className="text-sm text-gray-500">
//                       {dataset.size} • {dataset.samples.toLocaleString()} samples
//                     </div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div>
//                     <div className="font-medium">{dataset.seller}</div>
//                     <div className="text-sm text-gray-500">{dataset.email}</div>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <Badge variant="outline">{dataset.category}</Badge>
//                 </TableCell>
//                 <TableCell>{dataset.uploadDate}</TableCell>
//                 <TableCell className="font-medium">{dataset.price}</TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
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
//                     >
//                       <Check className="h-4 w-4 mr-1" />
//                       Approve
//                     </Button>
//                     <Button variant="destructive" size="sm">
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
