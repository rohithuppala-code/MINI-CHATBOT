import { useState, useRef, useEffect } from 'react'

function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      })

      const data = await response.json()
      
      if (response.ok) {
        const botMessage = { role: 'bot', content: data.reply }
        setMessages(prev => [...prev, botMessage])
      } else {
        const errorMessage = { role: 'bot', content: 'Error: ' + data.error }
        setMessages(prev => [...prev, errorMessage])
      }
    } catch (error) {
      const errorMessage = { role: 'bot', content: 'Failed to connect to server' }
      setMessages(prev => [...prev, errorMessage])
    }

    setLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-emerald-950 flex flex-col">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-white">AI Chatbot</h1>
          <p className="text-green-200 text-sm mt-1">Your intelligent conversation partner</p>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.length === 0 && (
            <div className="text-center mt-32">
              <div className="inline-block p-8 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl border border-white border-opacity-20">
                <svg className="w-16 h-16 mx-auto text-white opacity-80 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <p className="text-white text-lg font-medium">Start a conversation</p>
                <p className="text-emerald-200 text-sm mt-2">Send a message to begin chatting with the AI</p>
              </div>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
              <div className={`max-w-2xl px-5 py-3.5 rounded-2xl shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
                  : 'bg-white bg-opacity-95 text-gray-800 backdrop-blur-sm'
              }`}>
                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white bg-opacity-95 backdrop-blur-sm text-gray-800 px-5 py-3.5 rounded-2xl shadow-lg">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Container */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-500 shadow-2xl">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 px-5 py-3.5 bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 border border-white border-opacity-20"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-medium rounded-xl hover:from-orange-600 hover:to-amber-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App