import { Zap, Users, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const StatCounter = ({ end, label, prefix = '' }: { end: number; label: string; prefix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = end / 30;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 50);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl sm:text-4xl font-bold text-[#0EA5E9] mb-1">
        {prefix}{count}
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  );
};

export default function Hero() {
  const scrollToDownload = () => {
    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#072B3C] via-black to-black"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#072B3C] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0EA5E9] rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-[#072B3C] rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-2 h-2 bg-[#0EA5E9] rounded-full opacity-50 animate-bounce"></div>
        <div className="absolute top-40 left-20 w-1.5 h-1.5 bg-[#072B3C] rounded-full opacity-40 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-[#0EA5E9] rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-center mb-8 animate-float">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#072B3C] to-[#0EA5E9] rounded-3xl blur-2xl opacity-20"></div>
            <img
              src="/network.png"
              alt="Network Logo"
              className="relative w-32 h-32 sm:w-40 sm:h-40 drop-shadow-2xl"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white mb-4 tracking-tighter">
            Network
          </h1>
          <div className="inline-block">
            <p className="text-xl sm:text-2xl text-gray-300 font-light">
              Powered by <span className="text-[#0EA5E9] font-bold">Robixe</span>
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#072B3C]/20 via-transparent to-[#072B3C]/20 blur-xl"></div>
            <p className="relative text-lg sm:text-xl text-gray-200 leading-relaxed px-6 py-8">
              <span className="text-2xl font-bold text-[#0EA5E9]">Earn passive income</span> by sharing your internet connection. Your phone works in the background while you earn real money. It's that simple.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 sm:gap-8 max-w-2xl mx-auto mb-16">
          <StatCounter end={1} label="Active Users" prefix="+" />
          <StatCounter end={0} label="Earned Total" prefix="$" />
          <StatCounter end={1} label="Countries" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={scrollToDownload}
            className="group relative px-8 sm:px-10 py-4 bg-gradient-to-r from-[#072B3C] to-[#0a3d52] hover:from-[#0a3d52] hover:to-[#0d4f6b] text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 shadow-2xl hover:shadow-[0_0_30px_rgba(7,43,60,0.5)] hover:scale-105"
          >
            <Zap className="w-5 h-5" />
            Download APK Now
            <span className="text-xs font-normal opacity-75">Free</span>
          </button>

          <a
            href="#features"
            className="px-8 sm:px-10 py-4 border-2 border-[#0EA5E9] hover:bg-[#0EA5E9]/10 text-white rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:border-[#0EA5E9]/80"
          >
            How It Works
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
            <span>No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
            <span>Bank-Level Security</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0EA5E9] rounded-full"></div>
            <span>Instant Payouts</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
          <div className="p-4 rounded-lg bg-[#072B3C]/20 border border-[#072B3C]/30 text-center">
            <Users className="w-6 h-6 text-[#0EA5E9] mx-auto mb-2" />
            <p className="text-gray-300 text-sm font-medium">Growing Community</p>
          </div>
          <div className="p-4 rounded-lg bg-[#072B3C]/20 border border-[#072B3C]/30 text-center">
            <TrendingUp className="w-6 h-6 text-[#0EA5E9] mx-auto mb-2" />
            <p className="text-gray-300 text-sm font-medium">High Earnings</p>
          </div>
          <div className="p-4 rounded-lg bg-[#072B3C]/20 border border-[#072B3C]/30 text-center">
            <Zap className="w-6 h-6 text-[#0EA5E9] mx-auto mb-2" />
            <p className="text-gray-300 text-sm font-medium">Fast Setup</p>
          </div>
        </div>
      </div>

    </div>
  );
}
