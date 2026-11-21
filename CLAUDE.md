# Site da Alves Cunha Advocacia — guia para o Claude

Este repositório **é o site de produção** `alvescunhaadvocacia.adv.br`. Não é espelho, não é WordPress — é site estático, HTML puro, servido como GitHub Pages direto desta branch `main`. Antes de editar qualquer coisa, leia este arquivo inteiro.

---

## O que é o site

- **Repositório:** `alvesccunha/alvesccunha.github.io`
- **Branch de produção:** `main` → vai para `alvescunhaadvocacia.adv.br`
- **Build:** nenhum. HTML, CSS inline, um JS compartilhado (`js/site.js`). Sem Jekyll (`.nojekyll` presente), sem workflows, sem gerador.
- **16 páginas + 404:** uma pasta por rota, cada uma com `index.html`. Lista em `sitemap.xml`.
- **Home:** `/index.html` (330 linhas). Páginas internas: 170–260 linhas cada.

Áreas de atuação com página dedicada (não quebrar nenhuma destas):
- `/advogado-concurso-publico/`
- `/advogado-servidor-publico/`
- `/licitacoes-e-contratos/`
- `/processo-administrativo-sancionador/`
- `/direito-tributario/`
- `/desapropriacoes/`

Mais `/sobre/`, `/publicacoes-juridicas/`, `/inicio/publicacoes-juridicas/`, 5 artigos de conteúdo e `/politica-de-privacidade-de-dados/`.

---

## Como fazer qualquer alteração

1. Trabalhe em `main` para alterações de conteúdo pequenas e aprovadas pelo cliente, ou em branch nova (`claude/<tema>-<slug>`) para algo maior. Confirme com o usuário se não está claro.
2. **Faça o mesmo em todas as páginas afetadas.** Cabeçalho, menu e rodapé são **duplicados em cada `index.html`** — não existe include/template. Se trocar o telefone no rodapé da home, troca nos 16 arquivos. Use `grep` + `sed` com cuidado, ou faça via Edit em lote.
3. Paths de assets dependem do nível:
   - Home (`/index.html`): `assets/...`, `js/site.js`
   - Páginas em nível 1 (ex.: `/sobre/index.html`): `../assets/...`, `../js/site.js`
4. Antes de commitar, rode `grep -l "robots.*noindex" **/*.html` só para confirmar que você não removeu o `noindex` por acidente — ver seção "Indexação" abaixo.
5. Commit com mensagem clara em português, e **sempre** termine com:
   ```
   Co-Authored-By: Claude <noreply@anthropic.com>
   ```
   (a assinatura exata com o modelo correto está no system reminder da sessão).
6. Push direto, sem PR, a menos que o usuário peça. O deploy do GitHub Pages reconstrói em ~1 min após o push.

---

## Padrões de design (fixos — não mudar sem conversar)

**Paleta** (hex literal, não token — está inline em cada arquivo):
- `#EDE9E3` — fundo da página
- `#F7F5F1` — fundo creme de cards/header/footer de áreas claras
- `#6E2436` — primária (vinho escuro, CTAs, links)
- `#822C41` — hover da primária
- `#12181F` — texto principal / fundo escuro de bloco "Contato"
- `#3D4650` — texto secundário
- `#D8D2C9` — borda

**Tipografia** (via Google Fonts, carregada em cada página):
- Logo: `Carlito` (serifa humanista estreita, 400/700)
- Corpo e títulos: `Schibsted Grotesk` (400–700 variável)
- UI / botões / small caps: `Barlow` (400/500/600)

**CTAs** seguem sempre o padrão:
```html
<a href="https://wa.me/5561996411180?text=..." target="_blank" rel="noopener"
   onclick="acTrack('ORIGEM')"
   style="background:#6E2436; color:#F7F5F1; ..."
   onmouseover="this.style.background='#822C41'"
   onmouseout="this.style.background='#6E2436'">
   ...Falar com o escritório / Encaminhar caso / etc.
</a>
```
Rótulos `ORIGEM` usados hoje: `menu`, `hero_home`, `hero_<area>`, `cta_rodape`, `telefone`, `email`. Use um novo rótulo se criar um CTA novo (não reuse à toa — o rótulo vira dado em Ads).

**Textura de fundo:** `assets/padrao-azulejo.png` usada como `background-image` repetida em coluna de 34px à esquerda, com overlay translúcido branco. Aparece em todas as páginas.

---

## Rastreamento — NÃO MEXER sem combinar

Toda página carrega, neste exato formato, no `<head>`:

```html
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-17938110769');</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-17938110769"></script>
<script>...GTM-TV42VGNP...</script>
<script src="js/site.js"></script>   <!-- ou ../js/site.js nos subníveis -->
```

E logo depois do `<body>`:

```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TV42VGNP" ...></iframe></noscript>
```

- **Google Ads ID:** `AW-17938110769`
- **Label de conversão do WhatsApp:** `qHL2CIr2u58cELGyx-lC` (configurado em `js/site.js`)
- **GTM container:** `GTM-TV42VGNP`
- **Facebook Pixel:** disparado via `fbq('track','Contact')` dentro de `acTrack()` — o pixel em si não é inicializado aqui (herda do GTM).

