import React from 'react';
import { ArrowRight, Play, CheckCircle2, ShieldCheck, Clock, DollarSign, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
  onExploreSandbox: () => void;
  onScrollToRoi: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo, onExploreSandbox, onScrollToRoi }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-stone-200/70">
      {/* Subtle architectural atmosphere background */}
      <div className="absolute inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100/80 via-transparent to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Quiet Editorial Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-4">
              <span>Intelligent Operations</span>
              <span aria-hidden="true">·</span>
              <span>For Spas & Salons</span>
            </div>

            {/* Dominant Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12] mb-6 font-display [text-wrap:balance]">
              The AI order and client operating system for luxury spas and salons.
            </h1>

            {/* Clear, buzzword-free proposition */}
            <p className="text-lg sm:text-xl text-stone-600 leading-relaxed mb-8 max-w-2xl font-normal">
              Xylenis orchestrates front-desk ticket checkout, autonomous WhatsApp re-booking, milliliter backbar inventory tracking, and multi-therapist commissions in one seamless platform.
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onOpenDemo}
                className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-stone-900 text-white hover:bg-stone-800 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Request Private Walkthrough</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreSandbox}
                className="px-5 py-3.5 text-sm font-medium text-stone-700 bg-white hover:bg-stone-100/80 border border-stone-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 shadow-2xs"
              >
                <Play className="w-3.5 h-3.5 fill-current opacity-70" />
                <span>Test Live Salon Sandbox</span>
              </button>

              <button
                onClick={onScrollToRoi}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer underline underline-offset-4 decoration-stone-300 hover:decoration-stone-800 ml-2"
              >
                Estimate Revenue Lift →
              </button>
            </div>

            {/* Unboxed Metadata & Proof Strip */}
            <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500">
              <span className="font-medium text-stone-700">340+ Premier Salons & MedSpas</span>
              <span aria-hidden="true">·</span>
              <span>28% Avg. Retail Ticket Lift</span>
              <span aria-hidden="true">·</span>
              <span>Zero Double-Booking Guarantee</span>
              <span aria-hidden="true">·</span>
              <span>HIPAA & GDPR Compliant</span>
            </div>
          </div>

          {/* Right Column: High-fidelity Live Salon Operations Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xl shadow-stone-200/50 overflow-hidden transition-all">
              {/* Card Header Bar */}
              <div className="px-5 py-4 bg-stone-50/80 border-b border-stone-200/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-stone-800">Maison Privée Atelier · Mayfair</div>
                  <div className="text-[11px] text-stone-500">Live Operating Terminal · Station 1-6 Active</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-semibold text-stone-900 tabular-nums">14:42 GMT</div>
                  <div className="text-[10px] text-stone-500">Synchronized</div>
                </div>
              </div>

              {/* Card Body: Live Snapshot Metrics */}
              <div className="p-5 space-y-4">
                
                {/* Real-time Order Summary */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/70">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-stone-600">Today's Order Volume</span>
                    <span className="text-xs font-mono font-semibold text-emerald-800 tabular-nums">+24% vs. target</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold font-display text-stone-900 tabular-nums">$6,840.00</span>
                    <span className="text-xs text-stone-500 tabular-nums">22 tickets settled</span>
                  </div>
                </div>

                {/* Live In-Service Feed */}
                <div>
                  <div className="text-xs font-semibold text-stone-700 mb-2.5 flex items-center justify-between">
                    <span>Active Treatment Suites</span>
                    <span className="text-[11px] font-normal text-stone-500">4 in service · 2 preparing</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 rounded-lg border border-stone-200/90 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-700">
                          S1
                        </div>
                        <div>
                          <div className="text-xs font-medium text-stone-900">Genevieve Laurent</div>
                          <div className="text-[11px] text-stone-500">Balayage Bond Infusion · Marcus Vance</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-medium text-stone-800 tabular-nums">38 min left</div>
                        <div className="text-[10px] text-stone-500">Formula logged</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-stone-200/90 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-semibold text-stone-700">
                          S4
                        </div>
                        <div>
                          <div className="text-xs font-medium text-stone-900">Elena Rostova</div>
                          <div className="text-[11px] text-stone-500">Caviar Cellular Facial · Dr. Camille</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-mono font-medium text-stone-800 tabular-nums">Checkout ready</div>
                        <div className="text-[10px] text-emerald-700 font-medium">Add-on serum accepted</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Concierge Autonomous Queue Notice */}
                <div className="p-3 rounded-lg bg-stone-100/80 border border-stone-200/60 text-xs text-stone-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-800 shrink-0" />
                    <span>AI Concierge filled 3 cancellation gaps today</span>
                  </div>
                  <span className="font-mono font-medium text-stone-900 tabular-nums">+$780 saved</span>
                </div>

                {/* CTA inside preview card */}
                <button
                  onClick={onExploreSandbox}
                  className="w-full py-2.5 px-4 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Interact with Full Live Sandbox Below ↓
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
