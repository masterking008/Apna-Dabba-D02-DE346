import React, { useState } from 'react';

interface ChatbotScreenProps {
  onClose?: () => void;
}

const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! I\'m your Apna Dabba assistant. How can I help you today?' }
  ]);
  const [inputText, setInputText] = useState('');

  const suggestedActions = [
    'Check availability',
    'Order meal',
    'Nutritional info',
    'Track order',
    'Wallet balance'
  ];

  const handleSendMessage = (text: string) => {
    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      if (text.toLowerCase().includes('availability')) {
        botResponse = 'Today\'s lunch is available at:\n• Hostel 1 Mess - Dal Rice, Roti\n• Hostel 2 Mess - Biryani, Raita\nETA: 25-30 minutes';
      } else if (text.toLowerCase().includes('nutrition')) {
        botResponse = 'Dal Rice nutritional info:\n• Calories: 320\n• Protein: 12g\n• Carbs: 58g\n• Fat: 6g';
      } else {
        botResponse = 'I understand you\'re asking about "' + text + '". Let me help you with that!';
      }
      
      const botMessage = { id: Date.now() + 1, type: 'bot', text: botResponse };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
    
    setInputText('');
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="bg-indigo-500 text-white p-4 flex items-center">
        <button onClick={onClose} className="mr-4 text-2xl">←</button>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <span className="text-indigo-500">🤖</span>
          </div>
          <div>
            <h1 className="font-semibold">Apna Dabba Assistant</h1>
            <p className="text-sm opacity-90">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.type === 'user' 
                ? 'bg-indigo-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="mb-3">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(action)}
                className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm whitespace-nowrap hover:bg-gray-200"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          />
          <button className="bg-gray-200 p-3 rounded-lg">
            🎤
          </button>
          <button
            onClick={() => inputText.trim() && handleSendMessage(inputText)}
            className="bg-indigo-500 text-white p-3 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotScreen;