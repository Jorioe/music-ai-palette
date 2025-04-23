
import React, { useState } from "react";
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

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviewSchema = z.object({
  name: z.string().min(2, { message: "Naam moet minimaal 2 karakters bevatten" }),
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, { message: "Review moet minimaal 10 karakters bevatten" }),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const ToolDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    const newReview: Review = {
      ...data,
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
        <div className="w-full max-w-5xl mx-auto px-2 md:px-8 py-6">
          {/* Terug knop boven de afbeelding */}
          <div className="mb-4">
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
          <div className="relative w-full rounded-3xl overflow-hidden mb-6" style={{ minHeight: "300px" }}>
            <img
              src={toolBase.imageUrl}
              alt={toolBase.name}
              className="w-full object-cover h-72 md:h-96"
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
              readOnly={true}
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
          
          {/* Uitgebreide omschrijving */}
          <div className="mb-8 text-base leading-relaxed">
            <p className="mb-4 text-muted-foreground">{toolBase.description}</p>
            <p className="mb-4">{toolBase.extraInfo}</p>
            <p className="mb-4">
              {toolBase.name} maakt gebruik van geavanceerde AI-technologie om zijn functionaliteit te optimaliseren. 
              De gebruikersinterface is intuïtief en geschikt voor zowel beginners als ervaren gebruikers. 
              Het is beschikbaar als webapplicatie en er is een desktop versie voor Windows en Mac beschikbaar.
            </p>
          </div>
          
          {/* Mijn review/ervaringen (persoonlijk stukje) */}
          <section className="mb-10 bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <User className="mr-2" size={18} /> 
              Mijn ervaring met {toolBase.name}
            </h2>
            <p className="mb-4 italic">
              "Ik heb {toolBase.name} uitgebreid getest voor verschillende muziekprojecten. 
              De tool is intuïtief in gebruik en levert verrassend goede resultaten op voor een AI-tool. 
              Vooral de {toolBase.category[0] === "lyrics" ? "tekstsuggesties zijn creatief" : 
                      toolBase.category[0] === "composition" ? "melodische ideeën zijn inspirerend" : 
                      toolBase.category[0] === "vocals" ? "stembewerking is indrukwekkend" : 
                      "masteringkwaliteit is professioneel"}. 
              Er zijn wat kleine verbeterpunten, maar voor de prijs is het een waardevolle aanvulling 
              op je muzikale toolkit."
            </p>
            <div className="flex items-center">
              <span className="mr-2 font-medium">Mijn beoordeling:</span>
              <RatingStars rating={Math.round(toolBase.rating * 2) / 2} readOnly={true} />
            </div>
          </section>
          
          {/* Video */}
          {toolBase.videoUrl && (
            <section className="w-full mb-10">
              <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-3">
                <Video className="w-5 h-5" />
                Video tutorial
              </div>
              <div className="w-full rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16/9", minHeight: "400px" }}>
                <iframe
                  src={toolBase.videoUrl}
                  className="w-full h-full"
                  style={{ minHeight: "400px" }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={toolBase.name + " video"}
                  loading="lazy"
                />
              </div>
            </section>
          )}
          
          {/* Reviews sectie */}
          <section className="my-10">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2>
            
            {/* Bestaande reviews */}
            {reviews.length > 0 ? (
              <div className="space-y-6 mb-10">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-card p-4 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{review.name}</h3>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <RatingStars rating={review.rating} readOnly={true} />
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground mb-6">Nog geen reviews. Wees de eerste om een review te schrijven!</p>
            )}
            
            {/* Review formulier */}
            <div className="bg-card border border-border p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Schrijf een review</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitReview)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naam</FormLabel>
                        <FormControl>
                          <Input placeholder="Je naam" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beoordeling</FormLabel>
                        <FormControl>
                          <div>
                            <RatingStars 
                              rating={field.value} 
                              onRate={(value) => field.onChange(value)} 
                              readOnly={false} 
                            />
                            {form.formState.errors.rating && (
                              <p className="text-sm text-red-500 mt-1">Geef een beoordeling</p>
                            )}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Review</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Deel je ervaring met deze tool..." 
                            className="min-h-[100px]" 
                            {...field} 
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Review plaatsen
                  </Button>
                </form>
              </Form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ToolDetail;
