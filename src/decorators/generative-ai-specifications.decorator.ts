import { ValidationArguments, registerDecorator } from 'class-validator';
import { AISpecificationsParams } from '../interfaces/generative-ai.interface';
import { AIService } from '../generative-ai.service';
import { FieldsSpecificationsStore, ValidationMessageStore } from '../utils';

export const AISpecifications = (
  specifications: string[],
  specificationsParams?: AISpecificationsParams,
) => {
  return (target: any, propertyKey: string) => {
    if (specificationsParams === undefined || !specificationsParams.validate) {
      FieldsSpecificationsStore.setClassFieldsSpecifications(
        target.constructor.name,
        {
          fieldName: propertyKey,
          specifications,
        },
      );
    }

    const validate = async (value, args) => {
      const aiService = AIService.getInstance();
      const [guidelines] = args.constraints;

      const feedback = await aiService.generateFeedbackOnInputWithGuidelines(
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
      name: 'aISpecifications',
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
