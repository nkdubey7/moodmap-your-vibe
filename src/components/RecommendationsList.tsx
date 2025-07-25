import { useState } from "react";
import { RecommendationCard } from "./RecommendationCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Filter, Sparkles } from "lucide-react";
import type { Mood } from "./MoodSelector";

// Mock data - in a real app, this would come from an API
const getMockRecommendations = (mood: Mood) => {
  const baseRecommendations = {
    calm: [
      {
        id: '1',
        name: 'Serenity Tea House',
        description: 'A tranquil tea house with meditation garden and soft ambient music. Perfect for unwinding and finding inner peace.',
        category: 'cafe',
        distance: '0.3 miles',
        rating: 4.8,
        price: '$$',
        openHours: 'Open until 9 PM',
        address: '123 Peaceful Ave',
        phone: '(555) 123-4567',
        website: 'https://serenitytea.com',
        moodMatch: 95,
        tags: ['Quiet', 'Tea', 'Meditation', 'Peaceful'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '2',
        name: 'Zen Garden Library',
        description: 'A beautiful library with reading nooks surrounded by zen gardens. Features comfortable seating and natural lighting.',
        category: 'library',
        distance: '0.7 miles',
        rating: 4.6,
        price: 'Free',
        openHours: 'Open until 8 PM',
        address: '456 Mindful St',
        moodMatch: 88,
        tags: ['Reading', 'Quiet', 'Nature', 'Study'],
        image: '/api/placeholder/300/200'
      }
    ],
    energetic: [
      {
        id: '3',
        name: 'Pulse Fitness Café',
        description: 'High-energy fitness café with protein smoothies and upbeat music. Great for pre or post-workout fuel.',
        category: 'cafe',
        distance: '0.5 miles',
        rating: 4.7,
        price: '$$',
        openHours: 'Open until 10 PM',
        address: '789 Energy Blvd',
        phone: '(555) 234-5678',
        moodMatch: 92,
        tags: ['Fitness', 'Smoothies', 'High-energy', 'Healthy'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '4',
        name: 'Rock Climbing Gym',
        description: 'Indoor rock climbing with various difficulty levels. Energizing environment with motivational community.',
        category: 'fitness',
        distance: '1.2 miles',
        rating: 4.9,
        price: '$$$',
        openHours: 'Open until 11 PM',
        address: '321 Adventure Way',
        phone: '(555) 345-6789',
        moodMatch: 89,
        tags: ['Climbing', 'Adventure', 'Community', 'Challenge'],
        image: '/api/placeholder/300/200'
      }
    ],
    creative: [
      {
        id: '5',
        name: 'Artisan\'s Corner Studio',
        description: 'Art studio and café where you can paint, sculpt, or just appreciate local artwork while sipping coffee.',
        category: 'gallery',
        distance: '0.4 miles',
        rating: 4.5,
        price: '$$',
        openHours: 'Open until 9 PM',
        address: '654 Creative Ave',
        phone: '(555) 456-7890',
        moodMatch: 94,
        tags: ['Art', 'Pottery', 'Creative', 'Workshop'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '6',
        name: 'The Inspiration Bookshop',
        description: 'Indie bookstore with writing workshops, poetry readings, and cozy creative corners.',
        category: 'bookstore',
        distance: '0.8 miles',
        rating: 4.6,
        price: '$',
        openHours: 'Open until 8 PM',
        address: '987 Imagination St',
        moodMatch: 87,
        tags: ['Books', 'Writing', 'Poetry', 'Workshops'],
        image: '/api/placeholder/300/200'
      }
    ],
    social: [
      {
        id: '7',
        name: 'Community Rooftop Bar',
        description: 'Vibrant rooftop bar with communal tables, board games, and regular social events.',
        category: 'bar',
        distance: '0.6 miles',
        rating: 4.4,
        price: '$$$',
        openHours: 'Open until 2 AM',
        address: '147 Social Circle',
        phone: '(555) 567-8901',
        moodMatch: 91,
        tags: ['Rooftop', 'Games', 'Events', 'Social'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '8',
        name: 'The Dancing Bean',
        description: 'Coffee shop by day, salsa dancing venue by night. Great for meeting new people and learning moves.',
        category: 'cafe',
        distance: '1.1 miles',
        rating: 4.7,
        price: '$$',
        openHours: 'Open until 12 AM',
        address: '258 Rhythm Road',
        moodMatch: 86,
        tags: ['Dancing', 'Coffee', 'Social', 'Music'],
        image: '/api/placeholder/300/200'
      }
    ],
    peaceful: [
      {
        id: '9',
        name: 'Riverside Nature Walk',
        description: 'Serene walking path along the river with benches, wildlife viewing, and meditation spots.',
        category: 'park',
        distance: '0.9 miles',
        rating: 4.8,
        price: 'Free',
        openHours: 'Open 24 hours',
        address: '369 River Trail',
        moodMatch: 96,
        tags: ['Nature', 'Walking', 'River', 'Wildlife'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '10',
        name: 'Botanical Garden Café',
        description: 'Café nestled within botanical gardens, surrounded by flowers and the sounds of nature.',
        category: 'cafe',
        distance: '1.3 miles',
        rating: 4.5,
        price: '$$',
        openHours: 'Open until 6 PM',
        address: '741 Garden Path',
        phone: '(555) 678-9012',
        moodMatch: 90,
        tags: ['Gardens', 'Nature', 'Flowers', 'Peaceful'],
        image: '/api/placeholder/300/200'
      }
    ],
    adventurous: [
      {
        id: '11',
        name: 'Urban Exploration Hub',
        description: 'Starting point for city adventures, offering guided tours, bike rentals, and local discovery maps.',
        category: 'adventure',
        distance: '0.4 miles',
        rating: 4.6,
        price: '$$',
        openHours: 'Open until 7 PM',
        address: '852 Explorer Ave',
        phone: '(555) 789-0123',
        moodMatch: 93,
        tags: ['Tours', 'Biking', 'Exploration', 'Maps'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '12',
        name: 'Mystery Escape Rooms',
        description: 'Challenging escape rooms with different themes and difficulty levels. Perfect for adventurous problem-solving.',
        category: 'entertainment',
        distance: '1.0 miles',
        rating: 4.8,
        price: '$$$',
        openHours: 'Open until 11 PM',
        address: '963 Puzzle Place',
        moodMatch: 88,
        tags: ['Puzzles', 'Mystery', 'Challenge', 'Teamwork'],
        image: '/api/placeholder/300/200'
      }
    ]
  };

  return baseRecommendations[mood] || [];
};

interface RecommendationsListProps {
  mood: Mood;
  preferences: {
    distance: string;
    timeOfDay: string;
    placeTypes: string[];
  };
}

export const RecommendationsList = ({ mood, preferences }: RecommendationsListProps) => {
  const [recommendations] = useState(() => getMockRecommendations(mood));
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSave = (id: string) => {
    setSavedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getMoodLabel = (mood: Mood) => {
    const labels = {
      calm: 'Calm',
      energetic: 'Energetic', 
      creative: 'Creative',
      social: 'Social',
      peaceful: 'Peaceful',
      adventurous: 'Adventurous'
    };
    return labels[mood];
  };

  const getMoodEmoji = (mood: Mood) => {
    const emojis = {
      calm: '🧘',
      energetic: '⚡',
      creative: '🎨',
      social: '👥',
      peaceful: '🍃',
      adventurous: '🏔️'
    };
    return emojis[mood];
  };

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-medium text-foreground">
          No recommendations found
        </h3>
        <p className="text-muted-foreground">
          Try adjusting your preferences or selecting a different mood
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">
              Perfect for your {getMoodLabel(mood).toLowerCase()} mood
            </h2>
            <span className="text-2xl">{getMoodEmoji(mood)}</span>
          </div>
          <p className="text-muted-foreground">
            {recommendations.length} places found within {preferences.distance} miles
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Mood match indicator */}
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          <Sparkles className="h-3 w-3 mr-1" />
          Mood-matched recommendations
        </Badge>
        <span className="text-sm text-muted-foreground">
          Sorted by relevance to your current mood
        </span>
      </div>

      {/* Recommendations grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            mood={mood}
            onSave={handleSave}
            isSaved={savedItems.includes(recommendation.id)}
          />
        ))}
      </div>
    </div>
  );
};