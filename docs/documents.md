## Data processing

This library allows processing documents/files using Generative AI.

It currently provides a single functionality that summarizes PDFs sent to an API

### Summary

Enabling the summary is super easy. All you need to do apart from the standard file interceptor is to add the provided pipe and to request a `SummaryEnrichedFile` which will inject the file along with the summary in your controller's function.

```ts
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import {
  SummaryEnrichedFile,
  AISummarizeDocumentPipe,
} from 'nestjs-generative-ai';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  @Post('/file')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(AISummarizeDocumentPipe)
  async uploadFile(@UploadedFile() file: SummaryEnrichedFile) {
    return file.summary;
  }
}
```