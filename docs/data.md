## Data processing

This library allows processing data using Generative AI, typically provided through a form by a end user.

It currently provides a single functionality in a blocking way (validation) and in a non-blocking way (feedback). The basic idea is to have the LLM verify the input based on a list of specifications and either confirm the input matches the specifications or generate questions to further improve the input.

### Validation

Enabling validation is super easy : any Dto field annotated with `@AISpecifications` with a `{ validate: true }` configuration will make the API route answer with a `400` answer with feedback if the input fails to meet the provided specifications.

```ts
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AISpecifications } from 'nestjs-generative-ai';

export class ValidationEnabledFormDto {
  public firstName: string;
  public lastName: string;

  @AISpecifications(
    [
      'It should specify the amount of the investment.',
      'It should also mention when should the acquisition happen.',
    ],
    { validate: true },
  )
  public project: string;
}

@Controller()
export class AppController {
  @Post('/validation')
  async createInvestmentProjectWithValidation(
    @Body() form: ValidationEnabledFormDto,
  ): Promise<ValidationEnabledFormDto> {
    return form;
  }
}
```

Remember this will only work if the `ValidationPipe` has been set, like all standard validation rules

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
```

### Feedback

The feedback feature is similar but will not make the endpoint answer a 400, it will only enrich the data that is injected in the controller's method.

```ts
import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import {
  AISpecifications,
  AIFeedback,
  FeedbackEnriched,
} from 'nestjs-generative-ai';

export class FeedbackEnabledFormDto {
  public firstName: string;
  public lastName: string;

  @AISpecifications(
    [
      'It should specify the amount of the investment.',
      'It should also mention when should the acquisition happen.',
    ]
  )
  public project: string;
}

@Controller()
export class AppController {
  @Post('/feedback')
  @AIFeedback(FeedbackEnabledFormDto)
  async createInvestmentProjectWithFeedback(
    @Body() form: FeedbackEnriched<FeedbackEnabledFormDto>,
  ): Promise<FeedbackEnriched<FeedbackEnabledFormDto>> {
    return form;
  }
}
```

You can also use the service directly if you want more flexibility

```ts
import {
  Body,
  Controller,
  Post
} from '@nestjs/common';
import {
  AIService,
} from 'nestjs-generative-ai';

export class FormDto {
  public firstName: string;
  public lastName: string;
  public project: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly aiService: AIService,
  ) {}

  @Post('/service')
  async generateFeedbackOnForm(@Body() form: FormDto): Promise<string> {
    const feedback = await this.aiService.generateFeedbackOnInputWithGuidelines(
      form.project,
      ['It should specify the amount of the investment.'],
    );

    return feedback;
  }
}


