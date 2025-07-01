// @components/form/LoginForm.tsx

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

// Utility
import { z } from "zod";

// Hooks
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Schema
const LoginFormSchema = z.object({
  userName: z.string(),
  password: z.string(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    console.log("Submitted data:", data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col space-y-8 px-6">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-white uppercase">
                    User Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter user name"
                      className="bg-white text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold text-white uppercase">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter password"
                      className="bg-white text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mx-auto w-full cursor-pointer bg-white text-black hover:scale-105 hover:bg-black/50 hover:text-white active:scale-95"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
