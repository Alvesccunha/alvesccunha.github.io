# Avaliação estratégica inicial — Alves Cunha Advocacia

> Documento interno do processo de consultoria. Pasta `/consultoria/` não é publicada no site: o repositório já está com `noindex, nofollow` e o site vivo é o WordPress em `alvescunhaadvocacia.adv.br`.

Data: 2026-11-08
Branch: `claude/alves-cunha-expansion-strategy-desudo`
Responsável do engajamento: conselho consultivo (CEO, gestão jurídica, mídia paga, finanças, vendas consultivas, automação/IA, ética e LGPD).

---

## 1. Como esta consultoria vai trabalhar

O briefing determina **não entregar um relatório genérico** baseado só na descrição do escritório. O caminho é inverso: diagnosticar antes de recomendar, quantificar antes de propor despesa, e separar fatos, estimativas, hipóteses e recomendações. Este documento abre o engajamento com quatro partes:

1. O que **já observamos** a partir do que está acessível sem pedir nada (repositório, site, metadados, tags, fontes de tráfego declaradas).
2. Os **dados prioritários** que precisamos para transformar observação em diagnóstico, organizados em três lotes (não um questionário único).
3. **Hipóteses iniciais** — declaradas como hipóteses, não como achados — para orientar a coleta.
4. **Ganhos rápidos candidatos** que podem ser avaliados em paralelo ao diagnóstico, sem esperar o pacote completo.

Os entregáveis finais (diagnóstico executivo, auditorias por área, matriz de prioridades, plano de 90 dias, estratégia de 12 meses, painel de KPIs, experimentos) virão na sequência descrita ao final deste documento.

---

## 2. O que já está confirmado por inspeção direta

Fatos observáveis no repositório `alvesccunha/alvesccunha.github.io` (espelho estático do site para revisão) e em metadados públicos:

- **Posicionamento atual no site:** "Escritório especializado em Direito Administrativo e Tributário em Brasília". O menu de áreas lista seis frentes — Concursos públicos, Servidores públicos, Licitações e contratos, Sancionador e Estado regulador, Direito Tributário e Estado Fiscal, Desapropriações. O briefing descreveu quatro frentes (concursos, servidores, PAD, Administrativo/Público). Há uma **divergência entre foco comercial declarado e vitrine pública** que precisa ser resolvida antes de qualquer decisão de mídia.
- **Rastreamento:** Google Ads `AW-17938110769` + GTM `GTM-TV42VGNP` carregados em todas as páginas. Rastreamento funcional, com `dataLayer` populado.
- **Conversão principal configurada:** uma só — `conversion` com `send_to: AW-17938110769/qHL2CIr2u58cELGyx-lC`, disparada em todo `clique_whatsapp` (ver `js/site.js`). Facebook Pixel `fbq('track','Contact')` dispara no mesmo clique. **Nenhuma conversão offline (contrato fechado) chega ao Google Ads.** Isto é o ponto estrutural mais grave do funil comercial digital.
- **Captura de `gclid`:** existe apenas no redirect `/inicio/publicacoes-juridicas/` (commit `a222454`). Não há evidência de que o `gclid` esteja sendo propagado para o WhatsApp nem gravado contra o lead no momento do primeiro contato. Sem isso, a conversão offline é tecnicamente inviável mesmo quando implantada.
- **Canal de contato único visível na navegação:** botão "Falar com o escritório" → `wa.me/5561996411180`. Telefone `(61) 99641‑1180` repetido no rodapé. Não há formulário web com qualificação, não há agendador. Tudo depende do atendimento humano no WhatsApp.
- **Infraestrutura WordPress identificada no acesso MCP:** plugins/serviços conectados sugerem WordPress com Elementor ou Divi, WPForms ou CF7, Yoast, MonsterInsights (Analytics), UpdraftPlus ou Solid Backups, Royal Elementor, WooCommerce instalado (relevante: há capacidade de cobrar on‑line, mas não há sinal de uso comercial atual), WooCommerce Coupons, Redirection, SolidSecurity e GravityPerks. **Stack robusta e cara em potencial**, cuja utilidade atual ainda não está demonstrada.
- **CRM:** há conexão Zoho CRM disponível. Ainda não sabemos se está em produção, com qual funil, com qual histórico de leads e contratos.
- **E‑mail/agenda:** Microsoft 365 e Google Calendar conectados; Gmail também. **Duplicidade a investigar.**
- **Site de teste vs. produção:** este repositório tem `noindex, nofollow` e canonical para o domínio `.adv.br`. Qualquer medição orgânica real tem que vir do WordPress de produção, não daqui.
- **Normativo publicitário:** o site mantém linguagem informativa, sem promessas de resultado, sem valores, sem comparações — compatível em uma leitura inicial com o Provimento 205/2021 da OAB. Precisamos auditar peças de Ads (títulos, descrições, extensões) e textos de WhatsApp para confirmar.

