"use client";
import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, User, Send, X, Minimize } from 'lucide-react';
import { apiService, Agent } from "@/services/api";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


// Interfaces
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AgentCard {
  id: number;
  name: string;
  description: string;
  selected: boolean;
}

export interface AgentTestRef {
  addAgentCard: (info: { id: number; name: string; description: string }) => void;
}

// Typing Indicator for chat loading state
const TypingIndicator = () => (
  <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
  </div>
);

// Chat Message Component
const ChatMessage = ({ message }: { message: Message }) => {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex items-start max-w-[80%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
          ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-blue-600" />
          ) : (
            <Bot className="h-4 w-4 text-gray-600" />
          )}
        </div>
        <div className={`rounded-lg px-4 py-2 ${
          isUser ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm'
        }`}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm whitespace-pre-wrap prose prose-sm">{message.content}</ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
};

// Slide-out Chat Panel Component
const ChatPanel = ({
  agent,
  messages,
  isLoading,
  onClose,
  onMinimize,
  onSend,
  inputValue,
  onInputChange
}: {
  agent: AgentCard;
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onSend: () => void;
  inputValue: string;
  onInputChange: (value: string) => void;
}) => (
  <motion.div
    initial={{ x: "100%" }}
    animate={{ x: 0 }}
    exit={{ x: "100%" }}
    transition={{ type: "spring", damping: 25 }}
    className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
  >
    {/* Chat Header */}
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

    {/* Chat Messages */}
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.map((msg, i) => (
        <ChatMessage key={i} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
    </div>

    {/* Chat Input */}
    <div className="p-4 border-t bg-white">
      <div className="flex items-center gap-2">
        <Input
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
          onClick={onSend} 
          disabled={isLoading || !inputValue.trim()}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </motion.div>
);

// Main Component
const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
  // State
  const [agents, setAgents] = useState<AgentCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(null);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  // Fetch agents on mount
  useEffect(() => {
    const fetchExistingAgents = async () => {
      try {
        setIsLoading(true);
        const dbAgents = await apiService.listAgents();
        const agentCards = dbAgents.map((a: Agent) => ({
          id: a.id,
          name: a.name,
          description: a.configuration?.description ?? "",
          selected: false,
        }));
        setAgents(agentCards);
      } catch (error) {
        console.error("Failed to fetch existing agents:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingAgents();
  }, []);

  // Add agent method for parent
  useImperativeHandle(ref, () => ({
    addAgentCard(info) {
      const newCard: AgentCard = {
        id: info.id,
        name: info.name,
        description: info.description,
        selected: false,
      };
      setAgents((prev) => [...prev, newCard]);
    },
  }));

  // Handle selecting an agent card
  const handleSelectCard = (index: number) => {
    setAgents((prev) =>
      prev.map((agent, i) => ({
        ...agent,
        selected: i === index,
      }))
    );
  };

  // Handle opening chat for an agent
  const handleOpenChat = (agent: AgentCard) => {
    setActiveChatAgent(agent);
    setIsChatMinimized(false);
    setMessages([]); // Clear messages for new chat
  };

  // Handle closing chat
  const handleCloseChat = () => {
    setActiveChatAgent(null);
    setMessages([]);
    setChatInput("");
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!activeChatAgent || !chatInput.trim()) return;

    const userText = chatInput.trim();
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    setChatInput("");

    try {
      setIsLoading(true);
      const response = await apiService.queryAgent(activeChatAgent.id, userText);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.response },
      ]);
    } catch (error) {
      console.error("Failed to get response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get selected agent index
  const selectedIndex = agents.findIndex((a) => a.selected);
  const hasSelected = selectedIndex !== -1;

  // Delete agent handler
  const handleDeleteAgent = async () => {
    if (!hasSelected) return;
    const agent = agents[selectedIndex];

    try {
      setIsLoading(true);
      await apiService.deleteAgent(agent.id);
      setAgents((prev) => prev.filter((a) => a.id !== agent.id));
      if (activeChatAgent?.id === agent.id) {
        handleCloseChat();
      }
    } catch (error) {
      console.error("Failed to delete agent:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Publish agent handler (placeholder)
  const handlePublishAgent = () => {
    if (!hasSelected) return;
    const agent = agents[selectedIndex];
    alert(`Publishing agent: ${agent.name}`);
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
        {/* Empty State */}
        {agents.length === 0 && !isLoading && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-500">No agents created yet. Configure an agent to get started.</p>
          </div>
        )}

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map((agent, index) => (
            <div
              key={agent.id}
              className={`p-4 border rounded-lg transition-all duration-200
                ${agent.selected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
            >
              <div 
                className="mb-3 cursor-pointer" 
                onClick={() => handleSelectCard(index)}
              >
                <h3 className="font-medium mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenChat(agent)}
                >
                  Test Agent
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <Button
            onClick={handlePublishAgent}
            disabled={!hasSelected}
            className="px-6"
          >
            Publish
          </Button>
          <Button
            onClick={handleDeleteAgent}
            variant="destructive"
            disabled={!hasSelected}
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
            className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer"
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