import { useState } from 'react';
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
import { currentUser } from '../utils/data';

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    studentId: currentUser.studentId,
    department: currentUser.department,
    avatar: currentUser.avatar,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Saving profile:', formData);
      alert('Profile updated successfully!');
      setIsLoading(false);
      navigate('/profile');
    }, 1000);
  };

  const handleAvatarChange = () => {
    alert('Avatar upload functionality would go here!\n\nYou would integrate with an image upload service like Cloudinary or AWS S3.');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between z-40 shadow-md">
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
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-32 h-32 rounded-full border-4 border-primary shadow-lg"
              />
              <button
                onClick={handleAvatarChange}
                className="absolute bottom-0 right-0 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="+233 XX XXX XXXX"
              />
            </div>

            {/* Student ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <IdCard className="w-4 h-4 inline mr-2" />
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed"
                placeholder="Student ID"
              />
              <p className="text-xs text-gray-500 mt-1">Student ID cannot be changed</p>
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Department
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
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
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Security</h2>
          <p className="text-sm text-gray-600 mb-4">Manage your account security settings</p>
          
          <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            Change Password
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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