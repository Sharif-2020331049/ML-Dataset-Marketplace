import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from './ui/sidebar.jsx';
import { Badge } from './ui/badge.jsx';
import { LayoutDashboard, FileText, Database, Users } from 'lucide-react';

const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'pending',
    title: 'Pending Datasets',
    icon: FileText,
    badge: 12,
  },
  {
    id: 'approved',
    title: 'Approved Datasets',
    icon: Database,
  },
  {
    id: 'rejected',
    title: 'Rejected Datasets',
    icon: FileText,
  },
  {
    id: 'users',
    title: 'User Management',
    icon: Users,
  },
];

const AppSidebar = ({ activeTab, onTabChange }) => {
  return (
    <Sidebar className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">OpenDataX</h2>
            <p className="text-sm text-gray-500">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export {AppSidebar} ;
