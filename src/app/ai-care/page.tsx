'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { authClient } from '@/lib/auth-client';
import { FaMagic, FaSpinner, FaRedo } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function AiCarePage() {
  const { apiBaseUrl } = useApp();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  
  const [plantName, setPlantName] = useState('');
  const [problem, setProblem] = useState('');
  const [season, setSeason] = useState('Spring');
  const [outputLength, setOutputLength] = useState('medium');
  
  const [guide, setGuide] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCareGuide = async () => {
    setIsLoading(true);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (user) {
        headers['Authorization'] = `Bearer ${user.id}`;
        headers['x-user-id'] = user.id;
      }

      const res = await fetch(`${apiBaseUrl}/ai/care-guide`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ plantName, problem, season, outputLength })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.guide) {
          setGuide(data.guide);
          toast.success('AI Care Guide generated successfully!');
          return;
        }
      }
    } catch (e) {
      console.warn('Backend API connection failed, using local simulation generator.');
    }

    // Local simulation generator fallback if backend is offline or missing API key
    setTimeout(() => {
      const simulatedGuide = `## Verdeloom AI Care Guide: ${plantName} (${season})
**Identified Issue**: ${problem}
**Analysis Length**: ${outputLength}

### 1. Diagnosis Summary
The plant exhibits symptoms of distress related to "${problem}" during the "${season}" season. This is a common phase for developmental changes, requiring quick, targeted adjustments in light and humidity.

### 2. Immediate Care Steps
- **Watering**: Reduce frequency by 30% during winter/autumn, or increase misting if spring/summer.
- **Lighting**: Move the plant to a window with filtered, bright indirect sunlight.
- **Temperature & Placement**: Ensure the plant is kept away from cold drafts, radiators, or air conditioners.

### 3. Long-term Prevention
- Apply organic liquid seaweed fertilizer once every two weeks.
- Check soil moisture depth regularly using a wooden toothpick or a soil probe.
- Prune dead or yellowing leaves with sanitized bypass shears to redirect energy.`;

      setGuide(simulatedGuide);
      toast.success('Generated Care Guide (Simulation Fallback)');
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plantName || !problem) {
      toast.error('Please enter the plant name and details about the problem.');
      return;
    }
    fetchCareGuide();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary/15 px-3.5 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
          <FaMagic className="animate-pulse" /> Gemini AI Engine
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-4">AI Botanical Care Guide</h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Struggling with leaf spots, brown tips, or dropping leaves? Get immediate tailored care solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Form Input */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Plant Name */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Plant Name *</label>
              <input
                type="text"
                required
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                placeholder="e.g. Fiddle Leaf Fig, Tomato"
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Problem Details */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Describe the Problem *</label>
              <textarea
                required
                rows={3}
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g. Brown spots on lower leaves, drooping stems..."
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none resize-none"
              />
            </div>

            {/* Season */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Current Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
              </select>
            </div>

            {/* Output Length */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Output Detail Length</label>
              <select
                value={outputLength}
                onChange={(e) => setOutputLength(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                <option value="short">Short (Fast Summary)</option>
                <option value="medium">Medium (Standard advice)</option>
                <option value="long">Long (Comprehensive Guide)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-secondary disabled:opacity-50 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Generating Guide...
                </>
              ) : (
                'Generate Care Guide'
              )}
            </button>
          </form>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-7">
          {isLoading ? (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm min-h-[300px] flex flex-col justify-center items-center text-center space-y-4">
              <FaSpinner className="text-3xl text-primary animate-spin" />
              <div>
                <p className="font-bold text-gray-800">Verdeloom AI is writing...</p>
                <p className="text-xs text-gray-500 mt-1">Analyzing biological factors and seasonal guidelines.</p>
              </div>
            </div>
          ) : guide ? (
            <div className="bg-gradient-to-br from-[#1c2e1d] to-[#254226] text-white p-8 rounded-3xl shadow-lg relative min-h-[300px] flex flex-col justify-between">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="prose prose-invert prose-sm max-w-none space-y-4">
                {guide.split('\n').map((line, idx) => {
                  if (line.startsWith('## ')) {
                    return <h2 key={idx} className="text-lg sm:text-xl font-bold text-accent border-b border-white/10 pb-2 mt-4">{line.replace('## ', '')}</h2>;
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={idx} className="text-sm sm:text-base font-bold text-accent/90 mt-3">{line.replace('### ', '')}</h3>;
                  }
                  if (line.startsWith('- ')) {
                    return <li key={idx} className="ml-4 text-xs sm:text-sm text-gray-200 list-disc leading-relaxed">{line.replace('- ', '')}</li>;
                  }
                  return <p key={idx} className="text-xs sm:text-sm text-gray-200 leading-relaxed">{line}</p>;
                })}
              </div>

              {/* Regenerate Action */}
              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={fetchCareGuide}
                  className="flex items-center gap-2 bg-white/15 hover:bg-white/20 text-accent font-semibold px-5 py-2.5 rounded-full text-xs transition-colors"
                >
                  <FaRedo /> Regenerate Guide
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-8 rounded-3xl border border-dashed border-gray-300 min-h-[300px] flex flex-col justify-center items-center text-center p-6">
              <span className="text-sm font-bold text-gray-600">No Care Guide Generated</span>
              <span className="text-xs text-gray-400 mt-1 max-w-[240px]">
                Submit the plant form details to generate customized care suggestions.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
