import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  image?: string;
  timestamp: Date;
}

interface DarzFusionProps {
  onBackToPortfolio: () => void;
}

const SUGGESTED_PROMPTS = [
  "Explain machine learning.",
  "Tell me about Air Nexus project.",
  "What is the Smart Sense IoT system?",
  "What are Sivadharshan's core skills?"
];

const MOCK_TRANSCRIPTIONS = [
  "How does the Air Nexus project prevent database deadlocks?",
  "What sensors are used in the Smart Classroom Automation system?",
  "Tell me about Sivadharshan's experience with React and TypeScript.",
  "Can you outline the main features of the portfolio website?"
];

export default function DarzFusion({ onBackToPortfolio }: DarzFusionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I'm DarzFusion AI, your premium intelligent multimodal companion. I can process text, simulate voice recognition, and analyze attached images. How can I help you explore K Sivadharshan's portfolio and projects today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingTimerRef = useRef<any>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Voice recording timer simulation
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 2) {
            // Stop recording after 3 seconds and output a transcript
            stopRecording(true);
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
    }

    return () => {
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = (shouldTranscribe = false) => {
    setIsRecording(false);
    if (shouldTranscribe) {
      const randomIndex = Math.floor(Math.random() * MOCK_TRANSCRIPTIONS.length);
      const text = MOCK_TRANSCRIPTIONS[randomIndex] || '';
      setInputText(text);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getAIResponse = (input: string, hasImage: boolean): string => {
    const query = input.toLowerCase();

    if (hasImage) {
      return "I've successfully analyzed the image you uploaded! In a production system, this image would be passed to a multimodal model like Gemini 1.5 Pro to interpret visual components, UI designs, or diagrams. I can see this matches K Sivadharshan's premium design themes. How can I help you build or code based on this input?";
    }

    if (query.includes('machine learning') || query.includes('ml')) {
      return "Machine learning is a branch of AI that enables systems to learn patterns from data, iteratively improving performance without explicit programming. It's the engine behind modern prediction, recognition, and generative systems. For example, neural networks learn weights by minimizing error gradients through backpropagation.";
    }

    if (query.includes('air nexus') || query.includes('nexus') || query.includes('deadlock')) {
      return "Air Nexus is one of Sivadharshan's key projects. It is an Airline Booking Deadlock Detection & Resolution system built with Python, MySQL, and Graph Algorithms. It uses Resource Allocation Graphs (RAG) to dynamically map bookings (processes) and tickets (resources), and implements cycle detection algorithms and the Banker's Algorithm to guarantee a deadlock-free safe state.";
    }

    if (query.includes('smart classroom') || query.includes('classroom') || query.includes('smart sense') || query.includes('iot')) {
      return "Smart Sense is an IoT-based Classroom Automation System developed by Sivadharshan. It uses a NodeMCU microcontroller integrated with PIR (passive infrared) sensors for occupancy detection, LDR (light-dependent resistors) for ambient light sensing, and DHT11 sensors for temperature/humidity. Data is streamed in real-time to a Blynk cloud dashboard to optimize energy conservation by automatically powering down unused devices.";
    }

    if (query.includes('who are you') || query.includes('about') || query.includes('sivadharshan')) {
      return "I am DarzFusion AI, a custom multimodal AI companion built for K Sivadharshan's portfolio. Sivadharshan is a B.Tech Information Technology student specializing in frontend development, React.js, full-stack applications, and IoT integrations. You can explore his full profile, skills, and projects by clicking the 'Back to Portfolio' button in the top right!";
    }

    if (query.includes('skill') || query.includes('technolog')) {
      return "Sivadharshan has experience with a wide array of technologies:\n\n• **Languages:** Python, JavaScript, TypeScript, C++, HTML5/CSS3\n• **Frameworks & Libraries:** React.js, Vite, Node.js, Express.js, Tailwind CSS, Bootstrap\n• **IoT & Databases:** NodeMCU, Blynk, Arduino, MySQL, MongoDB\n• **Tools:** Git, Vercel, Postman";
    }

    if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
      return "You can get in touch with Sivadharshan directly using the Contact Form at the bottom of the portfolio page! Alternatively, you can reach out via his LinkedIn or GitHub links.";
    }

    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return "Hello! Welcome to DarzFusion AI. How can I help you today? You can ask me about Sivadharshan's skills, his projects (like Air Nexus or Smart Sense), or test my simulated voice and image recognition features!";
    }

    return "That's an interesting question! As a custom portfolio companion, I can tell you all about Sivadharshan's skills, experience, and academic projects like Air Nexus (deadlock detection) and Smart Sense (IoT classroom automation). Try asking me about one of those, or upload an image to see my vision capabilities!";
  };

  const handleSendMessage = (textToSend = inputText) => {
    if (!textToSend.trim() && !selectedImage) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      image: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    const hadImage = !!selectedImage;
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    // Trigger AI response simulation
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiResponseText = getAIResponse(textToSend, hadImage);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="grid-lines min-h-screen bg-[#050505] text-[#F5F5F5] font-inter flex flex-col selection:bg-[#FF1E2D]/30 selection:text-white">
      {/* Hidden file input for images */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <div className="flex items-center gap-2 cursor-pointer" onClick={onBackToPortfolio}>
          <span className="material-symbols-outlined text-[#FF1E2D]">bolt</span>
          <span className="font-headline font-bold text-lg tracking-tighter text-[#FF1E2D]">DARZFUSION</span>
        </div>
        <button
          onClick={onBackToPortfolio}
          className="bg-[#FF1E2D]/10 text-[#FF1E2D] border border-[#FF1E2D]/30 px-4 py-2 rounded-full font-subhead text-sm font-semibold hover:bg-[#FF1E2D] hover:text-white transition-all duration-300 neon-glow"
        >
          Back to Portfolio
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 pt-24 pb-12 px-4 max-w-4xl w-full mx-auto flex flex-col justify-between">
        
        {/* Dynamic Hero Section (Fades/collapses after chat starts) */}
        {messages.length <= 1 && (
          <section className="text-center space-y-6 relative py-8">
            <div className="absolute inset-0 -z-10 flex justify-center items-center">
              <div className="w-64 h-64 bg-[#FF1E2D]/10 rounded-full blur-[100px] animate-orb"></div>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-headline">DARZFUSION AI</h1>
              <p className="text-lg md:text-xl text-neutral-400 font-subhead max-w-xl mx-auto">
                Your intelligent multimodal AI companion that understands text, images and voice.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="#chat-box"
                className="bg-[#FF1E2D] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('chat-input')?.focus();
                }}
              >
                Start Chat
              </a>
              <button
                onClick={onBackToPortfolio}
                className="glass px-8 py-3 rounded-xl font-bold border border-white/10 hover:bg-white/5 transition-colors"
              >
                Explore Developer Portfolio
              </button>
            </div>
            <p className="text-xs text-neutral-500 font-mono pt-4">Built by K Sivadharshan</p>
          </section>
        )}

        {/* Chat Workspace Section */}
        <section
          id="chat-box"
          className="glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col flex-1 min-h-[480px] my-6"
        >
          {/* Chat Header */}
          <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Neural Session_v2.6</span>
          </div>

          {/* Message Area */}
          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto max-h-[500px]">
            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
                  >
                    {isUser ? (
                      <div className="max-w-[80%] flex flex-col items-end gap-1.5">
                        <div className="bg-neutral-800/50 p-4 rounded-2xl rounded-tr-none border border-white/5 space-y-3">
                          {msg.image && (
                            <img
                              src={msg.image}
                              alt="Uploaded attachment"
                              className="max-h-60 rounded-lg object-contain border border-white/10"
                            />
                          )}
                          {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>}
                        </div>
                        <span className="text-[9px] text-neutral-500 px-1 font-mono">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ) : (
                      <div className="max-w-[90%] flex gap-4">
                        <div className="w-8 h-8 rounded-lg bg-[#FF1E2D]/20 flex items-center justify-center shrink-0 border border-[#FF1E2D]/30 shadow-md">
                          <span className="material-symbols-outlined text-[18px] text-[#FF1E2D]">bolt</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-[#FF1E2D] tracking-widest uppercase font-subhead">
                              DARZFUSION
                            </span>
                            <span className="text-[9px] text-neutral-600 font-mono">
                              {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <div className="border-l-2 border-[#FF1E2D] pl-4">
                            <p className="text-sm leading-relaxed text-neutral-300 whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="self-start max-w-[90%] flex gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#FF1E2D]/20 flex items-center justify-center shrink-0 border border-[#FF1E2D]/30 animate-pulse">
                    <span className="material-symbols-outlined text-[18px] text-[#FF1E2D]">bolt</span>
                  </div>
                  <div className="space-y-1 mt-1">
                    <span className="text-[10px] font-bold text-[#FF1E2D] tracking-widest uppercase">
                      DARZFUSION
                    </span>
                    <div className="flex items-center gap-1.5 pl-4 py-2">
                      <span className="w-1.5 h-1.5 bg-[#FF1E2D] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#FF1E2D] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-[#FF1E2D] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={chatEndRef} />
          </div>

          {/* Suggestion Chips */}
          {messages.length === 1 && !isTyping && (
            <div className="px-6 pb-4 flex flex-wrap gap-2 animate-fade-in">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-xs bg-neutral-900/60 hover:bg-neutral-800 text-neutral-300 px-3 py-1.5 rounded-full border border-white/5 hover:border-[#FF1E2D]/30 transition-all duration-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Active Voice Input Overlay */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mx-6 mb-4 p-3 bg-[#FF1E2D]/10 border border-[#FF1E2D]/30 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <span className="w-3.5 h-3.5 bg-red-600 rounded-full animate-ping absolute" />
                    <span className="w-3.5 h-3.5 bg-red-600 rounded-full relative" />
                  </div>
                  <span className="text-xs font-mono text-[#FF1E2D]">
                    Listening... Speak query. (0:0{recordingSeconds})
                  </span>
                </div>
                <button
                  onClick={() => stopRecording(false)}
                  className="text-xs text-neutral-400 hover:text-white px-2 py-0.5 border border-white/10 rounded"
                >
                  Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Upload Preview Bar */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mx-6 mb-4 p-2 bg-neutral-900/80 rounded-xl border border-white/5 flex items-center gap-3 w-fit relative group"
              >
                <img
                  src={selectedImage}
                  alt="Attachment preview"
                  className="h-16 w-16 object-cover rounded-lg border border-white/10"
                />
                <div className="pr-4 text-left">
                  <p className="text-[11px] font-semibold text-neutral-200">Image Attached</p>
                  <p className="text-[9px] text-neutral-500 font-mono">Ready to analyze</p>
                </div>
                <button
                  onClick={removeSelectedImage}
                  className="absolute -top-1.5 -right-1.5 bg-[#FF1E2D] hover:bg-red-700 text-white rounded-full p-0.5 shadow-md flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-[12px] font-bold">close</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <div className="p-6 pt-0">
            <div className="glass rounded-2xl p-2 flex items-center gap-2 border border-white/10 focus-within:border-[#FF1E2D]/40 transition-colors">
              <button
                onClick={isRecording ? () => stopRecording(true) : startRecording}
                className={`p-2 rounded-lg transition-colors flex items-center justify-center ${
                  isRecording ? 'text-[#FF1E2D] bg-[#FF1E2D]/10' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                }`}
                title="Simulate Voice Input"
              >
                <span className="material-symbols-outlined">mic</span>
              </button>
              <button
                onClick={handleImageClick}
                className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center"
                title="Attach Image"
              >
                <span className="material-symbols-outlined">add_photo_alternate</span>
              </button>
              <input
                id="chat-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isRecording ? "Listening to your voice..." : "Ask anything..."}
                disabled={isRecording}
                className="bg-transparent border-none focus:ring-0 text-sm flex-1 placeholder-neutral-600 focus:outline-none text-[#F5F5F5] min-w-0"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() && !selectedImage}
                className={`p-2 rounded-xl text-white transition-all flex items-center justify-center ${
                  (inputText.trim() || selectedImage)
                    ? 'bg-[#FF1E2D] hover:scale-105 shadow-md shadow-[#FF1E2D]/20 cursor-pointer'
                    : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-white/5">
          <p className="text-[10px] text-neutral-600 font-mono tracking-[0.2em]">DARZFUSION AI © 2026</p>
        </footer>
      </main>
    </div>
  );
}
