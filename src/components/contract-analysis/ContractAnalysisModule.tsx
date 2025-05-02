import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Tabs from '../common/Tabs';
import Alert from '../common/Alert';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  BarChart2, 
  Search 
} from 'lucide-react';
import { contracts, contractClauses } from '../../utils/dummyData';
import { Contract, ContractClause } from '../../types';

const ContractList: React.FC<{
  contracts: Contract[];
  onSelectContract: (contract: Contract) => void;
  selectedContractId?: string;
}> = ({ contracts, onSelectContract, selectedContractId }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-800">Your Contracts</h2>
        <Button variant="primary" size="sm" icon={<Upload size={16} />}>
          Upload New
        </Button>
      </div>
      <div className="space-y-3">
        {contracts.map((contract) => (
          <div
            key={contract.id}
            className={`
              p-4 border rounded-lg transition-colors cursor-pointer
              ${
                selectedContractId === contract.id
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
              }
            `}
            onClick={() => onSelectContract(contract)}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <FileText className="w-5 h-5 mt-0.5 text-slate-400" />
                <div className="ml-3">
                  <h3 className="font-medium text-slate-900">{contract.title}</h3>
                  <p className="text-sm text-slate-500">
                    {contract.parties.join(' • ')}
                  </p>
                </div>
              </div>
              <div>
                <Badge
                  variant={
                    contract.riskLevel === 'high'
                      ? 'danger'
                      : contract.riskLevel === 'medium'
                      ? 'warning'
                      : 'success'
                  }
                >
                  {contract.riskLevel 
                    ? `${contract.riskLevel.charAt(0).toUpperCase() + contract.riskLevel.slice(1)} Risk` 
                    : 'Not Analyzed'}
                </Badge>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
              <span>Effective: {contract.effectiveDate}</span>
              <Badge variant="default">
                {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClauseItem: React.FC<{
  clause: ContractClause;
}> = ({ clause }) => {
  return (
    <div className={`
      p-4 border rounded-lg mb-4
      ${clause.issueDetected ? 'border-amber-200 bg-amber-50' : 'border-slate-200'}
    `}>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium flex items-center">
            {clause.issueDetected && (
              <AlertTriangle size={16} className="text-amber-500 mr-2" />
            )}
            {clause.title}
          </h4>
          <p className="text-sm text-slate-600 mt-2">{clause.content}</p>
        </div>
      </div>

      {clause.issueDetected && clause.recommendation && (
        <div className="mt-3">
          <Alert variant="warning" title="Recommendation">
            <p className="text-sm">{clause.recommendation}</p>
          </Alert>
        </div>
      )}
    </div>
  );
};

const ContractAnalysisDetails: React.FC<{
  contract: Contract;
  clauses: ContractClause[];
}> = ({ contract, clauses }) => {
  const riskByType = {
    missing: clauses.filter(c => c.issueType === 'missing').length,
    problematic: clauses.filter(c => c.issueType === 'problematic').length,
    nonStandard: clauses.filter(c => c.issueType === 'non-standard').length,
  };

  const complianceScore = contract.riskScore
    ? Math.max(0, 100 - contract.riskScore)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{contract.title}</h2>
          <p className="text-sm text-slate-500 mt-1">
            {contract.parties.join(' and ')}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="primary" icon={<CheckCircle size={16} />}>
            Mark as Reviewed
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      {contract.analysisComplete && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full">
                <BarChart2 size={24} className="text-blue-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Risk Score</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {contract.riskScore}/100
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {contract.riskLevel === 'low' && 'Low risk contract'}
                {contract.riskLevel === 'medium' && 'Moderate risk detected'}
                {contract.riskLevel === 'high' && 'High risk identified'}
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-full">
                <CheckCircle size={24} className="text-emerald-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Compliance</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {complianceScore}%
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Overall compliance score
              </p>
            </div>
          </Card>

          <Card>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full">
                <AlertTriangle size={24} className="text-amber-600" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Issues</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">
                {clauses.filter(c => c.issueDetected).length}
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Issues requiring attention
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Risk Summary */}
      {contract.analysisComplete ? (
        <Tabs
          tabs={[
            {
              id: 'clauses',
              label: 'Clauses',
              content: (
                <div>
                  <div className="mb-6">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search clauses..."
                        className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search size={18} className="text-slate-400" />
                      </div>
                    </div>
                  </div>
                  {clauses.map((clause) => (
                    <ClauseItem key={clause.id} clause={clause} />
                  ))}
                </div>
              ),
            },
            {
              id: 'summary',
              label: 'Risk Summary',
              content: (
                <div>
                  <Card>
                    <h3 className="text-lg font-semibold mb-4">Risk Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Missing Clauses</span>
                          <span className="text-sm font-medium">{riskByType.missing}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(riskByType.missing / clauses.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Problematic Language</span>
                          <span className="text-sm font-medium">{riskByType.problematic}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${(riskByType.problematic / clauses.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Non-Standard Terms</span>
                          <span className="text-sm font-medium">{riskByType.nonStandard}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(riskByType.nonStandard / clauses.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <div className="mt-6">
                    <Alert
                      variant="info"
                      title="AI-Powered Analysis"
                    >
                      <p>
                        This contract was analyzed using our AI system trained on thousands of legal documents.
                        The analysis identifies potential issues by comparing against industry standards
                        and legal requirements. Always review AI suggestions with appropriate legal counsel.
                      </p>
                    </Alert>
                  </div>
                </div>
              ),
            },
            {
              id: 'original',
              label: 'Original Contract',
              content: (
                <div>
                  <Card>
                    <div className="p-4 rounded bg-slate-50">
                      <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
                        {contract.content}
                      </pre>
                    </div>
                  </Card>
                </div>
              ),
            },
          ]}
        />
      ) : (
        <Card>
          <div className="text-center py-8">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
              <BarChart2 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-slate-900">
              Analysis in Progress
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Our AI is currently analyzing this contract. This typically takes 2-3 minutes.
            </p>
            <div className="mt-6">
              <Button onClick={() => {}} loading>
                Analyzing...
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

const ContractAnalysisModule: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const filteredClauses = contractClauses.filter(
    (clause) => clause.contractId === selectedContract?.id
  );

  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Contract Analysis</h1>
        <p className="text-sm text-slate-500">
          Review and analyze contracts for risks, compliance issues, and suggestions
        </p>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-1">
            <ContractList
              contracts={contracts}
              onSelectContract={setSelectedContract}
              selectedContractId={selectedContract?.id}
            />
          </div>
          <div className="lg:col-span-2">
            {selectedContract ? (
              <ContractAnalysisDetails
                contract={selectedContract}
                clauses={filteredClauses}
              />
            ) : (
              <Card>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto" />
                  <h3 className="mt-2 text-lg font-medium text-slate-900">
                    No Contract Selected
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Select a contract from the list to view its analysis
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractAnalysisModule;