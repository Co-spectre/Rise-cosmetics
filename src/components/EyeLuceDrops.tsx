import React from 'react';

const EyeLuceDrops = () => (
  <section className="py-32 bg-[#f7f5ef]">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-20 items-center">
      {/* Image Placeholder */}
      <div className="flex flex-col items-center">
        <div className="w-48 h-72 bg-[#ede9dd] rounded-3xl flex items-center justify-center shadow-xl border border-[#ede9dd] mb-8 relative">
          <img src="/eye-luce-drops.png" alt="Eye Luce Drops" className="w-32 h-60 object-contain drop-shadow-lg" />
        </div>
        <h2 className="text-3xl font-playfair font-light text-[#797870] mb-2">Eye Luce Drops</h2>
        <p className="text-[#cc7f3d] text-sm tracking-widest uppercase mb-4">Brightening Eye Drops</p>
        <p className="text-black font-light text-lg mb-2">€52</p>
      </div>
      {/* Description */}
      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-playfair font-light mb-6 tracking-wide text-[#7d8c6a]">Description</h3>
        <p className="text-[#797870] leading-relaxed font-light text-lg bg-[#f7f5ef] rounded-xl p-6 shadow-sm mb-8">
          Delicate eye drops that brighten and smooth the tender skin around your eyes. For a luminous, awakened look.
        </p>
        <h3 className="text-xl font-playfair font-light mb-4 tracking-wide text-[#7d8c6a]">How to Use</h3>
        <p className="text-[#797870] leading-relaxed font-light text-lg bg-[#f7f5ef] rounded-xl p-6 shadow-sm">
          Apply one drop to each under-eye area and gently pat in. Use morning and night.
        </p>
      </div>
    </div>
  </section>
);

export default EyeLuceDrops;
