export interface GameConfig {
  colors: string[];
  name: string;
  positionToId: number[];
  results: string[];
  slots: number;
}

export interface HistoryItem {
  result: number;
  count: number;
  color?: string;
}

export interface NextGame {
  uuid: string;
  id: number;
  startTime: string;
  startDelta: number;
  startDeltaUs: number;
  fakeStartDelta: number;
  duration: number;
  result: any;
  outcome: any;
}
