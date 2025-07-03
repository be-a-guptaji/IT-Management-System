// @app/page.tsx

"use client";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

// Icons
import { Building2 } from "lucide-react";

// Utility
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});

export default function Page() {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    // Reset the form after submission
    console.log(data);
    form.reset();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-2 inline-flex items-center gap-2 text-2xl font-bold text-blue-800">
            <Building2 className="h-8 w-8" />
            ADRDE IT Management
          </div>
          <p className="text-gray-600">IT Asset Management System</p>
        </div>

        <Card className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="userName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Name</FormLabel>
                          <FormControl>
                            <Input placeholder="User Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Password"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full cursor-pointer">
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <p className="text-muted-foreground text-center text-sm">
              Don&apos;t remember the password for login?{" "}
              <a
                href="mailto:developer@example.com"
                className="my-2 inline-block text-sm text-blue-600 underline-offset-4 hover:underline"
              >
                Contact the ADRDE
              </a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
