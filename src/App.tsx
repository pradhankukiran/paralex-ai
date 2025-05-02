import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Sidebar from './components/common/Sidebar';
import Dashboard from './components/Dashboard';
import ContractAnalysisModule from './components/contract-analysis/ContractAnalysisModule';
import ContractGenerationModule from './components/contract-generation/ContractGenerationModule';
import LegalResearchModule from './components/legal-research/LegalResearchModule';
import DocumentDiscoveryModule from './components/document-discovery/DocumentDiscoveryModule';
import ComplianceMonitorModule from './components/compliance-monitor/ComplianceMonitorModule';
import ClientInterfaceModule from './components/client-interface/ClientInterfaceModule';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/*"
          element={
            <div className="h-screen flex bg-white">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-auto bg-gradient-to-b from-slate-50 to-white">
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contract-analysis" element={<ContractAnalysisModule />} />
              <Route path="/contract-generation" element={<ContractGenerationModule />} />
              <Route path="/legal-research" element={<LegalResearchModule />} />
              <Route path="/document-discovery" element={<DocumentDiscoveryModule />} />
              <Route path="/compliance-monitor" element={<ComplianceMonitorModule />} />
              <Route path="/client-interface" element={<ClientInterfaceModule />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;