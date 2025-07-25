import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Clock, Coffee, ShoppingBag, Camera, Music, Utensils, TreePine } from "lucide-react";

interface LocationPreferencesProps {
  preferences: {
    distance: string;
    timeOfDay: string;
    placeTypes: string[];
  };
  onPreferencesChange: (preferences: any) => void;
}

const placeTypes = [
  { id: 'cafes', label: 'Cafes & Coffee', icon: Coffee },
  { id: 'restaurants', label: 'Restaurants', icon: Utensils },
  { id: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { id: 'arts', label: 'Arts & Culture', icon: Camera },
  { id: 'entertainment', label: 'Entertainment', icon: Music },
  { id: 'nature', label: 'Nature & Parks', icon: TreePine },
];

export const LocationPreferences = ({ preferences, onPreferencesChange }: LocationPreferencesProps) => {
  const handlePlaceTypeToggle = (placeType: string) => {
    const newPlaceTypes = preferences.placeTypes.includes(placeType)
      ? preferences.placeTypes.filter(type => type !== placeType)
      : [...preferences.placeTypes, placeType];
    
    onPreferencesChange({
      ...preferences,
      placeTypes: newPlaceTypes
    });
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium text-foreground">Location Preferences</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="distance" className="text-sm font-medium">
            Distance from me
          </Label>
          <Select
            value={preferences.distance}
            onValueChange={(value) => onPreferencesChange({ ...preferences, distance: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select distance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.5">Within 0.5 miles</SelectItem>
              <SelectItem value="1">Within 1 mile</SelectItem>
              <SelectItem value="3">Within 3 miles</SelectItem>
              <SelectItem value="5">Within 5 miles</SelectItem>
              <SelectItem value="10">Within 10 miles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-medium flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>Time of day</span>
          </Label>
          <Select
            value={preferences.timeOfDay}
            onValueChange={(value) => onPreferencesChange({ ...preferences, timeOfDay: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
              <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
              <SelectItem value="night">Night (10PM - 6AM)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-sm font-medium">Types of places</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {placeTypes.map((place) => {
            const Icon = place.icon;
            const isChecked = preferences.placeTypes.includes(place.id);
            
            return (
              <div
                key={place.id}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border cursor-pointer
                  transition-all duration-200 hover:shadow-soft
                  ${isChecked 
                    ? 'border-primary bg-primary/5 shadow-soft' 
                    : 'border-border hover:border-primary/50'
                  }
                `}
                onClick={() => handlePlaceTypeToggle(place.id)}
              >
                <Checkbox
                  id={place.id}
                  checked={isChecked}
                  onChange={() => handlePlaceTypeToggle(place.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Icon className={`h-4 w-4 ${isChecked ? 'text-primary' : 'text-muted-foreground'}`} />
                <Label 
                  htmlFor={place.id} 
                  className={`cursor-pointer text-sm ${isChecked ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                >
                  {place.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};