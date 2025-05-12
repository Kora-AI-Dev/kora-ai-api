import React from 'react';
import { DataSource } from '../types';

interface DataSourceContributionProps {
  sources: DataSource[];
}

const sourceColors: Record<string, string> = {
  kaito: 'bg-blue-500',
  arkham: 'bg-purple-500',
  dune: 'bg-yellow-500',
  defillama: 'bg-green-500',
};

const sourceNames: Record<string, string> = {
  kaito: 'Kaito AI',
  arkham: 'Arkham',
  dune: 'Dune Analytics',
  defillama: 'DefiLlama',
};

const DataSourceContribution: React.FC<DataSourceContributionProps> = ({ sources }) => {
  // Sort sources by contribution (highest first)
  const sortedSources = [...sources].sort((a, b) => b.contribution - a.contribution);
  
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <h3 className="text-sm font-medium text-gray-300 mb-3">Data Source Contribution</h3>
      <div className="space-y-3">
        {sortedSources.map((source) => (
          <div key={source.name} className="space-y-1">
            <div className="flex justify-between text-xs text-gray-400">
              <div className="flex items-center">
                <div className={`h-2 w-2 rounded-full ${sourceColors[source.name]} mr-2`}></div>
                <span>{sourceNames[source.name]}</span>
              </div>
              <span>{source.contribution}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={`${sourceColors[source.name]} h-1.5 rounded-full`} 
                style={{ width: `${source.contribution}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSourceContribution;