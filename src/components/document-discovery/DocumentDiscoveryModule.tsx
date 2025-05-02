import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Tabs from '../common/Tabs';
import { Search, Upload, Filter, FileText, DownloadCloud, AlertTriangle, CheckCircle, Eye } from 'lucide-react';
import { documents } from '../../utils/dummyData';
import { Document } from '../../types';

const DocumentFilters: React.FC = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-slate-900">Filters</h3>
        <Button variant="ghost" size="sm">
          Reset
        </Button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            File Type
          </label>
          <div className="space-y-2">
            {['PDF', 'DOCX', 'XLSX', 'EML', 'TXT'].map((type) => (
              <div key={type} className="flex items-center">
                <input
                  type="checkbox"
                  id={`type-${type}`}
                  className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`type-${type}`}
                  className="ml-2 text-sm text-slate-700"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              className="px-2 py-1 border border-slate-300 rounded text-sm"
              placeholder="Start date"
            />
            <input
              type="date"
              className="px-2 py-1 border border-slate-300 rounded text-sm"
              placeholder="End date"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Tags
          </label>
          <div className="flex flex-wrap gap-2">
            {['Contract', 'Email', 'Report', 'Invoice', 'Memo'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 cursor-pointer hover:bg-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Relevance Score
          </label>
          <input
            type="range"
            min="0"
            max="100"
            className="w-full"
            defaultValue="50"
          />
          <div className="flex justify-between text-xs text-slate-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Privilege Status
          </label>
          <div className="space-y-2">
            {[
              { id: 'all', label: 'All Documents' },
              { id: 'privileged', label: 'Privileged' },
              { id: 'non-privileged', label: 'Non-Privileged' },
            ].map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="radio"
                  id={option.id}
                  name="privilege"
                  className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={option.id}
                  className="ml-2 text-sm text-slate-700"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button variant="primary" fullWidth icon={<Filter size={16} />}>
          Apply Filters
        </Button>
      </div>
    </Card>
  );
};

const DocumentCard: React.FC<{
  document: Document;
  onSelect: (doc: Document) => void;
}> = ({ document, onSelect }) => {
  // Determine the icon based on file type
  const getFileIcon = () => {
    switch (document.fileType) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'docx':
        return <FileText className="text-blue-500" />;
      case 'xlsx':
        return <FileText className="text-green-500" />;
      case 'eml':
        return <FileText className="text-purple-500" />;
      default:
        return <FileText className="text-slate-500" />;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };
  
  return (
    <div className="border border-slate-200 rounded-lg p-4 hover:border-blue-200 hover:bg-slate-50 cursor-pointer transition-colors">
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-slate-100">
            {getFileIcon()}
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-slate-900">{document.title}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {document.fileName} • {formatFileSize(document.fileSize)}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          {document.isPrivileged && (
            <Badge variant="danger" size="sm" className="mb-2">
              Privileged
            </Badge>
          )}
          {document.relevanceScore && (
            <Badge
              variant={
                document.relevanceScore > 80
                  ? 'success'
                  : document.relevanceScore > 50
                  ? 'warning'
                  : 'default'
              }
              size="sm"
            >
              {document.relevanceScore}% Relevant
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-1">
        {document.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-slate-500 flex justify-between items-center">
        <span>Uploaded: {document.uploadDate}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onSelect(document)}
          icon={<Eye size={14} />}
        >
          View
        </Button>
      </div>
    </div>
  );
};

const DocumentDetails: React.FC<{
  document: Document;
  onClose: () => void;
}> = ({ document, onClose }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <FileText size={20} className="text-slate-600 mr-2" />
          <h3 className="text-lg font-semibold">{document.title}</h3>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<DownloadCloud size={16} />}
          >
            Download
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
      
      <Tabs
        tabs={[
          {
            id: 'details',
            label: 'Details',
            content: (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-slate-500">File Name</p>
                    <p className="font-medium">{document.fileName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">File Size</p>
                    <p className="font-medium">
                      {(document.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Upload Date</p>
                    <p className="font-medium">{document.uploadDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Uploaded By</p>
                    <p className="font-medium">{document.uploadedBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">File Type</p>
                    <p className="font-medium uppercase">{document.fileType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Relevance Score</p>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        {document.relevanceScore}%
                      </span>
                      <div className="w-24 bg-slate-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            (document.relevanceScore || 0) > 80
                              ? 'bg-emerald-500'
                              : (document.relevanceScore || 0) > 50
                              ? 'bg-amber-500'
                              : 'bg-slate-400'
                          }`}
                          style={{ width: `${document.relevanceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm text-slate-500 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800"
                      >
                        {tag}
                      </span>
                    ))}
                    <button className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      + Add Tag
                    </button>
                  </div>
                </div>
                
                {document.isPrivileged && (
                  <div className="mb-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Privileged Document
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>
                              This document has been identified as potentially privileged.
                              Access is restricted and it should not be shared without proper review.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="font-medium mb-2">Document History</h4>
                  <div className="space-y-3">
                    <div className="flex">
                      <CheckCircle size={16} className="text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">Document uploaded</span>{' '}
                          by {document.uploadedBy}
                        </p>
                        <p className="text-xs text-slate-500">{document.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <CheckCircle size={16} className="text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">AI analysis completed</span>
                        </p>
                        <p className="text-xs text-slate-500">{document.uploadDate}</p>
                      </div>
                    </div>
                    {document.isPrivileged && (
                      <div className="flex">
                        <CheckCircle size={16} className="text-slate-400 mr-2 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            <span className="font-medium">Marked as privileged</span>{' '}
                            by AI detection
                          </p>
                          <p className="text-xs text-slate-500">{document.uploadDate}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ),
          },
          {
            id: 'preview',
            label: 'Preview',
            content: (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <p className="text-sm text-slate-500 italic text-center">
                  Document preview not available. Please download the file to view its contents.
                </p>
              </div>
            ),
          },
          {
            id: 'ai-analysis',
            label: 'AI Analysis',
            content: (
              <div>
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Key Data Points</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-blue-500">PARTIES</p>
                      <p className="font-medium text-blue-900">
                        {document.title.includes('Merger') ? 'TechCorp Inc., AcquireCo LLC' : 
                         document.title.includes('Patent') ? 'John Smith, Patent Office' : 
                         'Legal AI Solutions LLC, Client'}
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-blue-500">DATES</p>
                      <p className="font-medium text-blue-900">
                        {document.title.includes('Merger') ? 'Effective: Jan 15, 2025' : 
                         document.title.includes('Patent') ? 'Filing: Mar 5, 2025' : 
                         'Created: Feb 12, 2025'}
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-blue-500">KEY TERMS</p>
                      <p className="font-medium text-blue-900">
                        {document.title.includes('Merger') ? 'Consideration, Due Diligence, Representations' : 
                         document.title.includes('Patent') ? 'Invention, Claims, Priority' : 
                         'Confidentiality, Payment Terms, Deliverables'}
                      </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs text-blue-500">FINANCIAL DETAILS</p>
                      <p className="font-medium text-blue-900">
                        {document.title.includes('Merger') ? '$25,000,000 transaction value' : 
                         document.title.includes('Patent') ? 'Filing fees: $1,500' : 
                         'Not detected'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Document Summary</h4>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <p className="text-sm">
                      {document.title.includes('Merger') ? 
                        'This document is a draft merger agreement between TechCorp Inc. and AcquireCo LLC, outlining the terms of a proposed $25M acquisition. The agreement includes standard representations and warranties, with a 60-day due diligence period and various closing conditions.' : 
                       document.title.includes('Patent') ? 
                        'This email contains correspondence regarding a patent application for a new AI-driven privacy technology. The inventor is discussing filing strategy with patent counsel, including potential international filings and prior art concerns.' : 
                        'This document details the internal legal strategy for Q1 2025, including priority litigation matters, regulatory compliance initiatives, and resource allocation across legal department teams.'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Potential Issues</h4>
                  {document.isPrivileged ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Attorney-Client Privilege Detected
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>
                              This document appears to contain attorney-client privileged communications.
                              Exercise caution when sharing or producing this document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-emerald-800">
                            No Major Issues Detected
                          </h3>
                          <div className="mt-2 text-sm text-emerald-700">
                            <p>
                              AI analysis found no significant legal issues or concerns with this document.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ),
          },
        ]}
      />
    </Card>
  );
};

const DocumentDiscoveryModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  
  const filteredDocuments = documents.filter((doc) => {
    if (!searchQuery) return true;
    return (
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Document Discovery</h1>
        <p className="text-sm text-slate-500">
          Analyze documents for litigation relevance and privileged content
        </p>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search documents..."
                  className="w-full px-4 py-2 pl-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={18} className="text-slate-400" />
                </div>
              </div>
              <Button variant="primary" icon={<Upload size={18} />}>
                Upload Document
              </Button>
            </div>
          </div>
          
          {selectedDocument ? (
            <DocumentDetails
              document={selectedDocument}
              onClose={() => setSelectedDocument(null)}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <DocumentFilters />
              </div>
              <div className="lg:col-span-3">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-sm text-slate-500">
                    Showing {filteredDocuments.length} document
                    {filteredDocuments.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-500">Sort by:</label>
                    <select className="text-sm border border-slate-300 rounded-md px-2 py-1">
                      <option>Relevance</option>
                      <option>Date (Newest)</option>
                      <option>Date (Oldest)</option>
                      <option>File Name</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onSelect={setSelectedDocument}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentDiscoveryModule;