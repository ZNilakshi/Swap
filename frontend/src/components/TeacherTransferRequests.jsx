import React, { useState } from 'react';
import { 
  FaUser, 
  FaSchool, 
  FaChalkboardTeacher,
  FaExchangeAlt,
  
  FaInfoCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

const TransferRequestForm = ({ onCloseForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    currentSchool: '',
    currentDistrict: '',
    currentCity: '',
    subjects: [],
   
  
    grades: [],
    preferredDistrict: '',
    preferredCity: '',
    preferredReason: '',
    phone: '',
    additionalContact: '',
  });

  const [currentSubject, setCurrentSubject] = useState('');
  const [currentQualification, setCurrentQualification] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    // Required field validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.currentSchool.trim()) newErrors.currentSchool = 'Current school is required';
    if (!formData.currentDistrict) newErrors.currentDistrict = 'Current district is required';
    if (!formData.currentCity.trim()) newErrors.currentCity = 'Current city is required';
   
    if (formData.subjects.length === 0) newErrors.subjects = 'At least one subject is required';
    if (formData.grades.length === 0) newErrors.grades = 'At least one grade is required';
    if (!formData.preferredDistrict) newErrors.preferredDistrict = 'Preferred district is required';
    if (!formData.preferredCity.trim()) newErrors.preferredCity = 'Preferred city is required';
    
    // Phone number format validation
    if (formData.phone.trim() && !/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayAdd = (field, currentValue, setCurrentValue) => {
    if (currentValue.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], currentValue]
    }));
    
    setCurrentValue('');
    
    // Clear subjects error if adding first subject
    if (field === 'subjects' && errors.subjects) {
      setErrors(prev => ({ ...prev, subjects: '' }));
    }
  };

  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
    
    // Set error if removing last subject
    if (field === 'subjects' && formData.subjects.length === 1) {
      setErrors(prev => ({ ...prev, subjects: 'At least one subject is required' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transfer-requests`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          validateStatus: (status) => status < 500, // Don't throw for 4xx errors
        }
      );
      
      if (response.status >= 200 && response.status < 300) {
        console.log('Request created:', response.data);
        onCloseForm();
        alert('Transfer request submitted successfully!');
      } else {
        // Handle API validation errors
        if (response.data?.errors) {
          const apiErrors = {};
          response.data.errors.forEach(err => {
            apiErrors[err.path] = err.msg;
          });
          setErrors(apiErrors);
        } else {
          setSubmitError(response.data?.msg || 'Failed to submit request. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error creating request:', err);
      if (err.response) {
        // Server responded with error status
        setSubmitError(err.response.data?.msg || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // Request was made but no response received
        setSubmitError('Network error. Please check your connection and try again.');
      } else {
        // Other errors
        setSubmitError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render error messages
  const renderError = (field) => {
    return errors[field] ? (
      <p className="mt-1 text-sm text-red-600 flex items-center">
        <FaExclamationTriangle className="mr-1" /> {errors[field]}
      </p>
    ) : null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Transfer Request</h2>
            <button 
              onClick={onCloseForm}
              className="text-gray-500 hover:text-gray-700"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          {submitError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md flex items-start">
              <FaExclamationTriangle className="mt-1 mr-2 flex-shrink-0" />
              <div>{submitError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <FaUser className="text-blue-500" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {renderError('name')}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                   
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      placeholder="0712345678"
                      required
                    />
                  </div>
                  {renderError('phone')}
                </div>
              </div>
              
              <div>
                <label htmlFor="additionalContact" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Contact (Optional)
                </label>
                <input
                  type="text"
                  id="additionalContact"
                  name="additionalContact"
                  value={formData.additionalContact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
              <h3 className="font-medium text-blue-800 mb-4 flex items-center gap-2">
                <FaSchool className="text-blue-500" />
                Current School Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="currentSchool" className="block text-sm font-medium text-gray-700 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="currentSchool"
                    name="currentSchool"
                    value={formData.currentSchool}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.currentSchool ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {renderError('currentSchool')}
                </div>
              
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="currentDistrict" className="block text-sm font-medium text-gray-700 mb-1">
                    District
                  </label>
                  <select
                    id="currentDistrict"
                    name="currentDistrict"
                    value={formData.currentDistrict}
                    onChange={handleInputChange}
                    className={`block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-base focus:ring-2  appearance-none bg-white border ${errors.currentDistrict ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  >
                   <option value="">Select District</option>
<option value="Ampara">Ampara</option>
<option value="Anuradhapura">Anuradhapura</option>
<option value="Badulla">Badulla</option>
<option value="Batticaloa">Batticaloa</option>
<option value="Colombo">Colombo</option>
<option value="Galle">Galle</option>
<option value="Gampaha">Gampaha</option>
<option value="Hambantota">Hambantota</option>
<option value="Jaffna">Jaffna</option>
<option value="Kalutara">Kalutara</option>
<option value="Kandy">Kandy</option>
<option value="Kegalle">Kegalle</option>
<option value="Kilinochchi">Kilinochchi</option>
<option value="Kurunegala">Kurunegala</option>
<option value="Mannar">Mannar</option>
<option value="Matale">Matale</option>
<option value="Matara">Matara</option>
<option value="Monaragala">Monaragala</option>
<option value="Mullaitivu">Mullaitivu</option>
<option value="Nuwara Eliya">Nuwara Eliya</option>
<option value="Polonnaruwa">Polonnaruwa</option>
<option value="Puttalam">Puttalam</option>
<option value="Ratnapura">Ratnapura</option>
<option value="Trincomalee">Trincomalee</option>
<option value="Vavuniya">Vavuniya</option>
  </select>
                 
                  {renderError('currentDistrict')}
                </div>
            
                <div>
                  <label htmlFor="currentCity" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="currentCity"
                    name="currentCity"
                    value={formData.currentCity}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.currentCity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                  {renderError('currentCity')}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-500" />
                Professional Information
              </h3>
              
              <div className="mb-4">
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">
                  Subjects You Teach
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="subjects"
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    className={`flex-1 px-3 py-2 border ${errors.subjects ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="e.g. Mathematics"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd('subjects', currentSubject, setCurrentSubject)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                {renderError('subjects')}
                <div className="flex flex-wrap gap-2">
                {formData.subjects.map((subject, index) => (
  <span 
    key={`subject-${index}-${subject}`}  // Already improved in your code
    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
  >
    {subject}
    <button
      type="button"
      onClick={() => handleRemoveItem('subjects', index)}
      className="text-blue-600 hover:text-blue-800"
    >
      <IoMdClose size={16} />
    </button>
  </span>
))}
                </div>
              </div>
             
              
              <div className="mb-4">
  <label htmlFor="grades" className="block text-sm font-medium text-gray-700 mb-1">
    Grades You Teach
  </label>
  <div className="flex gap-2 mb-2">
    <input
      type="text"
      id="grades"
      value={currentGrade}
      onChange={(e) => setCurrentGrade(e.target.value)}
      className={`flex-1 px-3 py-2 border ${errors.grades ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      placeholder="e.g. Grade 10"
    />
    <button
      type="button"
      onClick={() => handleArrayAdd('grades', currentGrade, setCurrentGrade)}
      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    >
      Add
    </button>
  </div>
  {renderError('grades')} {/* Show error if grades are empty */}
  <div className="flex flex-wrap gap-2">
    {formData.grades.map((grade, index) => (
      <span 
        key={`grade-${index}-${grade}`}
        className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
      >
        {grade}
        <button
          type="button"
          onClick={() => handleRemoveItem('grades', index)}
          className="text-purple-600 hover:text-purple-800"
        >
          <IoMdClose size={16} />
        </button>
      </span>
    ))}
  </div>
</div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100 mb-6">
              <h3 className="font-medium text-green-800 mb-4 flex items-center gap-2">
                <FaExchangeAlt className="text-green-500" />
                Preferred Transfer Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="preferredDistrict" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred District
                  </label>
                  <select
                    id="preferredDistrict"
                    name="preferredDistrict"
                    value={formData.preferredDistrict}
                    onChange={handleInputChange}
                    className={`block w-full h-12 pl-3 pr-8 border border-gray-300 rounded-lg text-base focus:ring-2  appearance-none bg-white border ${errors.preferredDistrict ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    required
                  >
                   <option value="">Select District</option>
<option value="Ampara">Ampara</option>
<option value="Anuradhapura">Anuradhapura</option>
<option value="Badulla">Badulla</option>
<option value="Batticaloa">Batticaloa</option>
<option value="Colombo">Colombo</option>
<option value="Galle">Galle</option>
<option value="Gampaha">Gampaha</option>
<option value="Hambantota">Hambantota</option>
<option value="Jaffna">Jaffna</option>
<option value="Kalutara">Kalutara</option>
<option value="Kandy">Kandy</option>
<option value="Kegalle">Kegalle</option>
<option value="Kilinochchi">Kilinochchi</option>
<option value="Kurunegala">Kurunegala</option>
<option value="Mannar">Mannar</option>
<option value="Matale">Matale</option>
<option value="Matara">Matara</option>
<option value="Monaragala">Monaragala</option>
<option value="Mullaitivu">Mullaitivu</option>
<option value="Nuwara Eliya">Nuwara Eliya</option>
<option value="Polonnaruwa">Polonnaruwa</option>
<option value="Puttalam">Puttalam</option>
<option value="Ratnapura">Ratnapura</option>
<option value="Trincomalee">Trincomalee</option>
<option value="Vavuniya">Vavuniya</option>
  </select>
                  {renderError('preferredDistrict')}
                </div>
                
                <div>
                  <label htmlFor="preferredCity" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred City
                  </label>
                  <input
                    type="text"
                    id="preferredCity"
                    name="preferredCity"
                    value={formData.preferredCity}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${errors.preferredCity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
                    required
                  />
                  {renderError('preferredCity')}
                </div>
              </div>
              
              <div>
                <label htmlFor="preferredReason" className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                  Reason for Transfer (Optional)
                  <FaInfoCircle className="text-gray-400" title="Briefly explain your reason for requesting this transfer" />
                </label>
                <textarea
                  id="preferredReason"
                  name="preferredReason"
                  value={formData.preferredReason}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Closer to family, health reasons, etc."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCloseForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Transfer Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferRequestForm;