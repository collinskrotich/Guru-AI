
// TEST 1

"use client"
import React, { useState } from 'react';
import { SendHorizontal, Loader2, CheckCircle2, Circle, ChevronDown, ChevronUp, Copy, FileText, ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  'Give me a moment...',
  'Analyzing the request...',
  'Searching relevant information...',
  'Reviewing...',
  'Generating the answer...'
];

export default function AssistantUIWithIcons() {
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
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
      setVisibleSteps(prev => [...prev, steps[i]]);
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

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
      <div className="text-xs text-gray-500 mb-4 text-center border-b border-gray-300 pb-2">July 9, 2024</div>
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
          {isComplete && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-500 font-semibold flex items-center">
                5 Steps completed
                <button onClick={toggleExpand} className="text-blue-500 ml-2">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </span>
            </div>
          )}
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 flex items-center justify-center mr-4">
              <img 
                src="/zuri-icon.svg" 
                alt="AI Icon" 
                className="w-8 h-8" 
              />
            </div>
            <span className={isComplete ? "text-green-500 font-semibold flex items-center" : "text-gray-500"}>
              {isComplete ? (
                <>
                  <span className="text-xs text-gray-500 ml-2">12:55 PM</span>
                </>
              ) : "GURU is Processing..."}
            </span>
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
              </div>
              <div className="text-xs text-gray-600 mt-2">
                References: 
                <span className="inline-flex items-center">
                  <FileText size={12} className="mr-1" />
                  <a href="#" className="text-blue-600 underline">SKU Management Process and Guidelines</a>
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(aiResponse)}>
                  <Copy className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="w-4 h-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="sm">
                  <RotateCw className="w-4 h-4 text-gray-500" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}



//TEST 2

// "use client"
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Sparkle, Compass, BrainCircuit, Weight, SendHorizontal, Loader2, Copy, Volume2, ThumbsUp, ThumbsDown, RotateCw, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

// interface ChatMessage {
//   role: 'user' | 'ai'
//   content: string
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

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     setVisibleSteps([]);
//     setCurrentStep(0);
//     setIsComplete(false);
//     setIsExpanded(true);

//     const newUserMessage: ChatMessage = { role: 'user', content: prompt };
//     setChatHistory((prev) => [...prev, newUserMessage]);

//     try {
//       for (let i = 0; i < steps.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setVisibleSteps(prev => [...prev, steps[i]]);
//         setCurrentStep(i);
//       }

//       await new Promise(resolve => setTimeout(resolve, 500));
//       setIsComplete(true);
//       setIsExpanded(false);

//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const res = await fetch('/api/v1/Enterpise-AI-Search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();
//       const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text };
//       setChatHistory((prev) => [...prev, newAIMessage]);
//       setPrompt("");
//     } catch (error) {
//       console.error('Error in API call:', error);
//       const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." };
//       setChatHistory((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCardClick = (content: string) => {
//     console.log("Card clicked with content:", content);
//     setPrompt(content);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       console.log("Enter key pressed");
//       handleSubmit();
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   };

//   const handleAction = (action: string, index: number) => {
//     console.log(`${action} button clicked for message index:`, index);
//   };

