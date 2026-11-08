# Auditoria de Google Ads — Alves Cunha Advocacia

> Entregável II (auditoria por área), peça 1 de 6. Base: export completo em `consultoria/dados/google-ads/`.
> Período auditado: **2026-05-12 a 2026-11-08** (180 dias). Conta: `9787248007`.

---

## 1. Panorama executivo

**Em uma frase:** a conta funcionou razoavelmente bem numa única frente (concursos públicos) por 5 meses, acumulou um cemitério de experimentos abandonados ao redor dela, e em novembro de 2026 está essencialmente **parada e pivotada para uma área fora do foco declarado (saúde — negativa de plano)**. Três decisões estruturais precisam ser tomadas antes de qualquer reinvestimento.

### Os números duros dos 180 dias

| Métrica | Valor | Observação |
|---|---|---|
| Impressões | 14.974 | Mercado disponível muito maior (ver parcela de impressões) |
| Cliques | 1.332 | |
| CTR | 8,9% | Bom para o setor jurídico |
| Custo total | **R$ 12.168,64** | Média de R$ 67,60/dia no período |
| CPC médio | R$ 9,14 | Normal para termos jurídicos competitivos |
| "Conversões" reportadas | 343 | **Mas isto é cliques no WhatsApp, não contratos.** Ver seção 2. |
| CPA aparente | R$ 35,48 | Idem — custo por clique no WhatsApp, não por cliente. |
| Parcela de impressão (search) | **24,2%** | Perdendo 75% das buscas elegíveis. |
| Perdido por **orçamento** | 38,3% | Metade da perda é falta de verba. |
| Perdido por **ranking** | 37,5% | A outra metade é anúncio/landing/lance. |

### Linha mensal (CSV completo em `campaigns_monthly.csv`)

| Mês | Concurso (clicks / conv / CPA) | Licitações | Saúde | Custo total |
|---|---|---|---|---|
| Mai/26 | 264 / 74 / R$ 28,76 | 24 / 0 | — | R$ 2.321 |
| Jun/26 | 217 / 53 / R$ 36,63 | 33 / 0 | — | R$ 2.237 |
| Jul/26 | 116 / 28 / R$ 58,95 | 48 / 0 | — | R$ 1.953 |
| Ago/26 | 185 / 54 / R$ 31,48 | 8 / 0 | — | R$ 1.775 |
| Set/26 | 146 / 43 / R$ 32,04 | — | — | R$ 1.378 |
| **Out/26** | **211 / 80 / R$ 20,89** | — | 46 / 3 / R$ 166 | R$ 2.170 |
| Nov/26 (8d) | 17 / 6 / R$ 24,01 | — | 17 / 2 / R$ 94 | R$ 333 |

Outubro foi o melhor mês da série (80 conversões, CPA R$ 20,89) — e foi exatamente o mês em que a atenção começou a migrar para a campanha de Saúde, fora do foco declarado. Em novembro, a campanha de Concurso essencialmente parou (8 dias, R$ 144) e a de Saúde é a única visivelmente ativa (`status = ENABLED`).

**Pergunta para você responder antes do próximo passo**: por que a campanha de Concurso, que gerou 95% dos cliques e das conversões do período, está pausada? Foi decisão de teste, pane financeira, problema de atendimento, pivô estratégico, outra coisa?

---

## 2. H1 confirmada: conversão principal é a errada

Como a hipótese H1 do documento de abertura antecipava, o Google Ads está otimizando pela ação errada. Confirmação com os dados reais da conta:

**O histórico de conversões é um cemitério.** Foram criadas **26 ações de conversão** ao longo do tempo. Destas:

- **20 estão como `REMOVED`** — a maioria marcada ainda como `primary_for_goal = True` quando foram removidas. Isso indica trocas sucessivas de métrica, provavelmente rastreando o mesmo evento por caminhos diferentes (GTM, GA4, tag codeless, tag manual, etc.).
- **2 estão `HIDDEN`** (eventos de GA4 que não deveriam estar aqui — `purchase`, `close_convert_lead`, `qualify_lead`, `session_start`).
- **6 estão `ENABLED`**:
  1. `Clique WhatsApp - Botão Manual Concurso` — WEBPAGE, CONTACT, **primary + incluída na métrica**. **Esta é a conversão principal ativa hoje.**
  2. `Calls from Smart Campaign Ads` — chamada telefônica (Smart Campaign), primary + incluída.
  3. `Local actions - Directions` — pedido de rota pelo Maps (irrelevante para escritório digital).
  4. `Smart campaign map directions` — rota via Smart Campaign (idem).
  5. `Smart campaign map clicks to call` — ligação pelo mapa (não incluída na métrica).
  6. `Smart campaign ad clicks to call` — ligação pelo anúncio (não incluída na métrica).

