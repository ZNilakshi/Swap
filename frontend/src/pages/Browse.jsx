import React, { useState , useEffect } from 'react';
import TransferRequestForm from '../components/TeacherTransferRequests';
import { 
  FaSearch, 
  FaCalendarAlt,
  FaSchool,
  FaChalkboardTeacher,
  FaExchangeAlt,
  FaWhatsapp
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

const TeacherTransferRequests = () => {
  const [filters, setFilters] = useState({
    subject: 'All Subjects',
    currentDistrict: 'All Districts',
    currentCity: 'Any City',
    preferredDistrict: 'All Districts',
    preferredCity: 'Any City'
  });

 
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [transferRequests, setTransferRequests] = useState([]);

const handleCreateRequest = () => {
  setShowForm(true);
};
useEffect(() => {
  const fetchTransferRequests = async () => {
    try {
      const response = await axios.get('/api/transfer-requests');
      setTransferRequests(response.data);
    } catch (err) {
      console.error('Error fetching transfer requests:', err);
    }
  };

  fetchTransferRequests();
}, []);


  const openTeacherDetails = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDetailsModal(true);
  };
  const filteredRequests = transferRequests.filter(request => {
    // Safely access properties with fallback values
    const name = request.name || '';
    const subjects = Array.isArray(request.subjects) ? request.subjects : [];
    const currentLocation = request.currentLocation || '';
    const preferredLocation = request.preferredLocation || '';
  
    // Convert search query to lowercase once
    const searchLower = searchQuery.toLowerCase();
  
    // Filter by search query
    if (searchQuery) {
      const nameMatch = name.toLowerCase().includes(searchLower);
      const subjectsMatch = subjects.some(subj => 
        subj.toLowerCase().includes(searchLower)
      );
      const currentLocationMatch = currentLocation.toLowerCase().includes(searchLower);
      const preferredLocationMatch = preferredLocation.toLowerCase().includes(searchLower);
  
      if (!nameMatch && !subjectsMatch && !currentLocationMatch && !preferredLocationMatch) {
        return false;
      }
    }
  
    // Filter by subject
    if (filters.subject !== 'All Subjects' && !subjects.includes(filters.subject)) {
      return false;
    }
  
    // Filter by current location
    if (filters.currentDistrict !== 'All Districts' && 
        !currentLocation.includes(filters.currentDistrict)) {
      return false;
    }
    
    if (filters.currentCity !== 'Any City' && 
        !currentLocation.includes(filters.currentCity)) {
      return false;
    }
  
    // Filter by preferred location
    if (filters.preferredDistrict !== 'All Districts' && 
        !preferredLocation.includes(filters.preferredDistrict)) {
      return false;
    }
    
    if (filters.preferredCity !== 'Any City' && 
        !preferredLocation.includes(filters.preferredCity)) {
      return false;
    }
  
    return true;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactViaWhatsApp = (phoneNumber, name) => {
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    const formattedNumber = cleanNumber.startsWith('0') 
      ? '+94' + cleanNumber.substring(1) 
      : '+94' + cleanNumber;
    
    const message = `Hello ${name}, I saw your teacher transfer request on the portal and would like to discuss a possible mutual transfer.`;
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const clearFilters = () => {
    setFilters({
      subject: 'All Subjects',
      currentDistrict: 'All Districts',
      currentCity: 'Any City',
      preferredDistrict: 'All Districts',
      preferredCity: 'Any City'
    });
    setSearchQuery('');
  };

 

  return (
    <div className="min-h-screen bg-gray-50">
     {showForm ? (
  <TransferRequestForm onCloseForm={() => setShowForm(false)} />
) : (
  <div className="fixed bottom-6 right-6 z-10">
    <button 
      onClick={handleCreateRequest}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
      </svg>
      <span className="font-semibold text-sm sm:text-base">Create Transfer Request</span>
    </button>
  </div>
)}
      <div className="container mx-auto px-4 py-8">
     
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Transfer Requests</h1>
          <p className="text-gray-600">Find and connect with teachers for mutual transfers across Sri Lanka</p>
        </div>
        
     
        

<div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-100">

  <div className="flex flex-col md:flex-row gap-5 mb-5">

    <div className="flex-1">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          id="search"
          type="text"
          placeholder="Name, subject, or location..."
          className="block w-full h-12 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <IoMdClose size={18} />
          </button>
        )}
      </div>
    </div>

  
    <div className="flex-1">
      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
      <div className="relative">
        <select
          id="subject"
          name="subject"
          value={filters.subject}
          onChange={handleFilterChange}
          className="block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white"
        >
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Science</option>
          <option>English</option>
          <option>History</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>

 
  <div className="grid grid-cols-2 md:grid-cols-2 gap-5 mb-5">
    
    <div>
      <div className="flex items-center gap-2 mb-3">
        <FaSchool className="text-blue-500 text-base" />
        <label className="text-sm font-medium text-gray-700">Current Location</label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <select
            name="currentDistrict"
            value={filters.currentDistrict}
            onChange={handleFilterChange}
            className="block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            <option>All Districts</option>
            <option>Colombo</option>
            <option>Gampaha</option>
            <option>polonnaruwa</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <select
            name="currentCity"
            value={filters.currentCity}
            onChange={handleFilterChange}
            className="block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
          >
            <option>Any City</option>
            <option>Colombo</option>
            <option>Negombo</option>
            <option>Kandy</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>


    <div>
      <div className="flex items-center gap-2 mb-3">
        <FaExchangeAlt className="text-green-500 text-base" />
        <label className="text-sm font-medium text-gray-700">Preferred Location</label>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <select
            name="preferredDistrict"
            value={filters.preferredDistrict}
            onChange={handleFilterChange}
            className="block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
          >
            <option>All Districts</option>
            <option>Colombo</option>
            <option>Gampaha</option>
            <option>Kandy</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <select
            name="preferredCity"
            value={filters.preferredCity}
            onChange={handleFilterChange}
            className="block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white"
          >
            <option>Any City</option>
            <option>Colombo</option>
            <option>Negombo</option>
            <option>Kandy</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="flex justify-between items-center pt-5 border-t border-gray-200">
    <button
      onClick={clearFilters}
      className="text-base text-gray-600 hover:text-blue-600 flex items-center gap-2 h-12 px-4 rounded-lg hover:bg-gray-50"
    >
      <IoMdClose size={18} />
      Clear filters
    </button>
    <div className="text-base text-gray-600 h-12 flex items-center">
      <span className="font-medium text-gray-800">{filteredRequests.length}</span> results found
    </div>
  </div>
</div>

{showDetailsModal && selectedTeacher && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{selectedTeacher.name}</h2>
          <button 
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="space-y-4">
 
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Position</p>
                <p className="font-medium">{selectedTeacher.position || 'Not specified'}</p>
              </div>
             
              <div>
                <p className="text-sm text-gray-500">Subjects</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.subjects?.map((subject, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {subject}
                    </span>
                  )) || <span className="text-gray-500">Not specified</span>}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Grades Teaching</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.grades?.map((grade, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {grade}
                    </span>
                  )) || <span className="text-gray-500">Not specified</span>}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Qualifications</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedTeacher.qualifications?.map((qual, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {qual}
                    </span>
                  )) || <span className="text-gray-500">Not specified</span>}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Posted Date</p>
                <p className="font-medium">{selectedTeacher.postedDate}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <FaSchool className="text-blue-500" />
              <h3 className="font-medium text-blue-800">Current School</h3>
            </div>
            <p className="font-medium mb-1">{selectedTeacher.currentSchool}</p>
            <p className="text-gray-600">{selectedTeacher.currentLocation}</p>
          </div>

    
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <FaExchangeAlt className="text-green-500" />
              <h3 className="font-medium text-green-800">Preferred Transfer Location</h3>
            </div>
            <p className="font-medium">{selectedTeacher.preferredLocation}</p>
            {selectedTeacher.preferredReason && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Reason for Transfer</p>
                <p className="text-gray-700">{selectedTeacher.preferredReason}</p>
              </div>
            )}
          </div>

        
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{selectedTeacher.phone}</p>
              </div>
           
              {selectedTeacher.additionalContact && (
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Additional Contact</p>
                  <p className="font-medium">{selectedTeacher.additionalContact}</p>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => {
                  contactViaWhatsApp(selectedTeacher.phone, selectedTeacher.name);
                  setShowDetailsModal(false);
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> WhatsApp
              </button>
          
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        <div className="space-y-4">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(request => (
              <div key={request.id} className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow border-l-4 ${
                  request.status === 'completed' ? 'border-green-500' : 'border-yellow-500'
                }`}>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{request.name}</h3>
                     
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
                  <button 
  onClick={() => openTeacherDetails(request)}
  className="px-4 py-2 bg-white border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50"
>
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