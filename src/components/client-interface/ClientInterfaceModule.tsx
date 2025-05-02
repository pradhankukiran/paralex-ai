import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import { 
  Users, 
  Send, 
  MessageSquare, 
  Calendar, 
  Mail, 
  Clock, 
  Phone, 
  PlusCircle, 
  Calendar as CalendarIcon,
  ArrowRightCircle 
} from 'lucide-react';
import { clientQueries, clientIntakes } from '../../utils/dummyData';
import { ClientQuery, ClientIntake } from '../../types';

const ClientChatbot: React.FC = () => {
  const [message, setMessage] = useState('');
  
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: 'bot', message: 'Hello! I\'m your legal assistant. How can I help you today?' },
  ]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([
      ...chatHistory,
      { id: chatHistory.length + 1, sender: 'user', message },
    ]);
    
    // Clear input
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = '';
      
      if (message.toLowerCase().includes('trademark')) {
        botResponse = 'While trademark registration is not legally required, it provides important legal protections for your business name or logo. Registration gives you exclusive rights to use the mark for your goods/services nationwide and allows you to sue for infringement. Would you like me to explain the registration process?';
      } else if (message.toLowerCase().includes('llc') || message.toLowerCase().includes('company')) {
        botResponse = 'To form an LLC in most states, you\'ll need to file Articles of Organization with the Secretary of State, create an operating agreement, obtain necessary licenses, and set up tax accounts. The specific requirements vary by state. Would you like information about a specific state?';
      } else if (message.toLowerCase().includes('contract') || message.toLowerCase().includes('agreement')) {
        botResponse = 'I can help with basic contract questions. However, for specific contract drafting or review, you should consult with an attorney. Would you like me to connect you with an attorney who specializes in contract law?';
      } else {
        botResponse = 'Thank you for your question. I can provide general legal information, but for specific advice tailored to your situation, you should consult with an attorney. Would you like me to help schedule a consultation?';
      }
      
      setChatHistory([
        ...chatHistory,
        { id: chatHistory.length + 1, sender: 'user', message },
        { id: chatHistory.length + 2, sender: 'bot', message: botResponse },
      ]);
    }, 1000);
  };
  
  return (
    <Card title="Legal Assistant Chatbot" className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-4">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  chat.sender === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-slate-100 text-slate-900'
                }`}
              >
                <p className="text-sm">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="mt-auto">
        <div className="flex space-x-2">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask a legal question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="submit"
            variant="primary"
            icon={<Send size={16} />}
            disabled={!message.trim()}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          This AI assistant provides general information only, not legal advice.
        </p>
      </form>
    </Card>
  );
};

const ClientQueryItem: React.FC<{
  query: ClientQuery;
  onClick: (query: ClientQuery) => void;
}> = ({ query, onClick }) => {
  return (
    <div
      className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-50 cursor-pointer transition-colors"
      onClick={() => onClick(query)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <MessageSquare size={16} />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-slate-900 line-clamp-1">{query.question}</h3>
            <p className="text-xs text-slate-500 mt-1">{query.date}</p>
          </div>
        </div>
        <Badge
          variant={
            query.status === 'answered' ? 'success' :
            query.status === 'escalated' ? 'warning' :
            'default'
          }
          size="sm"
        >
          {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
        </Badge>
      </div>
      {query.response && (
        <div className="mt-3">
          <p className="text-sm text-slate-600 line-clamp-2">{query.response}</p>
        </div>
      )}
    </div>
  );
};

const ClientIntakeItem: React.FC<{
  intake: ClientIntake;
  onClick: (intake: ClientIntake) => void;
}> = ({ intake, onClick }) => {
  return (
    <div
      className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-50 cursor-pointer transition-colors"
      onClick={() => onClick(intake)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <Avatar name={intake.name} size="sm" />
          <div className="ml-3">
            <h3 className="font-medium text-slate-900">{intake.name}</h3>
            <p className="text-sm text-slate-700 mt-1">{intake.matter}</p>
            <p className="text-xs text-slate-500 mt-1">{intake.date}</p>
          </div>
        </div>
        <Badge
          variant={
            intake.status === 'new' ? 'primary' :
            intake.status === 'reviewed' ? 'info' :
            intake.status === 'scheduled' ? 'warning' :
            'success'
          }
          size="sm"
        >
          {intake.status.charAt(0).toUpperCase() + intake.status.slice(1)}
        </Badge>
      </div>
    </div>
  );
};

const ClientQueryDetail: React.FC<{
  query: ClientQuery;
  onClose: () => void;
}> = ({ query, onClose }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
            <MessageSquare size={20} />
          </div>
          <h3 className="text-lg font-semibold">Client Query</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Close
        </Button>
      </div>
      
      <div>
        <p className="text-sm font-medium text-slate-500">DATE</p>
        <p className="font-medium text-slate-900">{query.date}</p>
      </div>
      
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-500">QUESTION</p>
        <p className="text-slate-900 mt-1">{query.question}</p>
      </div>
      
      {query.response ? (
        <div className="mt-6">
          <p className="text-sm font-medium text-slate-500">RESPONSE</p>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-1">
            <p className="text-slate-900">{query.response}</p>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <p className="text-sm font-medium text-slate-500">RESPONSE</p>
          <div className="mt-1">
            <textarea
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Enter your response..."
            ></textarea>
          </div>
          <div className="mt-2 flex justify-end">
            <Button
              variant="primary"
              icon={<Send size={16} />}
            >
              Send Response
            </Button>
          </div>
        </div>
      )}
      
      {query.status === 'escalated' && (
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex">
            <ArrowRightCircle className="h-5 w-5 text-amber-500" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">
                Escalated to Attorney
              </h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  This query has been escalated to a human attorney due to its complexity.
                  The client will be contacted directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 border-t border-slate-200 pt-6">
        <div className="flex justify-between items-center">
          <p className="font-medium">Client Information</p>
          <Button variant="ghost" size="sm" icon={<Users size={16} />}>
            View Client Profile
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">NAME</p>
            <p className="font-medium">
              {query.clientId === 'client1' ? 'Jane Smith' :
               query.clientId === 'client2' ? 'Robert Johnson' :
               'Maria Rodriguez'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">EMAIL</p>
            <p className="font-medium">
              {query.clientId === 'client1' ? 'jsmith@example.com' :
               query.clientId === 'client2' ? 'rjohnson@example.com' :
               'mrodriguez@example.com'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">PHONE</p>
            <p className="font-medium">
              {query.clientId === 'client1' ? '555-123-4567' :
               query.clientId === 'client2' ? '555-987-6543' :
               '555-456-7890'}
            </p>
          </div>
          <div>
            <p className="text-sm text-slate-500">CLIENT SINCE</p>
            <p className="font-medium">
              {query.clientId === 'client1' ? 'Jan 15, 2025' :
               query.clientId === 'client2' ? 'Feb 3, 2025' :
               'Mar 1, 2025'}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ClientIntakeDetail: React.FC<{
  intake: ClientIntake;
  onClose: () => void;
}> = ({ intake, onClose }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <Avatar name={intake.name} size="md" className="mr-3" />
          <div>
            <h3 className="text-lg font-semibold">{intake.name}</h3>
            <p className="text-sm text-slate-500">{intake.date}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<PlusCircle size={16} />}
          >
            Add to CRM
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="font-medium mb-2">Contact Information</h4>
          <Card noPadding className="overflow-hidden">
            <div className="border-b border-slate-200 p-3 flex items-center">
              <Mail size={16} className="text-slate-400 mr-2" />
              <a href={`mailto:${intake.email}`} className="text-blue-600 hover:underline">
                {intake.email}
              </a>
            </div>
            <div className="border-b border-slate-200 p-3 flex items-center">
              <Phone size={16} className="text-slate-400 mr-2" />
              <a href={`tel:${intake.phone}`} className="text-blue-600 hover:underline">
                {intake.phone}
              </a>
            </div>
            <div className="p-3 flex items-center">
              <Clock size={16} className="text-slate-400 mr-2" />
              <span>Submitted on {intake.date}</span>
            </div>
          </Card>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Request Status</h4>
          <Card noPadding className="overflow-hidden">
            <div className="p-4">
              <div className="mb-4">
                <Badge
                  variant={
                    intake.status === 'new' ? 'primary' :
                    intake.status === 'reviewed' ? 'info' :
                    intake.status === 'scheduled' ? 'warning' :
                    'success'
                  }
                  size="md"
                >
                  {intake.status.charAt(0).toUpperCase() + intake.status.slice(1)}
                </Badge>
              </div>
              
              {intake.status === 'scheduled' ? (
                <div className="flex items-center">
                  <CalendarIcon size={16} className="text-blue-500 mr-2" />
                  <span className="text-slate-900">Consultation scheduled for March 15, 2025 at 2:00 PM</span>
                </div>
              ) : (
                <div className="flex">
                  <Button
                    variant="primary"
                    icon={<Calendar size={16} />}
                    className="mr-2"
                  >
                    Schedule Consultation
                  </Button>
                  <Button
                    variant="secondary"
                  >
                    Request More Info
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-medium mb-2">Matter Details</h4>
        <Card noPadding>
          <div className="p-4">
            <p className="font-medium text-slate-900">{intake.matter}</p>
            <p className="text-sm text-slate-700 mt-2">{intake.details}</p>
          </div>
        </Card>
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Notes</h4>
        <textarea
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Add notes about this client intake..."
        ></textarea>
        <div className="mt-2 flex justify-end">
          <Button variant="primary">
            Save Notes
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ClientInterfaceModule: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<ClientQuery | null>(null);
  const [selectedIntake, setSelectedIntake] = useState<ClientIntake | null>(null);
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Client Interface</h1>
        <p className="text-sm text-slate-500">
          Manage client communications and intake processes
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {selectedQuery ? (
            <ClientQueryDetail
              query={selectedQuery}
              onClose={() => setSelectedQuery(null)}
            />
          ) : selectedIntake ? (
            <ClientIntakeDetail
              intake={selectedIntake}
              onClose={() => setSelectedIntake(null)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <ClientChatbot />
              </div>
              
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <Card
                    title="Client Queries"
                    headerAction={
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        View All
                      </Button>
                    }
                  >
                    <div className="space-y-4">
                      {clientQueries.map((query) => (
                        <ClientQueryItem
                          key={query.id}
                          query={query}
                          onClick={setSelectedQuery}
                        />
                      ))}
                    </div>
                  </Card>
                  
                  <Card
                    title="New Client Intakes"
                    headerAction={
                      <Button
                        variant="ghost"
                        size="sm"
                      >
                        View All
                      </Button>
                    }
                  >
                    <div className="space-y-4">
                      {clientIntakes.map((intake) => (
                        <ClientIntakeItem
                          key={intake.id}
                          intake={intake}
                          onClick={setSelectedIntake}
                        />
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientInterfaceModule;