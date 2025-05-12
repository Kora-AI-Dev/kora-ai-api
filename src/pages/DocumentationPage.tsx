import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const DocumentationPage: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeExamples = [
    {
      language: 'JavaScript',
      code: `const response = await fetch('https://api.kora.ai/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: 'What are smart wallets doing on Solana?'
  })
});

const data = await response.json();
console.log(data);`
    },
    {
      language: 'Python',
      code: `import requests

response = requests.post(
    'https://api.kora.ai/query',
    headers={
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    json={
        'query': 'Show me the most bullish narratives today.'
    }
)

data = response.json()
print(data)`
    },
    {
      language: 'Rust',
      code: `use reqwest::Client;
use serde_json::{json, Value};

async fn query_kora() -> Result<Value, Box<dyn std::error::Error>> {
    let client = Client::new();
    let response = client
        .post("https://api.kora.ai/query")
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer YOUR_API_KEY")
        .json(&json!({
            "query": "Which DeFi protocols are growing fast across chains?"
        }))
        .send()
        .await?;
    
    let data = response.json::<Value>().await?;
    Ok(data)
}`
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-gray-900 rounded-lg border border-gray-800">
        <div className="border-b border-gray-800 p-6">
          <h1 className="text-2xl font-bold text-white mb-2">API Documentation</h1>
          <p className="text-gray-400">Learn how to integrate with the Kora AI Unified Intelligence API.</p>
        </div>
        
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Getting Started</h2>
          <p className="text-gray-300 mb-4">
            Kora AI provides a unified API to query blockchain intelligence from multiple sources. 
            Your requests are automatically routed to the most relevant data sources and processed by our AI models.
          </p>
          
          <h3 className="text-lg font-semibold text-white mb-2 mt-6">Authentication</h3>
          <p className="text-gray-300 mb-4">
            All API requests require an API key. You can generate an API key from your account dashboard.
            Include your API key in the Authorization header as a Bearer token.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-md mb-6">
            <code className="text-indigo-300 font-mono">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-2 mt-6">API Endpoints</h3>
          
          <div className="bg-gray-800 rounded-md mb-6 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <span className="bg-indigo-600 text-xs font-medium px-2 py-1 rounded text-white">POST</span>
                  <span className="ml-2 text-white font-mono">/query</span>
                </div>
                <span className="text-gray-400 text-sm">Process a natural language query</span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Request Body:</h4>
              <pre className="bg-gray-900 p-3 rounded text-green-400 font-mono text-sm">
{`{
  "query": "What are smart wallets doing on Solana?",
  "format": "json", // Optional, defaults to "json"
  "includeCharts": true, // Optional, defaults to true
  "includeSources": true // Optional, defaults to true
}`}
              </pre>
              
              <h4 className="text-sm font-medium text-gray-300 mb-2 mt-4">Response:</h4>
              <pre className="bg-gray-900 p-3 rounded text-blue-400 font-mono text-sm">
{`{
  "answer": "Smart wallets on Solana have seen a 32% increase in activity...",
  "sources": [
    { "name": "arkham", "contribution": 45 },
    { "name": "dune", "contribution": 30 },
    { "name": "kaito", "contribution": 15 },
    { "name": "defillama", "contribution": 10 }
  ],
  "charts": [...],
  "relatedAddresses": [...],
  "relatedLinks": [...]
}`}
              </pre>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-4 mt-8">Code Examples</h2>
          
          <div className="space-y-6">
            {codeExamples.map((example, index) => (
              <div key={index} className="bg-gray-800 rounded-md overflow-hidden">
                <div className="bg-gray-900 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                  <span className="text-white font-medium">{example.language}</span>
                  <button
                    className="text-gray-400 hover:text-white p-1 transition-colors"
                    onClick={() => copyToClipboard(example.code, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <pre className="p-4 text-indigo-300 font-mono text-sm overflow-x-auto">
                  {example.code}
                </pre>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold text-white mb-4 mt-8">Rate Limits</h2>
          <p className="text-gray-300 mb-4">
            Default API rate limits:
          </p>
          <ul className="list-disc list-inside text-gray-300 space-y-1 ml-2">
            <li>Free tier: 100 requests per day</li>
            <li>Standard tier: 1,000 requests per day</li>
            <li>Enterprise tier: Custom limits</li>
          </ul>
          
          <div className="bg-indigo-900/30 border border-indigo-800 rounded-md p-4 mt-8">
            <h3 className="text-indigo-300 font-medium mb-2">Need Help?</h3>
            <p className="text-indigo-100">
              If you have any questions or need support, please contact our team at <a href="mailto:support@kora.ai" className="text-indigo-400 hover:underline">support@kora.ai</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;