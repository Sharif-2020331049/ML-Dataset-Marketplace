
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { Badge } from './ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
import { Input } from './ui/input.jsx';
import { Eye, Edit, Trash, Ban } from 'lucide-react';
import axios from '../api/axios.js'; // adjust path as needed

const ApprovedDatasets = ({ onReview }) => {
  const [approvedDatasets, setApprovedDatasets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await axios.get('/dataset/approved-dataset');
        setApprovedDatasets(res.data);
      } catch (err) {
        console.error('Error fetching approved datasets:', err);
      }
    };

    fetchApproved();
  }, []);

  const filteredDatasets = approvedDatasets.filter((dataset) =>
    dataset.datasetTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.uploadedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dataset.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className='p-1'>Approved Datasets</CardTitle>
            <CardDescription>Manage and monitor approved datasets</CardDescription>
          </div>
          <Input
            placeholder="Search datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-32 sm:w-40 md:w-48"
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dataset</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Approved Date</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDatasets.map((dataset) => (
              <TableRow key={dataset._id}>
                <TableCell>
                  <div className="font-medium">{dataset.datasetTitle}</div>
                  <div className="text-sm text-gray-500">${dataset.price}</div>
                </TableCell>
                <TableCell>{dataset.uploadedBy}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{dataset.category}</Badge>
                </TableCell>
                <TableCell>{new Date(dataset.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>{dataset.downloads?.toLocaleString() || 0}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="ml-1">{dataset.rating || 'N/A'}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => onReview(dataset)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700">
                      <Ban className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash className="h-4 w-4" />
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

export default ApprovedDatasets;



































// import { useState } from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.jsx';
// import { Button } from './ui/button.jsx';
// import { Badge } from './ui/badge.jsx';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table.jsx';
// import { Input } from './ui/input.jsx';
// import { Eye, Edit, Trash, Ban } from 'lucide-react';

// const approvedDatasets = [
//   {
//     id: 1,
//     title: 'CIFAR-10 Enhanced Dataset',
//     category: 'Computer Vision',
//     seller: 'DataVision Inc',
//     approvedDate: '2024-05-15',
//     price: '$199',
//     downloads: 1243,
//     rating: 4.8,
//   },
//   {
//     id: 2,
//     title: 'E-commerce Product Reviews',
//     category: 'NLP',
//     seller: 'TextMining Co',
//     approvedDate: '2024-05-10',
//     price: '$99',
//     downloads: 892,
//     rating: 4.6,
//   },
//   {
//     id: 3,
//     title: 'Stock Market Time Series',
//     category: 'Time Series',
//     seller: 'QuantData Ltd',
//     approvedDate: '2024-05-08',
//     price: '$299',
//     downloads: 567,
//     rating: 4.9,
//   },
// ];

// const ApprovedDatasets = ({ onReview }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredDatasets = approvedDatasets.filter((dataset) =>
//     dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     dataset.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     dataset.category.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <div>
//             <CardTitle className='p-1'>Approved Datasets</CardTitle>
//             <CardDescription>Manage and monitor approved datasets</CardDescription>
//           </div>
//           <Input
//             placeholder="Search datasets..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//            className="w-32 sm:w-40 md:w-48"

//           />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Dataset</TableHead>
//               <TableHead>Seller</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead>Approved Date</TableHead>
//               <TableHead>Downloads</TableHead>
//               <TableHead>Rating</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filteredDatasets.map((dataset) => (
//               <TableRow key={dataset.id}>
//                 <TableCell>
//                   <div className="font-medium">{dataset.title}</div>
//                   <div className="text-sm text-gray-500">{dataset.price}</div>
//                 </TableCell>
//                 <TableCell>{dataset.seller}</TableCell>
//                 <TableCell>
//                   <Badge variant="secondary">{dataset.category}</Badge>
//                 </TableCell>
//                 <TableCell>{dataset.approvedDate}</TableCell>
//                 <TableCell>{dataset.downloads.toLocaleString()}</TableCell>
//                 <TableCell>
//                   <div className="flex items-center">
//                     <span className="text-yellow-500">★</span>
//                     <span className="ml-1">{dataset.rating}</span>
//                   </div>
//                 </TableCell>
//                 <TableCell>
//                   <div className="flex space-x-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => onReview(dataset)}
//                     >
//                       <Eye className="h-4 w-4" />
//                     </Button>
//                     <Button variant="outline" size="sm">
//                       <Edit className="h-4 w-4" />
//                     </Button>
//                     <Button variant="outline" size="sm" className="text-orange-600 hover:text-orange-700">
//                       <Ban className="h-4 w-4" />
//                     </Button>
//                     <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
//                       <Trash className="h-4 w-4" />
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

// export default ApprovedDatasets;
