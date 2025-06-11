import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Homepage from "./pages/Index.jsx";
import BrowseDatasets from "./pages/BrowseDatasets.jsx";
import DatasetDetails from "./pages/DatasetDetails.jsx";
import UploadDataset from "./pages/UploadDataset.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import Payment from "./pages/Payment.jsx";
import PaymentSuccess from "./pages/PaymentSuccess.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NotFound from "./pages/NotFound.jsx";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />

    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">


        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/browse" element={<BrowseDatasets />} />
          <Route path="/dataset/:id" element={<DatasetDetails />} />
          <Route path="/upload" element={<UploadDataset />} />
          <Route path="/dataset/:id/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>


      </main>
      <Footer />
    </div>

  </QueryClientProvider>
);

export default App;
