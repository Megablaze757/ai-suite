// components/MarketingTool.tsx
'use client';

import { Wand2, Loader2, Copy, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

const TEMPLATES = [
  {
    label: 'Social Media Post',
    prompt: 'Write a engaging social media post about:'
  },
  {
    label: 'Email Newsletter',
    prompt: 'Draft a professional email newsletter about:'
  },
  {
    label: 'Product Description',
    prompt: 'Create a compelling product description for:'
  },
  {
    label: 'Blog Outline',
    prompt: 'Generate a detailed blog post outline about:'
  }
];

export default function MarketingTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(TEMPLATES[0]);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generateContent = async () => {
    if (!input.trim()) {
      toast.error('Please enter a topic');
      textareaRef.current?.focus();
      return;
    }

    setIsGenerating(true);
    setOutput('');

    try {
      // Option 1: Local Ollama (Mistral 7B)
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'mistral',
          prompt: `${selectedTemplate.prompt} ${input}`,
          stream: false,
        }),
      });

      // Option 2: HuggingFace API (Fallback)
      // const response = await fetch(
      //   'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      //   {
      //     method: 'POST',
      //     headers: { 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}` },
      //     body: JSON.stringify({ inputs: `${selectedTemplate.prompt} ${input}` }),
      //   }
      // );

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      setOutput(data.response || data[0]?.generated_text || 'No content generated');
      
      toast.success('Content created!');
    } catch (error) {
      console.error('Generation error:', error);
      toast.error('Failed to generate content');
      setOutput('Error: Please try again or check your AI connection');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Template Selector */}
      <div className="flex flex-wrap gap-2">
        {TEMPLATES.map((template) => (
          <button
            key={template.label}
            onClick={() => setSelectedTemplate(template)}
            className={cn(
              'px-3 py-1.5 text-sm rounded-full border transition-colors',
              selectedTemplate.label === template.label
                ? 'bg-primary-500 border-primary-500 text-white'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            )}
          >
            {template.label}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="space-y-2">
        <label htmlFor="marketing-input" className="block font-medium text-gray-700">
          {selectedTemplate.prompt}
        </label>
        <textarea
          ref={textareaRef}
          id="marketing-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`e.g., ${getExamplePlaceholder(selectedTemplate.label)}`}
          className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isGenerating}
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={generateContent}
        disabled={isGenerating}
        className={cn(
          'flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors',
          isGenerating
            ? 'bg-primary-400 cursor-not-allowed'
            : 'bg-primary-500 hover:bg-primary-600',
          'text-white shadow-md hover:shadow-lg'
        )}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Generate {selectedTemplate.label}
          </>
        )}
      </button>

      {/* Output Area */}
      {output && (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-gray-700">Your {selectedTemplate.label}:</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-sm text-primary-500 hover:text-primary-600"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
            {output}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function getExamplePlaceholder(template: string) {
  switch (template) {
    case 'Social Media Post':
      return 'our summer sale starting next week';
    case 'Email Newsletter':
      return 'our new product launch';
    case 'Product Description':
      return 'eco-friendly water bottle with smart temperature control';
    case 'Blog Outline':
      return 'the benefits of AI for small businesses';
    default:
      return 'your topic';
  }
}