// "use client";
// import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Bot, User, Send, X, Minimize } from 'lucide-react';
// import { apiService, Agent } from "@/services/api";
// import { motion, AnimatePresence } from "framer-motion";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";


// // Interfaces
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (info: { id: number; name: string; description: string }) => void;
// }

// // Typing Indicator for chat loading state
// const TypingIndicator = () => (
//   <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//   </div>
// );

// // Chat Message Component
// const ChatMessage = ({ message }: { message: Message }) => {
//   const isUser = message.role === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
//     >
//       <div className={`flex items-start max-w-[80%] gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
//         <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
//           ${isUser ? 'bg-blue-100' : 'bg-gray-100'}`}
//         >
//           {isUser ? (
//             <User className="h-4 w-4 text-blue-600" />
//           ) : (
//             <Bot className="h-4 w-4 text-gray-600" />
//           )}
//         </div>
//         <div className={`rounded-lg px-4 py-2 ${
//           isUser ? 'bg-blue-600 text-white' : 'bg-white border shadow-sm'
//         }`}>
//           <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm whitespace-pre-wrap prose prose-sm">{message.content}</ReactMarkdown>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Slide-out Chat Panel Component
// const ChatPanel = ({
//   agent,
//   messages,
//   isLoading,
//   onClose,
//   onMinimize,
//   onSend,
//   inputValue,
//   onInputChange
// }: {
//   agent: AgentCard;
//   messages: Message[];
//   isLoading: boolean;
//   onClose: () => void;
//   onMinimize: () => void;
//   onSend: () => void;
//   inputValue: string;
//   onInputChange: (value: string) => void;
// }) => (
//   <motion.div
//     initial={{ x: "100%" }}
//     animate={{ x: 0 }}
//     exit={{ x: "100%" }}
//     transition={{ type: "spring", damping: 25 }}
//     className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
//   >
//     {/* Chat Header */}
//     <div className="px-4 py-3 border-b flex items-center justify-between">
//       <div className="flex items-center gap-2">
//         <Bot className="h-5 w-5 text-blue-600" />
//         <h3 className="font-medium">{agent.name}</h3>
//       </div>
//       <div className="flex items-center gap-1">
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           onClick={onMinimize}
//           className="h-8 w-8"
//         >
//           <Minimize className="h-4 w-4" />
//         </Button>
//         <Button 
//           variant="ghost" 
//           size="icon" 
//           onClick={onClose}
//           className="h-8 w-8"
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>

//     {/* Chat Messages */}
//     <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//       {messages.map((msg, i) => (
//         <ChatMessage key={i} message={msg} />
//       ))}
//       {isLoading && <TypingIndicator />}
//     </div>

//     {/* Chat Input */}
//     <div className="p-4 border-t bg-white">
//       <div className="flex items-center gap-2">
//         <Input
//           value={inputValue}
//           onChange={(e) => onInputChange(e.target.value)}
//           placeholder="Type your message..."
//           disabled={isLoading}
//           className="flex-1"
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               onSend();
//             }
//           }}
//         />
//         <Button 
//           onClick={onSend} 
//           disabled={isLoading || !inputValue.trim()}
//           size="icon"
//         >
//           <Send className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   </motion.div>
// );

// // Main Component
// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   // State
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatInput, setChatInput] = useState("");
//   const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(null);
//   const [isChatMinimized, setIsChatMinimized] = useState(false);

//   // Fetch agents on mount
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch existing agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // Add agent method for parent
//   useImperativeHandle(ref, () => ({
//     addAgentCard(info) {
//       const newCard: AgentCard = {
//         id: info.id,
//         name: info.name,
//         description: info.description,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   // Handle selecting an agent card
//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//   };

//   // Handle opening chat for an agent
//   const handleOpenChat = (agent: AgentCard) => {
//     setActiveChatAgent(agent);
//     setIsChatMinimized(false);
//     setMessages([]); // Clear messages for new chat
//   };

//   // Handle closing chat
//   const handleCloseChat = () => {
//     setActiveChatAgent(null);
//     setMessages([]);
//     setChatInput("");
//   };

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!activeChatAgent || !chatInput.trim()) return;

//     const userText = chatInput.trim();
//     setMessages((prev) => [...prev, { role: "user", content: userText }]);
//     setChatInput("");

//     try {
//       setIsLoading(true);
//       const response = await apiService.queryAgent(activeChatAgent.id, userText);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: response.response },
//       ]);
//     } catch (error) {
//       console.error("Failed to get response:", error);
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "Sorry, something went wrong. Please try again." },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Get selected agent index
//   const selectedIndex = agents.findIndex((a) => a.selected);
//   const hasSelected = selectedIndex !== -1;

//   // Delete agent handler
//   const handleDeleteAgent = async () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(agent.id);
//       setAgents((prev) => prev.filter((a) => a.id !== agent.id));
//       if (activeChatAgent?.id === agent.id) {
//         handleCloseChat();
//       }
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Publish agent handler (placeholder)
//   const handlePublishAgent = () => {
//     if (!hasSelected) return;
//     const agent = agents[selectedIndex];
//     alert(`Publishing agent: ${agent.name}`);
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       <CardHeader>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
//           <p className="text-gray-500">Your AI assistants at your service</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col space-y-6">
//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500">No agents created yet. Configure an agent to get started.</p>
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               className={`p-4 border rounded-lg transition-all duration-200
//                 ${agent.selected 
//                   ? 'border-blue-500 bg-blue-50 shadow-md' 
//                   : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
//                 }`}
//             >
//               <div 
//                 className="mb-3 cursor-pointer" 
//                 onClick={() => handleSelectCard(index)}
//               >
//                 <h3 className="font-medium mb-2">{agent.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">{agent.description}</p>
//               </div>
//               <div className="flex justify-end">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleOpenChat(agent)}
//                 >
//                   Test Agent
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <Button
//             onClick={handlePublishAgent}
//             disabled={!hasSelected}
//             className="px-6"
//           >
//             Publish
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!hasSelected}
//             className="px-6"
//           >
//             Delete
//           </Button>
//         </div>

