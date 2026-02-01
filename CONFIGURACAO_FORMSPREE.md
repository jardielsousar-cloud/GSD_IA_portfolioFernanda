# Como configurar o Formspree

O formulário de contato está preparado para usar o Formspree. Siga estes passos:

## 1. Criar conta no Formspree (GRATUITO)

1. Acesse: https://formspree.io/
2. Clique em "Get Started" ou "Sign Up"
3. Crie uma conta gratuita (permite 50 envios/mês)

## 2. Criar um novo formulário

1. Após fazer login, clique em "+ New Form"
2. Nome do formulário: "Contato Site Maria Fernanda"
3. Email de destino: **vulgo.egos@gmail.com**
4. Clique em "Create Form"

## 3. Obter o Form ID

Após criar o formulário, você verá um código similar a:

```html
<form action="https://formspree.io/f/mwpklbxy" method="POST">
```

O código **mwpklbxy** é o seu Form ID.

## 4. Atualizar o código do site

Substitua `YOUR_FORM_ID` pelo seu Form ID nos seguintes arquivos:

- index.html
- obras.html
- percursos.html
- processos.html
- obra-1.html
- obra-2.html
- obra-3.html
- obra-template.html

**Exemplo:**
```html
<!-- Antes -->
<form class="form" id="form-contato" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">

<!-- Depois -->
<form class="form" id="form-contato" action="https://formspree.io/f/mwpklbxy" method="POST">
```

## 5. Testar o formulário

1. Faça commit e push das alterações
2. Acesse seu site no GitHub Pages
3. Preencha e envie o formulário de contato
4. Verifique se recebeu o email em vulgo.egos@gmail.com

## Observações

- O plano gratuito permite 50 envios por mês
- Você receberá um email de confirmação no primeiro envio (clique no link para ativar)
- Pode ver todos os envios no painel do Formspree
- Configurações anti-spam estão incluídas automaticamente
