import {
  isServer,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    // ✅ Global Error Logger for Queries (Data Fetching)
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error(
          `🚨 [React Query Error] Failed to fetch:`,
          query.queryKey,
        );
        console.error("Actual Error:", error);
      },
    }),
    // ✅ Global Error Logger for Mutations (Form Submissions, Updates)
    mutationCache: new MutationCache({
      onError: (error) => {
        console.error(`🚨 [React Query Mutation Error]:`, error);
      },
    }),
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 5000,
        // ✅ Stop retrying automatically so errors show up immediately
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  // ✅ Fixed: Use isServer from @tanstack/react-query
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
