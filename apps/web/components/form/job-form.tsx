import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CountryDropdown } from "../ui/country-dropdown";
import { LoadingSwap } from "../loading-swap";
import { toast } from "sonner";
import { useCreateJob } from "@/hooks/useCreateJob";
import { CreateJobSchema } from "@repo/schemas";

interface JobFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface Country {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
}
export function JobFormModal({ open, onOpenChange }: JobFormModalProps) {
  const form = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      company: "",
      position: "",
      description: "",
      status: "pending",
      type: "full-time",
      note: "",
      applicationDate: new Date().toString(),
      location: "",
    },
  });

  const { mutate } = useCreateJob();

  const handleCreateJob = (data: z.infer<typeof CreateJobSchema>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Job created successfully");
        form.reset();
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create job");
      },
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-border bg-card w-full min-w-137.5">
        <DialogHeader>
          <DialogTitle>{"Add New Job"}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleCreateJob)}
          className="space-y-4"
        >
          <FieldGroup>
            <div className="flex items-center justify-between gap-4">
              <Controller
                name="company"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Company</FieldLabel>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="position"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Position</FieldLabel>
                    <Input
                      {...field}
                      disabled={form.formState.isSubmitting}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="location"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Location</FieldLabel>
                  <CountryDropdown
                    value={field.value}
                    onChange={field.onChange}
                  />
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    {...field}
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="flex items-center justify-between gap-4">
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Status</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="border-border bg-background"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-border bg-card">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="interviewed">Interviewed</SelectItem>
                        <SelectItem value="offered">Offered</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Type</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={form.formState.isSubmitting}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="border-border bg-background"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="border-border bg-card">
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <Controller
              name="applicationDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Application Date</FieldLabel>
                  <Input
                    {...field}
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    type="date"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="note"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Note</FieldLabel>
                  <Textarea
                    {...field}
                    disabled={form.formState.isSubmitting}
                    aria-invalid={fieldState.invalid}
                    rows={4}
                    placeholder="Add any notes about this application..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                <LoadingSwap isLoading={form.formState.isSubmitting}>
                  Create Job
                </LoadingSwap>
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
