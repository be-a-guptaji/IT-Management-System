// @app/(Dashboard)/add-user/Page.tsx

"use client";

// Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/ui/loading";

// Utility
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Hooks
import { useAuth } from "@/hooks/useAuth";

const formSchema = z.object({
  firstName: z.string().min(1),
  middelName: z.string().min(1),
  lastName: z.string().min(1),
  designation: z.string().min(1),
  para: z.coerce.number(),
});

const Page = () => {
  // Hooks to check auth
  const { loading } = useAuth();

  // Construct a form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      middelName: "",
      lastName: "",
      designation: "",
      para: 0,
    },
  });

  // If loading, show loading message
  if (loading) {
    return <Loading />;
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Reset the form after submission
    console.log(data);
    form.reset();
  };

  return (
    <>
      <div className="flex min-h-full flex-wrap items-center justify-center gap-12 p-16">
        <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-black/5 bg-white px-12">
          <h2 className="my-8 text-3xl font-bold">Register a New User</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="middelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Middle Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Middle name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="designation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Designation</FormLabel>
                    <FormControl>
                      <Input placeholder="Designation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="para"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Para</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mb-8 flex justify-end">
                <Button type="submit" className="w-32 cursor-pointer">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>{" "}
      </div>
    </>
  );
};

export default Page;
