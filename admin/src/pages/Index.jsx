import { useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from '../components/ui/button.jsx';
import { Input } from '../components/ui/input.jsx';
import { DatasetStats } from '../components/DatasetStats.jsx';
import { PendingDatasets } from '../components/PendingDatasets.jsx';
import ApprovedDatasets from '../components/ApprovedDatasets.jsx';
import { RejectedDatasets } from '../components/RejectedDatasets.jsx';
import { UserManagement } from '../components/UserManagement.jsx';
import { DatasetReviewModal } from '../components/DatasetReviewModal.jsx';
import { SidebarProvider } from '../components/ui/sidebar.jsx';
import { AppSidebar } from '../components/AppSidebar.jsx';
import { Search, Bell, Settings, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm.jsx';
import axios from '../api/axios.js';
import { toast } from 'react-toastify';

const Index = () => {
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalDatasets: 0,
    pendingApprovals: 0,
    totalUsers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch dataset statistics
        const datasetRes = await axios.get('/dataset/stats');
        const { statusCounts } = datasetRes.data;
        
        // Fetch user statistics
        const userRes = await axios.get('/user/stats');
        
        setStats({
          totalDatasets: statusCounts.approved + statusCounts.pending + statusCounts.rejected,
          pendingApprovals: statusCounts.pending,
          totalUsers: userRes.data.totalUsers,
          revenue: userRes.data.revenue || 94200 // Fallback to hardcoded value if not available
        });
        
      } catch (error) {
        console.error('Failed to load statistics:', error);
        toast.error('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleDatasetReview = (dataset) => {
    setSelectedDataset(dataset);
    setIsReviewModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    navigate('/signin');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Datasets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? 'Loading...' : stats.totalDatasets.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-80">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Pending Approval</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? 'Loading...' : stats.pendingApprovals}
                  </div>
                  <p className="text-xs opacity-80">Requires review</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? 'Loading...' : stats.totalUsers.toLocaleString()}
                  </div>
                  <p className="text-xs opacity-80">+234 this week</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium opacity-90">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {loading ? 'Loading...' : `$${(stats.revenue / 1000).toFixed(1)}K`}
                  </div>
                  <p className="text-xs opacity-80">+8% from last month</p>
                </CardContent>
              </Card>
            </div>
            <DatasetStats />
          </div>
        );
      case 'pending':
        return <PendingDatasets onReview={handleDatasetReview} />;
      case 'approved':
        return <ApprovedDatasets onReview={handleDatasetReview} />;
      case 'rejected':
        return <RejectedDatasets onReview={handleDatasetReview} />;
      case 'users':
        return <UserManagement />;
      case 'register-admin':
        return <RegisterForm/>;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-blue-50">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900">OpenDataX Admin</h1>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search datasets, users..."
                      className="pl-10 w-64"
                    />
                  </div>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
            {renderContent()}
          </main>
        </div>

        <DatasetReviewModal
          dataset={selectedDataset}
          open={isReviewModalOpen}
          onOpenChange={setIsReviewModalOpen}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;