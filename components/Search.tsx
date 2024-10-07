"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, SendHorizontal, Loader2, Sparkle, BrainCircuit, Weight, Copy } from "lucide-react";
import Image from "next/image"
import toast, { Toaster } from 'react-hot-toast' // Add this import

interface ChatMessage {
  role: 'user' | 'ai'
  content: string
}

export default function AssistantUI() {
  const [prompt, setPrompt] = useState("")
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (!prompt.trim()) return

    setIsLoading(true)
    const newUserMessage: ChatMessage = { role: 'user', content: prompt }
    setChatHistory(prev => [...prev, newUserMessage])

    try {
      const res = await fetch('/api/v1/Enterpise-AI-Search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })
      const data = await res.json()
      const newAIMessage: ChatMessage = { role: 'ai', content: data.generated_text }
      setChatHistory(prev => [...prev, newAIMessage])
      setPrompt("")
    } catch (error) {
      console.error('Error in API call:', error)
      const errorMessage: ChatMessage = { role: 'ai', content: "An error occurred while processing your request." }
      setChatHistory(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardClick = (content: string) => {
    console.log("Card clicked with content:", content)
    setPrompt(content)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log("Enter key pressed")
      handleSubmit()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Text copied to clipboard', {
        duration: 2000,
        position: 'bottom-center',
      });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast.error('Failed to copy text');
    });
  }

  return (
    <><Toaster />
    <div className="w-fit mx-auto py-10 px-11  space-y-6">
       {/* Add this line to render the toast notifications */}
      
      {chatHistory.length === 0 ? (
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-green-500">Hello,</span>        
            </h1>
            <p className="text-3xl text-gray-400 font-light">
              How can I help you today?
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-blue-50" onClick={() => handleCardClick("What is Safaricom Telematics Monthly Service?")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                {/* <p>Sales Assistant: Prep for meetings and access all the product knowledge, so you can close more deals.</p> */}
                <p>What is Safaricom Telematics Monthly Service?</p>
                <Sparkle className="mt-auto" />
              </CardContent>
            </Card>
            {/* <Card className="bg-gray-50" onClick={() => handleCardClick("Recommend an IoT SIM card profile and package")}> */}
            <Card className="bg-gray-50" onClick={() => handleCardClick("I am selling Safaricom Cloud, Who do I talk to and what are their concerns?")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                {/* <p>Product Recommnedations (Retail ): Close deals faster, accurately and put customer fast</p> */}
                <p>I am selling Safaricom Cloud, Who do I talk to and what are their concerns?</p>
                <Compass className="mt-auto" />
              </CardContent>
            </Card>
            <Card className="bg-gray-50" onClick={() => handleCardClick("Write for me an article about Safaricom Telematics")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <p>Write for me an article about Safaricom Telematics</p>
                <BrainCircuit className="mt-auto" />
              </CardContent>
            </Card>
            <Card className="bg-gray-50" onClick={() => handleCardClick("How do I conduct an initial sales conversation with customers?")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <p>How do I conduct an initial sales conversation with customers?</p>
                <Weight className="mt-auto" />
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold py-4">GURU</h2>
          <div className="max-h-[60vh] overflow-y-auto space-y-4">
            {chatHistory.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`bg-gray-100 p-4 rounded-md space-y-2 max-w-[80%] ${message.role === 'user' ? 'bg-blue-100' : ''}`}>
                  <div className={`flex items-start space-x-8 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Image
                      src={message.role === 'user' ? "/african.svg" : "/zuri-icon.svg"}
                      alt={`${message.role === 'user' ? 'User' : 'AI'} Icon`}
                      width={36}
                      height={36}
                    />
                    <div className="flex-grow">
                      <p>{message.content}</p>
                    </div>
                  </div>
                  {message.role === 'ai' && (
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(message.content)}
                        className="text-xs"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative mt-4 bg-white border-t border-gray-200 pt-4">
        <div className="relative">
          <Input 
            placeholder="Enter a prompt here" 
            className="pr-12"
            value={prompt}
            onChange={(e) => {
              console.log("Prompt changed:", e.target.value)
              setPrompt(e.target.value)
            }}
            onKeyPress={handleKeyPress}
          />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              console.log("Submit button clicked")
              handleSubmit()
            }}
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        GURU may display inaccurate info, so double-check its responses. 
        <a href="#" className="underline">Safaricom Privacy Policy</a>
      </p>
    </div>
    </>
  )
}