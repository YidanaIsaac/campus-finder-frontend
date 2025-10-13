import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Calendar, Upload, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { campusLocations } from '../utils/data';

const Report = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'lost';

  const [formData, setFormData] = useState({
    type: initialType,
    title: '',
    category: '',
    description: '',
    location: '',
    date: '',
    color: '',
    brand: '',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Bags',
    'Keys',
    'Jewelry',
    'Sports Equipment',
    'Documents',
    'Other'
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Item name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`${formData.type === 'lost' ? 'Lost' : 'Found'} item report submitted successfully!`);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-dark text-white p-4 shadow-md">
        <div className="flex items-center gap-4">
          <Link to="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Report Item</h1>
        </div>
      </header>

      {/* Type Toggle */}
      <div className="bg-white p-4 border-b">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, type: 'lost' }))}
            className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
              formData.type === 'lost'
                ? 'bg-danger text-white'
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
                ? 'bg-success text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            Found Item
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Item Type */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Item Type *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.category ? 'border-danger' : 'border-gray-300'
            }`}
          >
            <option value="">Select item type</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-danger text-xs mt-1">{errors.category}</p>
          )}
        </div>

        {/* Item Name */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Item Name *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., iPhone 14 Pro, Blue Backpack"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.title ? 'border-danger' : 'border-gray-300'
            }`}
          />
          {errors.title && (
            <p className="text-danger text-xs mt-1">{errors.title}</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.description ? 'border-danger' : 'border-gray-300'
            }`}
          />
          {errors.description && (
            <p className="text-danger text-xs mt-1">{errors.description}</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.location ? 'border-danger' : 'border-gray-300'
            }`}
          >
            <option value="">
              {formData.type === 'lost' ? 'Where was it lost?' : 'Where was it found?'}
            </option>
            {campusLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          
          <button
            type="button"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      location: 'Library Building'
                    }));
                    alert('Location detected: Library Building');
                  },
                  (error) => {
                    alert('Unable to get location. Please select manually.');
                  }
                );
              } else {
                alert('Geolocation is not supported by your browser.');
              }
            }}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:text-primary-dark transition-colors mt-2"
          >
            <MapPin className="w-4 h-4" />
            Use current location
          </button>
          
          {errors.location && (
            <p className="text-danger text-xs mt-2">{errors.location}</p>
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
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.date ? 'border-danger' : 'border-gray-300'
            }`}
          />
          {errors.date && (
            <p className="text-danger text-xs mt-1">{errors.date}</p>
          )}
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
              <span className="text-xs text-gray-500">or use camera</span>
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
                className="absolute top-2 right-2 bg-danger text-white p-2 rounded-full hover:bg-danger-dark transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
            formData.type === 'lost'
              ? 'bg-danger hover:bg-danger-dark'
              : 'bg-success hover:bg-success-dark'
          }`}
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default Report;