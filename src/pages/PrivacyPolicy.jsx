import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 z-40 shadow-md">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Privacy Policy</h1>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Last Updated:</strong> October 2025
            </p>
            <p className="text-sm text-gray-600">
              At Campus Finder, we respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your data.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Information We Collect</h2>
            <p className="text-sm text-gray-600 mb-2">We collect the following types of information:</p>
            
            <h3 className="font-semibold text-gray-800 mt-3 mb-2">Personal Information</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Name</li>
              <li>Student/Staff/Security ID number</li>
              <li>Email address</li>
              <li>Phone number (optional)</li>
              <li>Department or affiliation</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-3 mb-2">Item Information</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Item descriptions and photos</li>
              <li>Location data (where items were lost/found)</li>
              <li>Date and time of reports</li>
            </ul>

            <h3 className="font-semibold text-gray-800 mt-3 mb-2">Usage Information</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Device information and browser type</li>
              <li>IP address</li>
              <li>Pages visited and actions taken</li>
              <li>Time and date of visits</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
            <p className="text-sm text-gray-600 mb-2">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Provide and maintain the Campus Finder service</li>
              <li>Match lost and found items</li>
              <li>Send notifications about potential matches</li>
              <li>Enable communication between users</li>
              <li>Improve our service and user experience</li>
              <li>Prevent fraud and ensure security</li>
              <li>Comply with legal obligations</li>
              <li>Send service-related announcements</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Information Sharing</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              We value your privacy and only share your information in limited circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li><strong>With Other Users:</strong> Your name, department, and contact information are visible to users when you post items</li>
              <li><strong>With Campus Authorities:</strong> We may share information with campus security if required for safety or legal reasons</li>
              <li><strong>Service Providers:</strong> We may share data with trusted service providers who help operate our platform</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              <strong>We never sell your personal information to third parties.</strong>
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Data Security</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we 
              cannot guarantee absolute security.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mt-2">
              <li>Encrypted data transmission</li>
              <li>Secure password storage</li>
              <li>Regular security audits</li>
              <li>Limited employee access to data</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Your Rights and Choices</h2>
            <p className="text-sm text-gray-600 mb-2">You have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Correction:</strong> Update or correct inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your account and data</li>
              <li><strong>Opt-out:</strong> Unsubscribe from non-essential notifications</li>
              <li><strong>Data Portability:</strong> Request your data in a portable format</li>
            </ul>
            <p className="text-sm text-gray-600 mt-2">
              To exercise these rights, please contact us at support@campusfinder.edu
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Data Retention</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We retain your personal information for as long as your account is active or as needed to provide services. 
              When you delete your account, we will delete or anonymize your data within 30 days, except where we are 
              required to retain it for legal or security purposes.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Cookies and Tracking</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience. You can control cookie 
              preferences through your browser settings. Disabling cookies may affect some functionality of the service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Children's Privacy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Campus Finder is intended for use by students, staff, and visitors who are 18 years or older. We do not 
              knowingly collect information from individuals under 18.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. Changes to This Policy</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by 
              posting the new policy on this page and updating the "Last Updated" date. We encourage you to review 
              this policy periodically.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">10. Contact Us</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><strong>Email:</strong> support@campusfinder.edu</li>
              <li><strong>Phone:</strong> +233 502 908 603</li>
              <li><strong>Address:</strong> Campus IT Department, University of Ghana Campus</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By using Campus Finder, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;