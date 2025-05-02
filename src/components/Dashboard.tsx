import React from 'react';
import Card from './common/Card';
import Button from './common/Button';
import Badge from './common/Badge';
import Avatar from './common/Avatar';
import { 
  FileText, 
  Gavel, 
  Search, 
  BarChart2, 
  ShieldAlert, 
  Users, 
  ArrowRight,
  AlertTriangle,
  Clock 
} from 'lucide-react';
import { contracts, documents, complianceAlerts, clientIntakes } from '../utils/dummyData';
import { useNavigate } from 'react-router-dom';

const ModuleCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  stats: { label: string; value: string | number };
  onClick: () => void;
}> = ({ title, description, icon, stats, onClick }) => (
  <Card
    className="h-full"
    hoverable
  >
    <div className="flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-800">
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6">{description}</p>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-slate-500">{stats.label}</p>
            <p className="text-xl font-semibold">{stats.value}</p>
          </div>
          <Button 
            variant="ghost" 
            onClick={onClick}
            icon={<ArrowRight size={16} />}
          >
            Open
          </Button>
        </div>
      </div>
    </div>
  </Card>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  // Get high priority alerts
  const highPriorityAlerts = complianceAlerts.filter(
    (alert) => alert.severity === 'high' || alert.severity === 'critical'
  );

  // Get recent client intakes
  const recentIntakes = clientIntakes.filter(
    (intake) => intake.status === 'new'
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h1>
        <p className="text-slate-500">
          Here's what's happening across your legal AI system
        </p>
      </div>

      {/* Priority Items */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Priority Items</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {highPriorityAlerts.length > 0 && (
            <Card className="bg-red-50 border-red-100">
              <div className="flex">
                <div className="mr-4">
                  <div className="p-2 bg-red-100 rounded-full">
                    <AlertTriangle size={20} className="text-red-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-red-800">High Priority Alert</h3>
                  <p className="text-sm text-red-700 mt-1">{highPriorityAlerts[0].title}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-red-800" 
                    onClick={() => navigate('/compliance-monitor')}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          )}
          
          {recentIntakes.length > 0 && (
            <Card className="bg-amber-50 border-amber-100">
              <div className="flex">
                <div className="mr-4">
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Clock size={20} className="text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-amber-800">New Client Intake</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    {recentIntakes[0].name} - {recentIntakes[0].matter}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2 text-amber-800" 
                    onClick={() => navigate('/client-interface')}
                  >
                    Process Request
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Modules */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">AI Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            title="Contract Analysis"
            description="Review and analyze contracts for risks and compliance issues"
            icon={<FileText size={24} />}
            stats={{ label: "Contracts Under Review", value: contracts.filter(c => c.status === 'under review').length }}
            onClick={() => navigate('/contract-analysis')}
          />
          
          <ModuleCard
            title="Contract Generation"
            description="Create legally compliant contracts from templates"
            icon={<Gavel size={24} />}
            stats={{ label: "Available Templates", value: 14 }}
            onClick={() => navigate('/contract-generation')}
          />
          
          <ModuleCard
            title="Legal Research"
            description="Process natural language queries about case law and statutes"
            icon={<Search size={24} />}
            stats={{ label: "Recent Searches", value: 8 }}
            onClick={() => navigate('/legal-research')}
          />
          
          <ModuleCard
            title="Document Discovery"
            description="Analyze large document sets for litigation relevance"
            icon={<BarChart2 size={24} />}
            stats={{ label: "Documents Indexed", value: documents.length }}
            onClick={() => navigate('/document-discovery')}
          />
          
          <ModuleCard
            title="Compliance Monitor"
            description="Scan communications for regulatory risks and track changes"
            icon={<ShieldAlert size={24} />}
            stats={{ 
              label: "Active Alerts", 
              value: complianceAlerts.filter(a => a.status !== 'resolved').length 
            }}
            onClick={() => navigate('/compliance-monitor')}
          />
          
          <ModuleCard
            title="Client Interface"
            description="Provide 24/7 chatbot support and conduct intake interviews"
            icon={<Users size={24} />}
            stats={{ label: "Client Requests", value: 12 }}
            onClick={() => navigate('/client-interface')}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h2>
        <Card>
          <ul className="divide-y divide-slate-100">
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar name="John Smith" size="sm" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-900">Contract approved</p>
                  <p className="text-xs text-slate-500">Service Agreement - TechCorp</p>
                </div>
              </div>
              <Badge variant="success" size="sm">Approved</Badge>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar name="Sarah Lee" size="sm" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-900">Document uploaded</p>
                  <p className="text-xs text-slate-500">merger_agreement_v2.docx</p>
                </div>
              </div>
              <span className="text-xs text-slate-500">2 hours ago</span>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar name="System" size="sm" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-900">New compliance alert</p>
                  <p className="text-xs text-slate-500">Potential GDPR Violation</p>
                </div>
              </div>
              <Badge variant="warning" size="sm">High Priority</Badge>
            </li>
            <li className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar name="Robert Johnson" size="sm" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-900">New client intake</p>
                  <p className="text-xs text-slate-500">Business Formation - Technology Startup</p>
                </div>
              </div>
              <Badge variant="info" size="sm">New</Badge>
            </li>
          </ul>
          <div className="mt-4 text-center">
            <Button variant="secondary" size="sm">View All Activity</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;