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
    const imageValue = obra.image || 'images/placeholder.jpg';
    updated = updated.replace(imgRegex, '$1' + imageValue + '$2');

    // Atualizar título
    const titleRegex = /(<h2 class="obra-detail__title">)[^<]*(<\/h2>)/;
    const titleValue = obra.title || '-';
    updated = updated.replace(titleRegex, '$1' + titleValue + '$2');

    // Atualizar técnica
    const techniqueRegex = /(<p><strong>Técnica:<\/strong>\s*)[^<]*/;
    const techniqueValue = obra.technique || '-';
    updated = updated.replace(techniqueRegex, '$1' + techniqueValue);

    // Atualizar ano
    const yearRegex = /(<p><strong>Ano:<\/strong>\s*)[^<]*/;
    const yearValue = obra.year || '-';
    updated = updated.replace(yearRegex, '$1' + yearValue);

    // Atualizar status
    const statusRegex = /(<p><strong>Status:<\/strong>\s*)[^<]*/;
    const statusValue = obra.status || '-';
    updated = updated.replace(statusRegex, '$1' + statusValue);

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

            console.log(`✅ ${htmlFileName} atualizado com sucesso!`);
            console.log(`   - Título: ${obra.title || '-'}`);
            console.log(`   - Técnica: ${obra.technique || '-'}`);
            console.log(`   - Ano: ${obra.year || '-'}`);
            console.log(`   - Status: ${obra.status || '-'}`);
            console.log(`   - Imagem: ${obra.image || '-'}\n`);

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
