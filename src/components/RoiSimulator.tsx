import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

interface RoiSimulatorProps {
  onOpenDemo: () => void;
}

export const RoiSimulator: React.FC<RoiSimulatorProps> = ({ onOpenDemo }) => {
  const [chairs, setChairs] = useState<number>(6);
  const [apptsPerChair, setApptsPerChair] = useState<number>(5);
  const [avgTicket, setAvgTicket] = useState<number>(185);
  const [retailAttach, setRetailAttach] = useState<number>(12);

  // Mathematical model
  const monthlyWorkingDays = 26;
  const totalMonthlyAppts = chairs * apptsPerChair * monthlyWorkingDays;
  const baselineMonthlyRevenue = totalMonthlyAppts * avgTicket;

  // Xylenis impact model
  // 1. Retail Lift: AI recommendations attach an additional 14% to 22% retail volume
  const monthlyRetailLift = totalMonthlyAppts * (avgTicket * 0.24 * (retailAttach / 100));

  // 2. No-Show & Gap Recapture: Recovers ~5.5% of total capacity through autonomous SMS/WhatsApp fills
  const monthlyRecapturedRevenue = totalMonthlyAppts * 0.055 * avgTicket;

  // 3. Front Desk Labor Hours Saved (avg 16 hours per chair/month)
  const monthlyHoursSaved = Math.round(chairs * 14);
  const monthlyLaborValue = monthlyHoursSaved * 26; // at $26/hr reception rate

  // Net annual impact
  const totalAnnualImpact = (monthlyRetailLift + monthlyRecapturedRevenue + monthlyLaborValue) * 12;

  return (
    <section id="revenue-impact" className="py-20 md:py-28 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-3">
            <span>Financial Modeling</span>
            <span aria-hidden="true">·</span>
            <span>Measurable Bottom-Line Return</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display mb-4 [text-wrap:balance]">
            Calculate your salon or spa's revenue expansion.
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Adjust the sliders below to model how automated re-booking, smart retail cross-sells, and gap-filling affect your annual profitability.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className="bg-[#FAF8F5] rounded-2xl border border-stone-200/90 p-8 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Sliders Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Slider 1: Chairs/Suites */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-semibold text-stone-900">
                    Active Styling Chairs / Treatment Suites
                  </label>
                  <span className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                    {chairs} {chairs === 1 ? 'chair' : 'chairs'}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={chairs}
                  onChange={(e) => setChairs(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>2 Boutique Suites</span>
                  <span>12 Flagship</span>
                  <span>24 Multi-Room Retreat</span>
                </div>
              </div>

              {/* Slider 2: Appts Per Chair */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-semibold text-stone-900">
                    Average Daily Appointments per Chair
                  </label>
                  <span className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                    {apptsPerChair} guests/day
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="10"
                  step="1"
                  value={apptsPerChair}
                  onChange={(e) => setApptsPerChair(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>2 High-Touch MedSpa</span>
                  <span>5 Standard Salon</span>
                  <span>10 Express Atelier</span>
                </div>
              </div>

              {/* Slider 3: Average Ticket */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-semibold text-stone-900">
                    Average Order Value per Appointment
                  </label>
                  <span className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                    ${avgTicket}
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="450"
                  step="5"
                  value={avgTicket}
                  onChange={(e) => setAvgTicket(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>$60 Day Services</span>
                  <span>$185 Cut & Color</span>
                  <span>$450 Luxury MedSpa Ritual</span>
                </div>
              </div>

              {/* Slider 4: Retail Attachment */}
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <label className="text-sm font-semibold text-stone-900">
                    Current Retail Product Attachment Rate
                  </label>
                  <span className="text-lg font-bold font-mono text-stone-900 tabular-nums">
                    {retailAttach}% of tickets
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="35"
                  step="1"
                  value={retailAttach}
                  onChange={(e) => setRetailAttach(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                  <span>5% Low retail</span>
                  <span>12% Industry average</span>
                  <span>35% High apothecary sales</span>
                </div>
              </div>

            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-white rounded-xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 mb-2">
                  Projected Annual Bottom-Line Lift
                </div>
                
                <div className="text-4xl sm:text-5xl font-bold font-display text-stone-900 tabular-nums mb-6">
                  +${Math.round(totalAnnualImpact).toLocaleString()}
                </div>

                <div className="space-y-4 pb-6 border-b border-stone-100 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-stone-600">
                    <span>Retail Order Uplift (Monthly):</span>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">
                      +${Math.round(monthlyRetailLift).toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-600">
                    <span>Recovered No-Shows & Gaps:</span>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">
                      +${Math.round(monthlyRecapturedRevenue).toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-600">
                    <span>Front-Desk Hours Reclaimed:</span>
                    <span className="font-mono font-semibold text-stone-900 tabular-nums">
                      {monthlyHoursSaved} hrs/mo
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-stone-600">
                    <span>Baseline Annual Gross Modeled:</span>
                    <span className="font-mono text-stone-500 tabular-nums">
                      ${Math.round(baselineMonthlyRevenue * 12).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onOpenDemo}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Review Detailed Pro-Forma Model</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-center text-[11px] text-stone-400 mt-2.5">
                  Calculated based on actual performance metrics across 340+ operating accounts.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
