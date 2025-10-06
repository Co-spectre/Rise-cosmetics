import React from 'react';
import { Sparkles } from 'lucide-react';

const serum = {
  name: 'Radiance Serum',
  subtitle: 'Illuminating Face Serum',
  price: '€68',
  color: 'bg-stone-50',
  image: '/serum-bottle.png', // You should add a PNG of a serum bottle to public/
  ingredients: [
    { name: 'Sprouted Rice Peptides', color: '#d6d383' },
    { name: 'Vitamin C', color: '#cc7f3d' },
    { name: 'Hyaluronic Acid', color: '#7d8c6a' }
  ],
  howToUse: 'Apply 2-3 drops to clean skin, gently pat until absorbed. Use morning and evening before moisturizer.'
};

const SerumPreview = () => {
  return (
    <section className="py-32" style={{ background: '#f7f5ef' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-20 items-center">
        {/* Serum Image */}
        <div className="flex flex-col items-center">
          <div className="w-48 h-72 bg-[#ede9dd] rounded-3xl flex items-center justify-center shadow-xl border border-[#ede9dd] mb-8 relative">
            <img src={serum.image} alt="Serum Bottle" className="w-32 h-60 object-contain drop-shadow-lg" />
            <Sparkles className="absolute -top-6 -right-6 w-10 h-10 text-[#d6d383] opacity-70" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-playfair font-light text-[#797870] mb-2">{serum.name}</h2>
          <p className="text-[#cc7f3d] text-sm tracking-widest uppercase mb-4">{serum.subtitle}</p>
          <p className="text-black font-light text-lg mb-2">{serum.price}</p>
        </div>
        {/* Ingredients & How to Use */}
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-playfair font-light mb-6 tracking-wide text-[#7d8c6a]">Key Ingredients</h3>
          <ul className="space-y-4 mb-10">
            {serum.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-center space-x-4">
                <span className="w-6 h-6 rounded-full inline-block" style={{ background: ingredient.color }}></span>
                <span className="text-lg font-light text-[#797870]">{ingredient.name}</span>
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-playfair font-light mb-4 tracking-wide text-[#7d8c6a]">How to Use</h3>
          <p className="text-[#797870] leading-relaxed font-light text-lg bg-[#f8f7f3] rounded-xl p-6 shadow-sm">
            {serum.howToUse}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SerumPreview;
