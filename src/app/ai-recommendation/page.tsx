'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { authClient } from '@/lib/auth-client';
import { FaMagic, FaSpinner, FaPaw, FaMoneyBillWave, FaSun, FaUserGraduate, FaHome } from 'react-icons/fa';
import toast from 'react-hot-toast';

interface Recommendation {
  name: string;
  reason: string;
  careTips: string[];
  estimatedCost: string;
}

export default function AiRecommendationPage() {
  const { apiBaseUrl } = useApp();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [environment, setEnvironment] = useState('Indoor');
  const [sunlight, setSunlight] = useState('Indirect Sunlight');
  const [experience, setExperience] = useState('Beginner');
  const [petSafe, setPetSafe] = useState(false);
  const [budget, setBudget] = useState('flexible');

  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (user) {
        headers['Authorization'] = `Bearer ${user.id}`;
        headers['x-user-id'] = user.id;
      }

      const res = await fetch(`${apiBaseUrl}/ai/recommendation`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ environment, sunlight, experience, petSafe, budget })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations);
          toast.success('Found matching plant recommendations!');
          setIsLoading(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend recommendation API failed, using local simulation generator.');
    }

    // Local simulation generator fallback if backend is offline or missing API key
    setTimeout(() => {
      let simulatedList: Recommendation[] = [];

      if (petSafe) {
        simulatedList = [
          {
            name: 'Boston Fern',
            reason: `Excellent fit for ${environment} environments with ${sunlight}. Highly pet-friendly and filters indoor air impurities efficiently.`,
            careTips: ['Keep soil consistently moist', 'Provide high humidity levels', 'Place in indirect lighting'],
            estimatedCost: budget === 'flexible' ? 'Medium ($15 - $25)' : budget
          },
          {
            name: 'Spider Plant',
            reason: `Extremely resilient plant perfect for ${experience} growers. Completely safe for cats and dogs.`,
            careTips: ['Water once a week', 'Tolerates low light conditions', 'Regularly trim trailing baby shoots'],
            estimatedCost: budget === 'flexible' ? 'Budget ($8 - $12)' : budget
          },
          {
            name: 'Areca Palm',
            reason: `Adds gorgeous tropical flair to any ${environment} space. Fully pet safe and flourishes under ${sunlight}.`,
            careTips: ['Needs bright indirect light', 'Ensure pot drains well', 'Fertilize monthly during growth'],
            estimatedCost: budget === 'flexible' ? 'Premium ($35 - $60)' : budget
          }
        ];
      } else {
        simulatedList = [
          {
            name: 'Fiddle Leaf Fig',
            reason: `Stunning ornamental plant that elevates ${environment} interiors. Thrives best under ${sunlight}.`,
            careTips: ['Water when top 2" are dry', 'Wipe leaves clean of dust regularly', 'Avoid drafts and radiators'],
            estimatedCost: budget === 'flexible' ? 'Premium ($40 - $70)' : budget
          },
          {
            name: 'Monstera Deliciosa',
            reason: `Vibrant split-leaf plant that matches ${experience} skills and gives instant jungle energy to your space.`,
            careTips: ['Water every 1-2 weeks', 'Give climbing stake support', 'Requires bright filtered light'],
            estimatedCost: budget === 'flexible' ? 'Medium ($20 - $35)' : budget
          },
          {
            name: 'Snake Plant',
            reason: `The ultimate low-maintenance recommendation. Adapts perfectly to almost any lighting setup, including low light.`,
            careTips: ['Water very sparingly (monthly)', 'Extremely hardy to neglect', 'Well-draining sandy soil mix'],
            estimatedCost: budget === 'flexible' ? 'Budget ($10 - $18)' : budget
          }
        ];
      }

      setRecommendations(simulatedList);
      toast.success('Generated recommendations (Simulation Fallback)');
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRecommendations();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary/15 px-3.5 py-1 rounded-full flex items-center gap-1.5 w-fit mx-auto">
          <FaMagic className="animate-pulse" /> Plant Finder
        </span>
        <h1 className="text-4xl font-extrabold text-gray-900 mt-4">AI Product Recommendations</h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Input your environmental conditions, budget preference, and skills to let Gemini discover the perfect matching plants.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form panel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Environment */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FaHome className="text-primary" /> Environment
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                <option value="Indoor">Indoor (Living Room, Bedroom, Office)</option>
                <option value="Outdoor">Outdoor Garden / Patio</option>
                <option value="Greenhouse">Greenhouse / Solarium</option>
              </select>
            </div>

            {/* Sunlight */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FaSun className="text-primary" /> Sunlight Details
              </label>
              <select
                value={sunlight}
                onChange={(e) => setSunlight(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                <option value="Low Light">Low Light (North window, dim corners)</option>
                <option value="Indirect Sunlight">Bright Indirect Sunlight (East/West windows)</option>
                <option value="Direct Sun">Full Direct Sun (South windows, outdoors)</option>
              </select>
            </div>

            {/* Experience */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FaUserGraduate className="text-primary" /> Experience Level
              </label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                <option value="Beginner">Beginner (Hardy, low-maintenance plants)</option>
                <option value="Intermediate">Intermediate (Consistent watering required)</option>
                <option value="Expert">Expert (Delicate species, sensitive humidity)</option>
              </select>
            </div>

            {/* Pet Safety Checkbox */}
            <div className="flex items-center gap-2.5 p-2 bg-cream/30 rounded-xl border border-cream-dark/20">
              <input
                type="checkbox"
                id="pet-safe-checkbox"
                checked={petSafe}
                onChange={(e) => setPetSafe(e.target.checked)}
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="pet-safe-checkbox" className="text-xs font-bold text-gray-700 cursor-pointer flex items-center gap-1.5">
                <FaPaw className="text-secondary text-sm" /> Must be safe for pets
              </label>
            </div>

            {/* Budget */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <FaMoneyBillWave className="text-primary" /> Budget Level
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
              >
                <option value="flexible">Flexible</option>
                <option value="budget">Budget-Friendly ($10 - $20)</option>
                <option value="standard">Standard Range ($20 - $40)</option>
                <option value="premium">Premium Showcase ($40+)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-secondary disabled:opacity-50 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin" /> Matching Plants...
                </>
              ) : (
                'Find Suitable Plants'
              )}
            </button>
          </form>
        </div>

        {/* Results columns */}
        <div className="lg:col-span-8 space-y-6">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-gray-100 rounded-3xl h-64" />
              ))}
            </div>
          ) : recommendations.length === 0 ? (
            <div className="bg-gray-50 p-12 rounded-3xl border border-dashed border-gray-300 min-h-[300px] flex flex-col justify-center items-center text-center p-6">
              <span className="text-sm font-bold text-gray-600">No Recommendations Yet</span>
              <span className="text-xs text-gray-400 mt-1 max-w-[280px]">
                Fill out the questionnaire on the left to run our botanical matcher.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((rec, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                      Recommendation #{idx + 1}
                    </span>
                    <h3 className="font-extrabold text-gray-900 text-lg mt-3 group-hover:text-primary transition-colors">
                      {rec.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{rec.reason}</p>
                    
                    {/* Care Tips */}
                    <div className="mt-4 pt-4 border-t border-gray-50 space-y-2">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Growth Tips</h4>
                      <ul className="space-y-1">
                        {rec.careTips.map((tip, i) => (
                          <li key={i} className="text-xs text-gray-600 list-disc ml-4">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 uppercase">Est. Cost</span>
                    <span className="text-xs font-bold text-primary bg-cream px-2.5 py-1 rounded-full">{rec.estimatedCost}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
