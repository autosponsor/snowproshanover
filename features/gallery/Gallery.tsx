import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Wallet, ShieldCheck, ReceiptText, CircleDollarSign } from 'lucide-react';
import { cn } from '../../lib/utils';

const images = [
  { 
    id: '1', 
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhy6zzNvJSFTwNEYSQq7VBI6J3sD0DDj5S3JKl-p3VBkNeQpCLvCGy5iC2OmEvTBB5CiuhpgPQIDThN39ueeZ7QJHeEtWeg69PA41xKLvoWwNt0LLthhPG43I8VJBOizkPYB5764g_rFIU-Zgtk-IvYjECNaP0UmcgVHKmQJxoessYRLTOQYUW0H_WhvWtC/s2048/615884794_2094684057965847_6012851206772838565_n.jpg', 
    title: 'Fleet Ready', 
    location: 'Hanover Service Yard',
    desc: 'Our heavy-duty snow plow trucks, fully equipped and ready for winter storm deployment.',
    alt: 'Red snow plow truck parked in a snowy residential driveway ready for winter service'
  },
  { 
    id: '2', 
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2dhplKdR5vIC1AhsTQ_OCEIicbzX7g-HkI6VB0F-wI-412mJYFxtdEd073YtD3Idk_v4crqzdhXju5GBqESYGXZ6p3qsXMV5ZqgJVcFeDpSC8mS-dUHzwJWso3dtvQwRiACh3uM4wy4r7q3B-A5iTUXJgE8PQVrvrnmtWQ-7Y9Igb4tDW-dcqXn3x28_b/s1416/615873337_2992489897807290_5381189615071517188_n.jpg', 
    title: 'Commercial Loader', 
    location: 'Downtown Hanover',
    desc: 'Clearing commercial parking lots with heavy machinery to ensure your business stays accessible.',
    alt: 'Commercial loader machine clearing snow from a parking lot at night'
  },
  { 
    id: '3', 
    url: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFwaKQtNV8Q9s1iyEg9vJbFULT07uym5PiZD56aelo4OH6olYWd2D6SXJfgml1EdMi1Dnby_Qe1Z1t-3JdwFvwJYFZISkGleN0loKo4E_WeIxBD49eYqAbd3t-OrZWpuXqTPG0kGHqkooVog-1ZJgMrqQW9Rvhv27WEjFtS_4bDVKSDz_CqSVPve1SmSi-/s960/614073567_1360045145439043_4447142691334206296_n%20(1).jpg', 
    title: 'Tractor Blower', 
    location: 'Residential Driveway',
    desc: 'Tractor-mounted snowblowing for immaculate residential driveway clearing without property damage.',
    alt: 'Compact tractor with a snow blower attachment clearing a residential driveway'
  },
  { 
    id: '4', 
    url: 'https://scontent.fykz1-1.fna.fbcdn.net/v/t39.30808-6/765035377_122129556327266757_152859433935311798_n.jpg?stp=c256.0.1536.1536a_cp6_dst-jpegr_tt6&cstp=mx1536x1536&ctp=s206x206&_nc_cat=108&ccb=1-7&_nc_sid=92e838&_nc_ohc=ymHQw37_XAsQ7kNvwGDM_SX&_nc_oc=AdoBJFD6syeCiFSNtLc68E_fNcdzfAzfz0O_kRAQnHaq0_BjfghvpNIj70B--Y3m5eg&_nc_zt=23&se=-1&_nc_ht=scontent.fykz1-1.fna&_nc_gid=XajuXq5MpbfKowSFZbnGfQ&_nc_ss=7b2a8&oh=00_AQHliVl7-kSjiYiQpMD_GstrNL5y2BSw0V8lGg_NgVpvXw&oe=6A8700E8', 
    title: 'Local Operations', 
    location: 'Hanover, ON',
    desc: 'Dependable snow clearing services keeping Hanover homes safe and accessible all winter long.',
    alt: 'Snow pros crew clearing a snowy path'
  }
];

