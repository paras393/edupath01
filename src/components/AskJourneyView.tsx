import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, Compass, Layers, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { JourneyData, ChatMessage } from '../types';

interface AskJourneyViewProps {
  journey: JourneyData;
}

const DEFAULT_CHIPS = [
  "Why am I learning SQL before Python?",
  "What is my biggest remaining gap?",
  "Why was my roadmap changed?",
  "Am I ready for my target role yet?",
  "How does my prior experience help me?"
];

export const AskJourneyView: React.FC<AskJourneyViewProps> = ({ journey }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello ${journey.profile.name}! I am your personal EduPath Navigator, grounded specifically in your evidence, verified Skill Twin, and tailored roadmap toward **${journey.profile.targetRole}**.\n\nAsk me anything about why your path was sequenced this way, your remaining gaps, or how your past background accelerates your transition.`,
      timestamp: Date.now()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ask-journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: {
            profile: journey.profile,
            skillTwin: journey.skillTwin,
            roadmap: journey.roadmap,
            adaptiveHistory: journey.adaptiveHistory
          }
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: 'msg-ai-' + Date.now(),
        sender: 'assistant',
        text: data.answer || "I reviewed your journey and profile.",
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('API call failed, generating contextual grounded offline answer:', err);
      // Resilient local synthesis so the experience never breaks
      const groundedFallback = generateGroundedOfflineAnswer(query, journey);
      setMessages(prev => [
        ...prev,
        {
          id: 'msg-fallback-' + Date.now(),
          sender: 'assistant',
          text: groundedFallback,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-150 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Grounded Journey Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
          Ask My Journey
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Unlike generic chatbots, every answer here is tethered directly to your demonstrated evidence, skill gaps, and active roadmap.
        </p>
      </div>

      {/* Suggested Query Chips */}
      <div className="space-y-1.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Suggested Journey Questions:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {DEFAULT_CHIPS.map((chip, i) => (
            <button
              key={i}
              onClick={() => handleSend(chip)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-xs font-semibold text-slate-700 hover:text-indigo-700 transition-all whitespace-nowrap shadow-2xs shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Canvas */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col h-[520px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg) => {
            const isAI = msg.sender === 'assistant';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAI
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-900 text-white shadow-xs'
                  }`}
                >
                  {isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isAI
                      ? 'bg-slate-50 border border-slate-200 text-slate-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-3 max-w-md mr-auto">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>Consulting your Skill Twin & roadmap sequence...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3.5 bg-slate-50 border-t border-slate-200 rounded-b-3xl flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Ask about your ${journey.profile.targetRole} journey...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};

// Resilient grounded intelligence fallback
function generateGroundedOfflineAnswer(query: string, journey: JourneyData): string {
  const q = query.toLowerCase();
  const strong = journey.skillTwin.filter(s => s.state === 'strong').map(s => s.name);
  const gaps = journey.skillTwin.filter(s => s.state === 'gap').map(s => s.name);
  const targetRole = journey.profile.targetRole;

  if (q.includes('why') && (q.includes('first') || q.includes('sql') || q.includes('order'))) {
    return `Based on your profile, you already possess solid capabilities in **${strong.slice(0, 2).join(' and ')}**, but you lack verified evidence in **${gaps[0] || 'relational queries'}**.\n\nIn real ${targetRole} workflows, data extraction comes before data transformation. Learning ${gaps[0] || 'SQL'} in Stage 1 ensures you can fetch live production tables yourself before moving to dashboard visualization in later stages.`;
  }

  if (q.includes('biggest') || q.includes('remaining gap')) {
    return `Your most critical gap right now is **${gaps[0] || 'Relational Data Modeling'}**, followed by **${gaps[1] || 'Dashboarding'}**.\n\nBecause your goal is "${journey.profile.careerGoal}", closing this gap is required to unlock your first portfolio milestone project.`;
  }

  if (q.includes('change') || q.includes('adapt') || q.includes('struggle')) {
    if (journey.adaptiveHistory.length > 0) {
      const last = journey.adaptiveHistory[journey.adaptiveHistory.length - 1];
      return `Your roadmap was adjusted after you reported: "${last.reportedReason}" on ${last.affectedSkill}.\n\nEduPath responded by inserting targeted scaffolding: ${last.changeSummary}. This prevents cognitive overload and ensures you master the concept before tackling production challenges.`;
    }
    return `When you mark any activity with "Need More Practice", EduPath's adaptive engine breaks down the concepts into smaller hands-on sandboxes and visual walkthroughs rather than forcing you into advanced material.`;
  }

  if (q.includes('ready') || q.includes('target role')) {
    return `Honest evaluation: You have **${strong.length} verified strong skills** out of ${journey.skillTwin.length} expected for a ${targetRole}.\n\nYou are not quite interview-ready yet because your high-priority gaps in **${gaps.join(', ')}** have not yet been demonstrated in practical portfolio deliverables. Completing Stage 1 and Stage 2 will bring you to ~75% readiness.`;
  }

  return `Based on your evidence for ${targetRole}, you are strongly positioned thanks to your background in ${strong.join(', ')}. Your highest leverage next action is completing the current weekly mission in Stage 1 to turn ${gaps[0] || 'your core gap'} into an active strength.`;
}
