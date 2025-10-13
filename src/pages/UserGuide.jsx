import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, Bell, User as UserIcon, Filter, MessageCircle } from 'lucide-react';

const UserGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: 'Getting Started',
      icon: UserIcon,
      content: [
        {
          subtitle: 'Creating an Account',
          steps: [
            'Open the Campus Finder app',
            'Click "Sign Up" on the login page',
            'Select your user type (Student, Staff, Visitor, or Security)',
            'Fill in your details (Name, ID/Email, Password)',
            'Click "Create Account" to complete registration'
          ]
        },
        {
          subtitle: 'Logging In',
          steps: [
            'Open the Campus Finder app',
            'Enter your Student/Staff/Security ID or Email',
            'Enter your password',
            'Click "Sign In" to access your account'
          ]
        }
      ]
    },
    {
      title: 'Reporting Lost Items',
      icon: Plus,
      content: [
        {
          subtitle: 'How to Report a Lost Item',
          steps: [
            'Click the red "Report Lost Item" button on the home page',
            'Select the item category from the dropdown',
            'Enter the item name (e.g., "iPhone 14 Pro")',
            'Write a detailed description including unique features',
            'Select the location where you lost it',
            'Choose the date when you lost the item',
            'Optionally add color, brand, and a photo',
            'Click "Submit Report" to post your lost item',
            'You\'ll receive notifications if someone finds a matching item'
          ]
        }
      ]
    },
    {
      title: 'Reporting Found Items',
      icon: Search,
      content: [
        {
          subtitle: 'How to Report a Found Item',
          steps: [
            'Click the green "Report Found Item" button on the home page',
            'Select the item category',
            'Enter the item name',
            'Describe the item in detail',
            'Select where you found it (or use current location)',
            'Choose the date when you found it',
            'Add a photo if possible',
            'Click "Submit Report"',
            'The system will automatically notify anyone who reported a matching lost item'
          ]
        }
      ]
    },
    {
      title: 'Searching for Items',
      icon: Filter,
      content: [
        {
          subtitle: 'Using the Browse Page',
          steps: [
            'Click "Browse" in the bottom navigation',
            'Use the search bar to enter item name or keywords',
            'Filter by category (All Items, Electronics, Clothing, Books)',
            'Use Date filter to narrow down by time period',
            'Use Location filter to search specific campus areas',
            'Switch between "Lost Items" and "Found Items" tabs',
            'Click on any item card to view full details'
          ]
        }
      ]
    },
    {
      title: 'Contacting Item Owners',
      icon: MessageCircle,
      content: [
        {
          subtitle: 'How to Contact Someone',
          steps: [
            'Find the item on the Browse page',
            'Click on the item to view details',
            'Review the item description and reporter information',
            'Click "Send Message" to write a message',
            'Or click "Call" to phone them directly',
            'Or click "Email" to send an email',
            'Arrange a safe meeting on campus to verify and exchange the item'
          ]
        },
        {
          subtitle: 'Safety Tips',
          steps: [
            'Always meet in public places on campus',
            'Verify ownership before returning items (ask for proof)',
            'Never share personal information unnecessarily',
            'Report suspicious activity to campus security',
            'Use the in-app messaging system when possible'
          ]
        }
      ]
    },
    {
      title: 'Managing Your Profile',
      icon: UserIcon,
      content: [
        {
          subtitle: 'Viewing Your Reports',
          steps: [
            'Click "Profile" in the bottom navigation',
            'View your statistics (Lost Reports, Found Reports, Resolved)',
            'Switch between "Active" and "Resolved" tabs',
            'Click on any report to view details',
            'Mark items as resolved when found/returned'
          ]
        },
        {
          subtitle: 'Settings',
          steps: [
            'Go to your Profile page',
            'Scroll down to the Settings section',
            'Click "Edit Profile" to update your information',
            'Click "Notification Preferences" to manage alerts',
            'Click "Privacy Settings" to control your data',
            'Click "Help & Support" for assistance'
          ]
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      content: [
        {
          subtitle: 'Understanding Notifications',
          steps: [
            'Match Found: A found item matches your lost report',
            'Item Claimed: Your found item has been claimed',
            'Possible Match: A potential match for your item',
            'Item Returned: Your lost item has been returned',
            'Check notifications regularly for updates',
            'Click on notifications to view item details'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white p-4" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">User Guide</h1>
        </div>
      </header>

      <div className="p-4">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <section.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
            </div>

            {section.content.map((item, itemIdx) => (
              <div key={itemIdx} className="bg-white rounded-xl p-4 shadow-sm mb-3">
                <h3 className="font-semibold text-gray-800 mb-3">{item.subtitle}</h3>
                <ol className="space-y-2">
                  {item.steps.map((step, stepIdx) => (
                    <li key={stepIdx} className="flex gap-3 text-sm text-gray-600">
                      <span className="font-semibold text-primary flex-shrink-0">{stepIdx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        ))}

        {/* Contact Section */}
        <div className="bg-primary-light rounded-xl p-6 text-center">
          <h3 className="font-bold text-gray-800 mb-2">Need More Help?</h3>
          <p className="text-sm text-gray-600 mb-4">
            If you have questions not covered in this guide, please contact our support team.
          </p>
          <button
            onClick={() => navigate('/help-support')}
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;