//         {/* Chat Panel */}
//         <AnimatePresence>
//           {activeChatAgent && !isChatMinimized && (
//             <ChatPanel
//               agent={activeChatAgent}
//               messages={messages}
//               isLoading={isLoading}
//               onClose={handleCloseChat}
//               onMinimize={() => setIsChatMinimized(true)}
//               onSend={handleSendMessage}
//               inputValue={chatInput}
//               onInputChange={(value) => setChatInput(value)}
//             />
//           )}
//         </AnimatePresence>

//         {/* Minimized Chat */}
//         {activeChatAgent && isChatMinimized && (
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer"
//             onClick={() => setIsChatMinimized(false)}
//           >
//             <div className="flex items-center gap-2">
//               <Bot className="h-5 w-5 text-blue-500" />
//               <span>{activeChatAgent.name}</span>
//             </div>
//           </motion.div>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;

////////////////////////////////////////////////////////////////////////////////////////////////
// THE BEST IS ABOVE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// "use client";

// import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion, AnimatePresence } from "framer-motion";
// import { Bot, User, Send, X, Minimize, Database, Upload, FileText, Wrench, Code2 } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { apiService, Agent } from "@/services/api";

// // Interfaces
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   type: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (agent: Agent) => void;
// }

// // Chat Message Component
// const ChatMessage = ({ message }: { message: Message }) => {
//   const isUser = message.role === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
//     >
//       <div className={`flex items-start max-w-[80%] gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
//         <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
//           ${isUser ? "bg-blue-100" : "bg-gray-100"}`}
//         >
//           {isUser ? <User className="h-4 w-4 text-blue-600" /> : <Bot className="h-4 w-4 text-gray-600" />}
//         </div>
//         <div className={`rounded-lg px-4 py-2 ${isUser ? "bg-blue-600 text-white" : "bg-white border shadow-sm"}`}>
//           <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm prose prose-sm">
//             {message.content}
//           </ReactMarkdown>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Chat Panel Component
// interface ChatPanelProps {
//   agent: AgentCard;
//   messages: Message[];
//   isLoading: boolean;
//   onClose: () => void;
//   onMinimize: () => void;
//   onSend: (message?: string) => void;
//   inputValue: string;
//   onInputChange: (value: string) => void;
// }

// const ChatPanel: React.FC<ChatPanelProps> = ({
//   agent,
//   messages,
//   isLoading,
//   onClose,
//   onMinimize,
//   onSend,
//   inputValue,
//   onInputChange,
// }) => {
//   const [documents, setDocuments] = useState<File[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   console.log('Agent type in chat panel:', agent.type); 
//   const ACCEPTED_FILE_TYPES = [
//     '.pdf', '.doc', '.docx', '.txt', '.csv',
//     '.xlsx', '.xls', '.pptx', '.ppt', '.md'
//   ];

//   const [hasDocuments, setHasDocuments] = useState(false);

// // Modify handleFileUpload
// const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//   const files = Array.from(event.target.files || []);
//   if (files.length === 0) return;

//   const validFiles = files.filter(file => 
//     ACCEPTED_FILE_TYPES.some(type => file.name.toLowerCase().endsWith(type))
//   );
  
//   setIsUploading(true);

//   try {
//     for (const file of validFiles) {
//       await apiService.uploadDocument(agent.id, file);
//       // Add delay for processing
//       await new Promise(resolve => setTimeout(resolve, 2000));
//     }
    
//     setHasDocuments(true); // Mark that we have documents
    
//     // Test that documents are accessible
//     const testResponse = await apiService.queryAgent(
//       agent.id,
//       "Confirm you can access the uploaded documents."
//     );
    
//     if (testResponse.response.toLowerCase().includes("yes") || 
//         testResponse.response.toLowerCase().includes("confirm") ||
//         testResponse.response.toLowerCase().includes("access")) {
//       onSend(`Successfully uploaded and processed ${validFiles.length} document(s). You can now ask questions about them!`);
//     } else {
//       setHasDocuments(false);
//       onSend("Documents were uploaded but there might be an issue with processing. Please try uploading again.");
//     }
//   } catch (error) {
//     console.error("Upload error:", error);
//     setHasDocuments(false);
//     onSend(`Failed to upload documents: ${error instanceof Error ? error.message : "Unknown error"}`);
//   } finally {
//     setIsUploading(false);
//   }
// };

//   const removeDocument = (index: number) => {
//     setDocuments(prev => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "spring", damping: 25 }}
//       className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
//     >
//       {/* Header */}
//       <div className="px-4 py-3 border-b flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Bot className="h-5 w-5 text-blue-600" />
//           <h3 className="font-medium">{agent.name}</h3>
//         </div>
//         <div className="flex items-center gap-1">
//           <Button variant="ghost" size="icon" onClick={onMinimize} className="h-8 w-8">
//             <Minimize className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* File Upload UI - Only show for RAG agents */}
//       {agent.type?.toUpperCase() === "RAG" && (
//         <div className="p-4 border-b">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-sm font-medium text-gray-900">Upload Documents</h3>
//             {documents.length > 0 && (
//               <span className="text-xs text-gray-500">
//                 {documents.length} document(s) selected
//               </span>
//             )}
//           </div>
              
