"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiService, Agent, Tool } from "@/services/api";
import {
  Bot,
  Database,
  Wrench,
  Code2,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Info,
  Upload,
  X,
  FileText,
} from "lucide-react";

interface KazuriChatProps {
  onConfigureAgent?: (agent: Agent) => void;
}

const AGENT_TYPES = [
  {
    id: "CONVERSATIONAL",
    name: "Conversational Agent",
    icon: Bot,
    description: "Natural conversation and general assistance",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: [
      "Natural language understanding",
      "Multi-turn conversations",
      "General knowledge assistance",
      "Contextual responses"
    ]
  },
  {
    id: "RAG",
    name: "Document Assistant",
    icon: Database,
    description: "Answers questions based on your documents",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    features: [
      "Document analysis",
      "Contextual answers",
      "Knowledge base support",
      "File processing"
    ]
  },
  {
    id: "TOOL_CALLING",
    name: "Tool-Using Agent",
    icon: Wrench,
    description: "Uses external tools and APIs to accomplish tasks",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: [
      "API integration",
      "Tool orchestration",
      "Task automation",
      "System integration"
    ]
  },
  {
    id: "CODING",
    name: "Coding Assistant",
    icon: Code2,
    description: "Helps with code and development tasks",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    features: [
      "Code generation",
      "Bug fixing",
      "Code explanation",
      "Best practices"
    ]
  }
];

const ACCEPTED_FILE_TYPES = [
  '.pdf', '.doc', '.docx', '.txt', '.csv', 
  '.xlsx', '.xls', '.pptx', '.ppt', '.md'
];

