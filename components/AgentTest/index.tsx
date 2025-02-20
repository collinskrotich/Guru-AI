
// the best so far
"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Send,
  X,
  Minimize,
  Database,
  Wrench,
  Code2,
  FileText,
  Upload,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { apiService, Agent } from "@/services/api";

// ---------- TYPES & INTERFACES ---------- //
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentCard {
  id: number;
  name: string;
  description: string;
  type: string;
  selected: boolean;
}

export interface AgentTestRef {
  addAgentCard: (agent: Agent) => void;
}

// ---------- ChatMessage Component ---------- //
const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex items-start max-w-[80%] gap-2 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
          ${isUser ? "bg-blue-100" : "bg-gray-100"}`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-blue-600" />
          ) : (
            <Bot className="h-4 w-4 text-gray-600" />
          )}
        </div>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
          }`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="text-sm prose prose-sm"
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

// ---------- ChatPanel Component ---------- //
interface ChatPanelProps {
  agent: AgentCard;
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSend: (message?: string) => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}

const ACCEPTED_FILE_TYPES = [
  ".pdf",
  ".doc",
  ".docx",
  ".txt",
  ".csv",
  ".xlsx",
  ".xls",
  ".pptx",
  ".ppt",
  ".md",
];

const ChatPanel: React.FC<ChatPanelProps> = ({
  agent,
  messages,
  isLoading,
  onClose,
  onMinimize,
  onSend,
  inputValue,
  onInputChange,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  // Handle file uploads during chat
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    if (agent.type?.toUpperCase() !== "RAG") {
        onSend("This agent is not a RAG agent, so it can't process documents.");
        return;
    }

    setIsUploading(true);

    try {
        const validFiles = files.filter((file) =>
            ACCEPTED_FILE_TYPES.some((ext) => 
                file.name.toLowerCase().endsWith(ext)
            )
        );

        if (validFiles.length === 0) {
            onSend(`Please upload valid file types: ${ACCEPTED_FILE_TYPES.join(", ")}`);
            return;
        }

        for (const file of validFiles) {
            try {
                const result = await apiService.uploadDocument(agent.id, file);
                
                if (result && !result.detail) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    onSend(`Successfully uploaded ${file.name}. You can now ask questions about it.`);
                } else {
                    throw new Error(result.detail || 'Upload failed');
                }
            } catch (error) {
                console.error(`Failed to upload ${file.name}:`, error);
                onSend(`Failed to upload ${file.name}. ${error instanceof Error ? error.message : String(error)}`);
                break;
            }
        }
    } catch (error) {
        console.error('Upload process error:', error);
        onSend(
            "Document upload failed. Error: " +
            (error instanceof Error ? error.message : String(error))
        );
    } finally {
        setIsUploading(false);
        if (event.target) {
            event.target.value = '';
        }
    }
};

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium">{agent.name}</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="h-8 w-8"
          >
            <Minimize className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* File Upload UI - ONLY show if RAG */}
      {agent.type?.toUpperCase() === "RAG" && (
        <div className="p-4 border-b">
          <div className="flex items-center mb-2 justify-between">
            <h3 className="text-sm font-medium text-gray-900">
              Upload Documents
            </h3>
            {isUploading && (
              <span className="text-xs text-blue-500 font-medium">
                Uploading...
              </span>
            )}
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <form encType="multipart/form-data" method="post">
              <input
                type="file"
                name="file"
                onChange={handleFileUpload}
                className="hidden"
                id="chat-document-upload"
                multiple
                accept={ACCEPTED_FILE_TYPES.join(",")}
              />
              <label
                htmlFor="chat-document-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Drop files here or click to upload
                </span>
                <span className="text-xs text-gray-400">
                  Supports: {ACCEPTED_FILE_TYPES.join(", ")}
                </span>
              </label>
            </form>
          </div>
        </div>
      )}

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && (
          <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        )}
      </div>

      {/* INPUT */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <Input
            id="chat-message-input"  // Added id
            name="message"           // Added name
            value={inputValue}
            onChange={(e) => onInputChange(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <Button
            onClick={() => onSend()}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
// ---------- MAIN AgentTest Component ---------- //
const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
  const [agents, setAgents] = useState<AgentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(
    null
  );
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  // Fetch existing agents
  useEffect(() => {
    const fetchExistingAgents = async () => {
      try {
        setIsLoading(true);
        const dbAgents = await apiService.listAgents();
        const agentCards = dbAgents.map((a: Agent) => ({
          id: a.id,
          name: a.name,
          description: a.configuration?.description ?? "",
          type: a.type?.toUpperCase(),
          selected: false,
        }));
        setAgents(agentCards);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExistingAgents();
  }, []);

  // Expose addAgentCard method, if needed
  // useImperativeHandle(ref, () => ({
  //   addAgentCard(agent: Agent) {
  //     const newCard: AgentCard = {
  //       id: agent.id,
  //       name: agent.name,
  //       description: agent.configuration?.description ?? "",
  //       type: agent.type?.toUpperCase(),
  //       selected: false,
  //     };
  //     setAgents((prev) => [...prev, newCard]);
  //   },
  // }));

  useImperativeHandle(ref, () => ({
    addAgentCard(agent: Agent) {
      console.log('Adding new agent card:', agent); // Debug log
  
      const newCard: AgentCard = {
        id: agent.id,
        name: agent.name,
        description: agent.configuration?.description?? "",
        type: agent.type?.toUpperCase(),
        selected: false,
      };
  
      // Force immediate state update
      setAgents(prevAgents => {
        const updatedAgents = [...prevAgents, newCard];
        console.log('Updated agents state:', updatedAgents); // Debug log
        return updatedAgents;
      });
    }
  }), []);
  
  // Add a useEffect to monitor agents state changes
  useEffect(() => {
    console.log('Agents state updated:', agents);
  }, [agents]);

  
  // Select a card
  const handleSelectCard = (index: number) => {
    setAgents((prev) =>
      prev.map((agent, i) => ({
        ...agent,
        selected: i === index,
      }))
    );
  };

  // Open/Close chat
  const handleOpenChat = (agent: AgentCard) => {
    setActiveChatAgent(agent);
    setIsChatMinimized(false);
    setMessages([]);
    setChatInput("");
  };
  const handleCloseChat = () => {
    setActiveChatAgent(null);
    setMessages([]);
    setChatInput("");
  };

  // Send message
  const handleSendMessage = async (overrideText?: string) => {
    if (!activeChatAgent) return;
    const textToSend = overrideText ?? chatInput.trim();
    if (!textToSend) return;

    // Add user message
    const role = overrideText ? "assistant" : "user";
    setMessages((prev) => [...prev, { role, content: textToSend }]);

    if (!overrideText) {
      // Query the agent
      setChatInput("");
      try {
        setIsLoading(true);
        const response = await apiService.queryAgent(
          activeChatAgent.id,
          textToSend
        );
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: response.response },
        ]);
      } catch (error) {
        console.error("Failed to get agent response:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, something went wrong. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Delete agent
  const handleDeleteAgent = async () => {
    const selectedAgent = agents.find((a) => a.selected);
    if (!selectedAgent) return;
    try {
      setIsLoading(true);
      await apiService.deleteAgent(selectedAgent.id);
      setAgents((prev) => prev.filter((a) => a.id !== selectedAgent.id));
      if (activeChatAgent?.id === selectedAgent.id) {
        handleCloseChat();
      }
    } catch (error) {
      console.error("Failed to delete agent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Publish agent
  const handlePublishAgent = () => {
    const selectedAgent = agents.find((a) => a.selected);
    if (!selectedAgent) return;
    alert(`Publishing agent: ${selectedAgent.name}`);
  };

  return (
    <Card className="bg-white h-full flex flex-col relative">
      <CardHeader>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
          <p className="text-gray-500">Your AI assistants at your service</p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-6">
        {/* If no agents */}
        {agents.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">
              No agents created yet. Configure an agent to get started.
            </p>
          </div>
        )}

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`p-4 border rounded-lg transition-all duration-200
                ${
                  agent.selected
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                }`}
            >
              <div
                className="mb-3 cursor-pointer"
                onClick={() => handleSelectCard(index)}
              >
                <h3 className="font-medium mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {agent.description}
                </p>
                {agent.type === "RAG" && (
                  <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    <Database className="w-3 h-3 mr-1" />
                    Document Assistant
                  </span>
                )}
                {agent.type === "CONVERSATIONAL" && (
                  <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <Bot className="w-3 h-3 mr-1" />
                    Conversational
                  </span>
                )}
                {agent.type === "TOOL_CALLING" && (
                  <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Wrench className="w-3 h-3 mr-1" />
                    Tool Assistant
                  </span>
                )}
                {agent.type === "CODING" && (
                  <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    <Code2 className="w-3 h-3 mr-1" />
                    Coding
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => handleOpenChat(agent)}>
                  Test Agent
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button onClick={handlePublishAgent} disabled={!agents.some(a => a.selected)} className="px-6">
            Publish
          </Button>
          <Button
            onClick={handleDeleteAgent}
            variant="destructive"
            disabled={!agents.some(a => a.selected)}
            className="px-6"
          >
            Delete
          </Button>
        </div>

        {/* Chat Panel */}
        <AnimatePresence>
          {activeChatAgent && !isChatMinimized && (
            <ChatPanel
              agent={activeChatAgent}
              messages={messages}
              isLoading={isLoading}
              onClose={handleCloseChat}
              onMinimize={() => setIsChatMinimized(true)}
              onSend={handleSendMessage}
              inputValue={chatInput}
              onInputChange={(value) => setChatInput(value)}
            />
          )}
        </AnimatePresence>

        {/* Minimized Chat */}
        {activeChatAgent && isChatMinimized && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer z-50"
            onClick={() => setIsChatMinimized(false)}
          >
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-blue-500" />
              <span>{activeChatAgent.name}</span>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
});

export default AgentTest;