//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//             <Input
//               type="file"
//               onChange={handleFileUpload}
//               className="hidden"
//               id="chat-document-upload"
//               multiple
//               accept={ACCEPTED_FILE_TYPES.join(',')}
//             />
//             <label
//               htmlFor="chat-document-upload"
//               className="cursor-pointer flex flex-col items-center gap-2"
//             >
//               <Upload className="w-6 h-6 text-gray-400" />
//               <span className="text-sm text-gray-600">
//                 Drop files here or click to upload
//               </span>
//               <span className="text-xs text-gray-400">
//                 Supports: {ACCEPTED_FILE_TYPES.join(', ')}
//               </span>
//             </label>
//           </div>

//           {/* Document List */}
//           {documents.length > 0 && (
//             <div className="mt-2 space-y-2">
//               {documents.map((doc, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
//                 >
//                   <div className="flex items-center gap-2">
//                     <FileText className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">{doc.name}</span>
//                   </div>
//                   <button
//                     onClick={() => removeDocument(index)}
//                     className="text-gray-400 hover:text-red-500"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         {messages.map((msg, i) => (
//           <ChatMessage key={i} message={msg} />
//         ))}
//         {isLoading && (
//           <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//           </div>
//         )}
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t bg-white">
//         <div className="flex items-center gap-2">
//           <Input
//             value={inputValue}
//             onChange={(e) => onInputChange(e.target.value)}
//             placeholder="Type your message..."
//             disabled={isLoading}
//             className="flex-1"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 onSend();
//               }
//             }}
//           />
//           <Button
//             onClick={() => onSend()}
//             disabled={isLoading || !inputValue.trim()}
//             size="icon"
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main AgentTest Component
// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatInput, setChatInput] = useState("");
//   const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(null);
//   const [isChatMinimized, setIsChatMinimized] = useState(false);

//   // Fetch existing agents
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           type: a.type?.toUpperCase(),
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // Expose addAgentCard method
//   useImperativeHandle(ref, () => ({
//     addAgentCard(agent: Agent) {
//       console.log('Adding new agent:', agent);
//       const newCard: AgentCard = {
//         id: agent.id,
//         name: agent.name,
//         description: agent.configuration?.description ?? "",
//         type: agent.type,
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//   };

//   const handleOpenChat = (agent: AgentCard) => {
//     console.log('Opening chat with agent type:', agent.type); 
//     setActiveChatAgent(agent);
//     setIsChatMinimized(false);
//     setMessages([]);
//     setChatInput("");
//   };

//   const handleCloseChat = () => {
//     setActiveChatAgent(null);
//     setMessages([]);
//     setChatInput("");
//   };

//   const handleSendMessage = async (overrideText?: string) => {
//     if (!activeChatAgent) return;
  
//     const textToSend = overrideText ?? chatInput.trim();
//     if (!textToSend) return;
  
//     const role = overrideText ? "assistant" : "user";
//     setMessages((prev) => [...prev, { role, content: textToSend }]);
  
//     if (!overrideText) {
//       setChatInput("");
//       try {
//         setIsLoading(true);
        
//         // If it's a RAG agent and no documents, send appropriate message
//         if (agent.type?.toUpperCase() === "RAG" && !hasDocuments) {
//           setMessages((prev) => [
//             ...prev,
//             {
//               role: "assistant",
//               content: "Please upload a document first. I need a document to answer questions from.",
//             },
//           ]);
//           return;
//         }
  
