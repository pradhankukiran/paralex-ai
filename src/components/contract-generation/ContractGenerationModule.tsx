import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Tabs from '../common/Tabs';
import Alert from '../common/Alert';
import { FilePlus, Gavel, Download, Copy, FileText, Check, CheckCircle2 } from 'lucide-react';
import { contractTemplates } from '../../utils/dummyData';
import { ContractTemplate, TemplateVariable } from '../../types';

const TemplateCard: React.FC<{
  template: ContractTemplate;
  onSelect: (template: ContractTemplate) => void;
  isSelected: boolean;
}> = ({ template, onSelect, isSelected }) => {
  return (
    <div
      className={`
        p-4 border rounded-lg transition-colors cursor-pointer
        ${
          isSelected
            ? 'border-blue-300 bg-blue-50'
            : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
        }
      `}
      onClick={() => onSelect(template)}
    >
      <div className="flex justify-between">
        <div className="flex items-start">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
            <Gavel size={16} />
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-slate-900">{template.name}</h3>
            <p className="text-xs text-slate-500 mt-1">{template.jurisdiction}</p>
          </div>
        </div>
        {isSelected && <Check size={20} className="text-blue-600" />}
      </div>
      <p className="text-sm text-slate-600 mt-3">{template.description}</p>
      <div className="flex mt-4">
        <Badge variant="default">{template.category}</Badge>
      </div>
    </div>
  );
};

