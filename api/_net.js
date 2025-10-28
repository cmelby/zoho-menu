// Force IPv4 + reasonable timeouts for all fetch calls (undici)
import { setGlobalDispatcher, Agent } from 'undici';

const dispatcher = new Agent({
  connect: { family: 4 },       // prefer IPv4
  headersTimeout: 30_000,       // ms waiting for response headers
  bodyTimeout: 60_000           // ms waiting for full body
});

setGlobalDispatcher(dispatcher);

// side-effect module; exported const keeps ESM happy if imported directly
export const NET_READY = true;