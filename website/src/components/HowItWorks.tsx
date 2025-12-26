import { Download, Play, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Download,
    title: 'Download & Install',
    description: 'Get the Network APK file and install it on your Android device in seconds.',
    step: '01',
  },
  {
    icon: Play,
    title: 'Start the App',
    description: 'Launch the app and enable background service. Your device becomes part of the network.',
    step: '02',
  },
  {
    icon: TrendingUp,
    title: 'Earn Rewards',
    description: 'Watch your earnings grow as your device shares bandwidth securely in the background.',
    step: '03',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-black via-[#072B3C]/10 to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-full h-full bg-[#072B3C]/5 blur-3xl transform -translate-x-1/2"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start earning in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-1/3 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#072B3C] to-transparent"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-[#072B3C] blur-xl opacity-50 scale-110"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#072B3C] to-[#0a3d52] rounded-2xl flex items-center justify-center shadow-2xl">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-black border-2 border-[#072B3C] rounded-full flex items-center justify-center">
                    <span className="text-[#072B3C] font-bold text-lg">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

