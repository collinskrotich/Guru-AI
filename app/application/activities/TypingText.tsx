"use client";
import React, { useState, useEffect, FC } from 'react';
import { MessageSquare } from 'lucide-react';

interface TypingTextProps {
  text?: string;
  typingSpeed?: number;
}

const TypingText: FC<TypingTextProps> = ({ text = "What can I help with?", typingSpeed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    }
  }, [index, text, typingSpeed]);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 h-12">
        {displayText}
        <span className="inline-block w-2 animate-blink-underscore">_</span>
      </h1>
      
      <div className="flex items-center border rounded-full p-2">
        <MessageSquare className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Message GURU"
          className="flex-grow outline-none"
        />
      </div>
    </div>
  );
};

export default TypingText;
