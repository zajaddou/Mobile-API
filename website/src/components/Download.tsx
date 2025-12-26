import { Download as DownloadIcon, Shield, CheckCircle } from 'lucide-react';

export default function Download() {
  
  // --- دالة التحميل ---
  const handleDownload = () => {
    // هذا الرابط سيجعل المتصفح يبدأ التحميل فوراً
    window.location.href = "https://api.robixe.com/download-app";
  };

  return (
    <section id="download" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-t from-[#072B3C]/20 to-transparent"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#072B3C] to-[#0a3d52] rounded-3xl p-12 sm:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Start Earning?
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Download Network now and join thousands of users earning passive income every day
              </p>
            </div>

            <div className="flex flex-col items-center gap-8">
              {/* --- تم تعديل الزر هنا --- */}
              <button 
                onClick={handleDownload}
                className="group px-10 py-5 bg-white hover:bg-gray-100 text-[#072B3C] rounded-xl font-bold text-xl transition-all duration-300 flex items-center gap-3 shadow-2xl hover:scale-105 cursor-pointer"
              >
                <DownloadIcon className="w-6 h-6" />
                Download APK
                <span className="text-sm font-normal opacity-75">(v1.0.0)</span>
              </button>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Android 6.0+</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>15 MB Download</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Safe & Secure</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm max-w-2xl">
                <p className="text-sm text-gray-200 text-center">
                  <strong>Note:</strong> Since this app is distributed outside of the Play Store, you'll need to enable "Install from Unknown Sources" in your device settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}