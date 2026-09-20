// src/services/api.ts
//
// O catálogo vem de UMA rota HTTP real: GET /api/movies.json (arquivo estático
// servido junto com o app). Por que assim, e não um array importado?
//
//   1. Requisição de verdade → o Playwright consegue interceptar com
//      page.route() (network mocking — Prática 2).
//   2. O Service Worker consegue cachear a rota → o app funciona offline
//      (Prática 5).
//   3. Zero dependência externa: sem token, sem rate-limit, determinístico.

import type { Movie } from '@/types/movie';

const API_URL = '/api/movies.json';

async function fetchCatalog(): Promise<Movie[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`Falha ao carregar catálogo (HTTP ${res.status})`);
  return res.json();
}

export async function getPopularMovies(): Promise<Movie[]> {
  return fetchCatalog();
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const all = await fetchCatalog();
  return all.filter((m) => m.title.toLowerCase().includes(q));
}

export async function getMovieById(id: number): Promise<Movie | undefined> {
  const all = await fetchCatalog();
  return all.find((m) => m.id === id);
}
