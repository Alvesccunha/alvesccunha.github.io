# Prompt para abrir uma nova sessão que vai alterar o site

Cole o texto abaixo no primeiro turno de uma nova sessão do Claude Code. O `CLAUDE.md` do repositório carrega automaticamente o resto; este prompt só cuida de anexar o repositório, pedir a leitura do guia e descrever a sua tarefa. Substitua a linha **`### Tarefa desta sessão`** pelo que você quer feito.

---

```
Preciso alterar o site da Alves Cunha Advocacia, que é hospedado como GitHub Pages no repositório `alvesccunha/alvesccunha.github.io`, servindo o domínio `alvescunhaadvocacia.adv.br`.

Antes de qualquer outra coisa:

1. Anexe o repositório `alvesccunha/alvesccunha.github.io` nesta sessão (branch `main`), se ele ainda não estiver, com permissão de escrita.
2. Leia o arquivo `CLAUDE.md` na raiz do repositório. Ele é o guia completo: estrutura do site, padrões de design, paleta, tipografia, rastreamento (Google Ads/GTM), estado atual de `noindex`/`robots.txt`, dados do escritório, regras da OAB para conteúdo e o que não mexer sem ordem minha.
3. Me confirme em uma linha que leu o `CLAUDE.md` e, se tiver dúvida de escopo antes de começar, pergunte.

Lembretes rápidos caso o `CLAUDE.md` tarde a carregar:

- Site estático, HTML puro, sem build, sem framework. 16 páginas + 404.
- Cabeçalho, menu e rodapé são duplicados em cada `index.html` — alteração em elemento comum precisa ir em todas as páginas afetadas. Use `grep -l` para listar antes de editar.
- Paths de assets por nível: home usa `assets/...` e `js/site.js`; páginas internas usam `../assets/...` e `../js/site.js`.
- Trabalhe direto em `main` para ajustes pequenos aprovados por mim, ou em branch nova `claude/<tema>-<slug>` para algo maior. Push direto, sem PR, a menos que eu peça.
- Deploy do GitHub Pages reconstrói em ~1 min após o push.
- Não mexer em `/consultoria/` (trabalho de estratégia interno, não é parte do site).
- Não mexer nos IDs de rastreamento (`AW-17938110769`, `GTM-TV42VGNP`, label de conversão), no `noindex`/`robots.txt`, na paleta, na tipografia ou criar conteúdo jurídico sem o texto aprovado por mim (regras da OAB).

### Tarefa desta sessão

<descreva aqui exatamente o que você quer alterar — qual página, qual trecho, o texto ou imagem novos; se envolve mais de uma página, diga quais; se é um elemento comum como header/rodapé/tracking, diga que é para replicar em todas as páginas afetadas>

Quando terminar: commite com mensagem clara em português, empurre para o remoto e me diga o commit hash e onde verificar a mudança no ar.
```

---

## Dicas de uso

- **Se a nova sessão não tiver acesso ao GitHub do Claude ainda**, o primeiro item do prompt vai falhar e a sessão vai pedir para você autorizar — basta aceitar.
- **Se a tarefa envolver páginas que não existem ainda** (por exemplo, criar `/advogado-plano-de-saude/`), diga isso explicitamente na seção "Tarefa desta sessão", e peça para a sessão usar `advogado-concurso-publico/index.html` como base.
- **Se a tarefa for sobre o SEO** (liberar indexação), diga na seção da tarefa: "quero liberar o SEO — remover noindex de todos os HTMLs e desbloquear o robots.txt". O `CLAUDE.md` já explica como fazer e a sessão vai saber executar.
- **Se for mudança de dado do escritório** (telefone, endereço, e-mail), lembre que esses dados aparecem no JSON-LD da home, no rodapé de todas as páginas, nos `href="tel:"`, `mailto:` e nos links do WhatsApp — a nova sessão precisa trocar em todos os lugares. O `CLAUDE.md` tem a lista.

## Como manter este prompt atualizado

Se a arquitetura do site mudar, o `CLAUDE.md` é quem tem que mudar primeiro — este prompt só o convoca. Troque este arquivo só se:
- O domínio mudar.
- A branch de produção deixar de ser `main`.
- O site deixar de ser estático e passar a ter build.
