pnpm add react-icons@4.7.1 dayjs@1.11.7

https://discord.com/developers/applications

Discord redirect callback: http://localhost:3000/api/auth/discord

// EXPORTED FROM API.TS - SRC/UTILS/API.TS === /utils/trpc.ts
SRC/UTILS/API.TS === /utils/trpc.ts
import {trpc} from '../utils/trpc'
// Makes request to TRPC routers
export const trpc = createTRPCNext<AppRouter>({
config() {
return {
transformer: superjson,
links: [
loggerLink({
....
httpBatchLink...getbaseurl
})

//================================================================