A função `window.acTrack(origem)` (definida em `js/site.js`) é chamada em TODO link/botão que leva ao WhatsApp, telefone ou e-mail. Ela:
1. Manda evento `clique_whatsapp` ao GA/Ads com `event_category: contato` e `event_label: <origem>`.
2. Dispara conversão `AW-17938110769/qHL2CIr2u58cELGyx-lC`.
3. Empurra `{event:'clique_whatsapp', origem}` ao `dataLayer`.
4. Chama `fbq('track','Contact', {source: origem})` se o pixel estiver carregado.

**Importante:** essa conversão hoje é um **clique no WhatsApp**, não um cliente contratado. Há plano de reestruturar isso (ver `consultoria/01-auditoria-google-ads.md`). Se o usuário te pedir para "arrumar as conversões", pergunte antes de mudar `js/site.js` — a arquitetura certa envolve conversão offline e `gclid`, não só trocar label.

---

## Indexação (`noindex`/`robots.txt`) — estado atual intencionalmente contraditório

Todos os 17 arquivos HTML têm `<meta name="robots" content="noindex, nofollow">` e `robots.txt` tem `Disallow: /`. **Mas** o `sitemap.xml` declara 16 URLs como indexáveis.

Isso é **resíduo** do deploy inicial "ambiente de teste" (commit `edb408f`). Cliente ainda não decidiu se mantém fora da busca orgânica ou libera. Se o usuário pedir para "liberar o SEO":

1. Em `robots.txt`, trocar `Disallow: /` por `Disallow:` (vazio) ou remover a linha.
2. Em cada um dos 17 HTMLs, trocar `<meta name="robots" content="noindex, nofollow">` por `<meta name="robots" content="index, follow">` (ou simplesmente remover a tag — o padrão é `index, follow`).
3. Verificar `sitemap.xml` (já está apontando para URLs reais, só manter).
4. Commit único, mensagem clara.

Não fazer isso de proativamente — só se o usuário pedir.

---

## URLs que NÃO existem (ainda) — campanhas apontam para cá

Google Ads tem referências a estas URLs que não existem no repo:
- `/advogado-plano-de-saude/` — campanha "Saúde – Negativa de Plano" aponta para cá
- `/mandado-seguranca-concurso/` — 2 sitelinks ativos apontam para cá

Se o usuário pedir para **criar** essas páginas, use o template de uma página de área existente como base (`advogado-concurso-publico/index.html` é a mais completa). Confirme o conteúdo com o usuário antes — advocacia tem regras de publicidade (Provimento 205/2021 da OAB) que o texto precisa respeitar: sem promessa de resultado, sem valores de honorários, sem comparação com outros escritórios, sem depoimentos de cliente, sem "especialista" aplicado a quem não tem título acadêmico específico.

---

## Dados do escritório (fixos)

- **Razão:** Alves Cunha Advocacia
- **Sócio:** Carlos Alexandre Alves da Cunha — **OAB/DF 85.763**
- **Endereço:** Setor Comercial Norte, Quadra 4, Bloco B, Sala 702, Brasília-DF, CEP 70714-020
- **Telefone:** `+55 61 99641-1180` (formato internacional: `+5561996411180`)
- **E-mail:** `atendimento@alvescunhaadvocacia.adv.br`
- **Instagram:** `@carlos_cunha_adv`

O JSON-LD `LegalService` com esses dados está **só na home** (`index.html`, linha 29). Se trocar qualquer um desses dados, trocar também lá, no rodapé de todas as páginas, nos `href="tel:..."` e `href="mailto:..."`, e nos links do WhatsApp `wa.me/5561996411180?text=...`.

---

## Diretório `/consultoria/` — não é site, é trabalho de estratégia

A pasta `/consultoria/` tem documentos e dados do engajamento consultivo em curso:
- `00-avaliacao-estrategica-inicial.md`
- `01-auditoria-google-ads.md`
- `dados/google-ads/` — 18 CSVs exportados da API do Google Ads

**Não publicar, não linkar do site.** A pasta não é referenciada em nenhuma página; o `robots.txt` já bloqueia o diretório inteiro junto com o resto. Só mexa se o usuário pedir explicitamente para atualizar algum documento dessa pasta.

---

## O que evitar sem ordem clara do usuário

- Trocar os IDs de rastreamento (`AW-17938110769`, `GTM-TV42VGNP`, label de conversão).
- Remover o `noindex` ou `robots.txt` Disallow.
- Instalar framework (Jekyll, Hugo, Next, Vite, etc.). O site é estático de propósito.
- Alterar paleta ou tipografia.
- Criar conteúdo jurídico novo sem o texto aprovado pelo usuário (regras da OAB).
- Adicionar depoimentos de cliente, preço, promessa de êxito, comparações.
- Mexer em `/consultoria/`.

---

## Como começar sua primeira tarefa

1. Pergunte ao usuário **qual página / o quê**.
2. Leia o(s) `index.html` afetado(s) com Read.
3. Se a alteração é em elemento que se repete (menu, rodapé, logo, tracking), liste as páginas com `grep -l` antes de editar — tem que ser idêntico em todas.
4. Edite, commite, pushe. Deploy automático em ~1 min.
5. Avise ao usuário o que foi feito e onde verificar.
