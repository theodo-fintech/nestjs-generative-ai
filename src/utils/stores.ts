import { FieldSpecifications } from '../interfaces/generative-ai.interface';

export class FieldsSpecificationsStore {
  private static perClassFieldsSpecifications = new Map<
    string,
    FieldSpecifications
  >();

  static setClassFieldsSpecifications(
    className: string,
    message: FieldSpecifications,
  ): void {
    FieldsSpecificationsStore.perClassFieldsSpecifications.set(
      className,
      message,
    );
  }

  static getClassFieldsSpecifications(
    className: string,
  ): FieldSpecifications | undefined {
    return FieldsSpecificationsStore.perClassFieldsSpecifications.get(
      className,
    );
  }

  static clearForClass(className: string): void {
    FieldsSpecificationsStore.perClassFieldsSpecifications.delete(className);
  }
}

export class ValidationMessageStore {
  private static messages = new Map<string, string>();

  static setMessage(key: string, message: string): void {
    ValidationMessageStore.messages.set(key, message);
  }

  static getMessage(key: string): string | undefined {
    return ValidationMessageStore.messages.get(key);
  }

  static clearMessage(key: string): void {
    ValidationMessageStore.messages.delete(key);
  }
}
