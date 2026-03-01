"use client";

import { useState } from "react";
import { AppShell, Content, MotionProvider } from "@appshell/react";
import { framerMotionAdapter } from "@appshell/react/motion-framer";
import { Lock, Mail, ArrowRight, Github, Chrome, Sparkles, Eye, EyeOff } from "lucide-react";

export default function ContentOnlyPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <MotionProvider adapter={framerMotionAdapter}>
      <AppShell>
        <Content>
          <div className="min-h-dvh flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative">
            {/* Background decoration - enhanced */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -right-40 size-96 rounded-full bg-gradient-to-br from-violet-200/30 to-fuchsia-200/30 blur-3xl" />
              <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/30 blur-3xl" />
              <div className="absolute top-1/4 left-1/3 size-64 rounded-full bg-gradient-to-br from-purple-100/20 to-pink-100/20 blur-3xl" />
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23000' stroke-width='1'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3C/g%3E%3C/svg%3E\")" }} />
            </div>

            <div className="relative w-full max-w-sm">
              {/* Logo */}
              <div className="flex items-center gap-2.5 mb-8">
                <div className="flex items-center justify-center size-11 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20">
                  <Sparkles className="size-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  Acme
                </span>
              </div>

              {/* Card - polished */}
              <div className="rounded-2xl border border-gray-200/80 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-xl shadow-gray-200/40">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                    Welcome back
                  </h1>
                  <p className="mt-1.5 text-sm text-gray-500">
                    Sign in to your account to continue
                  </p>
                </div>

                {/* Social Login - improved buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <Github className="size-4" />
                    GitHub
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                  >
                    <Chrome className="size-4" />
                    Google
                  </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-white px-3 text-gray-400">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Form - improved styling */}
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1.5"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs text-violet-600 hover:text-violet-700 font-medium"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-2.5 pl-10 pr-10 text-sm placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white hover:from-violet-700 hover:to-purple-700 transition-all shadow-lg shadow-violet-500/25 active:scale-[0.98]"
                  >
                    Sign in
                    <ArrowRight className="size-4" />
                  </button>
                </form>
              </div>

              {/* Bottom text */}
              <p className="mt-6 text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="font-semibold text-violet-600 hover:text-violet-700"
                >
                  Create one
                </button>
              </p>
            </div>

            {/* Floating variant indicator */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              content-only &middot; no header, no footer
            </div>
          </div>
        </Content>
      </AppShell>
    </MotionProvider>
  );
}
