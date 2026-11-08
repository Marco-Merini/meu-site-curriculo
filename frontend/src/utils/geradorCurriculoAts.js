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

  // Paleta executiva em azul-marinho e ardósia
  const COLOR_NAVY_DARK = [15, 36, 64];      // #0F2440
  const COLOR_NAVY_PRIMARY = [23, 54, 97];   // #173661
  const COLOR_NAVY_ACCENT = [33, 74, 133];   // #214A85
  const COLOR_TEXT_BODY = [30, 41, 59];      // #1E293B
  const COLOR_TEXT_MUTED = [71, 85, 105];    // #475569
  const COLOR_LINE_SUBTLE = [203, 213, 225]; // #CBD5E1
  const COLOR_BG_CALLOUT = [246, 249, 253];  // #F6F9FD
  const COLOR_BG_BADGE = [235, 242, 252];    // #EBF2FC

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 38;
  const marginTop = 34;
  const marginBottom = 24;
  const contentWidth = pageWidth - marginX * 2;

  const drawTopBar = () => {
    doc.setFillColor(...COLOR_NAVY_PRIMARY);
    doc.rect(0, 0, pageWidth, 5, 'F');
  };

  drawTopBar();
  let y = marginTop;

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - marginBottom) {
      doc.addPage();
      drawTopBar();
      y = marginTop;
    }
  };

  const writeColoredParagraph = (text, fontStyle, fontSize, lineHeight, spaceAfter = 0, color = COLOR_TEXT_BODY) => {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, contentWidth);
    lines.forEach((line) => {
      ensureSpace(lineHeight);
      doc.text(line, marginX, y);
      y += lineHeight;
    });
    y += spaceAfter;
  };

  const writeSectionTitle = (title) => {
    ensureSpace(24);
    y += 2.5;
    doc.setFillColor(...COLOR_NAVY_PRIMARY);
    doc.rect(marginX, y - 8, 3, 9, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(...COLOR_NAVY_PRIMARY);
    doc.text(title, marginX + 7, y);
    y += 3.5;

    doc.setDrawColor(...COLOR_LINE_SUBTLE);
    doc.setLineWidth(0.6);
    doc.line(marginX, y, pageWidth - marginX, y);

    doc.setDrawColor(...COLOR_NAVY_PRIMARY);
    doc.setLineWidth(1.3);
    doc.line(marginX, y, marginX + 54, y);
    y += 12;
  };

  const writeBullet = (text, fontSize, lineHeight, leftOffset = 0) => {
    const indent = 9;
    const baseX = marginX + leftOffset;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, contentWidth - leftOffset - indent);
    lines.forEach((line, idx) => {
      ensureSpace(lineHeight);
      if (idx === 0) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_NAVY_PRIMARY);
        doc.text('-', baseX, y);
      }
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLOR_TEXT_BODY);
      doc.text(line, baseX + indent, y);
      y += lineHeight;
    });
    y += 0.5;
  };

  const writeLabeledLine = (label, value, fontSize, lineHeight, spaceAfter = 0, leftOffset = 0) => {
    const baseX = marginX + leftOffset;
    const fullText = `${label}${value}`;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(fullText, contentWidth - leftOffset);
    lines.forEach((line, idx) => {
      ensureSpace(lineHeight);
      if (idx === 0 && line.startsWith(label)) {
        const rest = line.slice(label.length);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...COLOR_NAVY_PRIMARY);
        doc.text(label, baseX, y);
        const labelWidth = doc.getTextWidth(label);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_TEXT_BODY);
        doc.text(rest, baseX + labelWidth, y);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...COLOR_TEXT_BODY);
        doc.text(line, baseX, y);
      }
      y += lineHeight;
    });
    y += spaceAfter;
  };

  // 1. Cabeçalho Executivo
  writeColoredParagraph(cv.nomeCompleto.toUpperCase(), 'bold', 19, 20, 1.5, COLOR_NAVY_DARK);
  writeColoredParagraph(cv.tituloProfissional, 'bold', 11.2, 14.5, 3, COLOR_NAVY_ACCENT);
  writeColoredParagraph(
    `${cv.localizacao} | Telefone / WhatsApp: ${cv.telefone} | E-mail: ${cv.email}`,
    'normal',
    8.9,
    12,
    0.5,
    COLOR_TEXT_MUTED
  );
  writeColoredParagraph(
    `LinkedIn: ${cv.linkedinUrl} | GitHub: ${cv.githubUrl}`,
    'normal',
    8.9,
    12,
    0,
    COLOR_TEXT_MUTED
  );

  const lineY = y - 5.5;
  doc.setDrawColor(...COLOR_NAVY_PRIMARY);
  doc.setLineWidth(1.2);
  doc.line(marginX, lineY, pageWidth - marginX, lineY);
  doc.setDrawColor(...COLOR_LINE_SUBTLE);
  doc.setLineWidth(0.5);
  doc.line(marginX, lineY + 2, pageWidth - marginX, lineY + 2);
  y = lineY + 12;

  // 2. Resumo Profissional
  writeSectionTitle('RESUMO PROFISSIONAL');
  writeColoredParagraph(cv.resumoProfissional, 'normal', 9.05, 12.2, 4, COLOR_TEXT_BODY);

  // 3. Experiência Profissional
  writeSectionTitle('EXPERIÊNCIA PROFISSIONAL');
  cv.experiencias.forEach((exp, idx) => {
    const leftOffset = 7;
    const baseX = marginX + leftOffset;
    const blockStartY = y;

    ensureSpace(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.7);
    const wEmpresa = doc.getTextWidth(exp.empresa);
    doc.setFont('helvetica', 'normal');
    const sep = ' — ';
    const wSep = doc.getTextWidth(sep);
    doc.setFont('helvetica', 'bold');
    const wCargo = doc.getTextWidth(exp.cargo);

    const periodoText = `(${exp.periodo})`;
    doc.setFontSize(8.9);
    const wPeriodo = doc.getTextWidth(periodoText);
    const periodX = baseX + wEmpresa + wSep + wCargo + 6;

    doc.setFillColor(...COLOR_BG_BADGE);
    doc.rect(periodX - 3.5, y - 8.8, wPeriodo + 7, 11.2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.7);
    doc.setTextColor(...COLOR_NAVY_DARK);
    doc.text(exp.empresa, baseX, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLOR_TEXT_MUTED);
    doc.text(sep, baseX + wEmpresa, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLOR_NAVY_ACCENT);
    doc.text(exp.cargo, baseX + wEmpresa + wSep, y);

    doc.setFontSize(8.9);
    doc.setTextColor(...COLOR_NAVY_PRIMARY);
    doc.text(periodoText, periodX, y);

    y += 13;

    exp.atribuicoes.forEach((attr) => {
      writeBullet(attr, 9.0, 11.7, leftOffset);
    });

    writeLabeledLine('Tecnologias: ', `${exp.tecnologias.join(', ')}.`, 8.9, 11.7, 0, leftOffset);

    const blockTopY = blockStartY - 8;
    const blockBottomY = y - 9;
    doc.setFillColor(...COLOR_LINE_SUBTLE);
    doc.rect(marginX, blockTopY, 1.8, blockBottomY - blockTopY, 'F');
    doc.setFillColor(...COLOR_NAVY_PRIMARY);
    doc.rect(marginX, blockTopY, 1.8, 10, 'F');

    y += idx === cv.experiencias.length - 1 ? 4 : 5.5;
  });

  // 4. Formação Acadêmica
  writeSectionTitle('FORMAÇÃO ACADÊMICA');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_NAVY_DARK);
  const wCurso = doc.getTextWidth(cv.formacao.curso);
  doc.text(cv.formacao.curso, marginX, y);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLOR_TEXT_MUTED);
  const sepForm = ' — ';
  const wSepForm = doc.getTextWidth(sepForm);
  doc.text(sepForm, marginX + wCurso, y);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLOR_NAVY_ACCENT);
  doc.text(cv.formacao.instituicao, marginX + wCurso + wSepForm, y);
  y += 13.5;

  writeColoredParagraph(
    `Status: ${cv.formacao.conclusao} | Localização: ${cv.formacao.localizacao}`,
    'normal',
    8.95,
    11.8,
    4,
    COLOR_TEXT_MUTED
  );

  // 5. Habilidades Técnicas
  writeSectionTitle('HABILIDADES TÉCNICAS');
  cv.habilidades.forEach((cat, idx) => {
    ensureSpace(12);
    doc.setFillColor(...COLOR_NAVY_ACCENT);
    doc.rect(marginX, y - 4.6, 2.8, 2.8, 'F');
    writeLabeledLine(
      `${cat.categoria}: `,
      `${cat.itens.join(', ')}.`,
      9.0,
      11.7,
      idx === cv.habilidades.length - 1 ? 4 : 1.4,
      6.5
    );
  });

  // 6. Projetos Relevantes (Destaque para o NutrIA)
  writeSectionTitle('PROJETOS RELEVANTES');
  y += 3;
  const boxIndent = 9;
  const innerWidth = contentWidth - boxIndent - 6;
  const xLeft = marginX + boxIndent;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const titleLines = doc.splitTextToSize(`${cv.projetoDestaque.titulo} (Projeto Autoral)`, innerWidth);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.95);
  const descLines = doc.splitTextToSize(cv.projetoDestaque.descricao, innerWidth);

  doc.setFontSize(8.9);
  const bulletLinesList = cv.projetoDestaque.funcionalidades.map((func) =>
    doc.splitTextToSize(`${func}.`, innerWidth - 9)
  );
  const totalBulletLines = bulletLinesList.reduce((acc, b) => acc + b.length, 0);

  const techLabel = 'Tecnologias: ';
  const techValue = `${cv.projetoDestaque.tecnologias.join(', ')}.`;
  const techLines = doc.splitTextToSize(`${techLabel}${techValue}`, innerWidth);

  const totalDeltaY =
    titleLines.length * 12 +
    11.8 +
    descLines.length * 11.5 +
    1.5 +
    totalBulletLines * 11.4 +
    bulletLinesList.length * 0.4 +
    1 +
    techLines.length * 11.5;

  const boxTopY = y - 10.5;
  const lastBaselineY = y + totalDeltaY - 11.5;
  const boxBottomY = lastBaselineY + 5.5;
  const boxHeight = boxBottomY - boxTopY;

  doc.setFillColor(...COLOR_BG_CALLOUT);
  doc.rect(marginX, boxTopY, contentWidth, boxHeight, 'F');
  doc.setFillColor(...COLOR_NAVY_PRIMARY);
  doc.rect(marginX, boxTopY, 2.6, boxHeight, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...COLOR_NAVY_DARK);
  titleLines.forEach((line) => {
    doc.text(line, xLeft, y);
    y += 12;
  });

  const repoLabel = 'Repositório GitHub: ';
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.65);
  doc.setTextColor(...COLOR_NAVY_PRIMARY);
  doc.text(repoLabel, xLeft, y);
  const wRepoLabel = doc.getTextWidth(repoLabel);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(...COLOR_NAVY_ACCENT);
  doc.text(cv.projetoDestaque.repositorioUrl, xLeft + wRepoLabel, y);
  y += 11.8;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.95);
  doc.setTextColor(...COLOR_TEXT_BODY);
  descLines.forEach((line) => {
    doc.text(line, xLeft, y);
    y += 11.5;
  });
  y += 1.5;

  bulletLinesList.forEach((bLines) => {
    bLines.forEach((line, idx) => {
      if (idx === 0) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8.9);
        doc.setTextColor(...COLOR_NAVY_PRIMARY);
        doc.text('-', xLeft, y);
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.9);
      doc.setTextColor(...COLOR_TEXT_BODY);
      doc.text(line, xLeft + 9, y);
      y += 11.4;
    });
    y += 0.4;
  });
  y += 1;

  techLines.forEach((line, idx) => {
    if (idx === 0 && line.startsWith(techLabel)) {
      const rest = line.slice(techLabel.length);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.9);
      doc.setTextColor(...COLOR_NAVY_PRIMARY);
      doc.text(techLabel, xLeft, y);
      const labelW = doc.getTextWidth(techLabel);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...COLOR_TEXT_BODY);
      doc.text(rest, xLeft + labelW, y);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.9);
      doc.setTextColor(...COLOR_TEXT_BODY);
      doc.text(line, xLeft, y);
    }
    y += 11.5;
  });

  y += 7;

  cv.outrosProjetos.forEach((proj) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.25);
    doc.setTextColor(...COLOR_NAVY_DARK);
    const wTitulo = doc.getTextWidth(proj.titulo);
    doc.text(proj.titulo, marginX, y);

    doc.setFontSize(8.9);
    doc.setTextColor(...COLOR_NAVY_ACCENT);
    doc.text(` (${proj.empresa})`, marginX + wTitulo, y);
    y += 12.6;

    writeColoredParagraph(proj.descricao, 'normal', 8.9, 11.6, 1, COLOR_TEXT_BODY);
    writeLabeledLine('Tecnologias: ', `${proj.tecnologias.join(', ')}.`, 8.85, 11.6, 4, 0);
  });

  // 7. Idiomas
  writeSectionTitle('IDIOMAS');
  writeColoredParagraph(
    cv.idiomas.map((i) => `${i.idioma}: ${i.nivel}`).join('  |  '),
    'normal',
    9.0,
    11.6,
    0,
    COLOR_TEXT_BODY
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
