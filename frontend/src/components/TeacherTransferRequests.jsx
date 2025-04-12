import React, { useState } from 'react';
import { 
  FaUser, 
  FaSchool, 
 
  FaChalkboardTeacher,
  
  FaExchangeAlt,
  
  FaPhone,
  FaInfoCircle
} from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const TransferRequestForm = ({ onCloseForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    currentSchool: '',
    currentDistrict: '',
    currentCity: '',
    subjects: [],
    position: '',
    qualifications: [],
    grades: [],
    preferredDistrict: '',
    preferredCity: '',
    preferredReason: '',
    phone: '',
    additionalContact: '',
    status: 'pending'
  });

  const [currentSubject, setCurrentSubject] = useState('');
  const [currentQualification, setCurrentQualification] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayAdd = (field, currentValue, setCurrentValue) => {
    if (currentValue.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], currentValue]
    }));
    
    setCurrentValue('');
  };

  const handleRemoveItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    // After submission, you might want to close the form
    onCloseForm();
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

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
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

            {/* Current School Information */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select District</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matara">Matara</option>
                    <option value="polonnaruwa">polonnaruwa</option>
                  </select>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-gray-700 mb-4 flex items-center gap-2">
                <FaChalkboardTeacher className="text-blue-500" />
                Professional Information
              </h3>
              
              {/* Subjects */}
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="flex flex-wrap gap-2">
                  {formData.subjects.map((subject, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
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
              
              {/* Qualifications */}
              <div className="mb-4">
                <label htmlFor="qualifications" className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="qualifications"
                    value={currentQualification}
                    onChange={(e) => setCurrentQualification(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. B.Ed in Science"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayAdd('qualifications', currentQualification, setCurrentQualification)}
                    className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.qualifications.map((qualification, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
                      {qualification}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem('qualifications', index)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Grades */}
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
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <div className="flex flex-wrap gap-2">
                  {formData.grades.map((grade, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center gap-1">
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

            {/* Preferred Transfer Information */}
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select District</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Matara">Matara</option>
                    <option value="polonnaruwa">polonnaruwa</option>
                  </select>
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
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

            {/* Form Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onCloseForm}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit Transfer Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransferRequestForm;