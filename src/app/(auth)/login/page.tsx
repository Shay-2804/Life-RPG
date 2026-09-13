"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, AlertCircle } from "lucide-react";
import { AuthCard } from "@/components/layout/auth-card";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validation/auth";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setServerError(
        error.message === "Invalid login credentials"
          ? "That email or password doesn't match our records."
          : "Something went wrong. Please try again."
      );
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to continue your quest"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-coral-600 font-semibold hover:underline">
            Sign up
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
            autoComplete="current-password"
            {...register("password")}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="w-full px-4 py-2.5 rounded-xl bg-white/70 border border-white/80 focus:outline-none focus:ring-2 focus:ring-coral-400 text-ink placeholder:text-ink/30"
            placeholder="••••••••"
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
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthCard>
  );
}