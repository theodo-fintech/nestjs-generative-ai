export class FeedbackEnriched<T> {
  public data!: T;
  public feedback?: string;
}

export class SummaryEnriched<T> {
  public data!: T;
  public summary!: string;
}

export interface AICheckParams {
  validate: boolean;
}

export interface FieldSpecifications {
  fieldName: string;
  specifications: string[];
}

export class AIFile {
  file!: Express.Multer.File;
  summary!: string;
}
