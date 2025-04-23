<<<<<<< HEAD
=======

>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";
import { musicTools } from "../data/musicTools";
import RatingStars from "../components/RatingStars";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Comparison: React.FC = () => {
  const navigate = useNavigate();
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  const handleSelectTool = (position: number, toolId: string) => {
    const newSelectedTools = [...selectedTools];
    newSelectedTools[position] = toolId;
    setSelectedTools(newSelectedTools);
  };

  // Features comparison matrix
  const features = [
    { name: "AI-ondersteuning", key: "ai" },
    { name: "Gratis versie", key: "free" },
    { name: "Desktop app", key: "desktop" },
    { name: "Mobile app", key: "mobile" },
    { name: "Export opties", key: "export" },
    { name: "Gebruiksvriendelijkheid", key: "ease" },
  ];

<<<<<<< HEAD
  // Get feature values directly from musicTools data
  const getFeatureValue = (toolId: string, featureKey: string) => {
    const tool = musicTools.find(t => t.id === toolId);
    if (!tool) return null;

    switch (featureKey) {
      case "ai":
        return true; // All tools in musicTools are AI-powered
      case "free":
        return tool.hasFreeVersion;
      case "desktop":
        return tool.hasDesktopApp;
      case "mobile":
        return tool.hasMobileApp;
      case "export":
        return tool.hasExportOptions;
      case "ease":
        return tool.useEase;
      default:
        return null;
    }
=======
  // Mock feature data (in a real app, this would come from an API or database)
  const toolFeatures: Record<string, Record<string, boolean | number>> = {
    "1": { ai: true, free: true, desktop: true, mobile: false, export: true, ease: 4 },
    "2": { ai: true, free: true, desktop: false, mobile: true, export: true, ease: 5 },
    "3": { ai: true, free: false, desktop: true, mobile: true, export: true, ease: 3 },
    "4": { ai: true, free: true, desktop: false, mobile: false, export: false, ease: 4 },
    "5": { ai: true, free: false, desktop: true, mobile: false, export: true, ease: 5 },
    "6": { ai: true, free: true, desktop: false, mobile: false, export: true, ease: 4 },
    "7": { ai: true, free: false, desktop: true, mobile: true, export: true, ease: 4 },
    "8": { ai: true, free: true, desktop: false, mobile: false, export: true, ease: 3 },
>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-full flex flex-col items-center bg-background">
        <div className="w-full max-w-5xl mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="mr-4"
            >
              <ArrowLeft size={16} className="mr-1" />
              Terug
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">Tools vergelijken</h1>
          </div>

          {/* Tool selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {[0, 1].map((position) => (
              <div key={position} className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">
                  Tool {position + 1} selecteren
                </h2>
                <Select
                  value={selectedTools[position]}
                  onValueChange={(value) => handleSelectTool(position, value)}
                >
                  <SelectTrigger className="w-full mb-4">
                    <SelectValue placeholder="Selecteer een tool" />
                  </SelectTrigger>
                  <SelectContent>
                    {musicTools.map((tool) => (
                      <SelectItem
                        key={tool.id}
                        value={tool.id}
                        disabled={selectedTools.includes(tool.id) && selectedTools.indexOf(tool.id) !== position}
                      >
                        {tool.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedTools[position] && (
                  <div>
                    {(() => {
                      const tool = musicTools.find(t => t.id === selectedTools[position]);
                      if (!tool) return null;
                      
                      return (
                        <div className="space-y-4">
                          <img
                            src={tool.imageUrl}
                            alt={tool.name}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          <h3 className="text-xl font-bold">{tool.name}</h3>
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
                          </div>
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
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 border-b border-border">Eigenschappen</th>
                    <th className="p-4 border-b border-border">
                      {musicTools.find(t => t.id === selectedTools[0])?.name}
                    </th>
                    <th className="p-4 border-b border-border">
                      {musicTools.find(t => t.id === selectedTools[1])?.name}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr key={feature.key} className="border-b border-border">
                      <td className="p-4 font-medium">{feature.name}</td>
                      {[0, 1].map((position) => {
                        const toolId = selectedTools[position];
<<<<<<< HEAD
                        const featureValue = getFeatureValue(toolId, feature.key);
=======
                        const featureValue = toolFeatures[toolId]?.[feature.key];
>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
                        
                        return (
                          <td key={position} className="p-4 text-center">
                            {feature.key === 'ease' ? (
                              <div className="flex justify-center">
<<<<<<< HEAD
                                <RatingStars rating={featureValue as number || 0} readOnly={true} />
=======
                                <RatingStars rating={featureValue as number} readOnly={true} />
>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
                              </div>
                            ) : typeof featureValue === "boolean" ? (
                              featureValue ? (
                                <Check className="mx-auto text-green-500" />
                              ) : (
                                <X className="mx-auto text-red-500" />
                              )
                            ) : (
                              "N/A"
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-4 font-medium">Prijs</td>
                    <td className="p-4 text-center">
<<<<<<< HEAD
                      {musicTools.find(t => t.id === selectedTools[0])?.price || "N/A"}
                    </td>
                    <td className="p-4 text-center">
                      {musicTools.find(t => t.id === selectedTools[1])?.price || "N/A"}
=======
                      {Math.floor(Math.random() * 3) === 0 ? "Gratis" : `€${(Math.random() * 50 + 10).toFixed(2)}/maand`}
                    </td>
                    <td className="p-4 text-center">
                      {Math.floor(Math.random() * 3) === 0 ? "Gratis" : `€${(Math.random() * 50 + 10).toFixed(2)}/maand`}
>>>>>>> c0e9b90badd3431e53b898013e1d95db89a7375c
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Beoordeling</td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <RatingStars 
                          rating={musicTools.find(t => t.id === selectedTools[0])?.rating || 0} 
                          readOnly={true} 
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center">
                        <RatingStars 
                          rating={musicTools.find(t => t.id === selectedTools[1])?.rating || 0} 
                          readOnly={true} 
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {(!selectedTools[0] || !selectedTools[1]) && (
            <div className="text-center py-8 text-muted-foreground">
              Selecteer twee tools om ze te vergelijken
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Comparison;
