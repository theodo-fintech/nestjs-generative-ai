import { Inject, PipeTransform, Type, mixin } from '@nestjs/common';
import { FeedbackEnriched } from '../interfaces/generative-ai.interface';
import { AIService } from '../generative-ai.service';
import { FieldsSpecificationsStore, memoize } from '../utils';

export type IAICheckPipe = {
  transform<T>(value: T): Promise<FeedbackEnriched<T>>;
};

export const AICheckPipe: (expectedType: Type<any>) => Type<IAICheckPipe> =
  memoize(createAICheckPipe);

function createAICheckPipe(expectedType: Type<any>): Type<IAICheckPipe> {
  class MixinAICheckPipe<T>
    implements PipeTransform<T, Promise<FeedbackEnriched<T>>>
  {
    protected aiService: AIService;
    constructor(@Inject(AIService) feedbackEngine: AIService) {
      this.aiService = feedbackEngine;
    }

    async transform(value: T): Promise<FeedbackEnriched<T>> {
      const fieldsSpecifications =
        FieldsSpecificationsStore.getClassFieldsSpecifications(
          expectedType.name,
        );

      if (fieldsSpecifications !== undefined) {
        const input = value[fieldsSpecifications.fieldName];
        const specifications = fieldsSpecifications.specifications;

        const feedback =
          await this.aiService.generateFeedbackOnInputWithGuidelines(
            input,
            specifications,
          );

        return {
          data: value,
          feedback,
        };
      }

      return {
        data: value,
        feedback: undefined,
      };
    }
  }

  const pipe = mixin(MixinAICheckPipe);

  return pipe as Type<IAICheckPipe>;
}
