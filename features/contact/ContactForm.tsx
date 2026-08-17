
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Sparkles, Snowflake, Mail } from 'lucide-react';
import DOMPurify from 'dompurify';
import { cn } from '../../lib/utils';
import { toast } from '../../lib/toast';
import { reportError } from '../../lib/errorReporter';

const schema = z.object({
  name: z.string().min(2, "We need your name to address you"),
  phone: z.string().min(10, "Please provide a valid 10-digit number"),
  address: z.string().min(5, "Where should we send the truck?"),
  serviceType: z.enum(['residential', 'commercial', 'emergency']),
  details: z.string().optional(),
  'bot-field': z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const CELEBRATION_PARTICLES = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  x: (((index * 73) % 101) - 50) * 4,
  y: (((index * 47) % 101) - 50) * 4,
  rotate: (index * 97) % 360,
  size: 24 + (index % 4) * 6,
  delay: index * 0.05,
}));

const SuccessCelebration: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {CELEBRATION_PARTICLES.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
            x: particle.x,
            y: particle.y,
            rotate: particle.rotate,
          }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: particle.delay }}
          className="absolute text-brand"
        >
          <Snowflake size={particle.size} />
        </motion.div>
      ))}
    </div>
  );
};

export const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: 'residential'
    }
  });

  const onSubmit = async (data: FormData) => {
    if (data['bot-field']?.trim()) {
      return;
    }

    // Sanitize all inputs to prevent XSS before serializing the form request.
    const sanitized = {
      name: DOMPurify.sanitize(data.name, { ALLOWED_TAGS: [] }),
      phone: DOMPurify.sanitize(data.phone, { ALLOWED_TAGS: [] }),
      address: DOMPurify.sanitize(data.address, { ALLOWED_TAGS: [] }),
      serviceType: DOMPurify.sanitize(data.serviceType, { ALLOWED_TAGS: [] }),
      details: DOMPurify.sanitize(data.details || '', { ALLOWED_TAGS: [] }),
    };
    
    const encodedForm = new URLSearchParams({
      'form-name': 'snow-pros-quote',
      'bot-field': '',
      ...sanitized,
    });

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodedForm.toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`);
      }

      setSuccess(true);
      toast.success('Quote request received! Our team will contact you soon.');
      reset();
      setTimeout(() => setSuccess(false), 8000);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error(String(error));
      console.error('Form submission error:', errorObj);
      reportError('Contact form submission failed', errorObj, { formData: data });
      toast.error('We encountered an issue submitting your request. Please call (647) 450-0225 for immediate service.');
    }
  };

  const handleMailto = () => {
    const data = getValues();
    const subject = encodeURIComponent(`Service Inquiry: ${data.serviceType} - ${data.name || 'New Client'}`);
    const body = encodeURIComponent(`Name: ${data.name || ''}\nPhone: ${data.phone || ''}\nAddress: ${data.address || ''}\nPriority Level: ${data.serviceType || 'residential'}\n\nSpecial Requirements:\n${data.details || 'None'}`);
    window.location.href = `mailto:snowpros@contractor.net?subject=${subject}&body=${body}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative w-full"
    >
      <form 
        name="snow-pros-quote" 
        data-netlify="true" 
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit(onSubmit)}
        className="glass p-8 md:p-12 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10 relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1516301385458-eb5d252d6a54?auto=format&fit=crop&q=80" alt="Ice Background" className="w-full h-full object-cover opacity-10" loading="lazy" />
          <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-2xl" />
        </div>
        
        <div className="relative z-10 space-y-8">
          <input type="hidden" name="form-name" value="snow-pros-quote" />
          <div className="hidden">
            <label>Don’t fill this out if you’re human: <input {...register('bot-field')} /></label>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-brand/20 p-2 rounded-xl">
              <Sparkles className="text-brand" size={20} />
            </div>
            <h3 className="text-white font-display font-bold text-xl uppercase tracking-[0.2em]">Secure Your Quote</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Your Name</label>
              <input 
                {...register("name")}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Full Name"
                aria-label="Your full name"
                aria-describedby={errors.name ? "name-error" : undefined}
                className={cn(
                  "w-full bg-white/5 border rounded-2xl p-5 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2 text-sm md:text-base",
                  errors.name ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
                )}
              />
              {errors.name && (
                <p id="name-error" className="text-red-400 text-xs" role="alert">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Contact Phone</label>
              <input 
                {...register("phone")}
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(647) 000-0000"
                aria-label="Contact phone number"
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={cn(
                  "w-full bg-white/5 border rounded-2xl p-5 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2 text-sm md:text-base",
                  errors.phone ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
                )}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-400 text-xs" role="alert">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Hanover Address</label>
            <input 
              {...register("address")}
              id="address"
              name="address"
              type="text"
              autoComplete="street-address"
              placeholder="Street, Town, ON"
              aria-label="Property address in Hanover"
              aria-describedby={errors.address ? "address-error" : undefined}
              className={cn(
                "w-full bg-white/5 border rounded-2xl p-5 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2 text-sm md:text-base",
                errors.address ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
              )}
            />
            {errors.address && (
              <p id="address-error" className="text-red-400 text-xs" role="alert">{errors.address.message}</p>
            )}
          </div>

          <fieldset className="space-y-4">
            <legend className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Priority Level</legend>
            <div className="grid grid-cols-3 gap-3">
              {['Residential', 'Commercial', 'Emergency'].map((type) => (
                <label key={type} className="relative cursor-pointer group">
                  <input 
                    type="radio" 
                    {...register("serviceType")} 
                    value={type.toLowerCase()}
                    aria-label={`${type} service priority`}
                    className="peer sr-only" 
                  />
                  <div className={cn(
                    "border border-white/10 rounded-2xl p-4 text-center text-[10px] font-black text-white/40 transition-all uppercase tracking-widest leading-none flex items-center justify-center min-h-[60px] glass hover:bg-white/10 focus-within:ring-2 focus-within:ring-brand",
                    "peer-checked:bg-brand peer-checked:border-brand peer-checked:text-white peer-checked:shadow-lg shadow-brand/20"
                  )}>
                    {type}
                  </div>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="space-y-2">
            <label htmlFor="details" className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Special Requirements</label>
            <textarea 
              {...register("details")}
              id="details"
              name="details"
              placeholder="Gravel driveway, gate code, or specific instructions..."
              aria-label="Special requirements or notes for the service"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-brand transition-all resize-none text-sm md:text-base"
            />
          </div>

          <div className="flex flex-col gap-3">
            <button 
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full bg-brand hover:bg-brand-hover text-white font-black py-5 rounded-[1.5rem] shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? <Loader2 className="animate-spin" size={20} aria-hidden="true" /> : "Confirm Quote Request"}
            </button>
            <button 
              type="button"
              onClick={handleMailto}
              className="w-full bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold py-4 rounded-[1.5rem] transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] focus:outline-none focus:ring-2 focus:ring-brand"
              aria-label="Send quote request via email"
            >
              <Mail size={16} aria-hidden="true" /> Prefer Email? Send direct via Mail App
            </button>
          </div>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-950/98 backdrop-blur-2xl z-50 flex flex-col items-center justify-center p-12 text-center"
            >
              <SuccessCelebration />
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="bg-brand/20 p-6 rounded-full inline-block mb-8"
                >
                  <CheckCircle className="text-brand" size={64} />
                </motion.div>
                <h3 className="text-4xl font-display font-bold text-white mb-6 tracking-tight">Request Received.</h3>
                <p className="text-snow-100/60 text-base max-w-sm mx-auto leading-relaxed mb-10">
                  Our Hanover dispatchers have logged your address. We'll be in touch shortly to confirm your winter clearing plan.
                </p>
                <button 
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="text-brand text-xs font-black uppercase tracking-[0.4em] border-b border-brand/20 pb-1 hover:border-brand transition-colors"
                >
                  Return to Site
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};