Nada neste bloco é diagnóstico fechado. É o ponto de partida honesto antes dos lotes de dados.

---

## 3. Dados prioritários — coleta em três lotes

Pedidos de forma enxuta, por lote, para evitar questionário excessivo. Cada lote é condição para o seguinte.

### Lote 1 — Fluxo comercial real dos últimos 6 meses (prazo ideal: esta semana)

Sem isso, qualquer plano é chute.

1. **Google Ads — acesso ou export**
   - Login de leitura no MCC/contendo a conta `AW-17938110769`, ou:
   - Export CSV de: campanhas, grupos de anúncios, palavras‑chave, termos de pesquisa, dispositivos, geografias, horários — últimos 180 dias.
   - Relatório de conversões por tipo e por campanha, mesmo intervalo.
   - Confirmação de quais conversões estão marcadas como "principais" (as que alimentam o Smart Bidding).

2. **Lista de atendimentos/leads últimos 6 meses**
   - Pode ser export do Zoho CRM, do Astrea, do WhatsApp Business, ou mesmo planilha manual.
   - Colunas desejadas, se existirem: data do primeiro contato, canal (Ads, orgânico, indicação, outro), cidade, tema (concurso/servidor/PAD/outro), status final (contratou / não contratou / em negociação), motivo da perda, valor honorários entrada, valor honorários êxito, data de contratação.
   - Se não houver planilha, dizer isso explicitamente — já vira um achado.

3. **Financeiro consolidado últimos 12 meses**
   - Faturamento mensal (recebido, não contratado).
   - Custos fixos mensais (pró‑labore, assessoria, software, aluguel, OAB, contador).
   - Custos variáveis (publicidade, taxas, custas pagas pelo escritório).
   - Carga tributária (anexo do Simples ou regime atual; alíquota efetiva).
   - Volume de contratos ativos hoje e previsão de êxito contratada.

4. **Mapa dos canais declarados**
   - Lista objetiva do que está em uso hoje: Ads, site, WhatsApp, LinkedIn, YouTube, Instagram, indicações, networking em Brasília.
   - Para cada canal, uma estimativa (ainda que grosseira) de quantos contratos vieram nos últimos 6 meses.

### Lote 2 — Operação jurídica e capacidade (após o lote 1)

5. **Quadro atual de pessoas**: sócios, advogados contratados, estagiários, administrativo, terceirizados; horas/semana por função.
6. **Mix do acervo processual**: planilha com todos os processos ativos (export do Astrea é aceitável). As skills `producao-juridica:gestao-de-carteira` e `anthropic-skills:xlsx` conseguem rodar o diagnóstico assim que o arquivo chegar.
7. **Tempo médio** até primeira resposta a um lead; até envio de proposta; até assinatura do contrato — nem que seja estimado em faixas.
8. **Modelos em uso**: proposta comercial, contrato de honorários, procuração, declaração de hipossuficiência — anexar as versões vigentes.

### Lote 3 — Tecnologia e integrações (em paralelo ao lote 2)

