import React from 'react';
import { 
  Receipt, 
  MessageSquare, 
  Layers, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';

interface CapabilitiesGridProps {
  onOpenDemo: () => void;
}

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ onOpenDemo }) => {
  return (
    <section id="capabilities" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-3">
            <span>Platform Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Core Modules</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display mb-4 [text-wrap:balance]">
            Engineered for high-order salon velocity and uncompromising luxury.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Legacy salon software forces front desks into cluttered spreadsheets and manual telephone tag. Xylenis replaces disconnected point-of-sale tools with an intelligent unified operating system.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 8 Cols Marquee */}
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-stone-400 font-mono">01. ORDER VELOCITY</span>
                <span className="text-xs text-stone-500 font-medium">Front-Desk & Chair-Side POS</span>
              </div>

              <h3 className="text-2xl font-bold text-stone-900 font-display mb-3">
                Split-Tender Checkout & Intelligent Retail Attachment
              </h3>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-2xl">
                Process multi-service appointments, bespoke gift packages, and chair-side retail recommendations in seconds. The AI dynamically recommends homecare serums based on skin and hair treatments logged during the service, increasing retail attach rate by 31%.
              </p>

              {/* Feature Highlights with Unboxed Typography */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <div className="text-xs font-semibold text-stone-900 mb-1">Instant Multi-Split</div>
                  <div className="text-xs text-stone-500">Split payment across card, house accounts, and gift vouchers seamlessly.</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900 mb-1">Live Commission Split</div>
                  <div className="text-xs text-stone-500">Auto-routes stylist and aesthetician percentages directly to payroll.</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900 mb-1">Digital Paperless Pass</div>
                  <div className="text-xs text-stone-500">Receipts and aftercare protocols delivered instantly via Apple Wallet and SMS.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Average front-desk checkout duration: under 22 seconds</span>
              <button 
                onClick={onOpenDemo}
                className="font-medium text-stone-900 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore checkout architecture</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: 4 Cols */}
          <div className="md:col-span-4 bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-stone-400 font-mono">02. CONCIERGE</span>
                <span className="text-xs text-stone-500 font-medium">Autonomous Messaging</span>
              </div>

              <h3 className="text-xl font-bold text-stone-900 font-display mb-3">
                Autonomous WhatsApp & SMS Re-Engagement
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Never lose a client to forgotten re-booking intervals. Xylenis calculates individual guest cadence (e.g. 5 weeks for gloss, 3 weeks for lash fills) and initiates conversational booking with precise therapist availability.
              </p>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-stone-700">Dormant Client Recapture:</span>
                  <span className="text-emerald-800 font-mono tabular-nums">+34.8%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-stone-700">No-Show Elimination:</span>
                  <span className="text-emerald-800 font-mono tabular-nums">99.4% Arrival</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
              Integrates natively with WhatsApp Business API & Twilio.
            </div>
          </div>

          {/* Card 3: 4 Cols */}
          <div className="md:col-span-4 bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-stone-400 font-mono">03. DISPENSARY</span>
                <span className="text-xs text-stone-500 font-medium">Inventory & Shrinkage</span>
              </div>

              <h3 className="text-xl font-bold text-stone-900 font-display mb-3">
                Milliliter-Level Backbar & Chemical Accounting
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                Prevent the silent profit drain of unmeasured developer, bleach, and luxury ampoules. Stylists log exact grams and milliliters at the mixing bar; Xylenis reconciles stock balances automatically.
              </p>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-2">
                <div className="flex justify-between font-medium">
                  <span className="text-stone-700">Stock Shrinkage Reduction:</span>
                  <span className="text-stone-900 font-mono tabular-nums">-84%</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-stone-700">Auto Supplier Replenish:</span>
                  <span className="text-stone-900">Direct EDI</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
              Compatible with Bluetooth scale mixing stations.
            </div>
          </div>

          {/* Card 4: 8 Cols Marquee */}
          <div className="md:col-span-8 bg-white rounded-2xl p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-bold text-stone-400 font-mono">04. YIELD ENGINE</span>
                <span className="text-xs text-stone-500 font-medium">Capacity & Commissions</span>
              </div>

              <h3 className="text-2xl font-bold text-stone-900 font-display mb-3">
                Dynamic Chair Utilization & Multi-Therapist Commission Ledger
              </h3>

              <p className="text-stone-600 text-sm leading-relaxed mb-6 max-w-2xl">
                Eliminate unprofitable 30-minute schedule gaps with intelligent appointment clustering. Manage complex hybrid staff models—combining commissioned artists, booth renters, apprentices, and guest master therapists—with zero manual bookkeeping.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100">
                <div>
                  <div className="text-xs font-semibold text-stone-900 mb-1">Gap-Filling Engine</div>
                  <div className="text-xs text-stone-500">AI auto-routes standby clients into orphaned 45-minute treatment gaps.</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900 mb-1">Tiered Commission Rules</div>
                  <div className="text-xs text-stone-500">Sliding scale commissions that escalate automatically as therapists hit revenue thresholds.</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900 mb-1">Staff Mobile Portal</div>
                  <div className="text-xs text-stone-500">Real-time daily earnings and tip breakdown visible on practitioner devices.</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between text-xs text-stone-500">
              <span>Syncs in real time with Xero, QuickBooks Online, and Gusto</span>
              <button 
                onClick={onOpenDemo}
                className="font-medium text-stone-900 hover:text-stone-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Request staff workflow demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
