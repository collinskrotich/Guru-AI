"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Sparkle, Compass, BrainCircuit, Weight, SendHorizontal, Loader2, Copy, ThumbsUp, ThumbsDown, RotateCw, Volume2, CheckCircle2, Circle, ChevronDown, ChevronUp } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

const steps = [
  'Give me a moment...',
  'Analyzing the request...',
  'Searching relevant information...',
  'Reviewing...',
  'Generating the answer...'
];

export default function AssistantUI() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [showSteps, setShowSteps] = useState(true);  // New state for toggle

  const startLoadingSteps = async () => {
    setIsLoading(true);
    setVisibleSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);

    // Simulate step-by-step loading process
    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setVisibleSteps((prev) => [...prev, steps[i]]);
      setCurrentStep(i);
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsComplete(true);
    setIsExpanded(false);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    const newUserMessage: ChatMessage = { role: "user", content: prompt };
    setChatHistory((prev) => [...prev, newUserMessage]);

    try {
      await startLoadingSteps(); // Start the loading steps

      const res = await fetch("/api/v1/Enterpise-AI-Search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const newAIMessage: ChatMessage = {
        role: "ai",
        content: data.generated_text,
      };
      setChatHistory((prev) => [...prev, newAIMessage]);
      setPrompt("");
    } catch (error) {
      console.error("Error in API call:", error);
      const errorMessage: ChatMessage = {
        role: "ai",
        content: "An error occurred while processing your request.",
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (content: string) => {
    console.log("Card clicked with content:", content);
    setPrompt(content);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const toggleSteps = () => {
    setShowSteps(!showSteps); // Toggle the steps visibility
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      });
      setCurrentDateTime(formattedDateTime);
    }, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
      // You can add a visual feedback here if needed
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleAction = (action: string, index: number) => {
    console.log(`${action} button clicked for message index:`, index);
    // You can implement your logic for each action here (e.g., Speak, Like, Dislike, Regenerate)
  };

  return (
    <div className="bg-gray-100 text-gray-800 p-8 min-h-screen">
      <div className="text-xs text-gray-500 mb-4 text-center border-b border-gray-300 pb-2">{currentDateTime}</div>
      {chatHistory.length === 0 ? (
        <>
          <h1 className="text-4xl mb-2">
            <span className="text-teal-600">Hello,</span>{" "}
            <span className="text-indigo-600">Ngesa</span>
          </h1>
          <h2 className="text-2xl text-gray-600 mb-8">How can I help you today?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("What is Safaricom Telematics Monthly Service?")}>
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">What is Safaricom Telematics Monthly Service?</p>
                <Sparkle className="text-amber-500" size={24} />
              </CardContent>
            </Card>
            <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("I am selling Safaricom Cloud, Who do I talk to and what are their concerns?")}>
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">I am selling Safaricom Cloud, Who do I talk to and what are their concerns?</p>
                <Compass className="text-sky-500" size={24} />
              </CardContent>
            </Card>
            <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("Write for me an article about Safaricom Telematics")}>
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">Write for me an article about Safaricom Telematics</p>
                <BrainCircuit className="text-emerald-500" size={24} />
              </CardContent>
            </Card>
            <Card className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300" onClick={() => handleCardClick("How do I conduct an initial sales conversation with customers?")}>
              <CardContent className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-700">How do I conduct an initial sales conversation with customers?</p>
                <Weight className="text-rose-500" size={24} />
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-bold py-4 text-gray-800">AI Search</h2>
          <div className="max-h-[60vh] overflow-y-auto space-y-4">
            {chatHistory.map((message, index) => (
              <div key={index} className="flex justify-start">
                <div className="bg-white p-4 rounded-md shadow-sm space-y-2 max-w-[80%]">
                  <div className="flex items-start space-x-4">
                    {/* Display AI or User message */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center">
                      <Image
                        src={message.role === 'user' ? "/african.svg" : "/zuri-icon.svg"}
                        alt={message.role === 'user' ? "User Icon" : "AI Icon"}
                        width={36}
                        height={36}
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`text-${message.role === 'user' ? 'gray-900' : 'green-600'} font-medium`}>
                        {message.role === 'user' ? 'You' : 'Assistant'}
                      </p>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {message.role === 'ai' && (
                    <div className="flex space-x-2 mt-2">
                      <Button variant="ghost" onClick={() => copyToClipboard(message.content)}>
                        <Copy size={20} />
                      </Button>
                      <Button variant="ghost" onClick={() => handleAction("like", index)}>
                        <ThumbsUp size={20} />
                      </Button>
                      <Button variant="ghost" onClick={() => handleAction("dislike", index)}>
                        <ThumbsDown size={20} />
                      </Button>
                      <Button variant="ghost" onClick={() => handleAction("regenerate", index)}>
                        <RotateCw size={20} />
                      </Button>
                      <Button variant="ghost" onClick={() => handleAction("speak", index)}>
                        <Volume2 size={20} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toggle Step Process */}
      {isLoading && (
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            {isComplete ? (
              <CheckCircle2 size={24} className="text-green-500" />
            ) : (
              <Loader2 size={24} className="animate-spin text-blue-500" />
            )}
            <p className="text-sm font-medium">{isComplete ? '5 Steps Completed' : steps[currentStep]}</p>
          </div>

          {isComplete && (
            <div className="mt-2">
              <Button variant="ghost" onClick={toggleSteps} className="flex items-center space-x-2">
                {showSteps ? (
                  <>
                    <ChevronUp size={20} />
                    <span>Hide Steps</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={20} />
                    <span>Show Steps</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {showSteps && (
            <ul className="list-disc ml-6 mt-2 text-gray-600">
              {steps.map((step, index) => (
                <li key={index} className="flex items-center space-x-2">
                  {currentStep > index ? (
                    <CheckCircle2 size={20} className="text-green-500" />
                  ) : (
                    <Circle size={20} className="text-gray-400" />
                  )}
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Input box */}
      <div className="flex items-center space-x-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question here..."
          className="flex-1"
          disabled={isLoading}
        />
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" size={24} /> : <SendHorizontal size={24} />}
        </Button>
      </div>
    </div>
  );
}
