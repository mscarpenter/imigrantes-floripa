# Backlog — Mapa de contatos (Imigrantes Floripa)

**Status:** adiado — implementar em outro momento, após acesso de colaborador ao repo e definição da lógica de negócio.

**Referência legada:** `mapa_legado(servlink)/js/` (ServLink — contexto diferente; reutilizar **padrões**, não o domínio).

**Destino provável:** `/[lang]/contatos` (lista + mapa) ou rota dedicada.

---

## Features a portar (escopo acordado)

| # | Feature | Legado | Notas para Imigrantes |
|---|---------|--------|------------------------|
| 1 | **Mapa Leaflet Floripa** | `map-config.js`, `mapa.js` | Centro `[-27.5954, -48.5480]`, zoom 12; tiles CARTO; portar com `react-leaflet` (client component, dynamic import) |
| 2 | **Lazy load do mapa** | `mapa.js` → `IntersectionObserver` em `#mapa` | Só inicializa Leaflet quando a seção entra na viewport (+ margem). Reduz custo na página de contatos |
| 3 | **Cache / uso offline** | `mapa.js` registra `sw.js` (arquivo **ausente** na pasta extraída) | Permitir navegar no mapa/dados se a internet cair. **Buscar `sw.js` no repo ServLink**; avaliar PWA ou cache de tiles + JSON de contatos no Imigrantes |
| 4 | **Geolocalização** | `ui.js` → `setupGeolocation` | **Fundamental:** pedir permissão, centralizar no usuário, marcar “você está aqui”, listar pontos próximos (haversine em `map-config.js`) |
| 5 | **Popups nos markers** | `map-config.js` → `buildPopup` | Nome, categoria, endereço, telefone/WhatsApp, link “Como chegar” (Google Maps). Reescrever em React + strings PT/ES nos dictionaries |

---

## Fora do escopo deste backlog

- Admin CRUD ServLink (`admin.js`)
- Signup marketplace (`signup.js`)
- API REST ServLink (`config.js`, rotas `/vagas`, etc.)
- Domínio hospitality (restaurante/bar/hotel) — mapear para `categorySlug` do Imigrantes

---

## Pré-requisitos (antes de implementar)

- [ ] `Contact` com coordenadas (`lat`/`lng` ou `location`) em `src/lib/data/contacts.ts`
- [ ] Decisão de produto: o que cada pin representa (órgãos, ONGs, serviços da trilha?)
- [ ] Strings PT + ES para mapa em `src/i18n/dictionaries/{pt,es}.json`
- [ ] (Offline) recuperar `sw.js` e estratégia de cache do repo legado completo
- [ ] Acesso de colaborador no repo upstream (PRs diretos, se aplicável)

---

## Referência rápida — arquivos legado

| Arquivo | O que extrair |
|---------|----------------|
| `map-config.js` | Centro, tiles, ícones, haversine, URL navegação, estrutura do popup |
| `mapa.js` | Init mapa, markers, cluster, lazy load, wiring filtros |
| `ui.js` | Geolocalização, contador, filtros (tema opcional) |
| `api.js` | Apenas padrão de carregar catálogo estático (substituir por `getAllContacts()`) |

---

## Ordem sugerida (quando retomar)

1. Dados: coords nos contatos + teste de integridade
2. Mapa base Floripa + markers + popups bilíngues
3. Geolocalização (“perto de mim”)
4. Lazy load na página
5. Cache/offline (service worker ou alternativa Next)
