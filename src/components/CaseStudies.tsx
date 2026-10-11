import React from 'react';
import { CASE_STUDIES } from '../data/mockData';
import { Quote, ArrowUpRight } from 'lucide-react';

interface CaseStudiesProps {
  onOpenDemo: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenDemo }) => {
  return (
    <section id="case-studies" className="py-20 md:py-28 bg-white border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-3">
            <span>Verified Impact</span>
            <span aria-hidden="true">·</span>
            <span>Client Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-display mb-4 [text-wrap:balance]">
            Trusted across 340+ premier salon ateliers and wellness sanctuaries.
          </h2>
          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Read how leading salon owners, medical aesthetic directors, and retreat managers eliminated operational drag and expanded margins.
          </p>
        </div>

        {/* Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-[#FAF8F5] rounded-2xl p-8 border border-stone-200/90 flex flex-col justify-between hover:border-stone-300 transition-all shadow-2xs"
            >
              <div>
                {/* Metric Spotlight */}
                <div className="pb-6 border-b border-stone-200/80 mb-6">
                  <div className="text-3xl sm:text-4xl font-bold font-display text-stone-900 tabular-nums mb-1">
                    {study.headlineMetric}
                  </div>
                  <div className="text-xs font-semibold text-stone-700">
                    {study.metricLabel}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    {study.secondaryMetric}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-stone-700 text-sm leading-relaxed mb-6 italic">
                  "{study.quote}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-6 border-t border-stone-200/80">
                <div className="font-semibold text-sm text-stone-900">{study.leaderName}</div>
                <div className="text-xs text-stone-500">{study.leaderTitle}</div>
                <div className="text-xs font-medium text-stone-800 mt-1">{study.salonName}</div>
                
                {/* Clean unboxed tags */}
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mt-3">
                  <span>{study.location}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.businessType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="text-sm font-semibold text-stone-900">
              Operating a multi-location salon group or luxury hotel spa?
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              We provide custom enterprise integrations for Marriott Luxury Collection, Four Seasons, and independent salon groups.
            </div>
          </div>
          <button
            onClick={onOpenDemo}
            className="px-5 py-2.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Speak with an Enterprise Architect
          </button>
        </div>

      </div>
    </section>
  );
};
