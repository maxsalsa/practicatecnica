import catalog from './metrology-catalog.json';
import type { Deck } from './questions';
export const metrologySheets = catalog.sheets;
export const metrologySources = catalog.sources;
export const metrologyDecks: Deck[] = metrologySheets.map(s => ({id:`metro-${s.id}`,title:s.title,level:'Metrología',emoji:'📏',questions:[]}));