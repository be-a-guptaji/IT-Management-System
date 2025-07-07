// @/app/manage-devices/[UserID]/page.tsx

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
import { z } from "zod";
import api from "@/lib/axios/axios.client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

// Sonner
import { toast } from "sonner";

// Hooks
import { useAuth } from "@/hooks/useAuth";

// React
import { useState } from "react";

// Types
import { ManageUserPageProps } from "@/lib/types";

// Define Zod schema for form validation
const formSchema = z.object({
  name: z.object({
    firstName: z.string().min(1),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
  }),
  designation: z.string().min(1),
  para: z.coerce.number(),
  devices: z
    .array(
      z.object({
        deviceName: z.string().min(1, "Device name is required"),
        macAddress: z.string(),
        ipAddress: z.string(),
        serialNumber: z.string(),
      })
    )
    .optional(),
});

export default function Page({ params }: ManageUserPageProps) {
  // Hooks to check auth
  const { loading } = useAuth();

  // Get user ID
  // const { UserID } = await params;

  // State
  const [submitting, setSubmitting] = useState(false);

  // Construct a form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      designation: "",
      para: 0,
      devices: [], // start with no devices
    },
  });

  // Manage dynamic device fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "devices",
  });

  // If loading, show loading message
  if (loading) {
    return <Loading />;
  }

  const handleAddDevice = () => {
    const devices = form.getValues("devices") ?? [];
    const allNamed = devices.every((device) => device.deviceName.trim() !== "");
    if (allNamed) {
      append({
        deviceName: "",
        macAddress: "",
        ipAddress: "",
        serialNumber: "",
      });
    } else {
      toast.error("Please name all devices before adding more.");
    }
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      // Set submitting to true
      setSubmitting(true);

      if (data.para <= 0) {
        toast.error("Para number must be greater than 0");
        return;
      }

      // Make a request to add the user
      const res = await api.post("/user/register-user", data);

      // If the request is successful, show success message
      if (res.status === 200) {
        toast.success("User added successfully");
      }
    } catch {
      // If the request fails, show error message
      toast.error("Failed to add user");
    } finally {
      // Set submitting to false
      setSubmitting(false);
      // Reset the form
      form.reset();
    }
  };

  return (
    <div className="flex min-h-full flex-wrap items-center justify-center gap-12 p-16">
      <div className="flex flex-col items-center justify-center gap-2 rounded-md border border-black/5 bg-white px-12">
        <h2 className="my-8 text-3xl font-bold">Register a New User</h2>

        {/* Form wrapper */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name fields */}
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="name.firstName"
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
                name="name.middleName"
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
                name="name.lastName"
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

            {/* Designation field */}
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

            {/* Para field */}
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

            {/* Devices fields */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Devices</h3>
              {fields.length === 0 && (
                <p className="text-sm text-gray-500">No devices added yet.</p>
              )}
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative flex flex-col gap-4 rounded-md border bg-slate-50 p-4"
                >
                  {/* Device Name */}
                  <FormField
                    control={form.control}
                    name={`devices.${index}.deviceName`}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Device Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Laptop, Router" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Device Info */}
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name={`devices.${index}.macAddress`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>MAC Address</FormLabel>
                          <FormControl>
                            <Input placeholder="00:1A:2B:3C:4D:5E" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`devices.${index}.ipAddress`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>IP Address</FormLabel>
                          <FormControl>
                            <Input placeholder="192.168.0.1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`devices.${index}.serialNumber`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Serial Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Serial Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Remove device button */}
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove Device
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit and Add Device buttons */}
            <div className="mb-8 flex justify-between">
              <Button
                type="button"
                className="w-32 cursor-pointer bg-blue-500 hover:bg-blue-600"
                onClick={handleAddDevice}
              >
                Add Device
              </Button>
              <Button
                type="submit"
                className="w-32 cursor-pointer disabled:bg-gray-400 disabled:text-gray-300"
                disabled={submitting}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
