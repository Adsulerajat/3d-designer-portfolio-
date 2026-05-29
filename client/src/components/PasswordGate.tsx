import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

const SESSION_KEY = "voxelvibe_auth";

export function useAuth() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function setAuth() {
  sessionStorage.setItem(SESSION_KEY, "true");
}

interface PasswordGateProps {
  onSuccess: () => void;
}

export default function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setAuth();
        onSuccess();
      } else {
        setError("Incorrect password. Please try again.");
        setPassword("");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="border border-cyan-500/20 bg-[#0a0a1a]/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-cyan-500/5">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/20">
              <Lock className="w-7 h-7 text-cyan-400" />
            </div>
            <h1 className="font-orbitron text-2xl font-bold text-white tracking-wider">
              DESIGNING{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                FUTURE
              </span>
            </h1>
            <p className="text-gray-400 text-sm mt-2 text-center">
              This portfolio is private. Enter the password to access.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                data-testid="input-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono tracking-wider"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
                data-testid="text-error"
              >
                {error}
              </motion.p>
            )}

            <button
              data-testid="button-submit"
              type="submit"
              disabled={loading || !password}
              className="w-full py-3 rounded-lg font-orbitron font-bold tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed
                bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30
                hover:from-cyan-500/30 hover:to-purple-500/30 hover:border-cyan-500/60
                text-cyan-300 shadow-lg shadow-cyan-500/10"
            >
              {loading ? "VERIFYING..." : "ENTER"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
