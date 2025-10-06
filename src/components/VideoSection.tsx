import React, { useState, useEffect, useRef } from 'react';

const VideoSection = () => {
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideos(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-light mb-12 tracking-wide text-gray-800 text-center">
          Rituals in Motion
        </h2>
        <div className="grid md:grid-cols-2 gap-16 mb-16">
          {/* Video 1 - Elegant Motion */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white flex flex-col items-center">
            {shouldLoadVideos ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-[20rem] object-cover"
              >
                <source src="/videos/3998263-uhd_4096_2160_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-[20rem] bg-gradient-to-br from-stone-200 to-amber-200 flex items-center justify-center">
                <div className="text-gray-600 font-light">Loading video...</div>
              </div>
            )}
            <div className="p-8 text-gray-700 text-xl font-light text-center">
              The Radiance Ritual: Experience the glow of mindful skincare.
            </div>
          </div>
          
          {/* Video 2 - Luxurious Texture */}
          <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 bg-white flex flex-col items-center">
            {shouldLoadVideos ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-[20rem] object-cover"
              >
                <source src="/videos/4153584-uhd_4096_2160_25fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-[20rem] bg-gradient-to-br from-stone-200 to-amber-200 flex items-center justify-center">
                <div className="text-gray-600 font-light">Loading video...</div>
              </div>
            )}
            <div className="p-8 text-gray-700 text-xl font-light text-center">
              Soulful Awakening: The art of self-care, elevated.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