9. **Zoho CRM — estado de uso real**: há funil estruturado? etapas? automações? leads chegando automaticamente ou cadastro manual? Tenho acesso leitura via MCP, mas prefiro que você confirme o que está em produção antes de eu alterar qualquer dado.
10. **WhatsApp Business — multidispositivo ou API?** Se API, qual provedor? Há chatbot ou triagem automatizada hoje?
11. **E‑mail — Microsoft 365 ou Gmail?** Duplicidade significa custo evitável. Qual é o endereço de produção (`atendimento@alvescunhaadvocacia.adv.br` aparece no schema do site).
12. **Hospedagem WordPress**: provedor, plano, custo mensal; plugins pagos com renovação ativa (lista).

---

## 4. Hipóteses iniciais — explicitamente hipóteses, não conclusões

Declaradas aqui para serem confirmadas ou refutadas pelos dados dos lotes 1 e 2. Nenhuma delas justifica decisão de gasto antes da confirmação.

**H1 — Vazamento de verba por conversão errada.** A configuração atual envia "clique no WhatsApp" como conversão. O Smart Bidding, se ligado em Maximizar Conversões ou tCPA, está otimizando curiosos, não clientes. Efeito esperado: CAC medido parece bom, lucro real é pior do que os relatórios do Ads mostram. *Confirmação*: comparar leads que viraram cliente com os `gclid` gravados no CRM; se o acompanhamento não existe hoje, a hipótese fica aberta até implantarmos conversões aprimoradas/offline.

**H2 — Dependência excessiva de um canal frágil.** Google Ads como única entrada mensurável, com `R$ 30/dia` recentes (≈ R$ 900/mês). Esse patamar é insuficiente para competir em termos como "advogado concurso público", "mandado de segurança concurso", "advogado servidor público"; e ao mesmo tempo torna o escritório refém de leilões caros e das políticas do Google (publicidade jurídica é mercado sensível, suspensões acontecem). *Confirmação*: ver parcela de impressões ("impression share") por termo nos relatórios do Ads.

**H3 — Site é vitrine, não funil.** CTA única para WhatsApp, sem formulário de qualificação, sem agendador, sem captura de contexto do lead. Toda qualificação acontece no humano — isto limita volume e eleva o custo do seu tempo. *Confirmação*: medir tempo que o sócio gasta por lead triado e comparar com o volume mensal reportado.

**H4 — Ticket pode estar subprecificado para casos de alto esforço.** Honorários iniciais de R$ 3.000–R$ 5.000 cobrem razoavelmente consultas e petições simples, mas podem comprimir margem em mandado de segurança com instrução complexa, PAD com prova pericial, ou representação coletiva. *Confirmação*: cruzar ticket médio por tipo de causa com horas realmente gastas por tipo (Astrea ou timesheet simples por 30 dias resolve).

**H5 — O site diz "Brasília e DF" em elementos estruturais, mas o briefing diz "atuação nacional digital".** Isso pode estar custando CTR em campanhas para fora do DF e, no sentido oposto, pode estar atraindo leads do DF que esperam presença física. *Confirmação*: segmentação geográfica dos Ads + distribuição geográfica dos leads e dos clientes contratados.

**H6 — Estrutura tecnológica cara para o estágio do escritório.** Zoho CRM + Astrea + WordPress com plugins pagos + Microsoft 365 + possivelmente Google Workspace em paralelo + ferramentas de automação. Se o CRM não está operacional, estamos pagando por capacidade que não entrega. *Confirmação*: lista de assinaturas ativas × uso real × preço mensal — cálculo direto do lote 3.

---

## 5. Ganhos rápidos candidatos (não aprovados — propostos para decisão)

Podem ser executados sem esperar o diagnóstico completo, se você validar cada um. Cada item traz impacto esperado e esforço.

