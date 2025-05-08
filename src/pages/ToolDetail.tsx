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
          <h1 className="text-3xl md:text-4xl font-bold mb-1 tracking-tight">{toolBase.name}</h1>
          
          {/* Beoordeling + knop */}
          <div className="flex items-center gap-4 mb-6">
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
          
          {/* Uitgebreide beschrijving */}
          <div className="mb-8">
            {toolBase.descriptionBlocks ? (
              <div className="space-y-4">
                {toolBase.descriptionBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return <p key={index}>{block.content as string}</p>;
                  } else if (block.type === 'heading') {
                    return <h3 key={index} className="font-bold text-lg">{block.content as string}</h3>;
                  } else if (block.type === 'list') {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-2">
                        {(block.content as string[]).map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (block.type === 'image') {
                    return (
                      <figure key={index} className="my-4">
                        <img 
                          src={block.content as string} 
                          alt={block.alt || `Afbeelding ${index + 1}`} 
                          className="rounded-lg w-full object-cover max-h-[400px]"
                        />
                        {block.caption && (
                          <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <p>{toolBase.longDescription}</p>
            )}
          </div>

          {/* Belangrijkste kenmerken */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Belangrijkste kenmerken</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Type & Platform</h3>
                <ul className="space-y-2 text-sm">
                  <li>Type: {toolBase.typeTool}</li>
                  <li>Desktop app: {toolBase.hasDesktopApp ? "Ja" : "Nee"}</li>
                  <li>Mobile app: {toolBase.hasMobileApp ? "Ja" : "Nee"}</li>
                </ul>
              </div>
              {/* <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Functionaliteit</h3>
                <ul className="space-y-2 text-sm">
                  {toolBase.category.includes("music generation") && (
                    <li>AI-zang: {toolBase.hasVoice ? "Ja" : "Nee"}</li>
                  )}
                  {toolBase.category.includes("music generation") && (
                    <li>Genre ondersteuning: {toolBase.genreSupport}</li>
                  )}
                  {toolBase.category.includes("mastering") && (
                    <li>AI-analyse: Ja</li>
                  )}
                  <li>Export opties: {toolBase.exportOptions}</li>
                </ul>
              </div> */}
              <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Gebruik</h3>
                <ul className="space-y-2 text-sm">
                  <li>Gebruiksvriendelijkheid: <RatingStars rating={toolBase.useEase} readOnly={true} /></li>
                  <li>Snelheid: <RatingStars rating={toolBase.speed} readOnly={true} /></li>
                </ul>
              </div>
              {/* <div className="bg-card p-4 rounded-lg border border-border">
                <h3 className="font-medium mb-2">Licentie</h3>
                <ul className="space-y-2 text-sm">
                  <li>Commerciële licentie: {typeof toolBase.whatLicence === "boolean" ? (toolBase.whatLicence ? "Ja" : "Nee") : toolBase.whatLicence}</li>
                  <li>Gratis versie: {toolBase.hasFreeVersion ? "Ja" : "Nee"}</li>
                  <li>Prijsmodel: {toolBase.priceModel}</li>
                </ul>
              </div> */}
            </div>
          </div>

          {/* Abonnementen */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Abonnementen</h2>
            {toolBase.subscriptionInfo && toolBase.subscriptionInfo.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {toolBase.subscriptionInfo.map((subscription, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold text-primary">{subscription.name}</h3>
                        <p className="text-2xl font-bold mt-1">{subscription.price}</p>
                      </div>
                      <ul className="space-y-3 flex-grow">
                        {subscription.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <span className="text-primary">•</span>
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card p-4 rounded-lg border border-border">
                <p className="text-muted-foreground">Geen abonnement informatie beschikbaar.</p>
              </div>
            )}
          </div>

          {/* Extra informatie */}
          <div className="mb-8">
            <p className="mb-4">{toolBase.extraInfo}</p>
          </div>
          
          {/* Mijn review/ervaringen (persoonlijk stukje) */}
          <section className="mb-10 bg-muted/30 p-6 rounded-xl border border-border">
            <h2 className="text-xl font-bold mb-3 flex items-center">
              <User className="mr-2" size={18} /> 
              Mijn ervaring met {toolBase.name}
            </h2>
            {/* <p className="mb-4 italic">
              "{toolBase.review}"
            </p> */}
            {toolBase.reviewBlocks ? (
              <div className="space-y-4 mb-4">
                {toolBase.reviewBlocks.map((block, index) => {
                  if (block.type === 'paragraph') {
                    return <p key={index}>{block.content as string}</p>;
                  } else if (block.type === 'heading') {
                    return <h3 key={index} className="font-bold text-lg">{block.content as string}</h3>;
                  } else if (block.type === 'list') {
                    return (
                      <ul key={index} className="list-disc pl-5 space-y-2">
                        {(block.content as string[]).map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    );
                  } else if (block.type === 'image') {
                    return (
                      <figure key={index} className="py-2">
                        <img 
                          src={block.content as string} 
                          alt={block.alt || `Afbeelding ${index + 1}`} 
                          className="rounded-lg w-3/4 object-cover max-h-[400px] mx-auto"
                        />
                        {block.caption && (
                          <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                            {block.caption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <>
                {toolBase.review && (
                  <p className="mb-4">
                    {toolBase.review}
                  </p>
                )}
                {toolBase.reviewDesc && (
                  <p className="mb-0">
                    {toolBase.reviewDesc}
                  </p>
                )}
              </>
            )}
            
            <div className="mt-5">
              {/* Audioplayer */}
              {toolBase.audioDemo && (
                <section className="w-full mb-5">
                  <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-3">
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm">{toolBase.demoText}</span>
                  </div>
                  <AudioPlayer audioSrc={toolBase.audioDemo} />
                </section>
              )}
              {(toolBase.audioDemo2 || toolBase.audioDemo3) && (
                <section className="w-full mb-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {toolBase.audioDemo2 && toolBase.demoText2 && (
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-3">
                          <Volume2 className="w-5 h-5" />
                          <span className="text-sm">{toolBase.demoText2}</span>
                        </div>
                        <AudioPlayer audioSrc={toolBase.audioDemo2} />
                      </div>
                    )}
                    {toolBase.audioDemo3 && toolBase.demoText3 && (
                      <div>
                        <div className="flex items-center gap-2 text-muted-foreground font-semibold mb-3">
                          <Volume2 className="w-5 h-5" />
                          <span className="text-sm">{toolBase.demoText3}</span>
                        </div>
                        <AudioPlayer audioSrc={toolBase.audioDemo3} />
                      </div>
                    )}
                  </div>
                </section>
              )}
            </div>
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
          {/* <section className="my-10">
            <h2 className="text-2xl font-bold mb-6">Reviews</h2> */}
            
            {/* Bestaande reviews */}
            {/* {reviews.length > 0 ? (
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
            )} */}
            
            {/* Review formulier */}
            {/* <div className="bg-card border border-border p-6 rounded-lg">
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
            </div> */}
          {/* </section> */}
        </div>
      </main>
    </div>
  );
};

export default ToolDetail;
