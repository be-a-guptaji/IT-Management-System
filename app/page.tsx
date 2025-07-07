// @/app/page.tsx

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

// Utility
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

// React
import { useState, useEffect } from "react";

// Icons
import { Building2 } from "lucide-react";

// Store
import { useUserStore } from "@/lib/store/useStore";

// Login Form Schema
const loginFormSchema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
});

export default function Page() {
  // Router
  const router = useRouter();

  // Store
  const { setName } = useUserStore();

  // State
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState<boolean>(false); // State to track error

  // Construct a form hook
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  // Submit Function
  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      // Set Loading to true
      setLoading(true);

      // Set Error to false
      setError(false);

      // Reset the form after submission
      const res = await api.post("/auth/login", data);

      if (res.status === 200) {
        router.push("/home");
      }
    } catch {
      // Set Error to true
      setError(true);
    } finally {
      // Set Loading to false
      setLoading(false);

      // Reset the form after submission
      form.reset();
    }
  };

  // useEffect
  useEffect(() => {
    // Check if user is already logged in
    (async () => {
      try {
        // Make a request to check if the user is already logged in
        const res = await api.post("/auth/verify");

        // If the user is logged in, set the name in the store
        if (res.status === 200) {
          setName(res.data.admin);
        }

        // If the user is already logged in, redirect to the home page
        if (res.status === 200) {
          router.push("/home");
        }
      } catch {
        // Handle error silently
      } finally {
        // Reset the form
        form.reset();
      }
    })();
  }, [form, router, setName]);

  return (
    <div className="absolute top-0 left-0 z-50 flex h-screen min-h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
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

                  {error && (
                    <p className="text-destructive text-center text-sm">
                      Invalid Credentials
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointe w-full"
                  >
                    Login
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <p className="text-muted-foreground text-center text-sm">
              Don&apos;t remember the password for login?{" "}
              <Link
                href="mailto:developer@example.com"
                className="my-2 inline-block text-sm text-blue-600 underline-offset-4 hover:underline"
              >
                Contact the ADRDE
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
