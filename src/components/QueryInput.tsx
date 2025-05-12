import React, { useState } from 'react';
import { Send, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { QueryHistoryItem } from '../types';

interface QueryInputProps {
  onSubmit: (query: string) => void;
  loading: boolean;
  queryHistory: QueryHistoryItem[];
  onSelectFromHistory: (query: string) => void;
  onToggleSaveQuery: (id: string) => void;
}

const QueryInput: React.FC<QueryInputProps> = ({
  onSubmit,
  loading,
  queryHistory,
  onSelectFromHistory,
  onToggleSaveQuery
}) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !loading) {
      onSubmit(query);
    }
  };

  const exampleQueries = [
    'What are smart wallets doing on Solana?',
    'Show me the most bullish narratives today.',
    'Which DeFi protocols are growing fast across chains?',
    "What's the trend for memecoin trading volume this week?",
    'Identify whale wallets moving assets to exchanges',
  ];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about on-chain data, narratives, and market trends..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px] resize-none"
            disabled={loading}
          />
          <div className="absolute bottom-3 right-3 flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700"
              title="Query history"
            >
              <Clock className="h-4 w-4" />
            </button>
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className={`p-2 rounded-full ${
                !query.trim() || loading
                  ? 'bg-gray-700 text-gray-500'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors`}
              title="Send query"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      {showHistory && queryHistory.length > 0 && (
        <div className="mt-2 bg-gray-800 rounded-md border border-gray-700 max-h-[300px] overflow-y-auto">
          <div className="p-2 border-b border-gray-700">
            <h3 className="text-sm font-medium text-gray-300">Query History</h3>
          </div>
          <ul className="divide-y divide-gray-700">
            {queryHistory.map((item) => (
              <li key={item.id} className="p-2 hover:bg-gray-700 flex justify-between items-center">
                <button
                  className="text-left text-gray-200 text-sm flex-grow truncate"
                  onClick={() => {
                    onSelectFromHistory(item.query);
                    setShowHistory(false);
                  }}
                >
                  {item.query}
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-indigo-400"
                  onClick={() => onToggleSaveQuery(item.id)}
                  title={item.saved ? "Remove from saved" : "Save query"}
                >
                  {item.saved ? (
                    <BookmarkCheck className="h-4 w-4" />
                  ) : (
                    <Bookmark className="h-4 w-4" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {query.length === 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Try asking:</h3>
          <div className="flex flex-wrap gap-2">
            {exampleQueries.map((example, index) => (
              <button
                key={index}
                className="px-3 py-1.5 bg-gray-800 rounded-full text-xs text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
                onClick={() => setQuery(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QueryInput;