import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingStars from "../components/RatingStars";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Video, User } from "lucide-react";
import { musicTools } from "../data/musicTools";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import AudioPlayer from "../components/AudioPlayer";
import { Volume2 } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviewSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters bevatten" }).nonempty("Naam is verplicht"),
  rating: z.number().min(1, "Beoordeling is verplicht").max(5),
  comment: z.string().min(10, { message: "Review moet minimaal 10 karakters bevatten" }).nonempty("Review is verplicht"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Scroll naar bovenkant bij laden van de pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toolBase = musicTools.find((t) => t.id === id);

  // State for reviews
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingsCount, setRatingsCount] = useState<number>(toolBase?.ratingsCount || 0);
  const [rating, setRating] = useState<number>(toolBase?.rating || 0);

  // Form for submitting reviews
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      rating: 0,
      comment: ""
    }
  });

  const onSubmitReview = (data: ReviewFormValues) => {
    // Ensure all required fields are present
    if (!data.name || !data.rating || !data.comment) {
      return;
    }

    const newReview: Review = {
      name: data.name,
      rating: data.rating,
      comment: data.comment,
      date: new Date().toLocaleDateString('nl-NL')
    };
    
    setReviews([...reviews, newReview]);
    
    // Update average rating
    const totalScore = rating * ratingsCount + data.rating;
    const newCount = ratingsCount + 1;
    const newAverage = totalScore / newCount;
    
    setRatingsCount(newCount);
    setRating(newAverage);
    
    toast({
      title: "Bedankt voor je beoordeling!",
      description: "Je review is succesvol toegevoegd.",
      duration: 3000,
    });
    
    form.reset();
  };

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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full flex flex-col items-center bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6">
          {/* Terug knop boven de afbeelding */}
          <div className="mb-3 sm:mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} className="mr-1" />
              Terug
            </Button>
          </div>

          {/* Grote header-afbeelding */}
          <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-6" style={{ minHeight: "200px" }}>
            <img
              src={toolBase.imageUrl}
              alt={toolBase.name}
              className="w-full object-cover h-52 sm:h-72 md:h-96"
              loading="lazy"
              style={{ objectPosition: "center", objectFit: "cover" }}
            />
          </div>
          
          {/* Categorieën */}
          <div className="flex flex-wrap gap-2 mb-2">
            {toolBase.category.map((cat) => (
              <span
                key={cat}
                className="bg-muted/70 text-xs px-2 sm:px-3 py-1 rounded-full font-medium"
              >
                {cat === "other"
                  ? "Overig"
                  : cat === "stem separation"
                  ? "Stem scheiding"
                  : cat === "composition"
                  ? "Compositie"
                  : cat === "vocals"
                  ? "Vocals"
                  : cat === "mastering"
                  ? "Mastering"
                  : cat === "music generation"
                  ? "Muziek genereren"
                  : cat}
              </span>
            ))}
          </div>
          
          {/* Titel */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 tracking-tight">{toolBase.name}</h1>
          
          {/* Beoordeling + knop */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <RatingStars
              rating={rating}
              ratingsCount={ratingsCount}
              readOnly={true}
            />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-1 self-start mt-1 sm:mt-0"
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
          
          {/* Uitgebreide beschrijving */}
          <div className="mb-6 sm:mb-8">
            {toolBase.descriptionBlocks ? (
              <div className="space-y-3 sm:space-y-4">
                {toolBase.descriptionBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return <p key={index} className="text-sm sm:text-base">{block.content as string}</p>;
                  } else if (block.type === 'heading') {
                    return <h3 key={index} className="font-bold text-lg">{block.content as string}</h3>;
                  } else if (block.type === 'list') {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        {(block.content as string[]).map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (block.type === 'image') {
                    return (
                      <div key={index} className="my-6 sm:my-10">
                        <figure className="my-4">
                          <img 
                            src={block.content as string} 
                            alt={block.alt || `Afbeelding ${index + 1}`} 
                            className="rounded-lg w-full sm:w-4/5 md:w-3/4 object-cover max-h-[300px] sm:max-h-[400px] mx-auto"
                          />
                          {block.caption && (
                            <figcaption className="text-xs sm:text-sm text-muted-foreground mt-2 text-center italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p className="text-sm sm:text-base">{toolBase.longDescription}</p>
            )}
          </div>

          {/* Belangrijkste kenmerken */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Belangrijkste kenmerken</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Type & Platform</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm">
                  <li>Type: {toolBase.typeTool}</li>
                  <li>Desktop app: {toolBase.hasDesktopApp ? "Ja" : "Nee"}</li>
                  <li>Mobile app: {toolBase.hasMobileApp ? "Ja" : "Nee"}</li>
                </ul>
              </div>
              <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Gebruik</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm">
                  <li>Gebruiksvriendelijkheid: <RatingStars rating={toolBase.useEase} readOnly={true} /></li>
                  <li>Snelheid: <RatingStars rating={toolBase.speed} readOnly={true} /></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Abonnementen */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Abonnementen</h2>
            {toolBase.subscriptionInfo && toolBase.subscriptionInfo.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 sm:gap-4">
                {toolBase.subscriptionInfo.map((subscription, index) => (
                  <div key={index} className="bg-card p-4 sm:p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-lg font-semibold text-primary">{subscription.name}</h3>
                        <p className="text-xl sm:text-2xl font-bold mt-1">{subscription.price}</p>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 flex-grow">
                        {subscription.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-xs sm:text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-3 sm:p-4 rounded-lg border border-border">
                <p className="text-sm text-muted-foreground">Geen abonnement informatie beschikbaar.</p>
              </div>
            )}
          </div>

          {/* Extra informatie */}
          {toolBase.extraInfo && (
            <div className="mb-6 sm:mb-8">
              <p className="text-sm sm:text-base mb-4">{toolBase.extraInfo}</p>
            </div>
          )}
          
          {/* Mijn review/ervaringen (persoonlijk stukje) */}
          <section className="mb-8 sm:mb-10 bg-muted/30 p-4 sm:p-6 rounded-xl border border-border">
            <h2 className="text-lg sm:text-xl font-bold mb-3 flex items-center">
              <User className="mr-2" size={18} /> 
              Mijn ervaring met {toolBase.name}
            </h2>
            
            {toolBase.reviewBlocks ? (
              <div className="space-y-3 sm:space-y-4 mb-4">
                {toolBase.reviewBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return <p key={index} className="text-sm sm:text-base">{block.content as string}</p>;
                  } else if (block.type === 'heading') {
                    return <h3 key={index} className="font-bold text-base sm:text-lg">{block.content as string}</h3>;
                  } else if (block.type === 'list') {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                        {(block.content as string[]).map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (block.type === 'image') {
                    return (
                      <div key={index} className="my-6 sm:my-10">
                        <figure className="my-4">
                          <img 
                            src={block.content as string} 
                            alt={block.alt || `Afbeelding ${index + 1}`} 
                            className="rounded-lg w-full sm:w-4/5 md:w-3/4 object-cover max-h-[300px] sm:max-h-[400px] mx-auto"
                          />
                          {block.caption && (
                            <figcaption className="text-xs sm:text-sm text-muted-foreground mt-2 text-center italic">
                              {block.caption}
                            </figcaption>
                          )}
                        </figure>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <>
                {toolBase.review && (
                  <p className="text-sm sm:text-base mb-4">
                    {toolBase.review}
                  </p>
                )}
                {toolBase.reviewDesc && (
                  <p className="text-sm sm:text-base mb-0">
                    {toolBase.reviewDesc}
                  </p>
                )}
              </>
            )}
            
            <div className="mt-4 sm:mt-5">
              {/* Audioplayer */}
              {toolBase.audioDemo && (
                <section className="w-full mb-4 sm:mb-5">
                  <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2 sm:mb-3">
                    <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />
                    <span className="text-xs sm:text-sm">{toolBase.demoText}</span>
                  </div>
                  <AudioPlayer audioSrc={toolBase.audioDemo} />
                </section>
              )}
              {(toolBase.audioDemo2 || toolBase.audioDemo3) && (
                <section className="w-full mb-4 sm:mb-5">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                    {toolBase.audioDemo2 && toolBase.demoText2 && (
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2 sm:mb-3">
                          <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />
                          <span className="text-xs sm:text-sm">{toolBase.demoText2}</span>
                        </div>
                        <AudioPlayer audioSrc={toolBase.audioDemo2} />
                      </div>
                    )}
                    {toolBase.audioDemo3 && toolBase.demoText3 && (
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2 sm:mb-3">
                          <Volume2 className="w-4 sm:w-5 h-4 sm:h-5" />
                          <span className="text-xs sm:text-sm">{toolBase.demoText3}</span>
                        </div>
                        <AudioPlayer audioSrc={toolBase.audioDemo3} />
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-sm sm:text-base mr-2 font-medium">Mijn beoordeling:</span>
              <RatingStars rating={Math.round(toolBase.rating * 2) / 2} readOnly={true} />
            </div>
          </section>
          
          {/* Video */}
          {toolBase.videoUrl && (
            <section className="w-full mb-8 sm:mb-10">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-2 sm:mb-3">
                <Video className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm">Video tutorial</span>
              </div>
              <div className="w-full rounded-lg sm:rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16/9", minHeight: "200px" }}>
                <iframe
                  src={toolBase.videoUrl}
                  className="w-full h-full"
                  style={{ minHeight: "200px", maxHeight: "80vh" }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={toolBase.name + " video"}
                  loading="lazy"
                />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ToolDetail;
