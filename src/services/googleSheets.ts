import { getAccessToken } from './auth';

export interface FormSubmissionPayload {
  fullName: string;
  salonName: string;
  email: string;
  phone: string;
  salonType: string;
  stationCount: string;
  currentSoftware: string;
  notes?: string;
}

const DEFAULT_SHEET_TITLE = 'Xylenis CRM — Salon Walkthrough Requests & Leads';
const SPREADSHEET_ID_STORAGE_KEY = 'xylenis_google_spreadsheet_id';

export const getStoredSpreadsheetId = (): string | null => {
  return localStorage.getItem(SPREADSHEET_ID_STORAGE_KEY);
};

export const setStoredSpreadsheetId = (id: string) => {
  localStorage.setItem(SPREADSHEET_ID_STORAGE_KEY, id);
};

/**
 * Creates a new dedicated Google Spreadsheet with formatted headers.
 */
export const createLeadsSpreadsheet = async (accessToken: string): Promise<{ id: string; url: string }> => {
  const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        title: DEFAULT_SHEET_TITLE,
      },
      sheets: [
        {
          properties: {
            title: 'Leads',
            gridProperties: {
              frozenRowCount: 1,
            },
          },
          data: [
            {
              startRow: 0,
              startColumn: 0,
              rowData: [
                {
                  values: [
                    { userEnteredValue: { stringValue: 'Timestamp (UTC)' } },
                    { userEnteredValue: { stringValue: 'Full Name' } },
                    { userEnteredValue: { stringValue: 'Salon / Spa Name' } },
                    { userEnteredValue: { stringValue: 'Business Email' } },
                    { userEnteredValue: { stringValue: 'Direct Phone / WhatsApp' } },
                    { userEnteredValue: { stringValue: 'Establishment Type' } },
                    { userEnteredValue: { stringValue: 'Active Chairs / Suites' } },
                    { userEnteredValue: { stringValue: 'Current Software' } },
                    { userEnteredValue: { stringValue: 'Status' } },
                    { userEnteredValue: { stringValue: 'Notes' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to create Google Spreadsheet');
  }

  const data = await response.json();
  const spreadsheetId = data.spreadsheetId;
  setStoredSpreadsheetId(spreadsheetId);
  return {
    id: spreadsheetId,
    url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
  };
};

/**
 * Appends a lead row to the Google Spreadsheet.
 */
export const appendLeadToGoogleSheet = async (
  spreadsheetId: string,
  lead: FormSubmissionPayload,
  accessToken: string
): Promise<{ updatedRows: number }> => {
  const timestamp = new Date().toISOString();
  const values = [
    [
      timestamp,
      lead.fullName,
      lead.salonName,
      lead.email,
      lead.phone || 'N/A',
      lead.salonType,
      lead.stationCount,
      lead.currentSoftware,
      'New Inbound Lead',
      lead.notes || 'Inquiry from Xylenis Landing Page',
    ],
  ];

  const range = 'Leads!A:J';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message || 'Failed to append row to Google Sheet');
  }

  const result = await response.json();
  return {
    updatedRows: result.updates?.updatedRows || 1,
  };
};

/**
 * Reads recent leads from the Google Spreadsheet to confirm live synchronization.
 */
export const fetchRecentLeads = async (
  spreadsheetId: string,
  accessToken: string
): Promise<string[][]> => {
  const range = 'Leads!A2:J50';
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.values || [];
};
