import { ReactNode } from "react";
import Link from "next/link";
import { BackgroundBlobs } from "./background-blobs";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <BackgroundBlobs />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-xl font-bold text-ink">
            Life RPG
          </Link>
        </div>
        <div className="glass-panel p-8">
          <h1 className="font-display text-2xl font-bold text-ink text-center">{title}</h1>
          <p className="text-sm text-ink/60 text-center mt-2 mb-8">{subtitle}</p>
          {children}
        </div>
        <div className="text-center mt-6 text-sm text-ink/60">{footer}</div>
      </div>
    </div>
  );
}