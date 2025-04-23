
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingStars from "../components/RatingStars";
import AudioPlayer from "../components/AudioPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { musicTools } from "../data/musicTools";
import { useToast } from "@/components/ui/use-toast";

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tool = musicTools.find((t) => t.id === id);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simpel lokaal userRating, in echte app via backend opslaan
  const [userRating, setUserRating] = useState<number | undefined>(
    tool?.userRating
  );

  if (!tool) {
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

  const handleRating = (rating: number) => {
    setUserRating(rating);
    toast({
      title: "Bedankt voor je beoordeling!",
      description: `Je hebt ${tool.name} een ${rating}-sterren beoordeling gegeven.`,
      duration: 3000,
    });
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
              src={tool.imageUrl}
              alt={tool.name}
              className="w-full md:w-56 h-44 object-cover rounded-xl"
              loading="lazy"
            />
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl font-bold mb-2">{tool.name}</h1>
              <div className="flex flex-wrap mb-3 gap-2">
                {tool.category.map((cat) => (
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
              <p className="mb-2 text-muted-foreground">{tool.description}</p>
              <p className="mb-4 text-sm">{tool.extraInfo}</p>
              <div className="mb-5">
                <AudioPlayer audioSrc={tool.audioDemo} />
              </div>
              <div className="flex items-center gap-4 mb-5">
                <RatingStars
                  rating={tool.rating}
                  ratingsCount={tool.ratingsCount}
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
                    href={tool.websiteUrl}
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
