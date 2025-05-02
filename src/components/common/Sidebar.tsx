import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Gavel, 
  BarChart2, 
  Search, 
  ShieldAlert, 
  Users, 
  Home, 
  Settings,
  LogOut,
  Scale
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  expanded: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to, expanded }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`
        w-full flex items-center rounded-lg transition-all duration-200 relative
        py-3 px-3
        ${active 
          ? 'bg-blue-900/10 text-blue-900 font-medium' 
          : 'text-slate-600 hover:bg-blue-50 hover:text-blue-900'}
      `}
    >
      <div className="min-w-[28px] flex justify-center">
        {icon}
      </div>
      <span 
        className={`
          absolute left-12 text-base font-medium whitespace-nowrap
          transition-all duration-200 origin-left
          ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
        `}
      >
        {label}
      </span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const modules = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={22} /> },
    { path: '/contract-analysis', label: 'Contract Analysis', icon: <FileText size={22} /> },
    { path: '/contract-generation', label: 'Contract Generation', icon: <Gavel size={22} /> },
    { path: '/legal-research', label: 'Legal Research', icon: <Search size={22} /> },
    { path: '/document-discovery', label: 'Document Discovery', icon: <BarChart2 size={22} /> },
    { path: '/compliance-monitor', label: 'Compliance Monitor', icon: <ShieldAlert size={22} /> },
    { path: '/client-interface', label: 'Client Interface', icon: <Users size={22} /> },
  ];

  return (
    <div 
      className={`
        h-screen bg-white/80 backdrop-blur-sm border-r border-slate-200 flex flex-col
        transition-all duration-200 ease-in-out
        ${expanded ? 'w-72' : 'w-20'}
      `}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="p-4 border-b border-slate-200 bg-white overflow-hidden">
        <div 
          className="flex items-center relative cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="min-w-[40px] flex justify-center">
            <Scale className="h-8 w-8 text-blue-900" />
          </div>
          <div className={`
            absolute left-12 transition-all duration-200 origin-left
            ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
          `}>
            <h1 className="text-xl font-bold text-slate-900">ParalexAI</h1>
            <p className="text-sm text-slate-500">AI-Powered Legal Assistant</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden py-4 px-2">
        <div className="space-y-1">
          {modules.map((module) => (
            <SidebarItem
              key={module.path}
              icon={module.icon}
              label={module.label}
              to={module.path}
              expanded={expanded}
            />
          ))}
        </div>
      </div>
      
      <div className="border-t border-slate-200 p-2 bg-white overflow-hidden">
        <div className="space-y-1">
          <SidebarItem
            icon={<Settings size={22} />}
            label="Settings"
            to="/settings"
            expanded={expanded}
          />
          <button
            className={`
              w-full flex items-center gap-3 py-3 rounded-lg 
              transition-all duration-200 text-slate-600 relative
              hover:bg-slate-100 hover:text-slate-900
              px-3
            `}
            onClick={() => {}}
          >
            <div className="min-w-[28px] flex justify-center">
              <LogOut size={22} />
            </div>
            <span className={`
              absolute left-12 text-base font-medium whitespace-nowrap
              transition-all duration-200 origin-left
              ${expanded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
            `}>
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;