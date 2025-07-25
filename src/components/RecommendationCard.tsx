import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Star, 
  Clock, 
  ExternalLink, 
  Heart,
  Phone
} from "lucide-react";
import type { Mood } from "./MoodSelector";

interface Recommendation {
  id: string;
  name: string;
  description: string;
  category: string;
  distance: string;
  rating: number;
  price: string;
  openHours: string;
  address: string;
  phone?: string;
  website?: string;
  moodMatch: number;
  tags: string[];
  image: string;
}

interface RecommendationCardProps {
  recommendation: Recommendation;
  mood: Mood;
  onSave?: (id: string) => void;
  isSaved?: boolean;
}

export const RecommendationCard = ({ 
  recommendation, 
  mood, 
  onSave, 
  isSaved = false 
}: RecommendationCardProps) => {
  const getMoodGradient = (mood: Mood) => {
    const gradients = {
      calm: 'bg-gradient-calm',
      energetic: 'bg-gradient-energetic',
      creative: 'bg-gradient-creative',
      social: 'bg-gradient-social',
      peaceful: 'bg-gradient-peaceful',
      adventurous: 'bg-gradient-adventurous'
    };
    return gradients[mood];
  };

  return (
    <Card className="overflow-hidden hover:shadow-mood transition-all duration-300 hover:scale-[1.01]">
      {/* Header with mood match indicator */}
      <div className={`${getMoodGradient(mood)} h-1 w-full`} />
      
      {/* Image placeholder */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-card flex items-center justify-center shadow-soft">
              <span className="text-2xl">{recommendation.category === 'cafe' ? '☕' : 
                                          recommendation.category === 'restaurant' ? '🍽️' :
                                          recommendation.category === 'park' ? '🌳' :
                                          recommendation.category === 'gallery' ? '🎨' :
                                          recommendation.category === 'shop' ? '🛍️' : '📍'}</span>
            </div>
          </div>
        </div>
        
        {/* Mood match badge */}
        <div className="absolute top-3 right-3">
          <Badge 
            variant="secondary" 
            className="bg-card/90 backdrop-blur-sm shadow-soft"
          >
            {recommendation.moodMatch}% match
          </Badge>
        </div>

        {/* Save button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 left-3 h-8 w-8 p-0 bg-card/90 backdrop-blur-sm hover:bg-card"
          onClick={() => onSave?.(recommendation.id)}
        >
          <Heart 
            className={`h-4 w-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
          />
        </Button>
      </div>

      <div className="p-6 space-y-4">
        {/* Title and rating */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground text-lg leading-tight">
              {recommendation.name}
            </h3>
            <div className="flex items-center space-x-1 ml-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{recommendation.rating}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {recommendation.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {recommendation.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Location and details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>{recommendation.distance} • {recommendation.address}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>{recommendation.openHours}</span>
          </div>
          {recommendation.phone && (
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>{recommendation.phone}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(recommendation.address)}`, '_blank')}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Directions
          </Button>
          {recommendation.website && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open(recommendation.website, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};