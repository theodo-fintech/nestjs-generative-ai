import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { AIService } from './generative-ai.service';
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
        AIService,
      ],
      exports: [AIService],
    };
  }

  static forRootAsync(options: GenerativeAIModuleAsyncOptions): DynamicModule {
    return {
      module: GenerativeAIModule,
      imports: options.imports || [],
      providers: [this.createAsyncOptionsProvider(options), AIService],
      exports: [AIService],
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
