export interface GenerativeAIModuleOptions {
  modelApiKey: string;
}

export interface GenerativeAIModuleAsyncOptions {
  imports?: any[];
  inject?: any[];
  useFactory: (
    ...args: any[]
  ) => Promise<GenerativeAIModuleOptions> | GenerativeAIModuleOptions;
}
