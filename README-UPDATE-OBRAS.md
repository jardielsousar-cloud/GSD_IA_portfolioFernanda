# Script de Atualização Automática de Obras

Este script automatiza a atualização dos arquivos HTML individuais das obras a partir do arquivo JSON.

## 📋 O que o script faz?

O script `update-obras.js` lê o arquivo `data/obras.json` e atualiza automaticamente:

**Arquivos HTML individuais** (`obra-1.html`, `obra-2.html`, etc.):
- Título, Técnica, Ano, Status
- Dimensões, Preço (se houver)
- Descrição completa
- Imagem principal

**Galeria principal** (`obras.html`) via `gallery.js`:
- Thumbnail (ou imagem se não houver thumbnail)
- ShortDescription (para hover)

## 🚀 Como usar

### 1. Edite o JSON

Primeiro, atualize o arquivo `data/obras.json` com as informações das suas obras:

```json
{
  "obras": [
    {
      "id": 1,
      "title": "Nome da Obra",
      "description": "Descrição completa (aparece na sub-página)",
      "shortDescription": "Descrição curta (hover na galeria)",
      "image": "images/obras/obra1.jpg",
      "thumbnail": "images/obras/obra1-thumb.jpg",
      "dimensions": "80x100cm",
      "technique": "Óleo sobre tela",
      "year": "2025",
      "status": "Disponível",
      "price": "R$ 5.000"
    }
  ]
}
```

### 2. Execute o script

Abra o terminal na pasta do projeto e execute:

```bash
node update-obras.js
```

### 3. Pronto!

Os arquivos HTML serão atualizados automaticamente. Você verá um relatório no terminal mostrando quais arquivos foram atualizados com sucesso.

## 📝 Exemplo de saída

```
🔄 Iniciando atualização das obras...

✅ obra-1.html atualizado com sucesso!
   - Título: Entre andares
   - Técnica: Acrílica sobre tela
   - Ano: 2022
   - Status: Indisponível
   - Imagem: images/obras/obra1.jpg

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Resumo:
   ✅ Sucesso: 3 arquivo(s)
   ❌ Erros: 0 arquivo(s)

✨ Processo finalizado!
```

## ⚙️ Como funciona

1. O script lê o arquivo `data/obras.json`
2. Para cada obra no JSON, ele:
   - Procura o arquivo HTML correspondente (`obra-{id}.html`)
   - Atualiza apenas os campos especificados usando expressões regulares
   - Mantém todo o resto do HTML intacto (estrutura, estilos, scripts, etc.)
   - Salva o arquivo atualizado
3. Exibe um relatório de sucesso/erro

## ⚠️ Importante

- **Não exclua campos vazios do JSON** - o script substitui por "-" automaticamente
- O script mantém toda a estrutura HTML intacta, alterando apenas os valores dos campos
- Se um arquivo HTML não existir, o script pula para o próximo e exibe um aviso
- A numeração dos arquivos HTML deve corresponder ao `id` no JSON

## 🎯 Benefícios

- ✅ Atualização centralizada no JSON
- ✅ Não precisa editar cada HTML manualmente
- ✅ Reduz erros humanos
- ✅ Economiza tempo
- ✅ Mantém consistência entre JSON e HTML

## 🔄 Workflow recomendado

1. **Adicione/edite obras** no `data/obras.json`
2. **Execute** `node update-obras.js`
3. **Commit** as mudanças no git
4. **Deploy** do site atualizado

Agora você só precisa manter o JSON atualizado e executar o script! 🎨
