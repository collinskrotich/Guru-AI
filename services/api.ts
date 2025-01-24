// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://2qup072pu4.execute-api.eu-west-1.amazonaws.com/sandbox';

const API_BASE_URL = "/api/v1/DIY-Studio"
// Interfaces
export interface Agent {
  id: number;
  name: string;
  type: string;
  status: string;
  configuration?: {
    description?: string;
    [key: string]: any;
  };
}

export interface Tool {
  name: string;
  description: string;
  created_by: string;
  created_at: string;
  is_sample: boolean;
}

interface CreateAgentParams {
  name: string;
  type: string;
  configuration: {
    description?: string;
    instructions?: string;
    prompt_template?: string;
    tools?: string[];
    tools_config?: any;
    [key: string]: any;
  };
}
class ApiService {
  private async fetchWithConfig(url: string, config: RequestInit = {}): Promise<Response> {
    console.log(`Making request to: ${url}`);
    
    const defaultConfig: RequestInit = {
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...config.headers,
        },
        ...config,
    };

    const response = await fetch(url, defaultConfig);
    return response;
  }
  // private async fetchWithConfig(url: string, config: RequestInit = {}): Promise<any> {
  //   console.log(`Making request to: ${url}`);
    
  //   const axiosConfig = {
  //       headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           ...config.headers,
  //       },
  //       ...config,
  //   };

  //   try {
  //       const response = await axios.post(url, axiosConfig);
  //       return response;
  //   } catch (error) {
  //       console.error('Axios error:', error);
  //       throw error;
  //   }
  // }
  // Agents Endpoints
  async listAgents(): Promise<Agent[]> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list agents: ${error}`);
    }
    return response.json();
  }

  
  async createAgent(agent: CreateAgentParams): Promise<Agent> {
    console.log('Creating agent with config:', agent); // Debug log
    
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/`, {
      method: 'POST',
      body: JSON.stringify({
        name: agent.name,
        type: agent.type,
        configuration: agent.configuration  // Pass the entire configuration object
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Agent creation failed:', error); // Debug log
      throw new Error(`Failed to create agent: ${error}`);
    }
    
    return response.json();
  }

  async uploadDocument(agentId: number | string, file: File): Promise<void> {
    console.log('Starting upload:', { agentId, fileName: file.name });

    const formData = new FormData();
    formData.append('file', file, file.name);  // Add filename explicitly

    // Log the actual FormData contents
    for (let [key, value] of formData.entries()) {
        console.log('FormData entry:', key, value instanceof File ? value.name : value);
    }

    try {
        const url = `${API_BASE_URL}/agents/${agentId}/upload`;
        console.log('Making request to:', url);

        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',

          //  credentials: 'include',
            body: formData,
            // Let browser handle the Content-Type header
        }).catch(error => {
            console.error('Network error during fetch:', error);
            throw new Error(`Network error during upload: ${error.message}`);
        });

        if (!response.ok) {
            const text = await response.text().catch(() => 'No error text available');
            console.error('Upload failed:', {
                status: response.status,
                statusText: response.statusText,
                text
            });
            throw new Error(`Upload failed (${response.status}): ${text}`);
        }

        const result = await response.json().catch(() => ({ message: 'Upload completed but no JSON response' }));
        console.log('Upload successful:', result);
        return result;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}

  async queryAgent(agentId: string | number, userText: string): Promise<any> {
    // Debug: Log what we're trying to send
    console.log('Attempting to send query:', { agentId, userText });

    // Create URLSearchParams instead of FormData
    const formData = new URLSearchParams();
    formData.append('query', userText);

    // Debug: Log what's being sent
    console.log('Form data being sent:', formData.toString());

    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: 'include'
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Query error details:', errorText);
        throw new Error(`Failed to query agent: ${errorText}`);
    }

    return response.json();
  }

  async deleteAgent(agentId: number | string): Promise<void> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/agents/${agentId}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to delete agent: ${error}`);
    }
  }

  // Tools Endpoints
  async listTools(): Promise<Tool[]> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to list tools: ${error}`);
    }
    return response.json();
  }

  async createTool(description: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/`, {
      method: 'POST',
      body: JSON.stringify({ description })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create tool: ${error}`);
    }
    return response.json();
  }

  async createToolFromCode(code: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/code`, {
      method: 'POST',
      body: JSON.stringify({ code })
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create tool from code: ${error}`);
    }
    return response.json();
  }

  async getTool(toolName: string): Promise<Tool> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/${toolName}`);
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to get tool: ${error}`);
    }
    return response.json();
  }

  async executeTool(toolName: string, params: any): Promise<any> {
    const response = await this.fetchWithConfig(`${API_BASE_URL}/tools/${toolName}/execute`, {
      method: 'POST',
      body: JSON.stringify(params)
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to execute tool: ${error}`);
    }
    return response.json();
  }
}

export const apiService = new ApiService();