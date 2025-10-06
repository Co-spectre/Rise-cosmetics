// Simple audio and haptic feedback utility
export const playCartSound = () => {
  try {
    // Haptic feedback for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 100]); // Short vibration pattern
    }
    
    // Create a simple beep using the Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Create a gentle chime sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Pleasant chord progression
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    oscillator.type = 'sine';
    
    // Gentle fade in and out
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
    gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.15);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
    
  } catch (error) {
    // Fallback: silent if audio context is not available
    // Audio feedback not available in this environment
    // console.log('Audio feedback not available');
  }
};

export default playCartSound;
