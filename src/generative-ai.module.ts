import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AIFeedbackEngine } from './generative-ai.service';
import { AICheckPipe, AISummarizeDocumentPipe } from './pipes';
import {
  GenerativeAIModuleAsyncOptions,
  GenerativeAIModuleOptions,
} from './interfaces';
import { GENERATIVE_AI_MODULE_OPTIONS } from './constants';

@Global()
@Module({})
export class GenerativeAIModule {
  static forRoot(options: GenerativeAIModuleOptions): DynamicModule {
    return {
      module: GenerativeAIModule,
      providers: [
        {
          provide: GENERATIVE_AI_MODULE_OPTIONS,
          useValue: options,
        },
        AIFeedbackEngine,
        {
          provide: APP_PIPE,
          useClass: AICheckPipe,
        },
        {
          provide: APP_PIPE,
          useClass: AISummarizeDocumentPipe,
        },
      ],
      exports: [AIFeedbackEngine],
    };
  }

  static forRootAsync(options: GenerativeAIModuleAsyncOptions): DynamicModule {
    return {
      module: GenerativeAIModule,
      imports: options.imports || [],
      providers: [
        this.createAsyncOptionsProvider(options),
        AIFeedbackEngine,
        {
          provide: APP_PIPE,
          useClass: AICheckPipe,
        },
        {
          provide: APP_PIPE,
          useClass: AISummarizeDocumentPipe,
        },
      ],
      exports: [AIFeedbackEngine],
    };
  }

  private static createAsyncOptionsProvider(
    options: GenerativeAIModuleAsyncOptions,
  ): Provider {
    return {
      provide: GENERATIVE_AI_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    };
  }
}
