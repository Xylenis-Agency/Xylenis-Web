import React, { useState, useEffect } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  LogOut, 
  ShieldCheck, 
  AlertCircle,
  Lock
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken 
} from '../services/auth';
import { 
  createLeadsSpreadsheet, 
  appendLeadToGoogleSheet, 
  getStoredSpreadsheetId, 
  fetchRecentLeads,
  FormSubmissionPayload 
} from '../services/googleSheets';

interface AdminSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSynced?: () => void;
}

export const AdminSheetModal: React.FC<AdminSheetModalProps> = ({ isOpen, onClose, onLeadSynced }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(getStoredSpreadsheetId());
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [syncedCount, setSyncedCount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = initAuth(
      async (authUser, authToken) => {
        setUser(authUser);
        setToken(authToken);
        ensureSpreadsheet(authToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );

    return () => unsubscribe();
  }, []);

  const ensureSpreadsheet = async (authToken: string) => {
    try {
      const existingId = getStoredSpreadsheetId();
      if (existingId) {
        setSpreadsheetId(existingId);
        const rows = await fetchRecentLeads(existingId, authToken);
        setSyncedCount(rows.length);
      } else {
        setStatusMessage({ text: 'Creating "Xylenis CRM — Salon Walkthrough Requests & Leads" in Google Drive...', type: 'info' });
        const created = await createLeadsSpreadsheet(authToken);
        setSpreadsheetId(created.id);
        setStatusMessage({ text: 'Connected to Google Sheets successfully! Form submissions will now sync live.', type: 'success' });
      }
    } catch (err: any) {
      console.error('Error initializing spreadsheet:', err);
      setStatusMessage({ text: `Google Sheets notice: ${err.message || 'Permission needed'}`, type: 'error' });
    }
  };

  const handleSignIn = async () => {
    setIsConnecting(true);
    setStatusMessage(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        await ensureSpreadsheet(res.accessToken);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setStatusMessage({ text: err.message || 'Sign in cancelled or failed', type: 'error' });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setStatusMessage(null);
  };

  const handleSendTestLead = async () => {
    const activeToken = token || (await getAccessToken());
    if (!activeToken || !spreadsheetId) {
      setStatusMessage({ text: 'Please sign in first to test Google Sheets integration.', type: 'error' });
      return;
    }

    setIsTesting(true);
    setStatusMessage(null);

    const testPayload: FormSubmissionPayload = {
      fullName: 'Dr. Camille Fontaine (Test Entry)',
      salonName: 'Aura Sanctuary Beverly Hills',
      email: 'support@xylenis.com',
      phone: '+1 (310) 849-2041',
      salonType: 'Aesthetic Medical Spa',
      stationCount: '8 Suites',
      currentSoftware: 'Boulevard',
      notes: 'Verified live sync entry dispatched from Xylenis Admin Panel.',
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testPayload,
          syncedToGoogleSheet: true,
        }),
      }).catch(() => {});

      await appendLeadToGoogleSheet(spreadsheetId, testPayload, activeToken);

      setSyncedCount((prev) => prev + 1);
      setStatusMessage({
        text: 'Test Lead added to Google Sheet! Click "Open Sheet" to view the live row.',
        type: 'success',
      });
      if (onLeadSynced) onLeadSynced();
    } catch (err: any) {
      console.error('Test submission error:', err);
      setStatusMessage({
        text: `Failed to append test row: ${err.message}`,
        type: 'error',
      });
    } finally {
      setIsTesting(false);
    }
  };

  if (!isOpen) return null;

  const sheetUrl = spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}` : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
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

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-stone-500 mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>Owner Administration</span>
          </div>
          <h3 className="text-xl font-bold text-stone-900 font-display">
            Google Sheets Lead Hub
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Configure and test your private Google Spreadsheet where visitor contact submissions are captured. This panel is hidden from regular visitors.
          </p>
        </div>

        {/* Connection Box */}
        <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 mb-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-stone-900">
                  Google Sheets Sync
                </div>
                <div className="text-[11px] text-stone-500">
                  {user ? `Connected as ${user.email}` : 'Not connected'}
                </div>
              </div>
            </div>

            {user ? (
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Active
              </span>
            ) : (
              <span className="text-[11px] text-stone-500 bg-stone-200 px-2 py-0.5 rounded-full">
                Disconnected
              </span>
            )}
          </div>

          {!user ? (
            <button
              onClick={handleSignIn}
              disabled={isConnecting}
              className="w-full py-2.5 px-4 bg-white hover:bg-stone-100 border border-stone-300 text-stone-900 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isConnecting ? 'Connecting...' : 'Connect Owner Google Account'}</span>
            </button>
          ) : (
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Spreadsheet Name:</span>
                <span className="font-medium text-stone-900 truncate max-w-[200px]">
                  Xylenis CRM — Leads
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Synced Inquiries:</span>
                <span className="font-mono font-semibold text-stone-900">{syncedCount} entries</span>
              </div>

              <div className="flex gap-2 pt-2">
                {sheetUrl && (
                  <a
                    href={sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Google Sheets ↗</span>
                  </a>
                )}

                <button
                  onClick={handleSendTestLead}
                  disabled={isTesting}
                  className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Send a sample test row"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isTesting ? 'Sending...' : 'Test Row'}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-stone-200 transition-colors cursor-pointer"
                  title="Disconnect account"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div
            className={`p-3 rounded-lg text-xs mb-4 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : statusMessage.type === 'error'
                ? 'bg-rose-50 text-rose-800 border border-rose-200'
                : 'bg-stone-100 text-stone-800 border border-stone-200'
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <div className="text-[11px] text-stone-400 leading-relaxed border-t border-stone-100 pt-3">
          When visitors fill out the walkthrough booking form on your website, submissions are logged to the backend and automatically appended to this spreadsheet.
        </div>
      </div>
    </div>
  );
};
