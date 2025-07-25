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
        name: 'Lotus Café & Tea House',
        description: 'A tranquil tea house in Jubilee Hills with meditation garden and soft ambient music. Perfect for unwinding after a busy day.',
        category: 'cafe',
        distance: '2.1 km',
        rating: 4.8,
        price: '₹₹',
        openHours: 'Open until 9 PM',
        address: 'Road No. 36, Jubilee Hills',
        phone: '+91 40 2354 7890',
        website: 'https://lotuscafe.com',
        moodMatch: 95,
        tags: ['Quiet', 'Tea', 'Meditation', 'AC'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '2',
        name: 'KBR Park Reading Corner',
        description: 'Peaceful reading spots within KBR National Park. Beautiful natural setting with benches under shady trees.',
        category: 'park',
        distance: '1.8 km',
        rating: 4.6,
        price: 'Free',
        openHours: 'Open until 7 PM',
        address: 'KBR National Park, Banjara Hills',
        moodMatch: 88,
        tags: ['Nature', 'Reading', 'Peaceful', 'Trees'],
        image: '/api/placeholder/300/200'
      }
    ],
    energetic: [
      {
        id: '3',
        name: 'Fuel Zone Fitness Café',
        description: 'High-energy fitness café in Gachibowli with protein smoothies and energizing music. Popular with IT crowd.',
        category: 'cafe',
        distance: '3.2 km',
        rating: 4.7,
        price: '₹₹',
        openHours: 'Open until 10 PM',
        address: 'HITEC City, Gachibowli',
        phone: '+91 40 4567 8901',
        moodMatch: 92,
        tags: ['Fitness', 'Smoothies', 'Wi-Fi', 'Healthy'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '4',
        name: 'Climb Zone Kondapur',
        description: 'Premier rock climbing gym with various difficulty levels. Great community and professional instructors.',
        category: 'fitness',
        distance: '4.5 km',
        rating: 4.9,
        price: '₹₹₹',
        openHours: 'Open until 11 PM',
        address: 'Kondapur Main Road',
        phone: '+91 40 3456 7890',
        moodMatch: 89,
        tags: ['Climbing', 'Adventure', 'Community', 'AC'],
        image: '/api/placeholder/300/200'
      }
    ],
    creative: [
      {
        id: '5',
        name: 'Kala Ghoda Art Gallery',
        description: 'Contemporary art gallery in Banjara Hills featuring local artists. Includes a café and pottery workshop space.',
        category: 'gallery',
        distance: '2.8 km',
        rating: 4.5,
        price: '₹₹',
        openHours: 'Open until 9 PM',
        address: 'Road No. 12, Banjara Hills',
        phone: '+91 40 2345 6789',
        moodMatch: 94,
        tags: ['Art', 'Pottery', 'Creative', 'Workshop'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '6',
        name: 'Lamakaan Cultural Space',
        description: 'Popular cultural hub in Banjara Hills with workshops, book readings, and creative events. Great for writers and artists.',
        category: 'cultural',
        distance: '2.5 km',
        rating: 4.6,
        price: '₹',
        openHours: 'Open until 10 PM',
        address: 'Banjara Hills Road No. 1',
        moodMatch: 87,
        tags: ['Books', 'Writing', 'Poetry', 'Events'],
        image: '/api/placeholder/300/200'
      }
    ],
    social: [
      {
        id: '7',
        name: 'Skyye Lounge',
        description: 'Trendy rooftop bar in Jubilee Hills with city views, board games, and regular social events.',
        category: 'bar',
        distance: '3.1 km',
        rating: 4.4,
        price: '₹₹₹',
        openHours: 'Open until 1 AM',
        address: 'UG-19, Jubilee Hills',
        phone: '+91 40 4012 3456',
        moodMatch: 91,
        tags: ['Rooftop', 'Views', 'Events', 'Social'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '8',
        name: 'The Coffee Cup',
        description: 'Popular hangout spot in Himayatnagar. Great for meeting friends, board games, and live music evenings.',
        category: 'cafe',
        distance: '4.2 km',
        rating: 4.7,
        price: '₹₹',
        openHours: 'Open until 11 PM',
        address: 'Himayatnagar Main Road',
        moodMatch: 86,
        tags: ['Social', 'Coffee', 'Games', 'Music'],
        image: '/api/placeholder/300/200'
      }
    ],
    peaceful: [
      {
        id: '9',
        name: 'Hussain Sagar Lake Walk',
        description: 'Serene walking path around Hussain Sagar with Buddha statue views. Perfect for evening strolls and meditation.',
        category: 'park',
        distance: '5.8 km',
        rating: 4.8,
        price: 'Free',
        openHours: 'Open 24 hours',
        address: 'Tank Bund Road',
        moodMatch: 96,
        tags: ['Lake', 'Walking', 'Buddha', 'Peaceful'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '10',
        name: 'Botanical Garden Kondapur',
        description: 'Beautiful botanical garden with diverse flora, butterfly garden, and peaceful walking trails.',
        category: 'park',
        distance: '6.5 km',
        rating: 4.5,
        price: '₹',
        openHours: 'Open until 6 PM',
        address: 'Kondapur, near HITEC City',
        phone: '+91 40 2345 6789',
        moodMatch: 90,
        tags: ['Gardens', 'Nature', 'Butterflies', 'Walking'],
        image: '/api/placeholder/300/200'
      }
    ],
    adventurous: [
      {
        id: '11',
        name: 'Hyderabad Heritage Walks',
        description: 'Guided heritage walks through Old City covering Charminar, Golconda, and hidden gems. Great for history buffs.',
        category: 'adventure',
        distance: '8.5 km',
        rating: 4.6,
        price: '₹₹',
        openHours: 'Tours from 6 AM',
        address: 'Meeting point: Charminar',
        phone: '+91 40 6789 0123',
        moodMatch: 93,
        tags: ['Heritage', 'Walking', 'History', 'Charminar'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '12',
        name: 'Escape Hunt Hyderabad',
        description: 'Premium escape rooms in Inorbit Mall with movie-themed challenges. Perfect for groups and adventure seekers.',
        category: 'entertainment',
        distance: '4.8 km',
        rating: 4.8,
        price: '₹₹₹',
        openHours: 'Open until 11 PM',
        address: 'Inorbit Mall, Madhapur',
        moodMatch: 88,
        tags: ['Escape Rooms', 'Movies', 'Challenge', 'Groups'],
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
            {recommendations.length} places found within {preferences.distance} km
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