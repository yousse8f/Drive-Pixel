"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customerApi } from "@/lib/customer-api";

type Step = "validating" | "set-password" | "done" | "error";

function FirstLoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [step, setStep] = useState<Step>("validating");
  const [maskedEmail, setMaskedEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!token) {
        setMessage("Missing token");
        setStep("error");
        return;
      }
      const resp = await customerApi.validateFirstLogin(token);
      if (!mounted) return;
      if (resp.success && resp.data?.email) {
        setMaskedEmail(resp.data.email);
        setStep("set-password");
      } else {
        setMessage(resp.message || "Token invalid or expired");
        setStep("error");
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [token]);

  const handleSubmit = async () => {
    if (!password || password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setMessage(null);
    const resp = await customerApi.completeFirstLogin(token, password);
    if (resp.success) {
      setStep("done");
      setTimeout(() => router.push("/dashboard"), 600);
    } else {
      setMessage(resp.message || "Failed to set password");
    }
  };

  const renderBody = () => {
    if (step === "validating") {
      return <p className="text-gray-600">Validating your secure link...</p>;
    }
    if (step === "error") {
      return (
        <div className="space-y-3">
          <p className="text-red-600">{message || "Link is invalid or expired."}</p>
          <p className="text-gray-600 text-sm">Request a new link from support if needed.</p>
        </div>
      );
    }
    if (step === "done") {
      return <p className="text-green-700">Password set. Redirecting to your dashboard...</p>;
    }
    return (
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Email</p>
          <p className="font-semibold text-gray-900">{maskedEmail}</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">New password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a strong password"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Confirm password</label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Re-enter password"
          />
        </div>
        {message && <p className="text-sm text-red-600">{message}</p>}
        <Button className="w-full bg-primary-900 hover:bg-primary-800 text-white" onClick={handleSubmit}>
          Set password & continue
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container-custom max-w-xl">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
            <h1 className="text-2xl font-bold mb-2">Secure first login</h1>
            <p className="text-gray-600 mb-6">
              Set your password to access your DrivePixel dashboard. This link is one-time and time-limited.
            </p>
            {renderBody()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function FirstLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    }>
      <FirstLoginContent />
    </Suspense>
  );
}
