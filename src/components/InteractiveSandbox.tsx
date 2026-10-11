import React, { useState } from 'react';
import { 
  Receipt, 
  Bot, 
  UserCheck, 
  Package, 
  Plus, 
  Trash2, 
  Check, 
  Send, 
  Sparkles, 
  Calendar, 
  Clock, 
  AlertCircle,
  FileText,
  DollarSign,
  CreditCard,
  Wine,
  RefreshCw
} from 'lucide-react';
import { 
  INITIAL_SERVICES, 
  INITIAL_PRODUCTS, 
  MOCK_CLIENT_DOSSIER, 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_BACKBAR_ITEMS 
} from '../data/mockData';
import { OrderItem, ChatMessage, BackbarStockItem } from '../types/crm';

export const InteractiveSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'checkout' | 'concierge' | 'dossier' | 'inventory'>('checkout');

  // Checkout state
  const [ticketItems, setTicketItems] = useState<OrderItem[]>([
    {
      type: 'service',
      id: 'srv-1',
      name: 'Caviar & Peptide Cellular Facial',
      price: 285,
      therapistName: 'Dr. Camille Fontaine',
      commissionRate: 45,
    },
    {
      type: 'retail',
      id: 'prod-1',
      name: 'Botanical Ceramide Recovery Serum 50ml',
      price: 115,
      commissionRate: 15,
    },
  ]);
  const [tipRate, setTipRate] = useState<number>(20);
  const [paymentSettled, setPaymentSettled] = useState<boolean>(false);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState<string>('');
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);

  // Inventory state
  const [inventoryItems, setInventoryItems] = useState<BackbarStockItem[]>(INITIAL_BACKBAR_ITEMS);
  const [reorderNotification, setReorderNotification] = useState<string | null>(null);

  // Client dossier note addition
  const [clientNotes, setClientNotes] = useState<string>(MOCK_CLIENT_DOSSIER.notes);
  const [tempNote, setTempNote] = useState<string>('');

  // Checkout calculations
  const subtotal = ticketItems.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.0825;
  const tip = (subtotal * tipRate) / 100;
  const total = subtotal + tax + tip;

  const therapistCommissions = ticketItems.reduce((acc, item) => {
    return acc + (item.price * item.commissionRate) / 100;
  }, 0);

  const handleAddService = (srvId: string) => {
    const srv = INITIAL_SERVICES.find((s) => s.id === srvId);
    if (!srv) return;
    setTicketItems((prev) => [
      ...prev,
      {
        type: 'service',
        id: `${srv.id}-${Date.now()}`,
        name: srv.name,
        price: srv.price,
        therapistName: srv.therapistName,
        commissionRate: 45,
      },
    ]);
  };

  const handleAddProduct = (prodId: string) => {
    const prod = INITIAL_PRODUCTS.find((p) => p.id === prodId);
    if (!prod) return;
    setTicketItems((prev) => [
      ...prev,
      {
        type: 'retail',
        id: `${prod.id}-${Date.now()}`,
        name: prod.name,
        price: prod.price,
        commissionRate: 15,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setTicketItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSettleOrder = () => {
    setPaymentSettled(true);
  };

  const handleResetOrder = () => {
    setTicketItems([
      {
        type: 'service',
        id: 'srv-1',
        name: 'Caviar & Peptide Cellular Facial',
        price: 285,
        therapistName: 'Dr. Camille Fontaine',
        commissionRate: 45,
      },
      {
        type: 'retail',
        id: 'prod-1',
        name: 'Botanical Ceramide Recovery Serum 50ml',
        price: 115,
        commissionRate: 15,
      },
    ]);
    setPaymentSettled(false);
  };

  // Chat handlers
  const handleSendChat = (textToSend?: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'client',
      text,
      timestamp: '11:18 AM',
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = "I've updated the guest schedule and confirmed the reservation details.";
      let card = undefined;

      const lower = text.toLowerCase();
      if (lower.includes('blowout') || lower.includes('blow-dry')) {
        reply = "Certainly! I have added an Express Botanical Blowout (30 min, $65) directly following Marcus's balayage. Atelier Suite 3 is reserved through 3:30 PM.";
      } else if (lower.includes('saturday') || lower.includes('weekend')) {
        reply = "Checking Marcus's Saturday availability: He has a 10:15 AM slot available in Suite 2. Would you prefer Saturday at 10:15 AM over Friday at 2:45 PM?";
        card = {
          type: 'appointment_proposal' as const,
          title: 'Saturday, April 18 @ 10:15 AM',
          detail: 'Marcus Vance · Atelier Suite 2 · $425 Total',
        };
      } else if (lower.includes('allerg') || lower.includes('sensitiv')) {
        reply = "Reviewing Lady Genevieve's profile: She has an alert for Essential Lavender Oil (>2%) and high-strength glycolic peels. Marcus's formula and backbar tray will be restricted to calming centella and peptide elixirs.";
      } else if (lower.includes('confirm') || lower.includes('yes') || lower.includes('book')) {
        reply = "Wonderful! Your reservation is confirmed for Friday, April 17 @ 2:45 PM. A calendar invite and guest valet instructions have been sent via SMS.";
        card = {
          type: 'appointment_proposal' as const,
          title: 'Confirmed: Friday, April 17 @ 2:45 PM',
          detail: 'Hold deposit settled ($100). Balance due at treatment conclusion.',
          confirmed: true,
        };
      } else {
        reply = `Understood. I have logged this request into the guest notes and synchronized Marcus's operational clipboard.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: '11:18 AM',
          actionCard: card,
        },
      ]);
      setIsAiTyping(false);
    }, 700);
  };

  // Inventory dispense handler
  const handleDispenseItem = (itemId: string, mlToDeduct: number) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextLevel = Math.max(0, item.currentLevelMl - mlToDeduct);
          const nextStatus =
            nextLevel <= item.reorderThresholdMl
              ? 'reorder_required'
              : nextLevel <= item.reorderThresholdMl * 1.5
              ? 'low'
              : 'optimal';

          if (nextStatus === 'reorder_required') {
            setReorderNotification(
              `Restock Alert: ${item.name} dropped below ${item.reorderThresholdMl}ml threshold. Automated Purchase Order generated.`
            );
          }
          return {
            ...item,
            currentLevelMl: nextLevel,
            status: nextStatus,
          };
        }
        return item;
      })
    );
  };

  const handleRestockItem = (itemId: string) => {
    setInventoryItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            currentLevelMl: item.capacityMl,
            status: 'optimal',
          };
        }
        return item;
      })
    );
    setReorderNotification(null);
  };

  return (
    <section id="interactive-os" className="py-20 md:py-28 bg-[#FAF8F5] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider text-stone-500 uppercase mb-3">
            <span>Hands-on Experience</span>
            <span aria-hidden="true">·</span>
            <span>Real Operational Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 font-display mb-4 [text-wrap:balance]">
            Experience Xylenis in real time.
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Interact with live modules below to see how Xylenis coordinates tickets, autonomous client messaging, guest formulas, and dispensary inventory.
          </p>
        </div>

        {/* Segmented Control Bar (Zero-pill button tabs) */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 bg-stone-200/70 rounded-xl max-w-full overflow-x-auto shadow-inner">
            <button
              onClick={() => setActiveTab('checkout')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'checkout'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Receipt className="w-4 h-4" />
              <span>01. Order & Split Checkout</span>
            </button>

            <button
              onClick={() => setActiveTab('concierge')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'concierge'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>02. AI Guest Concierge</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'dossier'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>03. VIP Client Memory</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === 'inventory'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>04. Dispensary & Backbar Sync</span>
            </button>
          </div>
        </div>

        {/* Master Workspace Container */}
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xl overflow-hidden min-h-[580px]">
          
          {/* TAB 1: ORDER CHECKOUT & SPLIT TENDER DESK */}
          {activeTab === 'checkout' && (
            <div className="p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                
                {/* Left: Active Ticket & Item Catalog */}
                <div className="lg:w-7/12 flex flex-col justify-between">
                  <div>
                    {/* Header info */}
                    <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-5">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">Live Ticket #4928</div>
                        <div className="text-lg font-bold text-stone-900 font-display">Lady Genevieve Laurent</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-stone-600">Atelier Suite 1</span>
                        <div className="text-xs text-stone-400">Marcus Vance & Dr. Camille</div>
                      </div>
                    </div>

                    {/* Quick Add Tray */}
                    <div className="mb-6">
                      <div className="text-xs font-medium text-stone-500 mb-2.5">Quick-Add To Ticket:</div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleAddService('srv-4')}
                          className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Scissor Reshape ($175)</span>
                        </button>
                        <button
                          onClick={() => handleAddProduct('prod-2')}
                          className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Bond Masque 250ml ($88)</span>
                        </button>
                        <button
                          onClick={() => handleAddProduct('prod-3')}
                          className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200/80 text-stone-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Scalp Elixir 30ml ($94)</span>
                        </button>
                      </div>
                    </div>

                    {/* Itemized Ticket Rows */}
                    <div className="space-y-3 mb-6 max-h-[260px] overflow-y-auto pr-1">
                      {ticketItems.map((item, index) => (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl border border-stone-200/80 bg-stone-50/50 flex items-center justify-between gap-4 transition-colors hover:bg-stone-50"
                        >
                          <div>
                            <div className="text-sm font-semibold text-stone-900">{item.name}</div>
                            <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                              <span className="capitalize">{item.type}</span>
                              <span aria-hidden="true">·</span>
                              <span>Commission: {item.commissionRate}% (${((item.price * item.commissionRate) / 100).toFixed(2)})</span>
                              {item.therapistName && (
                                <>
                                  <span aria-hidden="true">·</span>
                                  <span>{item.therapistName}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold font-mono tabular-nums text-stone-900">
                              ${item.price.toFixed(2)}
                            </span>
                            <button
                              onClick={() => handleRemoveItem(index)}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Automated Commission Transparency Callout */}
                  <div className="p-3.5 rounded-xl bg-stone-100/70 border border-stone-200 text-xs text-stone-700 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-stone-900">Staff Payout Split:</span>
                      <span className="ml-2">${therapistCommissions.toFixed(2)} automatically routed to therapist ledger</span>
                    </div>
                    <span className="text-stone-500 text-[11px]">Real-time payroll sync</span>
                  </div>
                </div>

                {/* Right: Payment Calculation & Terminal Settlement */}
                <div className="lg:w-5/12 bg-stone-50 rounded-xl p-6 border border-stone-200/90 flex flex-col justify-between">
                  {!paymentSettled ? (
                    <div>
                      <div className="text-xs font-semibold tracking-wider uppercase text-stone-500 mb-4">
                        Settlement Breakdown
                      </div>

                      {/* Calculations */}
                      <div className="space-y-2.5 pb-4 border-b border-stone-200 text-sm">
                        <div className="flex justify-between text-stone-600">
                          <span>Services & Products Subtotal</span>
                          <span className="font-mono tabular-nums font-medium text-stone-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-stone-600">
                          <span>State & Local Tax (8.25%)</span>
                          <span className="font-mono tabular-nums font-medium text-stone-900">${tax.toFixed(2)}</span>
                        </div>
                        
                        {/* Tip Selector */}
                        <div className="pt-2">
                          <div className="flex justify-between text-stone-700 text-xs font-medium mb-1.5">
                            <span>Therapist Gratuity</span>
                            <span className="font-mono tabular-nums font-semibold">${tip.toFixed(2)} ({tipRate}%)</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5">
                            {[15, 18, 20, 25].map((rate) => (
                              <button
                                key={rate}
                                onClick={() => setTipRate(rate)}
                                className={`py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                                  tipRate === rate
                                    ? 'bg-stone-900 text-white shadow-xs'
                                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                                }`}
                              >
                                {rate}%
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Final Total */}
                      <div className="py-4 border-b border-stone-200 flex items-baseline justify-between">
                        <span className="text-base font-bold text-stone-900 font-display">Total Due</span>
                        <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                          ${total.toFixed(2)}
                        </span>
                      </div>

                      {/* Payment Tender */}
                      <div className="py-4">
                        <div className="text-xs font-medium text-stone-500 mb-2">Tender Method:</div>
                        <div className="p-3 bg-white rounded-lg border border-stone-200 text-xs flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-stone-700" />
                            <span className="font-medium text-stone-900">Amex Centurion ···· 8104 (On File)</span>
                          </div>
                          <span className="text-stone-500">Authorized</span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={handleSettleOrder}
                        className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Complete Order & Print Digital Receipt</span>
                      </button>
                    </div>
                  ) : (
                    /* Order Complete State */
                    <div className="h-full flex flex-col justify-between text-center py-4">
                      <div>
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold text-stone-900 font-display mb-1">
                          Ticket #4928 Settled
                        </h4>
                        <p className="text-xs text-stone-500 mb-4">
                          Card charged ${total.toFixed(2)}. Digital receipt and take-home care guide sent to g.laurent@belair-estates.com.
                        </p>

                        <div className="p-4 bg-white rounded-xl border border-stone-200/90 text-left text-xs space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-stone-500">Retail Serum Dispensed:</span>
                            <span className="font-mono text-stone-900">1x Botanical Recovery (-1 stock)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Dr. Camille Commission:</span>
                            <span className="font-mono text-emerald-700 font-medium">+$141.45 credited</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Gratuity Dispatched:</span>
                            <span className="font-mono text-stone-900">${tip.toFixed(2)} to staff pool</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleResetOrder}
                        className="py-2.5 px-4 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reset Order Simulator</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: AI AUTONOMOUS RE-BOOKING CONCIERGE */}
          {activeTab === 'concierge' && (
            <div className="p-6 lg:p-8">
              <div className="max-w-3xl mx-auto">
                {/* Simulated Chat Header */}
                <div className="p-4 rounded-t-xl bg-stone-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-xs font-bold text-stone-200">
                      X
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Xylenis AI Concierge</div>
                      <div className="text-[11px] text-stone-300">WhatsApp / SMS Salon Channel · 24/7 Live</div>
                    </div>
                  </div>
                  <div className="text-xs text-stone-300 font-mono">End-to-End Encrypted</div>
                </div>

                {/* Messages Viewport */}
                <div className="p-4 sm:p-6 bg-stone-50 border-x border-stone-200/90 min-h-[340px] max-h-[380px] overflow-y-auto space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.sender === 'client' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'client'
                            ? 'bg-stone-900 text-white rounded-br-xs'
                            : 'bg-white text-stone-900 border border-stone-200/90 shadow-2xs rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        
                        {/* Action Proposal Card */}
                        {msg.actionCard && (
                          <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 text-stone-900">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-xs text-stone-900">{msg.actionCard.title}</span>
                              {msg.actionCard.confirmed ? (
                                <span className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Confirmed
                                </span>
                              ) : (
                                <span className="text-[10px] text-stone-500 font-medium">Pending Confirmation</span>
                              )}
                            </div>
                            <div className="text-xs text-stone-600 mb-2">{msg.actionCard.detail}</div>
                            {!msg.actionCard.confirmed && (
                              <button
                                onClick={() => handleSendChat('Yes, please confirm this slot and charge the deposit.')}
                                className="w-full py-1.5 px-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors cursor-pointer"
                              >
                                One-Tap Accept & Hold Slot
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiTyping && (
                    <div className="flex items-center gap-2 text-xs text-stone-500 italic p-2 bg-white rounded-lg border border-stone-200 inline-flex">
                      <Sparkles className="w-3.5 h-3.5 animate-spin text-stone-700" />
                      <span>Xylenis AI analyzing therapist schedules & contraindications...</span>
                    </div>
                  )}
                </div>

                {/* Quick Prompts Selector */}
                <div className="p-3 bg-stone-100/70 border-x border-stone-200 text-xs text-stone-600 flex flex-wrap gap-2 items-center">
                  <span className="font-medium text-stone-700">Try quick prompt:</span>
                  <button
                    onClick={() => handleSendChat('Can I add an express blowout afterwards?')}
                    className="px-2.5 py-1 bg-white hover:bg-stone-200 border border-stone-200 rounded text-[11px] text-stone-800 transition-colors cursor-pointer"
                  >
                    "Add an express blowout"
                  </button>
                  <button
                    onClick={() => handleSendChat('Does Marcus have anything on Saturday morning instead?')}
                    className="px-2.5 py-1 bg-white hover:bg-stone-200 border border-stone-200 rounded text-[11px] text-stone-800 transition-colors cursor-pointer"
                  >
                    "Check Saturday morning"
                  </button>
                  <button
                    onClick={() => handleSendChat('Are there any allergy conflicts with the scalp treatment?')}
                    className="px-2.5 py-1 bg-white hover:bg-stone-200 border border-stone-200 rounded text-[11px] text-stone-800 transition-colors cursor-pointer"
                  >
                    "Check allergy alerts"
                  </button>
                </div>

                {/* Input Tray */}
                <div className="p-3 bg-white border border-stone-200/90 rounded-b-xl flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Type a simulated message as the guest..."
                    className="flex-1 px-3.5 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-800 text-stone-900"
                  />
                  <button
                    onClick={() => handleSendChat()}
                    className="p-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VIP CLIENT MEMORY & FORMULA DOSSIER */}
          {activeTab === 'dossier' && (
            <div className="p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left Profile Panel */}
                <div className="lg:col-span-5 bg-stone-50 p-6 rounded-xl border border-stone-200">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center font-display font-bold text-xl shadow-xs">
                      GL
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-900 font-display">
                        {MOCK_CLIENT_DOSSIER.name}
                      </h3>
                      <div className="text-xs text-stone-500">Tier: {MOCK_CLIENT_DOSSIER.tier}</div>
                    </div>
                  </div>

                  {/* Quantitative Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="p-3 bg-white rounded-lg border border-stone-200">
                      <div className="text-[11px] text-stone-500">Lifetime Spend</div>
                      <div className="text-base font-bold font-mono text-stone-900 tabular-nums">
                        ${MOCK_CLIENT_DOSSIER.lifetimeValue.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-stone-200">
                      <div className="text-[11px] text-stone-500">Completed Visits</div>
                      <div className="text-base font-bold font-mono text-stone-900 tabular-nums">
                        {MOCK_CLIENT_DOSSIER.totalVisits} appointments
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-4 text-xs">
                    <div>
                      <div className="font-semibold text-stone-700 mb-1">Preferred Practitioners:</div>
                      <div className="text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200">
                        {MOCK_CLIENT_DOSSIER.preferredTherapist}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
                        <Wine className="w-3.5 h-3.5 text-stone-700" />
                        <span>Beverage & Hospitality Protocol:</span>
                      </div>
                      <div className="text-stone-600 bg-white p-2.5 rounded-lg border border-stone-200">
                        {MOCK_CLIENT_DOSSIER.beveragePreference}
                      </div>
                    </div>

                    <div>
                      <div className="font-semibold text-stone-700 mb-1">AI Re-booking Cadence Trigger:</div>
                      <div className="text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 font-medium">
                        {MOCK_CLIENT_DOSSIER.nextRecommendedVisit}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Clinical & Chemical Formula Matrix */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div className="space-y-6">
                    
                    {/* Chemical Formula Log */}
                    <div className="p-5 rounded-xl border border-stone-200 bg-white shadow-2xs">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                          Active Color & Chemical Formula
                        </span>
                        <span className="text-xs font-mono text-stone-400">Logged by Marcus Vance</span>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs font-mono text-stone-800 leading-relaxed">
                        {MOCK_CLIENT_DOSSIER.skinHairProfile.lastFormula}
                      </div>
                    </div>

                    {/* Sensitivities & Allergies Alert */}
                    <div className="p-5 rounded-xl border border-rose-200 bg-rose-50/50">
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-900 mb-2">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Contraindications & Allergy Shield</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {MOCK_CLIENT_DOSSIER.skinHairProfile.sensitivities.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 text-xs bg-white border border-rose-200 text-rose-800 rounded font-medium"
                          >
                            ⚠️ {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dynamic Operational Notes */}
                    <div className="p-5 rounded-xl border border-stone-200 bg-white">
                      <div className="text-xs font-semibold text-stone-700 mb-2">Concierge & Valet Notes:</div>
                      <p className="text-xs text-stone-600 leading-relaxed mb-3">
                        {clientNotes}
                      </p>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Append quick note (e.g. Loves eucalyptus cold towels)..."
                          className="flex-1 px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900"
                        />
                        <button
                          onClick={() => {
                            if (tempNote.trim()) {
                              setClientNotes((prev) => `${prev} · ${tempNote}`);
                              setTempNote('');
                            }
                          }}
                          className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                        >
                          Append
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: BACKBAR DISPENSARY & INVENTORY SYNC */}
          {activeTab === 'inventory' && (
            <div className="p-6 lg:p-8">
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-display">
                    Backbar Dispensary & Chemical Consumption Ledger
                  </h3>
                  <p className="text-xs text-stone-500">
                    Tracks exact product volume consumed per treatment protocol with milliliter precision.
                  </p>
                </div>
                <div className="text-xs text-stone-500 font-mono">
                  Inventory Value: <span className="font-bold text-stone-900">$18,420.00</span>
                </div>
              </div>

              {/* Notification Banner when item is reordered */}
              {reorderNotification && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span>{reorderNotification}</span>
                  <button
                    onClick={() => setReorderNotification(null)}
                    className="text-amber-800 hover:underline font-medium cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              {/* Inventory Table Grid */}
              <div className="space-y-4">
                {inventoryItems.map((item) => {
                  const percent = Math.round((item.currentLevelMl / item.capacityMl) * 100);
                  const isLow = item.status === 'reorder_required';

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-all shadow-2xs"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="font-semibold text-sm text-stone-900">{item.name}</span>
                            <span className="text-xs text-stone-500 font-normal">({item.brand})</span>
                          </div>
                          <div className="text-xs text-stone-500 mt-0.5">
                            Last Service Log: {item.lastUsedService}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-semibold tabular-nums text-stone-800">
                            {item.currentLevelMl}ml / {item.capacityMl}ml ({percent}%)
                          </span>

                          <button
                            onClick={() => handleDispenseItem(item.id, 50)}
                            className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg transition-colors cursor-pointer"
                          >
                            Log 50ml Dispense
                          </button>

                          {isLow && (
                            <button
                              onClick={() => handleRestockItem(item.id)}
                              className="px-3 py-1.5 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg transition-colors cursor-pointer"
                            >
                              Simulate Restock Delivery
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Visual gauge */}
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isLow ? 'bg-amber-600' : 'bg-stone-800'
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
                <span>
                  Automatic EDI integration connected to L'Oréal Professional, Kérastase Pro, and SkinCeuticals dispensary portals.
                </span>
                <span className="font-medium text-stone-800">Zero Manual Stocktakes Needed</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
