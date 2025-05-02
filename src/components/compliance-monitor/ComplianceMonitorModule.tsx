import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Avatar from '../common/Avatar';
import Tabs from '../common/Tabs';
import Alert from '../common/Alert';
import { 
  ShieldAlert, 
  RefreshCcw, 
  Calendar, 
  Bell, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  BarChart, 
  MapPin 
} from 'lucide-react';
import { complianceAlerts, regulations } from '../../utils/dummyData';
import { ComplianceAlert, Regulation } from '../../types';

const ComplianceStats: React.FC = () => {
  const stats = [
    {
      title: 'Active Alerts',
      value: complianceAlerts.filter(a => a.status !== 'resolved').length,
      icon: <Bell size={20} className="text-blue-600" />,
      change: '+2 from last month',
      changeType: 'negative'
    },
    {
      title: 'Resolved Issues',
      value: complianceAlerts.filter(a => a.status === 'resolved').length,
      icon: <CheckCircle2 size={20} className="text-emerald-600" />,
      change: '+5 from last month',
      changeType: 'positive'
    },
    {
      title: 'Upcoming Deadlines',
      value: regulations.length,
      icon: <Calendar size={20} className="text-amber-600" />,
      change: 'Next: Apr 1, 2025',
      changeType: 'neutral'
    },
    {
      title: 'Jurisdictions',
      value: 8,
      icon: <MapPin size={20} className="text-purple-600" />,
      change: '+1 from last month',
      changeType: 'neutral'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="h-full">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-slate-100">
                {stat.icon}
              </div>
              <Badge
                variant={
                  stat.changeType === 'positive'
                    ? 'success'
                    : stat.changeType === 'negative'
                    ? 'danger'
                    : 'default'
                }
                size="sm"
              >
                {stat.change}
              </Badge>
            </div>
            <h3 className="text-sm font-medium text-slate-500 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

const ComplianceAlertCard: React.FC<{
  alert: ComplianceAlert;
  onClick: (alert: ComplianceAlert) => void;
}> = ({ alert, onClick }) => {
  return (
    <div
      className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-50 cursor-pointer transition-colors"
      onClick={() => onClick(alert)}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className={`
            p-2 rounded-full
            ${alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
              alert.severity === 'high' ? 'bg-amber-100 text-amber-600' :
              alert.severity === 'medium' ? 'bg-blue-100 text-blue-600' :
              'bg-slate-100 text-slate-600'}
          `}>
            <AlertTriangle size={16} />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-slate-900">{alert.title}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {alert.source} • {alert.date}
            </p>
          </div>
        </div>
        <Badge
          variant={
            alert.severity === 'critical' ? 'danger' :
            alert.severity === 'high' ? 'warning' :
            alert.severity === 'medium' ? 'info' :
            'default'
          }
          size="sm"
        >
          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
        </Badge>
      </div>
      <p className="text-sm text-slate-600 mt-3 line-clamp-2">
        {alert.description}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <Badge
          variant={
            alert.status === 'new' ? 'primary' :
            alert.status === 'reviewed' ? 'warning' :
            'success'
          }
          size="sm"
        >
          {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
        </Badge>
        <Avatar
          name={alert.source === 'Internal Audit' ? 'John Smith' : 
                alert.source === 'Regulatory Update' ? 'System' : 
                'AI Scanner'}
          size="xs"
        />
      </div>
    </div>
  );
};

const RegulationCard: React.FC<{
  regulation: Regulation;
}> = ({ regulation }) => {
  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <FileText size={16} />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-slate-900">{regulation.title}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {regulation.body} • {regulation.jurisdiction}
            </p>
          </div>
        </div>
        <Badge variant="warning" size="sm">
          {new Date(regulation.effectiveDate) > new Date() ? 'Upcoming' : 'Active'}
        </Badge>
      </div>
      <p className="text-sm text-slate-600 mt-3">
        {regulation.summary}
      </p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-slate-500">
          Effective: {regulation.effectiveDate}
        </span>
        <Button variant="ghost" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};

const AlertDetail: React.FC<{
  alert: ComplianceAlert;
  onClose: () => void;
}> = ({ alert, onClose }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          <div className={`
            p-2 rounded-full mr-3
            ${alert.severity === 'critical' ? 'bg-red-100 text-red-600' :
              alert.severity === 'high' ? 'bg-amber-100 text-amber-600' :
              alert.severity === 'medium' ? 'bg-blue-100 text-blue-600' :
              'bg-slate-100 text-slate-600'}
          `}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{alert.title}</h2>
            <p className="text-sm text-slate-500">
              {alert.source} • {alert.date}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={alert.status === 'resolved' ? 'success' : 'primary'}
            size="sm"
            icon={alert.status === 'resolved' ? <CheckCircle2 size={16} /> : undefined}
          >
            {alert.status === 'resolved' ? 'Resolved' : 'Mark as Resolved'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      
      <Alert
        variant={
          alert.severity === 'critical' || alert.severity === 'high'
            ? 'error'
            : alert.severity === 'medium'
            ? 'warning'
            : 'info'
        }
        title={`${alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity`}
      >
        <p>
          This alert requires {
            alert.severity === 'critical' ? 'immediate attention' :
            alert.severity === 'high' ? 'prompt attention' :
            alert.severity === 'medium' ? 'review within 7 days' :
            'routine review'
          }.
        </p>
      </Alert>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-slate-700">{alert.description}</p>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recommended Actions</h3>
        <ul className="list-disc list-inside space-y-2 text-slate-700">
          {alert.title.includes('GDPR') ? (
            <>
              <li>Review the client intake form and remove unnecessary personal data fields</li>
              <li>Implement proper consent mechanisms with clear opt-in choices</li>
              <li>Update privacy policy to reflect the changes in data collection</li>
              <li>Document the changes made for compliance records</li>
            </>
          ) : alert.title.includes('California') ? (
            <>
              <li>Review current systems against the new CPRA requirements</li>
              <li>Update data processing agreements with vendors</li>
              <li>Implement additional user rights management capabilities</li>
              <li>Update privacy notices to reflect new rights</li>
            </>
          ) : (
            <>
              <li>Review document retention policy with team members</li>
              <li>Implement automated archiving for case files older than 3 years</li>
              <li>Conduct an audit of all 2020 case files to ensure proper archiving</li>
              <li>Document completion of the archiving process</li>
            </>
          )}
        </ul>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Related Regulations</h3>
        <div className="border border-slate-200 rounded-lg p-3">
          <div className="flex items-start">
            <FileText size={16} className="text-slate-500 mt-0.5 mr-2" />
            <div>
              <p className="font-medium">
                {alert.title.includes('GDPR') ? 'General Data Protection Regulation (GDPR)' :
                 alert.title.includes('California') ? 'California Privacy Rights Act (CPRA)' :
                 'Internal Document Retention Policy'}
              </p>
              <p className="text-sm text-slate-500">
                {alert.title.includes('GDPR') ? 'European Union • Effective May 25, 2018' :
                 alert.title.includes('California') ? 'California • Updates Effective April 1, 2025' :
                 'Company Policy • Last Updated January 15, 2024'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 border-t border-slate-200 pt-6">
        <h3 className="text-lg font-semibold mb-2">Activity Log</h3>
        <div className="space-y-4">
          <div className="flex">
            <div className="mr-3 flex-shrink-0">
              <Avatar name="System" size="sm" />
            </div>
            <div>
              <p className="text-sm">
                <span className="font-medium">Alert created</span> by {alert.source}
              </p>
              <p className="text-xs text-slate-500">{alert.date}</p>
            </div>
          </div>
          {alert.status !== 'new' && (
            <div className="flex">
              <div className="mr-3 flex-shrink-0">
                <Avatar name="Jane Smith" size="sm" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Marked as reviewed</span> by Jane Smith
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(alert.date).getDate() + 1}/{new Date(alert.date).getMonth() + 1}/{new Date(alert.date).getFullYear()}
                </p>
              </div>
            </div>
          )}
          {alert.status === 'resolved' && (
            <div className="flex">
              <div className="mr-3 flex-shrink-0">
                <Avatar name="Robert Johnson" size="sm" />
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-medium">Marked as resolved</span> by Robert Johnson
                </p>
                <p className="text-xs text-slate-500">
                  {new Date(alert.date).getDate() + 2}/{new Date(alert.date).getMonth() + 1}/{new Date(alert.date).getFullYear()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const ComplianceMonitorModule: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<ComplianceAlert | null>(null);
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Compliance Monitor</h1>
        <p className="text-sm text-slate-500">
          Track regulatory changes and monitor compliance risks
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <ComplianceStats />
          
          {selectedAlert ? (
            <AlertDetail
              alert={selectedAlert}
              onClose={() => setSelectedAlert(null)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card 
                  title="Compliance Alerts" 
                  headerAction={
                    <Button
                      variant="ghost"
                      size="sm"
                      icon={<RefreshCcw size={14} />}
                    >
                      Refresh
                    </Button>
                  }
                >
                  <Tabs
                    tabs={[
                      {
                        id: 'all',
                        label: 'All Alerts',
                        content: (
                          <div className="space-y-4">
                            {complianceAlerts.map((alert) => (
                              <ComplianceAlertCard
                                key={alert.id}
                                alert={alert}
                                onClick={setSelectedAlert}
                              />
                            ))}
                          </div>
                        ),
                      },
                      {
                        id: 'high',
                        label: 'High Priority',
                        content: (
                          <div className="space-y-4">
                            {complianceAlerts
                              .filter((alert) => alert.severity === 'high' || alert.severity === 'critical')
                              .map((alert) => (
                                <ComplianceAlertCard
                                  key={alert.id}
                                  alert={alert}
                                  onClick={setSelectedAlert}
                                />
                              ))}
                          </div>
                        ),
                      },
                      {
                        id: 'new',
                        label: 'New',
                        content: (
                          <div className="space-y-4">
                            {complianceAlerts
                              .filter((alert) => alert.status === 'new')
                              .map((alert) => (
                                <ComplianceAlertCard
                                  key={alert.id}
                                  alert={alert}
                                  onClick={setSelectedAlert}
                                />
                              ))}
                          </div>
                        ),
                      },
                    ]}
                  />
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <Card
                  title="Regulatory Updates"
                  className="h-full"
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
                    {regulations.map((regulation) => (
                      <RegulationCard
                        key={regulation.id}
                        regulation={regulation}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}
          
          <Card title="Compliance Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Risk by Category</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Data Privacy</span>
                      <span className="text-sm font-medium">High</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Regulatory Filings</span>
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Document Retention</span>
                      <span className="text-sm font-medium">Low</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Financial Compliance</span>
                      <span className="text-sm font-medium">Low</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Compliance by Jurisdiction</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart size={64} className="mx-auto text-slate-300" />
                    <p className="mt-2 text-sm text-slate-500">
                      Compliance score across jurisdictions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComplianceMonitorModule;