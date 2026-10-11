/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveSandbox } from './components/InteractiveSandbox';
import { CapabilitiesGrid } from './components/CapabilitiesGrid';
import { RoiSimulator } from './components/RoiSimulator';
import { ComparisonTable } from './components/ComparisonTable';
import { CaseStudies } from './components/CaseStudies';
import { Pricing } from './components/Pricing';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { GoogleSheetsIntegrationBar } from './components/GoogleSheetsIntegrationBar';

export default function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [syncKey, setSyncKey] = useState<number>(0);
  const [customLogo, setCustomLogo] = useState<string | null>(() => {
    return localStorage.getItem('xylenis_custom_logo');
  });

  const handleLogoUpload = (logoUrl: string | null) => {
    setCustomLogo(logoUrl);
    if (logoUrl) {
      localStorage.setItem('xylenis_custom_logo', logoUrl);
    } else {
      localStorage.removeItem('xylenis_custom_logo');
    }
  };

  const handleOpenDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handleCloseDemo = () => {
    setIsDemoModalOpen(false);
  };

  const handleScrollToSandbox = () => {
    const el = document.getElementById('interactive-os');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToRoi = () => {
    const el = document.getElementById('revenue-impact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 selection:bg-stone-800 selection:text-white flex flex-col">
      {/* Google Sheets Live Backend Integration Bar */}
      <GoogleSheetsIntegrationBar key={syncKey} onLeadSynced={() => setSyncKey((k) => k + 1)} />

      {/* 1-Row 3-Zone Top Navigation Bar with Click-to-Upload Logo */}
      <Navbar
        onOpenDemo={handleOpenDemo}
        customLogo={customLogo}
        onLogoUpload={handleLogoUpload}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenDemo={handleOpenDemo}
          onExploreSandbox={handleScrollToSandbox}
          onScrollToRoi={handleScrollToRoi}
        />

        {/* Live Interactive OS Sandbox (Hands-on product experience) */}
        <InteractiveSandbox />

        {/* Core Capabilities Bento Grid */}
        <CapabilitiesGrid onOpenDemo={handleOpenDemo} />

        {/* Interactive Revenue & ROI Simulator */}
        <RoiSimulator onOpenDemo={handleOpenDemo} />

        {/* Legacy Software vs Xylenis Comparison */}
        <ComparisonTable />

        {/* Client Proof & Attributable Case Studies */}
        <CaseStudies onOpenDemo={handleOpenDemo} />

        {/* Transparent Tiered Pricing */}
        <Pricing onOpenDemo={handleOpenDemo} />

        {/* Frequently Asked Questions Accordion */}
        <FaqSection />
      </main>

      {/* Refined Footer */}
      <Footer onOpenDemo={handleOpenDemo} customLogo={customLogo} />

      {/* Private Walkthrough / Demo Modal */}
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={handleCloseDemo}
        onLeadSubmitted={() => setSyncKey((k) => k + 1)}
      />
    </div>
  );
}
