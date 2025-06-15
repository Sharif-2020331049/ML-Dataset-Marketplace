import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
import { Eye, Check } from 'lucide-react';
import axios from '../api/axios.js';
import { toast } from 'react-toastify';

const RejectedDatasets = ({ onReview }) => {
  const [rejectedDatasets, setRejectedDatasets] = useState([]);

  const fetchRejected = async () => {
    try {
      const res = await axios.get('/dataset/rejected-dataset');
      setRejectedDatasets(res.data);
    } catch (error) {
      toast.error("Failed to load rejected datasets");
      console.error(error);
    }
  };



  const [restoringId, setRestoringId] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    try {
      setRestoringId(id);
      await axios.patch(`/dataset/update-status/${id}`, { status });

      // Update local state by removing the restored dataset
      setRejectedDatasets(prev => prev.filter(dataset => dataset._id !== id));

      toast.success("Dataset restored as a Pending dataset");
    } catch (err) {
      toast.error("Failed to restore dataset");
      console.error(err);
    } finally {
      setRestoringId(null);
    }
  };

  useEffect(() => {
    fetchRejected();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className='p-1'>Rejected Datasets</CardTitle>
        <CardDescription>Datasets that have been rejected with reasons</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rejected Date</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rejectedDatasets.map((dataset) => (
              <TableRow key={dataset._id}>
                <TableCell>
                  <div className="font-medium">{dataset.title}</div>
                  <div className="text-sm text-gray-500">${dataset.price}</div>
                </TableCell>
                <TableCell>{dataset.sellerName || "Unknown"}</TableCell>
                <TableCell>
                  <Badge variant="outline">{dataset.category}</Badge>
                </TableCell>
                <TableCell>{new Date(dataset.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="text-sm text-red-600 max-w-xs">
                    {dataset.rejectionReason || "No reason provided"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
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
                      onClick={() => handleStatusUpdate(dataset._id, 'pending')}
                      disabled={restoringId === dataset._id}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Restore
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

export { RejectedDatasets };



// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
// import { Button } from './ui/button.jsx';
// import { Badge } from './ui/badge.jsx';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
// import { Eye, Check } from 'lucide-react';

// const rejectedDatasets = [
//   {
//     id: 1,
//     title: 'Low Quality Image Dataset',
//     category: 'Computer Vision',
//     seller: 'QuickData Solutions',
//     rejectedDate: '2024-05-20',
//     reason: 'Poor image quality, insufficient metadata',
//     price: '$79',
//   },
//   {
//     id: 2,
//     title: 'Scraped Social Media Data',
//     category: 'NLP',
//     seller: 'SocialScraper Inc',
//     rejectedDate: '2024-05-18',
//     reason: 'Privacy violations, unauthorized data collection',
//     price: '$149',
//   },
//   {
//     id: 3,
//     title: 'Incomplete Audio Dataset',
//     category: 'Audio',
//     seller: 'AudioMine Corp',
//     rejectedDate: '2024-05-16',
//     reason: 'Missing labels, corrupted files',
//     price: '$199',
//   },
// ];

// export const RejectedDatasets = ({ onReview }) => {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className='p-1'>Rejected Datasets</CardTitle>
//         <CardDescription>Datasets that have been rejected with reasons</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Dataset</TableHead>
//               <TableHead>Seller</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Rejected Date</TableHead>
//               <TableHead>Reason</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {rejectedDatasets.map((dataset) => (
//               <TableRow key={dataset.id}>
//                 <TableCell>
//                   <div className="font-medium">{dataset.title}</div>
//                   <div className="text-sm text-gray-500">{dataset.price}</div>
//                 </TableCell>
//                 <TableCell>{dataset.seller}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline">{dataset.category}</Badge>
//                 </TableCell>
//                 <TableCell>{dataset.rejectedDate}</TableCell>
//                 <TableCell>
//                   <div className="text-sm text-red-600 max-w-xs">
//                     {dataset.reason}
//                   </div>
//                 </TableCell>
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
//                     <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
//                       <Check className="h-4 w-4 mr-1" />
//                       Restore
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
