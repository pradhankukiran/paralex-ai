import { 
  Contract,
  ContractClause,
  ContractTemplate,
  LegalQuery,
  LegalCase,
  Document,
  ComplianceAlert,
  Regulation,
  ClientQuery,
  ClientIntake
} from '../types';

// Dummy Contracts
export const contracts: Contract[] = [
  {
    id: '1',
    title: 'Service Agreement - TechCorp',
    content: 'This Service Agreement ("Agreement") is made and entered into as of the Effective Date...',
    parties: ['TechCorp Inc.', 'Legal AI Solutions LLC'],
    effectiveDate: '2025-01-15',
    expirationDate: '2026-01-14',
    status: 'under review',
    riskScore: 37,
    riskLevel: 'medium',
    analysisComplete: true
  },
  {
    id: '2',
    title: 'NDA - Medical Research Project',
    content: 'This Non-Disclosure Agreement ("NDA") is entered into by and between the parties...',
    parties: ['BioMed Research', 'Legal AI Solutions LLC'],
    effectiveDate: '2025-02-01',
    expirationDate: '2027-01-31',
    status: 'approved',
    riskScore: 12,
    riskLevel: 'low',
    analysisComplete: true
  },
  {
    id: '3',
    title: 'Employment Agreement - Senior Developer',
    content: 'This Employment Agreement ("Agreement") is made and entered into by and between...',
    parties: ['John Doe', 'TechCorp Inc.'],
    effectiveDate: '2025-03-01',
    expirationDate: '2026-02-28',
    status: 'draft',
    analysisComplete: false
  }
];

// Dummy Contract Clauses
export const contractClauses: ContractClause[] = [
  {
    id: '1',
    contractId: '1',
    title: 'Limitation of Liability',
    content: 'In no event shall either party be liable for any indirect, incidental, special, punitive, or consequential damages...',
    issueDetected: true,
    issueType: 'problematic',
    recommendation: 'Consider adding mutual liability caps proportional to contract value.'
  },
  {
    id: '2',
    contractId: '1',
    title: 'Termination',
    content: 'This Agreement may be terminated by either party with 30 days written notice...',
    issueDetected: false
  },
  {
    id: '3',
    contractId: '1',
    title: 'Force Majeure',
    content: 'Neither party shall be liable for any failure to perform its obligations under this Agreement...',
    issueDetected: true,
    issueType: 'non-standard',
    recommendation: 'Clause is overly broad. Specify which events qualify as force majeure.'
  }
];

// Dummy Contract Templates
export const contractTemplates: ContractTemplate[] = [
  {
    id: '1',
    name: 'Standard NDA',
    description: 'A standard non-disclosure agreement for general business purposes',
    category: 'Confidentiality',
    jurisdiction: 'United States - Federal',
    variables: [
      {
        id: '1',
        name: 'disclosingParty',
        description: 'The party disclosing confidential information',
        type: 'text',
        required: true
      },
      {
        id: '2',
        name: 'receivingParty',
        description: 'The party receiving confidential information',
        type: 'text',
        required: true
      },
      {
        id: '3',
        name: 'effectiveDate',
        description: 'The date when the agreement becomes effective',
        type: 'date',
        required: true
      },
      {
        id: '4',
        name: 'term',
        description: 'Duration of the agreement in months',
        type: 'number',
        required: true
      }
    ]
  },
  {
    id: '2',
    name: 'Consulting Agreement',
    description: 'A template for independent contractor consulting services',
    category: 'Services',
    jurisdiction: 'United States - California',
    variables: [
      {
        id: '1',
        name: 'clientName',
        description: 'The client company name',
        type: 'text',
        required: true
      },
      {
        id: '2',
        name: 'consultantName',
        description: 'The consultant name (individual or company)',
        type: 'text',
        required: true
      },
      {
        id: '3',
        name: 'servicesDescription',
        description: 'Description of consulting services to be provided',
        type: 'text',
        required: true
      },
      {
        id: '4',
        name: 'compensationAmount',
        description: 'Compensation amount in USD',
        type: 'number',
        required: true
      },
      {
        id: '5',
        name: 'compensationType',
        description: 'Type of compensation',
        type: 'select',
        options: ['Hourly', 'Daily', 'Weekly', 'Monthly', 'Project-based'],
        required: true
      }
    ]
  }
];

// Dummy Legal Queries and Cases
export const legalQueries: LegalQuery[] = [
  {
    id: '1',
    query: 'What are the recent cases regarding fair use in AI training?',
    date: '2025-03-12',
    userId: 'user1',
    status: 'complete'
  },
  {
    id: '2',
    query: 'Summarize California employment laws regarding remote workers',
    date: '2025-03-10',
    userId: 'user2',
    status: 'processing'
  },
  {
    id: '3',
    query: 'What are the regulatory requirements for medical device software?',
    date: '2025-03-08',
    userId: 'user1',
    status: 'pending'
  }
];

