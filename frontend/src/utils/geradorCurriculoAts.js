import { jsPDF } from 'jspdf';
import { API_BASE_URL } from '../services/api';

function limparMarkdown(texto = '') {
  return String(texto).replace(/\*\*/g, '').trim();
}

export function construirDadosCurriculoAts(portfolioData) {
  const { perfil, formacao, experiencias, habilidades, projetoDestaque, outrosProjetos, idiomas, contato } =
    portfolioData;

  const resumoProfissional =
    'Bacharel em Engenharia de Software pela Católica de Santa Catarina — Centro Universitário, com atuação profissional no desenvolvimento de software e experiência prática em desenvolvimento de aplicações corporativas, integração de sistemas, bancos de dados relacionais e engenharia de dados. Experiência com C#, .NET, .NET MAUI Blazor Hybrid, Blazor Server, JavaScript, TypeScript, Angular, Microsoft SQL Server, APIs REST e Swagger, além de automação e ingestão de dados com Python, SQL, Google BigQuery e Metabase. Perfil proativo, colaborativo e focado em arquitetura limpa, qualidade de entregas e soluções eficientes alinhadas às necessidades do negócio.';

  return {
    nomeCompleto: perfil.nomeCompleto,
    tituloProfissional: 'Desenvolvedor de Software | Bacharel em Engenharia de Software',
    localizacao: contato.localizacao || perfil.localizacao,
    telefone: contato.telefoneExibicao,
    email: contato.email,
    linkedinUrl: contato.linkedinUrl,
    githubUrl: contato.githubUrl,
    resumoProfissional,
    experiencias: (experiencias || []).map((exp) => ({
      empresa: exp.empresa,
      cargo: exp.cargo,
      periodo: exp.periodo,
      atribuicoes: (exp.atribuicoes || []).map(limparMarkdown),
      tecnologias: exp.tecnologias || [],
    })),
    formacao: {
      curso: formacao.curso,
      instituicao: formacao.instituicao,
      conclusao: formacao.conclusao,
      localizacao: contato.localizacao || perfil.localizacao,
    },
    habilidades: (habilidades || []).map((cat) => ({
      categoria: cat.categoria,
      itens: (cat.itens || []).map((item) => (typeof item === 'string' ? item : item.nome)),
    })),
    projetoDestaque: {
      titulo: projetoDestaque.titulo || projetoDestaque.nome,
      repositorioUrl: projetoDestaque.repositorioUrl,
      descricao: limparMarkdown(projetoDestaque.descricao || projetoDestaque.resumo),
      funcionalidades: (projetoDestaque.funcionalidades || []).map(limparMarkdown),
      tecnologias: projetoDestaque.tecnologias || projetoDestaque.tecnologiasPrincipais || [],
    },
    outrosProjetos: (outrosProjetos || []).map((proj) => ({
      titulo: proj.titulo,
      empresa: proj.empresa || proj.contexto,
      descricao: limparMarkdown(proj.descricao || proj.resumo),
      tecnologias: proj.tecnologias || [],
    })),
    idiomas: idiomas || [],
  };
}

