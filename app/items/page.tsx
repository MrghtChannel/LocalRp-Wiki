'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-3xl font-bold">скоро буде</h1>
      <Button asChild>
        <Link href="/">На головну</Link>
      </Button>
    </div>
  );
}
