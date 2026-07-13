// src/lib/llm.ts — helper compartilhado do pipeline
//
// Cliente OpenAI-compatible genérico. Default: GitHub Models — GRÁTIS com o
// token do GitHub que você já tem (limite diário do free tier, suficiente
// pro lab). Presets alternativos no .env.example (Ollama local, Anthropic).
import 'dotenv/config';

export const BASE_URL = process.env.LLM_BASE_URL ?? 'https://models.github.ai/inference';
export const MODEL = process.env.LLM_MODEL ?? 'openai/gpt-4o-mini';
const API_KEY = process.env.LLM_API_KEY;

/**
 * Chama o LLM com um system prompt + mensagem do usuário e devolve o texto.
 */
export async function ask(system: string, user: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('LLM_API_KEY ausente — copie .env.example pra .env e cole seu token');
  }

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`LLM HTTP ${res.status} — ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
    usage?: { prompt_tokens?: number; completion_tokens?: number };
  };

  // custo visível: você PRECISA ver o que está gastando/consumindo (tema da aula)
  const u = data.usage ?? {};
  console.log(`   [tokens] in=${u.prompt_tokens ?? '?'} out=${u.completion_tokens ?? '?'} (${MODEL})`);

  return data.choices?.[0]?.message?.content ?? '';
}

/** Extrai o primeiro bloco ```typescript da resposta (o gerador só deve devolver isso). */
export function extractCode(answer: string): string {
  const match = answer.match(/```(?:typescript|ts)?\n([\s\S]*?)```/);
  if (!match) throw new Error('Resposta do modelo não contém bloco de código');
  return match[1].trim() + '\n';
}
