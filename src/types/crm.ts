export interface ServiceItem {
  id: string;
  name: string;
  category: 'spa' | 'salon' | 'medspa';
  duration: number; // in minutes
  price: number;
  therapistId: string;
  therapistName: string;
}

export interface RetailProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  stockQty: number;
  category: string;
  recommendedFor: string;
}

export interface OrderItem {
  type: 'service' | 'retail';
  id: string;
  name: string;
  price: number;
  therapistName?: string;
  commissionRate: number; // percentage e.g. 45 or 15
}

export interface ClientDossier {
  id: string;
  name: string;
  tier: 'VIP Sovereign' | 'Private Reserve' | 'Signature Guest';
  phone: string;
  email: string;
  lastVisit: string;
  totalVisits: number;
  lifetimeValue: number;
  preferredTherapist: string;
  beveragePreference: string;
  skinHairProfile: {
    skinType: string;
    hairTexture: string;
    sensitivities: string[];
    lastFormula?: string;
  };
  notes: string;
  nextRecommendedVisit: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'client' | 'system';
  text: string;
  timestamp: string;
  actionCard?: {
    type: 'appointment_proposal' | 'retail_upsell' | 'payment_link';
    title: string;
    detail: string;
    confirmed?: boolean;
  };
}

export interface BackbarStockItem {
  id: string;
  name: string;
  brand: string;
  currentLevelMl: number;
  capacityMl: number;
  reorderThresholdMl: number;
  costPerUnit: number;
  lastUsedService: string;
  status: 'optimal' | 'low' | 'reorder_required';
}

export interface CaseStudy {
  id: string;
  salonName: string;
  location: string;
  leaderName: string;
  leaderTitle: string;
  businessType: string;
  headlineMetric: string;
  metricLabel: string;
  secondaryMetric: string;
  quote: string;
  tags: string[];
}
