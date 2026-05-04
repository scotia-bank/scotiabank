import React, { useEffect } from 'react';
import { Download, Share, PlusSquare, ArrowUp, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { usePwaInstall } from '../hooks/usePwaInstall';

interface InstallScreenProps {
  onComplete: () => void;
}

export const InstallScreen: React.FC<InstallScreenProps> = ({ onComplete }) => {
  const { isInstallable, isStandalone, isIOS, install, deferredPrompt } = usePwaInstall();

  useEffect(() => {
    console.log('[Installer] State:', { isInstallable, isStandalone, isIOS, hasPrompt: !!deferredPrompt });
    if (isStandalone) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isStandalone, onComplete]);

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      // Chrome/Android prompt accepted
      // We don't call onComplete here because 'appinstalled' event will eventually fire
      // or the user will eventually be in standalone mode.
      // But for better UX we can just proceed if they accepted.
      onComplete();
    } else {
      // Prompt dismissed or failed
      onComplete();
    }
  };

  const handleContinue = () => {
    onComplete();
  };

  if (isStandalone) {
    return (
      <motion.div 
        key="standalone-success"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="h-screen w-screen bg-white flex flex-col items-center justify-center p-8"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 bg-[#ED0711] rounded-2xl flex items-center justify-center shadow-2xl mb-6">
            <img 
              src="https://cdn.brandfetch.io/idpIpGPfn2/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" 
              alt="Scotiabank" 
              className="w-10 h-10 rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <div className="flex items-center gap-2 text-green-600 font-bold">
            <ShieldCheck size={20} />
            <span>Secure Interface Active</span>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="h-screen w-screen bg-white flex flex-col overflow-hidden"
    >
      {/* Skip Button */}
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={handleContinue}
          className="px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded-full hover:bg-gray-200 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Header */}
      <div className="p-8 flex flex-col items-center text-center mt-6">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-16 h-16 bg-[#ED0711] rounded-2xl flex items-center justify-center shadow-xl mb-6"
        >
          <img 
            src="https://cdn.brandfetch.io/idpIpGPfn2/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" 
            alt="Scotiabank" 
            className="w-10 h-10 rounded-lg"
          />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-gray-900 tracking-tight"
        >
          Scotiabank Mobile
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-sm mt-2 max-w-[240px]"
        >
          The fastest and most secure way to manage your finances on the go.
        </motion.p>
      </div>

      {/* Features */}
      <div className="flex-1 px-8 py-4 space-y-6 overflow-y-auto no-scrollbar">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#ED0711] flex-shrink-0 border border-red-100">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">Instant Access</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Launch from your home screen with zero loading time and no browser interface.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0 border border-blue-100">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">App Security</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Verified application environment ensures your sensitive data stays protected.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-start gap-4"
        >
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0 border border-emerald-100">
            <Smartphone size={24} />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900">Native Interface</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Experience fluid motion and responsive gestures optimized for your device.</p>
          </div>
        </motion.div>
      </div>

      {/* Action Area */}
      <div className="p-8 bg-gray-50 border-t border-gray-100 pb-12">
        {isIOS ? (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
              <h4 className="font-bold text-gray-900 text-sm mb-4 text-center">Install Scotia Mobile</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">1</div>
                  <p className="text-sm text-gray-700">
                    Tap the <Share size={18} className="inline-block text-blue-500 mx-1 mb-1" /> button below.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-emerald-50 rounded-full flex items-center justify-center font-bold text-emerald-600 text-sm">2</div>
                  <p className="text-sm text-gray-700">
                    Choose <span className="font-bold">Add to Home Screen</span> <PlusSquare size={18} className="inline-block text-gray-700 mx-1 mb-1" />.
                  </p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleContinue}
              className="w-full py-4 text-gray-400 font-bold text-xs hover:text-gray-600 transition-colors active:scale-95"
            >
              Continue in Browser
            </button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <div className="flex justify-center -mb-2">
              <span className="bg-red-50 text-[#ED0711] text-[10px] font-black px-3 py-1 rounded-full tracking-widest border border-red-100 uppercase">Recommended</span>
            </div>
            
            <button 
              onClick={handleInstallClick}
              disabled={!isInstallable && !isStandalone}
              className={`w-full py-5 bg-[#ED0711] text-white font-bold rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-[0.98] transition-all text-lg border-2 border-white/10 ${!isInstallable ? 'opacity-50 grayscale' : 'hover:brightness-110'}`}
            >
              <Download size={24} />
              Install App
            </button>
            
            <div className="pt-2 flex flex-col items-center gap-4">
              {isInstallable ? (
                <p className="text-[10px] text-gray-400 text-center px-4">
                  Switching to the app provides significantly higher security and performance.
                </p>
              ) : (
                <p className="text-[10px] text-amber-600 text-center font-medium bg-amber-50 px-4 py-2 rounded-lg border border-amber-100">
                  Installation is already in progress or your browser doesn't support direct install.
                </p>
              )}
              
              <button 
                onClick={handleContinue}
                className="text-xs text-gray-400 font-bold hover:text-gray-600 transition-colors opacity-50 active:scale-95"
              >
                Use Web Version
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Floating Indicator for iOS */}
      {isIOS && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, repeat: Infinity, repeatType: 'reverse', duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-blue-500 z-[60]"
        >
          <div className="bg-blue-500 text-white text-[10px] font-black px-3 py-1 rounded-full mb-2 shadow-lg tracking-widest border-2 border-white">START HERE</div>
          <ArrowUp size={28} strokeWidth={3} />
        </motion.div>
      )}
    </motion.div>
  );
};
