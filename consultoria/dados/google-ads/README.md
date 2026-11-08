# Export Google Ads — Alves Cunha Advocacia

**Conta:** `9787248007` (Alves Cunha Advocacia — conta direta, não é MCC)
**Período:** 2026-05-12 a 2026-11-08 (180 dias)
**ID de conversão do site:** `AW-17938110769` (referenciado em `js/site.js`)
**Extraído em:** 2026-11-08
**Via:** Composio → Google Ads API v26 (OAuth do titular da conta)

## Arquivos

| Arquivo | Linhas | O que contém |
|---|---|---|
| `campaigns.csv` | 13 | Todas as campanhas da conta no período, com cliques, custo, conversões e parcela de impressões. |
| `campaigns_monthly.csv` | 13 | Série mensal (maio a nov/26) das campanhas que tiveram tráfego. |
| `campaign_budgets.csv` | 10 | Campanhas não removidas, com estratégia de lance, canal (SEARCH/SMART) e orçamento diário. |
| `ads.csv` | 20 | Anúncios do nível ad_group_ad com métricas. |
| `ads_text.csv` | 17 | Textos reais dos RSA (headlines, descriptions, final URLs) dos anúncios não removidos. |
| `keywords.csv` | 793 | Palavras-chave de todas as campanhas, com match type, status e métricas. |
| `search_terms.csv` | 346 | Termos de pesquisa que efetivamente dispararam anúncios, com match type retornado. |
| `negative_keywords.csv` | 103 | Palavras-chave negativas em nível de campanha. |
| `conversion_actions.csv` | 26 | Todas as ações de conversão já configuradas (a maioria REMOVED). Base para refazer a arquitetura. |
| `segments_device.csv` | 3 | Split DESKTOP/MOBILE/TABLET agregado. |
| `segments_hour_day.csv` | 168 | Matriz 24h × 7 dias para análise de horário/dia. |
| `geo_raw.csv` | 300 | Linha por (campanha, região, cidade) com IDs do Google Ads. |
| `geo_by_region.csv` | 26 | Agregado por estado/DF. |
| `geo_by_city.csv` | 221 | Agregado por cidade. |
| `geo_by_campaign_region.csv` | ~75 | Agregado por campanha × estado. |

## Convenções

- Custos em BRL (`cost_brl`) são conversão de `cost_micros / 1_000_000`.
- CTR em percentual (`8.9` = 8,9%).
- CPA (`cost_per_conv_brl`) em branco quando conversions = 0.
- `conversions` aqui é o contador do Google Ads, que **hoje soma 'clique no WhatsApp' como se fosse conversão** — ver relatório `01-auditoria-google-ads.md`.

## Como foi extraído

Todas as queries usaram a API `googleAds:searchStream` v26 via Composio. Os relatórios padronizados (`GOOGLEADS_GET_RMF_REPORT`) foram usados para CAMPAIGN, KEYWORD, SEARCH_TERM e AD_GROUP_AD; GAQL direto foi usado para segmentos (device, hora, geo), conversion_action, negativas e séries temporais. Nomes de regiões e cidades foram resolvidos contra `geo_target_constant` filtrando `country_code = 'BR'`.