const TemplateVariableInput: React.FC<{
  variable: TemplateVariable;
  value: string | number | boolean;
  onChange: (id: string, value: string | number | boolean) => void;
}> = ({ variable, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    let updatedValue: string | number | boolean = e.target.value;
    
    if (variable.type === 'number') {
      updatedValue = e.target.value === '' ? '' : Number(e.target.value);
    } else if (variable.type === 'boolean') {
      updatedValue = (e.target as HTMLInputElement).checked;
    }
    
    onChange(variable.id, updatedValue);
  };

  switch (variable.type) {
    case 'text':
      if (variable.name.toLowerCase().includes('description')) {
        return (
          <textarea
            id={variable.id}
            value={value as string}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            required={variable.required}
          />
        );
      }
      return (
        <input
          type="text"
          id={variable.id}
          value={value as string}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={variable.required}
        />
      );
    case 'date':
      return (
        <input
          type="date"
          id={variable.id}
          value={value as string}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={variable.required}
        />
      );
    case 'number':
      return (
        <input
          type="number"
          id={variable.id}
          value={value as number}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={variable.required}
        />
      );
    case 'boolean':
      return (
        <div className="flex items-center">
          <input
            type="checkbox"
            id={variable.id}
            checked={value as boolean}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
          />
          <label htmlFor={variable.id} className="ml-2 text-sm text-slate-700">
            Yes
          </label>
        </div>
      );
    case 'select':
      return (
        <select
          id={variable.id}
          value={value as string}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required={variable.required}
        >
          <option value="">Select an option</option>
          {variable.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    default:
      return null;
  }
};

const ContractPreview: React.FC<{
  template: ContractTemplate;
  values: Record<string, string | number | boolean>;
}> = ({ template, values }) => {
  const [copied, setCopied] = useState(false);
  
  // Generate a simple preview based on the template and values
  const generatePreview = () => {
    let preview = `${template.name.toUpperCase()}\n\n`;
    preview += `THIS AGREEMENT is made on ${values['effectiveDate'] || '[DATE]'}\n\n`;
    
    if (template.name.includes('NDA')) {
      preview += `BETWEEN:\n(1) ${values['disclosingParty'] || '[DISCLOSING PARTY]'} ("Disclosing Party")\n`;
      preview += `(2) ${values['receivingParty'] || '[RECEIVING PARTY]'} ("Receiving Party")\n\n`;
      
      preview += `WHEREAS the Receiving Party has agreed to keep confidential all information disclosed by the Disclosing Party;\n\n`;
      preview += `NOW IT IS HEREBY AGREED as follows:\n\n`;
      preview += `1. DEFINITIONS\n`;
      preview += `   "Confidential Information" means all information disclosed by the Disclosing Party to the Receiving Party, whether oral or written...\n\n`;
      preview += `2. OBLIGATIONS\n`;
      preview += `   The Receiving Party agrees to keep all Confidential Information strictly confidential...\n\n`;
      preview += `3. TERM\n`;
      preview += `   This Agreement shall remain in effect for a period of ${values['term'] || '[TERM]'} months from the Effective Date...\n`;
    } else if (template.name.includes('Consulting')) {
      preview += `BETWEEN:\n(1) ${values['clientName'] || '[CLIENT]'} ("Client")\n`;
      preview += `(2) ${values['consultantName'] || '[CONSULTANT]'} ("Consultant")\n\n`;
      
      preview += `WHEREAS the Client wishes to engage the Consultant to provide certain services and the Consultant agrees to provide such services;\n\n`;
      preview += `NOW IT IS HEREBY AGREED as follows:\n\n`;
      preview += `1. SERVICES\n`;
      preview += `   The Consultant shall provide the following services: ${values['servicesDescription'] || '[SERVICES DESCRIPTION]'}...\n\n`;
      preview += `2. COMPENSATION\n`;
      preview += `   The Client shall pay the Consultant $${values['compensationAmount'] || '[AMOUNT]'} on a ${values['compensationType'] || '[COMPENSATION TYPE]'} basis...\n\n`;
      preview += `3. TERM AND TERMINATION\n`;
      preview += `   This Agreement shall commence on the Effective Date and shall continue until terminated in accordance with the provisions herein...\n`;
    }
    
    preview += `\n\nSIGNED BY:\n\n`;
    preview += `____________________\n`;
    
    if (template.name.includes('NDA')) {
      preview += `For and on behalf of ${values['disclosingParty'] || '[DISCLOSING PARTY]'}\n\n`;
      preview += `____________________\n`;
      preview += `For and on behalf of ${values['receivingParty'] || '[RECEIVING PARTY]'}\n\n`;
    } else if (template.name.includes('Consulting')) {
      preview += `For and on behalf of ${values['clientName'] || '[CLIENT]'}\n\n`;
      preview += `____________________\n`;
      preview += `For and on behalf of ${values['consultantName'] || '[CONSULTANT]'}\n\n`;
    }
    
    return preview;
  };
  
  const preview = generatePreview();
  
  const handleCopy = () => {
    navigator.clipboard.writeText(preview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Contract Preview</h3>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            icon={copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy Text'}
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Download size={16} />}
          >
            Download
          </Button>
        </div>
      </div>
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg overflow-auto max-h-[500px]">
        <pre className="whitespace-pre-wrap font-mono text-sm text-slate-800">
          {preview}
        </pre>
      </div>
    </div>
  );
};

const ContractGenerationModule: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [formValues, setFormValues] = useState<Record<string, string | number | boolean>>({});
  const [activeTab, setActiveTab] = useState('templates');
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  
  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    
    // Initialize form values with empty values
    const initialValues: Record<string, string | number | boolean> = {};
    template.variables.forEach((variable) => {
      if (variable.type === 'boolean') {
        initialValues[variable.id] = false;
      } else if (variable.type === 'number') {
        initialValues[variable.id] = '';
      } else {
        initialValues[variable.id] = '';
      }
    });
    
    setFormValues(initialValues);
    setActiveTab('customize');
    setIsPreviewReady(false);
  };
  
  const handleVariableChange = (id: string, value: string | number | boolean) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  
  const handleGenerateContract = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewReady(true);
    setActiveTab('preview');
  };
  
  const isFormValid = () => {
    if (!selectedTemplate) return false;
    
    return selectedTemplate.variables.every((variable) => {
      if (!variable.required) return true;
      const value = formValues[variable.id];
      if (typeof value === 'boolean') return true;
      return value !== undefined && value !== '';
    });
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="px-6 py-4 border-b border-slate-200">
        <h1 className="text-xl font-bold text-slate-900">Contract Generation</h1>
        <p className="text-sm text-slate-500">
          Create legally compliant contracts from templates
        </p>
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <Tabs
          tabs={[
            {
              id: 'templates',
              label: 'Select Template',
              content: (
                <div>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search templates..."
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contractTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={handleTemplateSelect}
                        isSelected={selectedTemplate?.id === template.id}
                      />
                    ))}
                  </div>
                </div>
              ),
            },
            {
              id: 'customize',
              label: 'Customize Contract',
              content: selectedTemplate ? (
                <div>
                  <Card>
                    <h3 className="text-lg font-semibold mb-4">
                      {selectedTemplate.name} - Customize
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      Fill in the required information to generate your contract
                    </p>
                    
                    <form onSubmit={handleGenerateContract}>
                      <div className="space-y-6">
                        {selectedTemplate.variables.map((variable) => (
                          <div key={variable.id}>
                            <label
                              htmlFor={variable.id}
                              className="block text-sm font-medium text-slate-700 mb-1"
                            >
                              {variable.name}
                              {variable.required && <span className="text-red-500">*</span>}
                            </label>
                            <p className="text-xs text-slate-500 mb-2">
                              {variable.description}
                            </p>
                            <TemplateVariableInput
                              variable={variable}
                              value={formValues[variable.id] || ''}
                              onChange={handleVariableChange}
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <Button
                          type="submit"
                          variant="primary"
                          icon={<FilePlus size={16} />}
                          disabled={!isFormValid()}
                        >
                          Generate Contract
                        </Button>
                      </div>
                    </form>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto" />
                  <h3 className="mt-2 text-lg font-medium text-slate-900">
                    No Template Selected
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Select a template first to customize your contract
                  </p>
                </div>
              ),
            },
            {
              id: 'preview',
              label: 'Preview & Download',
              content: selectedTemplate && isPreviewReady ? (
                <ContractPreview template={selectedTemplate} values={formValues} />
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-400 mx-auto" />
                  <h3 className="mt-2 text-lg font-medium text-slate-900">
                    No Contract Generated Yet
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Complete the previous steps to generate your contract
                  </p>
                </div>
              ),
            },
          ]}
          defaultTabId={activeTab}
          onChange={setActiveTab}
        />
      </div>
    </div>
  );
};

export default ContractGenerationModule;