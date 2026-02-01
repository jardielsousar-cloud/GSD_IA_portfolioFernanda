# Portfólio Artístico - Maria Fernanda

Site de portfólio estático e responsivo para arte educadora e artista Maria Fernanda.

## 🎨 Estrutura

```
claude_site/
├── index.html              # Página inicial
├── obras.html              # Galeria de obras
├── exposicoes.html         # Galeria de exposições
├── css/
│   └── style.css          # Estilos principais
├── js/
│   ├── main.js            # Modal de contato e newsletter
│   └── gallery.js         # Sistema de galerias
├── data/
│   ├── obras.json         # Dados das obras
│   └── exposicoes.json    # Dados das exposições
└── images/                # Imagens do site
    ├── hero.jpg           # Imagem principal da home
    ├── contact-image.jpg  # Imagem do formulário
    ├── obras/             # Imagens das obras
    └── exposicoes/        # Imagens das exposições
```

## ✨ Funcionalidades

- **Home**: Hero full screen com nome e menu centralizado
- **Galerias**: Layout irregular simulando parede de galeria
  - Hover: blur + informações sobrepostas
  - Clique: modal ampliado com detalhes completos
- **Formulário de Contato**: Modal com campos nome, email, telefone, mensagem
- **Newsletter Popup**: Captura emails após 5 segundos
- **Responsivo**: Design adaptado para desktop e mobile
- **Gerenciamento JSON**: Fácil adicionar/editar obras e exposições

## 🚀 Como Usar

### 1. Adicionar Imagens

Coloque suas imagens nas pastas:
- `images/hero.jpg` - Imagem principal da home
- `images/contact-image.jpg` - Imagem do modal de contato
- `images/obras/` - Fotos das obras (ex: obra1.jpg, obra1-thumb.jpg)
- `images/exposicoes/` - Fotos das exposições

**Dica**: Crie versões thumbnail (menores) para carregar mais rápido.

### 2. Editar Obras

Abra `data/obras.json` e adicione/edite obras:

```json
{
  "id": 1,
  "title": "Nome da Obra",
  "description": "Descrição completa que aparece no modal",
  "shortDescription": "Descrição curta para hover",
  "image": "images/obras/obra1.jpg",
  "thumbnail": "images/obras/obra1-thumb.jpg",
  "dimensions": "80x100cm",
  "technique": "Óleo sobre tela",
  "year": "2025",
  "status": "Disponível",
  "price": "R$ 5.000"
}
```

**Campos opcionais**: Você pode omitir qualquer campo (price, dimensions, etc).

### 3. Editar Exposições

Abra `data/exposicoes.json` e adicione/edite exposições:

```json
{
  "id": 1,
  "title": "Nome da Exposição",
  "description": "Descrição detalhada",
  "image": "images/exposicoes/expo1.jpg",
  "location": "Galeria X, Cidade",
  "dates": "15 de março a 30 de abril de 2026",
  "status": "Futura"
}
```

### 4. Configurar Formulários

#### Formspree (Recomendado - Grátis)

1. Acesse [formspree.io](https://formspree.io)
2. Crie conta e novo formulário
3. Copie o ID do formulário
4. Em `index.html`, `obras.html` e `exposicoes.html`, substitua:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

#### Newsletter → Google Sheets

1. Crie uma Google Sheet
2. Siga [este tutorial](https://github.com/jamiewilson/form-to-google-sheets) para criar Google Apps Script
3. Copie a URL do script
4. Em `js/main.js`, linha 84, substitua:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'SUA_URL_AQUI';
   ```

### 5. Personalizar Redes Sociais

Em `index.html`, `obras.html` e `exposicoes.html`, atualize os links:

```html
<a href="https://instagram.com/maria.fernanda" ...>
<a href="https://linkedin.com/in/maria-fernanda" ...>
```

### 6. Testar Localmente

Abra `index.html` no navegador ou use um servidor local:

```bash
# Python 3
python -m http.server 8000

# Node.js (com npx)
npx serve

# VS Code: instale extensão "Live Server"
```

Acesse: `http://localhost:8000`

### 7. Publicar no GitHub Pages

1. Crie repositório no GitHub
2. Faça push dos arquivos:
   ```bash
   git add .
   git commit -m "Site inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
   git push -u origin main
   ```
3. Vá em Settings → Pages
4. Em "Source", selecione "main" branch
5. Site estará em: `https://SEU_USUARIO.github.io/SEU_REPO`

### 8. Domínio Próprio (Opcional)

No GitHub Pages, você pode configurar domínio personalizado:
1. Compre domínio (registro.br, GoDaddy, Namecheap)
2. Configure DNS apontando para GitHub
3. Em Settings → Pages, adicione seu domínio

## 🎨 Customização

### Cores

Edite `css/style.css`:
- Cor principal: `#333` (linha 217, 301, etc)
- Cor de fundo: `#fff`
- Cor de hover: `rgba(0, 0, 0, 0.7)`

### Fontes

Atualmente usa:
- **Títulos**: Georgia (serif)
- **Corpo**: Georgia (serif)

Para mudar, adicione no `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
```

E atualize `css/style.css`:
```css
body {
    font-family: 'Playfair Display', serif;
}
```

### Tempo do Newsletter Popup

Em `js/main.js`, linha 62:
```javascript
setTimeout(() => {
    newsletterPopup.classList.add('active');
}, 5000); // 5000 = 5 segundos
```

## 📱 Responsividade

O site se adapta automaticamente a:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

A galeria irregular vira grid simples de 1 coluna no mobile.

## ⚠️ Próximos Passos

- [ ] Adicionar suas imagens reais
- [ ] Preencher `obras.json` com suas obras
- [ ] Preencher `exposicoes.json` com suas exposições
- [ ] Configurar Formspree
- [ ] Configurar Google Sheets para newsletter
- [ ] Atualizar links das redes sociais
- [ ] Testar responsividade em diferentes dispositivos
- [ ] Otimizar imagens (usar WebP/AVIF se possível)
- [ ] Publicar no GitHub Pages

## 📚 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox)
- JavaScript Vanilla (ES6+)
- [GLightbox](https://github.com/biati-digital/glightbox) - Modal de imagens
- [Formspree](https://formspree.io) - Formulário de contato
- Google Sheets API - Newsletter

## 📄 Licença

Projeto pessoal - Maria Fernanda © 2026
