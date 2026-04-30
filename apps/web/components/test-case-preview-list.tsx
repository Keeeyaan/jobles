import { CheckCircle2, ShieldAlert, Zap } from "lucide-react";
import { TestCase } from "./test-case-generation";
import TestCaseItem from "./test-case-preview-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./ui/select";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { FieldLabel } from "./ui/field";

const TYPE_OPTIONS: TestCase["type"][] = [
  "Happy Path",
  "Edge Case",
  "Security",
  "Performance",
];
const typeConfig: Record<
  TestCase["type"],
  { badgeClass: string; borderClass: string; icon: React.ReactNode }
> = {
  "Happy Path": {
    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    borderClass: "border-l-emerald-500",
    icon: <CheckCircle2 className="h-3 w-3" />,
  },
  "Edge Case": {
    badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    borderClass: "border-l-amber-500",
    icon: <Zap className="h-3 w-3" />,
  },

  Security: {
    badgeClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    borderClass: "border-l-rose-500",
    icon: <ShieldAlert className="h-3 w-3" />,
  },
  Performance: {
    badgeClass: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    borderClass: "border-l-rose-500",
    icon: <ShieldAlert className="h-3 w-3" />,
  },
};

export function TestCasePreviewList({
  results,
  isGenerating,
}: {
  results: TestCase[];
  isGenerating: boolean;
}) {
  return (
    <Accordion type="multiple" className="space-y-2 w-full">
      {results.map((result) => {
        const config = typeConfig[result.type];

        return (
          <AccordionItem
            key={result.id}
            value={result.id}
            className={`px-4 py-3 rounded-lg border bg-card border-l-4 ${config.borderClass} transition-all duration-500 animate-in fade-in slide-in-from-bottom-2 ${isGenerating ? "ring-1 ring-blue-500/50 shadow-[0_0_15px_-5px_rgba(59,130,246,0.5)]" : ""}
        `}
          >
            <AccordionTrigger className="hover:no-underline hover:bg-muted/40 [&>svg]:text-muted-foreground">
              <div className="flex-col space-y-2">
                <Badge
                  variant="outline"
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 gap-1 border cursor-pointer ${config.badgeClass}`}
                >
                  {config.icon}
                  {result.type}
                </Badge>
                <div className="space-y-2">
                  <h1 className="font-bold">TC-001: {result.title}</h1>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <h1 className="font-semibold">Preconditions</h1>
              <p>{result.preConditions}</p>
              <h1 className="font-semibold">Steps</h1>
              {result.steps.map((step, index) => (
                <p key={index}>{`${index + 1}. ${step}`}</p>
              ))}
              <h1 className="font-semibold">Expected Results</h1>
              {result.expectedResults.map((res, index) => (
                <p key={index}>{`${index + 1}. ${res}`}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
