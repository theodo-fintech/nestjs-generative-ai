[![NPM][npm-shield]][npm-url]
[![Downloads][downloads-shield]][downloads-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![License][license-shield]][license-url]
![Vulnerabilities][vulnerabilities-shield]
[![Workflow][workflow-shield]][workflow-url]

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

- **Payload Validation**: Reject payload data, for instance for freetext form fields, which don't match specifications with `@AIValidate`
- **Payload Suggestion**: Generate feedback for unmet specifications on payload data, through clarifying questions for the user, with `@AIFeedback`
- **Document Summary**: Get a 5 sentences summary along any uploaded document with `@AIDocumentSummarize`
- **Document Extraction**: Extract relevant data from any uploaded document with `@AIDocumentExtract`
- **Document Tagging**: Retrieve relevant tags from any uploaded document with `@AIDocumentTag`

... and more to come!

### Test coverage

| Statements                                                                                                | Branches                                                                                              | Functions                                                                                               | Lines                                                                                           |
| --------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-100%25-brightgreen.svg?style=flat-square&logo=jest) | ![Branches](https://img.shields.io/badge/branches-100%25-brightgreen.svg?style=flat-square&logo=jest) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat-square&logo=jest) | ![Lines](https://img.shields.io/badge/lines-100%25-brightgreen.svg?style=flat-square&logo=jest) |

## Getting Started

### Prerequisites

This lib was tested only on and thus require **Node.js >=21.6.1**, **NestJS ^10.0.0**

### Installation

```sh
# with npm
npm install nestjs-generative-ai
# with yarn
yarn add nestjs-generative-ai
# with pnpm
pnpm add nestjs-generative-ai
```

## Usage

- [Data processing](/docs/latest/data.md)
  - [Validation](/docs/latest/data.md#validation)
  - [Suggestion](/docs/latest/data.md#suggestion)
- [Document processing](/docs/latest/document.md)
  - [Summary](/docs/latest/document.md#summary)
  - [Extraction](/docs/latest/document.md#extraction)
  - [Tagging](/docs/latest/document.md#tagging)
- [Examples](/docs/latest/examples.md)

## FAQs

No FAQ at the moment

## Roadmap

- [x] Add first 5 decorators and services
- [ ] Allow customizing the chosen LLM
- [ ] Allow customizing the prompt used for a specific decorator instance or globally
- [ ] Add new awesome decorators?

## Contributing

We are just getting started on this project and would **highly appreciate** contributions

- [Examples](/.github/CONTRIBUTIING.md)

## License

Distributed under the MIT License. See [LICENSE](/.LICENSE) for more information.

## Acknowledgments

- [Nestjs-redis from which the README.md model was taken](https://github.com/sipios/nestjs-generative-ai)
- [Langchainjs which is heavily used](https://github.com/langchain-ai/langchainjs)

[npm-shield]: https://img.shields.io/npm/v/sipios/nestjs-generative-ai/latest?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/sipios/nestjs-generative-ai
[downloads-shield]: https://img.shields.io/npm/dm/sipios/nestjs-generative-ai?style=for-the-badge
[downloads-url]: https://www.npmjs.com/package/sipios/nestjs-generative-ai
[stars-shield]: https://img.shields.io/github/stars/sipios/nestjs-generative-ai?style=for-the-badge
[stars-url]: https://github.com/sipios/nestjs-generative-ai/stargazers
[issues-shield]: https://img.shields.io/github/issues/sipios/nestjs-generative-ai?style=for-the-badge
[issues-url]: https://github.com/sipios/nestjs-generative-ai/issues
[license-shield]: https://img.shields.io/npm/l/sipios/nestjs-generative-ai?style=for-the-badge
[license-url]: https://github.com/sipios/nestjs-generative-ai/blob/main/LICENSE
[vulnerabilities-shield]: https://img.shields.io/snyk/vulnerabilities/npm/sipios/nestjs-generative-ai?style=for-the-badge
[workflow-shield]: https://img.shields.io/github/actions/workflow/status/sipios/nestjs-generative-ai/testing.yaml?label=TESTING&style=for-the-badge
[workflow-url]: https://github.com/sipios/nestjs-generative-ai/actions/workflows/testing.yaml
