import { useState, useEffect } from 'react';
import { Search, ArrowLeft, SlidersHorizontal, Calendar, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { itemsAPI } from '../utils/api';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('lost');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  const [items, setItems] = useState([]);
  const [campusLocations, setCampusLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Clothing', name: 'Clothing' },
    { id: 'Books', name: 'Books' },
  ];

  // Fetch items based on selected tab
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        let data;
        if (selectedTab === 'lost') {
          data = await itemsAPI.getLostItems();
        } else {
          data = await itemsAPI.getFoundItems();
        }
        setItems(data.data || []);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load items. Please try again.');
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedTab]);

  // Set static campus locations
  useEffect(() => {
    const locations = [
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
    setCampusLocations(locations);
  }, []);

  // Format time ago
  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  // Filter items based on all criteria
  const filteredItems = items.filter((item) => {
    const itemName = item.itemName || '';
    const itemLocation = item.location || '';
    const itemCategory = item.category || '';
    
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         itemLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           itemCategory === selectedCategory;
    const matchesLocation = !selectedLocation || itemLocation === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleClearDate = (e) => {
    e.stopPropagation();
    setSelectedDate('');
  };

  const handleClearLocation = (e) => {
    e.stopPropagation();
    setSelectedLocation('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-b-xl transition-transform duration-300 z-50"
        style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)', paddingLeft: '2rem', paddingRight: '2rem', paddingBottom: '2rem' }}
      >
        <div className="flex items-center gap-4">
          <Link to="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Browse Items</h1>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: 'calc(6rem + env(safe-area-inset-top))' }}></div>

      {/* Search and Filters Section */}
      <div className="bg-white p-4 -mt-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => {
              setShowDatePicker(!showDatePicker);
              setShowLocationPicker(false);
              setShowFilterMenu(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedDate ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Date
            {selectedDate && <X className="w-3 h-3 cursor-pointer" onClick={handleClearDate} />}
          </button>
          <button 
            onClick={() => {
              setShowLocationPicker(!showLocationPicker);
              setShowDatePicker(false);
              setShowFilterMenu(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedLocation ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Location
            {selectedLocation && <X className="w-3 h-3 cursor-pointer" onClick={handleClearLocation} />}
          </button>
          <button 
            onClick={() => {
              setShowFilterMenu(!showFilterMenu);
              setShowDatePicker(false);
              setShowLocationPicker(false);
            }}
            className="ml-auto p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors"
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Date Picker Dropdown */}
        {showDatePicker && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-3 text-gray-800">Select Date Range</h3>
            <div className="space-y-2">
              <button 
                onClick={() => { setSelectedDate('today'); setShowDatePicker(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Today
              </button>
              <button 
                onClick={() => { setSelectedDate('week'); setShowDatePicker(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                This Week
              </button>
              <button 
                onClick={() => { setSelectedDate('month'); setShowDatePicker(false); }}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                This Month
              </button>
              <input 
                type="date" 
                onChange={(e) => { setSelectedDate(e.target.value); setShowDatePicker(false); }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
        )}

        {/* Location Picker Dropdown */}
        {showLocationPicker && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
            <h3 className="font-semibold mb-3 text-gray-800">Select Location</h3>
            <div className="space-y-2">
              {campusLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => { setSelectedLocation(location); setShowLocationPicker(false); }}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedLocation === location 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-200'
                  }`}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Filter Menu Dropdown */}
        {showFilterMenu && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold mb-3 text-gray-800">Additional Filters</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Most Recent</option>
                  <option>Oldest First</option>
                  <option>Nearest Location</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 py-3 flex gap-4">
        <button
          onClick={() => setSelectedTab('lost')}
          className={`flex-1 py-2 font-semibold transition-colors ${
            selectedTab === 'lost'
              ? 'text-gray-800 border-b-2 border-gray-800'
              : 'text-gray-500'
          }`}
        >
          Lost Items
        </button>
        <button
          onClick={() => setSelectedTab('found')}
          className={`flex-1 py-2 font-semibold transition-colors ${
            selectedTab === 'found'
              ? 'text-gray-800 border-b-2 border-gray-800'
              : 'text-gray-500'
          }`}
        >
          Found Items
        </button>
      </div>

      {/* Grid of Items */}
      <div className="p-4 bg-gray-50 pb-20">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-2">Loading items...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Link to={`/item/${item._id}`} key={item._id}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={item.images?.[0] || '/images/placeholder.jpg'}
                      alt={item.itemName}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        e.target.src = '/images/placeholder.jpg';
                      }}
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        {item.itemName}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            item.status === 'active'
                              ? 'bg-red-600 text-white'
                              : 'bg-green-600 text-white'
                          }`}
                        >
                          {item.status === 'active' ? 'Lost' : 'Found'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or be the first to report an item</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;