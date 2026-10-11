import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';

interface PricingProps {
  onOpenDemo: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenDemo }) => {
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const tiers = [
    {
      name: 'Boutique Atelier',
      description: 'Engineered for bespoke private hair studios, specialized aesthetic suites, and independent practitioners.',
      monthlyPrice: 229,
      annualPrice: 189,
      capacity: 'Up to 4 Styling Chairs or Treatment Suites',
      features: [
        'Complete front-desk POS and split-tender checkout',
        'Autonomous SMS guest booking concierge',
        'Client profile dossier with color & chemical logs',
        'Standard retail barcode inventory tracking',
        'Therapist commission & tip accounting',
        'HIPAA & GDPR encrypted cloud storage',
      ],
      popular: false,
      cta: 'Start with Boutique',
    },
    {
      name: 'Flagship Spa & Salon',
      description: 'The complete intelligence engine for high-volume salons, luxury day spas, and premier aesthetic clinics.',
      monthlyPrice: 469,
      annualPrice: 389,
      capacity: 'Up to 14 Styling Chairs or Treatment Suites',
      features: [
        'Everything in Boutique Atelier, plus:',
        'Autonomous WhatsApp Business & Voice AI Concierge',
        'Milliliter-accurate backbar chemical & product tracking',
        'Intelligent 30-minute schedule gap-filling engine',
        'Advanced tiered therapist commission & chair rental engine',
        'Automated supplier EDI purchase orders (L’Oréal, etc.)',
        'Dedicated 48-hour white-glove data migration',
      ],
      popular: true,
      cta: 'Deploy Flagship OS',
    },
    {
      name: 'Prestige Multi-Location',
      description: 'Designed for luxury hotel spas, medical spa franchises, and premier multi-unit salon groups.',
      monthlyPrice: 899,
      annualPrice: 749,
      capacity: 'Unlimited Chairs Across Multiple Locations',
      features: [
        'Everything in Flagship Spa & Salon, plus:',
        'Centralized multi-location inventory transfer & reporting',
        'Custom EHR & medical charting integration',
        'Custom AI concierge prompt training for brand voice',
        'Dedicated account director & 24/7 priority SLA',
        'Enterprise Single Sign-On (SAML/Okta) & custom roles',
      ],
      popular: false,
      cta: 'Contact Enterprise Team',
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-3">
            <span>Transparent Investment</span>
            <span aria-hidden="true">·</span>
            <span>Zero Hidden Fees</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display mb-4 [text-wrap:balance]">
            Predictable pricing that scales with your artistry.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 mb-8">
            Every plan includes hardware compatibility, unlimited client profiles, and zero transaction surcharges beyond your standard payment processing.
          </p>

          {/* Billing Toggle (Functional clean segmented control) */}
          <div className="inline-flex items-center p-1 bg-stone-200/80 rounded-xl shadow-inner">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                !isAnnual
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Billed Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                isAnnual
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>Billed Annually</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={idx}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all ${
                  tier.popular
                    ? 'bg-white border-2 border-stone-900 shadow-lg relative'
                    : 'bg-white/80 border border-stone-200/90 shadow-sm'
                }`}
              >
                {/* Popularity Badge if applicable */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-8 bg-stone-900 text-white text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full">
                    Recommended for Most Salons
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-bold text-stone-900 font-display">
                      {tier.name}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-500 min-h-[36px] mb-6 leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4 pb-6 border-b border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold font-display text-stone-900 tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs text-stone-500">/ month</span>
                    </div>
                    <div className="text-xs text-stone-400 mt-1">
                      {isAnnual ? `Billed annually ($${price * 12}/yr)` : 'Billed month-to-month'}
                    </div>
                  </div>

                  {/* Capacity indicator */}
                  <div className="text-xs font-semibold text-stone-800 mb-6 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60">
                    {tier.capacity}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-stone-700">
                        <Check className="w-4 h-4 text-stone-900 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div>
                  <button
                    onClick={onOpenDemo}
                    className={`w-full py-3 px-4 rounded-lg text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 ${
                      tier.popular
                        ? 'bg-stone-900 hover:bg-stone-800 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200/80 text-stone-800'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <div className="text-center text-[11px] text-stone-400 mt-2">
                    No card required to start 14-day trial
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
