import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles, Wand2 } from "lucide-react";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { IconBotId } from "@tabler/icons-react";

const GenerateCasesFormSchema = z.object({
  description: z.string().min(1, "Description is required"),
});

export function GenerateCasesForm() {
  const form = useForm<z.infer<typeof GenerateCasesFormSchema>>({
    resolver: zodResolver(GenerateCasesFormSchema),
    defaultValues: {
      description: "",
    },
  });

  const handleGenerate = (data: z.infer<typeof GenerateCasesFormSchema>) => {
    setTimeout(() => {
      console.log(data);
    }, 2000);
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button>
          <IconBotId />
          Generate with AI
        </Button>
      </DrawerTrigger>
      <DrawerContent className="min-w-180">
        <DrawerHeader className="space-y-2 border-b">
          <DrawerTitle className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <Sparkles size={20} className="text-primary" />
              <h2 className="font-semibold">Generate Test Cases with AI</h2>
            </div>
          </DrawerTitle>
        </DrawerHeader>

        <div className="px-4 my-auto mx-auto text-center space-y-2">
          <h1 className="font-semibold flex items-center gap-2 justify-center">
            <Sparkles size={18} className="text-primary" />
            Generate Test Cases with AI
          </h1>
          <DrawerDescription className="text-muted-foreground w-md text-sm">
            Describe your feature, user story, or technical requirement. Our AI
            will analyze the logic and generate comprehensive edge cases, happy
            paths, and security validations.
          </DrawerDescription>
        </div>
        <DrawerFooter className="mt-0 pt-0">
          <form
            onSubmit={form.handleSubmit(handleGenerate)}
            className="px-4 space-y-2"
          >
            <FieldGroup className="gap-2">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-xs text-muted-foreground">
                      Description
                    </FieldLabel>
                    <Textarea
                      {...field}
                      placeholder="Describe the user story in detail..."
                      disabled={form.formState.isSubmitting}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="min-h-20 text-sm"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="p-5 w-full"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Wand2 />
                  Generate
                </>
              )}
            </Button>
          </form>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