export function gerarTextoCurriculoAts(portfolioData) {
  const cv = construirDadosCurriculoAts(portfolioData);
  const linhas = [];

  linhas.push(cv.nomeCompleto.toUpperCase());
  linhas.push(cv.tituloProfissional);
  linhas.push(`${cv.localizacao} | Telefone / WhatsApp: ${cv.telefone} | E-mail: ${cv.email}`);
  linhas.push(`LinkedIn: ${cv.linkedinUrl} | GitHub: ${cv.githubUrl}`);
  linhas.push('');

  linhas.push('RESUMO PROFISSIONAL');
  linhas.push(cv.resumoProfissional);
  linhas.push('');

  linhas.push('EXPERIÊNCIA PROFISSIONAL');
  cv.experiencias.forEach((exp) => {
    linhas.push(`${exp.empresa} — ${exp.cargo} (${exp.periodo})`);
    exp.atribuicoes.forEach((attr) => {
      linhas.push(`- ${attr}`);
    });
    linhas.push(`Tecnologias: ${exp.tecnologias.join(', ')}.`);
    linhas.push('');
  });

  linhas.push('FORMAÇÃO ACADÊMICA');
  linhas.push(`${cv.formacao.curso} — ${cv.formacao.instituicao}`);
  linhas.push(`Status: ${cv.formacao.conclusao} | Localização: ${cv.formacao.localizacao}`);
  linhas.push('');

  linhas.push('HABILIDADES TÉCNICAS');
  cv.habilidades.forEach((cat) => {
    linhas.push(`${cat.categoria}: ${cat.itens.join(', ')}.`);
  });
  linhas.push('');

  linhas.push('PROJETOS RELEVANTES');
  linhas.push(`${cv.projetoDestaque.titulo} (Projeto Autoral)`);
  linhas.push(`Repositório GitHub: ${cv.projetoDestaque.repositorioUrl}`);
  linhas.push(cv.projetoDestaque.descricao);
  cv.projetoDestaque.funcionalidades.forEach((func) => {
    linhas.push(`- ${func}.`);
  });
  linhas.push(`Tecnologias: ${cv.projetoDestaque.tecnologias.join(', ')}.`);
  linhas.push('');

  cv.outrosProjetos.forEach((proj) => {
    linhas.push(`${proj.titulo} (${proj.empresa})`);
    linhas.push(proj.descricao);
    linhas.push(`Tecnologias: ${proj.tecnologias.join(', ')}.`);
    linhas.push('');
  });

  linhas.push('IDIOMAS');
  linhas.push(cv.idiomas.map((i) => `${i.idioma}: ${i.nivel}`).join(' | '));

  return linhas.join('\n');
}

