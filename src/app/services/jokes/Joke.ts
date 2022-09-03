

export interface Joke {
  category: string;
  summary: string;
  detail: string;
}

export interface JokeResponse {
  error: boolean;
  amount: number;
  jokes: Joke[];
}
