import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight,
  FileText,
  HelpCircle,
  Book,
  AlertCircle,
  Send
} from 'lucide-react';

const HelpSupport = () => {
  const navigate = useNavigate();
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message) {
      alert('Your message has been sent! We\'ll get back to you soon.');
      setShowContactForm(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Please fill in all fields');
    }
  };

  const faqItems = [
    {
      question: 'How do I report a lost item?',
      answer: 'Click the red "Report Lost Item" button on the home page, fill out the form with item details, add a photo if possible, and submit. You\'ll receive notifications if someone finds a matching item.'
    },
    {
      question: 'How do I report a found item?',
      answer: 'Click the green "Report Found Item" button on the home page, provide details about the item including where and when you found it, add a photo, and submit. The system will notify anyone who reported a matching lost item.'
    },
    {
      question: 'How do I search for my lost item?',
      answer: 'Go to the Browse page, use the search bar to enter your item name, or filter by category and location. You can also check notifications for potential matches.'
    },
    {
      question: 'What should I do if I find a match?',
      answer: 'Click on the item to view details, then use the "Send Message", "Call", or "Email" buttons to contact the person who posted the item. Arrange a safe meeting on campus to verify ownership and return the item.'
    },
    {
      question: 'How can I verify item ownership?',
      answer: 'Ask for specific details about the item (serial number, unique features, photos before it was lost, purchase receipt, etc.). Meet in a public place on campus for the exchange.'
    },
    {
      question: 'Can I edit or delete my report?',
      answer: 'Currently, you can view your reports on your profile page. To edit or delete, please contact support. We\'re working on adding this feature soon.'
    },
    {
      question: 'I found my item. How do I mark it as resolved?',
      answer: 'Go to your profile, find the item in your Active reports, and click on it. You\'ll see an option to mark it as resolved.'
    },
    {
      question: 'How do notifications work?',
      answer: 'You\'ll receive notifications when: someone finds an item matching your lost report, your found item is claimed, or there\'s a possible match. Check the Notifications page regularly.'
    }
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Available Everyday, 7:30AM-7:30PM',
      action: 'tel:+233502908603',
      actionText: '+233 502 908 603',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Response within 24 hours',
      action: 'mailto:support@campusfinder.edu',
      actionText: 'support@campusfinder.edu',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Chat',
      description: 'Quick response on WhatsApp',
      action: 'https://wa.me/233592543738?text=Hi%2C%20I%20need%20help%20with%20Campus%20Finder',
      actionText: 'Chat on WhatsApp',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    }
  ];

  const quickLinks = [
    {
      icon: Book,
      title: 'User Guide',
      description: 'Learn how to use Campus Finder',
      path: '/user-guide'
    },
    {
      icon: FileText,
      title: 'Terms of Service',
      description: 'Read our terms and conditions',
      path: '/terms-of-service'
    },
    {
      icon: AlertCircle,
      title: 'Privacy Policy',
      description: 'How we protect your data',
      path: '/privacy-policy'
    },
    {
      icon: HelpCircle,
      title: 'Report a Bug',
      description: 'Help us improve the app',
      action: () => setShowContactForm(true)
    }
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-dark text-white p-4 shadow-md" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Help & Support</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Contact Methods */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Contact Us</h2>
          <div className="space-y-3">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className={`${method.bgColor} p-3 rounded-full`}>
                    <method.icon className={`w-5 h-5 ${method.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{method.title}</h3>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
                <div className="mt-3 pl-14">
                  <a 
                    href={method.action}
                    target={method.action.startsWith('https') ? '_blank' : undefined}
                    rel={method.action.startsWith('https') ? 'noopener noreferrer' : undefined}
                    className="text-primary font-medium text-sm hover:underline"
                  >
                    {method.actionText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Quick Links</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => link.path ? navigate(link.path) : link.action()}
                className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${
                  index !== quickLinks.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon className="w-5 h-5 text-gray-600" />
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">{link.title}</p>
                    <p className="text-xs text-gray-600">{link.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Send Message Button */}
        <button
          onClick={() => setShowContactForm(true)}
          className="w-full bg-primary text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors"
        >
          <Send className="w-5 h-5" />
          Send Us a Message
        </button>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>Campus Finder v1.0.0</p>
          <p className="mt-1">© 2025 Campus Finder. All rights reserved.</p>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[60]">
          <div className="bg-white rounded-t-3xl w-full max-w-[480px] mx-auto p-6 pb-8 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Contact Support</h3>
              <button 
                onClick={() => {
                  setShowContactForm(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="technical">Technical Issue</option>
                  <option value="account">Account Problem</option>
                  <option value="report">Report Issue</option>
                  <option value="feature">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your issue or question..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowContactForm(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;