export function gerarPdfCurriculoAtsClient(portfolioData) {
  const cv = construirDadosCurriculoAts(portfolioData);
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  doc.setProperties({
    title: `Currículo - ${cv.nomeCompleto}`,
    author: cv.nomeCompleto,
    subject: 'Currículo Profissional Otimizado para ATS - Desenvolvedor de Software',
    keywords:
      'Desenvolvedor de Software, Engenharia de Software, C#, .NET, Blazor, SQL Server, Python, SQL, BigQuery, Angular, TypeScript, JavaScript, APIs REST, RAG',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 40;
  const marginTop = 34;
  const marginBottom = 30;
  const contentWidth = pageWidth - marginX * 2;
  let y = marginTop;

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - marginBottom) {
      doc.addPage();
      y = marginTop;
    }
  };

  const writeParagraph = (text, fontStyle, fontSize, lineHeight, spaceAfter = 0) => {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, marginX, y);
      y += lineHeight;
    });
    y += spaceAfter;
  };

  const writeSectionTitle = (title) => {
    ensureSpace(22);
    y += 3;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(title, marginX, y);
    y += 3;
    doc.setDrawColor(38, 46, 56);
    doc.setLineWidth(0.6);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 10;
  };

  const writeBullet = (text, fontSize, lineHeight) => {
    const indent = 10;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    lines.forEach((line, idx) => {
      ensureSpace(lineHeight);
      if (idx === 0) {
        doc.setFont('helvetica', 'bold');
        doc.text('-', marginX, y);
        doc.setFont('helvetica', 'normal');
      }
      doc.text(line, marginX + indent, y);
      y += lineHeight;
    });
    y += 0.5;
  };

  const writeLabeledLine = (label, value, fontSize, lineHeight, spaceAfter = 0) => {
    const fullText = `${label}${value}`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(fullText, contentWidth);
    lines.forEach((line, idx) => {
      ensureSpace(lineHeight);
      if (idx === 0 && line.startsWith(label)) {
        const rest = line.slice(label.length);
        doc.setFont('helvetica', 'bold');
        doc.text(label, marginX, y);
        const labelWidth = doc.getTextWidth(label);
        doc.setFont('helvetica', 'normal');
        doc.text(rest, marginX + labelWidth, y);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.text(line, marginX, y);
      }
      y += lineHeight;
    });
    y += spaceAfter;
  };

  // 1. Cabeçalho
  writeParagraph(cv.nomeCompleto.toUpperCase(), 'bold', 15.5, 17, 0);
  writeParagraph(cv.tituloProfissional, 'bold', 10.2, 13, 2);
  writeParagraph(
    `${cv.localizacao} | Telefone / WhatsApp: ${cv.telefone} | E-mail: ${cv.email}`,
    'normal',
    9,
    12,
    0
  );
  writeParagraph(`LinkedIn: ${cv.linkedinUrl} | GitHub: ${cv.githubUrl}`, 'normal', 9, 12, 3);
  doc.setDrawColor(190, 198, 208);
  doc.setLineWidth(0.7);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 9;

  // 2. Resumo Profissional
  writeSectionTitle('RESUMO PROFISSIONAL');
  writeParagraph(cv.resumoProfissional, 'normal', 9.2, 12.2, 4);

  // 3. Experiência Profissional
  writeSectionTitle('EXPERIÊNCIA PROFISSIONAL');
  cv.experiencias.forEach((exp, idx) => {
    writeParagraph(`${exp.empresa} — ${exp.cargo} (${exp.periodo})`, 'bold', 9.6, 12.5, 1.5);
    exp.atribuicoes.forEach((attr) => {
      writeBullet(attr, 9.1, 11.8);
    });
    writeLabeledLine(
      'Tecnologias: ',
      `${exp.tecnologias.join(', ')}.`,
      9,
      11.8,
      idx === cv.experiencias.length - 1 ? 4 : 3.5
    );
  });

  // 4. Formação Acadêmica
  writeSectionTitle('FORMAÇÃO ACADÊMICA');
  writeParagraph(`${cv.formacao.curso} — ${cv.formacao.instituicao}`, 'bold', 9.5, 12.2, 1);
  writeParagraph(
    `Status: ${cv.formacao.conclusao} | Localização: ${cv.formacao.localizacao}`,
    'normal',
    9.1,
    11.8,
    4
  );

  // 5. Habilidades Técnicas
  writeSectionTitle('HABILIDADES TÉCNICAS');
  cv.habilidades.forEach((cat, idx) => {
    writeLabeledLine(
      `${cat.categoria}: `,
      `${cat.itens.join(', ')}.`,
      9.1,
      11.8,
      idx === cv.habilidades.length - 1 ? 4 : 1
    );
  });

  // 6. Projetos Relevantes
  writeSectionTitle('PROJETOS RELEVANTES');
  writeParagraph(`${cv.projetoDestaque.titulo} (Projeto Autoral)`, 'bold', 9.5, 12.2, 1);
  writeParagraph(`Repositório GitHub: ${cv.projetoDestaque.repositorioUrl}`, 'normal', 8.8, 11.5, 1.5);
  writeParagraph(cv.projetoDestaque.descricao, 'normal', 9.1, 11.8, 1.5);
  cv.projetoDestaque.funcionalidades.forEach((func) => {
    writeBullet(`${func}.`, 9, 11.6);
  });
  writeLabeledLine('Tecnologias: ', `${cv.projetoDestaque.tecnologias.join(', ')}.`, 9, 11.8, 3.5);

  cv.outrosProjetos.forEach((proj, idx) => {
    writeParagraph(`${proj.titulo} (${proj.empresa})`, 'bold', 9.3, 12, 0.5);
    writeParagraph(proj.descricao, 'normal', 9, 11.6, 0.5);
    writeLabeledLine(
      'Tecnologias: ',
      `${proj.tecnologias.join(', ')}.`,
      8.9,
      11.6,
      idx === cv.outrosProjetos.length - 1 ? 4 : 3
    );
  });

  // 7. Idiomas
  writeSectionTitle('IDIOMAS');
  writeParagraph(
    cv.idiomas.map((i) => `${i.idioma}: ${i.nivel}`).join('  |  '),
    'normal',
    9.1,
    11.8,
    0
  );

  doc.save('Curriculo_Marco_Leone_Merini.pdf');
}

export async function baixarOuGerarCurriculoPdf(portfolioData) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);
    const response = await fetch(`${API_BASE_URL}/api/curriculo/pdf`, {
      method: 'GET',
      headers: { Accept: 'application/pdf' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Curriculo_Marco_Leone_Merini.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return 'backend';
    }
  } catch {
    // Se a API não estiver ativa, gera o PDF diretamente no navegador a partir dos dados do site
  }

  gerarPdfCurriculoAtsClient(portfolioData);
  return 'client';
}
