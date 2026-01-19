import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

const schema = z.object({
  name: z.string().min(2, "We need your name to address you"),
  phone: z.string().min(10, "Please provide a valid 10-digit number"),
  address: z.string().min(5, "Where should we send the truck?"),
  serviceType: z.enum(['residential', 'commercial', 'emergency']),
  details: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const ContactForm: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      serviceType: 'residential'
    }
  });

  const activeService = watch('serviceType');

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
      // Keep success state long enough to read
      setTimeout(() => setSuccess(false), 8000);
    } catch (error) {
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
        onSubmit={handleSubmit(onSubmit)}
        className="glass p-8 md:p-12 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 space-y-8 relative overflow-hidden"
      >
        <input type="hidden" name="form-name" value="snow-pros-quote" />

        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-brand" size={20} />
          <h3 className="text-white font-display font-bold text-xl uppercase tracking-widest">Get Your Free Quote</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Your Name</label>
            <input 
              {...register("name")}
              placeholder="Full Name"
              className={cn(
                "w-full bg-white/5 border rounded-2xl p-4 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2",
                errors.name ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
              )}
            />
            {errors.name && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Contact Phone</label>
            <input 
              {...register("phone")}
              placeholder="(647) 000-0000"
              className={cn(
                "w-full bg-white/5 border rounded-2xl p-4 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2",
                errors.phone ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
              )}
            />
            {errors.phone && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.phone.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Hanover Service Address</label>
          <input 
            {...register("address")}
            placeholder="Street, Town, ON"
            className={cn(
              "w-full bg-white/5 border rounded-2xl p-4 text-white placeholder:text-white/20 outline-none transition-all focus:ring-2",
              errors.address ? 'border-red-500/50 ring-red-500/20' : 'border-white/10 focus:ring-brand focus:border-brand'
            )}
          />
          {errors.address && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.address.message}</p>}
        </div>

        <div className="space-y-4">
          <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Select Priority</label>
          <div className="grid grid-cols-3 gap-3">
            {['Residential', 'Commercial', 'Emergency'].map((type) => (
              <label key={type} className="relative cursor-pointer group">
                <input 
                  type="radio" 
                  {...register("serviceType")} 
                  value={type.toLowerCase()} 
                  className="peer sr-only" 
                />
                <div className={cn(
                  "border border-white/10 rounded-2xl p-4 text-center text-[10px] font-black text-white/40 transition-all uppercase tracking-widest group-hover:bg-white/5",
                  "peer-checked:bg-brand peer-checked:border-brand peer-checked:text-white peer-checked:shadow-[0_10px_20px_rgba(249,115,22,0.2)]"
                )}>
                  {type}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Special Requirements</label>
          <textarea 
            {...register("details")}
            placeholder="Gate codes, gravel driveway, pet safety, etc..."
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all resize-none"
          />
        </div>

        <button 
          disabled={isSubmitting}
          className="w-full bg-brand hover:bg-brand-hover text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-brand/20 transition-all transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Securing Dispatch...
            </>
          ) : (
            <>
              Confirm Quote Request
            </>
          )}
        </button>

        <p className="text-center text-white/20 text-[9px] uppercase tracking-[0.2em] font-bold">
          Free no-obligation estimates provided within 1 hour.
        </p>

        {/* Success Overlay */}
        <AnimatePresence>
          {success && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-navy-900/95 backdrop-blur-xl z-20 flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20">
                <CheckCircle className="text-green-500" size={56} />
              </div>
              <h3 className="text-4xl font-display font-bold text-white mb-4 leading-tight tracking-tight">Request <br/>Logged.</h3>
              <p className="text-snow-100/60 leading-relaxed mb-8 text-sm">Our dispatchers have been notified. We will contact you at your provided number shortly.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="text-brand font-black uppercase tracking-[0.3em] text-[10px] hover:text-white transition-colors"
              >
                Back to Form
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
};