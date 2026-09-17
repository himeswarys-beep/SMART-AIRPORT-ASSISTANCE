import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  HelpCircle, 
  MessageSquare,
  Globe,
  RotateCcw
} from 'lucide-react';
import { useAirport } from '../context/AirportContext';
import { translations, airportQA } from '../utils/translations';

export const AIChatbox = () => {
  const { language, setLanguage, user, activeAirport } = useAirport();
  const t = translations[language] || translations.en;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(true);
  const [isThinking, setIsThinking] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize initial greeting message based on language
  useEffect(() => {
    const greetingText = language === 'ta'
      ? `வணக்கம் ${user.name}! நான் உங்கள் ஸ்மார்ட் ஏர்போர்ட் AI உதவியாளர். உங்கள் விமானம் 6E 204 (கேட் ${user.gate}) அல்லது சாமான்கள், பாதுகாப்பு சோதனைகள் பற்றிய எந்த கேள்வியையும் கேட்கலாம்!`
      : `Hello ${user.name}! I am your Smart Airport AI Assistant. Ask me anything about your flight 6E 204 (Gate ${user.gate}), baggage, DigiYatra, or terminal services!`;

    setMessages([
      {
        id: 'msg-welcome',
        sender: 'ai',
        text: greetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [language, user.name, user.gate]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Text-To-Speech engine function
  const speakText = (text) => {
    if (!voiceOutputEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  // Setup Web Speech Recognition API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        if (transcript) {
          handleSendMessage(transcript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert(language === 'ta' ? 'உங்கள் உலாவியில் குரல் தேடல் ஆதரிக்கப்படவில்லை.' : 'Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = language === 'ta' ? 'ta-IN' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  // AI Response Logic based on Keyword & Context Matching
  const findAIAnswer = (query) => {
    const qLower = query.toLowerCase();

    // Check airportQA database first
    for (const item of airportQA) {
      const keywords = language === 'ta' ? item.keywordsTa : item.keywordsEn;
      const matched = keywords.some((kw) => qLower.includes(kw));
      if (matched) {
        return language === 'ta' ? item.answerTa : item.answerEn;
      }
    }

    // Dynamic Context-aware fallbacks
    if (qLower.includes('name') || qLower.includes('who') || qLower.includes('பெயர்')) {
      return language === 'ta'
        ? `உங்கள் பெயர் ${user.name}. உங்கள் PNR எண்: ${user.pnr}.`
        : `Your name is ${user.name}. PNR: ${user.pnr}.`;
    }
    if (qLower.includes('seat') || qLower.includes('இருக்கை')) {
      return language === 'ta'
        ? `உங்கள் இருக்கை எண் ${user.seat} (${user.seatType}).`
        : `Your assigned seat is ${user.seat} (${user.seatType}).`;
    }
    if (qLower.includes('passport') || qLower.includes('பாஸ்போர்ட்')) {
      return language === 'ta'
        ? `உங்கள் பாஸ்போர்ட் எண்: ${user.passportNumber || 'Z8941029'}. சரிபார்க்கப்பட்டது.`
        : `Your verified passport number is ${user.passportNumber || 'Z8941029'}.`;
    }

    // Default fallback
    return language === 'ta'
      ? `மன்னிக்கவும், ${activeAirport.name} பற்றிய உங்கள் கேள்வி எனக்குப் புரியவில்லை. போர்டிங் கேட் A12, சாமான்கள் பெல்ட் 04 அல்லது உணவகம் பற்றி கேட்கலாம்.`
      : `I understand you are asking about "${query}". At ${activeAirport.name}, your flight 6E 204 is boarding at Gate A12. How else can I assist your travel?`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    setTimeout(() => {
      const aiReplyText = findAIAnswer(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);

      // Trigger Text-to-speech for AI response
      speakText(aiReplyText);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="ai-chat-launcher"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2563eb, #38bdf8, #fb923c)',
          border: '2px solid #ffffff',
          boxShadow: '0 8px 32px rgba(56, 189, 248, 0.45)',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          cursor: 'pointer',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        title="Open AI Airport Voice & Chat Assistant"
      >
        <Bot size={30} />
        <span
          style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'var(--status-on-time)',
            border: '2px solid #050b18'
          }}
        />
      </button>

      {/* Main AI Chatbox Drawer Modal */}
      {isOpen && (
        <div
          className="animate-fade-in"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: 'calc(100vw - 32px)',
            maxWidth: '440px',
            height: '600px',
            maxHeight: 'calc(100vh - 48px)',
            borderRadius: '24px',
            background: 'rgba(7, 16, 38, 0.95)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 20px',
              background: 'linear-gradient(90deg, rgba(37,99,235,0.3), rgba(251,146,60,0.2))',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563eb, #38bdf8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Bot size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
                  {t.aiAssistantTitle}
                </h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--sky-blue)' }}>
                  {language === 'ta' ? 'தமிழ் • குரல் உதவி செயலில் உள்ளது' : 'EN • Live Voice Assistant Active'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Language Quick Switcher */}
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'var(--accent-peach-bright)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Switch Language"
              >
                {language === 'en' ? 'தமிழ்' : 'EN'}
              </button>

              {/* Mute/Unmute Voice Output */}
              <button
                type="button"
                onClick={() => {
                  setVoiceOutputEnabled(!voiceOutputEnabled);
                  if (voiceOutputEnabled) window.speechSynthesis?.cancel();
                }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: voiceOutputEnabled ? 'var(--status-on-time)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title={voiceOutputEnabled ? 'Voice Output ON' : 'Voice Output OFF'}
              >
                {voiceOutputEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              {/* Close Drawer Button */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  window.speechSynthesis?.cancel();
                }}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Quick FAQ Preset Chips Bar */}
          <div
            style={{
              padding: '10px 16px',
              background: 'rgba(5, 11, 24, 0.4)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              whiteSpace: 'nowrap'
            }}
          >
            {airportQA.map((qa) => (
              <button
                key={qa.id}
                type="button"
                onClick={() => handleSendMessage(language === 'ta' ? qa.questionTa : qa.questionEn)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  background: 'rgba(56, 189, 248, 0.12)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  color: 'var(--sky-blue-light)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                {language === 'ta' ? qa.questionTa : qa.questionEn}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div
            style={{
              flex: 1,
              padding: '16px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user'
                      ? 'linear-gradient(135deg, var(--royal-blue), var(--sky-blue))'
                      : 'rgba(16, 33, 71, 0.8)',
                    border: msg.sender === 'user' ? 'none' : '1px solid rgba(56, 189, 248, 0.2)',
                    color: '#ffffff',
                    fontSize: '0.88rem',
                    lineHeight: 1.45,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    position: 'relative'
                  }}
                >
                  <div>{msg.text}</div>
                  
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '6px',
                      gap: '8px'
                    }}
                  >
                    <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-mono)' }}>
                      {msg.timestamp}
                    </span>

                    {msg.sender === 'ai' && (
                      <button
                        type="button"
                        onClick={() => speakText(msg.text)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--sky-blue)',
                          cursor: 'pointer',
                          padding: '2px'
                        }}
                        title="Replay Voice Answer"
                      >
                        <Volume2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isThinking && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--sky-blue)', fontSize: '0.8rem' }}>
                <Sparkles size={14} className="animate-spin" />
                <span>AI is formulating response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Voice Listening Status Banner */}
          {isListening && (
            <div
              style={{
                padding: '8px 16px',
                background: 'rgba(251, 146, 60, 0.25)',
                borderTop: '1px solid var(--accent-peach-bright)',
                color: 'var(--accent-peach-bright)',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Mic size={16} className="animate-pulse-glow" />
              <span>{t.voiceListening}</span>
            </div>
          )}

          {/* Input & Voice Controls Footer */}
          <div
            style={{
              padding: '12px 16px',
              background: 'rgba(5, 11, 24, 0.8)',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {/* Microphone Voice Button */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: isListening
                  ? 'linear-gradient(135deg, #ef4444, #fb923c)'
                  : 'rgba(37, 99, 235, 0.25)',
                border: isListening ? '2px solid #ffffff' : '1px solid var(--sky-blue)',
                color: isListening ? '#ffffff' : 'var(--sky-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                boxShadow: isListening ? '0 0 15px rgba(239, 68, 68, 0.8)' : 'none'
              }}
              title="Voice Input (Speak)"
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {/* Input Text Box */}
            <input
              type="text"
              className="navbar-search-input"
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(16, 33, 71, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#ffffff',
                fontSize: '0.86rem'
              }}
              placeholder={t.askQuestionPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />

            {/* Send Button */}
            <button
              type="button"
              onClick={() => handleSendMessage()}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--royal-blue), var(--sky-blue))',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatbox;
