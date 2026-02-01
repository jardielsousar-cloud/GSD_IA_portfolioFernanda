# Portfólio Artístico - Maria Fernanda

## What This Is

Um site de portfólio artístico estático e responsivo para Maria Fernanda, arte educadora e artista. O site apresenta suas obras e exposições através de galerias interativas, captura leads interessados em exposições futuras via newsletter, e facilita contato direto de compradores, galerias/curadores e interessados em workshops.

## Core Value

Visitantes conseguem ver o trabalho artístico de Maria Fernanda com uma experiência visual imersiva e entrar em contato facilmente - seja para adquirir obras, propor exposições, ou contratar workshops.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Home page** com identidade visual forte: nome, subtítulo, menu centralizado, imagem full screen
- [ ] **Galeria de obras** com layout irregular (parede de galeria), hover mostrando informações, clique abrindo modal ampliado
- [ ] **Galeria de exposições** (passadas e futuras) com interações similares às obras
- [ ] **Formulário de contato** funcional enviando mensagens por email (EmailJS ou Formspree)
- [ ] **Newsletter popup** capturando emails e salvando em Google Sheets automaticamente
- [ ] **Design responsivo** funcionando perfeitamente em desktop e mobile
- [ ] **Rodapé** com links para Instagram e LinkedIn
- [ ] **Gerenciamento via JSON** para adicionar/editar obras e exposições facilmente
- [ ] **Informações detalhadas por obra** (título, descrição customizada, dimensões, técnica, ano, status, preço)
- [ ] **Informações detalhadas por exposição** (nome, local, datas, status passado/futuro, descrição)

### Out of Scope

- **CMS complexo** — JSON simples é suficiente para gerenciar conteúdo
- **Multilíngue** — v1 apenas em PT-BR, internacionalização fica para v2 se necessário
- **E-commerce integrado** — vendas acontecem por contato direto, não precisa carrinho/pagamento
- **Backend próprio** — usar serviços third-party (EmailJS/Formspree, Google Sheets API) mantém projeto estático
- **Blog ou área de notícias** — foco no portfólio visual, conteúdo textual longo não é prioridade
- **Área administrativa** — edição de JSON direto no código é aceitável para v1

## Context

**Múltiplos públicos-alvo:**
- Compradores e colecionadores interessados em adquirir obras
- Galerias e curadores buscando artistas para exposições
- Alunos e interessados em workshops de arte

**Necessidades de conteúdo:**
- Cada obra precisa de descrição personalizada e flexível (não há template único)
- Exposições incluem eventos passados (portfólio de credibilidade) e futuros (geração de interesse)
- Newsletter é estratégica para manter público informado sobre presença em feiras e exposições

**Experiência visual:**
- Layout irregular das galerias simula parede de galeria física real
- Interações suaves (hover blur, modal) criam experiência premium
- Referências visuais: theconsciousink.com (home), adamhalls.co.uk (galerias e contato)

## Constraints

- **Tech stack**: HTML, CSS, JavaScript puro — sem frameworks (requisito do projeto)
- **Hospedagem**: GitHub Pages — site deve ser 100% estático, sem server-side processing
- **Budget**: Serviços gratuitos — EmailJS/Formspree para emails, Google Sheets API para newsletter
- **Performance**: Imagens de alta qualidade (arte) precisam carregar rápido — otimização é crítica
- **Compatibilidade**: Funcionar em browsers modernos (Chrome, Firefox, Safari, Edge) mobile e desktop

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| JSON para gerenciar obras e exposições | Facilita manutenção sem precisar editar HTML/CSS diretamente, mantém separação de conteúdo e apresentação | — Pending |
| Google Sheets para captura de newsletter | Evita serviço de email marketing pago, Maria Fernanda tem controle direto dos contatos | — Pending |
| Galeria com layout irregular | Diferencia o site de galerias em grid comum, simula experiência de galeria física real | — Pending |
| EmailJS/Formspree para formulário | Permite envio de email sem backend próprio, mantém projeto estático para GitHub Pages | — Pending |
| Apenas PT-BR em v1 | Simplifica desenvolvimento inicial, pode adicionar multilíngue depois se necessário | — Pending |

---
*Last updated: 2026-01-31 after initialization*
