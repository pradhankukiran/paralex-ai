// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'attorney' | 'paralegal' | 'client';
}

// Contract Analysis Types
export interface Contract {
  id: string;
  title: string;
  content: string;
  parties: string[];
  effectiveDate: string;
  expirationDate: string;
  status: 'draft' | 'under review' | 'approved' | 'executed' | 'expired';
  riskScore?: number;
  riskLevel?: 'low' | 'medium' | 'high';
  analysisComplete?: boolean;
}

export interface ContractClause {
  id: string;
  contractId: string;
  title: string;
  content: string;
  issueDetected: boolean;
  issueType?: 'missing' | 'problematic' | 'non-standard';
  recommendation?: string;
}

// Contract Generation Types
export interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  jurisdiction: string;
  variables: TemplateVariable[];
}

export interface TemplateVariable {
  id: string;
  name: string;
  description: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'select';
  options?: string[];
  required: boolean;
}

// Legal Research Types
export interface LegalQuery {
  id: string;
  query: string;
  date: string;
  userId: string;
  status: 'pending' | 'processing' | 'complete';
}

export interface LegalCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  date: string;
  summary: string;
  relevance: number;
}

export interface LegalStatute {
  id: string;
  title: string;
  code: string;
  jurisdiction: string;
  text: string;
  relevance: number;
}

// Document Discovery Types
export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  uploadedBy: string;
  tags: string[];
  relevanceScore?: number;
  isPrivileged?: boolean;
}

// Compliance Types
export interface ComplianceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  date: string;
  source: string;
  status: 'new' | 'reviewed' | 'resolved';
}

export interface Regulation {
  id: string;
  title: string;
  body: string;
  jurisdiction: string;
  effectiveDate: string;
  summary: string;
}

// Client Interface Types
export interface ClientQuery {
  id: string;
  clientId: string;
  question: string;
  date: string;
  status: 'pending' | 'answered' | 'escalated';
  response?: string;
}

export interface ClientIntake {
  id: string;
  name: string;
  email: string;
  phone: string;
  matter: string;
  details: string;
  date: string;
  status: 'new' | 'reviewed' | 'scheduled' | 'completed';
}