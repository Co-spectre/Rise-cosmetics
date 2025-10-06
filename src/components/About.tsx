
import React from 'react';
import { Leaf, Heart, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Natural',
      description: 'Formulas harness the power of sprouted rice and carefully selected botanicals.'
    },
    {
      icon: Heart,
      title: 'Vegan',
      description: 'Compassionate beauty with no compromise on quality or effectiveness.'
    },
    {
      icon: Award,
      title: 'Sustainable',
      description: 'Practices that honor our planet and minimize environmental impact.'
    }
  ];

  return (
    <section id="about" className="py-32" style={{ background: '#f7f5ef' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div className="animate-slide-up">
            <h2 className="text-4xl sm:text-5xl font-playfair font-light mb-12 tracking-wide text-[#797870]">
              Philosophy
            </h2>
            
            <div className="space-y-8 leading-relaxed font-light text-[#797870]">
              <p className="text-lg">
                Embrace your natural essence with <span className="font-semibold text-[#797870]">RISE</span>, where holistic beauty meets mindful care. 
                Our transformative ingredients connect you to the root of your radiance.
              </p>
              <p>
                Crafted in Italy, we pride ourselves on using botanical and other healing ingredients 
                to provide you with the glow your skin craves. Beauty is intention, so we treat it with respect.
              </p>
            </div>

            <button
              className="mt-12 px-12 py-4 font-light text-sm tracking-widest uppercase transition-all duration-200"
              style={{ background: '#cc7f3d', color: 'white' }}
              onMouseOver={e => (e.currentTarget.style.background = '#d6d383')}
              onMouseOut={e => (e.currentTarget.style.background = '#cc7f3d')}
            >
              Learn More
            </button>
          </div>

          {/* Video Container */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-[#ede9dd] bg-[#f8f7f3] flex flex-col items-center">
              <video
                controls
                poster="/philosophy-video-poster.jpg"
                className="w-full max-w-3xl h-[20rem] object-cover bg-black"
                style={{ background: '#eae7df' }}
              >
                <source src="/philosophy.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="p-8 text-[#797870] text-xl font-light text-center">
                The Ritual of Radiance: Discover the philosophy behind our mindful beauty.
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-0 border border-[#ede9dd]">
          {values.map((value, index) => (
            <div
              key={index}
              className={`text-center p-12 border-r border-[#ede9dd] last:border-r-0 transition-colors duration-300 bg-[#f8f7f3]`}
            >
              <div className="w-14 h-14 flex items-center justify-center mx-auto mb-8 rounded-full shadow-sm"
                style={{ background: '#ede9dd', border: '2px solid #d6c083' }}>
                <value.icon className="w-7 h-7" style={{ color: '#7d8c6a' }} strokeWidth={1.2} />
              </div>
              <h3 className="text-lg font-playfair font-light mb-4 tracking-wide uppercase" style={{ color: '#7d8c6a', letterSpacing: '0.1em' }}>
                {value.title}
              </h3>
              <p className="leading-relaxed font-light text-sm" style={{ color: '#7d8c6a' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