export default function KazuriChat({ onConfigureAgent }: KazuriChatProps) {
  // Basic form states
  const [agentType, setAgentType] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Document and tool states
  const [documents, setDocuments] = useState<File[]>([]);
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(false);

  // Auto-dismiss success message after 5 seconds
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (success) {
      timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 5000); // 5 seconds
    }

    // Cleanup on unmount or when success changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [success]);

  // Fetch tools when tool_calling is selected
  useEffect(() => {
    if (agentType === 'TOOL_CALLING') {
      const fetchTools = async () => {
        setIsLoadingTools(true);
        try {
          const availableTools = await apiService.listTools();
          setTools(availableTools);
        } catch (error) {
          console.error('Failed to fetch tools:', error);
          setError('Failed to load available tools');
        } finally {
          setIsLoadingTools(false);
        }
      };
      fetchTools();
    }
  }, [agentType]);

  // Document handling
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => 
        ACCEPTED_FILE_TYPES.some(type => file.name.toLowerCase().endsWith(type))
      );
      
      if (validFiles.length !== files.length) {
        setError('Some files were skipped due to unsupported file types');
      }
      
      setDocuments(prev => [...prev, ...validFiles]);
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // Tool selection
  const toggleTool = (toolName: string) => {
    setSelectedTools(prev =>
      prev.includes(toolName)
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

  // Validation
  const isValid = name.trim() && 
    description.trim() && 
    agentType && 
    instructions.trim() &&
    (agentType !== 'RAG' || documents.length > 0) &&
    (agentType !== 'TOOL_CALLING' || selectedTools.length > 0);

  const handleCreateAgent = async () => {
    if (!isValid) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      // Base configuration that's common for all agent types
      let configuration: any = {
        description: description.trim(),
        instructions: instructions.trim(),
      };

      // Add type-specific configuration
      switch (agentType) {
        case 'TOOL_CALLING':
          configuration = {
            ...configuration,
            tools: selectedTools.length > 0 ? selectedTools : ['Multiply', 'Add', 'web_search_brave'], // Provide default tools if none selected
            tools_config: {
              allow_parallel: false,
              timeout: 30
            },
            prompt_template: `Instructions: ${instructions.trim()}

        You are an AI assistant that can use tools to help accomplish tasks.
        Available Tools: ${selectedTools.length > 0 ? selectedTools.join(', ') : 'Multiply, Add, web_search_brave'}

        User Request: {input}`
          };
          break;

        case 'RAG':
          configuration = {
            ...configuration,
            supported_formats: ACCEPTED_FILE_TYPES,
            document_count: documents.length,
            embedding_model: "all-MiniLM-L6-v2",
            prompt_template: `Instructions: ${instructions.trim()}

You are an AI assistant that can answer questions based on provided documents.
Please provide accurate answers based on the document content.

Question: {input}`
          };
          break;

        case 'CODING':
          configuration = {
            ...configuration,
            supported_languages: [
              "python", "javascript", "typescript",
              "java", "c++", "go", "rust"
            ],
            prompt_templates: {
              generate: `Instructions: ${instructions.trim()}
You are an expert developer.
Please write clean, well-documented code in response to: {input}`,
              troubleshoot: `Instructions: ${instructions.trim()}
You are an expert developer.
Please analyze and fix the following code issue: {input}`,
              explain: `Instructions: ${instructions.trim()}
You are an expert developer.
Please explain the following code: {input}`
            }
          };
          break;

        case 'CONVERSATIONAL':
          configuration = {
            ...configuration,
            prompt_template: `System: You are a helpful AI assistant called kazuri.
Instructions: ${instructions.trim()}

Remember to always follow the above instructions in your responses.

User: {input}
Assistant:`
          };
          break;
      }

      // Create the agent
      const newAgent = await apiService.createAgent({
        name: name.trim(),
        type: agentType,
        configuration: configuration
      });

      // Handle document upload for RAG agents
      if (agentType === 'RAG' && documents.length > 0) {
        try {
          for (const document of documents) {
            await apiService.uploadDocument(newAgent.id, document);
          }
        } catch (uploadError) {
          console.error('Document upload error:', uploadError);
          const errorMessage = uploadError instanceof Error 
            ? uploadError.message 
            : 'Unknown error occurred during document upload';
          setError(`Agent created but document upload failed: ${errorMessage}`);
          return;
        }
      }
      
      setSuccess(true);
      if (onConfigureAgent) {
        onConfigureAgent(newAgent);
      }
      
      // Reset form
      setName("");
      setDescription("");
      setInstructions("");
      setAgentType("");
      setDocuments([]);
      setSelectedTools([]);
      
    } catch (err) {
      console.error('Agent creation error:', err);
      setError(err instanceof Error ? err.message : "Failed to create agent");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Create New Agent</h1>
        <p className="text-gray-500">Choose your agent type and configure its capabilities</p>
      </div>

      {/* Agent Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AGENT_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = agentType === type.id;
          
          return (
            <div
              key={type.id}
              onClick={() => {
                setAgentType(type.id);
                setError("");
              }}
              className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50/50 shadow-sm' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              {isSelected && (
                <CheckCircle2 className="absolute top-4 right-4 w-5 h-5 text-blue-500" />
              )}
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${type.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                </div>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                      <PlusCircle className="w-4 h-4 text-gray-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Configuration Form */}
      {agentType && (
        <div className="bg-white rounded-xl border p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <label className="block">
              <span className="text-gray-700 font-medium">Agent Name</span>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Give your agent a name"
                className="mt-1"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What will this agent do? Be specific about its purpose."
                rows={3}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </label>

            <label className="block">
              <span className="text-gray-700 font-medium">Instructions</span>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Provide specific instructions for how the agent should behave and respond"
                rows={4}
                className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
            </label>
          </div>

          {/* Document Upload for RAG */}
          {agentType === 'RAG' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Upload Documents</h3>
                {documents.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {documents.length} document(s) selected
                  </span>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <Input
                  type="file"
                  onChange={handleDocumentUpload}
                  className="hidden"
                  id="document-upload"
                  multiple
                  accept={ACCEPTED_FILE_TYPES.join(',')}
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Drop files here or click to upload
                  </span>
                  <span className="text-xs text-gray-400">
                    Supports: {ACCEPTED_FILE_TYPES.join(', ')}
                  </span>
                </label>
              </div>

              {/* Document List */}
              {documents.length > 0 && (
                <div className="space-y-2">
                  {documents.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{doc.name}</span>
                      </div>
                      <button
                        onClick={() => removeDocument(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tool Selection for TOOL_CALLING */}
          {agentType === 'TOOL_CALLING' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Select Tools</h3>
                {selectedTools.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {selectedTools.length} tool(s) selected
                  </span>
                )}
              </div>
              
              {isLoadingTools ? (
                <div className="text-center py-4">Loading available tools...</div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {tools.map((tool) => (
                    <div
                      key={tool.name}
                      onClick={() => toggleTool(tool.name)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTools.includes(tool.name)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{tool.name}</span>
                        {selectedTools.includes(tool.name) && (
                          <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Configuration Tips */}
          <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Configuration Tips for {AGENT_TYPES.find(t => t.id === agentType)?.name}:</p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {agentType === 'RAG' && [
                  'Upload relevant documents for your agent to reference.',
                  'Supported formats include PDF, DOC, TXT, and more.',
                  'Add clear instructions about how to use the documents.',
                  'Larger documents may take longer to process.'
                ].map((tip, i) => <li key={i}>{tip}</li>)}
                
                {agentType === 'TOOL_CALLING' && [
                  'Select tools that match your agent\'s purpose.',
                  'Combine multiple tools for complex tasks.',
                  'Provide clear instructions for tool usage.',
                  'Tools can be added or removed later.'
                ].map((tip, i) => <li key={i}>{tip}</li>)}
                
                {agentType === 'CONVERSATIONAL' && [
                  'Be specific about the agent\'s purpose and tone.',
                  'Add example conversations in the instructions.',
                  'Define any specific knowledge domains.',
                  'Include any response constraints or formats.'
                ].map((tip, i) => <li key={i}>{tip}</li>)}
                
                {agentType === 'CODING' && [
                  'Specify preferred programming languages.',
                  'Define coding style and documentation requirements.',
                  'Include any specific libraries or frameworks to focus on.',
                  'Add examples of desired code format in instructions.'
                ].map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Error and Success Messages */}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="mt-4 bg-green-50 text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Agent created successfully! You can now test it in the agent hub.
          </AlertDescription>
        </Alert>
      )}

      {/* Create Button */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleCreateAgent}
          disabled={!isValid || isLoading}
          className={`px-8 py-2 rounded-lg transition-all ${
            isValid && !isLoading 
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Creating Agent...
            </div>
          ) : (
            'Create Agent'
          )}
        </Button>
      </div>
    </div>
  );
}