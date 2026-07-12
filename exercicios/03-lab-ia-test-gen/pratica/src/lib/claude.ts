// src/lib/claude.ts — helper compartilhado do pipeline
import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente

export const MODEL = process.env.CLAUDE_MODEL ?? 'claude-opus-4-8';

/**
 * Chama o Claude com um system prompt + mensagem do usuário e devolve o texto.
 * Streaming: geração de código é saída longa — evita timeout de request.
 */
export async function ask(system: string, user: string): Promise<string> {
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    system,
    messages: [{ role: 'user', content: user }],
  });

  const message = await stream.finalMessage();

  // custo visível: aluno PRECISA ver o que está gastando (tema da aula)
  const u = message.usage;
  console.log(`   [tokens] in=${u.input_tokens} out=${u.output_tokens} (${MODEL})`);

  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('');
}

/** Extrai o primeiro bloco ```typescript da resposta (o gerador só deve devolver isso). */
export function extractCode(answer: string): string {
  const match = answer.match(/```(?:typescript|ts)?\n([\s\S]*?)```/);
  if (!match) throw new Error('Resposta do modelo não contém bloco de código');
  return match[1].trim() + '\n';
}
