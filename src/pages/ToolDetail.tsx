
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingStars from "../components/RatingStars";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Video } from "lucide-react";
import { musicTools } from "../data/musicTools";
import { useToast } from "@/components/ui/use-toast";

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toolBase = musicTools.find((t) => t.id === id);

  // Je kunt geen tool beoordelen als hij niet bestaat
  if (!toolBase) {
    return (
      <div>
        <Navbar />
        <div className="container py-12">
          <div className="text-center text-lg text-muted-foreground">
            Tool niet gevonden.
          </div>
          <div className="text-center mt-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2" size={18} />
              Terug
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Lokale state voor ratings (geen backend)
  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [ratingsCount, setRatingsCount] = useState<number>(toolBase.ratingsCount);
  const [rating, setRating] = useState<number>(toolBase.rating);

  const handleRating = (newRating: number) => {
    if (!userRating) {
      // Simuleer direct gemiddeld bijwerken
      const totalScore = rating * ratingsCount + newRating;
      const newCount = ratingsCount + 1;
      const newAverage = totalScore / newCount;
      setUserRating(newRating);
      setRatingsCount(newCount);
      setRating(newAverage);

      toast({
        title: "Bedankt voor je beoordeling!",
        description: `Je hebt ${toolBase.name} een ${newRating}-sterren beoordeling gegeven.`,
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="container mx-auto px-4 py-10 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <Button
            variant="outline"
            size="sm"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-1" />
            Terug
          </Button>
          <div className="bg-card rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
            <img
              src={toolBase.imageUrl}
              alt={toolBase.name}
              className="w-full md:w-56 h-44 object-cover rounded-xl"
              loading="lazy"
            />
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl font-bold mb-2">{toolBase.name}</h1>
              <div className="flex flex-wrap mb-3 gap-2">
                {toolBase.category.map((cat) => (
                  <span
                    key={cat}
                    className="bg-muted/70 text-xs px-2 py-1 rounded-full"
                  >
                    {cat === "lyrics"
                      ? "Songteksten"
                      : cat === "composition"
                      ? "Compositie"
                      : cat === "vocals"
                      ? "Vocals"
                      : cat === "mastering"
                      ? "Mastering"
                      : cat}
                  </span>
                ))}
              </div>
              <p className="mb-2 text-muted-foreground">{toolBase.description}</p>
              <p className="mb-4 text-sm">{toolBase.extraInfo}</p>
              {toolBase.videoUrl && (
                <div className="mb-5 w-full min-h-44 rounded-lg overflow-hidden flex flex-col gap-2">
                  <div className="flex items-center gap-1 mb-2 text-muted-foreground font-medium">
                    <Video className="w-4 h-4" />
                    Tool Video
                  </div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                    <iframe
                      src={toolBase.videoUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={toolBase.name + " video"}
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4 mb-5">
                <RatingStars
                  rating={rating}
                  ratingsCount={ratingsCount}
                  userRating={userRating}
                  onRate={handleRating}
                  readOnly={!!userRating}
                />
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <a
                    href={toolBase.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Officiële site <ExternalLink size={15} />
                  </a>
                </Button>
              </div>
              {!userRating && (
                <div className="text-xs text-muted-foreground">
                  Klik op de sterren om je beoordeling te geven.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ToolDetail;