**GR‑1 — Trocar a conversão principal do Google Ads.**
Hoje: todo clique no WhatsApp é conversão. Proposto: criar conversão "lead qualificado" (contato humano respondido com intenção real, marcado no CRM) e "cliente contratado" (contrato assinado). Enquanto a conversão offline não está pronta, rebaixar o `clique_whatsapp` para conversão secundária (não alimenta o Smart Bidding) e usar como primária algo mais próximo da assinatura — por ora, um disparo manual via Zoho ao marcar "qualificado".
*Esforço*: baixo‑médio (código no site + configuração no Ads + rotina no CRM). *Impacto esperado*: em 4–8 semanas, redução de desperdício em cliques sem fit, com CPA medido subindo no painel e CAC real caindo. *Risco*: período de aprendizado reaberto do Smart Bidding — normal.

**GR‑2 — Capturar `gclid` e salvar com o lead.**
Propagar `gclid`, `utm_source`, `utm_campaign`, `utm_content`, `utm_term`, dispositivo e página de origem no link do WhatsApp (via parâmetros na mensagem inicial ou via domínio‑espelho) e gravar como campos do lead no Zoho. Pré‑requisito técnico para conversões aprimoradas e offline.
*Esforço*: médio. *Impacto*: habilita H1 e GR‑1 de forma confiável.

**GR‑3 — Padronizar primeira resposta no WhatsApp com qualificação enxuta.**
Três perguntas no primeiro retorno: (a) tipo de caso em uma frase, (b) prazo envolvido (se há decisão administrativa recente, data), (c) cidade/órgão. Objetivo: filtrar antes do sócio e alimentar o CRM com os campos que vão medir conversão.
*Esforço*: baixo. *Impacto*: encurta ciclo e cria dado consistente de funil.

**GR‑4 — Unificar e‑mail de produção.**
Se Microsoft 365 e Gmail estão ambos sendo cobrados, consolidar em um e usar o outro só como forwarder. Economia de R$ 25–70/usuário/mês.
*Esforço*: baixo. *Impacto*: direto no custo fixo.

**GR‑5 — Resolver a divergência de posicionamento.**
Decidir, para os próximos 90 dias, qual é o foco comercial — manter as 6 frentes do site ou concentrar em concursos/servidores/PAD/Administrativo. **Antes** de aumentar mídia. Campanhas em áreas que o escritório não quer realmente atender queimam verba.
*Esforço*: decisão. *Impacto*: condiciona todo o resto do plano.

Nada aqui é para executar automaticamente. Vou propor cada um com justificativa e esperar aprovação.

---

## 6. Sequência proposta de trabalho

1. **Agora**: você confirma o Lote 1 (Google Ads + leads/contratos 6m + financeiro 12m + mapa de canais). Enquanto chega, revisamos juntos os GR‑1, GR‑2 e GR‑5.
2. **Próximas 2 semanas**: eu entrego o **diagnóstico executivo** (entregável I) e a **auditoria de Google Ads e de conversão** (parte do entregável II) com base no Lote 1. Proponho a nova arquitetura de conversões.
3. **Semanas 3–4**: Lotes 2 e 3 chegam; entrego a **auditoria operacional, financeira e tecnológica** (resto do entregável II) e a **matriz de prioridades** (III).
4. **Até o fim do mês seguinte**: **plano de 90 dias** (IV), **estratégia de 12 meses com 3 cenários** (V), **painel de KPIs** (VI) e **backlog de experimentos de crescimento** (VII).

Entre cada marco, fica combinado o ritmo descrito no item 7 do briefing: achados → significado econômico → oportunidades/problemas → recomendações em ordem de prioridade → como implementar e medir.

---

## 7. O que preciso que você me diga agora

Para destravar o Lote 1, três respostas rápidas:

1. **Google Ads**: prefere me dar acesso de leitura ao MCC ou exportar CSVs? (Se acesso MCC, mando o e‑mail para o convite.)
2. **CRM**: o Zoho está em produção com leads reais, ou a base ainda é informal (planilha/WhatsApp)? A resposta muda radicalmente o plano de rastreamento.
3. **Posicionamento comercial honesto**: nos próximos 90 dias, as seis áreas do site são todas prioritárias, ou há 2–3 em que você quer concentrar esforço de captação?

A partir daí, sigo pela coleta e pelo diagnóstico da forma descrita acima.
