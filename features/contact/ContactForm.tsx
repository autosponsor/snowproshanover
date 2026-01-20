
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const schema = z.object({
  name: z.string().min(2, "We need your name to address you"),
  phone: z.string().min(10, "Please provide a valid 10-digit number"),
  address: z.string().min(5, "Where should we send the truck?"),
  serviceType: z.enum(['residential', 'commercial', 'emergency']),
  details: z.string().optional(),
  'bot-field': z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: 'residential'
    }
  });

  const onSubmit = async (data: FormData) => {
    // Netlify form submission handling
    const formData = new window.FormData();
    formData.append('form-name', 'snow-pros-quote');
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, (value as string) || '');
    });

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 8000);
    } catch (error) {
      console.error(error);
      alert("Submission error. Please call (647) 450-0225 for immediate service.");
    }
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
        className="glass p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 space-y-6 md:space-y-8 relative overflow-hidden"
      >
        <input type="hidden" name="form-name" value="snow-pros-quote" />
        <p className="hidden">
          <label>Don’t fill this out if you’re human: <input name="bot-field" {...register("bot-field")} /></label>
        </p>

        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-brand" size={18} />
          <h3 className="text-white font-display font-bold text-lg md:text-xl uppercase tracking-widest">Get Your Free Quote</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-2">
            <label className="block text-xs font-black text-white/40 uppercase tracking-[0.2em]">Your Name</label>
            <input 
              {...register("name")}
              name="name"
              placeholder="Full Name"
              className={cn(
                "w-full bg-white/5 border rounded-2xl p-4 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2 text-sm md:text-base",
                errors.name ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
              )}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black text-white/40 uppercase tracking-[0.2em]">Contact Phone</label>
            <input 
              {...register("phone")}
              name="phone"
              placeholder="(647) 000-0000"
              className={cn(
                "w-full bg-white/5 border rounded-2xl p-4 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2 text-sm md:text-base",
                errors.phone ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
              )}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black text-white/40 uppercase tracking-[0.2em]">Hanover Address</label>
          <input 
            {...register("address")}
            name="address"
            placeholder="Street, Town, ON"
            className={cn(
              "w-full bg-white/5 border rounded-2xl p-4 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2 text-sm md:text-base",
              errors.address ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
            )}
          />
        </div>

        <div className="space-y-4">
          <label className="block text-xs font-black text-white/40 uppercase tracking-[0.2em]">Select Priority</label>
          <div className="grid grid-cols-3 gap-2 md:gap-3">
            {['Residential', 'Commercial', 'Emergency'].map((type) => (
              <label key={type} className="relative cursor-pointer group">
                <input 
                  type="radio" 
                  {...register("serviceType")} 
                  value={type.toLowerCase()} 
                  className="peer sr-only" 
                />
                <div className={cn(
                  "border border-white/10 rounded-2xl p-3 md:p-4 text-center text-[9px] md:text-[10px] font-black text-white/40 transition-all uppercase tracking-widest leading-none flex items-center justify-center min-h-[50px]",
                  "peer-checked:bg-brand peer-checked:border-brand peer-checked:text-white shadow-sm"
                )}>
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-black text-white/40 uppercase tracking-[0.2em]">Special Requirements</label>
          <textarea 
            {...register("details")}
            name="details"
            placeholder="Gate codes, gravel, etc..."
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-brand transition-all resize-none text-sm md:text-base"
          />
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-brand hover:bg-brand-hover text-white font-black py-4 md:py-5 rounded-2xl md:rounded-[1.5rem] shadow-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] md:tracking-[0.3em]"
        >
          {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Confirm Quote Request"}
        </button>

        {/* Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy-900/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-8 md:p-12 text-center"
            >
              {/* Fix: Removed invalid 'md' prop from Lucide icon component as it's not supported */}
              <CheckCircle className="text-green-500 mb-4" size={48} />
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Request Logged.</h3>
              <p className="text-snow-100/60 text-xs md:text-sm">Our dispatchers have been notified. We will contact you shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};
