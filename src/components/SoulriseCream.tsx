import React from 'react';

const SoulriseCream = () => (
  <section className="py-32 bg-[#f8f7f3]">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-20 items-center">
      {/* Image Placeholder */}
      <div className="flex flex-col items-center">
        <div className="w-48 h-72 bg-[#ede9dd] rounded-3xl flex items-center justify-center shadow-xl border border-[#ede9dd] mb-8 relative">
          <img src="/soulrise-cream.png" alt="Soulrise Cream" className="w-32 h-60 object-contain drop-shadow-lg" />
        </div>
        <h2 className="text-3xl font-playfair font-light text-[#797870] mb-2">Soulrise Cream</h2>
        <p className="text-[#cc7f3d] text-sm tracking-widest uppercase mb-4">Anti-Aging Face Cream</p>
        <p className="text-black font-light text-lg mb-2">€78</p>
      </div>
      {/* Description */}
      <div className="flex flex-col justify-center">
        <h3 className="text-xl font-playfair font-light mb-6 tracking-wide text-[#7d8c6a]">Description</h3>
        <p className="text-[#797870] leading-relaxed font-light text-lg bg-[#f8f7f3] rounded-xl p-6 shadow-sm mb-8">
          Premium face cream that renews and revitalizes with age-defying rice technology. For luminous, youthful skin.
        </p>
        <h3 className="text-xl font-playfair font-light mb-4 tracking-wide text-[#7d8c6a]">How to Use</h3>
        <p className="text-[#797870] leading-relaxed font-light text-lg bg-[#f8f7f3] rounded-xl p-6 shadow-sm">
          Apply a small amount to face and neck after serum. Use morning and night for best results.
        </p>
      </div>
    </div>
  </section>
);

export default SoulriseCream;
