import { DollarSign, Shield, Smartphone, Zap } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: 'Passive Income',
    description: 'Earn money automatically while your device runs in the background. No active participation required.',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data remains protected with enterprise-grade encryption and secure proxy protocols.',
  },
  {
    icon: Smartphone,
    title: 'Lightweight App',
    description: 'Minimal battery and data usage. Optimized to run efficiently without affecting your device performance.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'Get started in minutes. Download, install, and start earning with just a few taps.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#072B3C]/5 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Choose Network?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The smartest way to monetize your unused internet bandwidth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gradient-to-br from-[#072B3C]/20 to-transparent border border-[#072B3C]/30 rounded-2xl hover:border-[#072B3C] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#072B3C]/20"
            >
              <div className="mb-6 inline-block p-4 bg-[#072B3C]/30 rounded-xl group-hover:bg-[#072B3C]/50 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
