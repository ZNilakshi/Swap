import React, { useState } from 'react';
import { 
  FaSearch, 
  FaFilter, 

  FaCalendarAlt,
  FaSchool,
  FaChalkboardTeacher,
  FaExchangeAlt,
  FaWhatsapp
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const TeacherTransferRequests = () => {
  const [filters, setFilters] = useState({
    district: 'All Districts',
    city: 'Any City',
    subject: 'All Subjects'
  });

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const transferRequests = [
    {
      id: 1,
      name: 'Kumari Perera',
      currentSchool: 'Viharamahadevi Balika Vidyalaya',
      currentLocation: 'Colombo, Colombo',
      subject: 'Mathematics',
      preferredLocation: 'Negombo, Gampaha',
      postedDate: '2023-10-15',
      phone: '0702610614',
      email: 'kumari@example.com',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Saman Kumara',
      currentSchool: 'Ananda College',
      currentLocation: 'Colombo, Colombo',
      subject: 'Science',
      preferredLocation: 'Kandy, Kandy',
      postedDate: '2023-10-18',
      phone: '077-7654321',
      email: 'saman@example.com',
      status: 'pending'
    },
   
    {
      id: 4,
      name: 'Priyangika Fernando',
      currentSchool: 'Devi Balika Vidyalaya',
      currentLocation: 'Colombo, Colombo',
      subject: 'History',
      preferredLocation: 'Matara, Matara',
      postedDate: '2023-10-22',
      phone: '076-5432198',
      email: 'priyangika@example.com',
      status: 'completed'
    }
  ];

  const filteredRequests = transferRequests.filter(request => {
    // Filter by active tab
    if (activeTab !== 'all' && request.status !== activeTab) return false;
    
    // Filter by search query
    if (searchQuery && 
        !request.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !request.preferredLocation.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by dropdown filters
    if (filters.district !== 'All Districts' && 
        !request.preferredLocation.includes(filters.district)) return false;
    if (filters.city !== 'Any City' && 
        !request.preferredLocation.includes(filters.city)) return false;
    if (filters.subject !== 'All Subjects' && 
        request.subject !== filters.subject) return false;
    
    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  // Function to handle WhatsApp contact
  const contactViaWhatsApp = (phoneNumber, name) => {
    // Remove any non-numeric characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    // Sri Lanka country code is +94, remove leading 0 if present
    const formattedNumber = cleanNumber.startsWith('0') 
      ? '+94' + cleanNumber.substring(1) 
      : '+94' + cleanNumber;
    
    const message = `Hello ${name}, I saw your teacher transfer request on the portal and would like to discuss a possible mutual transfer.`;
    
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const clearFilters = () => {
    setFilters({
      district: 'All Districts',
      city: 'Any City',
      subject: 'All Subjects'
    });
    setSearchQuery('');
  };

  const StatusBadge = ({ status }) => {
    const statusColors = {
      pending: 'bg-yellow-100 text-yellow-800',
  
      completed: 'bg-green-100 text-green-800'
    };
    
    const statusText = {
      pending: 'Pending',
   
      completed: 'Completed'
    };
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Transfer Requests</h1>
          <p className="text-gray-600">Find and connect with teachers for mutual transfers across Sri Lanka</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 font-medium ${activeTab === 'all' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Requests
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2 font-medium ${activeTab === 'pending' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Pending
          </button>
         
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 font-medium ${activeTab === 'completed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Completed
          </button>
        </div>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow max-w-2xl">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, subject, or location..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <IoMdClose />
                </button>
              )}
            </div>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <FaFilter className="mr-2" /> Advanced Filters
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
              <select 
                name="district" 
                value={filters.district}
                onChange={handleFilterChange}
                className="w-full p-3 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Districts</option>
                <option>Colombo</option>
                <option>Gampaha</option>
                <option>Kandy</option>
                <option>Galle</option>
                <option>Matara</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select 
                name="city" 
                value={filters.city}
                onChange={handleFilterChange}
                className="w-full p-3 h-12  border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Any City</option>
                <option>Colombo</option>
                <option>Negombo</option>
                <option>Kandy</option>
                <option>Galle</option>
                <option>Matara</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select 
                name="subject" 
                value={filters.subject}
                onChange={handleFilterChange}
                className="w-full p-3 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>All Subjects</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>English</option>
                <option>History</option>
                <option>Sinhala</option>
                <option>Buddhism</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Clear all filters
            </button>
            <span className="text-sm text-gray-500">
              {filteredRequests.length} {filteredRequests.length === 1 ? 'result' : 'results'} found
            </span>
          </div>
        </div>
        
        {/* Transfer Requests List */}
        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
                <div key={request.id} className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 ${
                    request.status === 'completed' ? 'border-green-500' : 
                    request.status === 'matched' ? 'border-blue-500' : 'border-yellow-500'
                  }`}>
                 <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{request.name}</h3>
                      <StatusBadge status={request.status} />
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
                      <FaChalkboardTeacher className="mr-2" />
                      <span>{request.subject} Teacher</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="mr-2" />
                      <span>Posted: {request.postedDate}</span>
                    </div>
                  </div>
                  
                 
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaSchool className="mr-2 text-blue-500" />
                      <h4 className="font-medium">Current Location</h4>
                    </div>
                    <p className="text-gray-800 ml-6">{request.currentSchool}</p>
                    <p className="text-gray-600 ml-6">{request.currentLocation}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaExchangeAlt className="mr-2 text-green-500" />
                      <h4 className="font-medium">Preferred Location</h4>
                    </div>
                    <p className="text-gray-800 ml-6">{request.preferredLocation}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50">
                      View Details
                    </button>
                    <button 
            onClick={() => contactViaWhatsApp(request.phone, request.name)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
          >
            <FaWhatsapp /> Contact via WhatsApp
          </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FaSearch size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No transfer requests found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button 
                onClick={clearFilters}
                className="mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherTransferRequests;