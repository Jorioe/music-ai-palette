
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

  const [userRating, setUserRating] = useState<number | undefined>(undefined);
  const [ratingsCount, setRatingsCount] = useState<number>(toolBase.ratingsCount);
  const [rating, setRating] = useState<number>(toolBase.rating);

  const handleRating = (newRating: number) => {
    if (!userRating) {
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
      <main className="w-full flex flex-col items-center bg-background">
        <div className="w-full max-w-4xl mx-auto px-2 md:px-8 py-10">
          {/* Grote header-afbeelding */}
          <div className="relative w-full rounded-3xl overflow-hidden mb-6" style={{ minHeight: "270px" }}>
            <img
              src={toolBase.imageUrl}
              alt={toolBase.name}
              className="w-full object-cover h-64 md:h-80"
              loading="lazy"
              style={{ objectPosition: "center", objectFit: "cover" }}
            />
          </div>
          {/* Categorieën */}
          <div className="flex flex-wrap gap-2 mb-2">
            {toolBase.category.map((cat) => (
              <span
                key={cat}
                className="bg-muted/70 text-xs px-3 py-1 rounded-full font-medium"
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
          {/* Titel */}
          <h1 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">{toolBase.name}</h1>
          {/* Beoordeling + knop */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
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
              className="gap-1 self-start"
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
            <div className="text-xs text-muted-foreground mb-2">
              Klik op de sterren om je beoordeling te geven.
            </div>
          )}
          {/* Omschrijving & extra info */}
          <div className="mb-6 text-base text-muted-foreground leading-relaxed">
            <p className="mb-2">{toolBase.description}</p>
            <p className="text-sm text-foreground">{toolBase.extraInfo}</p>
          </div>
          {/* Grotere video */}
          {toolBase.videoUrl && (
            <section className="w-full mb-4">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2">
                <Video className="w-5 h-5" />
                Informatievideo over deze tool
              </div>
              <div className="w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16/9", minHeight: "320px" }}>
                <iframe
                  src={toolBase.videoUrl}
                  className="w-full h-full"
                  style={{ minHeight: "320px" }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={toolBase.name + " video"}
                  loading="lazy"
                />
              </div>
            </section>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="mt-8"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-1" />
            Terug
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ToolDetail;
