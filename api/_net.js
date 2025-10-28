import { setGlobalDispatcher, Agent } from 'undici';

const dispatcher = new Agent({
  connect: { family: 4 },   // prefer IPv4
  headersTimeout: 30000,
  bodyTimeout: 60000
});

setGlobalDispatcher(dispatcher);

export const NET_READY = true;