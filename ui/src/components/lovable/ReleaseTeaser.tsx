import { motion } from "framer-motion";
import { Sparkles, Calendar, Zap, ArrowRight, ShieldCheck, Cpu } from "lucide-react";

export function ReleaseTeaser() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-24">
      {/* Background with the generated image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/intellaplan_teaser_bg.png" 
          alt="Teaser Background" 
          className="w-full h-full object-cover opacity-40 scale-105 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary glass"
        >
          <Sparkles className="h-3.5 w-3.5" />
          The Final Frontier of QA
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]"
        >
          Automating the <br />
          <span className="text-gradient">Unknown.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
        >
          IntelliNexus AI V2 is nearly here. A fully autonomous end-to-end QA pipeline that thinks, maps, and codes before you even ask.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 text-left">
          {[
            { icon: <Cpu className="text-blue-400" />, title: "Neural Synthesis", desc: "Mistral-Large-3 powered generation with 99.8% logic accuracy." },
            { icon: <ShieldCheck className="text-emerald-400" />, title: "ISTQB-Hardened", desc: "Every artifact meets the highest industry-standard compliance." },
            { icon: <Zap className="text-amber-400" />, title: "Instant scripts", desc: "Go from PRD to Cypress/Playwright code in under 60 seconds." }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 glass hover:bg-white/10 transition-all group"
            >
              <div className="mb-4 p-2 w-fit rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h4 className="text-lg font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex items-center gap-4 text-primary font-mono text-lg font-bold tracking-widest">
            <Calendar className="h-5 w-5" />
            GLOBAL DEPLOYMENT: Q2 2026
          </div>
          
          <div className="flex gap-4">
            <button className="flex items-center gap-2 rounded-xl bg-white text-black px-8 py-4 text-sm font-black uppercase tracking-tighter hover:bg-primary hover:text-white transition-all">
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
    </section>
  );
}
