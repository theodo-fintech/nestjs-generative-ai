[![NPM][npm-shield]][npm-url]
[![Downloads][downloads-shield]][downloads-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]

<p align="center">
  <a href="https://nestjs.com/">
    <img src="https://nestjs.com/img/logo-small.svg" alt="Nest Logo" width="120">
  </a>
</p>

<div align="center">
  <h1 align="center">NestJS Generative AI</h1>

  <p align="center">
    A selection of useful one-liner decorators, pipes and services to boost your NestJS APIs with Generative AI sweetness
    <br />
    <a href="#usage"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="/sample">View Demos</a>
    ·
    <a href="https://github.com/sipios/nestjs-generative-ai/issues/new/choose">Report Bug</a>
    ·
    <a href="https://github.com/sipios/nestjs-generative-ai/issues">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#test-coverage">Test coverage</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#faqs">FAQs</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

### Features

- **Payload Validation**: Reject payload data, for instance for freetext form fields, which don't match specifications with `@AISpecifications`
- **Payload Suggestion**: Generate feedback for unmet specifications on payload data, through clarifying questions for the user, with `@AIFeedback`
- **Document Summary**: Get a 5 sentences summary along any uploaded document with `AISummarizeDocumentPipe`

... and more to come!

## Getting Started

### Prerequisites

This lib was tested only on and thus require **Node.js >=21.6.1**, **NestJS ^10.3.3**

You will also need both the library and `class-transformer` and `@nestjs/config` to make the magic happen

### Installation

```sh
# with npm
npm install nestjs-generative-ai
# with yarn
yarn add nestjs-generative-ai
# with pnpm
pnpm add nestjs-generative-ai
```

### Configuration

Configure the library in the module you want to use it in. If you want to use it globally, configure it in the main app module.

The library currently only works with OpenAI so you will need to set the `OPENAI_API_KEY` which you will find on [OpenAI's website](https://platform.openai.com/api-keys) and set in your environment variables.

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenerativeAIModule } from 'nestjs-generative-ai';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GenerativeAIModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        modelApiKey: configService.get('OPENAI_API_KEY') as string,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

If you also want to enable validation globally, you should configure the `ValidationPipe` in your `main.ts` file

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

## Usage

- [Data processing](/docs/data.md)
  - [Validation](/docs/data.md#validation)
  - [Feedback](/docs/data.md#feedback)
- [Document processing](/docs/documents.md)
  - [Summary](/docs/document.mds#summary)

## FAQs

No FAQ at the moment

## Roadmap

- [x] Add first 3 decorators and services
- [ ] Allow customizing the chosen LLM
- [ ] Allow customizing the prompt used for a specific decorator instance or globally
- [ ] Add new awesome decorators and services?

## Contributing

We are just getting started on this project and would **highly appreciate** contributions

- [Examples](/.github/CONTRIBUTING.md)

## License

Distributed under the MIT License. See [LICENSE](/.LICENSE) for more information.

## Acknowledgments

- [Nestjs-redis from which the README.md model was taken](https://github.com/liaoliaots/nestjs-redis)
- [Langchainjs which is heavily used](https://github.com/langchain-ai/langchainjs)

[npm-shield]: https://img.shields.io/npm/v/nestjs-generative-ai/latest?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/nestjs-generative-ai
[downloads-shield]: https://img.shields.io/npm/dm/nestjs-generative-ai?style=for-the-badge
[downloads-url]: https://www.npmjs.com/package/nestjs-generative-ai
[stars-shield]: https://img.shields.io/github/stars/sipios/nestjs-generative-ai?style=for-the-badge
[stars-url]: https://github.com/sipios/nestjs-generative-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/sipios/nestjs-generative-ai?style=for-the-badge
[issues-url]: https://github.com/sipios/nestjs-generative-ai/issues
[license-shield]: https://img.shields.io/npm/l/nestjs-generative-ai?style=for-the-badge
[license-url]: https://github.com/sipios/nestjs-generative-ai/blob/main/LICENSE
