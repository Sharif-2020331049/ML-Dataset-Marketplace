import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button.jsx';
import CategoryCard from '../components/ui/CategoryCard.jsx';
import DatasetCard from '../components/ui/DatasetCard.jsx';
import { Upload, Search, CheckCircle, DollarSign, Image, Video, Volume2, FileText, ArrowRight, Star } from 'lucide-react';
import axios from '../api/axios.js';
import { toast } from 'react-toastify';

const Homepage = () => {


  // const categories = [
  //   {
  //     name: 'Images',
  //     icon: <Image className="w-8 h-8" />,
  //     count: 2847,
  //     description: 'Computer vision datasets for classification, detection, and segmentation',
  //     color: 'bg-gradient-to-br from-green-500 to-emerald-600',
  //   },
  //   {
  //     name: 'Audio',
  //     icon: <Volume2 className="w-8 h-8" />,
  //     count: 1293,
  //     description: 'Speech, music, and sound datasets for audio ML applications',
  //     color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
  //   },
  //   {
  //     name: 'Video',
  //     icon: <Video className="w-8 h-8" />,
  //     count: 567,
  //     description: 'Action recognition, tracking, and video analysis datasets',
  //     color: 'bg-gradient-to-br from-red-500 to-pink-600',
  //   },
  //   {
  //     name: 'Text',
  //     icon: <FileText className="w-8 h-8" />,
  //     count: 3421,
  //     description: 'NLP datasets for sentiment, classification, and language modeling',
  //     color: 'bg-gradient-to-br from-blue-500 to-purple-600',
  //   },
  // ];

  const categoryMeta = {
    Images: {
      icon: <Image className="w-8 h-8" />,
      description: 'Computer vision datasets for classification, detection',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    Audio: {
      icon: <Volume2 className="w-8 h-8" />,
      description: 'Speech, music, and sound datasets for audio ML applications',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-600',
    },
    Video: {
      icon: <Video className="w-8 h-8" />,
      description: 'Action recognition, tracking, and video analysis datasets',
      color: 'bg-gradient-to-br from-red-500 to-pink-600',
    },
    Text: {
      icon: <FileText className="w-8 h-8" />,
      description: 'NLP datasets for sentiment, classification, and language modeling',
      color: 'bg-gradient-to-br from-blue-500 to-purple-600',
    },
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/dataset/categories');
        
        if (res.data.success) {

          
          const merged = res.data.data.map((item) => ({
            name: item.category,
            count: item.count,
            ...categoryMeta[item.category], // add icon, color, description
          }));
          
          setCategories(merged);

        }else{
          toast.error("Error occurred during fetching category count")
        }
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }

      
    };



    fetchCategories();
  }, []);



  const featuredDatasets = [
    {
      id: '1',
      title: 'Large-Scale Image Classification Dataset',
      description: 'A comprehensive collection of labeled images across 1000+ categories for computer vision tasks.',
      category: 'image',
      price: 299,
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      seller: 'AI Research Lab',
      downloads: 1234,
      views: 5678,
    },
    {
      id: '2',
      title: 'Conversational Speech Dataset',
      description: 'High-quality recorded conversations in multiple languages for speech recognition training.',
      category: 'audio',
      price: 199,
      thumbnail: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
      seller: 'AudioTech Corp',
      downloads: 567,
      views: 2341,
    },
    {
      id: '3',
      title: 'Sentiment Analysis Text Corpus',
      description: 'Million+ labeled text samples for sentiment analysis and opinion mining applications.',
      category: 'text',
      price: 149,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
      seller: 'TextMining Inc',
      downloads: 891,
      views: 3456,
    },
  ];

  const howItWorksSteps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: 'Upload Your Dataset',
      description: 'Share your valuable data with the ML community',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Admin Review',
      description: 'Our experts review for quality and compliance',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: 'Get Approved',
      description: 'Approved datasets go live on the marketplace',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Start Earning',
      description: 'Earn money when researchers buy your data',
    },
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Chen',
      role: 'AI Researcher, Stanford',
      content: 'OpenDataX has revolutionized how we access quality training data. The variety and quality are unmatched.',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'ML Engineer, TechCorp',
      content: 'Finding the right datasets used to take weeks. Now I can get exactly what I need in minutes.',
      avatar: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=100&h=100&fit=crop&crop=face',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              The Premier
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> ML Dataset </span>
              Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Connect data creators with researchers and developers. Buy and sell high-quality machine learning datasets
              across images, audio, video, and text.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/browse">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  Browse Datasets
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/upload">
                <Button size="lg" variant="outline" className="px-8">
                  Upload Your Dataset
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-xl text-gray-600">Discover datasets across all major machine learning domains</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Datasets */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Datasets</h2>
            <p className="text-xl text-gray-600">Hand-picked, high-quality datasets from our community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDatasets.map((dataset) => (
              <DatasetCard key={dataset.id} {...dataset} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/browse">
              <Button size="lg" variant="outline">
                View All Datasets
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">From upload to earnings in four simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trusted by Researchers Worldwide</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join the Data Revolution?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking to monetize your data or find the perfect dataset for your project,
            OpenDataX is your gateway to the future of machine learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" variant="outline"  className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Get Started Free
              </Button>
            </Link>
            <Link to="/browse">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8">
                Explore Datasets
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