### Problema 1 — A conversão primária é um clique

`Clique WhatsApp - Botão Manual Concurso` é um evento de **clique** no botão WhatsApp. Não há nenhuma validação a jusante — nenhum sinal de que o lead respondeu, foi qualificado, assinou proposta ou pagou. O Smart Bidding em `MAXIMIZE_CONVERSIONS` está, portanto, **pagando mais por cliques no botão**, não por clientes.

Impacto financeiro estimado (hipótese a validar com dado real do CRM):
- Se a taxa clique-WhatsApp → cliente contratado é 5%: o CAC real é **R$ 709,60** por cliente, não R$ 35,48.
- Se é 3%: CAC real = **R$ 1.182,67**.
- Se é 10%: CAC real = **R$ 354,80**.

Sem o Lote 1 do documento inicial (lista de leads × contratos com `gclid`), não dá para fechar essa conta. Mas qualquer que seja o número, **a métrica que o Smart Bidding otimiza não é a que paga o salário**.

### Problema 2 — Entropia histórica

Criar 26 ações de conversão em alguns meses de operação é muito para uma conta pequena. O padrão indica tentativas repetidas de "resolver o tracking" por tentativa e erro, provavelmente com ajuda de ferramentas diferentes (GTM, Elementor, codeless setup do Google, tag manual). Cada troca de ação primária **reseta o aprendizado do Smart Bidding**, que leva 2-4 semanas para estabilizar. Por conta disso, boa parte do custo do período foi "custo de reaprendizado", não captação.

### Problema 3 — Sem conversão offline, sem gclid consistente

O site atual só grava `gclid` no redirect `/inicio/publicacoes-juridicas/` (commit `a222454`). Para a conta passar a otimizar por **cliente contratado** (conversão offline / enhanced conversions for leads), três coisas precisam existir:
1. `gclid` capturado em toda entrada vinda de Ads e persistido junto do lead (hoje: inexistente de forma sistemática).
2. CRM com campo `gclid` + `conversion_name` + `conversion_time` + `conversion_value`, exportável (Zoho suporta: ainda não sei se está em uso).
3. Upload periódico (manual ou automatizado) para o Google Ads como conversão offline.

Esta é a infraestrutura que **GR-2 (do documento de abertura)** se propõe a montar. Sem ela, qualquer ajuste de lance é tiro no escuro.

---

## 3. Estrutura de campanhas — concentração extrema em uma rua só

### 3.1. Das 13 campanhas, 3 fizeram tráfego, só 1 pagou o período

| Campanha | Status | Estratégia | Budget/dia | Clicks 180d | Conv | CPA | % do custo |
|---|---|---|---|---|---|---|---|
| **Pesquisa \| Concurso \| Nova** | PAUSED | MAX_CONV | R$ 55 | 1.156 | 338 | R$ 31,40 | **87,2%** |
| Licitações e contratos | PAUSED | MAX_CONV | R$ 10 | 113 | **0** | — | 7,1% |
| **Saúde – Negativa de Plano** | **ENABLED** | TARGET_SPEND | R$ 25 | 63 | 5 | R$ 137,58 | 5,7% |
| Advogado Especializado em DA | PAUSED | SMART_CAMPAIGN | R$ 9,5 | 0 | 0 | — | 0% |
| Outras 9 | PAUSED/REMOVED | várias | 0–30 | 0 | 0 | — | 0% |

Três observações críticas:

**(a) Concentração extrema.** 95% das conversões vieram de uma única campanha. Isso é frágil — qualquer problema com essa campanha (suspensão por política, queda de Quality Score, mudança de leilão, pausa como a atual) derruba o escritório.

**(b) R$ 867 gastos com zero conversão em "Licitações e contratos".** A campanha rodou de maio a agosto — 113 cliques, zero contato pelo WhatsApp. Pode ser:
- Palavras de prospecção pública/governo — intenção informacional, não comercial;
- Landing page errada (ver seção 5);
- Público pequeno demais para o critério "Licitações" ser rentável;
- Ou ambos.
Antes de reativar, revisar; alternativa pode ser SEO para esses termos, não Ads.

