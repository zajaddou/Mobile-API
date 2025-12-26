import { Mail, Globe, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#072B3C]/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/network.png" alt="Network" className="w-10 h-10" />
              <div>
                <h3 className="text-white font-bold text-lg">Network</h3>
                <p className="text-gray-400 text-sm">Powered by Robixe</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Turn your idle device into a source of passive income with secure proxy sharing.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#download" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Download
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@robixe.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Globe className="w-4 h-4" />
                <span className="text-sm">www.robixe.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#072B3C]/30">
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Robixe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