//         const response = await apiService.queryAgent(activeChatAgent.id, textToSend);
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: response.response },
//         ]);
//       } catch (error) {
//         console.error("Failed to get agent response:", error);
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, something went wrong. Please try again.",
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleDeleteAgent = async () => {
//     const selectedAgent = agents.find(a => a.selected);
//     if (!selectedAgent) return;

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(selectedAgent.id);
//       setAgents(prev => prev.filter(a => a.id !== selectedAgent.id));
      
//       // If we had that agent open in chat, close it
//       if (activeChatAgent?.id === selectedAgent.id) {
//         handleCloseChat();
//       }
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePublishAgent = () => {
//     const selectedAgent = agents.find(a => a.selected);
//     if (!selectedAgent) return;
    
//     // Your publish logic here
//     alert(`Publishing agent: ${selectedAgent.name}`);
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       <CardHeader>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
//           <p className="text-gray-500">Your AI assistants at your service</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col space-y-6">
//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500">
//               No agents created yet. Configure an agent to get started.
//             </p>
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               className={`p-4 border rounded-lg transition-all duration-200
//                 ${agent.selected
//                   ? "border-blue-500 bg-blue-50 shadow-md"
//                   : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                 }`}
//             >
//               <div
//                 className="mb-3 cursor-pointer"
//                 onClick={() => handleSelectCard(index)}
//               >
//                 <h3 className="font-medium mb-2">{agent.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {agent.description}
//                 </p>
//                 {agent.type?.toUpperCase() === "RAG" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
//                     <Database className="w-3 h-3 mr-1" />
//                     Document Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "CONVERSATIONAL" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     <Bot className="w-3 h-3 mr-1" />
//                     Conversational Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "TOOL_CALLING" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                     <Wrench className="w-3 h-3 mr-1" />
//                     Tool Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "CODING" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
//                     <Code2 className="w-3 h-3 mr-1" />
//                     Code Assistant
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-end">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleOpenChat(agent)}
//                 >
//                   Test Agent
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <Button 
//             onClick={handlePublishAgent} 
//             disabled={!agents.some(a => a.selected)}
//             className="px-6"
//           >
//             Publish
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!agents.some(a => a.selected)}
//             className="px-6"
//           >
//             Delete
//           </Button>
//         </div>

//         {/* Chat Panel */}
//         <AnimatePresence>
//           {activeChatAgent && !isChatMinimized && (
//             <ChatPanel
//               agent={activeChatAgent}
//               messages={messages}
//               isLoading={isLoading}
//               onClose={handleCloseChat}
//               onMinimize={() => setIsChatMinimized(true)}
//               onSend={handleSendMessage}
//               inputValue={chatInput}
//               onInputChange={(value) => setChatInput(value)}
//             />
//           )}
//         </AnimatePresence>

//         {/* Minimized Chat */}
//         {activeChatAgent && isChatMinimized && (
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer z-50"
//             onClick={() => setIsChatMinimized(false)}
//           >
//             <div className="flex items-center gap-2">
//               <Bot className="h-5 w-5 text-blue-500" />
//               <span>{activeChatAgent.name}</span>
//             </div>
//           </motion.div>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
/////////////////////////////////////////////////////////THIS WORKS BUT DOCUMENT HAS ISNT READ
// "use client";

// import React, {
//   forwardRef,
//   useImperativeHandle,
//   useState,
//   useEffect,
// } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Bot,
//   User,
//   Send,
//   X,
//   Minimize,
//   Database,
//   Upload,
//   FileText,
//   Wrench,
//   Code2,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { apiService, Agent } from "@/services/api";

// // Interfaces
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   type: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (agent: Agent) => void;
// }

// // Chat Message Component
// const ChatMessage = ({ message }: { message: Message }) => {
//   const isUser = message.role === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex w-full mb-4 ${
//         isUser ? "justify-end" : "justify-start"
//       }`}
//     >
//       <div
//         className={`flex items-start max-w-[80%] gap-2 ${
//           isUser ? "flex-row-reverse" : "flex-row"
//         }`}
//       >
//         <div
//           className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
//           ${isUser ? "bg-blue-100" : "bg-gray-100"}`}
//         >
//           {isUser ? (
//             <User className="h-4 w-4 text-blue-600" />
//           ) : (
//             <Bot className="h-4 w-4 text-gray-600" />
//           )}
//         </div>
//         <div
//           className={`rounded-lg px-4 py-2 ${
//             isUser ? "bg-blue-600 text-white" : "bg-white border shadow-sm"
//           }`}
//         >
//           <ReactMarkdown
//             remarkPlugins={[remarkGfm]}
//             className="text-sm prose prose-sm"
//           >
//             {message.content}
//           </ReactMarkdown>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Chat Panel Component
// interface ChatPanelProps {
//   agent: AgentCard;
//   messages: Message[];
//   isLoading: boolean;
//   onClose: () => void;
//   onMinimize: () => void;
//   onSend: (message?: string) => void;
//   inputValue: string;
//   onInputChange: (value: string) => void;

//   // Added to pass document logic to/from parent
//   hasDocuments: boolean;
//   setHasDocuments: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const ChatPanel: React.FC<ChatPanelProps> = ({
//   agent,
//   messages,
//   isLoading,
//   onClose,
//   onMinimize,
//   onSend,
//   inputValue,
//   onInputChange,
//   hasDocuments,
//   setHasDocuments,
// }) => {
//   const [documents, setDocuments] = useState<File[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   console.log("Agent type in chat panel:", agent.type);

//   const ACCEPTED_FILE_TYPES = [
//     ".pdf",
//     ".doc",
//     ".docx",
//     ".txt",
//     ".csv",
//     ".xlsx",
//     ".xls",
//     ".pptx",
//     ".ppt",
//     ".md",
//   ];

//   // File Upload
//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const files = Array.from(event.target.files || []);
//     if (files.length === 0) return;

//     const validFiles = files.filter((file) =>
//       ACCEPTED_FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type))
//     );

//     setIsUploading(true);

//     try {
//       for (const file of validFiles) {
//         await apiService.uploadDocument(agent.id, file);
//         // Add delay for processing
//         await new Promise((resolve) => setTimeout(resolve, 2000));
//       }

//       // Mark that we have documents
//       setHasDocuments(true);

//       // Test that documents are accessible
//       const testResponse = await apiService.queryAgent(
//         agent.id,
//         "Confirm you can access the uploaded documents."
//       );

//       if (
//         testResponse.response.toLowerCase().includes("yes") ||
//         testResponse.response.toLowerCase().includes("confirm") ||
//         testResponse.response.toLowerCase().includes("access")
//       ) {
//         onSend(
//           `Successfully uploaded and processed ${validFiles.length} document(s). You can now ask questions about them!`
//         );
//       } else {
//         setHasDocuments(false);
//         onSend(
//           "Documents were uploaded but there might be an issue with processing. Please try uploading again."
//         );
//       }
//     } catch (error) {
//       console.error("Upload error:", error);
//       setHasDocuments(false);
//       onSend(
//         `Failed to upload documents: ${
//           error instanceof Error ? error.message : "Unknown error"
//         }`
//       );
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const removeDocument = (index: number) => {
//     setDocuments((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "spring", damping: 25 }}
//       className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
//     >
//       {/* Header */}
//       <div className="px-4 py-3 border-b flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Bot className="h-5 w-5 text-blue-600" />
//           <h3 className="font-medium">{agent.name}</h3>
//         </div>
//         <div className="flex items-center gap-1">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onMinimize}
//             className="h-8 w-8"
//           >
//             <Minimize className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={onClose}
//             className="h-8 w-8"
//           >
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {/* File Upload UI - Only show for RAG agents */}
//       {agent.type?.toUpperCase() === "RAG" && (
//         <div className="p-4 border-b">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-sm font-medium text-gray-900">
//               Upload Documents
//             </h3>
//             {documents.length > 0 && (
//               <span className="text-xs text-gray-500">
//                 {documents.length} document(s) selected
//               </span>
//             )}
//           </div>

//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//             <Input
//               type="file"
//               onChange={handleFileUpload}
//               className="hidden"
//               id="chat-document-upload"
//               multiple
//               accept={ACCEPTED_FILE_TYPES.join(",")}
//             />
//             <label
//               htmlFor="chat-document-upload"
//               className="cursor-pointer flex flex-col items-center gap-2"
//             >
//               <Upload className="w-6 h-6 text-gray-400" />
//               <span className="text-sm text-gray-600">
//                 Drop files here or click to upload
//               </span>
//               <span className="text-xs text-gray-400">
//                 Supports: {ACCEPTED_FILE_TYPES.join(", ")}
//               </span>
//             </label>
//           </div>

//           {/* Document List */}
//           {documents.length > 0 && (
//             <div className="mt-2 space-y-2">
//               {documents.map((doc, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
//                 >
//                   <div className="flex items-center gap-2">
//                     <FileText className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">{doc.name}</span>
//                   </div>
//                   <button
//                     onClick={() => removeDocument(index)}
//                     className="text-gray-400 hover:text-red-500"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         {messages.map((msg, i) => (
//           <ChatMessage key={i} message={msg} />
//         ))}
//         {isLoading && (
//           <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//           </div>
//         )}
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t bg-white">
//         <div className="flex items-center gap-2">
//           <Input
//             value={inputValue}
//             onChange={(e) => onInputChange(e.target.value)}
//             placeholder="Type your message..."
//             disabled={isLoading}
//             className="flex-1"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 onSend();
//               }
//             }}
//           />
//           <Button
//             onClick={() => onSend()}
//             disabled={isLoading || !inputValue.trim()}
//             size="icon"
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main AgentTest Component
// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatInput, setChatInput] = useState("");
//   const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(
//     null
//   );
//   const [isChatMinimized, setIsChatMinimized] = useState(false);

//   // Moved hasDocuments to parent so we can check it in handleSendMessage
//   const [hasDocuments, setHasDocuments] = useState(false);

//   // Fetch existing agents
//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           type: a.type?.toUpperCase(),
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   // Expose addAgentCard method
//   useImperativeHandle(ref, () => ({
//     addAgentCard(agent: Agent) {
//       console.log("Adding new agent:", agent);
//       const newCard: AgentCard = {
//         id: agent.id,
//         name: agent.name,
//         description: agent.configuration?.description ?? "",
//         type: agent.type?.toUpperCase(),
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//   };

//   const handleOpenChat = (agent: AgentCard) => {
//     console.log("Opening chat with agent type:", agent.type);
//     setActiveChatAgent(agent);
//     setIsChatMinimized(false);
//     setMessages([]);
//     setChatInput("");
//     // Reset hasDocuments each time you open a new chat if you want
//     setHasDocuments(false);
//   };

//   const handleCloseChat = () => {
//     setActiveChatAgent(null);
//     setMessages([]);
//     setChatInput("");
//   };

//   const handleSendMessage = async (overrideText?: string) => {
//     // Must have an active agent
//     if (!activeChatAgent) return;

//     const textToSend = overrideText ?? chatInput.trim();
//     if (!textToSend) return;

//     const role = overrideText ? "assistant" : "user";
//     setMessages((prev) => [...prev, { role, content: textToSend }]);

//     // If the user is actually sending text
//     if (!overrideText) {
//       setChatInput("");
//       try {
//         setIsLoading(true);

//         // If it's a RAG agent and no documents uploaded
//         if (
//           activeChatAgent.type?.toUpperCase() === "RAG" &&
//           !hasDocuments
//         ) {
//           setMessages((prev) => [
//             ...prev,
//             {
//               role: "assistant",
//               content:
//                 "Please upload a document first. I need a document to answer questions from.",
//             },
//           ]);
//           return;
//         }

//         // Send to the API
//         const response = await apiService.queryAgent(
//           activeChatAgent.id,
//           textToSend
//         );
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: response.response },
//         ]);
//       } catch (error) {
//         console.error("Failed to get agent response:", error);
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, something went wrong. Please try again.",
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleDeleteAgent = async () => {
//     const selectedAgent = agents.find((a) => a.selected);
//     if (!selectedAgent) return;

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(selectedAgent.id);
//       setAgents((prev) => prev.filter((a) => a.id !== selectedAgent.id));

//       // If we had that agent open in chat, close it
//       if (activeChatAgent?.id === selectedAgent.id) {
//         handleCloseChat();
//       }
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePublishAgent = () => {
//     const selectedAgent = agents.find((a) => a.selected);
//     if (!selectedAgent) return;

//     // Your publish logic here
//     alert(`Publishing agent: ${selectedAgent.name}`);
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       <CardHeader>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
//           <p className="text-gray-500">Your AI assistants at your service</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col space-y-6">
//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500">
//               No agents created yet. Configure an agent to get started.
//             </p>
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               className={`p-4 border rounded-lg transition-all duration-200
//                 ${
//                   agent.selected
//                     ? "border-blue-500 bg-blue-50 shadow-md"
//                     : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                 }`}
//             >
//               <div
//                 className="mb-3 cursor-pointer"
//                 onClick={() => handleSelectCard(index)}
//               >
//                 <h3 className="font-medium mb-2">{agent.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {agent.description}
//                 </p>
//                 {agent.type?.toUpperCase() === "RAG" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
//                     <Database className="w-3 h-3 mr-1" />
//                     Document Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "CONVERSATIONAL" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     <Bot className="w-3 h-3 mr-1" />
//                     Conversational Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "TOOL_CALLING" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                     <Wrench className="w-3 h-3 mr-1" />
//                     Tool Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "CODING" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
//                     <Code2 className="w-3 h-3 mr-1" />
//                     Code Assistant
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-end">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleOpenChat(agent)}
//                 >
//                   Test Agent
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <Button
//             onClick={handlePublishAgent}
//             disabled={!agents.some((a) => a.selected)}
//             className="px-6"
//           >
//             Publish
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!agents.some((a) => a.selected)}
//             className="px-6"
//           >
//             Delete
//           </Button>
//         </div>

//         {/* Chat Panel */}
//         <AnimatePresence>
//           {activeChatAgent && !isChatMinimized && (
//             <ChatPanel
//               agent={activeChatAgent}
//               messages={messages}
//               isLoading={isLoading}
//               onClose={handleCloseChat}
//               onMinimize={() => setIsChatMinimized(true)}
//               onSend={handleSendMessage}
//               inputValue={chatInput}
//               onInputChange={(value) => setChatInput(value)}
//               hasDocuments={hasDocuments}
//               setHasDocuments={setHasDocuments}
//             />
//           )}
//         </AnimatePresence>

//         {/* Minimized Chat */}
//         {activeChatAgent && isChatMinimized && (
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer z-50"
//             onClick={() => setIsChatMinimized(false)}
//           >
//             <div className="flex items-center gap-2">
//               <Bot className="h-5 w-5 text-blue-500" />
//               <span>{activeChatAgent.name}</span>
//             </div>
//           </motion.div>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// export default AgentTest;
/////////////////////////////////////////////////////////////////////////////////
// "use client";

// import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Bot,
//   User,
//   Send,
//   X,
//   Minimize,
//   Database,
//   Upload,
//   FileText,
//   Wrench,
//   Code2,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { apiService, Agent } from "@/services/api";

// // Interfaces
// interface Message {
//   role: "user" | "assistant";
//   content: string;
// }

// interface AgentCard {
//   id: number;
//   name: string;
//   description: string;
//   type: string;
//   selected: boolean;
// }

// export interface AgentTestRef {
//   addAgentCard: (agent: Agent) => void;
// }

// // Chat Message Component
// const ChatMessage = ({ message }: { message: Message }) => {
//   const isUser = message.role === "user";
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
//     >
//       <div className={`flex items-start max-w-[80%] gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
//         <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center
//           ${isUser ? "bg-blue-100" : "bg-gray-100"}`}>
//           {isUser ? <User className="h-4 w-4 text-blue-600" /> : <Bot className="h-4 w-4 text-gray-600" />}
//         </div>
//         <div className={`rounded-lg px-4 py-2 ${isUser ? "bg-blue-600 text-white" : "bg-white border shadow-sm"}`}>
//           <ReactMarkdown remarkPlugins={[remarkGfm]} className="text-sm prose prose-sm">
//             {message.content}
//           </ReactMarkdown>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Chat Panel Component
// interface ChatPanelProps {
//   agent: AgentCard;
//   messages: Message[];
//   isLoading: boolean;
//   onClose: () => void;
//   onMinimize: () => void;
//   onSend: (message?: string) => void;
//   inputValue: string;
//   onInputChange: (value: string) => void;
// }

// const ChatPanel: React.FC<ChatPanelProps> = ({
//   agent,
//   messages,
//   isLoading,
//   onClose,
//   onMinimize,
//   onSend,
//   inputValue,
//   onInputChange,
// }) => {
//   const [documents, setDocuments] = useState<File[]>([]);
//   const [isUploading, setIsUploading] = useState(false);
//   const [hasDocuments, setHasDocuments] = useState(false);
  
//   const ACCEPTED_FILE_TYPES = [
//     '.pdf', '.doc', '.docx', '.txt', '.csv',
//     '.xlsx', '.xls', '.pptx', '.ppt', '.md'
//   ];

//   useEffect(() => {
//     setDocuments([]);
//     setHasDocuments(false);
//   }, [agent.id]);

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || []);
//     if (files.length === 0) return;

//     const validFiles = files.filter((file) =>
//       ACCEPTED_FILE_TYPES.some((type) => file.name.toLowerCase().endsWith(type))
//     );

//     setIsUploading(true);

//     try {
//       for (const file of validFiles) {
//         await apiService.uploadDocument(agent.id, file);
//       }
      
//       setHasDocuments(true);
//       setDocuments(prev => [...prev, ...validFiles]);
//       onSend(`Documents uploaded successfully. You can now ask questions about them!`);

//     } catch (error) {
//       console.error("Upload error:", error);
//       setHasDocuments(false);
//       onSend(`Failed to upload documents: ${error instanceof Error ? error.message : "Unknown error"}`);
//     } finally {
//       setIsUploading(false);
//     }
// };

//   const removeDocument = (index: number) => {
//     setDocuments((prev) => {
//       const newDocs = prev.filter((_, i) => i !== index);
//       if (newDocs.length === 0) {
//         setHasDocuments(false);
//       }
//       return newDocs;
//     });
//   };

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "spring", damping: 25 }}
//       className="fixed right-0 top-0 h-screen w-96 bg-white shadow-lg border-l flex flex-col z-50"
//     >
//       <div className="px-4 py-3 border-b flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <Bot className="h-5 w-5 text-blue-600" />
//           <h3 className="font-medium">{agent.name}</h3>
//         </div>
//         <div className="flex items-center gap-1">
//           <Button variant="ghost" size="icon" onClick={onMinimize} className="h-8 w-8">
//             <Minimize className="h-4 w-4" />
//           </Button>
//           <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
//             <X className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {agent.type?.toUpperCase() === "RAG" && (
//         <div className="p-4 border-b">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-sm font-medium text-gray-900">Upload Documents</h3>
//             {documents.length > 0 && (
//               <span className="text-xs text-gray-500">
//                 {documents.length} document(s) {isUploading ? 'uploading' : 'uploaded'}
//               </span>
//             )}
//           </div>

