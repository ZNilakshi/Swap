import React, { useState } from 'react';
import { 
  FaUser,
  FaSchool,
  FaMapMarkerAlt,
  FaBook,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaPaperclip,
  FaArrowLeft
} from 'react-icons/fa';

const TransferRequestForm = ({ onCloseForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    currentSchool: '',
    currentDistrict: '',
    currentCity: '',
    subject: '',
    preferredDistrict: '',
    preferredCity: '',
    reason: '',
    phone: '',
    email: '',
    attachment: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const districts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Mullaitivu', 'Vavuniya', 'Puttalam', 'Kurunegala', 'Anuradhapura',
    'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle'
  ];

  const subjects = [
    'Mathematics', 'Science', 'English', 'Sinhala', 'Tamil',
    'History', 'Buddhism', 'Christianity', 'Islam', 'Geography',
    'Commerce', 'Accounting', 'Art', 'Music', 'Dancing',
    'IT', 'Agriculture', 'Health Science', 'Sinhala Literature'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      attachment: e.target.files[0]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.currentSchool.trim()) newErrors.currentSchool = 'Current school is required';
    if (!formData.currentDistrict) newErrors.currentDistrict = 'District is required';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.preferredDistrict) newErrors.preferredDistrict = 'Preferred district is required';
    if (!formData.reason.trim()) newErrors.reason = 'Reason for transfer is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
        
        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({
            name: '',
            currentSchool: '',
            currentDistrict: '',
            currentCity: '',
            subject: '',
            preferredDistrict: '',
            preferredCity: '',
            reason: '',
            phone: '',
            email: '',
            attachment: null
          });
        }, 3000);
      }, 1500);
    }
  };

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted Successfully!</h3>
          <p className="text-gray-600 mb-6">Your transfer request has been received. We'll notify you when we find potential matches.</p>
          <button
            onClick={onCloseForm}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Requests
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button 
          onClick={onCloseForm}
          className="mr-4 text-gray-500 hover:text-gray-700"
        >
          <FaArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Create Transfer Request</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaUser className="mr-2 text-blue-500" />
              Personal Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Your full name"
                />
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="07X XXX XXXX"
                />
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="your@email.com"
                />
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          
          {/* Current Position */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaSchool className="mr-2 text-blue-500" />
              Current Position
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
              <div className="relative">
                <input
                  type="text"
                  name="currentSchool"
                  value={formData.currentSchool}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.currentSchool ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Current school name"
                />
                <FaSchool className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.currentSchool && <p className="mt-1 text-sm text-red-600">{errors.currentSchool}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
              <div className="relative">
                <select
                  name="currentDistrict"
                  value={formData.currentDistrict}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.currentDistrict ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                >
                  <option value="">Select District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.currentDistrict && <p className="mt-1 text-sm text-red-600">{errors.currentDistrict}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City/Town</label>
              <div className="relative">
                <input
                  type="text"
                  name="currentCity"
                  value={formData.currentCity}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Current city/town"
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.subject ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                <FaBook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
            </div>
          </div>
          
          {/* Preferred Transfer */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              Preferred Transfer Location
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
              <div className="relative">
                <select
                  name="preferredDistrict"
                  value={formData.preferredDistrict}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border ${errors.preferredDistrict ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none`}
                >
                  <option value="">Select Preferred District</option>
                  {districts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.preferredDistrict && <p className="mt-1 text-sm text-red-600">{errors.preferredDistrict}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City/Town (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  name="preferredCity"
                  value={formData.preferredCity}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Preferred city/town"
                />
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          
          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-500" />
              Additional Information
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Transfer *</label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                className={`w-full px-4 py-2 border ${errors.reason ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder="Explain your reason for requesting a transfer..."
              ></textarea>
              {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
              <div className="flex items-center">
                <label className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <FaPaperclip className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {formData.attachment ? formData.attachment.name : 'Attach File (Optional)'}
                  </span>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500">PDF, DOC, or image files (max 5MB)</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCloseForm}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : 'Submit Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferRequestForm;