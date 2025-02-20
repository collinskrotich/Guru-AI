

"use client";
import React, { useRef, useState, useEffect } from "react";
import KazuriChat from "@/components/Chat/kazuriChat";
import AgentTest, { AgentTestRef } from "@/components/AgentTest";
import { Agent } from "@/services/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LabPage() {
  const agentTestRef = useRef<AgentTestRef>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConfigureAgent = async (agent: Agent) => {
    try {
      setIsLoading(true);
      setError("");
      
      // Log the newly created agent for debugging
      console.log("New agent created:", agent);

      // Add the agent to the AgentTest component
      agentTestRef.current?.addAgentCard({
        id: agent.id,
        name: agent.name,
        description: agent.name,
        type: agent.type, // <--- Add this so you don't lose the type
      });

    } catch (err) {
      console.error("Error configuring agent:", err);
      setError(err instanceof Error ? err.message : "Failed to configure agent");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kazuri Studio</h1>
          <p className="mt-2 text-gray-600">Create and manage your AI agents with no code</p>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Agent Creation */}
          <Card className="p-6 bg-white shadow-lg">
            <KazuriChat onConfigureAgent={handleConfigureAgent} />
          </Card>

          {/* Right Panel: Agent Testing */}
          <Card className="p-6 bg-white shadow-lg">
            <AgentTest ref={agentTestRef} />
          </Card>
        </div>
      </div>
    </div>
  );
}






