'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Bot,
  X,
  Send,
  Sparkles,
  User,
  Zap,
  TrendingDown,
  Lightbulb,
  BarChart2,
  ChevronDown,
} from 'lucide-react';
import type { SubscribedEnergy } from '@/lib/monitor-data';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  id: string;
}

interface Props {
  subscribedEnergies: SubscribedEnergy[];
  totalConsumption: number;
  avgDailyUsage: number;
  peakService: SubscribedEnergy | null;
}

// ─── Quick Prompts ─────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  { label: 'Reduce my bill', icon: TrendingDown, text: 'How can I reduce my electricity bill based on my current usage?' },
  { label: 'Highest consumer', icon: Zap, text: 'Which of my services is consuming the most energy and what can I do about it?' },
  { label: 'Optimize usage', icon: Lightbulb, text: 'Give me personalized tips to optimize my energy usage patterns.' },
  { label: 'Monthly forecast', icon: BarChart2, text: 'Based on my daily average, what will my monthly consumption and cost look like?' },
];

// ─── Helper: build context string ──────────────────────────────────────────

function buildEnergyContext(
  energies: SubscribedEnergy[],
  total: number,
  avgDaily: number,
  peak: SubscribedEnergy | null
): string {
  if (energies.length === 0) {
    return 'The user has no subscribed energy services yet.';
  }

  const lines: string[] = [
    `Total current consumption across all services: ${total.toFixed(1)} kWh`,
    `Average daily usage per service: ${avgDaily.toFixed(1)} kWh`,
    `Peak consumer: ${peak ? `${peak.serviceTitle} (${peak.currentUsage} kWh)` : 'N/A'}`,
    ``,
    `Subscribed Services:`,
  ];

  for (const e of energies) {
    lines.push(
      `  - ${e.serviceTitle}: current=${e.currentUsage} kWh, daily avg=${e.dailyAverage} kWh/day, monthly estimate=${e.monthlyEstimate} kWh, status=${e.status}, subscribed since ${e.subscribedDate}`
    );
  }

  // Rough cost estimate (assume ₹8/kWh average Indian rate)
  const RATE_PER_KWH = 8;
  const estimatedMonthlyCost = energies.reduce(
    (sum, e) => sum + e.monthlyEstimate * RATE_PER_KWH,
    0
  );
  lines.push(``, `Estimated total monthly cost (@ ₹${RATE_PER_KWH}/kWh): ₹${estimatedMonthlyCost.toLocaleString('en-IN')}`);

  return lines.join('\n');
}

// ─── Message Bubble ─────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: ChatMessage }) {
  const isUser = msg.role === 'user';

  // Render markdown-ish: bold **text** and bullet lists
  const renderContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      // Bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((part, j) =>
        j % 2 === 1 ? <strong key={j}>{part}</strong> : <span key={j}>{part}</span>
      );

      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={i} className="ml-4 list-disc">
            {rendered}
          </li>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{rendered}</p>;
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div
        className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm
          ${isUser
            ? 'bg-gradient-to-br from-primary to-primary/70'
            : 'bg-gradient-to-br from-violet-600 to-indigo-600'
          }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm
          ${isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-muted/80 text-foreground rounded-tl-sm border border-border/50'
          }`}
      >
        <div className={`space-y-1 ${!isUser ? 'text-foreground/90' : ''}`}>
          {renderContent(msg.content)}
        </div>
      </div>
    </div>
  );
}

// ─── Typing Indicator ────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-sm">
        <Bot className="h-4 w-4" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-muted/80 border border-border/50 px-4 py-3 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
        <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
        <span className="h-2 w-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}

// ─── Welcome Screen ──────────────────────────────────────────────────────────

function WelcomeScreen({
  onQuickPrompt,
}: {
  onQuickPrompt: (text: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 px-4 py-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
        <Sparkles className="h-8 w-8 text-white" />
      </div>
      <div className="text-center space-y-1">
        <h3 className="font-semibold text-lg">Instinct AI Energy Advisor</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Ask me anything about your energy consumption. I'll analyze your data and suggest ways to save costs.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {QUICK_PROMPTS.map((qp) => {
          const Icon = qp.icon;
          return (
            <button
              key={qp.label}
              onClick={() => onQuickPrompt(qp.text)}
              className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2.5 text-left text-xs font-medium text-foreground/80 transition-all hover:bg-muted hover:border-primary/40 hover:text-foreground hover:shadow-sm active:scale-95"
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
              {qp.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function EnergyChatbot({
  subscribedEnergies,
  totalConsumption,
  avgDailyUsage,
  peakService,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const energyContext = buildEnergyContext(
    subscribedEnergies,
    totalConsumption,
    avgDailyUsage,
    peakService
  );

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      setInput('');

      const userMsg: ChatMessage = {
        role: 'user',
        content: trimmed,
        id: Date.now().toString(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        // Build the conversation for the API (all previous + new user message)
        const conversationForAPI = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: conversationForAPI,
            energyContext,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to get response');
        }

        const aiMsg: ChatMessage = {
          role: 'model',
          content: data.reply,
          id: (Date.now() + 1).toString(),
        };

        setMessages((prev) => [...prev, aiMsg]);
      } catch (err: any) {
        setError(err.message || 'Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, energyContext]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Floating Action Button ─────────────────────────────────────────── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 bg-gradient-to-br from-violet-600 to-indigo-600"
          aria-label="Open AI Energy Advisor"
        >
          <Sparkles className="h-6 w-6 text-white" />
          {/* Pulse ring */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-30 animate-ping" />
        </button>
      )}

      {/* ── Chat Panel ────────────────────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl border border-border/60 bg-background shadow-2xl transition-all duration-300 ease-in-out
          ${isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
          }
        `}
        style={{ width: 'min(420px, calc(100vw - 3rem))', height: 'min(580px, calc(100vh - 8rem))' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">Instinct AI</p>
              <p className="text-[10px] text-white/70 mt-0.5">Energy Advisor</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/70 mr-2">Online</span>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Minimize chat"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 px-4 py-3">
          {messages.length === 0 ? (
            <WelcomeScreen onQuickPrompt={(text) => sendMessage(text)} />
          ) : (
            <div className="space-y-4 pb-2">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}
              {isLoading && <TypingIndicator />}
              {error && (
                <div className="rounded-xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-xs text-destructive">
                  ⚠️ {error}
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        {/* Quick prompts when there are messages */}
        {messages.length > 0 && messages.length <= 2 && !isLoading && (
          <div className="flex gap-2 overflow-x-auto px-4 py-2 border-t border-border/40 scrollbar-none">
            {QUICK_PROMPTS.slice(0, 3).map((qp) => {
              const Icon = qp.icon;
              return (
                <button
                  key={qp.label}
                  onClick={() => sendMessage(qp.text)}
                  className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/50 px-3 py-1.5 text-[11px] font-medium text-foreground/70 transition-all hover:bg-muted hover:text-foreground"
                >
                  <Icon className="h-3 w-3 text-primary" />
                  {qp.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-border/50 px-3 py-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your energy usage…"
            disabled={isLoading}
            className="flex-1 rounded-xl bg-muted/50 border border-border/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60 focus:border-primary/50 focus:bg-background transition-colors disabled:opacity-50"
          />
          <Button
            size="icon"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="h-9 w-9 flex-shrink-0 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 border-0 shadow-sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}
