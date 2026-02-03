const fs = require('fs');
const path = require('path');

// Função para ler arquivo JSON
function readJSON(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro ao ler JSON: ${error.message}`);
        process.exit(1);
    }
}

// Função para atualizar o HTML com os dados da obra
function updateHTML(htmlContent, obra) {
    let updated = htmlContent;

    // Atualizar imagem
    const imgRegex = /(<div class="obra-detail__image">[\s\S]*?<img\s+src=")[^"]*(")/;
    updated = updated.replace(imgRegex, '$1' + (obra.image || 'images/placeholder.jpg') + '$2');

    // Atualizar título
    const titleRegex = /(<h2 class="obra-detail__title">)[^<]*(<\/h2>)/;
    updated = updated.replace(titleRegex, '$1' + (obra.title || '-') + '$2');

    // Atualizar técnica
    const techniqueRegex = /(<p><strong>Técnica:<\/strong>\s*)[^<]*(<\/p>)/;
    updated = updated.replace(techniqueRegex, '$1' + (obra.technique || '-') + '$2');

    // Atualizar ano
    const yearRegex = /(<p><strong>Ano:<\/strong>\s*)[^<]*(<\/p>)/;
    updated = updated.replace(yearRegex, '$1' + (obra.year || '-') + '$2');

    // Atualizar status
    const statusRegex = /(<p><strong>Status:<\/strong>\s*)[^<]*(<\/p>)/;
    updated = updated.replace(statusRegex, '$1' + (obra.status || '-') + '$2');

    // Adicionar ou atualizar dimensões (após status)
    if (!updated.includes('<strong>Dimensões:</strong>')) {
        const statusLine = /(<p><strong>Status:<\/strong>[^<]*<\/p>)/;
        updated = updated.replace(statusLine, '$1\n                <p><strong>Dimensões:</strong> ' + (obra.dimensions || '-') + '</p>');
    } else {
        const dimensionsRegex = /(<p><strong>Dimensões:<\/strong>\s*)[^<]*(<\/p>)/;
        updated = updated.replace(dimensionsRegex, '$1' + (obra.dimensions || '-') + '$2');
    }

    // Adicionar ou atualizar preço (após dimensões, se houver preço)
    if (obra.price) {
        if (!updated.includes('<strong>Preço:</strong>')) {
            const dimensionsLine = /(<p><strong>Dimensões:<\/strong>[^<]*<\/p>)/;
            updated = updated.replace(dimensionsLine, '$1\n                <p><strong>Preço:</strong> ' + obra.price + '</p>');
        } else {
            const priceRegex = /(<p><strong>Preço:<\/strong>\s*)[^<]*(<\/p>)/;
            updated = updated.replace(priceRegex, '$1' + obra.price + '$2');
        }
    }

    // Atualizar descrição (descomentar e adicionar conteúdo)
    if (obra.description) {
        // Se está comentado, descomentar
        updated = updated.replace(/<!-- <div class="obra-detail__description">[\s\S]*?<\/div> -->/,
            '<div class="obra-detail__description">\n                <p>' + obra.description + '</p>\n            </div>');

        // Se já existe descomentado, atualizar
        const descRegex = /(<div class="obra-detail__description">[\s\S]*?<p>)[^<]*(<\/p>[\s\S]*?<\/div>)/;
        updated = updated.replace(descRegex, '$1' + obra.description + '$2');
    }

    return updated;
}

// Função principal
function main() {
    console.log('🔄 Iniciando atualização das obras...\n');

    // Ler o JSON de obras
    const jsonPath = path.join(__dirname, 'data', 'obras.json');
    const data = readJSON(jsonPath);

    if (!data.obras || !Array.isArray(data.obras)) {
        console.error('❌ Formato inválido do JSON');
        process.exit(1);
    }

    let successCount = 0;
    let errorCount = 0;

    // Processar cada obra
    data.obras.forEach((obra) => {
        const htmlFileName = `obra-${obra.id}.html`;
        const htmlFilePath = path.join(__dirname, htmlFileName);

        // Verificar se o arquivo HTML existe
        if (!fs.existsSync(htmlFilePath)) {
            console.log(`⚠️  Arquivo não encontrado: ${htmlFileName} (pulando)`);
            errorCount++;
            return;
        }

        try {
            // Ler o arquivo HTML
            const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

            // Atualizar o conteúdo
            const updatedHTML = updateHTML(htmlContent, obra);

            // Salvar o arquivo atualizado
            fs.writeFileSync(htmlFilePath, updatedHTML, 'utf8');

            console.log(`✅ ${htmlFileName} atualizado!`);
            if (obra.description) console.log(`   - Descrição: ${obra.description.substring(0, 40)}...`);
            if (obra.dimensions) console.log(`   - Dimensões: ${obra.dimensions}`);
            if (obra.price) console.log(`   - Preço: ${obra.price}\n`);

            successCount++;
        } catch (error) {
            console.error(`❌ Erro ao processar ${htmlFileName}: ${error.message}\n`);
            errorCount++;
        }
    });

    // Resumo final
    console.log('━'.repeat(50));
    console.log(`\n📊 Resumo:`);
    console.log(`   ✅ Sucesso: ${successCount} arquivo(s)`);
    console.log(`   ❌ Erros: ${errorCount} arquivo(s)`);
    console.log(`\n✨ Processo finalizado!\n`);
}

// Executar o script
main();
