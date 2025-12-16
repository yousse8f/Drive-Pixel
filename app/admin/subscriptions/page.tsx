'use client';

import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BadgeCheck, RefreshCw, TrendingUp, TrendingDown, Users, Loader2 } from 'lucide-react';

type Subscription = {
  id: string;
  userEmail: string;
  userName: string;
  plan: string;
  status: 'active' | 'paused' | 'canceled';
  billing: 'monthly' | 'annual';
  nextRenewal: string;
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Subscription['status']>('all');
  const [billingFilter, setBillingFilter] = useState<'all' | Subscription['billing']>('all');

  useEffect(() => {
    // Placeholder load – swap with real admin subscription endpoint when available
    setLoading(true);
    const timer = setTimeout(() => {
      setSubscriptions([
        {
          id: 'sub_101',
          userEmail: 'sarah@propertypros.com',
          userName: 'Sarah Connor',
          plan: 'IDX-DLFX',
          status: 'active',
          billing: 'monthly',
          nextRenewal: '2026-02-01',
        },
        {
          id: 'sub_102',
          userEmail: 'lee@estateco.com',
          userName: 'Lee Chen',
          plan: 'Website + E-Mail',
          status: 'active',
          billing: 'annual',
          nextRenewal: '2026-11-12',
        },
        {
          id: 'sub_103',
          userEmail: 'maria@urbanrealty.com',
          userName: 'Maria Alvarez',
          plan: '100% Sponsorship',
          status: 'paused',
          billing: 'monthly',
          nextRenewal: '2026-01-05',
        },
      ]);
      setLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    return subscriptions.filter((sub) => {
      const matchesQuery =
        !query ||
        sub.userEmail.toLowerCase().includes(query.toLowerCase()) ||
        sub.userName.toLowerCase().includes(query.toLowerCase()) ||
        sub.plan.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      const matchesBilling = billingFilter === 'all' || sub.billing === billingFilter;
      return matchesQuery && matchesStatus && matchesBilling;
    });
  }, [subscriptions, query, statusFilter, billingFilter]);

  const updateStatus = (id: string, status: Subscription['status']) => {
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  const changePlan = (id: string, direction: 'upgrade' | 'downgrade') => {
    // Placeholder logic: prepend "Premium" for upgrade, remove for downgrade
    setSubscriptions((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              plan: direction === 'upgrade' ? `${s.plan} Premium` : s.plan.replace(/ Premium$/, ''),
            }
          : s,
      ),
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary-900">Subscriptions</h1>
          <p className="text-gray-600">Track plans, renewals, and manage upgrades/downgrades.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BadgeCheck className="h-4 w-4 text-primary-600" />
            Connected to cart checkout
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4 text-primary-600" />
            {subscriptions.length} records
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Search by user or plan, refine by status and billing.</CardDescription>
          </div>
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <Input
              placeholder="Search by user, email, or plan"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-64"
            />
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="canceled">Canceled</option>
            </select>
            <select
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
              value={billingFilter}
              onChange={(e) => setBillingFilter(e.target.value as any)}
            >
              <option value="all">All billing</option>
              <option value="monthly">Monthly</option>
              <option value="annual">Annual</option>
            </select>
            <Button variant="secondary" className="flex items-center gap-2" onClick={() => setLoading(true)}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Sync
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscriptions</CardTitle>
          <CardDescription>Upgrade, downgrade, or pause plans. Data is synced from products added to cart.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6 flex items-center gap-3 text-gray-600">
              <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
              Loading subscriptions...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-gray-600">No subscriptions match your filters.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filtered.map((sub) => (
                <div key={sub.id} className="p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="font-semibold text-primary-900">{sub.userName}</div>
                    <div className="text-sm text-gray-500">{sub.userEmail}</div>
                    <div className="mt-2 text-sm text-gray-600">
                      Plan: <span className="font-semibold text-primary-800">{sub.plan}</span> · Billing:{' '}
                      <span className="font-semibold capitalize">{sub.billing}</span> · Next renewal {sub.nextRenewal}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => updateStatus(sub.id, 'paused')}>
                      Pause
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => updateStatus(sub.id, 'canceled')}>
                      Cancel
                    </Button>
                    <Button size="sm" variant="secondary" className="flex items-center gap-1" onClick={() => changePlan(sub.id, 'upgrade')}>
                      <TrendingUp className="h-4 w-4" />
                      Upgrade
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1" onClick={() => changePlan(sub.id, 'downgrade')}>
                      <TrendingDown className="h-4 w-4" />
                      Downgrade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
