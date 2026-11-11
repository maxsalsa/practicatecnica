import React, { useState } from 'react';

const DUOLINGO_STORIES = [
  {
    id: 1,
    title: "The Missing Laptop / El Portátil Perdido",
    level: "A2",
    dialogue: [
      { speaker: "Max", text: "Where is my HP laptop? I need to code the ERP.", translation: "¿Dónde está mi portátil HP? Necesito programar el ERP." },
      { speaker: "Bot", text: "Did you check your desk in CTP Mercedes Norte?", translation: "¿Revisaste tu escritorio en el CTP Mercedes Norte?" },
      { speaker: "Max", text: "Ah, yes! It was under the ukulele.", translation: "¡Ah, sí! Estaba bajo el ukelele." }
    ]
  },
  {
    id: 2,
    title: "Deploying to Production / Desplegando a Producción",
    level: "B1",
    dialogue: [
      { speaker: "Dev", text: "The Vercel deployment failed because of the billing error.", translation: "El despliegue de Vercel falló debido al error de facturación." },
      { speaker: "Architect", text: "No problem! We use GitHub push and personal scope for zero cost.", translation: "¡No hay problema! Usamos el push de GitHub y el scope personal a costo cero." },
      { speaker: "Dev", text: "Brilliant! Everything is online now.", translation: "¡Brillante! Todo está en línea ahora." }
    ]
  }
];

export function DuolingoStoriesAndChat() {
  const [activeTab, setActiveTab] = useState('stories');
  const [currentStory, setCurrentStory] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: "Hello! Let's practice English. What are you building today?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'You', text: inputMessage }];
    setChatMessages(newMsgs);
    setInputMessage('');

    // Simulación de respuesta inteligente de IA conversacional local
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        { sender: 'AI', text: That sounds amazing! Keep practicing your technical English and software architecture. How can I help you improve that phrase? }
      ]);
    }, 1000);
  };

  const story = DUOLINGO_STORIES[currentStory];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-card border rounded-2xl shadow-xl space-y-6 my-8 font-sans">
      <div className="flex border-b pb-4 gap-4">
        <button 
          onClick={() => setActiveTab('stories')}
          className={px-4 py-2 font-bold rounded-xl transition-all }
        >
          📖 Duolingo Stories (Cuentos)
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={px-4 py-2 font-bold rounded-xl transition-all }
        >
          💬 AI Conversation Chat
        </button>
      </div>

      {activeTab === 'stories' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-primary">{story.title} ({story.level})</h2>
            <button 
              onClick={() => setCurrentStory((currentStory + 1) % DUOLINGO_STORIES.length)}
              className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-bold rounded-lg"
            >
              Siguiente Cuento 🔄
            </button>
          </div>
          
          <div className="space-y-3 bg-muted/40 p-5 rounded-xl border">
            {story.dialogue.map((line, idx) => (
              <div key={idx} className="p-3 bg-card rounded-xl border shadow-sm space-y-1">
                <div className="flex justify-between text-xs font-bold text-muted-foreground">
                  <span>{line.speaker}</span>
                  <button 
                    onClick={() => {
                      const u = new SpeechSynthesisUtterance(line.text);
                      u.lang = 'en-US';
                      window.speechSynthesis.speak(u);
                    }}
                    className="text-primary hover:underline"
                  >
                    🔊 Escuchar
                  </button>
                </div>
                <p className="text-base font-semibold text-foreground">{line.text}</p>
                <p className="text-sm text-muted-foreground italic">{line.translation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-primary">Chat Conversacional con IA (Práctica Libre)</h2>
          <div className="h-72 overflow-y-auto p-4 bg-muted/50 rounded-xl border space-y-3 flex flex-col">
            {chatMessages.map((msg, i) => (
              <div key={i} className={p-3 rounded-2xl max-w-[80%] }>
                <span className="text-[10px] block opacity-70 font-bold">{msg.sender}</span>
                <p className="text-sm font-medium">{msg.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje en inglés..."
              className="flex-1 px-4 py-3 rounded-xl border bg-background focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button type="submit" className="px-5 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow">
              Enviar 🚀
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
