import { Inject, Injectable } from '@nestjs/common';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI } from '@langchain/openai';
import { GenerativeAIModuleOptions } from './interfaces';
import { GENERATIVE_AI_MODULE_OPTIONS } from './constants';
import { loadSummarizationChain } from 'langchain/chains';
import { Document } from '@langchain/core/documents';

@Injectable()
export class AIService {
  private chatModel!: ChatOpenAI;
  private static instance: AIService;

  constructor(
    @Inject(GENERATIVE_AI_MODULE_OPTIONS)
    protected readonly options: GenerativeAIModuleOptions,
  ) {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: this.options.modelApiKey,
    });
    AIService.instance = this;
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      throw new Error('AIService instance has not been initialized');
    }
    return AIService.instance;
  }

  async generateFeedbackOnInputWithGuidelines(
    input: string,
    guidelines: string[],
  ): Promise<string> {
    const formattedGuidelines = guidelines
      .map((guideline) => `- ${guideline}`)
      .join('\n');

    const outputParser = new StringOutputParser();

    const chain = this.chatModel.pipe(outputParser);

    const prompt = `
    When evaluating a user's submission against the provided guidelines, if all criteria are met, respond with "It's good." If the submission fails to meet any of the guidelines, formulate direct and actionable questions for the user. These questions should be framed in a way that they can serve as clear and specific error messages, guiding the user to provide the missing or unclear information. Ensure each question directly relates to a specific guideline that has not been met, avoiding repetition for criteria already satisfied.

    Submission Details: 
    "${input}"

    Guidelines to Assess Against:
    ${formattedGuidelines}

    Based on these instructions, generate feedback that zeroes in on any information that is either missing without reiterating requests for information that has been clearly stated in the submission.`;

    const result = await chain.invoke(prompt);

    return result;
  }

  async summarizeDocuments(docs: Document[]): Promise<string> {
    const summarizeChain = loadSummarizationChain(this.chatModel, {
      type: 'stuff',
    });

    const result = await summarizeChain.invoke({ input_documents: docs });

    return result.text;
  }
}
