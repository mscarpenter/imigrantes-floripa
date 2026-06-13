# Validação de paradas de ônibus — OSM × GeoPortal oficial

> **Decisão (2026-06-13):** com base nesta validação, o snapshot de produção
> (`public/data/bus-stops.geojson`) foi migrado do OSM para a fonte **oficial do
> GeoPortal** (`scripts/fetch-bus-stops.mjs`). Este relatório registra a
> comparação que justificou a troca. Para refazê-la, restaure um snapshot OSM
> antes de rodar o validador.

> Gerado por `scripts/validate-bus-stops.mjs` em 2026-06-13.
> Fonte oficial: **Prefeitura de Florianópolis — GeoPortal**, camada `pontos_onibus` (CC BY 4.0).
> Snapshot em uso: `public/data/bus-stops.geojson` (OpenStreetMap, ODbL).
> Critério de correspondência: parada considerada "a mesma" quando há outra a até **35 m**.

## Totais

| Fonte | Paradas |
|---|---|
| GeoPortal oficial (`pontos_onibus`) | **2759** |
| Nosso snapshot (OSM) | **2292** |
| Diferença | 467 |

## Qualidade do nosso snapshot (OSM → oficial)

- Paradas do OSM com correspondente oficial (≤ 35 m): **2075** (90.5%)
- Paradas do OSM **sem** correspondente oficial: **217** (9.5%)
- Distância mediana ao oficial mais próximo (correspondências): **6.0 m** · p90: **18.8 m**

## Cobertura (oficial → OSM)

- Paradas oficiais cobertas pelo nosso snapshot (≤ 35 m): **2389** (86.6%)
- Paradas oficiais **ausentes** no nosso snapshot: **370** (13.4%)

### Amostra de paradas oficiais ausentes (15 primeiras)

| Logradouro | Região | Tipo | Coordenadas |
|---|---|---|---|
| RODOVIA JOAO PAULO | Bacia Itacorubi | Placa | -27.55434, -48.50810 |
| RODOVIA JOAO PAULO | Bacia Itacorubi | Placa | -27.55434, -48.50828 |
| AVENIDA PROFESSOR  HENRIQUE DA SILVA FONTES | Bacia Itacorubi | Placa | -27.58772, -48.51915 |
| AVENIDA MADRE BENVENUTA | Bacia Itacorubi | Placa | -27.58781, -48.50495 |
| RUA DEP   ANTONIO EDU VIEIRA | Bacia Itacorubi | Placa | -27.60820, -48.52057 |
| RUA DEP   ANTONIO EDU VIEIRA | Bacia Itacorubi | Placa | -27.60585, -48.51807 |
| RUA DEP   ANTONIO EDU VIEIRA | Bacia Itacorubi | Placa | -27.60941, -48.52245 |
| AVENIDA REITOR LUIZ CARLOS CANCELLIER DE OLIVO | Bacia Itacorubi | Placa | -27.60091, -48.51702 |
| RUA LAURO LINHARES | Bacia Itacorubi | Placa | -27.59714, -48.52058 |
| RUA VERA LINHARES DE ANDRADE | Bacia Itacorubi | Placa | -27.59904, -48.49893 |
| RUA VERA LINHARES DE ANDRADE | Bacia Itacorubi | Placa | -27.59766, -48.49872 |
| AVENIDA ITAMARATI | Bacia Itacorubi | Placa | -27.59085, -48.49813 |
| AVENIDA ITAMARATI | Bacia Itacorubi | Placa | -27.59177, -48.49817 |
| RUA GIBRALTAR | Bacia Itacorubi | Placa | -27.60359, -48.49999 |
| RODOVIA JOAO PAULO | Bacia Itacorubi | Placa | -27.56058, -48.51645 |

## Leitura rápida

- Boa cobertura: o snapshot OSM cobre 86.6% das paradas oficiais.
- O oficial tem 467 paradas a mais e inclui `logradouro`, `regiao` e `tipo_parada` — atributos que o OSM nem sempre traz.
