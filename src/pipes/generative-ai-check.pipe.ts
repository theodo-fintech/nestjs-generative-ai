import { Injectable, PipeTransform, Type } from '@nestjs/common';
import { FeedbackEnriched } from '../interfaces/generative-ai.interface';
import { AIFeedbackEngine } from '../generative-ai.service';
import { FieldsSpecificationsStore } from '../utils';

@Injectable()
export class AICheckPipe<T>
  implements PipeTransform<T, Promise<FeedbackEnriched<T>>>
{
  constructor(
    private expectedType: Type<any>,
    private readonly feedbackEngine: AIFeedbackEngine,
  ) {}
  async transform(value: T): Promise<FeedbackEnriched<T>> {
    const fieldsSpecifications =
      FieldsSpecificationsStore.getClassFieldsSpecifications(
        this.expectedType.name,
      );

    if (fieldsSpecifications !== undefined) {
      const input = value[fieldsSpecifications.fieldName];
      const specifications = fieldsSpecifications.specifications;

      const feedback =
        await this.feedbackEngine.generateFeedbackOnInputWithGuidelines(
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
