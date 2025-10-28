// api/_net.js — force IPv4 + set connect timeout for undici fetch
import { setGlobalDispatcher, Agent } from 'undici';

// Force IPv4 and add conservative timeouts (ms)
const dispatcher = new Agent({
  connect: { // prefer IPv4 to avoid intermittent IPv6 routing issues
    family: 4,
    // NOTE: You can also set localAddress if your provider requires it
  },
  headersTimeout: 30_000,   // time waiting for headers
  bodyTimeout: 60_000       // time waiting for the full body
});

setGlobalDispatcher(dispatcher);

// exporting something keeps ESM happy, but all we need is side effect
export const NET_READY = true;