import { ArrowRight, Loader2, Wand2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { TestCasePreviewList } from "./test-case-preview-list";

export function TestCasePreview({
  results,
  isGenerating,
}: {
  results: any[];
  isGenerating: boolean;
}) {
  return (
    <div className="w-full">
      <Card className="flex flex-col h-full">
        <CardHeader className="py-2 border-b flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span
              className={`flex h-2 w-2 rounded-full ${isGenerating ? "bg-primary animate-pulse" : "bg-emerald-500"}`}
            />
            <h2 className="font-semibold">
              {isGenerating ? "Generating..." : "Test Cases Preview"}
            </h2>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono tracking-tighter">
              {isGenerating ? "STREAMING DATA..." : "READY"}
            </span>
            {isGenerating && (
              <Loader2 className="w-3 h-3 text-primary animate-spin" />
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4 overflow-y-auto max-h-150 custom-scrollbar">
          {results.length === 0 && !isGenerating && (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
              <div className="w-16 bg-accent h-16 rounded-full flex items-center justify-center">
                <Wand2 className="w-8 h-8 " />
              </div>
              <p className="text-muted-foreground text-sm max-w-50">
                Enter requirements and click generate to see AI-powered test
                cases.
              </p>
            </div>
          )}

          <TestCasePreviewList results={results} isGenerating={isGenerating} />

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 space-y-3 border border-dashed border-white/10 rounded-xl">
              <div className="flex space-x-1.5">
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">
                AI is thinking...
              </span>
            </div>
          )}

          {results.length > 0 && (
            <Button className="w-full py-5 items-center">
              <span>Approve Test Cases ({results.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
