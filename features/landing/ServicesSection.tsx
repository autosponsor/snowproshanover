import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck } from 'lucide-react';
import { AccordionItem } from '../../components/Accordion';

export const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80" alt="Snow background" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-snow-50/95 backdrop-blur-md" />
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <span className="text-brand font-black tracking-[0.3em] uppercase text-[10px]">Excellence in Service</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold mt-4 leading-none">Complete Winter <br/><span className="text-brand">Protection.</span></h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Truck className="text-brand" />, title: 'Residential Plowing', desc: 'Prompt driveway clearing within 4 hours. We prioritize Hanover Heights.', bgImage: 'https://images.unsplash.com/photo-1517297042578-831969a473fa?auto=format&fit=crop&q=80' },
            { icon: <Clock className="text-brand" />, title: 'Emergency Response', desc: '24/7 Priority clearing for medical or essential access requests.', bgImage: 'https://images.unsplash.com/photo-1516301385458-eb5d252d6a54?auto=format&fit=crop&q=80' },
            { icon: <ShieldCheck className="text-brand" />, title: 'Salting & Traction', desc: 'Premium ice management using concrete-safe agents.', bgImage: 'https://images.unsplash.com/photo-1445543949571-ffc3e0e2f55e?auto=format&fit=crop&q=80' }
          ].map((service, i) => (
            <motion.div key={i} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} className="relative p-10 rounded-[2.5rem] border border-snow-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden group">
              <div className="absolute inset-0 z-0">
                <img src={service.bgImage} alt={`${service.title} background`} className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px]" />
              </div>
              <div className="relative z-10">
                <meta name="title" content={`${service.title} in Hanover, ON`} />
                <meta name="description" content={service.desc} />
                <div className="w-16 h-16 bg-snow-50/80 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 shadow-sm">{service.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 max-w-3xl mx-auto relative p-8 md:p-12 rounded-[2.5rem] border border-snow-100 shadow-sm overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&q=80" alt="Snowy background" className="w-full h-full object-cover opacity-40" loading="lazy" />
            <div className="absolute inset-0 bg-white/95 backdrop-blur-sm" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">Service Policies & FAQ</h3>
            <div className="flex flex-col">
              <AccordionItem 
                question="How does the 2-inch trigger policy work?" 
                answer="Our standard service is activated when snow accumulation reaches 2 inches (5 cm) at our Hanover dispatch center. We constantly monitor local weather conditions to ensure our crews are ready." 
              />
              <AccordionItem 
                question="Do I need to call you when it snows?" 
                answer="No, our service is entirely automatic! Once the 2-inch trigger is met, SnowPros crews are dispatched automatically to your property. You don't need to lift a finger or make a phone call." 
              />
              <AccordionItem 
                question="How do I know the job was completed?" 
                answer="Transparency is core to our operations. We provide timestamped photographs upon the completion of every job, so you have visual confirmation that your property is clear and safe." 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
