import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  const comparisonRows = [
    {
      feature: 'Guest Re-booking Engine',
      legacy: 'Passive email blasts & generic coupons with <3% open rates',
      xylenis: 'Autonomous WhatsApp/SMS concierge triggered at exact individual treatment cadence',
      highlight: true,
    },
    {
      feature: 'Front-Desk Checkout Speed',
      legacy: '60–120 seconds per ticket through multi-screen legacy POS',
      xylenis: 'Under 20 seconds with one-tap split tender and digital wallet passes',
      highlight: false,
    },
    {
      feature: 'Backbar & Chemical Tracking',
      legacy: 'Rough manual estimations and quarterly painful stock reconciliations',
      xylenis: 'Gram & milliliter precision deducted automatically upon service checkout',
      highlight: true,
    },
    {
      feature: 'Client Guest Dossier',
      legacy: 'Fragmented text boxes and scattered paper intake forms',
      xylenis: 'Unified clinical timeline: formulas, allergy shields, photos, and beverage preferences',
      highlight: false,
    },
    {
      feature: 'Commission & Tip Accounting',
      legacy: 'Manual end-of-week spreadsheet exports with frequent staff disputes',
      xylenis: 'Real-time transparent ledger with sliding tiers, booth rent, and mobile staff views',
      highlight: true,
    },
    {
      feature: 'Client App Requirement',
      legacy: 'Requires clients to download third-party app or create new login passwords',
      xylenis: 'Zero downloads: operates entirely via native WhatsApp, Apple iMessage, and Web',
      highlight: false,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-3">
            <span>Market Benchmark</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display mb-4 [text-wrap:balance]">
            Why premier salons are retiring legacy software.
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Compare the operational reality of legacy salon software against Xylenis's AI-first operating system.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70">
                  <th className="py-4.5 px-6 text-xs font-semibold text-stone-600 uppercase tracking-wider w-1/4">
                    Capability
                  </th>
                  <th className="py-4.5 px-6 text-xs font-semibold text-stone-500 uppercase tracking-wider w-3/8">
                    Legacy Salon Software (Mindbody, Boulevard, Phorest)
                  </th>
                  <th className="py-4.5 px-6 text-xs font-semibold text-stone-900 uppercase tracking-wider w-3/8 bg-stone-100/70">
                    Xylenis AI Salon OS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-5 px-6 font-semibold text-stone-900">
                      {row.feature}
                    </td>
                    <td className="py-5 px-6 text-stone-500 leading-relaxed">
                      <div className="flex items-start gap-2.5">
                        <X className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                        <span>{row.legacy}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-stone-900 leading-relaxed bg-stone-50/40">
                      <div className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 font-bold" />
                        <span className="font-medium">{row.xylenis}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-stone-50/80 border-t border-stone-200 text-center text-xs text-stone-500">
            Zero long-term lock-in contracts · Automated 48-hour data porting included
          </div>
        </div>

      </div>
    </section>
  );
};