//           <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
//             <Input
//               type="file"
//               onChange={handleFileUpload}
//               className="hidden"
//               id="chat-document-upload"
//               multiple
//               accept={ACCEPTED_FILE_TYPES.join(",")}
//               disabled={isUploading}
//             />
//             <label
//               htmlFor="chat-document-upload"
//               className="cursor-pointer flex flex-col items-center gap-2"
//             >
//               <Upload className="w-6 h-6 text-gray-400" />
//               <span className="text-sm text-gray-600">
//                 {isUploading ? 'Uploading...' : 'Drop files here or click to upload'}
//               </span>
//               <span className="text-xs text-gray-400">
//                 Supports: {ACCEPTED_FILE_TYPES.join(", ")}
//               </span>
//             </label>
//           </div>

//           {documents.length > 0 && (
//             <div className="mt-2 space-y-2">
//               {documents.map((doc, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
//                 >
//                   <div className="flex items-center gap-2">
//                     <FileText className="w-4 h-4 text-gray-400" />
//                     <span className="text-sm text-gray-600">{doc.name}</span>
//                   </div>
//                   <button
//                     onClick={() => removeDocument(index)}
//                     className="text-gray-400 hover:text-red-500"
//                     disabled={isUploading}
//                   >
//                     <X className="w-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       )}

