

// After
import React, { useState, useEffect } from 'react';
import Markdown from "react-markdown";





import Header from '../components/Header';

    const ChatPage = () => {

        const [message, setMessage] = React.useState('');
        const [messages, setMessages] = React.useState([]);
        
        const handleSendChatMessage = async (e) => {
            e.preventDefault();
            const text = message.trim();
            if (!text) return;
        
            setMessages((prev) => [...prev, { role: 'user', content: text }]);
            setMessage('');
        
            try {
            const res = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(text)}`);
            const data = await res.json();
        
            setMessages((prev) => [
                ...prev,
                {
                role: 'assistant',
                content: data.content,
                documents: data.docs,
                },
            ]);
            } catch (err) {
            console.error(err);
            setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
            }
        };


        


    return (
        <main className='  scrollbar-none text-center'>
            
        
            <Header/>
        
        
        <div className='flex-1  p-10 space-y-4'>
            <div className='container overflow-y-auto h-110  '>
                <div className="flex-1 overflow-hidden p-4 w-full  space-y-4">
            {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                className={`  p-4 rounded-lg ${
                    m.role === 'user' ? 'bg-zinc-600 text-white rounded-br-none' : 'bg-black text-white rounded-bl-none'
                }`}
                >
                {m.content?.split('* ').map((line, i) => (
                   <p className="whitespace-pre-line leading-relaxed" key={i}>{line}</p>
                ))}

                {m.documents?.map((doc, i) => (
        <div
        key={i}
        className="bg-black   text-md p-3 rounded-md"
        >
        <p className="font-semibold">
            Source: <span className="text-gray-500">{doc.metadata.source }</span> — <span className="text-indigo-400">Page {doc.metadata?.loc?.pageNumber}</span>
        </p>
        
        </div>
    ))}
                </div>
            </div>
            ))}
        </div>
                

            </div>
           

        </div>
         <div className='bg-zinc-800 w-1/2 flex p-2 h-16 text-white m-auto  rounded-4xl border border-zinc-700'>
                <input className='w-full h-full p-3 outline-none' type="text" placeholder='Search the Doc..' value={message}
                onChange={(e) => setMessage(e.target.value)} />
                <button className='pr-5' onClick={handleSendChatMessage}>Send</button>
            </div>
        
        </main>
    )
    }

    export default ChatPage