const GalleryImage = ({ img, onClick }: { img: typeof images[0], onClick: () => void }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      onClick={onClick}
      className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl border border-white/5 isolate"
    >
      {!loaded && <div className="absolute inset-0 bg-white/5 animate-pulse z-0" />}
      <img 
        src={img.url} 
        alt={img.alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 group-hover:scale-110 relative z-10",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      <div className="absolute inset-0 bg-navy-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center backdrop-blur-sm z-20">
        <div className="w-12 h-12 bg-brand/20 rounded-full flex items-center justify-center mb-4 border border-brand/50">
           <Maximize2 className="text-brand" size={24} />
        </div>
        <h3 className="text-white font-display text-xl font-bold mb-1">{img.title}</h3>
        <p className="text-snow-200 text-[10px] uppercase tracking-widest font-bold mb-3">{img.location}</p>
        <p className="text-snow-100/70 text-xs leading-relaxed max-w-[80%]">{img.desc}</p>
      </div>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<typeof images[0] | null>(null);

  return (
    <section id="gallery" className="relative py-24 px-6 overflow-hidden min-h-[600px]">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516820208784-270b250306e3?auto=format&fit=crop&q=80" 
          alt="Professional Snow Removal Background" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy-950/90 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-brand font-bold tracking-[0.4em] uppercase text-[10px] mb-2 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Hanover in <span className="text-brand">Action.</span></h2>
            <p className="text-snow-100/60 mt-4 leading-relaxed">Proof of our industrial precision. We take pride in keeping Hanover's paths clear, safe, and navigable through the toughest blizzards.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-1 bg-brand rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <GalleryImage img={img} onClick={() => setSelectedImg(img)} />
            </motion.div>
          ))}
        </div>

        {/* Exclusive Caption */}
        <div className="text-center mb-16">
          <p className="text-snow-100/40 text-[10px] font-black uppercase tracking-[0.4em] inline-block border-y border-white/5 py-4 px-8">
            Serving Hanover and surrounding areas exclusively.
          </p>
        </div>

        {/* Payment & Policy Highlight */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch"
        >
          {/* Trust Pillar */}
          <div className="relative overflow-hidden p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-center shadow-xl">
            <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&q=80" alt="Snowy background" className="w-full h-full object-cover opacity-20" loading="lazy" />
              <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-brand/20 rounded-2xl flex items-center justify-center border border-brand/50">
                  <ShieldCheck className="text-brand" size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Zero Risk Guarantee</h3>
              </div>
              <p className="text-snow-100/60 leading-relaxed text-lg">
                We value your trust. <span className="text-brand font-bold">Snow Pros only asks for payment once the job is complete</span> and verified. We provide photo documentation for every site to ensure absolute precision.
              </p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="relative overflow-hidden p-10 rounded-[2.5rem] border border-white/10 flex flex-col justify-center shadow-xl">
             <div className="absolute inset-0 z-0">
              <img src="https://images.unsplash.com/photo-1551582045-6c6e808f2309?auto=format&fit=crop&q=80" alt="Ice texture background" className="w-full h-full object-cover opacity-20" loading="lazy" />
              <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-md" />
            </div>
            <div className="relative z-10">
               <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand/20 rounded-2xl flex items-center justify-center border border-brand/50">
                  <CircleDollarSign className="text-brand" size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Flexible Payment Options</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               {[
                 { icon: <Wallet size={16} />, label: "Cash", sub: "Traditional and secure." },
                 { icon: <ShieldCheck size={16} />, label: "E-Transfer", sub: "Fast, digital convenience." },
                 { icon: <ReceiptText size={16} />, label: "Invoice", sub: "We will generate and send a detailed invoice for your approval." }
               ].map((item, i) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col items-center text-center gap-3">
                    <span className="text-brand shrink-0">{item.icon}</span>
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest block">{item.label}</span>
                      <p className="text-[9px] text-snow-100/40 leading-tight">{item.sub}</p>
                    </div>
                 </div>
               ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-navy-950/95 flex items-center justify-center p-6 backdrop-blur-xl"
            onClick={() => setSelectedImg(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white hover:text-brand transition-colors p-2 glass rounded-full"
              onClick={() => setSelectedImg(null)}
            >
              <X size={32} />
            </motion.button>
            
            <motion.div
              layoutId={selectedImg.id}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImg.url} 
                className="w-full h-auto rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] border border-white/10"
                alt={selectedImg.alt}
                loading="lazy"
              />
              <div className="mt-8 text-center">
                <h2 className="text-3xl md:text-4xl font-display text-white font-bold tracking-tight">{selectedImg.title}</h2>
                <p className="text-brand font-black uppercase tracking-[0.4em] text-[10px] mt-2">{selectedImg.location}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};