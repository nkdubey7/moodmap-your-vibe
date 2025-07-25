import { useState } from "react";
import { MoodSelector, type Mood } from "@/components/MoodSelector";
import { LocationPreferences } from "@/components/LocationPreferences";
import { RecommendationsList } from "@/components/RecommendationsList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Sparkles, Heart } from "lucide-react";

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [currentStep, setCurrentStep] = useState<'mood' | 'preferences' | 'recommendations'>('mood');
  const [preferences, setPreferences] = useState({
    distance: '3',
    timeOfDay: 'afternoon',
    placeTypes: ['cafes', 'restaurants', 'nature']
  });

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setCurrentStep('preferences');
  };

  const handleGetRecommendations = () => {
    setCurrentStep('recommendations');
  };

  const handleStartOver = () => {
    setSelectedMood(null);
    setCurrentStep('mood');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="relative px-4 py-12 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                Discover Your Vibe
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Find local spots that match your mood perfectly
              </p>
            </div>
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Mood-based recommendations</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Local discoveries</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Personalized experiences</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative -mt-8">
        <div className="container mx-auto px-4 pb-12">
          <Card className="max-w-6xl mx-auto p-8 shadow-medium bg-card/95 backdrop-blur-sm">
            {currentStep === 'mood' && (
              <MoodSelector 
                selectedMood={selectedMood}
                onMoodSelect={handleMoodSelect}
              />
            )}

            {currentStep === 'preferences' && selectedMood && (
              <div className="space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Great choice! Let's personalize your recommendations
                  </h2>
                  <p className="text-muted-foreground">
                    Tell us a bit more about your preferences
                  </p>
                </div>
                
                <LocationPreferences 
                  preferences={preferences}
                  onPreferencesChange={setPreferences}
                />
                
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="outline" 
                    onClick={handleStartOver}
                  >
                    Change Mood
                  </Button>
                  <Button 
                    onClick={handleGetRecommendations}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Get Recommendations
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'recommendations' && selectedMood && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    onClick={handleStartOver}
                  >
                    ← Start Over
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep('preferences')}
                  >
                    Adjust Preferences
                  </Button>
                </div>
                
                <RecommendationsList 
                  mood={selectedMood}
                  preferences={preferences}
                />
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
