export interface QueryResult {
  answer: string;
  sources: DataSource[];
  charts?: ChartData[];
  relatedAddresses?: string[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie';
  title: string;
  data: any; // This would be properly typed based on chart library
}

export type DataSourceName = 'kaito' | 'arkham' | 'dune' | 'defillama';

export interface DataSource {
  name: DataSourceName;
  contribution: number; // 0-100 percentage of how much this source contributed
  icon: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  lastUsed?: Date;
  usageCount: number;
}

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: Date;
  saved: boolean;
}