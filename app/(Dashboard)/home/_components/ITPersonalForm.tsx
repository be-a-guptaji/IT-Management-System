// @app/(Dashboard)/admin/home/_components/ITPersonalForm.tsx

"use client";

// Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Hooks
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Utility
import { z } from "zod";

// Schema
const ITPersonalFormSchema = z.object({
  name: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  phoneNumber: z.number().min(10),
  email: z.string().email(),
  address: z.string(),
});

// Infer form values type from schema
type PcFormData = z.infer<typeof ITPersonalFormSchema>;

const ITPersonalForm = () => {
  const form = useForm<z.infer<typeof ITPersonalFormSchema>>({
    resolver: zodResolver(ITPersonalFormSchema),
    defaultValues: {
      name: {
        firstName: "",
        lastName: "",
      },
      phoneNumber: 0,
      email: "",
      address: "",
    },
  });

  const onSubmit = (data: PcFormData) => {
    console.log("Submitted data:", data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8 px-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="dark:text-secondary/70 text-xs font-bold text-zinc-500 uppercase">
                    Channel Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={field.value?.firstName ?? ""}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="Enter channel name"
                      className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-300/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ITPersonalForm;
