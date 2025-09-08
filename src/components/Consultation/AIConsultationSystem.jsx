import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaUser, FaPaperPlane, FaMicrophone, FaStop, FaDownload, FaCopy, FaShare } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import api from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const AIConsultationSystem = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [consultationHistory, setConsultationHistory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const messagesEndRef = useRef(null);

  const categories = [
    { id: 'general', name: 'Consulta General', icon: '⚖️' },
    { id: 'penal', name: 'Derecho Penal', icon: '🚨' },
    { id: 'civil', name: 'Derecho Civil', icon: '📋' },
    { id: 'laboral', name: 'Derecho Laboral', icon: '💼' },
    { id: 'transito', name: 'Derecho de Tránsito', icon: '🚗' },
    { id: 'comercial', name: 'Derecho Comercial', icon: '🏢' },
    { id: 'familia', name: 'Derecho de Familia', icon: '👨‍👩‍👧‍👦' },
    { id: 'administrativo', name: 'Derecho Administrativo', icon: '🏛️' }
  ];

  const consultationTemplates = [
    {
      title: 'Consulta sobre Infracción de Tránsito',
      description: '¿Qué hacer si recibí una multa de tránsito?',
      category: 'transito',
      template: 'Hola, recibí una multa de tránsito por exceso de velocidad. ¿Cuáles son mis opciones para apelar o reducir la sanción?'
    },
    {
      title: 'Problema Laboral',
      description: 'Despido injustificado y liquidación',
      category: 'laboral',
      template: 'Me despidieron sin justificación después de 3 años de trabajo. ¿Qué derechos tengo y cómo puedo reclamar mi liquidación?'
    },
    {
      title: 'Divorcio y Custodia',
      description: 'Proceso de divorcio con hijos menores',
      category: 'familia',
      template: 'Quiero iniciar un proceso de divorcio y tenemos hijos menores. ¿Cómo funciona el proceso y qué debo considerar sobre la custodia?'
    },
    {
      title: 'Contrato de Compraventa',
      description: 'Problemas con contrato de compraventa',
      category: 'civil',
      template: 'Firmé un contrato de compraventa de un vehículo, pero el vendedor no me entregó la documentación. ¿Qué puedo hacer?'
    }
  ];

  // Función para enviar mensaje a la API de Gemini
  const sendMessageToAI = async (message, category) => {
    const API_KEY = 'AIzaSyCAkIkgslyxArR_kg1kVRREzrjeGWavyyU';
    const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const prompt = `Eres un abogado experto en derecho ecuatoriano, especializado en ${category}. 
    Responde de manera profesional, clara y útil a la siguiente consulta legal. 
    Incluye referencias a leyes ecuatorianas cuando sea relevante.
    
    Consulta: ${message}
    
    Por favor proporciona:
    1. Análisis legal de la situación
    2. Opciones disponibles
    3. Pasos a seguir
    4. Referencias legales relevantes
    5. Recomendaciones prácticas`;

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Respuesta inesperada de la API');
      }
    } catch (error) {
      console.error('Error al comunicarse con la IA:', error);
      return 'Lo siento, no pude procesar tu consulta en este momento. Por favor, intenta de nuevo o contacta directamente con un abogado.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Verificar y consumir cuota de IA
    try {
      const { data } = await api.post('/ai/consume', {});
      if (!data?.allowed) {
        toast.error('Has alcanzado tu límite gratuito de consultas con IA. Suscríbete para continuar.');
        navigate('/planes');
        return;
      }
    } catch (e) {
      // Si falla el endpoint, no bloqueamos pero avisamos
      console.warn('No se pudo verificar la cuota de IA. Permitido por ahora.');
    }

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      category: selectedCategory
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAI(inputMessage, selectedCategory);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toISOString(),
        category: selectedCategory
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Guardar en historial
      setConsultationHistory(prev => [...prev, {
        id: Date.now(),
        question: inputMessage,
        answer: aiResponse,
        category: selectedCategory,
        date: new Date().toISOString()
      }]);

    } catch (error) {
      toast.error('Error al procesar la consulta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Aquí iría la lógica de grabación de voz
    toast.success('Grabación iniciada');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Aquí iría la lógica para detener grabación y convertir a texto
    toast.success('Grabación detenida');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Texto copiado al portapapeles');
  };

  const downloadConsultation = () => {
    const consultationText = messages.map(msg => 
      `${msg.sender === 'user' ? 'Usuario' : 'IA'}: ${msg.text}`
    ).join('\n\n');

    const blob = new Blob([consultationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consulta-legal-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Consulta descargada');
  };

  const shareConsultation = () => {
    if (navigator.share) {
      const consultationText = messages.map(msg => 
        `${msg.sender === 'user' ? 'Usuario' : 'IA'}: ${msg.text}`
      ).join('\n\n');

      navigator.share({
        title: 'Consulta Legal con IA',
        text: consultationText,
        url: window.location.href
      });
    } else {
      copyToClipboard(messages.map(msg => 
        `${msg.sender === 'user' ? 'Usuario' : 'IA'}: ${msg.text}`
      ).join('\n\n'));
    }
  };

  const useTemplate = (template) => {
    setInputMessage(template);
    setSelectedCategory(template.category);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Consulta Legal con IA
        </h1>
        <p className="text-xl text-gray-600">
          Obtén asesoría legal instantánea con inteligencia artificial especializada en derecho ecuatoriano
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Panel lateral */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categorías */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Categorías</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Plantillas */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Consultas Comunes</h3>
            <div className="space-y-3">
              {consultationTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">{template.title}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Historial */}
          {consultationHistory.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Historial</h3>
              <div className="space-y-2">
                {consultationHistory.slice(-5).reverse().map(consultation => (
                  <div key={consultation.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {consultation.question.substring(0, 50)}...
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(consultation.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Chat principal */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaRobot className="text-blue-600" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">Asistente Legal IA</h2>
                    <p className="text-sm text-gray-500">
                      Especializado en {categories.find(c => c.id === selectedCategory)?.name}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadConsultation}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Descargar consulta"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={shareConsultation}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Compartir consulta"
                  >
                    <FaShare />
                  </button>
                </div>
              </div>
            </div>

            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <FaRobot className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    ¿En qué puedo ayudarte?
                  </h3>
                  <p className="text-gray-500">
                    Escribe tu consulta legal y obtén una respuesta instantánea
                  </p>
                </div>
              ) : (
                messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'ai' && (
                          <FaRobot className="text-blue-600 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap">{message.text}</p>
                          <p className="text-xs opacity-70 mt-2">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        {message.sender === 'ai' && (
                          <button
                            onClick={() => copyToClipboard(message.text)}
                            className="text-gray-500 hover:text-gray-700 flex-shrink-0"
                          >
                            <FaCopy />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <FaRobot className="text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex space-x-3">
                <div className="flex-1">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Escribe tu consulta legal aquí..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="3"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-3 rounded-lg ${
                      isRecording 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    title={isRecording ? 'Detener grabación' : 'Grabar voz'}
                  >
                    {isRecording ? <FaStop /> : <FaMicrophone />}
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className={`p-3 rounded-lg ${
                      !inputMessage.trim() || isLoading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                    title="Enviar mensaje"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Presiona Enter para enviar, Shift+Enter para nueva línea
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIConsultationSystem;
