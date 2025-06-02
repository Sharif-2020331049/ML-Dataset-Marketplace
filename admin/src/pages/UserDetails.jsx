import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Badge } from '../components/ui/badge.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table.jsx';
import { ArrowLeft, Mail, Calendar, Upload, ShoppingCart } from 'lucide-react';

const UserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  // Mock user data - in real app this would come from an API
  const user = {
    id: parseInt(userId || '1'),
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@medtech.com',
    role: 'Seller',
    joinDate: '2024-03-15',
    uploads: 5,
    purchases: 12,
    status: 'Active',
    bio: 'Medical data scientist specializing in healthcare datasets and AI applications.',
    lastLogin: '2024-06-01 10:30 AM'
  };

  const uploadedDatasets = [
    { id: 1, title: 'Medical Imaging Dataset', uploadDate: '2024-05-15', status: 'Approved', price: '$299' },
    { id: 2, title: 'Patient Records Anonymized', uploadDate: '2024-04-22', status: 'Pending', price: '$450' },
    { id: 3, title: 'Clinical Trial Data', uploadDate: '2024-03-18', status: 'Approved', price: '$800' },
  ];

  const purchasedDatasets = [
    { id: 1, title: 'Financial Market Data', purchaseDate: '2024-05-20', price: '$199' },
    { id: 2, title: 'Social Media Analytics', purchaseDate: '2024-04-15', price: '$350' },
    { id: 3, title: 'E-commerce Transactions', purchaseDate: '2024-03-25', price: '$275' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Suspended':
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case 'Approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Role:</span>
                  <Badge variant={user.role === 'Seller' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  {getStatusBadge(user.status)}
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Join Date:</span>
                  <span className="text-sm">{user.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Last Login:</span>
                  <span className="text-sm">{user.lastLogin}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  <CardTitle>Uploaded Datasets</CardTitle>
                </div>
                <CardDescription>Datasets uploaded by this user</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Upload Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedDatasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell className="font-medium">{dataset.title}</TableCell>
                        <TableCell>{dataset.uploadDate}</TableCell>
                        <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                        <TableCell>{dataset.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  <CardTitle>Purchased Datasets</CardTitle>
                </div>
                <CardDescription>Datasets purchased by this user</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Purchase Date</TableHead>
                      <TableHead>Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchasedDatasets.map((dataset) => (
                      <TableRow key={dataset.id}>
                        <TableCell className="font-medium">{dataset.title}</TableCell>
                        <TableCell>{dataset.purchaseDate}</TableCell>
                        <TableCell>{dataset.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
