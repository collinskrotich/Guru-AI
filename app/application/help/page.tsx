"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, Circle, ChevronDown, ChevronUp } from 'lucide-react';

const steps = [
  'Give me a moment...',
  'Analyzing the request...',
  'Searching relevant information...',
  'Reviewing...',
  'Generating the answer...'
];

const ChatInputWithAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<string[]>([]); // Define visibleSteps as an array of strings
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSend = async () => {
    setIsAnimating(true);
    setVisibleSteps([]);
    setCurrentStep(0);
    setIsComplete(false);
    setIsExpanded(true);

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setVisibleSteps(prev => [...prev, steps[i]]); // Now this will work
      setCurrentStep(i);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setIsComplete(true);
    setIsExpanded(false);
  };

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="flex items-center bg-white rounded-full shadow-md p-2 mb-4">
        <input
          type="text"
          placeholder="Ask follow-up..."
          className="flex-grow px-4 py-2 bg-transparent outline-none"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
          aria-label="Send message"
        >
          <Send className="w-5 h-5 text-purple-600" />
        </button>
      </div>

      {isAnimating && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                AI
              </div>
              <span className={isComplete ? "text-green-500 font-semibold" : "text-gray-500"}>
                {isComplete ? "5 Steps completed" : "Processing..."}
              </span>
            </div>
            {isComplete && (
              <button onClick={toggleExpand} className="text-blue-500">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            )}
          </div>
          {isExpanded && (
            <ul className="space-y-3">
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
        </div>
      )}
    </div>
  );
};

export default ChatInputWithAnimation;
