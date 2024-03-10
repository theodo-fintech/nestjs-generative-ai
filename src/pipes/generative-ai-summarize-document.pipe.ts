import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { join } from 'path';
import { tmpdir } from 'os';
import { promises as fs } from 'fs';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { SummaryEnrichedFile } from '../interfaces';
import { AIService } from '../generative-ai.service';

@Injectable()
export class AISummarizeDocumentPipe implements PipeTransform {
  constructor(private readonly aiService: AIService) {}
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (
      metadata.metatype === undefined ||
      metadata.metatype.name !== SummaryEnrichedFile.name
    ) {
      return value;
    }

    const tempFilePath = join(tmpdir(), value.originalname);
    await fs.writeFile(tempFilePath, value.buffer);

    const loader = new PDFLoader(tempFilePath, {
      splitPages: true,
    });

    try {
      const docs = await loader.loadAndSplit();
      const summary = await this.aiService.summarizeDocuments(docs);

      const result = {
        file: value,
        summary,
      };

      return result;
    } finally {
      await fs.unlink(tempFilePath);
    }
  }
}