//       <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
//         {messages.map((msg, i) => (
//           <ChatMessage key={i} message={msg} />
//         ))}
//         {isLoading && (
//           <div className="flex space-x-2 p-3 bg-gray-100 rounded-lg w-16 justify-center">
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
//             <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t bg-white">
//         <div className="flex items-center gap-2">
//           <Input
//             value={inputValue}
//             onChange={(e) => onInputChange(e.target.value)}
//             placeholder={
//               agent.type?.toUpperCase() === "RAG" && !hasDocuments
//                 ? "Please upload a document first"
//                 : "Type your message..."
//             }
//             disabled={isLoading || (agent.type?.toUpperCase() === "RAG" && !hasDocuments)}
//             className="flex-1"
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 onSend();
//               }
//             }}
//           />
//           <Button
//             onClick={() => onSend()}
//             disabled={isLoading || !inputValue.trim() || (agent.type?.toUpperCase() === "RAG" && !hasDocuments)}
//             size="icon"
//           >
//             <Send className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// // Main AgentTest Component
// const AgentTest = forwardRef<AgentTestRef>((props, ref) => {
//   const [agents, setAgents] = useState<AgentCard[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [chatInput, setChatInput] = useState("");
//   const [activeChatAgent, setActiveChatAgent] = useState<AgentCard | null>(null);
//   const [isChatMinimized, setIsChatMinimized] = useState(false);