**(c) A única campanha ativa hoje é fora do foco declarado.** Saúde — negativa de plano é direito do consumidor/saúde, não Direito Administrativo. O site do escritório não se apresenta para essa frente; as peças e o posicionamento são outros. Isso explica em parte o CPA ruim (R$ 137, quase 4× o da campanha de concurso). Se a decisão for genuína de testar nova frente, ela precisa de site/landing próprios, não da home do escritório.

### 3.2. Palavras-chave — intenção boa, volume limitado

Dos 793 critérios de palavras-chave, apenas uma fração teve impressões. Os termos de pesquisa reais (`search_terms.csv`) que trouxeram cliques e custo são, em larga maioria, intenção comercial direta:

| Termo (top 10 por custo) | Clicks | CTR | CPC médio |
|---|---|---|---|
| advogado concurso público | 24 | — | R$ 14,30 |
| advogado especialista em concurso público | 22 | 5,87% | R$ 13,76 |
| advogado de concurso publico | 8 | 7,55% | R$ 13,04 |
| advogado concurso | 6 | 7,89% | R$ 17,39 |
| advogados especialistas em concurso público | 5 | 10,0% | R$ 17,02 |
| advogado mandado de segurança | 12 | 19,67% | R$ 5,97 |
| advogado especialista em concurso público ES | 5 | 26,32% | R$ 13,96 |
| advogado especialista em concurso público RJ | 6 | 16,22% | R$ 10,67 |
| advogado especialista em mandado de segurança | 9 | 21,95% | R$ 6,89 |
| advogado especialista em concurso público DF | 4 | 11,76% | R$ 13,89 |

Nenhum termo claramente "fora de intenção" entre os maiores gastos — o trabalho com negativas (**103 negativas ativas**) parece ter sido feito. Os termos com variação geográfica (ES, RJ, DF, Salvador, SP, Fortaleza, Porto Alegre) mostram que **a demanda por "advogado de concurso por capital" é um filão com CTR acima da média** — potencial para criar grupos de anúncios regionais mais específicos.

**Oportunidade de ganho rápido:** termos como "advogado mandado de segurança" (CPC R$ 5,97, CTR 19,67%) e "advogado especialista em mandado de segurança" (CPC R$ 6,89, CTR 21,95%) são 2× mais baratos que "advogado concurso público" (CPC R$ 14,30) e trazem público ainda mais qualificado. Vale testar um grupo de anúncios dedicado a MS com landing específica.

---

## 4. Segmentação — dispositivo, geografia, horário

### 4.1. Dispositivo

| Dispositivo | Clicks | % | CTR | CPA |
|---|---|---|---|---|
| Mobile | 1.093 | 82,1% | 9,1% | R$ 34,51 |
| Desktop | 234 | 17,6% | 8,0% | R$ 45,22 |
| Tablet | 5 | 0,4% | 9,4% | R$ 16,89 |

Mobile domina. **Desktop converte 31% pior que mobile.** Hipótese: usuários em desktop estão em contexto de pesquisa/informação; em mobile, estão em contexto de ação. Para validar, cruzar com hora do dia (fora do horário comercial costuma ser mobile).

### 4.2. Geografia — operação genuinamente nacional

Clientes de **26 estados + DF**. Top 10 por custo (ver `geo_by_region.csv` completo):

| UF | Clicks | Conv | CPA | Custo |
|---|---|---|---|---|
| DF | 109 | 23 | R$ 50,26 | R$ 1.156 |
| SP | 93 | 26 | R$ 37,23 | R$ 968 |
| RJ | 73 | 21 | R$ 38,98 | R$ 819 |
| SC | 83 | 26 | **R$ 30,79** | R$ 800 |
| MG | 70 | 23 | R$ 30,39 | R$ 699 |
| PR | 61 | 20 | R$ 31,65 | R$ 633 |
| RS | 53 | 15 | R$ 38,64 | R$ 580 |
| BA | 58 | 14 | R$ 41,15 | R$ 576 |
| CE | 55 | 15 | R$ 37,36 | R$ 560 |
| GO | 52 | 15,5 | R$ 35,78 | R$ 555 |