export const legalCases: LegalCase[] = [
  {
    id: '1',
    title: 'Smith v. Universal AI Corp',
    citation: '567 F.3d 123 (9th Cir. 2024)',
    court: 'United States Court of Appeals for the Ninth Circuit',
    date: '2024-11-15',
    summary: 'The court ruled that AI systems trained on publicly available data may qualify for fair use under certain conditions...',
    relevance: 92
  },
  {
    id: '2',
    title: 'TechInnovate LLC v. DataCorp',
    citation: '489 F. Supp. 3d 765 (S.D.N.Y. 2024)',
    court: 'United States District Court for the Southern District of New York',
    date: '2024-09-22',
    summary: 'Court held that using copyrighted materials for machine learning training constitutes transformative use...',
    relevance: 87
  }
];

// Dummy Documents
export const documents: Document[] = [
  {
    id: '1',
    title: 'Merger Agreement Draft v2',
    fileName: 'merger_agreement_v2.docx',
    fileSize: 2456000,
    fileType: 'docx',
    uploadDate: '2025-03-01',
    uploadedBy: 'jsmith@legalai.com',
    tags: ['merger', 'agreement', 'draft'],
    relevanceScore: 89,
    isPrivileged: false
  },
  {
    id: '2',
    title: 'Internal Legal Strategy Memo',
    fileName: 'strategy_memo_q1_2025.pdf',
    fileSize: 1245000,
    fileType: 'pdf',
    uploadDate: '2025-02-15',
    uploadedBy: 'aruiz@legalai.com',
    tags: ['memo', 'strategy', 'confidential'],
    relevanceScore: 76,
    isPrivileged: true
  },
  {
    id: '3',
    title: 'Client Communication - Patent Application',
    fileName: 'client_email_patent.eml',
    fileSize: 145000,
    fileType: 'eml',
    uploadDate: '2025-02-12',
    uploadedBy: 'kchen@legalai.com',
    tags: ['email', 'patent', 'client'],
    relevanceScore: 62,
    isPrivileged: true
  }
];

// Dummy Compliance Alerts and Regulations
export const complianceAlerts: ComplianceAlert[] = [
  {
    id: '1',
    title: 'Potential GDPR Violation in Client Intake Form',
    description: 'The current client intake form collects unnecessary personal data without proper consent mechanisms',
    severity: 'high',
    date: '2025-03-10',
    source: 'Internal Audit',
    status: 'new'
  },
  {
    id: '2',
    title: 'New California Privacy Regulation Deadline Approaching',
    description: 'CPRA additional requirements go into effect on April 1, 2025. Current systems need updates.',
    severity: 'medium',
    date: '2025-03-05',
    source: 'Regulatory Update',
    status: 'reviewed'
  },
  {
    id: '3',
    title: 'Document Retention Policy Violation',
    description: 'Case files from 2020 have not been properly archived according to firm policy',
    severity: 'low',
    date: '2025-03-01',
    source: 'Automated Scan',
    status: 'resolved'
  }
];

export const regulations: Regulation[] = [
  {
    id: '1',
    title: 'California Privacy Rights Act Amendments',
    body: 'California Privacy Protection Agency',
    jurisdiction: 'California',
    effectiveDate: '2025-04-01',
    summary: 'Amendments to the CPRA expanding consumer rights regarding automated decision-making and profiling'
  },
  {
    id: '2',
    title: 'Federal AI Liability Framework',
    body: 'U.S. Congress',
    jurisdiction: 'United States - Federal',
    effectiveDate: '2025-07-01',
    summary: 'New framework establishing liability standards for AI systems and their developers/operators'
  }
];

// Dummy Client Interface Data
export const clientQueries: ClientQuery[] = [
  {
    id: '1',
    clientId: 'client1',
    question: 'Do I need to file a trademark for my business name?',
    date: '2025-03-12',
    status: 'answered',
    response: 'Trademark registration is not legally required, but it provides important protections...'
  },
  {
    id: '2',
    clientId: 'client2',
    question: 'What documents do I need to form an LLC in Delaware?',
    date: '2025-03-11',
    status: 'answered',
    response: 'To form an LLC in Delaware, you will need to file a Certificate of Formation...'
  },
  {
    id: '3',
    clientId: 'client3',
    question: 'Can you help with a complex real estate transaction dispute?',
    date: '2025-03-10',
    status: 'escalated'
  }
];

export const clientIntakes: ClientIntake[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jsmith@example.com',
    phone: '555-123-4567',
    matter: 'Intellectual Property - Patent Filing',
    details: 'I have developed a new algorithm for privacy-preserving data analysis and want to patent it',
    date: '2025-03-12',
    status: 'scheduled'
  },
  {
    id: '2',
    name: 'Robert Johnson',
    email: 'rjohnson@example.com',
    phone: '555-987-6543',
    matter: 'Business Formation - Technology Startup',
    details: 'Looking to form a Delaware C-Corp for my AI startup and need assistance with equity structure',
    date: '2025-03-11',
    status: 'new'
  }
];