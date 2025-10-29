import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Camera,
  User,
  Mail,
  Phone,
  BookOpen,
  IdCard,
  Save
} from 'lucide-react';
import { authAPI } from '../utils/api';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    department: '',
    userType: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch current user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        
        if (user) {
          setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            idNumber: user.idNumber || '',
            department: user.department || '',
            userType: user.userType || ''
          });
        }
      } catch (err) {
        console.error('Error loading user data:', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Call the real API
      const response = await authAPI.updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department
      });
      
      // Update localStorage with new user data
      const updatedUser = response.user || response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      alert('Profile updated successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile: ' + (err.message || 'Please try again'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = () => {
    alert('Avatar upload functionality would go here!\n\nYou would integrate with Cloudinary for image uploads.');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link to="/profile" className="text-blue-600 hover:underline">
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  const userInitial = formData.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 flex items-center justify-between z-40 shadow-md">
        <Link to="/profile" className="hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold">Edit Profile</h1>
        <div className="w-6"></div>
      </header>

      {/* Scrollable Content */}
      <div className="pt-20 px-4 pb-6">
        {/* Avatar Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-blue-600 shadow-lg">
                {userInitial}
              </div>
              <button
                onClick={handleAvatarChange}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">Click camera icon to change photo</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="+233 XX XXX XXXX"
              />
            </div>

            {/* ID Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <IdCard className="w-4 h-4 inline mr-2" />
                {formData.userType === 'student' ? 'Student ID' : 
                 formData.userType === 'staff' ? 'Staff ID' : 
                 formData.userType === 'security' ? 'Security ID' : 'ID Number'}
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="ID Number"
              />
              <p className="text-xs text-gray-500 mt-1">ID number cannot be changed</p>
            </div>

            {/* Department */}
            {formData.userType !== 'visitor' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <BookOpen className="w-4 h-4 inline mr-2" />
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Business Administration">Business Administration</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Law">Law</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Security</h2>
          <p className="text-sm text-gray-600 mb-4">Manage your account security settings</p>
          
          <button 
            onClick={() => alert('Password change functionality would be implemented here')}
            className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Change Password
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-full py-4 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;