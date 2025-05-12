import React from 'react';
import { QueryResult } from '../types';
import DataSourceContribution from './DataSourceContribution';
import { ExternalLink } from 'lucide-react';

interface ResultDisplayProps {
  result: QueryResult | null;
  loading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, loading }) => {
  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p>Analyzing on-chain data and market narratives...</p>
        <div className="mt-4 flex flex-col gap-2 w-full max-w-md">
          <div className="h-2 bg-gray-800 rounded animate-pulse"></div>
          <div className="h-2 bg-gray-800 rounded animate-pulse w-5/6 mx-auto"></div>
          <div className="h-2 bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-gray-400">
        <p className="text-center">Ask a question to get insights from across the blockchain ecosystem</p>
      </div>
    );
  }

  // Function to render any charts (placeholder for now)
  const renderCharts = () => {
    if (!result.charts || result.charts.length === 0) return null;
    
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {result.charts.map((chart, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="text-sm font-medium text-gray-300 mb-3">{chart.title}</h3>
            <div className="h-40 w-full bg-gray-700 rounded flex items-center justify-center text-gray-400 text-sm">
              [Chart Visualization]
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Function to render related addresses
  const renderAddresses = () => {
    if (!result.relatedAddresses || result.relatedAddresses.length === 0) return null;
    
    return (
      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Related Addresses</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {result.relatedAddresses.map((address, index) => (
            <div key={index} className="bg-gray-700 p-2 rounded text-xs font-mono text-gray-300 truncate">
              {address}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Function to render related links
  const renderLinks = () => {
    if (!result.relatedLinks || result.relatedLinks.length === 0) return null;
    
    return (
      <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Related Resources</h3>
        <ul className="space-y-2">
          {result.relatedLinks.map((link, index) => (
            <li key={index}>
              <a 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-indigo-400 hover:text-indigo-300 text-sm"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-6">
        <h2 className="text-xl font-medium text-white mb-4">Analysis</h2>
        <div className="text-gray-200 leading-relaxed whitespace-pre-line">
          {result.answer}
        </div>
      </div>
      
      <DataSourceContribution sources={result.sources} />
      
      {renderCharts()}
      {renderAddresses()}
      {renderLinks()}
    </div>
  );
};

export default ResultDisplay;