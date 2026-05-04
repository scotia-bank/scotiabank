import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePwaInstall } from '../hooks/usePwaInstall';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isStandalone, isIOS, install } = usePwaInstall();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // If already in standalone mode, never show
    if (isStandalone) {
      setIsVisible(false);
      return;
    }

    // Check localStorage for dismissal
    const dismissedAt = localStorage.getItem('pwa-prompt-dismissed');
    const isRecentlyDismissed = dismissedAt && (Date.now() - parseInt(dismissedAt)) < 1000 * 60 * 60 * 24; // 24 hours

    if (!isRecentlyDismissed && (isInstallable || isIOS)) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Wait 5 seconds before showing the reminder
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isStandalone, isIOS]);

  const handleInstallClick = async () => {
    const success = await install();
    if (success) {
      setIsVisible(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
  };

  // Explicitly don't render if not needed
  if (!isVisible || isStandalone) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-20 left-4 right-4 z-[9999] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-[#ED0711] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-100">
          <img 
            src="https://cdn.brandfetch.io/idpIpGPfn2/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B" 
            alt="App Icon" 
            className="w-7 h-7 rounded-md"
          />
        </div>
        
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm tracking-tight">Scotia Mobile</h3>
          <p className="text-[11px] text-gray-500 leading-tight mt-0.5">
            {isIOS 
              ? "Tap 'Share' then 'Add to Home Screen'" 
              : "Install the app for the full experience"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isIOS && isInstallable && (
            <button
              onClick={handleInstallClick}
              className="bg-[#ED0711] text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-200 active:scale-95 transition-transform"
            >
              <Download size={16} />
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="p-2 text-gray-400 hover:text-gray-600 active:scale-90 transition-transform"
          >
            <X size={20} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