//   const toggleExpand = () => setIsExpanded(!isExpanded);

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       {chatHistory.length === 0 ? (
//         <>
//           <h1 className="text-4xl mb-2">
//             <span className="text-teal-600">Hello,</span>{' '}
//             <span className="text-indigo-600">Ngesa</span>
//           </h1>
//           <h2 className="text-2xl text-gray-600 mb-8">How can I help you today?</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("What is Safaricom Telematics Monthly Service?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">What is Safaricom Telematics Monthly Service?</p>
//                 <Sparkle className="text-amber-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("I am selling Safaricom Cloud, Who do I talk to and what are their concerns?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">I am selling Safaricom Cloud, Who do I talk to and what are their concerns?</p>
//                 <Compass className="text-sky-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("Write for me an article about Safaricom Telematics")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">Write for me an article about Safaricom Telematics</p>
//                 <BrainCircuit className="text-emerald-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("How do I conduct an initial sales conversation with customers?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">How do I conduct an initial sales conversation with customers?</p>
//                 <Weight className="text-rose-500" size={24} />
//               </CardContent>
//             </Card>
//           </div>
//         </>
//       ) : (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%]">
//                   <div className="flex items-start space-x-4">
//                     <div className="w-9 h-9 rounded-full flex items-center justify-center">
//                       <img
//                         src={message.role === 'user' ? "/african.svg" : "/zuri-icon.svg"}
//                         alt={message.role === 'user' ? "User Icon" : "AI Icon"}
//                         className="w-9 h-9"
//                       />
//                     </div>
//                     <div className="flex-grow">
//                       <p className="text-gray-700">{message.content}</p>
//                     </div>
//                   </div>
//                   {message.role === 'ai' && (
//                     <div className="flex justify-end space-x-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleAction('Speak', index)}
//                         className="h-8 w-8"
//                       >
//                         <Volume2 className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => copyToClipboard(message.content)}
//                         className="h-8 w-8"
//                       >
//                         <Copy className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleAction('Like', index)}
//                         className="h-8 w-8"
//                       >
//                         <ThumbsUp className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleAction('Dislike', index)}
//                         className="h-8 w-8"
//                       >
//                         <ThumbsDown className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => handleAction('Regenerate', index)}
//                         className="h-8 w-8"
//                       >
//                         <RotateCw className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {(isLoading || isComplete) && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <div className="w-8 h-8 flex items-center justify-center mr-4">
//                 <img 
//                   src="/zuri-icon.svg" 
//                   alt="AI Icon" 
//                   className="w-8 h-8"
//                 />
//               </div>
//               <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                 {isComplete ? "5 Steps completed" : "GURU is Processing..."}
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
//         </div>
//       )}

//       <div className="relative">
//         <Input 
//           placeholder="What can I help with?" 
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           value={prompt}
//           onChange={(e) => {
//             console.log("Prompt changed:", e.target.value);
//             setPrompt(e.target.value);
//           }}
//           onKeyPress={handleKeyPress}
//         />
//         <Button 
//           variant="ghost" 
//           size="icon"
//           onClick={() => {
//             console.log("Submit button clicked");
//             handleSubmit();
//           }}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//         >
//           {isLoading ? (
//             <Loader2 className="animate-spin h-5 w-5" />
//           ) : (
//             <SendHorizontal className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }





// TEST  3

// "use client"
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Sparkle, Compass, BrainCircuit, Weight, SendHorizontal, Loader2, Copy, Volume2, ThumbsUp, ThumbsDown, RotateCw, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
//   visibleSteps: string[];
//   currentStep: number;
//   isComplete: boolean;
//   isExpanded: boolean;
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

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     const newUserMessage: ChatMessage = { 
//       role: 'user', 
//       content: prompt,
//       visibleSteps: [],
//       currentStep: 0,
//       isComplete: false,
//       isExpanded: true
//     };
//     const newAIMessage: ChatMessage = { 
//       role: 'ai', 
//       content: '', 
//       visibleSteps: [],
//       currentStep: 0,
//       isComplete: false,
//       isExpanded: true
//     };
//     setChatHistory((prev) => [...prev, newUserMessage, newAIMessage]);

//     try {
//       const updatedHistory = [...chatHistory, newUserMessage, newAIMessage];
//       const aiMessageIndex = updatedHistory.length - 1;

//       for (let i = 0; i < steps.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setChatHistory((prev) => {
//           const updated = [...prev];
//           const aiMessage = updated[aiMessageIndex];
//           aiMessage.visibleSteps = [...aiMessage.visibleSteps, steps[i]];
//           aiMessage.currentStep = i;
//           return updated;
//         });
//       }

//       await new Promise(resolve => setTimeout(resolve, 500));

//       setChatHistory((prev) => {
//         const updated = [...prev];
//         const aiMessage = updated[aiMessageIndex];
//         aiMessage.isComplete = true;
//         aiMessage.isExpanded = false;
//         return updated;
//       });

//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const res = await fetch('/api/v1/Enterpise-AI-Search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();

//       setChatHistory((prev) => {
//         const updated = [...prev];
//         const aiMessage = updated[aiMessageIndex];
//         aiMessage.content = data.generated_text;
//         return updated;
//       });

//       setPrompt("");
//     } catch (error) {
//       console.error('Error in API call:', error);
//       setChatHistory((prev) => {
//         const updated = [...prev];
//         const aiMessage = updated[updated.length - 1];
//         aiMessage.content = "An error occurred while processing your request.";
//         aiMessage.isComplete = true;
//         return updated;
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCardClick = (content: string) => {
//     console.log("Card clicked with content:", content);
//     setPrompt(content);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       console.log("Enter key pressed");
//       handleSubmit();
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   };

//   const handleAction = (action: string, index: number) => {
//     console.log(`${action} button clicked for message index:`, index);
//   };

//   const toggleExpand = (index: number) => {
//     setChatHistory((prev) => {
//       const updated = [...prev];
//       updated[index].isExpanded = !updated[index].isExpanded;
//       return updated;
//     });
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       {chatHistory.length === 0 ? (
//         <>
//           <h1 className="text-4xl mb-2">
//             <span className="text-teal-600">Hello,</span>{' '}
//             <span className="text-indigo-600">Ngesa</span>
//           </h1>
//           <h2 className="text-2xl text-gray-600 mb-8">How can I help you today?</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("What is Safaricom Telematics Monthly Service?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">What is Safaricom Telematics Monthly Service?</p>
//                 <Sparkle className="text-amber-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("I am selling Safaricom Cloud, Who do I talk to and what are their concerns?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">I am selling Safaricom Cloud, Who do I talk to and what are their concerns?</p>
//                 <Compass className="text-sky-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("Write for me an article about Safaricom Telematics")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">Write for me an article about Safaricom Telematics</p>
//                 <BrainCircuit className="text-emerald-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("How do I conduct an initial sales conversation with customers?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">How do I conduct an initial sales conversation with customers?</p>
//                 <Weight className="text-rose-500" size={24} />
//               </CardContent>
//             </Card>
//           </div>
//         </>
//       ) : (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 w-full">
//                   {message.role === 'user' ? (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-9 h-9 rounded-full flex items-center justify-center">
//                         <img
//                           src="/african.svg"
//                           alt="User Icon"
//                           className="w-9 h-9"
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <p className="text-gray-700">{message.content}</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center">
//                           <div className="w-9 h-9 rounded-full flex items-center justify-center mr-4">
//                             <img
//                               src="/zuri-icon.svg"
//                               alt="AI Icon"
//                               className="w-9 h-9"
//                             />
//                           </div>
//                           <span className={message.isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                             {message.isComplete ? "5 Steps completed" : "GURU is Processing..."}
//                           </span>
//                         </div>
//                         <button onClick={() => toggleExpand(index)} className="text-blue-500">
//                           {message.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//                         </button>
//                       </div>
//                       {message.isExpanded && (
//                         <ul className="space-y-3 mb-4">
//                           {message.visibleSteps.map((step, stepIndex) => (
//                             <li key={stepIndex} className="flex items-center">
//                               {stepIndex < message.currentStep ? (
//                                 <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                               ) : (
//                                 <Circle className={`w-5 h-5 mr-2 ${stepIndex === message.currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                               )}
//                               <span className={stepIndex <= message.currentStep ? 'text-gray-700' : 'text-gray-400'}>
//                                 {step}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                       {message.content && (
//                         <div className="mt-4">
//                           <p className="text-gray-700">{message.content}</p>
//                         </div>
//                       )}
//                       <div className="flex justify-end space-x-2 mt-2">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleAction('Speak', index)}
//                           className="h-8 w-8"
//                         >
//                           <Volume2 className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => copyToClipboard(message.content)}
//                           className="h-8 w-8"
//                         >
//                           <Copy className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleAction('Like', index)}
//                           className="h-8 w-8"
//                         >
//                           <ThumbsUp className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleAction('Dislike', index)}
//                           className="h-8 w-8"
//                         >
//                           <ThumbsDown className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleAction('Regenerate', index)}
//                           className="h-8 w-8"
//                         >
//                           <RotateCw className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="relative">
//         <Input 
//           placeholder="What can I help with?" 
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           value={prompt}
//           onChange={(e) => {
//             console.log("Prompt changed:", e.target.value);
//             setPrompt(e.target.value);
//           }}
//           onKeyPress={handleKeyPress}
//         />
//         <Button 
//           variant="ghost" 
//           size="icon"
//           onClick={() => {
//             console.log("Submit button clicked");
//             handleSubmit();
//           }}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//         >
//           {isLoading ? (
//             <Loader2 className="animate-spin h-5 w-5" />
//           ) : (
//             <SendHorizontal className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }





// // TSET 4
// "use client"
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Sparkle, Compass, BrainCircuit, Weight, SendHorizontal, Loader2, Copy, Volume2, ThumbsUp, ThumbsDown, RotateCw, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

// interface ChatMessage {
//   role: 'user' | 'ai';
//   content: string;
//   visibleSteps: string[];
//   currentStep: number;
//   isComplete: boolean;
//   isExpanded: boolean;
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

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     const newUserMessage: ChatMessage = { 
//       role: 'user', 
//       content: prompt,
//       visibleSteps: [],
//       currentStep: 0,
//       isComplete: false,
//       isExpanded: true
//     };
//     const newAIMessage: ChatMessage = { 
//       role: 'ai', 
//       content: '', 
//       visibleSteps: [],
//       currentStep: 0,
//       isComplete: false,
//       isExpanded: true
//     };
//     setChatHistory((prev) => [...prev, newUserMessage, newAIMessage]);

//     try {
//       const updatedHistory = [...chatHistory, newUserMessage, newAIMessage];
//       const aiMessageIndex = updatedHistory.length - 1;

//       for (let i = 0; i < steps.length; i++) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         setChatHistory((prev) => {
//           const updated = [...prev];
//           const aiMessage = updated[aiMessageIndex];
//           aiMessage.visibleSteps = [...aiMessage.visibleSteps, steps[i]];
//           aiMessage.currentStep = i;
//           return updated;
//         });
//       }

//       await new Promise(resolve => setTimeout(resolve, 500));

//       setChatHistory((prev) => {
//         const updated = [...prev];
//         const aiMessage = updated[aiMessageIndex];
//         aiMessage.isComplete = true;
//         aiMessage.isExpanded = false;
//         return updated;
//       });

//       await new Promise(resolve => setTimeout(resolve, 1000));

//       const res = await fetch('/api/v1/Enterpise-AI-Search', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();

//       setChatHistory((prev) => {
//         const updated = [...prev];
//         const aiMessage = updated[aiMessageIndex];
//         aiMessage.content = data.generated_text;
//         return updated;
//       });

//       setPrompt("");
//     } catch (error) {
//       console.error('Error in API call:', error);
//       setChatHistory((prev) => {
//         const updated = [...prev];
//         const aiMessage = updated[updated.length - 1];
//         aiMessage.content = "An error occurred while processing your request.";
//         aiMessage.isComplete = true;
//         return updated;
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCardClick = (content: string) => {
//     console.log("Card clicked with content:", content);
//     setPrompt(content);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       console.log("Enter key pressed");
//       handleSubmit();
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).then(() => {
//       console.log('Text copied to clipboard');
//     }).catch(err => {
//       console.error('Failed to copy text: ', err);
//     });
//   };

//   const handleAction = (action: string, index: number) => {
//     console.log(`${action} button clicked for message index:`, index);
//   };

//   const toggleExpand = (index: number) => {
//     setChatHistory((prev) => {
//       const updated = [...prev];
//       updated[index].isExpanded = !updated[index].isExpanded;
//       return updated;
//     });
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       {chatHistory.length === 0 ? (
//         <>
//           <h1 className="text-4xl mb-2">
//             <span className="text-teal-600">Hello,</span>{' '}
//             <span className="text-indigo-600">Ngesa</span>
//           </h1>
//           <h2 className="text-2xl text-gray-600 mb-8">How can I help you today?</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("What is Safaricom Telematics Monthly Service?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">What is Safaricom Telematics Monthly Service?</p>
//                 <Sparkle className="text-amber-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("I am selling Safaricom Cloud, Who do I talk to and what are their concerns?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">I am selling Safaricom Cloud, Who do I talk to and what are their concerns?</p>
//                 <Compass className="text-sky-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("Write for me an article about Safaricom Telematics")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">Write for me an article about Safaricom Telematics</p>
//                 <BrainCircuit className="text-emerald-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("How do I conduct an initial sales conversation with customers?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">How do I conduct an initial sales conversation with customers?</p>
//                 <Weight className="text-rose-500" size={24} />
//               </CardContent>
//             </Card>
//           </div>
//         </>
//       ) : (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 w-full">
//                   {message.role === 'user' ? (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-9 h-9 rounded-full flex items-center justify-center">
//                         <img
//                           src="/african.svg"
//                           alt="User Icon"
//                           className="w-9 h-9"
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <p className="text-gray-700">{message.content}</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center flex-grow">
//                           <div className="w-9 h-9 rounded-full flex items-center justify-center mr-4">
//                             <img
//                               src="/zuri-icon.svg"
//                               alt="AI Icon"
//                               className="w-9 h-9"
//                             />
//                           </div>
//                           <span className={message.isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                             {message.isComplete ? "5 Steps completed" : "GURU is Processing..."}
//                           </span>
//                           <button onClick={() => toggleExpand(index)} className="text-blue-500 ml-2">
//                             {message.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//                           </button>
//                         </div>
//                       </div>
//                       {message.isExpanded && (
//                         <ul className="space-y-3 mb-4">
//                           {message.visibleSteps.map((step, stepIndex) => (
//                             <li key={stepIndex} className="flex items-center">
//                               {stepIndex < message.currentStep ? (
//                                 <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                               ) : (
//                                 <Circle className={`w-5 h-5 mr-2 ${stepIndex === message.currentStep ? 'text-blue-500 animate-pulse' : 'text-gray-300'}`} />
//                               )}
//                               <span className={stepIndex <= message.currentStep ? 'text-gray-700' : 'text-gray-400'}>
//                                 {step}
//                               </span>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                       <div className="flex">
//                         <div className="flex flex-col space-y-2 mr-4">
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => handleAction('Speak', index)}
//                             className="h-8 w-8"
//                           >
//                             <Volume2 className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => copyToClipboard(message.content)}
//                             className="h-8 w-8"
//                           >
//                             <Copy className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => handleAction('Like', index)}
//                             className="h-8 w-8"
//                           >
//                             <ThumbsUp className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => handleAction('Dislike', index)}
//                             className="h-8 w-8"
//                           >
//                             <ThumbsDown className="h-4 w-4" />
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => handleAction('Regenerate', index)}
//                             className="h-8 w-8"
//                           >
//                             <RotateCw className="h-4 w-4" />
//                           </Button>
//                         </div>
//                         {message.content && (
//                           <div className="flex-grow">
//                             <p className="text-gray-700">{message.content}</p>
//                           </div>
//                         )}
//                       </div>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="relative">
//         <Input 
//           placeholder="What can I help with?" 
//           className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
//           value={prompt}
//           onChange={(e) => {
//             console.log("Prompt changed:", e.target.value);
//             setPrompt(e.target.value);
//           }}
//           onKeyPress={handleKeyPress}
//         />
//         <Button 
//           variant="ghost" 
//           size="icon"
//           onClick={() => {
//             console.log("Submit button clicked");
//             handleSubmit();
//           }}
//           disabled={isLoading}
//           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
//         >
//           {isLoading ? (
//             <Loader2 className="animate-spin h-5 w-5" />
//           ) : (
//             <SendHorizontal className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }



// TEST 5
// "use client";
// import React, { useState, useCallback } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Sparkle,
//   Compass,
//   BrainCircuit,
//   Weight,
//   CheckCircle2,
//   Circle,
//   ChevronDown,
//   ChevronUp,
//   Copy,
//   ThumbsUp,
//   ThumbsDown,
//   RotateCw,
// } from "lucide-react";

// interface ChatMessage {
//   role: "user" | "ai";
//   content: string;
//   visibleSteps: string[];
//   currentStep: number;
//   isComplete: boolean;
//   isExpanded: boolean;
// }

// const steps = [
//   "Give me a moment...",
//   "Analyzing the request...",
//   "Searching relevant information...",
//   "Reviewing...",
//   "Generating the answer...",
// ];

// export default function AssistantUI() {
//   const [prompt, setPrompt] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const updateChatHistory = useCallback((index: number, update: Partial<ChatMessage>) => {
//     setChatHistory((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], ...update };
//       return updated;
//     });
//   }, []);

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;

//     setIsLoading(true);

//     const newUserMessage: ChatMessage = {
//       role: "user",
//       content: prompt,
//       visibleSteps: [],
//       currentStep: 0,
//       isComplete: false,
//       isExpanded: true,
//     };

//     const newAIMessage: ChatMessage = {
//       role: "ai",
//       content: "",
//       visibleSteps: [],
//       currentStep: 0,
//       isComplete: false,
//       isExpanded: true,
//     };

//     const newChatHistory = [...chatHistory, newUserMessage, newAIMessage];
//     setChatHistory(newChatHistory);
//     const aiMessageIndex = newChatHistory.length - 1;

//     try {
//       for (let i = 0; i < steps.length; i++) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         updateChatHistory(aiMessageIndex, {
//           visibleSteps: [...newChatHistory[aiMessageIndex].visibleSteps, steps[i]],
//           currentStep: i,
//         });
//       }

//       const res = await fetch("/api/v1/Enterprise-AI-Search", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();

//       updateChatHistory(aiMessageIndex, {
//         content: data.generated_text,
//         isComplete: true,
//         isExpanded: false,
//       });
//       setPrompt("");
//     } catch (error) {
//       console.error("Error in API call:", error);
//       updateChatHistory(aiMessageIndex, {
//         content: "An error occurred while processing your request.",
//         isComplete: true,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCardClick = (content: string) => {
//     setPrompt(content);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       handleSubmit();
//     }
//   };

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text).catch((err) => {
//       console.error("Failed to copy text: ", err);
//     });
//   };

//   const toggleExpand = (index: number) => {
//     updateChatHistory(index, { isExpanded: !chatHistory[index].isExpanded });
//   };

//   return (
//     <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
//       {chatHistory.length === 0 ? (
//         <>
//           <h1 className="text-4xl mb-2">
//             <span className="text-teal-600">Hello,</span>{" "}
//             <span className="text-indigo-600">Ngesa</span>
//           </h1>
//           <h2 className="text-2xl text-gray-600 mb-8">How can I help you today?</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("What is Safaricom Telematics Monthly Service?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">What is Safaricom Telematics Monthly Service?</p>
//                 <Sparkle className="text-amber-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("I am selling Safaricom Cloud, Who do I talk to and what are their concerns?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">I am selling Safaricom Cloud, Who do I talk to and what are their concerns?</p>
//                 <Compass className="text-sky-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("Write for me an article about Safaricom Telematics")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">Write for me an article about Safaricom Telematics</p>
//                 <BrainCircuit className="text-emerald-500" size={24} />
//               </CardContent>
//             </Card>
//             <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("How do I conduct an initial sales conversation with customers?")}>
//               <CardContent className="flex flex-col items-start space-y-2">
//                 <p className="text-sm text-gray-700">How do I conduct an initial sales conversation with customers?</p>
//                 <Weight className="text-rose-500" size={24} />
//               </CardContent>
//             </Card>
//           </div>
//         </>
//       ) : (
//         <div className="space-y-4 mb-8">
//           <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search</h2>
//           <div className="max-h-[60vh] overflow-y-auto space-y-4">
//             {chatHistory.map((message, index) => (
//               <div key={index} className="flex justify-start">
//                 <div className="bg-white p-4 rounded-md shadow-sm space-y-2 w-full">
//                   {message.role === "user" ? (
//                     <div className="flex items-start space-x-4">
//                       <div className="w-9 h-9 rounded-full flex items-center justify-center">
//                         <img
//                           src="/african.svg"
//                           alt="User Icon"
//                           className="w-9 h-9"
//                         />
//                       </div>
//                       <div className="flex-grow">
//                         <p className="text-gray-700">{message.content}</p>
//                       </div>
//                     </div>
//                   ) : (
//                     <>
//                       <div className="flex items-center justify-between mb-4">
//                         <div className="flex items-center">
//                           <div className="w-9 h-9 rounded-full flex items-center justify-center mr-4">
//                             <img
//                               src="/zuri-icon.svg"
//                               alt="AI Icon"
//                               className="w-9 h-9"
//                             />
//                           </div>
//                           <span className={message.isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
//                             {message.isComplete ? "5 Steps completed" : "GURU is Processing..."}
//                           </span>
//                         </div>
//                         <button onClick={() => toggleExpand(index)} className="text-blue-500">
//                           {message.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//                         </button>
//                       </div>
//                       {message.isExpanded && (
//                         <ul className="space-y-3 mb-4">
//                           {message.visibleSteps.map((step, stepIndex) => (
//                             <li key={stepIndex} className="flex items-center">
//                               {stepIndex < message.currentStep ? (
//                                 <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
//                               ) : (
//                                 <Circle className={`w-5 h-5 mr-2 ${stepIndex === message.currentStep ? "text-blue-500 animate-pulse" : "text-gray-300"}`} />
//                               )}
//                               <span className={stepIndex <= message.currentStep ? "text-gray-700" : "text-gray-300"}>{step}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                       {message.isComplete && (
//                         <div className="relative">
//                           <p className="whitespace-pre-line text-gray-800">{message.content}</p>
//                           <div className="absolute top-0 right-0 flex items-center space-x-2">
//                             <Button variant="ghost" size="sm" onClick={() => copyToClipboard(message.content)}>
//                               <Copy className="w-4 h-4 text-gray-500" />
//                             </Button>
//                             <Button variant="ghost" size="sm">
//                               <ThumbsUp className="w-4 h-4 text-gray-500" />
//                             </Button>
//                             <Button variant="ghost" size="sm">
//                               <ThumbsDown className="w-4 h-4 text-gray-500" />
//                             </Button>
//                             <Button variant="ghost" size="sm" onClick={() => setChatHistory(chatHistory.filter((_, i) => i !== index))}>
//                               <RotateCw className="w-4 h-4 text-gray-500" />
//                             </Button>
//                           </div>
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="flex items-center space-x-4">
//         <Input
//           placeholder="Type your question here"
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           onKeyDown={handleKeyPress}
//           disabled={isLoading}
//           className="flex-grow"
//         />
//         <Button onClick={handleSubmit} disabled={isLoading}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// }
