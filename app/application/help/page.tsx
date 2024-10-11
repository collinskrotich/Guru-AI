// "use client";

// import React, { useState } from 'react';
// import { Send, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

// const steps = [
//   'Give me a moment...',
//   'Analyzing the request...',
//   'Searching relevant information...',
//   'Reviewing...',
//   'Generating the answer...'
// ];

// const ChatInputWithAnimation = () => {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [visibleSteps, setVisibleSteps] = useState<string[]>([]); // Define visibleSteps as an array of strings
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   const handleSend = async () => {
//     setIsAnimating(true);
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setVisibleSteps(prev => [...prev, steps[i]]); // Now this will work
//       setCurrentStep(i);
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
//     setIsComplete(true);
//     setIsExpanded(false);
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   return (
//     <div className="max-w-md mx-auto mt-10">
//       <div className="flex items-center bg-white rounded-full shadow-md p-2 mb-4">
//         <input
//           type="text"
//           placeholder="Ask follow-up..."
//           className="flex-grow px-4 py-2 bg-transparent outline-none"
//         />
//         <button
//           onClick={handleSend}
//           className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
//           aria-label="Send message"
//         >
//           <Send className="w-5 h-5 text-purple-600" />
//         </button>
//       </div>

//       {isAnimating && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                 AI
//               </div>
//               <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                 {isComplete ? "5 Steps completed" : "Processing..."}
//               </span>
//             </div>
//             {isComplete && (
//               <button onClick={toggleExpand} className="text-blue-500">
//                 {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//               </button>
//             )}
//           </div>
//           {isExpanded && (
//             <ul className="space-y-3">
//               {visibleSteps.map((step, index) => (
//                 <li key={index} className="flex items-center">
//                   {index < currentStep ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                   )}
//                   <span className={index <= currentStep ? 'text-gray-700' : 'text-gray-400'}>
//                     {step}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInputWithAnimation;


// 3

// "use client";
// import React, { useState, useEffect } from 'react';
// import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

// const steps = [
//   'Give me a moment...',
//   'Analyzing the request...',
//   'Searching relevant information...',
//   'Reviewing...',
//   'Generating the answer...'
// ];

// export default function AssistantUIFoldedPreview() {
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [visibleSteps, setVisibleSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     handleSubmit();
//   }, []);

//   const handleSubmit = async () => {
//     setIsAnimating(true);
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setVisibleSteps(prev => [...prev, steps[i]]);
//       setCurrentStep(i);
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
//     setIsComplete(true);
//     setIsExpanded(false);  // Fold the summary after completion
//     setIsAnimating(false);
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-md mx-auto">
//       <div className="relative mb-4">
//         <input 
//           type="text"
//           placeholder="What can I help with?" 
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//         />
//         <button 
//           onClick={handleSubmit}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//         >
//           <SendHorizontal className="h-4 w-4" />
//         </button>
//       </div>

//       {(isAnimating || isComplete) && (
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                 AI
//               </div>
//               <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                 {isComplete ? "5 Steps completed" : "Processing..."}
//               </span>
//             </div>
//             <button onClick={toggleExpand} className="text-blue-500">
//               {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//             </button>
//           </div>
//           {isExpanded && (
//             <ul className="space-y-3">
//               {visibleSteps.map((step, index) => (
//                 <li key={index} className="flex items-center">
//                   {index < currentStep || isComplete ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                   )}
//                   <span className={index <= currentStep || isComplete ? 'text-gray-700' : 'text-gray-400'}>
//                     {step}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }



// "use client"

// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy } from "lucide-react";

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// const steps = [
//   'Give me a moment...',
//   'Analyzing the request...',
//   'Searching relevant information...',
//   'Reviewing...',
//   'Generating the answer...'
// ];

// export default function AssistantUI() {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     if (isLoading) {
//       startAnimation();
//     }
//   }, [isLoading]);

//   const startAnimation = async () => {
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setVisibleSteps(prev => [...prev, steps[i]]);
//       setCurrentStep(i);
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
//     setIsComplete(true);
//     setIsExpanded(false); // Collapse after completion
//     setIsLoading(false);
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;
    
//     setIsLoading(true);
//     const newUserMessage: ChatMessage = { role: 'user', content: prompt };
//     setChatHistory(prev => [...prev, newUserMessage]);

//     try {
//       const res = await fetch('/api/v1/Enterpise-AI-Search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text };
//       setChatHistory(prev => [...prev, newAIMessage]);
//       setPrompt("");
//     } catch (error) {
//       const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." };
//       setChatHistory(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       <div className="relative mb-4">
//         <Input
//           placeholder="What can I help with?"
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//         >
//           {isLoading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <SendHorizontal className="h-4 w-4" />
//           )}
//         </Button>
//       </div>

//       {(isLoading || isComplete) && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                 {isComplete ? "5 Steps completed" : "Processing..."}
//               </span>
//             </div>
//             <button onClick={toggleExpand} className="text-blue-500">
//               {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//             </button>
//           </div>
//           {isExpanded && (
//             <ul className="space-y-3">
//               {visibleSteps.map((step, index) => (
//                 <li key={index} className="flex items-center">
//                   {index < currentStep || isComplete ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                   )}
//                   <span className={index <= currentStep || isComplete ? 'text-gray-700' : 'text-gray-400'}>
//                     {step}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {isComplete && chatHistory.length > 0 && (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search Results</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%]">
//                   <div className="flex items-start space-x-4">
//                     <div className="flex-grow">
//                       <p className="text-gray-700">{message.content}</p>
//                     </div>
//                   </div>
//                   {message.role === 'ai' && (
//                     <div className="flex justify-end">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => copyToClipboard(message.content)}
//                         className="text-xs text-gray-600 hover:text-gray-800"
//                       >
//                         <Copy className="h-3 w-3 mr-1" />
//                         Copy
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <p className="text-xs text-center text-gray-500 mt-4">
//         GURU can make mistakes, so double-check its responses. 
//         <a href="#" className="underline">Safaricom Privacy Policy</a>
//       </p>
//     </div>
//   );
// }


// TEST 

// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy } from "lucide-react";

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// const steps = [
//   'Give me a moment...',
//   'Analyzing the request...',
//   'Searching relevant information...',
//   'Reviewing...',
//   'Generating the answer...'
// ];

// export default function AssistantUI() {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     if (isLoading) {
//       startAnimation();
//     }
//   }, [isLoading]);

//   const startAnimation = async () => {
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setVisibleSteps(prev => [...prev, steps[i]]);
//       setCurrentStep(i);
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
//     setIsComplete(true);
//     setIsExpanded(false); // Collapse after completion
//     setIsLoading(false);
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;
    
//     setIsLoading(true);
//     const newUserMessage: ChatMessage = { role: 'user', content: prompt };
//     setChatHistory(prev => [...prev, newUserMessage]);

//     try {
//       const res = await fetch('/api/v1/Enterpise-AI-Search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text };
//       setChatHistory(prev => [...prev, newAIMessage]);
//       setPrompt("");
//     } catch (error) {
//       const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." };
//       setChatHistory(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       <div className="relative mb-4">
//         <Input
//           placeholder="What can I help with?"
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//         >
//           {isLoading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <SendHorizontal className="h-4 w-4" />
//           )}
//         </Button>
//       </div>

//       {(isLoading || isComplete) && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                 {isComplete ? "5 Steps completed" : "Processing..."}
//               </span>
//             </div>
//             <button onClick={toggleExpand} className="text-blue-500">
//               {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//             </button>
//           </div>
//           {isExpanded && (
//             <ul className="space-y-3">
//               {visibleSteps.map((step, index) => (
//                 <li key={index} className="flex items-center">
//                   {index < currentStep || isComplete ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                   )}
//                   <span className={index <= currentStep || isComplete ? 'text-gray-700' : 'text-gray-400'}>
//                     {step}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}

//       {isComplete && chatHistory.length > 0 && (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search Results</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%]">
//                   <div className="flex items-start space-x-4">
//                     <div className="flex-grow">
//                       <p className="text-gray-700">{message.content}</p>
//                     </div>
//                   </div>
//                   {message.role === 'ai' && (
//                     <div className="flex justify-end">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => copyToClipboard(message.content)}
//                         className="text-xs text-gray-600 hover:text-gray-800"
//                       >
//                         <Copy className="h-3 w-3 mr-1" />
//                         Copy
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <p className="text-xs text-center text-gray-500 mt-4">
//         GURU can make mistakes, so double-check its responses. 
//         <a href="#" className="underline">Safaricom Privacy Policy</a>
//       </p>
//     </div>
//   );
// }


//TEST 4

// "use client"
// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy } from "lucide-react";

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
// }

// const steps = [
//   'Give me a moment...',
//   'Analyzing the request...',
//   'Searching relevant information...',
//   'Reviewing...',
//   'Generating the answer...'
// ];

// export default function AssistantUI() {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);

//   useEffect(() => {
//     if (isLoading) {
//       startAnimation();
//     }
//   }, [isLoading]);

//   const startAnimation = async () => {
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setVisibleSteps(prev => [...prev, steps[i]]);
//       setCurrentStep(i);
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
//     setIsComplete(true);
//     setIsExpanded(false); // Collapse after completion
//     setIsLoading(false);
//   };

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;
    
//     setIsLoading(true);
//     const newUserMessage: ChatMessage = { role: 'user', content: prompt };
//     setChatHistory(prev => [...prev, newUserMessage]);

//     try {
//       const res = await fetch('/api/v1/Enterpise-AI-Search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text };
//       setChatHistory(prev => [...prev, newAIMessage]);
//       setPrompt("");
//     } catch (error) {
//       const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." };
//       setChatHistory(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       <div className="relative mb-4">
//         <Input
//           placeholder="What can I help with?"
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//         />
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={handleSubmit}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//         >
//           {isLoading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <SendHorizontal className="h-4 w-4" />
//           )}
//         </Button>
//       </div>

//       {(isLoading || isComplete) && (
//         <Card className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <CardContent>
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center">
//                 <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                   {isComplete ? "5 Steps completed" : "Processing..."}
//                 </span>
//               </div>
//               <button onClick={toggleExpand} className="text-blue-500">
//                 {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//               </button>
//             </div>
//             {isExpanded && (
//               <ul className="space-y-3">
//                 {visibleSteps.map((step, index) => (
//                   <li key={index} className="flex items-center">
//                     {index < currentStep || isComplete ? (
//                       <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                     ) : (
//                       <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                     )}
//                     <span className={index <= currentStep || isComplete ? 'text-gray-700' : 'text-gray-400'}>
//                       {step}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </CardContent>
//         </Card>
//       )}

//       {isComplete && chatHistory.length > 0 && (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search Results</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%]">
//                   <div className="flex items-start space-x-4">
//                     <div className="flex-grow">
//                       <p className="text-gray-700">{message.content}</p>
//                     </div>
//                   </div>
//                   {message.role === 'ai' && (
//                     <div className="flex justify-end">
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => copyToClipboard(message.content)}
//                         className="text-xs text-gray-600 hover:text-gray-800"
//                       >
//                         <Copy className="h-3 w-3 mr-1" />
//                         Copy
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <p className="text-xs text-center text-gray-500 mt-4">
//         GURU can make mistakes, so double-check its responses. 
//         <a href="#" className="underline">Safaricom Privacy Policy</a>
//       </p>
//     </div>
//   );
// }


// "use client"
// import React, { useState } from 'react';
// import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy } from 'lucide-react';

// const steps = [
//   'Give me a moment...',
//   'Analyzing the request...',
//   'Searching relevant information...',
//   'Reviewing...',
//   'Generating the answer...'
// ];

// export default function AssistantUIWithIcons() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [visibleSteps, setVisibleSteps] = useState([]);
//   const [currentStep, setCurrentStep] = useState(0);
//   const [isComplete, setIsComplete] = useState(false);
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [aiResponse, setAiResponse] = useState('');

//   const startAnimation = async () => {
//     setIsLoading(true);
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);
//     setAiResponse('');

//     for (let i = 0; i < steps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setVisibleSteps(prev => [...prev, steps[i]]);
//       setCurrentStep(i);
//     }

//     await new Promise(resolve => setTimeout(resolve, 500));
//     setIsComplete(true);
//     setIsExpanded(false);
    
//     await new Promise(resolve => setTimeout(resolve, 1000));
//     setAiResponse('Safaricom Telematics Monthly Service is a vehicle tracking and fleet management solution offered by Safaricom, a leading telecommunications company in Kenya. This service provides businesses with real-time information about their vehicles, including location, speed, fuel consumption, and driver behavior. It helps companies optimize their fleet operations, improve safety, and reduce costs.');
    
//     setIsLoading(false);
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   return (
//     <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
//       <div className="relative mb-4">
//         <input 
//           type="text"
//           placeholder="What can I help with?" 
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           defaultValue="What is Safaricom Telematics Monthly Service?"
//         />
//         <button 
//           onClick={startAnimation}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//         >
//           {isLoading ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <SendHorizontal className="h-4 w-4" />
//           )}
//         </button>
//       </div>

//       {(isLoading || isComplete) && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
//                 AI
//               </div>
//               <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                 {isComplete ? "5 Steps completed" : "Processing..."}
//               </span>
//             </div>
//             <button onClick={toggleExpand} className="text-blue-500">
//               {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//             </button>
//           </div>
//           {isExpanded && (
//             <ul className="space-y-3 mb-4">
//               {visibleSteps.map((step, index) => (
//                 <li key={index} className="flex items-center">
//                   {index < currentStep ? (
//                     <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                   ) : (
//                     <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                   )}
//                   <span className={index <= currentStep ? 'text-gray-700' : 'text-gray-400'}>
//                     {step}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}
          
//           {isComplete && aiResponse && (
//             <div className="space-y-4 mt-4">
//               <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
//                     <img
//                       src="/zuri-icon.svg"
//                       alt="AI Icon"
//                       className="w-9 h-9"
//                     />
//                   </div>
//                   <div className="flex-grow">
//                     <p className="text-gray-700">{aiResponse}</p>
//                   </div>
//                 </div>
//                 <div className="flex justify-end">
//                   <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center">
//                     <Copy className="h-3 w-3 mr-1" />
//                     Copy
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client"
import React, { useState } from 'react';
import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy } from 'lucide-react';

const steps = [
  'Give me a moment...',
  'Analyzing the request...',
  'Searching relevant information...',
  'Reviewing...',
  'Generating the answer...'
];

export default function AssistantUIWithIcons() {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]); // Explicitly typed as string[]
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [aiResponse, setAiResponse] = useState('');

  const startAnimation = async () => {
    setIsLoading(true);
    setVisibleSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);
    setAiResponse('');

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVisibleSteps(prev => [...prev, steps[i]]); // No type error now
      setCurrentStep(i);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsComplete(true);
    setIsExpanded(false);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAiResponse('Safaricom Telematics Monthly Service is a vehicle tracking and fleet management solution offered by Safaricom, a leading telecommunications company in Kenya. This service provides businesses with real-time information about their vehicles, including location, speed, fuel consumption, and driver behavior. It helps companies optimize their fleet operations, improve safety, and reduce costs.');
    
    setIsLoading(false);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="relative mb-4">
        <input 
          type="text"
          placeholder="What can I help with?" 
          className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
          defaultValue="What is Safaricom Telematics Monthly Service?"
        />
        <button 
          onClick={startAnimation}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendHorizontal className="h-4 w-4" />
          )}
        </button>
      </div>

      {(isLoading || isComplete) && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 flex items-center justify-center mr-4">
                <img 
                  src="/zuri-icon.svg" 
                  alt="AI Icon" 
                  className="w-8 h-8" 
                />
              </div>
              <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
                {isComplete ? "5 Steps completed" : "GURU is Processing..."}
              </span>
            </div>
            <button onClick={toggleExpand} className="text-blue-500">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          {isExpanded && (
            <ul className="space-y-3 mb-4">
              {visibleSteps.map((step, index) => (
                <li key={index} className="flex items-center">
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                  ) : (
                    <Circle className={`w-5 h-5 mr-2 ${index === currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
                  )}
                  <span className={index <= currentStep ? 'text-gray-700' : 'text-gray-400'}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          )}
          
          {isComplete && aiResponse && (
            <div className="space-y-4 mt-4">
              <div className="bg-gray-50 p-4 rounded-md shadow-sm space-y-2">
                <div className="flex-grow">
                  <p className="text-gray-700">{aiResponse}</p>
                </div>
                <div className="flex justify-end">
                  <button className="text-xs text-gray-600 hover:text-gray-800 flex items-center">
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
