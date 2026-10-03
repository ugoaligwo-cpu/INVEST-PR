"use client";

import {
  ArrowLeft,
  BadgeCheck,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { useDemo } from "@/components/providers/demo-provider";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

type AuthMode = "login" | "register" | "forgot";

const fieldClass =
  "h-11 w-full rounded-xl border border-line bg-surface-2/60 pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

const trust = [
  { icon: ShieldCheck, label: "Bank-grade security" },
  { icon: BadgeCheck, label: "Verified investors" },
  { icon: LockKeyhole, label: "256-bit encryption" },
];

function Field({
  id,
  label,
  icon: Icon,
  ...rest
}: {
  id: string;
  label: string;
  icon: LucideIcon;
} & Omit<React.ComponentProps<"input">, "id" | "className">) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input id={id} className={fieldClass} {...rest} />
      </div>
    </div>
  );
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const router = useRouter();
  const { login } = useDemo();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      if (mode === "forgot") {
        setLoading(false);
        setStatus(
          "A password reset link has been sent to your email address.",
        );
        return;
      }
      login();
      router.push("/dashboard");
    }, 650);
  };

  const copy: Record<AuthMode, { title: string; subtitle: string }> = {
    login: {
      title: "Sign in to your account",
      subtitle: "Welcome back. Access your portfolio, earnings, and payouts.",
    },
    register: {
      title: "Create your account",
      subtitle: "Get funded in minutes and start earning daily returns.",
    },
    forgot: {
      title: "Reset your password",
      subtitle:
        "Enter the email linked to your account and we'll send you a reset link.",
    },
  };

  const body: Record<AuthMode, ReactNode> = {
    login: (
      <>
        <Field
          id="email"
          label="Email Address"
          icon={Mail}
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Field
          id="password"
          label="Password"
          icon={LockKeyhole}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          minLength={6}
        />
        <PasswordToggle
          checked={showPassword}
          onChange={setShowPassword}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="size-4 accent-primary"
            />
            <span className="text-sm text-muted-foreground">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-sm font-bold text-primary hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
      </>
    ),
    register: (
      <>
        <Field
          id="name"
          label="Full Name"
          icon={User}
          name="name"
          placeholder="Enter your full name"
          autoComplete="name"
          required
        />
        <Field
          id="username"
          label="Username"
          icon={User}
          name="username"
          placeholder="Choose a username"
          autoComplete="username"
          required
        />
        <Field
          id="email"
          label="Email Address"
          icon={Mail}
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <Field
          id="phone"
          label="Phone Number"
          icon={UserPlus}
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          autoComplete="tel"
          required
        />
        <Field
          id="referrer_username"
          label="Referrer Username (Optional)"
          icon={UserPlus}
          name="referrer_username"
          placeholder="Enter referral code"
        />
        <Field
          id="password"
          label="Password"
          icon={LockKeyhole}
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Minimum 6 characters"
          autoComplete="new-password"
          required
          minLength={6}
        />
        <Field
          id="password_confirmation"
          label="Confirm Password"
          icon={LockKeyhole}
          name="password_confirmation"
          type={showPassword ? "text" : "password"}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
          minLength={6}
        />
        <PasswordToggle checked={showPassword} onChange={setShowPassword} />
      </>
    ),
    forgot: (
      <>
        {status ? (
          <p className="rounded-xl border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-success">
            {status}
          </p>
        ) : null}
        <Field
          id="email"
          label="Email Address"
          icon={Mail}
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </>
    ),
  };

  const submitLabel: Record<AuthMode, [string, string]> = {
    login: ["Login", "Logging in..."],
    register: ["Create Account", "Creating account..."],
    forgot: ["Email Reset Link", "Sending..."],
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-shell px-5 py-8">
      {/* Ambient lighting */}
      <div aria-hidden className="hero-glow absolute inset-0 opacity-70" />
      <div aria-hidden className="grid-overlay absolute inset-0 opacity-50" />
      <div
        aria-hidden
        className="bloom -left-40 top-4 size-[30rem] opacity-[0.13]"
        style={{ background: "var(--primary)" }}
      />
      <div
        aria-hidden
        className="bloom -right-48 bottom-0 size-[32rem] opacity-[0.10]"
        style={{ background: "var(--primary)" }}
      />

      {/* Top bar */}
      <header className="relative z-10 flex w-full max-w-6xl items-center justify-between">
        <Logo showWordmark />
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-card px-3.5 text-sm font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Back to site</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Card */}
      <main className="relative z-10 flex w-full flex-1 items-center justify-center py-10">
        <div className="w-full max-w-[480px]">
          <div className="mb-7 flex flex-col items-center text-center">
            <h1 className="text-[clamp(1.6rem,1.2rem+1.6vw,2.15rem)] font-extrabold leading-tight tracking-[-0.035em]">
              {copy[mode].title}
            </h1>
            <p className="mt-2.5 max-w-sm text-sm leading-6 text-muted-foreground">
              {copy[mode].subtitle}
            </p>
          </div>

          <form
            onSubmit={submit}
            className="ui-card flex flex-col gap-5 rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.4)] sm:p-8"
          >
            <div className="flex flex-col gap-5">{body[mode]}</div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary text-[15px] font-bold text-white shadow-[0_12px_32px_rgba(248,129,45,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? submitLabel[mode][1] : submitLabel[mode][0]}
            </button>

            {mode === "forgot" ? (
              <Link
                href="/login"
                className="text-center text-sm font-bold text-muted-foreground transition-colors hover:text-primary"
              >
                Back to sign in
              </Link>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <Link
                  href={mode === "login" ? "/register" : "/login"}
                  className="font-bold text-primary hover:underline"
                >
                  {mode === "login" ? "Sign Up" : "Sign in"}
                </Link>
              </p>
            )}
          </form>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs text-muted-foreground">
            {trust.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-1.5">
                  <Icon size={13} className="text-primary" />
                  <span>{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

function PasswordToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="inline-flex w-fit items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
      aria-pressed={checked}
    >
      {checked ? (
        <EyeOff className="size-3.5" />
      ) : (
        <Eye className="size-3.5" />
      )}
      {checked ? "Hide password" : "Show password"}
    </button>
  );
}
