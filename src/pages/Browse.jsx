import { useState, useEffect } from 'react';
import { Search, ArrowLeft, SlidersHorizontal, Calendar, MapPin, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { itemsAPI, locationsAPI } from '../utils/api';
import { formatDistanceToNow } from 'date-fns';

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
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'books', name: 'Books' },
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

  // Fetch campus locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await locationsAPI.getCampusLocations();
        setCampusLocations(data.data || []);
      } catch (err) {
        console.error('Error fetching locations:', err);
        setCampusLocations([]);
      }
    };

    fetchLocations();
  }, []);

  // Filter items based on all criteria
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesLocation = !selectedLocation || item.location === selectedLocation;
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-dark text-white p-4 shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <Link to="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">Browse Items</h1>
        </div>
      </header>

      {/* Search and Filters Section */}
      <div className="bg-white p-4">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
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
                  ? 'bg-dark text-white'
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
              selectedDate ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
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
              selectedLocation ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        )}

        {/* Location Picker Dropdown */}
        {showLocationPicker && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
            <h3 className="font-semibold mb-3 text-gray-800">Select Location</h3>
            <div className="space-y-2">
              {campusLocations.length > 0 ? (
                campusLocations.map((location) => (
                  <button
                    key={location.id || location}
                    onClick={() => { setSelectedLocation(location); setShowLocationPicker(false); }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedLocation === location 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    {typeof location === 'string' ? location : location.name}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Loading locations...</p>
              )}
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
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Most Recent</option>
                  <option>Oldest First</option>
                  <option>Nearest Location</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Books</option>
                  <option>Keys</option>
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
      <div className="p-4 bg-gray-50">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading items...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <Link to={`/item/${item.id}`} key={item.id}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-gray-800 mb-1 text-sm">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{item.location}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            item.status === 'lost'
                              ? 'bg-danger text-white'
                              : 'bg-success text-white'
                          }`}
                        >
                          {item.status === 'lost' ? 'Lost' : 'Found'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.postedAt && formatDistanceToNow(new Date(item.postedAt), { addSuffix: true }).replace('about ', '')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            {filteredItems.length > 0 && (
              <button className="w-full mt-6 py-3 border-2 border-gray-300 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition-colors">
                Load More Items
              </button>
            )}

            {/* Empty State */}
            {filteredItems.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items found</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse;