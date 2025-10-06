import React, { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  memoryUsage: number;
  fps: number;
}

const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    memoryUsage: 0,
    fps: 0
  });

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now();
    
    // Memory usage (if available)
    const memory = (performance as any).memory;
    const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0;

    // Simple FPS counter
    let frames = 0;
    let lastTime = performance.now();
    
    const countFrames = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        setMetrics(prev => ({
          ...prev,
          fps: Math.round((frames * 1000) / (currentTime - lastTime))
        }));
        frames = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(countFrames);
    };

    requestAnimationFrame(countFrames);

    setMetrics({
      loadTime: Math.round(loadTime),
      memoryUsage: Math.round(memoryUsage),
      fps: 0
    });
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-3 rounded-lg text-xs font-mono z-50">
      <div>Load: {metrics.loadTime}ms</div>
      <div>Memory: {metrics.memoryUsage}MB</div>
      <div>FPS: {metrics.fps}</div>
    </div>
  );
};

export default PerformanceMonitor;
