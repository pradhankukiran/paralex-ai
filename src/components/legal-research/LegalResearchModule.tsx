import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Tabs from '../common/Tabs';
import { Search, Clock, Copy, FileText, BarChart2, BookOpen, MailOpen } from 'lucide-react';
import { legalQueries, legalCases } from '../../utils/dummyData';
import { LegalQuery, LegalCase } from '../../types';

const LegalSearchBar: React.FC<{
  onSearch: (query: string) => void;
}> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };
  
  const suggestedQueries = [
    'Recent privacy law developments',
    'Contract enforceability online agreements',
    'Employment law remote workers',
    'Copyright fair use AI training',
  ];
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Ask a legal research question..."
            className="w-full px-4 py-3 pl-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={20} className="text-slate-400" />
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <Button
              type="submit"
              variant="primary"
              className="py-1.5"
              disabled={!query.trim()}
            >
              Research
            </Button>
          </div>
        </div>
      </form>
      
      {/* Suggested queries */}
      <div className="mt-3">
        <p className="text-xs text-slate-500 mb-2">Suggested queries:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((suggestedQuery) => (
            <button
              key={suggestedQuery}
              className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1 rounded-full transition-colors"
              onClick={() => {
                setQuery(suggestedQuery);
              }}
            >
              {suggestedQuery}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const RecentSearches: React.FC<{
  queries: LegalQuery[];
  onSelectQuery: (query: LegalQuery) => void;
}> = ({ queries, onSelectQuery }) => {
  return (
    <Card title="Recent Searches">
      <div className="space-y-4">
        {queries.map((query) => (
          <div
            key={query.id}
            className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-50 cursor-pointer transition-colors"
            onClick={() => onSelectQuery(query)}
          >
            <div className="flex items-start">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full mr-3">
                <Clock size={14} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">{query.query}</p>
                <p className="text-xs text-slate-500 mt-1">{query.date}</p>
              </div>
              <div className="ml-auto">
                <Badge
                  variant={
                    query.status === 'complete'
                      ? 'success'
                      : query.status === 'processing'
                      ? 'warning'
                      : 'default'
                  }
                  size="sm"
                >
                  {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const CaseCard: React.FC<{
  legalCase: LegalCase;
}> = ({ legalCase }) => {
  return (
    <Card className="mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-slate-900">{legalCase.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{legalCase.citation}</p>
          <p className="text-xs text-slate-500 mt-1">{legalCase.court} • {legalCase.date}</p>
        </div>
        <Badge variant="primary" size="lg">
          {legalCase.relevance}% Match
        </Badge>
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-700">{legalCase.summary}</p>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        <Button
          variant="ghost"
          size="sm"
          icon={<Copy size={14} />}
        >
          Copy Citation
        </Button>
        <Button
          variant="secondary"
          size="sm"
          icon={<FileText size={14} />}
        >
          Full Text
        </Button>
      </div>
    </Card>
  );
};

const LegalResearchResults: React.FC<{
  query?: LegalQuery;
  cases: LegalCase[];
}> = ({ query, cases }) => {
  if (!query) {
    return (
      <div className="text-center py-12">
        <Search className="h-12 w-12 text-slate-400 mx-auto" />
        <h3 className="mt-2 text-lg font-medium text-slate-900">
          Enter a Legal Research Query
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Ask any legal research question to get relevant cases and statutes
        </p>
      </div>
    );
  }

  if (query.status === 'pending' || query.status === 'processing') {
    return (
      <div className="text-center py-12">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
          <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <h3 className="mt-2 text-lg font-medium text-slate-900">
          Researching Your Query
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Our AI is searching relevant cases and statutes. This may take a few moments.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Alert query={query.query} />
      </div>
      
      <Tabs
        tabs={[
          {
            id: 'cases',
            label: (
              <span className="flex items-center">
                <Gavel size={14} className="mr-1" />
                Cases
              </span>
            ),
            content: (
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-slate-500">
                    {cases.length} relevant cases found
                  </h3>
                </div>
                {cases.map((legalCase) => (
                  <CaseCard key={legalCase.id} legalCase={legalCase} />
                ))}
              </div>
            ),
          },
          {
            id: 'statutes',
            label: (
              <span className="flex items-center">
                <BookOpen size={14} className="mr-1" />
                Statutes
              </span>
            ),
            content: (
              <div>
                <Card className="mb-4">
                  <div className="text-center py-6">
                    <p className="text-sm text-slate-600">
                      No relevant statutes found for this query.
                    </p>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            id: 'summary',
            label: (
              <span className="flex items-center">
                <FileText size={14} className="mr-1" />
                Legal Memo
              </span>
            ),
            content: (
              <Card>
                <div className="mb-4 flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">Legal Memorandum</h3>
                    <p className="text-sm text-slate-500">
                      Prepared on {query.date}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<MailOpen size={14} />}
                  >
                    Email Memo
                  </Button>
                </div>
                
                <div className="prose max-w-none">
                  <h4>RE: {query.query}</h4>
                  
                  <h5>Summary of Findings</h5>
                  <p>
                    Recent court decisions have established that AI systems trained on publicly available data may qualify for fair use protection under certain conditions. The key factors in these determinations include the transformation of the original works, the purpose of the use, and the effect on the market for the original works.
                  </p>
                  
                  <h5>Key Cases</h5>
                  <p>
                    In <em>Smith v. Universal AI Corp</em>, the Ninth Circuit held that AI training on publicly available data constitutes transformative use when the purpose is to recognize patterns rather than reproduce creative expression. Similarly, in <em>TechInnovate LLC v. DataCorp</em>, the Southern District of New York found that using copyrighted materials for machine learning training can constitute fair use when the resulting AI system doesn't reproduce substantial portions of the original works.
                  </p>
                  
                  <h5>Analysis</h5>
                  <p>
                    Courts have generally applied the four-factor fair use analysis, with particular emphasis on whether the use is transformative. When AI systems use copyrighted materials to learn patterns rather than to reproduce or replace the original works, courts have been more likely to find fair use. However, this area of law is rapidly evolving, and different jurisdictions may reach different conclusions.
                  </p>
                  
                  <h5>Recommendations</h5>
                  <p>
                    Organizations developing AI systems should:
                  </p>
                  <ul>
                    <li>Document the transformative nature of their AI training processes</li>
                    <li>Avoid training models that could directly replace or compete with original works</li>
                    <li>Consider licensing arrangements when using proprietary datasets</li>
                    <li>Stay informed about ongoing legal developments in this rapidly changing area</li>
                  </ul>
                </div>
              </Card>
            ),
          },
        ]}
      />
    </div>
  );
};

const Alert: React.FC<{ query: string }> = ({ query }) => {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <BarChart2 className="h-5 w-5 text-blue-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            Research Results for: "{query}"
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>
              Our AI analyzed thousands of legal documents to find the most relevant cases and statutes.
              Results are ranked by relevance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LegalResearchModule: React.FC = () => {
  const [currentQuery, setCurrentQuery] = useState<LegalQuery | null>(null);
  const [searchResults, setSearchResults] = useState<LegalCase[]>([]);
  
  const handleSearch = (query: string) => {
    // In a real app, this would make an API call
    const newQuery: LegalQuery = {
      id: (legalQueries.length + 1).toString(),
      query,
      date: new Date().toISOString().split('T')[0],
      userId: 'user1',
      status: 'processing',
    };
    
    setCurrentQuery(newQuery);
    
    // Simulate processing
    setTimeout(() => {
      setCurrentQuery({
        ...newQuery,
        status: 'complete',
      });
      setSearchResults(legalCases.sort((a, b) => b.relevance - a.relevance));
    }, 2000);
  };
  
  const handleSelectQuery = (query: LegalQuery) => {
    setCurrentQuery(query);
    if (query.status === 'complete') {
      setSearchResults(legalCases.sort((a, b) => b.relevance - a.relevance));
    } else {
      setSearchResults([]);
    }
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Legal Research</h1>
        <p className="text-sm text-slate-500">
          Research case law and statutes with natural language queries
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          <div className="lg:col-span-1 space-y-6">
            <LegalSearchBar onSearch={handleSearch} />
            <RecentSearches
              queries={legalQueries}
              onSelectQuery={handleSelectQuery}
            />
          </div>
          
          <div className="lg:col-span-2">
            <LegalResearchResults
              query={currentQuery || undefined}
              cases={searchResults}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalResearchModule;