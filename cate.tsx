"use client"
import React, { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkle, Compass, BrainCircuit, Weight, SendHorizontal, Loader2, Copy, Volume2, ThumbsUp, ThumbsDown, RotateCw } from "lucide-react";

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

export default function AssistantUI() {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    const newUserMessage: ChatMessage = { role: 'user', content: prompt };
    setChatHistory((prev) => [...prev, newUserMessage]);

    try {
      const res = await fetch('/api/v1/Enterpise-AI-Search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text };
      setChatHistory((prev) => [...prev, newAIMessage]);
      setPrompt("");
    } catch (error) {
      console.error('Error in API call:', error);
      const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." };
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
    if (e.key === 'Enter') {
      console.log("Enter key pressed");
      handleSubmit();
    }
  };

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
      {chatHistory.length === 0 ? (
        <>
          <h1 className="text-4xl mb-2">
            <span className="text-teal-600">Hello,</span>{' '}
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
                    <div className="w-9 h-9 rounded-full flex items-center justify-center">
                      <Image
                        src={message.role === 'user' ? "/african.svg" : "/zuri-icon.svg"}
                        alt={message.role === 'user' ? "User Icon" : "AI Icon"}
                        width={36}
                        height={36}
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  </div>
                  {message.role === 'ai' && (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction('Speak', index)}
                        className="h-8 w-8"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => copyToClipboard(message.content)}
                        className="h-8 w-8"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction('Like', index)}
                        className="h-8 w-8"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction('Dislike', index)}
                        className="h-8 w-8"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleAction('Regenerate', index)}
                        className="h-8 w-8"
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative">
        <Input 
          placeholder="What can I help with?" 
          className="w-full bg-white text-gray-800 p-3 pr-12 rounded-lg shadow-sm"
          value={prompt}
          onChange={(e) => {
            console.log("Prompt changed:", e.target.value);
            setPrompt(e.target.value);
          }}
          onKeyPress={handleKeyPress}
        />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            console.log("Submit button clicked");
            handleSubmit();
          }}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
        >
          {isLoading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
        </Button>
      </div>
      <p className="text-xs text-center text-gray-500 mt-4">
      GURU can make mistakes, so double-check its responses. 
        <a href="#" className="underline">Safaricom Privacy Policy</a>
     </p>
    </div>
  );
}