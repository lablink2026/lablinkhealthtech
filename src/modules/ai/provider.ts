export interface AICompletionOptions {
  temperature?: number;
  maxTokens?: number;
  jsonSchema?: Record<string, any>;
}

export interface LLMProvider {
  name: string;
  complete(prompt: string, options?: AICompletionOptions): Promise<string>;
}
