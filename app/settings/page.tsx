// @/app/settings/page.tsx

"use client";

// Components
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SettingsPageLoading } from "@/components/loadings/SettingsPageLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// Icons
import { ArrowRight } from "lucide-react";

// Form & Validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// React
import { useState } from "react";

// Toast
import { toast } from "sonner";

// POST Services
import { changePassword, changeUserName } from "@/services/POST";

// Schema for changing username
const changeUserNameFormSchema = z.object({
  userName: z.string().min(2, {
    message: "User name must be at least 2 characters.",
  }),
  password: z.string(),
});

// Schema for changing password
const changePasswordFormSchema = z.object({
  oldPassword: z.string(),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const Page = () => {
  // Hooks
  const { loading } = useAuth();

  // State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form setup for changing username
  const changeUserNameForm = useForm<z.infer<typeof changeUserNameFormSchema>>({
    resolver: zodResolver(changeUserNameFormSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  // Form setup for changing password
  const changePasswordForm = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Submit handler for changing username
  const onSubmitForChangeUserName = async (
    data: z.infer<typeof changeUserNameFormSchema>
  ) => {
    try {
      // Set submitting to true
      setIsSubmitting(true);

      // Make a request to change username
      const res = await changeUserName(data);

      // If the request is successful, show success message
      if (res.status === 200) {
        toast.success("User name changed successfully");
      }
    } catch {
      // If the request fails, show error message
      toast.error("Failed to change user name");
    } finally {
      // Set submitting to false
      setIsSubmitting(false);
      // Reset the form
      changeUserNameForm.reset();
    }
  };

  // Submit handler for changing password
  const onSubmitForChangePassword = async (
    data: z.infer<typeof changePasswordFormSchema>
  ) => {
    try {
      // Set submitting to true
      setIsSubmitting(true);

      // Check if new password and confirm password match
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Make a request to change password
      const res = await changePassword(data);

      // If the request is successful, show success message
      if (res.status === 200) {
        toast.success("Password changed successfully");
      }
    } catch {
      // If the request fails, show error message
      toast.error("Failed to change password");
    } finally {
      // Set submitting to false
      setIsSubmitting(false);
      // Reset the form
      changePasswordForm.reset();
    }
  };

  if (loading) return <SettingsPageLoading />;

  return (
    <div className="flex min-h-full flex-col items-center justify-start gap-10 px-6 py-16">
      {/* Change User Name Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex h-14 w-full max-w-4xl cursor-pointer items-center justify-between px-8 text-lg font-medium hover:scale-105 hover:shadow-md active:scale-95"
          >
            Change User Name
            <ArrowRight />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Name</DialogTitle>
            <DialogDescription>
              Update your name here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <Form {...changeUserNameForm}>
            <form
              onSubmit={changeUserNameForm.handleSubmit(
                onSubmitForChangeUserName
              )}
            >
              <div className="grid gap-6 py-4">
                <FormField
                  control={changeUserNameForm.control}
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
                <FormField
                  control={changeUserNameForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="w-28 cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="w-28 cursor-pointer disabled:bg-gray-400 disabled:text-gray-300"
                    disabled={isSubmitting}
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog (Basic) */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="flex h-14 w-full max-w-4xl cursor-pointer items-center justify-between px-8 text-lg font-medium hover:scale-105 hover:shadow-md active:scale-95"
          >
            Change Password
            <ArrowRight />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password. Make sure it’s strong.
            </DialogDescription>
          </DialogHeader>

          <Form {...changePasswordForm}>
            <form
              onSubmit={changePasswordForm.handleSubmit(
                onSubmitForChangePassword
              )}
            >
              <div className="grid gap-6 py-4">
                <FormField
                  control={changePasswordForm.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Old Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={changePasswordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="New Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={changePasswordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="w-28 cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="w-28 cursor-pointer disabled:bg-gray-400 disabled:text-gray-300"
                    disabled={isSubmitting}
                  >
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
