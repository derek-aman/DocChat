import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import Header from '../components/Header';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingContent, setTypingContent] = useState('');
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingContent]);

  const handleSendChatMessage = async (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setMessage('');

    try {
      setIsTyping(true);
      const res = await fetch(`https://docchat-kr3k.onrender.com/chat?message=${encodeURIComponent(text)}`);
      const data = await res.json();

      // Typing effect simulation
      const fullText = data.content;
      setTypingContent('');

      let i = 0;
      const interval = setInterval(() => {
        if (i < fullText.length) {
          setTypingContent((prev) => prev + fullText[i]);
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              role: 'assistant',
              content: fullText,
              documents: data.docs,
            },
          ]);
          setTypingContent('');
        }
      }, 15); // typing speed
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-zinc-900 text-white scrollbar-none">
      <Header />

      <div className="flex-1 flex flex-col p-6">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 max-w-4xl mx-auto w-full p-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`p-4 max-w-[80%] rounded-2xl shadow-md ${
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-zinc-700 to-zinc-600 text-white rounded-br-none'
                    : 'bg-black border border-zinc-800 text-white rounded-bl-none'
                }`}
              >
                <div className="prose prose-invert whitespace-pre-line leading-relaxed">
                    <Markdown>{m.content}</Markdown>
                </div>


                {m.documents?.map((doc, i) => (
                  <div key={i} className="bg-zinc-800 mt-3 p-3 rounded-md border border-zinc-700">
                    <p className="text-sm font-medium">
                      Source: <span className="text-gray-400">{doc.metadata.source}</span> —{' '}
                      <span className="text-indigo-400">Page {doc.metadata?.loc?.pageNumber}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-black border border-zinc-800 p-4 max-w-[80%] rounded-2xl rounded-bl-none text-white">
                <div className="prose prose-invert whitespace-pre-line leading-relaxed">
                  <Markdown>{typingContent}</Markdown>
                </div>

                <span className="inline-block w-2 h-4 bg-white animate-pulse ml-1"></span>
              </div>
            </div>
          )}
        </div>
      </div>

      <form
        onSubmit={handleSendChatMessage}
        className="sticky bottom-4 w-full flex justify-center items-center"
      >
        <div className="bg-zinc-800 w-1/2 flex items-center gap-2 p-2 h-16 text-white rounded-3xl border border-zinc-700 shadow-lg">
          <input
            className="w-full h-full p-3 bg-transparent outline-none text-white placeholder-zinc-400"
            type="text"
            placeholder="Ask or search the document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl hover:from-indigo-500 hover:to-indigo-400 transition"
          >
            Send
          </button>
        </div>
      </form>
    </main>
  );
};

export default ChatPage;
