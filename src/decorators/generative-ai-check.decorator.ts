import { ValidationArguments, registerDecorator } from 'class-validator';
import { Inject } from '@nestjs/common';
import { AICheckParams } from '../interfaces/generative-ai.interface';
import { AIFeedbackEngine } from '../generative-ai.service';
import { FieldsSpecificationsStore, ValidationMessageStore } from '../utils';

export const AICheck = (
  specifications: string[],
  checkParams?: AICheckParams,
) => {
  const injectFeedbackEngine = Inject(AIFeedbackEngine);

  return (target: any, propertyKey: string) => {
    injectFeedbackEngine(target, 'feedbackEngine');
    const feedbackEngine: AIFeedbackEngine = target.feedbackEngine;

    if (checkParams === undefined || !checkParams.validate) {
      FieldsSpecificationsStore.setClassFieldsSpecifications(
        target.constructor.name,
        {
          fieldName: propertyKey,
          specifications,
        },
      );
      return;
    }

    const validate = async (value, args) => {
      const [guidelines] = args.constraints;

      const feedback =
        await feedbackEngine.generateFeedbackOnInputWithGuidelines(
          value,
          guidelines,
        );

      const isValid = feedback.includes("It's good");

      const key = `${args.targetName}_${propertyKey}`;

      if (!isValid) {
        ValidationMessageStore.setMessage(key, feedback);
      } else {
        ValidationMessageStore.clearMessage(key);
      }

      return isValid;
    };

    const getErrorMessage = (args: ValidationArguments) => {
      const key = `${args.targetName}_${propertyKey}`;
      const message =
        ValidationMessageStore.getMessage(key) || 'Validation error occurred.';

      ValidationMessageStore.clearMessage(key);

      return message;
    };

    registerDecorator({
      name: 'aICheck',
      target: target.constructor,
      propertyName: propertyKey,
      constraints: [specifications],
      validator: {
        validate,
        defaultMessage: getErrorMessage,
      },
    });
  };
};
