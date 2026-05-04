import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Global variable to catch the event even before the hook is initialized
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
let promptListeners: Set<(prompt: BeforeInstallPromptEvent | null) => void> = new Set();

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    // Notify all active hooks
    promptListeners.forEach(listener => listener(globalDeferredPrompt));
    console.log('Global beforeinstallprompt event captured');
  });

  window.addEventListener('appinstalled', (e) => {
    globalDeferredPrompt = null;
    promptListeners.forEach(listener => listener(null));
    console.log('PWA was installed (Global Listener)');
  });
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(globalDeferredPrompt);
  const [isInstallable, setIsInstallable] = useState(!!globalDeferredPrompt);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const updatePrompt = (prompt: BeforeInstallPromptEvent | null) => {
      setDeferredPrompt(prompt);
      setIsInstallable(!!prompt);
    };

    promptListeners.add(updatePrompt);

    // Initial check for standalone
    const checkStandalone = () => {
      const standalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (navigator as any).standalone === true;
      setIsStandalone(standalone);
    };

    // Check if it's iOS
    const checkIOS = () => {
      const ua = window.navigator.userAgent;
      const isIOSDevice = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
      setIsIOS(isIOSDevice);
    };

    checkStandalone();
    checkIOS();

    return () => {
      promptListeners.delete(updatePrompt);
    };
  }, []);

  const install = useCallback(async () => {
    const promptToUse = deferredPrompt || globalDeferredPrompt;
    
    if (!promptToUse) {
      console.log('No deferred prompt available for installation');
      return false;
    }

    try {
      // Show the install prompt
      await promptToUse.prompt();

      // Wait for the user to respond to the prompt
      const { outcome } = await promptToUse.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);

      // Clear the prompt
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
      setIsInstallable(false);

      return outcome === 'accepted';
    } catch (err) {
      console.error('Error during installation process:', err);
      return false;
    }
  }, [deferredPrompt]);

  return {
    isInstallable: isInstallable || !!deferredPrompt || !!globalDeferredPrompt,
    isStandalone,
    isIOS,
    install,
    deferredPrompt: deferredPrompt || globalDeferredPrompt
  };
}
