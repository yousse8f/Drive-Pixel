"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { customerApi } from "@/lib/customer-api";
import { clearUserToken, getUserToken } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

type OrderItem = { name: string; quantity: number; priceEach: number };
type Order = {
  id: string;
  total: number;
  paymentStatus: string;
  status: string;
  subscriptionType: string;
  createdAt: string;
  items: OrderItem[];
};

type Billing = {
  id: string;
  amount: number;
  status: string;
  provider: string;
  reference: string;
  createdAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ email: string; firstName: string; lastName: string } | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [billing, setBilling] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    if (!getUserToken()) {
      setLoading(false);
      router.push("/first-login");
      return;
    }
    const [meRes, ordersRes, billingRes] = await Promise.all([
      customerApi.me(),
      customerApi.orders(),
      customerApi.billing(),
    ]);
    if (!meRes.success) {
      setError(meRes.message || "Failed to load profile");
      setLoading(false);
      return;
    }
    setProfile({
      email: meRes.data!.email,
      firstName: meRes.data!.firstName,
      lastName: meRes.data!.lastName,
    });
    if (ordersRes.success && Array.isArray(ordersRes.data)) setOrders(ordersRes.data);
    if (billingRes.success && Array.isArray(billingRes.data)) setBilling(billingRes.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    clearUserToken();
    router.push("/first-login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Client Dashboard</h1>
              <p className="text-gray-600">View your services, payments, and profile.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={load} disabled={loading}>
                Refresh
              </Button>
              <Button className="bg-primary-900 hover:bg-primary-800 text-white" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>

          {loading && <p className="text-gray-600">Loading...</p>}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">My Services / Orders</h2>
                  </div>
                  {orders.length === 0 ? (
                    <p className="text-gray-600">No orders yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div
                          key={o.id}
                          className="border border-gray-100 rounded-lg p-4 flex flex-col gap-2 bg-gray-50/60"
                        >
                          <div className="flex flex-wrap gap-3 items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-900">
                                Order {o.id.slice(0, 8)} • ${o.total.toFixed(2)}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(o.createdAt).toLocaleString()} • {o.subscriptionType || "one_time"}
                              </p>
                            </div>
                            <div className="flex gap-2 text-sm">
                              <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                {o.paymentStatus}
                              </span>
                              <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800">{o.status}</span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-700">
                            {o.items.length === 0 ? (
                              <span>No items</span>
                            ) : (
                              <ul className="list-disc list-inside space-y-1">
                                {o.items.map((it, idx) => (
                                  <li key={idx}>
                                    {it.name} × {it.quantity} (${it.priceEach.toFixed(2)} each)
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Billing</h2>
                  </div>
                  {billing.length === 0 ? (
                    <p className="text-gray-600">No payments yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {billing.map((b) => (
                        <div key={b.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/60">
                          <div className="flex flex-wrap justify-between gap-2">
                            <div>
                              <p className="font-semibold text-gray-900">
                                ${b.amount.toFixed(2)} • {b.status}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Date(b.createdAt).toLocaleString()} • {b.provider || "payment"}
                              </p>
                            </div>
                            <p className="text-xs text-gray-500">Ref: {b.reference || "-"}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              <div className="space-y-6">
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-semibold mb-2">Profile</h2>
                  {profile ? (
                    <div className="space-y-1 text-gray-800">
                      <p className="font-semibold">{profile.firstName} {profile.lastName}</p>
                      <p className="text-sm text-gray-600">{profile.email}</p>
                      <p className="text-xs text-gray-500 mt-2">Contact support to update profile details.</p>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Loading...</p>
                  )}
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
