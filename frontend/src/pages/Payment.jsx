
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Input } from '../components/ui/Input.jsx';
import { Loader2 } from 'lucide-react';
import { Label } from '../components/ui/Label.jsx';
import axios from '../api/axios.js';
import { DataContext } from '../context/DataContext.jsx';
import { toast } from 'react-toastify'



const Payment = () => {
  const { id } = useParams();
  const [dataset, setDataset] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const { token, setToken, navigate } = useContext(DataContext)

  const [formData, setFormData] = useState({
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });


  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const res = await axios.get(`/dataset/${id}`);

        console.log(res.data.dataset);

        setDataset(res.data.dataset);
        // console.log(dataset?.thumbnail?.url);

        setLoading(false);
      } catch (err) {
        // setError('Failed to fetch dataset');
        console.log("Error in fetching data");

        setLoading(false);
      }
    };

    fetchDataset();
  }, [id]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const storedToken = localStorage.getItem('token');

  //   if (!storedToken) {
  //     toast.error("Please login first.");
  //     navigate('/login')
  //     return;

  //   }

  //   try {
  //     const response = await axios.post(
  //       '/dataset/payment',
  //       { ...formData, datasetId: id },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${storedToken}`,
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       window.location.href = response.data.session_url;
  //     } else {
  //       toast.error(response.data.message || "Payment failed.");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong with payment.");
  //     console.error(error);
  //   } finally {
  //     setIsLoading(false); // just in case the request fails
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const storedToken = localStorage.getItem('token');

  if (!storedToken) {
    toast.error("Please login first.");
    navigate('/login');
    return;
  }

  try {
    const response = await axios.post(
      'dataset/payment', 
      { ...formData, datasetId: id },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    );

    if (response.data.success) {
      // This will redirect to Stripe checkout
      window.location.href = response.data.session_url;
    } else {
      toast.error(response.data.message || "Payment failed.");
    }
  } catch (error) {
    toast.error("Something went wrong with payment.");
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/dataset/${id}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dataset
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="text-gray-600 mt-2">Secure payment processing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Stripe Payment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Billing Info */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="123 Main Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      placeholder="New York"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      type="text"
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Redirecting to Stripe...
                  </>
                ) : (
                  `Pay with Stripe - $${dataset?.price}`
                )}
              </Button>

            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="flex items-start space-x-4 mb-6">
                <img
                  src={dataset?.thumbnail?.url}
                  alt={dataset?.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{dataset?.title}</h4>
                  <p className="text-sm text-gray-500">Digital Dataset</p>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${dataset?.price}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${dataset?.price - dataset?.price}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-3">
                  <span>Total</span>
                  <span>${dataset?.price}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                Secure Payment
              </h3>

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>256-bit SSL encryption</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>Money-back guarantee</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  <span>Instant download access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
