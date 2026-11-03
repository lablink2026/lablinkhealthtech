import { NextRequest, NextResponse } from 'next/server';
import { getAIProvider } from '../../../modules/ai';
import { redactDirectIdentifiers } from '../../../modules/ai/redaction';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, feature } = body;

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
    }

    // 1. Redact direct personal identifiers (NDPA 2023 compliance)
    const sanitizedPrompt = redactDirectIdentifiers(prompt);

    // 2. Call LLM Provider with assistive guardrails
    const aiProvider = getAIProvider();
    const completion = await aiProvider.complete(sanitizedPrompt);

    let parsedResponse = {};
    try {
      parsedResponse = JSON.parse(completion);
    } catch {
      parsedResponse = { text: completion };
    }

    return NextResponse.json({
      feature: feature || 'general',
      result: parsedResponse,
      disclaimer: 'DISCLAIMER: Informational and assistive only. Not a medical diagnosis. Consult a qualified medical practitioner.'
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
