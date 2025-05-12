import React, { useState } from 'react';
import { Plus, Copy, Eye, EyeOff, Trash, Check } from 'lucide-react';
import { ApiKey } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ApiKeysPage: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: uuidv4(),
      name: 'Production API Key',
      key: 'kora_' + Array(32).fill(0).map(() => Math.random().toString(36)[2]).join(''),
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      usageCount: 1243
    },
    {
      id: uuidv4(),
      name: 'Development API Key',
      key: 'kora_' + Array(32).fill(0).map(() => Math.random().toString(36)[2]).join(''),
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      lastUsed: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      usageCount: 567
    }
  ]);

  const [newKeyName, setNewKeyName] = useState('');
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [isCreatingKey, setIsCreatingKey] = useState(false);

  const createNewKey = () => {
    if (newKeyName.trim() === '') return;
    
    const newKey: ApiKey = {
      id: uuidv4(),
      name: newKeyName,
      key: 'kora_' + Array(32).fill(0).map(() => Math.random().toString(36)[2]).join(''),
      createdAt: new Date(),
      usageCount: 0
    };
    
    setApiKeys([...apiKeys, newKey]);
    setNewKeyName('');
    setIsCreatingKey(false);
    
    // Make the new key visible
    setVisibleKeys({
      ...visibleKeys,
      [newKey.id]: true
    });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus({ ...copyStatus, [id]: true });
    setTimeout(() => {
      setCopyStatus({ ...copyStatus, [id]: false });
    }, 2000);
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys({
      ...visibleKeys,
      [id]: !visibleKeys[id]
    });
  };

  const deleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">API Keys</h1>
          <p className="text-gray-400">Manage your API keys for accessing the Kora AI Unified Intelligence API.</p>
        </div>
        
        <button
          onClick={() => setIsCreatingKey(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" />
          Create New Key
        </button>
      </div>
      
      {isCreatingKey && (
        <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
          <h2 className="text-lg font-medium text-white mb-3">Create New API Key</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="Key name (e.g., Production, Testing)"
              className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={createNewKey}
              disabled={newKeyName.trim() === ''}
              className={`ml-3 px-4 py-2 rounded-md ${
                newKeyName.trim() === ''
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors`}
            >
              Create
            </button>
            <button
              onClick={() => setIsCreatingKey(false)}
              className="ml-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                API Key
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Last Used
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Usage
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {apiKeys.map((apiKey) => (
              <tr key={apiKey.id} className="hover:bg-gray-750">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{apiKey.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <code className="text-xs font-mono text-gray-300">
                      {visibleKeys[apiKey.id] 
                        ? apiKey.key 
                        : apiKey.key.substring(0, 8) + '••••••••••••••••••••'}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                      className="ml-2 text-gray-400 hover:text-white"
                      title={visibleKeys[apiKey.id] ? "Hide API Key" : "Show API Key"}
                    >
                      {visibleKeys[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                      className="ml-2 text-gray-400 hover:text-white"
                      title="Copy to clipboard"
                    >
                      {copyStatus[apiKey.id] ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{formatDate(apiKey.createdAt)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">
                    {apiKey.lastUsed ? formatDate(apiKey.lastUsed) : 'Never'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{apiKey.usageCount.toLocaleString()} calls</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    onClick={() => deleteKey(apiKey.id)}
                    className="text-red-400 hover:text-red-300"
                    title="Delete API Key"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 bg-gray-900 rounded-lg border border-gray-800 p-5">
        <h2 className="text-lg font-medium text-white mb-3">API Usage Guidelines</h2>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">•</span>
            <span>Keep your API keys secure. Do not expose them in client-side code.</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">•</span>
            <span>Use different API keys for development and production environments.</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">•</span>
            <span>The free tier has a limit of 100 requests per day. Upgrade for higher limits.</span>
          </li>
          <li className="flex items-start">
            <span className="text-indigo-400 mr-2">•</span>
            <span>Review our <a href="#" className="text-indigo-400 hover:underline">API Documentation</a> for best practices and implementation details.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ApiKeysPage;