"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {  Compass, SendHorizontal, Loader2, Sparkle, BrainCircuit, Weight } from "lucide-react"
import Image from "next/image"

export default function AssistantUI() {
  console.log("AssistantUI component rendered")
  const [prompt, setPrompt] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [displayPrompt, setDisplayPrompt] = useState("")

  const handleSubmit = async () => {
    console.log("handleSubmit function called")
    setIsLoading(true)
    console.log("isLoading set to true")
    try {
      console.log("Sending request to API via proxy")
      console.log("Request body:", JSON.stringify({ prompt }))
      const res = await fetch('/api/v1/Enterpise-AI-Search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })
      console.log("Response received from API")
      const data = await res.json()
      console.log("Parsed response data:", data)
      setResponse(data.generated_text) // Update this line to use generated_text
      setDisplayPrompt(prompt)
      setPrompt("") // Clear the input field
      console.log("Response state updated")
    } catch (error) {
      console.error('Error in API call:', error)
      setResponse("An error occurred while processing your request.")
      console.log("Error response set")
    } finally {
      setIsLoading(false)
      console.log("isLoading set to false")
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

  return (
    <div className="max-w-2xl mx-auto py-40 space-y-20">
      
      {!response && (
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold">
              <span className="text-blue-500">Hello,</span>        
            </h1>
            <p className="text-3xl text-gray-400 font-light">
              How can I help you today?
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="bg-blue-50" onClick={() => handleCardClick("Create a summary of Safaricom cloud capabilities")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <p>Create a summary of Safaricom cloud capabilities</p>
                <Sparkle className="mt-auto" />
              </CardContent>
            </Card>
            <Card className="bg-gray-50" onClick={() => handleCardClick("What are some of the Safaricom enterprise solutions?")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <p>What are some of the Safaricom enterprise solutions?</p>
                <Compass className="mt-auto" />
              </CardContent>
            </Card>
            <Card className="bg-gray-50" onClick={() => handleCardClick("How can a salesperson benefit from AI?")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <p>How can a salesperson benefit from AI?</p>
                <BrainCircuit className="mt-auto" />
              </CardContent>
            </Card>
            <Card className="bg-gray-50" onClick={() => handleCardClick("Suggest products to recommend to Large enterprises in Kenya")}>
              <CardContent className="p-4 flex flex-col items-start space-y-2">
                <p>Suggest products to recommend to Large enterprises in Kenya</p>
                <Weight className="mt-auto" />
              </CardContent>
            </Card>
          </div>
        </>
      )}
       
      {response && (
        
        <div className="space-y-4 mt-4">
          <h2 className="text-2xl font-bold py-8 px-4">Enterprise AI Search</h2>
          <div className="bg-gray-100 p-4 rounded-md flex items-start space-x-4">
            <Image src="/african.svg" alt="Prompt Icon" width={36} height={36} />
            <div>
              <p>{displayPrompt}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md flex items-start space-x-4">
            <Image src="/zuri-icon.svg" alt="Response Icon" width={36} height={36} />
            <div>
              
              <p>{response}</p>
            </div>
          </div>
        </div>
      )}

      <div className={`relative ${response ? 'fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200' : ''}`}>
        <Input 
          placeholder="Enter a prompt here" 
          className="pr-20 w-full"
          value={prompt}
          onChange={(e) => {
            console.log("Prompt changed:", e.target.value)
            setPrompt(e.target.value)
          }}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => {
              console.log("Submit button clicked")
              handleSubmit()
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-center text-gray-500">
        Enterprise AI Search may display inaccurate info, including about people, so double-check its responses. 
        <a href="#" className="underline">Safaricom Privacy Policy</a>
      </p>
    </div>
  )
}