//   useEffect(() => {
//     const fetchExistingAgents = async () => {
//       try {
//         setIsLoading(true);
//         const dbAgents = await apiService.listAgents();
//         const agentCards = dbAgents.map((a: Agent) => ({
//           id: a.id,
//           name: a.name,
//           description: a.configuration?.description ?? "",
//           type: a.type?.toUpperCase(),
//           selected: false,
//         }));
//         setAgents(agentCards);
//       } catch (error) {
//         console.error("Failed to fetch agents:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchExistingAgents();
//   }, []);

//   useImperativeHandle(ref, () => ({
//     addAgentCard(agent: Agent) {
//       console.log("Adding new agent:", agent);
//       const newCard: AgentCard = {
//         id: agent.id,
//         name: agent.name,
//         description: agent.configuration?.description ?? "",
//         type: agent.type?.toUpperCase(),
//         selected: false,
//       };
//       setAgents((prev) => [...prev, newCard]);
//     },
//   }));

//   const handleSelectCard = (index: number) => {
//     setAgents((prev) =>
//       prev.map((agent, i) => ({
//         ...agent,
//         selected: i === index,
//       }))
//     );
//   };

//   const handleOpenChat = (agent: AgentCard) => {
//     console.log("Opening chat with agent type:", agent.type);
//     setActiveChatAgent(agent);
//     setIsChatMinimized(false);
//     setMessages([]);
//     setChatInput("");
//   };

//   const handleCloseChat = () => {
//     setActiveChatAgent(null);
//     setMessages([]);
//     setChatInput("");
//   };

//   const handleSendMessage = async (overrideText?: string) => {
//     if (!activeChatAgent) return;

//     const textToSend = overrideText ?? chatInput.trim();
//     if (!textToSend) return;

//     const role = overrideText ? "assistant" : "user";
//     setMessages((prev) => [...prev, { role, content: textToSend }]);

