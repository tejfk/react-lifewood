import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiLoader } from 'react-icons/fi';
import Markdown from 'react-markdown';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hey! I'm Lia, your guide to everything Lifewood. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/gemini-chat', { // UPDATED FOR VERCEL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text }),
      });

      if (!response.ok) throw new Error('Failed to get response from AI.');
      
      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      const aiMessage = { role: 'ai', text: aiText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);
      const errorMessage = { role: 'ai', text: "Oof, my circuits are a bit fried right now. Try again in a moment." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-lifewood-green text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
          aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'x' : 'message'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border"
          >
            <header className="p-4 border-b font-semibold text-center bg-gray-50">
              Chat with Lia
            </header>
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-lg max-w-xs ${msg.role === 'user' ? 'bg-lifewood-green text-white' : 'bg-gray-200 text-gray-800'}`}>
                      <Markdown className="prose prose-sm">{msg.text}</Markdown>
                    </div>
                  </div>
                ))}
                {loading && (
                   <div className="flex justify-start">
                    <div className="p-3 rounded-lg bg-gray-200 text-gray-800">
                      <FiLoader className="animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t bg-white flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-lifewood-saffron"
                disabled={loading}
              />
              <button type="submit" className="ml-3 p-3 bg-lifewood-green text-white rounded-full disabled:bg-gray-400" disabled={loading}>
                <FiSend />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;