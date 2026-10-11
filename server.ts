import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface LeadRecord {
  id: string;
  timestamp: string;
  fullName: string;
  salonName: string;
  email: string;
  phone: string;
  salonType: string;
  stationCount: string;
  currentSoftware: string;
  notes?: string;
  syncedToGoogleSheet?: boolean;
}

const leadsDatabase: LeadRecord[] = [
  {
    id: 'lead-init-1',
    timestamp: '2026-10-10T14:22:00Z',
    fullName: 'Lady Genevieve Laurent',
    salonName: 'Maison Privée Haute Coiffure',
    email: 'g.laurent@belair-estates.com',
    phone: '+1 (310) 849-2041',
    salonType: 'Luxury Hair Atelier',
    stationCount: '11-20 Chairs',
    currentSoftware: 'Mindbody',
    notes: 'Inquired about WhatsApp AI booking and backbar dye tracking.',
    syncedToGoogleSheet: true,
  },
];

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Backend API routes
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'Xylenis Salon CRM Backend',
      supportEmail: 'support@xylenis.com',
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/api/leads', (_req: Request, res: Response) => {
    res.json({
      success: true,
      count: leadsDatabase.length,
      leads: leadsDatabase,
    });
  });

  app.post('/api/leads', (req: Request, res: Response) => {
    const {
      fullName,
      salonName,
      email,
      phone,
      salonType,
      stationCount,
      currentSoftware,
      notes,
      syncedToGoogleSheet,
    } = req.body;

    if (!fullName || !salonName || !email) {
      return res.status(400).json({
        error: 'Missing required fields (fullName, salonName, email)',
      });
    }

    const newLead: LeadRecord = {
      id: `lead-${Date.now()}`,
      timestamp: new Date().toISOString(),
      fullName,
      salonName,
      email,
      phone: phone || '',
      salonType: salonType || 'Luxury Hair Atelier',
      stationCount: stationCount || '6-10 Chairs',
      currentSoftware: currentSoftware || 'Mindbody',
      notes: notes || '',
      syncedToGoogleSheet: Boolean(syncedToGoogleSheet),
    };

    leadsDatabase.unshift(newLead);

    console.log(`[Xylenis Backend] Logged lead for ${salonName} (${email}) - Google Sheet sync: ${Boolean(syncedToGoogleSheet)}`);

    return res.status(201).json({
      success: true,
      lead: newLead,
      supportContact: 'support@xylenis.com',
    });
  });

  // Mount Vite development server in dev mode
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Xylenis Server] Running on http://localhost:${PORT} (Support: support@xylenis.com)`);
  });
}

startServer();
