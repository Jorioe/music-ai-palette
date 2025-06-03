import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";
import { musicTools } from "../data/musicTools";
import RatingStars from "../components/RatingStars";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";

const Comparison: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  // Scroll naar bovenkant bij laden van de pagina
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectTool = (position: number, toolId: string) => {
    const newSelectedTools = [...selectedTools];
    newSelectedTools[position] = toolId;
    setSelectedTools(newSelectedTools);
  };

  // Helper functie om categorie te formatteren
  const formatCategory = (category: string) => {
    switch(category) {
      case "lyrics": return "Songteksten";
      case "composition": return "Compositie";
      case "vocals": return "Vocals";
      case "mastering": return "Mastering";
      case "music generation": return "Muziek genereren";
      case "stem separation": return "Stem scheiding";
      case "other": return "Overig";
      default: return category;
    }
  };

  // Features comparison matrix
  const getFeaturesForCategory = (category: string) => {
    switch(category) {
      case "music generation":
        return [
          { name: "Type tool", key: "type", tooltip: "Bijv. Web-based, plugin, of app" },
          { name: "Desktop app", key: "desktop", tooltip: "Beschikbaar als downloadbare app" },
          { name: "Mobile app", key: "mobile", tooltip: "Beschikbaar voor mobiel gebruik" },
          { name: "AI-zang inbegrepen?", key: "sing", tooltip: "Kan de tool zelf zang genereren?" },
          { name: "Genre ondersteuning", key: "support", tooltip: "Hoeveel stijlen of genres ondersteund worden" },
          { name: "Export opties", key: "export", tooltip: "Bestandsformaten die je kunt exporteren" },
          { name: "Gebruiksvriendelijkheid", key: "ease", tooltip: "Hoe makkelijk is het in gebruik (1–5)" },
          { name: "Snelheid", key: "speed", tooltip: "Hoe snel genereert het resultaten (1–5)" },
          { name: "Commerciële licentie", key: "licence", tooltip: "Mag je de muziek commercieel gebruiken?" },
          { name: "Gratis beschikbaar", key: "free", tooltip: "Is er een gratis versie?" },
          { name: "Prijsmodel", key: "model", tooltip: "Bijv. gratis, abonnement, of creditsysteem" }
        ];
      case "mastering":
        return [
          { name: "Type tool", key: "type", tooltip: "Bijv. Web-based, plugin, of app" },
          { name: "Desktop app", key: "desktop", tooltip: "Beschikbaar als downloadbare app" },
          { name: "Mobile app", key: "mobile", tooltip: "Beschikbaar voor mobiel gebruik" },
          { name: "Export opties", key: "export", tooltip: "Bestandsformaten die je kunt exporteren" },
          { name: "Gebruiksvriendelijkheid", key: "ease", tooltip: "Hoe makkelijk is het in gebruik (1–5)" },
          { name: "Snelheid", key: "speed", tooltip: "Hoe snel genereert het resultaten (1–5)" },
          { name: "Gratis Demo", key: "free", tooltip: "Kun je de tool gratis uitproberen?" },
          { name: "Prijsmodel", key: "model", tooltip: "Bijv. gratis, abonnement, of creditsysteem" }
        ];
      case "stem separation":
        return [
          { name: "Type tool", key: "type", tooltip: "Bijv. Web-based, plugin, of app" },
          { name: "Desktop app", key: "desktop", tooltip: "Beschikbaar als downloadbare app" },
          { name: "Mobile app", key: "mobile", tooltip: "Beschikbaar voor mobiel gebruik" },
          { name: "Soorten stems", key: "stems", tooltip: "Welke stems kun je exporteren?" },
          { name: "Export opties", key: "export", tooltip: "Bestandsformaten die je kunt exporteren" },
          { name: "Gebruiksvriendelijkheid", key: "ease", tooltip: "Hoe makkelijk is het in gebruik (1–5)" },
          { name: "Snelheid", key: "speed", tooltip: "Hoe snel genereert het resultaten (1–5)" },
          { name: "Gratis beschikbaar", key: "free", tooltip: "Is er een gratis versie?" },
          { name: "Prijsmodel", key: "model", tooltip: "Bijv. gratis, abonnement, of creditsysteem" }
        ];
      default:
        return [
          { name: "Type tool", key: "type", tooltip: "Bijv. Web-based, plugin, of app" },
          { name: "Desktop app", key: "desktop", tooltip: "Beschikbaar als downloadbare app" },
          { name: "Mobile app", key: "mobile", tooltip: "Beschikbaar voor mobiel gebruik" },
          { name: "Export opties", key: "export", tooltip: "Bestandsformaten die je kunt exporteren" },
          { name: "Gebruiksvriendelijkheid", key: "ease", tooltip: "Hoe makkelijk is het in gebruik (1–5)" },
          { name: "Snelheid", key: "speed", tooltip: "Hoe snel genereert het resultaten (1–5)" },
          { name: "Commerciële licentie", key: "licence", tooltip: "Mag je de muziek commercieel gebruiken?" },
          { name: "Gratis beschikbaar", key: "free", tooltip: "Is er een gratis versie?" },
          { name: "Prijsmodel", key: "model", tooltip: "Bijv. gratis, abonnement, of creditsysteem" }
        ];
    }
  };

  // Get the appropriate features based on the selected tools' categories
  const getComparisonFeatures = () => {
    if (!selectedTools[0] || !selectedTools[1]) return [];
    
    const tool1 = musicTools.find(t => t.id === selectedTools[0]);
    const tool2 = musicTools.find(t => t.id === selectedTools[1]);
    
    if (!tool1 || !tool2) return [];
    
    // If both tools are in the same category, use that category's features
    const commonCategory = tool1.category.find(cat => tool2.category.includes(cat));
    if (commonCategory) {
      return getFeaturesForCategory(commonCategory);
    }
    
    // If tools are in different categories, use the default features
    return getFeaturesForCategory("default");
  };

  const features = getComparisonFeatures();

  // Get feature values directly from musicTools data
  const getFeatureValue = (toolId: string, featureKey: string) => {
    const tool = musicTools.find(t => t.id === toolId);
    if (!tool) return null;

    switch (featureKey) {
      case "type":
        return tool.typeTool;
      case "desktop":
        return tool.hasDesktopApp;
      case "mobile":
        return tool.hasMobileApp;
      case "stems":
        return tool.whatStems;
      case "sing":
        return tool.hasVoice;
      case "support":
        return tool.genreSupport;
      case "export":
        return tool.exportOptions;
      case "ease":
        return tool.useEase;
      case "speed":
        return tool.speed;
      case "licence":
        return tool.whatLicence;
      case "free":
        return tool.hasFreeVersion;
      case "model":
        return tool.priceModel;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full flex flex-col items-center bg-background">
        <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="flex items-center mb-4 sm:mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-2 sm:mr-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Terug
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Tools vergelijken</h1>
          </div>

          {/* Tool selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-10">
            {[0, 1].map((position) => (
              <div key={position} className="bg-card border border-border rounded-lg p-3 sm:p-6">
                <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
                  Tool {position + 1} selecteren
                </h2>
                <Select
                  value={selectedTools[position]}
                  onValueChange={(value) => handleSelectTool(position, value)}
                >
                  <SelectTrigger className="w-full mb-3 sm:mb-4">
                    <SelectValue placeholder="Selecteer een tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Group tools by category */}
                    {(Array.from(new Set(musicTools.flatMap(tool => tool.category)))).sort().map(category => (
                      <div key={category}>
                        <SelectGroup>
                          <SelectLabel className="font-medium text-sm px-2 py-1.5 bg-muted/50 rounded-md w-full">
                            {formatCategory(category)}
                          </SelectLabel>
                          {musicTools
                            .filter(tool => tool.category.includes(category))
                            .map((tool) => (
                              <SelectItem
                                key={`${category}-${tool.id}`}
                                value={tool.id}
                                disabled={selectedTools.includes(tool.id) && selectedTools.indexOf(tool.id) !== position}
                              >
                                <div className="inline-flex items-center gap-2 ml-3">
                                  <span className="w-2 h-2 rounded-full bg-primary/80 inline-block"></span>
                                  <span>{tool.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                        </SelectGroup>
                        <SelectSeparator className="my-1.5" />
                      </div>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTools[position] && (
                  <div>
                    {(() => {
                      const tool = musicTools.find(t => t.id === selectedTools[position]);
                      if (!tool) return null;
                      
                      return (
                        <div className="space-y-3 sm:space-y-4">
                          <img
                            src={tool.imageUrl}
                            alt={tool.name}
                            className="w-full h-28 sm:h-40 object-cover rounded-md"
                          />
                          {/* <h3 className="text-xl font-bold">{tool.name}</h3>
                          <div className="mb-2">
                            <RatingStars rating={tool.rating} ratingsCount={tool.ratingsCount} readOnly={true} />
                          </div>
                          <p className="text-muted-foreground text-sm">{tool.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {tool.category.map((cat) => (
                              <span
                                key={cat}
                                className="bg-muted/70 text-xs px-2 py-0.5 rounded-full"
                              >
                                {cat === "lyrics" ? "Songteksten" : 
                                 cat === "composition" ? "Compositie" :
                                 cat === "vocals" ? "Vocals" :
                                 cat === "mastering" ? "Mastering" : cat}
                              </span>
                            ))}
                          </div> */}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Comparison table */}
          {selectedTools.length === 2 && selectedTools[0] && selectedTools[1] && (
            <div className="border border-border rounded-lg">
              <div className="overflow-x-auto sm:overflow-visible">
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 sm:p-4 border-b border-border w-[30%]">
                        <div className="truncate text-right">
                          {musicTools.find(t => t.id === selectedTools[0])?.name}
                        </div>
                      </th>
                      <th className="text-center p-2 sm:p-4 border-b border-border w-[40%]">Eigenschappen</th>
                      <th className="p-2 sm:p-4 border-b border-border w-[30%]">
                        <div className="truncate text-left">
                          {musicTools.find(t => t.id === selectedTools[1])?.name}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature) => (
                      <tr key={feature.key} className="border-b border-border">
                        {/* Tool 1 values - Left aligned */}
                        <td className="p-2 sm:p-4 text-right">
                          {(() => {
                            const toolId = selectedTools[0];
                            const featureValue = getFeatureValue(toolId, feature.key);
                            
                            return feature.key === 'ease' || feature.key === 'speed' ? (
                              <div className="flex justify-end">
                                <RatingStars rating={featureValue as number || 0} readOnly={true} />
                              </div>
                            ) : feature.key === 'licence' || feature.key === 'sing' ? (
                              featureValue === undefined || featureValue === null ? (
                                "N/A"
                              ) : typeof featureValue === "boolean" ? (
                                featureValue ? (
                                  <Check className="ml-auto text-green-500" size={16} />
                                ) : (
                                  <X className="ml-auto text-red-500" size={16} />
                                )
                              ) : (
                                <span className="text-xs sm:text-sm md:text-base break-words">{featureValue as string}</span>
                              )
                            ) : featureValue === undefined || featureValue === null ? (
                              "N/A"
                            ) : typeof featureValue === "boolean" ? (
                              featureValue ? (
                                <Check className="ml-auto text-green-500" size={16} />
                              ) : (
                                <X className="ml-auto text-red-500" size={16} />
                              )
                            ) : (
                              <span className="text-xs sm:text-sm md:text-base break-words">{featureValue as string}</span>
                            );
                          })()}
                        </td>
                        
                        {/* Feature name - Center */}
                        <td className="p-2 sm:p-4 font-medium text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span>{feature.name}</span>
                            {feature.tooltip && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle size={14} className="flex-shrink-0 text-muted-foreground cursor-pointer" />
                                  </TooltipTrigger>
                                  <TooltipContent side="top">
                                    <p className="max-w-xs text-xs sm:text-sm">{feature.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                        </td>
                        
                        {/* Tool 2 values - Right aligned */}
                        <td className="p-2 sm:p-4 text-left">
                          {(() => {
                            const toolId = selectedTools[1];
                            const featureValue = getFeatureValue(toolId, feature.key);
                            
                            return feature.key === 'ease' || feature.key === 'speed' ? (
                              <div className="flex justify-start">
                                <RatingStars rating={featureValue as number || 0} readOnly={true} />
                              </div>
                            ) : feature.key === 'licence' || feature.key === 'sing' ? (
                              featureValue === undefined || featureValue === null ? (
                                "N/A"
                              ) : typeof featureValue === "boolean" ? (
                                featureValue ? (
                                  <Check className="mr-auto text-green-500" size={16} />
                                ) : (
                                  <X className="mr-auto text-red-500" size={16} />
                                )
                              ) : (
                                <span className="text-xs sm:text-sm md:text-base break-words">{featureValue as string}</span>
                              )
                            ) : featureValue === undefined || featureValue === null ? (
                              "N/A"
                            ) : typeof featureValue === "boolean" ? (
                              featureValue ? (
                                <Check className="mr-auto text-green-500" size={16} />
                              ) : (
                                <X className="mr-auto text-red-500" size={16} />
                              )
                            ) : (
                              <span className="text-xs sm:text-sm md:text-base break-words">{featureValue as string}</span>
                            );
                          })()}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="p-2 sm:p-4 text-right text-xs sm:text-sm md:text-base">
                        {musicTools.find(t => t.id === selectedTools[0])?.price || "N/A"}
                      </td>
                      <td className="p-2 sm:p-4 font-medium text-center">Prijsindicatie</td>
                      <td className="p-2 sm:p-4 text-left text-xs sm:text-sm md:text-base">
                        {musicTools.find(t => t.id === selectedTools[1])?.price || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(!selectedTools[0] || !selectedTools[1]) && (
            <div className="text-center py-4 sm:py-8 text-muted-foreground text-sm sm:text-base">
              Selecteer twee tools om ze te vergelijken
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Comparison;
