import { LLMProvider } from './provider';
import { DeterministicMockLLMProvider } from './mock-provider';

export function getAIProvider(): LLMProvider {
  return new DeterministicMockLLMProvider();
}

export * from './provider';
export * from './mock-provider';
export * from './redaction';
