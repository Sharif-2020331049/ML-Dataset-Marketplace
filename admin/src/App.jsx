// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import SignIn from "./pages/SignIn.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import NotFound from "./pages/NotFound";
import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/signin" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  </QueryClientProvider>
);

export default App;
