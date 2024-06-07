"use client";
import store from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ReduxProvider>
  );
}
