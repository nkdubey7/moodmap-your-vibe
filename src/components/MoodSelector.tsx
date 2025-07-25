import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Zap, 
  Palette, 
  Users, 
  Leaf, 
  Mountain 
} from "lucide-react";

export type Mood = 'calm' | 'energetic' | 'creative' | 'social' | 'peaceful' | 'adventurous';

interface MoodOption {
  id: Mood;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const moodOptions: MoodOption[] = [
  {
    id: 'calm',
    label: 'Calm',
    description: 'Seeking serenity and tranquility',
    icon: Heart,
    gradient: 'bg-gradient-calm'
  },
  {
    id: 'energetic',
    label: 'Energetic',
    description: 'Ready for action and excitement',
    icon: Zap,
    gradient: 'bg-gradient-energetic'
  },
  {
    id: 'creative',
    label: 'Creative',
    description: 'Inspired and imaginative',
    icon: Palette,
    gradient: 'bg-gradient-creative'
  },
  {
    id: 'social',
    label: 'Social',
    description: 'Want to connect with others',
    icon: Users,
    gradient: 'bg-gradient-social'
  },
  {
    id: 'peaceful',
    label: 'Peaceful',
    description: 'Seeking harmony with nature',
    icon: Leaf,
    gradient: 'bg-gradient-peaceful'
  },
  {
    id: 'adventurous',
    label: 'Adventurous',
    description: 'Craving new experiences',
    icon: Mountain,
    gradient: 'bg-gradient-adventurous'
  }
];

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

export const MoodSelector = ({ selectedMood, onMoodSelect }: MoodSelectorProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">
          How are you feeling today?
        </h2>
        <p className="text-muted-foreground">
          Select your current mood to discover places that match your vibe
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moodOptions.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <Card
              key={mood.id}
              className={`
                relative overflow-hidden cursor-pointer transition-all duration-300 
                hover:scale-[1.02] hover:shadow-mood border-2
                ${isSelected 
                  ? 'border-primary shadow-mood scale-[1.02]' 
                  : 'border-border hover:border-primary/50'
                }
              `}
              onClick={() => onMoodSelect(mood.id)}
            >
              <div className={`${mood.gradient} h-2 w-full`} />
              
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`
                    p-2 rounded-lg ${mood.gradient} 
                    ${isSelected ? 'shadow-mood' : ''}
                  `}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {mood.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {mood.description}
                    </p>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};