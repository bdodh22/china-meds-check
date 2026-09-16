import portWalkthroughsData from '@/data/portWalkthroughs.json';
import { PortWalkthrough } from './types';

const portWalkthroughs: PortWalkthrough[] = portWalkthroughsData as PortWalkthrough[];

export function getAllPortWalkthroughs(): PortWalkthrough[] {
  return portWalkthroughs;
}

export function getPortWalkthroughById(id: string): PortWalkthrough | undefined {
  return portWalkthroughs.find((port) => port.id === id);
}

export function getPortWalkthroughByIata(iata: string): PortWalkthrough | undefined {
  return portWalkthroughs.find((port) => port.iataCode.toUpperCase() === iata.toUpperCase());
}
