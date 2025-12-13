import { Metadata } from 'next';
import ShopPageClient from './shop-client';

export const metadata: Metadata = {
  title: 'Drive Pixel Shop | Digital Products & Services',
  description:
    'Explore Drive Pixel digital products and services. Add items to your cart, checkout securely, and manage orders with a modern, responsive experience.',
};

export default function ShopPage() {
  return <ShopPageClient />;
}
