export interface TopicsResponse {
  results: Topics[];
}

export interface Topics {
  id: number;
  title: string;
  description: string;
  logo: string;
}
