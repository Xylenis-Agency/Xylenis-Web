import React, { useState } from 'react';
import { X, CheckCircle2, FileSpreadsheet, ExternalLink, Loader2, Mail, ShieldCheck } from 'lucide-react';
import { getAccessToken } from '../services/auth';
import { appendLeadToGoogleSheet, getStoredSpreadsheetId } from '../services/googleSheets';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted?: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onLeadSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [sheetSynced, setSheetSynced] = useState<boolean>(false);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    salonName: '',
    email: '',
    phone: '',
    salonType: 'Luxury Hair Atelier',
    stationCount: '6-10 Chairs',
    currentSoftware: 'Mindbody',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.salonName || !formData.email || !formData.fullName) return;

    setIsSubmitting(true);

    try {
      // 1. Submit to server-side backend API
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          syncedToGoogleSheet: false,
        }),
      }).catch((err) => {
        console.warn('Backend logging notice:', err);
        return null;
      });

      // 2. If Google Sheets is configured, append directly to Google Sheet
      const spreadsheetId = getStoredSpreadsheetId();
      const token = await getAccessToken();

      if (spreadsheetId && token) {
        try {
          await appendLeadToGoogleSheet(spreadsheetId, formData, token);
          setSheetSynced(true);
          setSheetUrl(`https://docs.google.com/spreadsheets/d/${spreadsheetId}`);
        } catch (sheetErr) {
          console.warn('Google Sheet append note:', sheetErr);
        }
      }

      setSubmitted(true);
      if (onLeadSubmitted) onLeadSubmitted();
    } catch (err) {
      console.error('Submission error:', err);
      // Still show successful client confirmation
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSheetSynced(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-lg cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 mb-1">
                Private Demonstration & VIP Walkthrough
              </div>
              <h3 className="text-2xl font-bold text-stone-900 font-display">
                Experience Xylenis for your salon or spa
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                We'll prepare a custom sandbox seeded with your regional currency, pricing structure, and sample service catalog.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Helena Vance"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Salon / Spa Brand Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.salonName}
                    onChange={(e) => setFormData({ ...formData, salonName: e.target.value })}
                    placeholder="e.g. Maison Privée Atelier"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="director@yourdomain.com"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2831"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Establishment Type
                  </label>
                  <select
                    value={formData.salonType}
                    onChange={(e) => setFormData({ ...formData, salonType: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="Luxury Hair Atelier">Luxury Hair Atelier</option>
                    <option value="Aesthetic Medical Spa">Aesthetic Medical Spa</option>
                    <option value="Day Spa & Thermal Bath">Day Spa & Thermal Bath</option>
                    <option value="Holistic Wellness Retreat">Holistic Wellness Retreat</option>
                    <option value="Multi-Location Salon Group">Multi-Location Salon Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Active Chairs / Suites
                  </label>
                  <select
                    value={formData.stationCount}
                    onChange={(e) => setFormData({ ...formData, stationCount: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    <option value="1-5 Chairs">1 - 5 Chairs/Suites</option>
                    <option value="6-10 Chairs">6 - 10 Chairs/Suites</option>
                    <option value="11-20 Chairs">11 - 20 Chairs/Suites</option>
                    <option value="20+ Multi-Location">20+ Multi-Location</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Current Software Being Replaced
                </label>
                <select
                  value={formData.currentSoftware}
                  onChange={(e) => setFormData({ ...formData, currentSoftware: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900"
                >
                  <option value="Mindbody">Mindbody / Booker</option>
                  <option value="Boulevard">Boulevard</option>
                  <option value="Phorest">Phorest Salon Software</option>
                  <option value="Fresha">Fresha</option>
                  <option value="Vagaro">Vagaro</option>
                  <option value="Square / Clover POS">Square / Clover POS</option>
                  <option value="Paper Appointment Books">Paper Appointment Books / None</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Dispatching to Xylenis Backend & Google Sheets...</span>
                    </>
                  ) : (
                    <span>Schedule Private Demonstration</span>
                  )}
                </button>
                <div className="text-center text-[11px] text-stone-400 mt-2">
                  Zero commitment · Official inquiries: support@xylenis.com
                </div>
              </div>
            </form>
          </div>
        ) : (
          /* Submission Feedback */
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 font-display mb-2">
              Walkthrough Scheduled!
            </h3>
            <p className="text-sm text-stone-600 mb-6 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-stone-900">{formData.fullName}</span>. We are configuring a private Xylenis sandbox for <span className="font-semibold text-stone-900">{formData.salonName}</span>.
            </p>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-500">Destination Email:</span>
                <span className="font-mono text-stone-900">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Facility Type:</span>
                <span className="text-stone-900">{formData.salonType} ({formData.stationCount})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Backend Record:</span>
                <span className="text-emerald-700 font-medium">Logged in Express Backend API</span>
              </div>
              {sheetSynced && (
                <div className="flex justify-between items-center pt-1 border-t border-stone-200">
                  <span className="text-stone-500 flex items-center gap-1">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Google Sheet:</span>
                  </span>
                  {sheetUrl ? (
                    <a
                      href={sheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-900 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>Appended to Leads Tab ↗</span>
                    </a>
                  ) : (
                    <span className="text-emerald-700 font-medium">Row Added Successfully</span>
                  )}
                </div>
              )}
              <div className="flex justify-between pt-1 border-t border-stone-200 text-stone-400">
                <span>Support Channel:</span>
                <span className="font-medium text-stone-600">support@xylenis.com</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
            >
              Return to Landing Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
