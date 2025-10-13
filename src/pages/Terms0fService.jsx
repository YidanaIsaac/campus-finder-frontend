import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white p-4" style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Terms of Service</h1>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Last Updated:</strong> October 2025
            </p>
            <p className="text-sm text-gray-600">
              Welcome to Campus Finder. By using our service, you agree to these terms. Please read them carefully.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              By accessing and using Campus Finder, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">2. User Accounts</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>You must provide accurate information when creating an account</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must be a current student, staff member, or authorized campus visitor</li>
              <li>One person may not maintain multiple accounts</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">3. Acceptable Use</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-2">You agree to use Campus Finder only for lawful purposes. You must not:</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Post false or misleading information about lost or found items</li>
              <li>Use the service to harass, abuse, or harm others</li>
              <li>Attempt to gain unauthorized access to the system</li>
              <li>Upload malicious code or viruses</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate another person or entity</li>
              <li>Use the service for commercial purposes without authorization</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">4. Content and Intellectual Property</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>You retain ownership of content you post (descriptions, photos)</li>
              <li>By posting content, you grant us a license to display and distribute it within the service</li>
              <li>You must own or have permission to post any photos you upload</li>
              <li>We reserve the right to remove any content that violates these terms</li>
              <li>Campus Finder logo, design, and features are our intellectual property</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">5. Item Claims and Returns</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Users must verify ownership before returning items</li>
              <li>Campus Finder is not responsible for disputes between users</li>
              <li>Always meet in public, well-lit campus locations</li>
              <li>Report suspicious activity to campus security</li>
              <li>We do not guarantee the return of any lost items</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">6. Privacy and Data</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
              use, and protect your personal information. By using Campus Finder, you consent to our data practices 
              as described in the Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">7. Disclaimers</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Campus Finder is provided "as is" without warranties of any kind</li>
              <li>We do not guarantee the accuracy of information posted by users</li>
              <li>We are not responsible for interactions between users</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>Use the service at your own risk</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">8. Limitation of Liability</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Campus Finder and its operators shall not be liable for any direct, indirect, incidental, special, 
              consequential, or punitive damages resulting from your use of or inability to use the service.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">9. Termination</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We reserve the right to suspend or terminate your account at any time for violations of these terms 
              or for any other reason at our discretion. You may also delete your account at any time.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">10. Changes to Terms</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              We may update these Terms of Service from time to time. We will notify users of significant changes. 
              Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">11. Contact Information</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              If you have questions about these Terms of Service, please contact us at:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>Email: support@campusfinder.edu</li>
              <li>Phone: +233 502 908 603</li>
              <li>Address: Campus   Computer Science Department</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              By using Campus Finder, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;