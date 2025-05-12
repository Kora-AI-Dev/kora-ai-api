import React, { useState } from 'react';
import QueryInput from './QueryInput';
import ResultDisplay from './ResultDisplay';
import { QueryResult, QueryHistoryItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

// This would normally come from an API
const mockApiCall = (query: string): Promise<QueryResult> => {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data with different responses based on the query
      let response: QueryResult;
      
      if (query.toLowerCase().includes('solana') || query.toLowerCase().includes('smart wallet')) {
        response = {
          answer: "Smart wallets on Solana have seen a 32% increase in activity over the past week. The main activities include:\n\n1. Increasing deposits into DeFi protocols, especially Jupiter and Drift\n2. Heavy participation in new token launches via Raydium and SolRazr\n3. A notable rise in NFT trading activities\n\nThe top 3 most active smart wallet contracts on Solana are Brave Wallet, Phantom's multi-sig feature, and Jupiter Aggregator's smart accounts. These wallets are primarily being used for DeFi trading, with a significant portion of transactions involving token swaps and yield farming.",
          sources: [
            { name: 'arkham', contribution: 45, icon: '' },
            { name: 'dune', contribution: 30, icon: '' },
            { name: 'kaito', contribution: 15, icon: '' },
            { name: 'defillama', contribution: 10, icon: '' },
          ],
          relatedAddresses: [
            '9PJuuGQbkNRxwQ4wiLw3QeFJfqwzuQ6yKCCbzStJ1JYT',
            'BXrLUCYySdZZPReBm5wgQrmZE7PaQ7AvtqpFfKxf3F1Z',
            'JUP4Fb2cqiRUcaTHdrpc8zDQhqbGcbPKWkeTViJDA6P'
          ],
          relatedLinks: [
            { title: 'Solana Transaction Volume Dashboard', url: 'https://example.com/dashboard' },
            { title: 'Smart Wallet Adoption Report Q2 2025', url: 'https://example.com/report' }
          ]
        };
      } else if (query.toLowerCase().includes('bullish') || query.toLowerCase().includes('narratives')) {
        response = {
          answer: "The most bullish narratives today center around:\n\n1. Real-World Assets (RWAs) - Increasing tokenization of traditional assets, with a 67% growth in TVL for RWA protocols over the past month\n\n2. Layer 2 Scaling - Positive sentiment around zkSync Era and Arbitrum's expanding ecosystem, with transaction volumes up 23% week-over-week\n\n3. AI + Crypto Integration - Projects combining machine learning with on-chain data are seeing significant token price appreciation, averaging 34% gains in the last 72 hours\n\n4. Sovereign Identity Solutions - Growing traction for self-sovereign identity projects, particularly on Solana and Polygon\n\nThe narrative with the strongest on-chain indicators of future growth is RWAs, with significant institutional wallet accumulation detected.",
          sources: [
            { name: 'kaito', contribution: 55, icon: '' },
            { name: 'defillama', contribution: 25, icon: '' },
            { name: 'dune', contribution: 15, icon: '' },
            { name: 'arkham', contribution: 5, icon: '' },
          ],
          charts: [
            { 
              type: 'line', 
              title: 'Narrative Strength Over Time', 
              data: {} 
            }
          ],
          relatedLinks: [
            { title: 'RWA Market Analysis', url: 'https://example.com/rwa' },
            { title: 'L2 Ecosystem Growth Report', url: 'https://example.com/l2' }
          ]
        };
      } else if (query.toLowerCase().includes('defi') || query.toLowerCase().includes('protocols')) {
        response = {
          answer: "The fastest growing DeFi protocols across chains are:\n\n1. Hyperliquid (SOL) - 183% TVL growth in 30 days with 67% increase in unique users\n\n2. Aerodrome Finance (BASE) - 112% TVL growth with expanding liquidity pools\n\n3. Symmetric (ARBITRUM) - 94% TVL growth with new strategic partnerships\n\n4. Pendle Finance (MULTI-CHAIN) - 78% TVL growth with new yield markets\n\nCommon growth drivers include:\n- Enhanced yields compared to other platforms\n- Novel tokenomics with sustainable emission schedules\n- Cross-chain expansion strategies\n- Strategic venture capital backing\n\nThe protocols showing the most sustainable growth metrics (user retention, treasury management, revenue/TVL ratio) are Hyperliquid and Pendle Finance.",
          sources: [
            { name: 'defillama', contribution: 60, icon: '' },
            { name: 'dune', contribution: 20, icon: '' },
            { name: 'arkham', contribution: 15, icon: '' },
            { name: 'kaito', contribution: 5, icon: '' },
          ],
          charts: [
            { 
              type: 'bar', 
              title: 'Protocol TVL Growth (%)', 
              data: {} 
            },
            { 
              type: 'line', 
              title: 'Daily Active Users', 
              data: {} 
            }
          ]
        };
      } else {
        // Default response
        response = {
          answer: "Based on analysis across multiple data sources, I've identified several key trends:\n\n1. There's significant movement of capital from centralized exchanges to DeFi protocols, particularly on Ethereum and Solana\n\n2. Retail interest in algorithmic stablecoins is recovering, with transaction volumes up 28% this month\n\n3. NFT marketplaces are seeing renewed activity, particularly in dynamic NFTs with utility components\n\n4. Cross-chain bridges are experiencing increased volumes, suggesting growing demand for multi-chain exposure\n\nWhale wallets have been accumulating mid-cap L1 tokens, particularly those with upcoming technical upgrades or token economic changes.",
          sources: [
            { name: 'kaito', contribution: 30, icon: '' },
            { name: 'arkham', contribution: 30, icon: '' },
            { name: 'dune', contribution: 25, icon: '' },
            { name: 'defillama', contribution: 15, icon: '' },
          ]
        };
      }
      
      resolve(response);
    }, 2000); // Simulate a 2 second API delay
  });
};

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [queryHistory, setQueryHistory] = useState<QueryHistoryItem[]>([]);

  const handleQuerySubmit = async (queryText: string) => {
    setQuery(queryText);
    setLoading(true);
    
    try {
      const response = await mockApiCall(queryText);
      setResult(response);
      
      // Add to query history
      const newHistoryItem: QueryHistoryItem = {
        id: uuidv4(),
        query: queryText,
        timestamp: new Date(),
        saved: false
      };
      
      setQueryHistory(prev => [newHistoryItem, ...prev]);
    } catch (error) {
      console.error('Query failed:', error);
      // Handle error state
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFromHistory = (queryText: string) => {
    setQuery(queryText);
    // Don't automatically submit to allow editing
  };

  const handleToggleSaveQuery = (id: string) => {
    setQueryHistory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold text-white mb-1">Unified Intelligence API</h1>
        <p className="text-gray-400 mb-6">Ask questions across Kaito AI, Arkham, Dune Analytics, and DefiLlama</p>
        
        <QueryInput 
          onSubmit={handleQuerySubmit}
          loading={loading}
          queryHistory={queryHistory}
          onSelectFromHistory={handleSelectFromHistory}
          onToggleSaveQuery={handleToggleSaveQuery}
        />
      </div>
      
      <div className="flex-1 min-h-0 border-t border-gray-800 mt-4">
        <ResultDisplay result={result} loading={loading} />
      </div>
    </div>
  );
};

export default Dashboard;