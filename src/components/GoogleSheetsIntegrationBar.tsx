import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  RefreshCw, 
  LogOut, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
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
  setStoredSpreadsheetId, 
  fetchRecentLeads,
  FormSubmissionPayload 
} from '../services/googleSheets';

interface GoogleSheetsIntegrationBarProps {
  onLeadSynced?: () => void;
}

export const GoogleSheetsIntegrationBar: React.FC<GoogleSheetsIntegrationBarProps> = ({ onLeadSynced }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [spreadsheetId, setSpreadsheetId] = useState<string | null>(getStoredSpreadsheetId());
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [syncedCount, setSyncedCount] = useState<number>(0);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);

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
      setStatusMessage({ text: `Google Sheets error: ${err.message || 'Permission needed'}`, type: 'error' });
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
      fullName: 'Elena Rostova (Test Lead)',
      salonName: 'Aura Holistic Spa & Atelier',
      email: 'support@xylenis.com',
      phone: '+1 (310) 555-0199',
      salonType: 'Aesthetic Medical Spa',
      stationCount: '8 Chairs/Suites',
      currentSoftware: 'Mindbody',
      notes: 'Automated test entry dispatched from Xylenis testing console.',
    };

    try {
      // 1. Post to backend Express API
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testPayload,
          syncedToGoogleSheet: true,
        }),
      }).catch(() => {});

      // 2. Append directly to Google Sheet
      await appendLeadToGoogleSheet(spreadsheetId, testPayload, activeToken);

      setSyncedCount((prev) => prev + 1);
      setStatusMessage({
        text: 'Test Lead added to Google Sheet! Click "Open Sheet" below to view the live row in Google Sheets.',
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

  const sheetUrl = spreadsheetId ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}` : null;

  return (
    <div className="bg-stone-900 text-stone-100 border-b border-stone-800 text-xs py-3 px-4 sm:px-6 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Left Side: Status & Label */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-wide">
                Google Sheets Backend Integration
              </span>
              {user ? (
                <span className="bg-emerald-900/60 border border-emerald-700/60 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Live & Connected
                </span>
              ) : (
                <span className="bg-stone-800 text-stone-400 text-[10px] px-2 py-0.5 rounded-full">
                  Ready to Connect
                </span>
              )}
            </div>
            
            <p className="text-[11px] text-stone-400 mt-0.5">
              {user 
                ? `Storing walkthrough submissions to "${spreadsheetId ? 'Xylenis CRM — Salon Walkthrough Requests & Leads' : 'Google Sheets'}" · Support: support@xylenis.com`
                : 'Connect your Google account to auto-append landing page walkthrough requests into Google Sheets.'}
            </p>
          </div>
        </div>

        {/* Right Side: Actions & Testing Controls */}
        <div className="flex items-center flex-wrap gap-2.5 shrink-0">
          {!user ? (
            /* Official Google Sign In styled button */
            <button
              onClick={handleSignIn}
              disabled={isConnecting}
              className="px-3.5 py-1.5 bg-white hover:bg-stone-100 text-stone-900 font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isConnecting ? 'Connecting...' : 'Connect Google Sheets'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              {/* Test Lead Button */}
              <button
                onClick={handleSendTestLead}
                disabled={isTesting}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                title="Send a sample lead directly into your Google Sheet to verify live sync"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isTesting ? 'Sending Test...' : 'Send Test Lead to Sheet'}</span>
              </button>

              {/* Open in Google Sheets link */}
              {sheetUrl && (
                <a
                  href={sheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 border border-stone-700 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Sheet ↗</span>
                </a>
              )}

              {/* User Avatar / Sign Out */}
              <div className="flex items-center gap-2 pl-2 border-l border-stone-700">
                <span className="text-[11px] text-stone-300 hidden sm:inline truncate max-w-[140px]" title={user.email || ''}>
                  {user.displayName || user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-stone-400 hover:text-rose-400 rounded transition-colors cursor-pointer"
                  title="Disconnect Google account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Status Feedback Message */}
      {statusMessage && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px]">
          <span
            className={
              statusMessage.type === 'success'
                ? 'text-emerald-400'
                : statusMessage.type === 'error'
                ? 'text-rose-400'
                : 'text-amber-400'
            }
          >
            {statusMessage.text}
          </span>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-stone-500 hover:text-stone-300 ml-4 cursor-pointer"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};
