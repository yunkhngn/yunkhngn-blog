import { Client, Server } from 'styletron-engine-atomic'

const getHydrateClass = () => {
  if (typeof window !== 'undefined') {
    return document.getElementsByClassName('_styletron_hydrate_')
  }
  return []
}

export const styletron =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
        hydrate: getHydrateClass(),
      })