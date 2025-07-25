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
        name: 'Birla Mandir',
        description: 'Peaceful hilltop temple with panoramic city views. Perfect for meditation and spiritual calm with beautiful white marble architecture.',
        category: 'temple',
        distance: '6.5 km',
        rating: 4.8,
        price: 'Free',
        openHours: 'Open until 9 PM',
        address: 'Naubath Pahad, Khairtabad',
        phone: '+91 40 2323 1802',
        website: 'https://birlamandirhyd.org',
        moodMatch: 95,
        tags: ['Temple', 'Peaceful', 'Views', 'Marble'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '2',
        name: 'Cafe Niloufer',
        description: 'Iconic Hyderabadi cafe famous for Irani chai and Osmania biscuits. Perfect quiet spot for reading and relaxation.',
        category: 'cafe',
        distance: '3.2 km',
        rating: 4.6,
        price: '₹',
        openHours: 'Open until 11 PM',
        address: 'Red Hills, Lakdikapul',
        phone: '+91 40 2323 0597',
        moodMatch: 88,
        tags: ['Irani Chai', 'Biscuits', 'Heritage', 'Quiet'],
        image: '/api/placeholder/300/200'
      }
    ],
    energetic: [
      {
        id: '3',
        name: 'Hard Rock Cafe',
        description: 'High-energy restaurant in GVK One with live music, rock memorabilia, and vibrant atmosphere. Great for energetic dining.',
        category: 'restaurant',
        distance: '4.8 km',
        rating: 4.7,
        price: '₹₹₹',
        openHours: 'Open until 1 AM',
        address: 'GVK One Mall, Banjara Hills',
        phone: '+91 40 4847 6666',
        moodMatch: 92,
        tags: ['Live Music', 'Rock', 'Mall', 'Energetic'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '4',
        name: 'Snow World',
        description: 'Sub-zero snow park with skiing, snowboarding, and ice sculptures. Ultimate energetic winter experience in tropical Hyderabad.',
        category: 'entertainment',
        distance: '5.5 km',
        rating: 4.5,
        price: '₹₹₹',
        openHours: 'Open until 10 PM',
        address: 'Indira Park Road, Domalguda',
        phone: '+91 40 4020 2020',
        moodMatch: 89,
        tags: ['Snow', 'Adventure', 'Family', 'Unique'],
        image: '/api/placeholder/300/200'
      }
    ],
    creative: [
      {
        id: '5',
        name: 'Shilparamam Arts Village',
        description: 'Cultural village showcasing traditional arts, crafts, and live performances. Perfect for creative inspiration and workshops.',
        category: 'cultural',
        distance: '7.2 km',
        rating: 4.5,
        price: '₹',
        openHours: 'Open until 10 PM',
        address: 'HITEC City, Madhapur',
        phone: '+91 40 2311 0455',
        moodMatch: 94,
        tags: ['Arts', 'Crafts', 'Traditional', 'Workshops'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '6',
        name: 'Concu Patisserie',
        description: 'Award-winning patisserie in Jubilee Hills known for artistic desserts and creative cake designs. A paradise for food artists.',
        category: 'cafe',
        distance: '3.5 km',
        rating: 4.6,
        price: '₹₹₹',
        openHours: 'Open until 11 PM',
        address: 'Road No. 36, Jubilee Hills',
        phone: '+91 40 2354 7777',
        moodMatch: 87,
        tags: ['Desserts', 'Artistic', 'Pastry', 'Creative'],
        image: '/api/placeholder/300/200'
      }
    ],
    social: [
      {
        id: '7',
        name: 'Forum Sujana Mall',
        description: 'Popular social hub with food court, multiplex, and gaming zones. Great for hanging out with friends and meeting new people.',
        category: 'mall',
        distance: '5.1 km',
        rating: 4.4,
        price: '₹₹',
        openHours: 'Open until 11 PM',
        address: 'Kukatpally Housing Board Colony',
        phone: '+91 40 4033 3333',
        moodMatch: 91,
        tags: ['Mall', 'Food Court', 'Movies', 'Gaming'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '8',
        name: 'Paradise Restaurant',
        description: 'Legendary biryani restaurant where locals gather. Perfect for social dining and experiencing authentic Hyderabadi cuisine.',
        category: 'restaurant',
        distance: '4.2 km',
        rating: 4.7,
        price: '₹₹',
        openHours: 'Open until 11:30 PM',
        address: 'Secunderabad, near Paradise Circle',
        phone: '+91 40 2784 2040',
        moodMatch: 86,
        tags: ['Biryani', 'Heritage', 'Social', 'Authentic'],
        image: '/api/placeholder/300/200'
      }
    ],
    peaceful: [
      {
        id: '9',
        name: 'Lumbini Park',
        description: 'Serene lakeside park with Buddha statue, musical fountain, and peaceful walking paths. Perfect for evening meditation.',
        category: 'park',
        distance: '6.8 km',
        rating: 4.8,
        price: 'Free',
        openHours: 'Open until 9 PM',
        address: 'Tank Bund Road, Secretariat',
        phone: '+91 40 2323 4567',
        moodMatch: 96,
        tags: ['Lake', 'Buddha', 'Fountain', 'Walking'],
        image: '/api/placeholder/300/200'
      },
      {
        id: '10',
        name: 'Chilkur Balaji Temple',
        description: 'Peaceful temple known as "Visa Balaji" with serene atmosphere and beautiful architecture. No commercialization, pure devotion.',
        category: 'temple',
        distance: '12.5 km',
        rating: 4.5,
        price: 'Free',
        openHours: 'Open until 7 PM',
        address: 'Chilkur Village, Moinabad Mandal',
        moodMatch: 90,
        tags: ['Temple', 'Peaceful', 'Devotion', 'Nature'],
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