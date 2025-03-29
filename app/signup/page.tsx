"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FigmaIcon,
  GithubIcon,
  InstagramIcon,
  TwitchIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";

// Esquema de validación actualizado
const formSchema = z.object({
  name: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must contain at least one letter and one number"
    ),
});

const SignUp05Page = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await axios.post('http://192.168.18.180:8000/api/users', data);
      
      console.log('User created:', response.data);
      
      // Opcional: Redirigir después del registro exitoso
      router.push('/login');
    } catch (error: any) {
      console.error('Error creating user:', error);
      setSubmitError(
        error.response?.data?.message || 
        "An error occurred during registration"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2 p-4">
        <div className="max-w-xs m-auto w-full flex flex-col items-center">
          <p className="mt-4 text-xl font-bold tracking-tight">
            Sign up for Shadcn UI Blocks
          </p>

          <div className="mt-8 flex items-center gap-3">
            {/* Botones de redes sociales */}
            {[
              { Icon: GithubIcon, label: "GitHub" },
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: TwitterIcon, label: "Twitter" },
              { Icon: FigmaIcon, label: "Figma" },
              { Icon: TwitchIcon, label: "Twitch" },
            ].map(({ Icon, label }) => (
              <Button
                key={label}
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10"
              >
                <Icon className="!h-[18px] !w-[18px]" />
              </Button>
            ))}
          </div>

          <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2">OR</span>
            <Separator />
          </div>

          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Choose a name"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        {...field}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mostrar error de envío si existe */}
              {submitError && (
                <div className="text-red-500 text-sm text-center">
                  {submitError}
                </div>
              )}

              <Button 
                type="submit" 
                className="mt-4 w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Continue with Email"}
              </Button>
            </form>
          </Form>

          <p className="mt-5 text-sm text-center">
            Already have an account?
            <Link href="/login" className="ml-1 underline text-muted-foreground">
              Log in
            </Link>
          </p>
        </div>
        <div className="bg-muted hidden lg:block rounded-lg" />
      </div>
    </div>
  );
};

export default SignUp05Page;