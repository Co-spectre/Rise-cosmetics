import React, { useState, useRef, useEffect } from 'react';
import { Leaf, Droplets, Sparkles, Shield, Heart, ArrowRight } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  scientificName: string;
  icon: React.ReactNode;
  description: string;
  benefits: string[];
  origin: string;
  percentage: number;
  color: string;
  image: string;
  molecules: string[];
}

const IngredientSpotlight: React.FC = () => {
  const [activeIngredient, setActiveIngredient] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const ingredients: Ingredient[] = [
    {
      id: 'rice',
      name: 'Japanese Rice Extract',
      scientificName: 'Oryza Sativa',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'Sourced from the pristine fields of Japan, our rice extract is rich in antioxidants and amino acids that naturally brighten and nourish the skin.',
      benefits: ['Brightening', 'Antioxidant Protection', 'Gentle Exfoliation', 'Hydration'],
      origin: 'Japan',
      percentage: 25,
      color: 'from-yellow-200 to-amber-300',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
      molecules: ['Kojic Acid', 'Ferulic Acid', 'Vitamin E', 'Gamma Oryzanol']
    },
    {
      id: 'olive',
      name: 'Mediterranean Olive Oil',
      scientificName: 'Olea Europaea',
      icon: <Leaf className="w-6 h-6" />,
      description: 'Cold-pressed from ancient olive groves, this precious oil delivers deep moisturization and powerful anti-aging properties.',
      benefits: ['Deep Moisturization', 'Anti-aging', 'Skin Barrier Repair', 'Vitamin E Rich'],
      origin: 'Mediterranean',
      percentage: 20,
      color: 'from-green-200 to-emerald-300',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop',
      molecules: ['Squalene', 'Oleic Acid', 'Vitamin E', 'Polyphenols']
    },
    {
      id: 'hyaluronic',
      name: 'Hyaluronic Acid',
      scientificName: 'Sodium Hyaluronate',
      icon: <Droplets className="w-6 h-6" />,
      description: 'Multi-molecular weight hyaluronic acid that penetrates deep into the skin for intense, long-lasting hydration.',
      benefits: ['Intense Hydration', 'Plumping Effect', 'Moisture Retention', 'Skin Elasticity'],
      origin: 'Bio-fermented',
      percentage: 15,
      color: 'from-blue-200 to-cyan-300',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=500&fit=crop',
      molecules: ['Low MW HA', 'Medium MW HA', 'High MW HA', 'Crosslinked HA']
    },
    {
      id: 'peptides',
      name: 'Marine Peptides',
      scientificName: 'Palmitoyl Pentapeptide-4',
      icon: <Shield className="w-6 h-6" />,
      description: 'Advanced peptide complex derived from marine sources that stimulates collagen production and improves skin firmness.',
      benefits: ['Collagen Boost', 'Firmness', 'Wrinkle Reduction', 'Skin Renewal'],
      origin: 'Marine Sources',
      percentage: 12,
      color: 'from-purple-200 to-indigo-300',
      image: 'https://images.unsplash.com/photo-1583334146533-5b8b8a6a1951?w=500&h=500&fit=crop',
      molecules: ['Matrixyl 3000', 'Argireline', 'Copper Peptides', 'Signal Peptides']
    }
  ];

  const currentIngredient = ingredients[activeIngredient];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIngredient(prev => (prev + 1) % ingredients.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const BenefitCard: React.FC<{ benefit: string; isHovered: boolean }> = ({ 
    benefit, 
    isHovered 
  }) => {
    const benefitDescriptions: Record<string, string> = {
      'Brightening': 'Reduces dark spots and evens skin tone for a luminous complexion',
      'Antioxidant Protection': 'Shields skin from environmental damage and free radicals',
      'Gentle Exfoliation': 'Removes dead skin cells without irritation',
      'Hydration': 'Maintains optimal moisture levels for healthy skin',
      'Deep Moisturization': 'Penetrates deep layers for long-lasting hydration',
      'Anti-aging': 'Reduces fine lines and prevents premature aging',
      'Skin Barrier Repair': 'Strengthens and restores protective skin barrier',
      'Vitamin E Rich': 'Provides powerful antioxidant protection',
      'Intense Hydration': 'Delivers maximum moisture for plump, healthy skin',
      'Plumping Effect': 'Visibly fills fine lines and adds volume',
      'Moisture Retention': 'Helps skin hold onto hydration longer',
      'Skin Elasticity': 'Improves skin bounce and flexibility',
      'Collagen Boost': 'Stimulates natural collagen production',
      'Firmness': 'Improves skin structure and tightness',
      'Wrinkle Reduction': 'Minimizes appearance of fine lines and wrinkles',
      'Skin Renewal': 'Accelerates cell turnover for fresher skin'
    };

    return (
      <div
        className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
          isHovered 
            ? 'bg-white shadow-lg transform scale-105' 
            : 'bg-white/60 hover:bg-white/80'
        }`}
        onMouseEnter={() => setHoveredBenefit(benefit)}
        onMouseLeave={() => setHoveredBenefit(null)}
      >
        <h4 className="font-medium text-olive-900 mb-2">{benefit}</h4>
        <p className={`text-sm text-olive-600 transition-all duration-300 ${
          isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
        }`}>
          {benefitDescriptions[benefit]}
        </p>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-24 bg-gradient-to-br from-rice-25 via-white to-olive-25">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-7xl mx-auto">
          {/* Ingredient Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative group">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl">
                <img
                  src={currentIngredient.image}
                  alt={currentIngredient.name}
                  className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentIngredient.color} opacity-30`} />

                {/* Percentage Badge */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-white/90 backdrop-blur-sm rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-xl md:text-2xl font-bold text-olive-900">{currentIngredient.percentage}%</span>
                    <p className="text-xs text-olive-600">Active</p>
                  </div>
                </div>
              </div>

              {/* Origin Badge */}
              <div className="absolute -bottom-3 left-4 md:-bottom-4 md:left-6 bg-olive-900 text-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-xl">
                <div className="flex items-center gap-2">
                  <Heart className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">Sourced from {currentIngredient.origin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredient Information */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div>
              <h3 className="text-3xl md:text-4xl font-light text-olive-900 mb-2">
                {currentIngredient.name}
              </h3>
              <p className="text-lg md:text-xl text-olive-600 italic mb-3 md:mb-4">
                {currentIngredient.scientificName}
              </p>
              <p className="text-base md:text-lg text-olive-700 leading-relaxed">
                {currentIngredient.description}
              </p>
            </div>

            {/* Benefits Grid */}
            <div>
              <h4 className="text-xl md:text-2xl font-light text-olive-900 mb-4 md:mb-6">Key Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {currentIngredient.benefits.map((benefit) => (
                  <BenefitCard
                    key={benefit}
                    benefit={benefit}
                    isHovered={hoveredBenefit === benefit}
                  />
                ))}
              </div>
            </div>

            {/* Molecular Structure */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6">
              <h4 className="text-lg md:text-xl font-medium text-olive-900 mb-3 md:mb-4">Active Molecules</h4>
              <div className="flex flex-wrap gap-2">
                {currentIngredient.molecules.map((molecule) => (
                  <span
                    key={molecule}
                    className="bg-gradient-to-r from-rice-100 to-olive-100 text-olive-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium"
                  >
                    {molecule}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 md:gap-3 bg-olive-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-olive-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base">
              <span className="font-medium">Shop Products with {currentIngredient.name}</span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mt-12 md:mt-16">
          <div className="flex gap-2">
            {ingredients.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeIngredient === index 
                    ? 'w-8 md:w-12 bg-olive-900' 
                    : 'w-2 md:w-3 bg-olive-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IngredientSpotlight;
