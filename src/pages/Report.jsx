import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Calendar, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { itemsAPI } from '../utils/api';

const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'lost';

  const [formData, setFormData] = useState({
    type: initialType,
    itemName: '',
    category: '',
    description: '',
    location: '',
    date: '',
    color: '',
    brand: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Accessories',
    'Documents',
    'Other'
  ];

  const campusLocations = [
    'Library',
    'Main Building',
    'Cafeteria',
    'Sports Complex',
    'Lecture Hall A',
    'Lecture Hall B',
    'Admin Block',
    'Student Center',
    'Parking Lot',
    'Science Lab'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = 'Item name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const itemData = {
        itemName: formData.itemName,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        color: formData.color || '',
        brand: formData.brand || ''
      };

      // Add date field based on type
      if (formData.type === 'lost') {
        itemData.dateLost = formData.date;
      } else {
        itemData.dateFound = formData.date;
      }

      // TODO: Image upload will be implemented when backend supports it
      // For now, we're just submitting the item data without images

      // Create item based on type
      let response;
      if (formData.type === 'lost') {
        response = await itemsAPI.createLostItem(itemData);
      } else {
        response = await itemsAPI.createFoundItem(itemData);
      }

      alert(`${formData.type === 'lost' ? 'Lost' : 'Found'} item reported successfully!`);
      navigate('/browse');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-xl z-50"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Report Item</h1>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: 'calc(6rem + env(safe-area-inset-top))' }}></div>

      {/* Type Toggle */}
      <div className="bg-white p-4 border-b -mt-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              formData.type === 'lost'
                ? 'bg-red-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Lost Item
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'found' }))}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              formData.type === 'found'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Found Item
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4 pb-20">
        {/* Item Type */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Item Type *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.category ? 'border-red-600' : 'border-gray-300'
            }`}
          >
            <option value="">Select item type</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-xs mt-1">{errors.category}</p>
          )}
        </div>

        {/* Item Name */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleInputChange}
            placeholder="e.g., iPhone 14 Pro, Blue Backpack"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.itemName ? 'border-red-600' : 'border-gray-300'
            }`}
          />
          {errors.itemName && (
            <p className="text-red-600 text-xs mt-1">{errors.itemName}</p>
          )}
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Provide detailed description of the item..."
            rows="4"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none ${
              errors.description ? 'border-red-600' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-red-600 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Location *
          </label>
          
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.location ? 'border-red-600' : 'border-gray-300'
            }`}
          >
            <option value="">
              {formData.type === 'lost' ? 'Where was it lost?' : 'Where was it found?'}
            </option>
            {campusLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          
          {errors.location && (
            <p className="text-red-600 text-xs mt-2">{errors.location}</p>
          )}
        </div>

        {/* Date */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
              errors.date ? 'border-red-600' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="text-red-600 text-xs mt-1">{errors.date}</p>
          )}
        </div>

        {/* Color (Optional) */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Color (Optional)
          </label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="e.g., Black, Blue, Red"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Brand (Optional) */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Brand (Optional)
          </label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
            placeholder="e.g., Apple, Nike, Samsung"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Photo Upload */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Photo (Optional)
          </label>
          <p className="text-xs text-gray-600 mb-3">
            Add a photo to help others identify the item
          </p>

          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600 mb-1">Click to upload photo</span>
              <span className="text-xs text-gray-500">Max size: 5MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                capture="environment"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-semibold text-white transition-colors shadow-md ${
            formData.type === 'lost'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-green-600 hover:bg-green-700'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </span>
          ) : (
            `Submit ${formData.type === 'lost' ? 'Lost' : 'Found'} Report`
          )}
        </button>
      </form>
    </div>
  );
};

export default Report;