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
      // Use full API URL in production
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? '/api/transfer-requests'
        : 'https://swap-production-6d13.up.railway.app/api/transfer-requests';
      
      const response = await axios.get(apiUrl);
      
      // Check if response is HTML (wrong response)
      if (typeof response.data === 'string' && response.data.includes('<!doctype html>')) {
        throw new Error('API returned HTML instead of JSON');
      }

      const requestsArray = Array.isArray(response.data) ? response.data : [];
      
      const requestsWithIds = requestsArray.map((item, index) => ({
        ...item,
        reactKey: item.id || item._id || `request-${index}-${Date.now()}`
      }));
      
      setTransferRequests(requestsWithIds);
    } catch (err) {
      console.error('API Error:', err);
      setTransferRequests([]);
      // Show error to user
      alert('Failed to load data. Please try again later.');
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
         <option>Subjects </option>
<option>Mathematics</option>
<option>Science</option>
<option>English</option>
<option>History</option>
<option>Geography</option>
<option>Information Technology</option>
<option>Biology</option>
<option>Physics</option>
<option>Chemistry</option>
<option>Health Science</option>
<option>Commerce</option>
<option>Accounting</option>
<option>Economics</option>
<option>Business Studies</option>
<option>Art</option>
<option>Music</option>
<option>Drama</option>
<option>Physical Education</option>
<option>Agriculture</option>
<option>Civics</option>
<option>Religion</option>
<option>Tamil</option>
<option>French</option>
<option>Environmental Studies</option>

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
<option>Ampara</option>
<option>Anuradhapura</option>
<option>Badulla</option>
<option>Batticaloa</option>
<option>Colombo</option>
<option>Galle</option>
<option>Gampaha</option>
<option>Hambantota</option>
<option>Jaffna</option>
<option>Kalutara</option>
<option>Kandy</option>
<option>Kegalle</option>
<option>Kilinochchi</option>
<option>Kurunegala</option>
<option>Mannar</option>
<option>Matale</option>
<option>Matara</option>
<option>Monaragala</option>
<option>Mullaitivu</option>
<option>Nuwara Eliya</option>
<option>Polonnaruwa</option>
<option>Puttalam</option>
<option>Ratnapura</option>
<option>Trincomalee</option>
<option>Vavuniya</option>

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
           <option>Major Cities</option>
<option>Colombo</option>
<option>Negombo</option>
<option>Kandy</option>
<option>Galle</option>
<option>Jaffna</option>
<option>Trincomalee</option>
<option>Anuradhapura</option>
<option>Matara</option>
<option>Ratnapura</option>
<option>Kurunegala</option>
<option>Badulla</option>
<option>Nuwara Eliya</option>
<option>Batticaloa</option>
<option>Kalutara</option>
<option>Hambantota</option>
<option>Ampara</option>
<option>Polonnaruwa</option>
<option>Mannar</option>
<option>Vavuniya</option>
<option>Dambulla</option>
<option>Matale</option>
<option>Gampaha</option>
<option>Moratuwa</option>
<option>Kegalle</option>
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
<option>Ampara</option>
<option>Anuradhapura</option>
<option>Badulla</option>
<option>Batticaloa</option>
<option>Colombo</option>
<option>Galle</option>
<option>Gampaha</option>
<option>Hambantota</option>
<option>Jaffna</option>
<option>Kalutara</option>
<option>Kandy</option>
<option>Kegalle</option>
<option>Kilinochchi</option>
<option>Kurunegala</option>
<option>Mannar</option>
<option>Matale</option>
<option>Matara</option>
<option>Monaragala</option>
<option>Mullaitivu</option>
<option>Nuwara Eliya</option>
<option>Polonnaruwa</option>
<option>Puttalam</option>
<option>Ratnapura</option>
<option>Trincomalee</option>
<option>Vavuniya</option>
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
            <option>Major Cities</option>
<option>Colombo</option>
<option>Negombo</option>
<option>Kandy</option>
<option>Galle</option>
<option>Jaffna</option>
<option>Trincomalee</option>
<option>Anuradhapura</option>
<option>Matara</option>
<option>Ratnapura</option>
<option>Kurunegala</option>
<option>Badulla</option>
<option>Nuwara Eliya</option>
<option>Batticaloa</option>
<option>Kalutara</option>
<option>Hambantota</option>
<option>Ampara</option>
<option>Polonnaruwa</option>
<option>Mannar</option>
<option>Vavuniya</option>
<option>Dambulla</option>
<option>Matale</option>
<option>Gampaha</option>
<option>Moratuwa</option>
<option>Kegalle</option>
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
      <div className="p-6">
        <div className="flex justify-between items-start border-b pb-4 mb-4">
          <h2 className="text-3xl font-semibold text-gray-800">{selectedTeacher.name}</h2>
          <button 
            onClick={() => setShowDetailsModal(false)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Professional Info */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Professional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Subjects</p>
                <div className="flex flex-wrap gap-2">
                {selectedTeacher?.subjects?.map((subject, idx) => (
  <span 
    key={`${selectedTeacher.reactKey}-subject-${idx}-${subject}`}
    className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium"
  >
    {subject}
  </span>
))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Grades Teaching</p>
                <div className="flex flex-wrap gap-2">
                {selectedTeacher?.grades?.map((grade, idx) => (
  <span 
    key={`${selectedTeacher.reactKey}-grade-${idx}-${grade}`}
    className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium"
  >
    {grade}
  </span>
))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Posted Date</p>
                <p className="font-medium text-gray-700">
                  {new Date(selectedTeacher.createdAt).toISOString().slice(0, 10)}
                </p>
              </div>
            </div>
          </div>

          {/* Current School */}
          <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FaSchool className="text-blue-500" />
              <h3 className="text-lg font-medium text-blue-800">Current School</h3>
            </div>
            <div className="space-y-1 text-gray-700 text-sm">
              <p><span className="text-gray-500">School: </span>{selectedTeacher.currentSchool}</p>
              <p><span className="text-gray-500">District: </span>{selectedTeacher.currentDistrict}</p>
              <p><span className="text-gray-500">City: </span>{selectedTeacher.currentCity}</p>
            </div>
          </div>

          {/* Preferred Location */}
          <div className="bg-green-50 p-5 rounded-xl border border-green-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FaExchangeAlt className="text-green-500" />
              <h3 className="text-lg font-medium text-green-800">Preferred Transfer Location</h3>
            </div>
            <div className="space-y-1 text-gray-700 text-sm">
              <p><span className="text-gray-500">District: </span>{selectedTeacher.preferredDistrict}</p>
              <p><span className="text-gray-500">City: </span>{selectedTeacher.preferredCity}</p>
            </div>
            {selectedTeacher.preferredReason && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Reason for Transfer</p>
                <p className="text-gray-700">{selectedTeacher.preferredReason}</p>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             
              <div className="space-y-1 text-gray-700 text-sm">
              <p><span className="text-gray-500">Phone: </span>{selectedTeacher.phone}</p>
            </div>
              {selectedTeacher.additionalContact && (
               
                <div className="space-y-1 text-gray-700 text-sm">
                <p><span className="text-gray-500">Additional Contact: </span>{selectedTeacher.additionalContact}</p>
                             </div>
              )}
            </div>
            <div className="mt-5 flex gap-3">
              <button 
                onClick={() => {
                  contactViaWhatsApp(selectedTeacher.phone, selectedTeacher.name);
                  setShowDetailsModal(false);
                }}
                className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition w-full"
              >
                <FaWhatsapp /> Contact via WhatsApp
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
              <div key={request.reactKey} 
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">{request.name}</h3>
                     
                    </div>
                    <div className="flex items-center text-gray-500 text-sm mb-1">
  <FaChalkboardTeacher className="mr-2" />
  <span>
    {Array.isArray(request.subjects) && request.subjects.length > 0 
      ? request.subjects.join(', ') + ' Teacher'
      : 'Teacher'}
  </span>
</div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <FaCalendarAlt className="mr-2" />
                      <span>Posted:  {new Date(request.createdAt).toISOString().slice(0, 10)}
                      </span>
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
                    <p className="text-gray-600 ml-6">{request.currentDistrict}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center text-gray-600 mb-2">
                      <FaExchangeAlt className="mr-2 text-green-500" />
                      <h4 className="font-medium">Preferred Location</h4>
                    </div>
                    <p className="text-gray-800 ml-6">{request.preferredDistrict}</p>
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