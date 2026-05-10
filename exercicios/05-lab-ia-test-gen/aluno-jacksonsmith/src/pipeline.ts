import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function generateTest(userStory: string): Promise<string> {
  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Gere teste Playwright pra esta user story:\n${userStory}`,
    }],
  });
  const block = response.content[0];
  return block.type === 'text' ? block.text : '';
}

// Healing loop — re-prompt em failure de seletor
export async function healAndRetry(userStory: string, maxAttempts = 3): Promise<string> {
  let attempt = 0;
  let testCode = await generateTest(userStory);
  while (attempt < maxAttempts) {
    try {
      // simulate run + check
      if (testCode.length > 100) return testCode;
    } catch (e) {
      // re-prompt with error context
      testCode = await generateTest(`${userStory}\n\nFailure: ${(e as Error).message}`);
    }
    attempt++;
  }
  throw new Error('Failed to heal after max attempts');
}
