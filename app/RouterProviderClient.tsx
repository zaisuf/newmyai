"use client"
import React, { useEffect, useState } from 'react'

export default function RouterProviderClient({ children }: { children: React.ReactNode }) {
  const [RouterComp, setRouterComp] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    // Dynamically import react-router-dom on the client to avoid server-side evaluation
    import('react-router-dom').then((mod) => {
      if (mounted) setRouterComp(() => mod.BrowserRouter);
    }).catch(() => {
      // ignore — client routing will be disabled
    });
    return () => { mounted = false };
  }, []);

  if (!RouterComp) return null;
  const Router = RouterComp;
  return <Router>{children}</Router>;
}