**Observação-chave:** o **DF é o estado mais caro de converter (R$ 50 de CPA)** e, ainda assim, atrai o maior investimento (10% do total). Isso bate com a tese de que o site se apresenta como escritório de Brasília e atrai competição local, mas os melhores negócios (CPA menor) vêm de SC, MG, PR, GO — estados onde a competição em Direito Administrativo é menor. Para a hipótese H5 do documento inicial: a divergência é real, e está custando dinheiro.

### 4.3. Horário

Dados em `segments_hour_day.csv` (168 linhas). Análise detalhada fica para a próxima rodada, quando tivermos o cruzamento com padrão de resposta no WhatsApp (resposta rápida salva conversão — mas se o lead chega 23h e ninguém responde até o dia seguinte, muito provavelmente é perda).

---

## 5. Anúncios e landing pages — ponto fraco estrutural

**Todos os anúncios ativos apontam para a mesma URL**: `https://alvescunhaadvocacia.adv.br/`.

Isso inclui:
- Anúncio "Servidores Públicos" → home;
- Anúncio "Concursos Públicos" → home;
- Anúncio "Licitações" (quando ativo) → home;
- Anúncio "Saúde – Negativa de Plano" → home.

Isso é ruim por três razões:

1. **Quality Score sofre.** Uma das métricas do Quality Score é "relevância da página de destino para a palavra-chave". Levar quem buscou "advogado mandado de segurança concurso" para uma home que apresenta 6 áreas de atuação igualmente recebe um escore de relevância menor — e o escore baixo é parte dos 37,5% de impressões perdidas por rank.
2. **Taxa de conversão de clique → WhatsApp cai.** Quem clicou em "Mandado de segurança concurso" e caiu numa home genérica tem que ler, decidir se é aqui mesmo que atende, achar o botão. Fricção extra.
3. **Mistura o tráfego de fora do foco (Saúde) com o domínio profissional em Administrativo.** Visitantes de tráfego de Saúde viajam na home do escritório de Direito Administrativo — isso é inconsistência de posicionamento.

**O texto dos anúncios é razoavelmente bom.** Um exemplo (campanha Servidores, anúncio `796774631930`):

> Alves Cunha Advocacia | Advogado Servidor Público | Advogado Servidor Aposentado | ... | Atendimento humanizado, profissional e estratégico especializado em Direito Administrativo | Defesa de servidores públicos contra ilegalidades administrativas. Fale agora no WhatsApp.

Tom compatível com a OAB, sem promessa de resultado, sem valores — bem. Pode ser ainda mais específico ("cálculo de proventos", "pensão por morte", "desvio de função"), com grupos de anúncios por tema.

---

## 6. Diagnóstico consolidado — causas vs. sintomas

**Sintoma visível:** CPA aparente de R$ 35, 4-10 contatos/mês informados, baixa previsibilidade, impressão de que Ads "não dá mais" para o escritório.

**Causas estruturais identificadas pelos dados:**

1. A conversão principal mede **clique**, não **cliente**. O Smart Bidding, portanto, otimiza o que não paga o salário. (confirmado — seção 2)
2. **Infraestrutura de rastreamento inconsistente** (26 ações de conversão, gclid só em um redirect, GA4 misturado com codeless, sem conversão offline). Cada troca reseta o aprendizado. (confirmado — seção 2)
3. **Concentração em uma única campanha** que carregou 95% do resultado — e está pausada agora. (confirmado — seção 3)
4. **Landing page única para campanhas distintas**, derrubando Quality Score e taxa de conversão. (confirmado — seção 5)
5. **Posicionamento geográfico ambíguo** (site apresenta Brasília, campanha atinge nacional, DF converte pior que estados periféricos). (confirmado — seção 4.2)
6. **Divergência entre áreas no site e campanha atualmente ativa** (Saúde é a única campanha enabled hoje; não combina com o posicionamento declarado). (confirmado — seção 1 e 3.1)
7. **75% da demanda elegível não é atingida** (parcela de impressão 24%), **metade por orçamento, metade por rank**. Subir orçamento sozinho resolve metade; a outra metade exige melhoria qualitativa. (confirmado — seção 1)

---

## 7. Recomendações em ordem de prioridade

Nenhuma destas é para executar sem sua aprovação. Cada uma vai virar tarefa separada com impacto estimado e passo-a-passo.

### Prioridade crítica (fazer antes de aumentar qualquer orçamento)

