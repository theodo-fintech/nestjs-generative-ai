import { Type, UsePipes } from '@nestjs/common';
import { AICheckPipe } from '../pipes';

export function AIFeedback(dtoType: Type<any>): MethodDecorator {
  return function (target: any, key: any, descriptor: PropertyDescriptor) {
    UsePipes(AICheckPipe(dtoType))(target, key, descriptor);
  };
}
