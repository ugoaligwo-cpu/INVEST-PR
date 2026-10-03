"use client";

import { LogOut, Pencil, ShieldCheck, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useDemo } from "@/components/providers/demo-provider";

const inputClass =
  "mt-2 block h-11 w-full rounded-xl border border-line bg-surface-2/60 px-3.5 text-sm outline-none transition-colors focus:border-primary";

const labelClass =
  "block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground";

export function ProfileView() {
  const router = useRouter();
  const { logout } = useDemo();
  const [saved, setSaved] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  const signOut = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex w-full flex-col gap-7">
      <h1 className="text-2xl font-extrabold tracking-[-0.03em] sm:text-3xl">
        Settings
      </h1>

      {/* Identity card */}
      <section className="ui-card flex flex-col items-center gap-5 rounded-2xl p-8 sm:flex-row sm:items-center">
        <div className="relative">
          <div className="grid size-24 place-items-center rounded-full bg-primary text-3xl font-extrabold text-white">
            AM
          </div>
          <button
            type="button"
            aria-label="Update profile photo"
            className="absolute inset-0 m-auto grid size-[72px] place-items-center rounded-full bg-black/40 text-white opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            <Pencil size={20} />
          </button>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <p className="text-xl font-extrabold tracking-tight">Alex Morgan</p>
          <p className="mt-1 truncate text-sm text-muted-foreground">
            alex@investinnova.com
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <span className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-bold">
            <ShieldCheck size={16} className="text-success" />
            KYC Status: Off
          </span>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </section>

      {/* Profile information */}
      <section className="ui-card rounded-2xl p-6 sm:p-8">
        <form onSubmit={save} className="max-w-2xl">
          <header>
            <h2 className="text-lg font-extrabold tracking-tight">
              Profile Information
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Update your account&apos;s profile information and email address.
            </p>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Name
              <input defaultValue="Alex Morgan" className={inputClass} />
            </label>
            <label className={labelClass}>
              Email
              <input
                type="email"
                defaultValue="alex@investinnova.com"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Phone
              <input
                type="tel"
                defaultValue="+1 231 618 6924"
                placeholder="Enter Phone Number"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              Username
              <input
                defaultValue="alexmorgan"
                disabled
                className={inputClass}
              />
              <span className="mt-1.5 block text-xs font-normal normal-case tracking-normal text-muted-foreground">
                Contact support to change your username.
              </span>
            </label>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
            >
              Save
            </button>
            {saved ? (
              <p role="status" className="text-sm font-bold text-success">
                Saved.
              </p>
            ) : null}
          </div>
        </form>
      </section>

      {/* Password */}
      <section className="ui-card rounded-2xl p-6 sm:p-8">
        <form onSubmit={save} className="max-w-2xl">
          <header>
            <h2 className="text-lg font-extrabold tracking-tight">
              Update Password
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Ensure your account is using a long, random password to stay
              secure.
            </p>
          </header>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className={labelClass}>
              Current Password
              <input type="password" autoComplete="current-password" className={inputClass} />
            </label>
            <span aria-hidden />
            <label className={labelClass}>
              New Password
              <input type="password" autoComplete="new-password" className={inputClass} />
            </label>
            <label className={labelClass}>
              Confirm Password
              <input type="password" autoComplete="new-password" className={inputClass} />
            </label>
          </div>

          <button
            type="submit"
            className="mt-6 inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-strong"
          >
            Save
          </button>
        </form>
      </section>

      {/* Danger zone */}
      <section className="rounded-2xl border border-danger/25 bg-danger/[0.06] p-6 sm:p-8">
        <div className="max-w-2xl">
          <h2 className="text-lg font-extrabold tracking-tight">Delete Account</h2>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download
            any data or information that you wish to retain.
          </p>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-danger px-6 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            <Trash2 size={16} /> Delete Account
          </button>
        </div>
      </section>

      {deleteOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Delete account"
          className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setDeleteOpen(false);
            }}
            className="ui-card w-full max-w-lg rounded-2xl p-6 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-extrabold tracking-tight">
                Are you sure you want to delete your account?
              </h2>
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                aria-label="Close dialog"
                className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <X size={17} />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Once your account is deleted, all of its resources and data will
              be permanently deleted. Please enter your password to confirm.
            </p>

            <label className={labelClass}>
              Password
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className={inputClass}
              />
            </label>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteOpen(false)}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-line px-5 text-sm font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-danger px-5 text-sm font-bold text-white"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
}