**R1 — Decisão de posicionamento.** Em uma frase: o escritório, nos próximos 90 dias, vai fazer **o quê** com Ads? (a) Voltar à campanha de Concurso e expandir para MS/servidor? (b) Testar Saúde como nova vertical com infra própria? (c) Pausar Ads e investir em SEO/conteúdo? O resto depende desta resposta. (Confirmação da H5 do doc inicial.)

**R2 — Reconstrução da arquitetura de conversão.** Limpar o cemitério de 26 ações, padronizar em 3: (i) `Lead qualificado` (upload offline do CRM, primária), (ii) `Cliente contratado` (upload offline do CRM, primária com valor), (iii) `Clique WhatsApp` (secundária, só observação). Pré-requisito: GR-2 (gclid capture + CRM).

**R3 — Captura de gclid + Zoho.** Até a R2 não entrar em produção, cada semana de Ads rodando com conversão errada é desperdício composto. Se Zoho está em produção, implantar; se não está, usar planilha + import manual mensal.

### Prioridade alta (semanas 2-4 após decisão de R1)

**R4 — Landing pages dedicadas por grupo de anúncios.** Pelo menos quatro: concurso, MS/TAF/cotas, servidor público, PAD. Cada uma com proposta específica, autoridade do sócio, prova social compatível com ética da OAB, botão WhatsApp com mensagem pré-preenchida contextualizada. Impacto esperado: Quality Score sobe, CPC cai 10-30%, taxa de clique→WhatsApp sobe.

**R5 — Separar campanha "Mandado de segurança".** Dados mostram CPC 50% menor e CTR 2× maior que "advogado concurso público". Hoje está misturada no mesmo grupo. Vale um grupo de anúncios dedicado com landing de MS.

**R6 — Reavaliar "Saúde – Negativa de Plano".** Se a decisão de R1 confirma a aposta: dar infraestrutura (site próprio ou subdomínio, posicionamento, peças específicas). Se não: pausar imediatamente e reativar Concurso. Hoje está com CPA quase 5× o da campanha que gerava.

### Prioridade média (semanas 5-12)

**R7 — Campanha regional para capitais.** Dados mostram padrão "advogado concurso público [capital]" com CTR alto. Vale criar grupos de anúncios por capital para 5-10 cidades mais rentáveis (SP, RJ, BH, Porto Alegre, Curitiba, Fortaleza, Salvador, DF, Goiânia, Florianópolis). Impacto esperado: captura de parcela de impressão perdida por rank.

**R8 — Teste de Performance Max no inventário já validado.** Depois da R2 em pleno funcionamento (conversões aprimoradas off + offline), vale experimentar PMax com 20-30% do orçamento. Antes disso, não.

**R9 — Expansão de orçamento controlada.** 38% das impressões perdidas por orçamento. Com conversão primária correta (R2), subir o orçamento da campanha de concurso dos atuais R$ 55/dia para R$ 100-150/dia tem potencial de crescer conversões em ~60% mantendo CPA (mas só confirmado após R2 operar 4-8 semanas).

### Prioridade baixa (quando tudo acima estiver estabilizado)

**R10 — Desabilitar as campanhas Smart Campaign.** São pouco auditáveis e misturam métricas (`Local actions`, `Calls from Smart Campaign Ads`) com o tráfego digital nacional. A SMART campanha está pausada hoje — mantenha.

**R11 — Limpeza do inventário.** Remover de vez campanhas em `REMOVED`/stale. Remover das 26 ações de conversão todas as `REMOVED` para desencalhar o painel.

---

## 8. O que esta auditoria NÃO responde (e precisa dos outros lotes)

- **Taxa real de clique→cliente contratado** — depende do Lote 1 (lista de leads × contratos 6m com `gclid`).
- **Rentabilidade por tipo de causa** — depende do Lote 1 (financeiro + receita por tipo de caso) + Lote 2 (tempo gasto por causa).
- **Capacidade operacional** — depende do Lote 2. Aumentar captação sem capacidade é desperdício e risco profissional.
- **ROI real por canal** — orgânico, indicação, LinkedIn, YouTube ficam por fora até você me dizer se eles têm algum volume hoje.
- **Por que a campanha de Concurso foi pausada em novembro** — isso é conversa.

Enquanto os lotes não chegam, R1 (decisão de posicionamento), R2 e R3 já podem ser priorizados: elas são pré-requisitos para qualquer passo seguinte.