//     if (!overrideText) {
//       setChatInput("");
//       try {
//         setIsLoading(true);
//         const formData = new URLSearchParams();
//         formData.append('query', textToSend);

//         const response = await fetch(`/api/v1/DIY-Studio/agents/${activeChatAgent.id}/query`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: formData
//         });

//         if (!response.ok) {
//           throw new Error(await response.text());
//         }

//         const result = await response.json();
//         setMessages((prev) => [
//           ...prev,
//           { role: "assistant", content: result.response },
//         ]);
//       } catch (error) {
//         console.error("Failed to get agent response:", error);
//         setMessages((prev) => [
//           ...prev,
//           {
//             role: "assistant",
//             content: "Sorry, something went wrong. Please try again.",
//           },
//         ]);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   const handleDeleteAgent = async () => {
//     const selectedAgent = agents.find((a) => a.selected);
//     if (!selectedAgent) return;

//     try {
//       setIsLoading(true);
//       await apiService.deleteAgent(selectedAgent.id);
//       setAgents((prev) => prev.filter((a) => a.id !== selectedAgent.id));

//       if (activeChatAgent?.id === selectedAgent.id) {
//         handleCloseChat();
//       }
//     } catch (error) {
//       console.error("Failed to delete agent:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handlePublishAgent = () => {
//     const selectedAgent = agents.find((a) => a.selected);
//     if (!selectedAgent) return;
//     alert(`Publishing agent: ${selectedAgent.name}`);
//   };

//   return (
//     <Card className="bg-white h-full flex flex-col relative">
//       <CardHeader>
//         <div className="space-y-1">
//           <h2 className="text-2xl font-bold text-gray-900">Agent Hub</h2>
//           <p className="text-gray-500">Your AI assistants at your service</p>
//         </div>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col space-y-6">
//         {/* Empty State */}
//         {agents.length === 0 && !isLoading && (
//           <div className="text-center py-12 bg-gray-50 rounded-lg">
//             <Bot className="h-12 w-12 mx-auto text-gray-400 mb-3" />
//             <p className="text-gray-500">
//               No agents created yet. Configure an agent to get started.
//             </p>
//           </div>
//         )}

//         {/* Agents Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {agents.map((agent, index) => (
//             <div
//               key={agent.id}
//               className={`p-4 border rounded-lg transition-all duration-200
//                 ${
//                   agent.selected
//                     ? "border-blue-500 bg-blue-50 shadow-md"
//                     : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
//                 }`}
//             >
//               <div
//                 className="mb-3 cursor-pointer"
//                 onClick={() => handleSelectCard(index)}
//               >
//                 <h3 className="font-medium mb-2">{agent.name}</h3>
//                 <p className="text-sm text-gray-600 line-clamp-2">
//                   {agent.description}
//                 </p>
//                 {agent.type?.toUpperCase() === "RAG" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
//                     <Database className="w-3 h-3 mr-1" />
//                     Document Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "CONVERSATIONAL" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                     <Bot className="w-3 h-3 mr-1" />
//                     Conversational Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "TOOL_CALLING" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
//                     <Wrench className="w-3 h-3 mr-1" />
//                     Tool Assistant
//                   </span>
//                 )}
//                 {agent.type?.toUpperCase() === "CODING" && (
//                   <span className="inline-flex items-center px-2 py-1 mt-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
//                     <Code2 className="w-3 h-3 mr-1" />
//                     Code Assistant
//                   </span>
//                 )}
//               </div>
//               <div className="flex justify-end">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handleOpenChat(agent)}
//                 >
//                   Test Agent
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end gap-3">
//           <Button
//             onClick={handlePublishAgent}
//             disabled={!agents.some((a) => a.selected)}
//             className="px-6"
//           >
//             Publish
//           </Button>
//           <Button
//             onClick={handleDeleteAgent}
//             variant="destructive"
//             disabled={!agents.some((a) => a.selected)}
//             className="px-6"
//           >
//             Delete
//           </Button>
//         </div>

//         {/* Chat Panel */}
//         <AnimatePresence>
//           {activeChatAgent && !isChatMinimized && (
//             <ChatPanel
//               agent={activeChatAgent}
//               messages={messages}
//               isLoading={isLoading}
//               onClose={handleCloseChat}
//               onMinimize={() => setIsChatMinimized(true)}
//               onSend={handleSendMessage}
//               inputValue={chatInput}
//               onInputChange={(value) => setChatInput(value)}
//             />
//           )}
//         </AnimatePresence>

//         {/* Minimized Chat */}
//         {activeChatAgent && isChatMinimized && (
//           <motion.div
//             initial={{ y: "100%" }}
//             animate={{ y: 0 }}
//             exit={{ y: "100%" }}
//             className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-3 cursor-pointer z-50"
//             onClick={() => setIsChatMinimized(false)}
//           >
//             <div className="flex items-center gap-2">
//               <Bot className="h-5 w-5 text-blue-500" />
//               <span>{activeChatAgent.name}</span>
//             </div>
//           </motion.div>
//         )}
//       </CardContent>
//     </Card>
//   );
// });

// AgentTest.displayName = "AgentTest";

// export default AgentTest;
/////////////////////////////////////////////////Theabove code is the best so far
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
  useImperativeHandle(ref, () => ({
    addAgentCard(agent: Agent) {
      const newCard: AgentCard = {
        id: agent.id,
        name: agent.name,
        description: agent.configuration?.description ?? "",
        type: agent.type?.toUpperCase(),
        selected: false,
      };
      setAgents((prev) => [...prev, newCard]);
    },
  }));

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

