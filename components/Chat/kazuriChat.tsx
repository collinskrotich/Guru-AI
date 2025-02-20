// KazuriChat
"use client";

import React, { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
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
  X
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
      "Contextual responses",
    ],
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
      "File processing",
    ],
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
      "System integration",
    ],
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
      "Best practices",
    ],
  },
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

  // Tool states
  const [tools, setTools] = useState<Tool[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(false);

  // New tool creation states
  const [toolCreationMode, setToolCreationMode] = useState<"description" | "code">("description");
  const [newToolName, setNewToolName] = useState("");
  const [newToolDescription, setNewToolDescription] = useState("");
  const [newToolCode, setNewToolCode] = useState("");
  const [toolCreationLoading, setToolCreationLoading] = useState(false);
  const [toolCreationError, setToolCreationError] = useState("");
  const [toolCreationSuccess, setToolCreationSuccess] = useState(false);

  // Auto-dismiss success messages
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (success) {
      timeoutId = setTimeout(() => setSuccess(false), 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [success]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (toolCreationSuccess) {
      timeoutId = setTimeout(() => setToolCreationSuccess(false), 5000);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [toolCreationSuccess]);

  // Fetch tools when agentType is TOOL_CALLING
  useEffect(() => {
    if (agentType === "TOOL_CALLING") {
      const fetchTools = async () => {
        setIsLoadingTools(true);
        try {
          const availableTools = await apiService.listTools();
          setTools(availableTools);
        } catch (error) {
          console.error("Failed to fetch tools:", error);
          setError("Failed to load available tools");
        } finally {
          setIsLoadingTools(false);
        }
      };
      fetchTools();
    }
  }, [agentType]);

  // Toggle tool selection
  const toggleTool = (toolName: string) => {
    setSelectedTools((prev) =>
      prev.includes(toolName)
        ? prev.filter((t) => t !== toolName)
        : [...prev, toolName]
    );
  };

  // Form validation
  const isValid =
    name.trim() &&
    description.trim() &&
    agentType &&
    instructions.trim() &&
    (agentType !== "TOOL_CALLING" || selectedTools.length > 0);

    
  const handleCreateAgent = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError("");

    try {
      let configuration: any = {
        description: description.trim(),
        instructions: instructions.trim(),
      };

      switch (agentType) {
        case "TOOL_CALLING":
          configuration = {
            ...configuration,
            tools: selectedTools,
            tools_config: {
              allow_parallel: false,
              timeout: 30,
            },
            prompt_template: `Instructions: ${instructions.trim()}

You are an AI assistant that can use tools to help accomplish tasks.
Available Tools: ${selectedTools.join(", ")}

User Request: {input}`,
          };
          break;

        case "RAG":
          configuration = {
            ...configuration,
            type: "RAG",
            embedding_model: "all-MiniLM-L6-v2",
            prompt_template: `Instructions: ${instructions.trim()}

You are an AI assistant that can answer questions based on provided documents.
Please provide accurate answers based on the document content.

Question: {input}`,
          };
          break;

        case "CODING":
          configuration = {
            ...configuration,
            supported_languages: [
              "python",
              "javascript",
              "typescript",
              "java",
              "c++",
              "go",
              "rust",
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
Please explain the following code: {input}`,
            },
          };
          break;

        case "CONVERSATIONAL":
          configuration = {
            ...configuration,
            prompt_template: `System: You are a helpful AI assistant called kazuri.
Instructions: ${instructions.trim()}

Remember to always follow the above instructions in your responses.

User: {input}
Assistant:`,
          };
          break;
      }

      // const newAgent = await apiService.createAgent({
      //   name: name.trim(),
      //   type: agentType,
      //   configuration: configuration,
      // });

  //     const newAgent = await apiService.createAgent({
  //       name: name.trim(),
  //       type: agentType.toUpperCase(), // Make sure it's uppercase when creating
  //       configuration: {
  //         ...configuration,
  //         type: agentType.toUpperCase(), // Also include in configuration
  //       },
  //     });

  //     setSuccess(true);
  //     if (onConfigureAgent) {
  //       onConfigureAgent(newAgent);
  //     }

  //     // Reset form
  //     setName("");
  //     setDescription("");
  //     setInstructions("");
  //     setAgentType("");
  //     setSelectedTools([]);

  //   } catch (err) {
  //     console.error("Agent creation error:", err);
  //     setError(err instanceof Error ? err.message : "Failed to create agent");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
    const newAgent = await apiService.createAgent({
      name: name.trim(),
      type: agentType.toUpperCase(),
      configuration: configuration
    });

    console.log('New Agent Created:', newAgent); // Debug log

    if (onConfigureAgent) {
      // Pass the complete agent data
      onConfigureAgent({
        ...newAgent,
        type: agentType.toUpperCase(),
        configuration: {
          ...configuration,
          type: agentType.toUpperCase()
        }
      });
    }

    setSuccess(true);
    
    // Reset form
    setName("");
    setDescription("");
    setInstructions("");
    setAgentType("");
    setSelectedTools([]);
    
  } catch (err) {
    console.error("Agent creation error:", err);
    setError(err instanceof Error ? err.message : "Failed to create agent");
  } finally {
    setIsLoading(false);
  }
};
  // Tool Creation Handlers
  const handleCreateToolByDescription = async () => {
    setToolCreationError("");
    if (!newToolName.trim() || !newToolDescription.trim()) return;
    
    setToolCreationLoading(true);
    try {
      const tool = await apiService.createTool(newToolName.trim(), newToolDescription.trim());
      setTools((prev) => [...prev, tool]);
      setToolCreationSuccess(true);
      setNewToolName("");
      setNewToolDescription("");
    } catch (error) {
      setToolCreationError(
        error instanceof Error ? error.message : "Failed to create tool"
      );
    } finally {
      setToolCreationLoading(false);
    }
  };

  const handleDeleteTool = async (toolName: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the tool selection when clicking delete
    
    try {
      await apiService.deleteTool(toolName);
      setTools((prev) => prev.filter(tool => tool.name !== toolName));
      // Deselect the tool if it was selected
      if (selectedTools.includes(toolName)) {
        setSelectedTools(prev => prev.filter(t => t !== toolName));
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to delete tool");
    }
  };
   

  const handleCreateToolByCode = async () => {
    setToolCreationError("");
    if (!newToolName.trim() || !newToolCode.trim()) return;
    
    setToolCreationLoading(true);
    try {
      const tool = await apiService.createToolFromCode(newToolName.trim(), newToolCode.trim());
      setTools((prev) => [...prev, tool]);
      setToolCreationSuccess(true);
      setNewToolName("");
      setNewToolCode("");
    } catch (error) {
      setToolCreationError(
        error instanceof Error ? error.message : "Failed to create tool from code"
      );
    } finally {
      setToolCreationLoading(false);
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
              className={`relative p-6 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-blue-500 bg-blue-50/50 shadow-sm"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
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
  
          {/* TOOL_CALLING specific configuration */}
          {agentType === "TOOL_CALLING" && (
            <>
              {/* Existing Tools */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Select Existing Tools</h3>
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
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{tool.name}</span>
                          <div className="flex items-center gap-2">
                            {selectedTools.includes(tool.name) && (
                              <CheckCircle2 className="w-4 h-4 text-blue-500" />
                            )}
                            {!tool.is_sample && (
                              <button
                                onClick={(e) => handleDeleteTool(tool.name, e)}
                                className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* New Tool Creation Section */}
              <div className="mt-8 bg-white rounded-xl border p-6 space-y-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Add a New Tool</h3>
                
                {/* Toggle Buttons */}
                <div className="flex space-x-4">
                  <Button
                    variant={toolCreationMode === "description" ? "default" : "outline"}
                    onClick={() => {
                      setToolCreationMode("description");
                      setToolCreationError("");
                      setNewToolName("");
                      setNewToolDescription("");
                    }}
                  >
                    Create from Description
                  </Button>
                  <Button
                    variant={toolCreationMode === "code" ? "default" : "outline"}
                    onClick={() => {
                      setToolCreationMode("code");
                      setToolCreationError("");
                      setNewToolName("");
                      setNewToolCode("");
                    }}
                  >
                    Create from Code
                  </Button>
                </div>

                {/* Tool Creation Forms */}
                {toolCreationMode === "description" ? (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-700 font-medium">Tool Name</span>
                      <Input
                        value={newToolName}
                        onChange={(e) => setNewToolName(e.target.value)}
                        placeholder="Enter tool name"
                        className="mt-1"
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-700 font-medium">Tool Description</span>
                      <textarea
                        value={newToolDescription}
                        onChange={(e) => setNewToolDescription(e.target.value)}
                        placeholder="Describe what your tool should do eg. A tool that extracts URLs from text"
                        rows={3}
                        className="mt-1 w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </label>

                    <Button
                      onClick={handleCreateToolByDescription}
                      disabled={toolCreationLoading || !newToolName.trim() || !newToolDescription.trim()}
                      className="w-full"
                    >
                      {toolCreationLoading ? "Creating..." : "Create Tool"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="text-gray-700 font-medium">Tool Name</span>
                      <Input
                        value={newToolName}
                        onChange={(e) => setNewToolName(e.target.value)}
                        placeholder="Enter tool name"
                        className="mt-1"
                      />
                    </label>

                    <label className="block">
                      <span className="text-gray-700 font-medium">Python Code</span>
                      <div className="mt-1">
                        <Editor
                          value={newToolCode}
                          onValueChange={(code) => setNewToolCode(code)}
                          highlight={(code) => highlight(code, languages.python, "python")}
                          padding={10}
                          placeholder= {`def run(input_param: str) -> Dict[str, Any]:
    
      # Your code here
      result = {}
      
      return result`}
                          className="font-mono text-sm rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[200px] bg-gray-50"
                          style={{
                            fontFamily: '"Fira code", "Fira Mono", monospace',
                          }}
                        />
                      </div>
                    </label>

                    <Button
                      onClick={handleCreateToolByCode}
                      disabled={toolCreationLoading || !newToolName.trim() || !newToolCode.trim()}
                      className="w-full"
                    >
                      {toolCreationLoading ? "Creating..." : "Create Tool from Code"}
                    </Button>
                  </div>
                )}

                {/* Tool Creation Messages */}
                {toolCreationError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{toolCreationError}</AlertDescription>
                  </Alert>
                )}
                {toolCreationSuccess && (
                  <Alert className="bg-green-50 text-green-700 border border-green-200">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertDescription>Tool created successfully!</AlertDescription>
                  </Alert>
                )}
              </div>
            </>
          )}

          {/* Configuration Tips */}
          <div className="bg-blue-50 rounded-lg p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">
                Configuration Tips for {AGENT_TYPES.find((t) => t.id === agentType)?.name}:
              </p>
              <ul className="mt-2 space-y-1 list-disc list-inside">
                {agentType === "RAG" &&
                  [
                    "Add clear instructions about how to analyze documents.",
                    "Define the expected format of responses.",
                    "Specify how to handle multiple documents.",
                    "Include guidelines for document context.",
                  ].map((tip, i) => <li key={i}>{tip}</li>)}
                {agentType === "TOOL_CALLING" &&
                  [
                    "Select tools that match your agent's purpose.",
                    "Combine multiple tools for complex tasks.",
                    "Provide clear instructions for tool usage.",
                    "Tools can be added or removed later.",
                  ].map((tip, i) => <li key={i}>{tip}</li>)}
                {agentType === "CONVERSATIONAL" &&
                  [
                    "Be specific about the agent's purpose and tone.",
                    "Add example conversations in the instructions.",
                    "Define any specific knowledge domains.",
                    "Include any response constraints or formats.",
                  ].map((tip, i) => <li key={i}>{tip}</li>)}
                {agentType === "CODING" &&
                  [
                    "Specify preferred programming languages.",
                    "Define coding style and documentation requirements.",
                    "Include any specific libraries or frameworks to focus on.",
                    "Add examples of desired code format in instructions.",
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
        <Alert className="mt-4 bg-green-50 text-green-700 border border-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Agent created successfully! You can now test it in the agent hub.
          </AlertDescription>
        </Alert>
      )}

      {/* Create Agent Button */}
      <div className="flex justify-end mt-8">
        <Button
          onClick={handleCreateAgent}
          disabled={!isValid || isLoading}
          className="min-w-[150px]"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating...</span>
            </div>
          ) : (
            "Create Agent"
          )}
        </Button>
      </div>
    </div>
  );
}