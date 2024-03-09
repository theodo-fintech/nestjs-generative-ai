import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { join } from 'path';
import { tmpdir } from 'os';
import { promises as fs } from 'fs';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { ChatOpenAI } from '@langchain/openai';
import { loadSummarizationChain } from 'langchain/chains';

@Injectable()
export class AISummarizeDocumentPipe implements PipeTransform {
  async transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
    if (
      metadata.metatype === undefined ||
      metadata.metatype.name !== 'AIFile'
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
      const llm = new ChatOpenAI();

      const summarizeChain = loadSummarizationChain(llm, {
        type: 'stuff',
      });

      const summary = await summarizeChain.invoke({ input_documents: docs });

      const result = {
        file: value,
        summary: summary.text,
      };

      return result;
    } finally {
      await fs.unlink(tempFilePath);
    }
  }
}
