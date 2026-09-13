"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { AuthCard } from "@/components/layout/auth-card";
import { createClient } from "@/lib/supabase/client";
import { signupSchema, type SignupInput } from "@/lib/validation/auth";

export default function SignupPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({ resolver: zodResolver(signupSchema) });

  async function onSubmit(data: SignupInput) {
    setServerError(null);
    setIsSubmitting(true);
    const supabase = createClient();

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { username: data.username },
      },
    });

    if (error) {
      setServerError(
        error.message.includes("already registered")
          ? "An account with this email already exists."
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
      return;
    }

    // If email confirmation is required, there'll be no session yet
    if (signUpData.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      router.push("/login");
    }
  }

  return (
    <AuthCard
      title="Create your character"
      subtitle="Start turning tasks into progress"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-coral-600 font-semibold hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2 p-3 rounded-xl bg-coral-50 border border-coral-200 text-coral-600 text-sm"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <div>
          <label htmlFor="username" className="block text-sm font-medium text-ink mb-1.5">
            Username
          </label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            {...register("username")}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink placeholder:text-ink/30"
            placeholder="adventurer_01"
          />
          {errors.username && (
            <p id="username-error" className="text-coral-600 text-xs mt-1.5">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink placeholder:text-ink/30"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" className="text-coral-600 text-xs mt-1.5">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-ink mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink placeholder:text-ink/30"
            placeholder="At least 8 characters"
          />
          {errors.password && (
            <p id="password-error" className="text-coral-600 text-xs mt-1.5">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-coral-500 text-white font-semibold hover:bg-coral-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          {isSubmitting ? "Creating character..." : "Create character"}
        </button>
      </form>
    </AuthCard>
  );
}