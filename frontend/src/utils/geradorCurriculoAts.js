import { jsPDF } from 'jspdf';
import { API_BASE_URL } from '../services/api';

const PORTFOLIO_URL = 'https://meu-site-curriculo-one.vercel.app/';

function limparMarkdown(texto = '') {
  return String(texto).replace(/\*\*/g, '').trim();
}

export function construirDadosCurriculoAts(portfolioData) {
  const { perfil, formacao, experiencias, habilidades, idiomas, contato } = portfolioData;

  const resumoProfissional =
    'Me chamo Marco, sou bacharel em Engenharia de Software formado pela Católica de Joinville, com experiência em desenvolvimento de sistemas e engenharia de dados. Atualmente atuo como Desenvolvedor Júnior, trabalhando principalmente com C# e tecnologias do ecossistema .NET no desenvolvimento e manutenção de aplicações e APIs. Possuo conhecimentos em SQL, Python, JavaScript e TypeScript, além de experiência com Blazor, Angular, Entity Framework Core e Microsoft SQL Server. Tenho facilidade para aprender novas tecnologias, resolver problemas e colaborar em equipe, buscando sempre desenvolver soluções eficientes.';

  return {
    nomeCompleto: perfil.nomeCompleto,
    tituloProfissional: 'Desenvolvedor de Software | Bacharel em Engenharia de Software',
    localizacao: contato.localizacao || perfil.localizacao,
    telefone: contato.telefoneExibicao,
    email: contato.email,
    linkedinUrl: contato.linkedinUrl,
    githubUrl: contato.githubUrl,
    portfolioUrl: PORTFOLIO_URL,
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
    habilidades: (habilidades || [])
      .filter((cat) => String(cat.categoria).toLowerCase() !== 'inteligência artificial')
      .map((cat) => ({
        categoria: cat.categoria,
        itens: (cat.itens || []).map((item) => (typeof item === 'string' ? item : item.nome)),
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
  linhas.push(`Portfólio: ${cv.portfolioUrl}`);
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
      'Desenvolvedor de Software, Engenharia de Software, C#, .NET, Blazor, SQL Server, Python, SQL, BigQuery, Angular, TypeScript, JavaScript, APIs REST',
  });

  // Paleta executiva em azul-marinho e ardósia
  const COLOR_NAVY_DARK = [15, 36, 64];      // #0F2440
  const COLOR_NAVY_PRIMARY = [23, 54, 97];   // #173661
  const COLOR_NAVY_ACCENT = [33, 74, 133];   // #214A85
  const COLOR_TEXT_BODY = [30, 41, 59];      // #1E293B
  const COLOR_TEXT_MUTED = [71, 85, 105];    // #475569
  const COLOR_LINE_SUBTLE = [203, 213, 225]; // #CBD5E1
  const COLOR_BG_BADGE = [235, 242, 252];    // #EBF2FC

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 42;
  const marginTop = 38;
  const marginBottom = 28;
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
    ensureSpace(26);
    y += 3;
    doc.setFillColor(...COLOR_NAVY_PRIMARY);
    doc.rect(marginX, y - 8.5, 3.2, 9.5, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.2);
    doc.setTextColor(...COLOR_NAVY_PRIMARY);
    doc.text(title, marginX + 7.5, y);
    y += 4;

    doc.setDrawColor(...COLOR_LINE_SUBTLE);
    doc.setLineWidth(0.6);
    doc.line(marginX, y, pageWidth - marginX, y);

    doc.setDrawColor(...COLOR_NAVY_PRIMARY);
    doc.setLineWidth(1.4);
    doc.line(marginX, y, marginX + 58, y);
    y += 13.5;
  };

  const writeBullet = (text, fontSize, lineHeight, leftOffset = 0) => {
    const indent = 9.5;
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
    y += 1;
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
  writeColoredParagraph(cv.nomeCompleto.toUpperCase(), 'bold', 20, 22, 2, COLOR_NAVY_DARK);
  writeColoredParagraph(cv.tituloProfissional, 'bold', 11.5, 15, 4, COLOR_NAVY_ACCENT);
  writeColoredParagraph(
    `${cv.localizacao} | Telefone / WhatsApp: ${cv.telefone} | E-mail: ${cv.email}`,
    'normal',
    9.2,
    13,
    0.5,
    COLOR_TEXT_MUTED
  );
  writeColoredParagraph(
    `LinkedIn: ${cv.linkedinUrl} | GitHub: ${cv.githubUrl}`,
    'normal',
    9.2,
    13,
    0.5,
    COLOR_TEXT_MUTED
  );
  writeColoredParagraph(`Portfólio: ${cv.portfolioUrl}`, 'normal', 9.2, 13, 0, COLOR_TEXT_MUTED);

  const lineY = y - 5.5;
  doc.setDrawColor(...COLOR_NAVY_PRIMARY);
  doc.setLineWidth(1.2);
  doc.line(marginX, lineY, pageWidth - marginX, lineY);
  doc.setDrawColor(...COLOR_LINE_SUBTLE);
  doc.setLineWidth(0.5);
  doc.line(marginX, lineY + 2, pageWidth - marginX, lineY + 2);
  y = lineY + 14;

  // 2. Resumo Profissional
  writeSectionTitle('RESUMO PROFISSIONAL');
  writeColoredParagraph(cv.resumoProfissional, 'normal', 9.5, 13.4, 6, COLOR_TEXT_BODY);

  // 3. Experiência Profissional
  writeSectionTitle('EXPERIÊNCIA PROFISSIONAL');
  cv.experiencias.forEach((exp, idx) => {
    const leftOffset = 8;
    const baseX = marginX + leftOffset;
    const blockStartY = y;

    ensureSpace(16);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.1);
    const wEmpresa = doc.getTextWidth(exp.empresa);
    doc.setFont('helvetica', 'normal');
    const sep = ' — ';
    const wSep = doc.getTextWidth(sep);
    doc.setFont('helvetica', 'bold');
    const wCargo = doc.getTextWidth(exp.cargo);

    const periodoText = `(${exp.periodo})`;
    doc.setFontSize(9.2);
    const wPeriodo = doc.getTextWidth(periodoText);
    const periodX = baseX + wEmpresa + wSep + wCargo + 6;

    doc.setFillColor(...COLOR_BG_BADGE);
    doc.rect(periodX - 4, y - 9.2, wPeriodo + 8, 11.8, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.1);
    doc.setTextColor(...COLOR_NAVY_DARK);
    doc.text(exp.empresa, baseX, y);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLOR_TEXT_MUTED);
    doc.text(sep, baseX + wEmpresa, y);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLOR_NAVY_ACCENT);
    doc.text(exp.cargo, baseX + wEmpresa + wSep, y);

    doc.setFontSize(9.2);
    doc.setTextColor(...COLOR_NAVY_PRIMARY);
    doc.text(periodoText, periodX, y);

    y += 14.5;

    exp.atribuicoes.forEach((attr) => {
      writeBullet(attr, 9.4, 13, leftOffset);
    });

    writeLabeledLine('Tecnologias: ', `${exp.tecnologias.join(', ')}.`, 9.3, 13, 0, leftOffset);

    const blockTopY = blockStartY - 8.5;
    const blockBottomY = y - 9.5;
    doc.setFillColor(...COLOR_LINE_SUBTLE);
    doc.rect(marginX, blockTopY, 2, blockBottomY - blockTopY, 'F');
    doc.setFillColor(...COLOR_NAVY_PRIMARY);
    doc.rect(marginX, blockTopY, 2, 11, 'F');

    y += idx === cv.experiencias.length - 1 ? 6 : 8;
  });

  // 4. Formação Acadêmica
  writeSectionTitle('FORMAÇÃO ACADÊMICA');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.9);
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
  y += 15;

  writeColoredParagraph(
    `Status: ${cv.formacao.conclusao} | Localização: ${cv.formacao.localizacao}`,
    'normal',
    9.4,
    13,
    6,
    COLOR_TEXT_MUTED
  );

  // 5. Habilidades Técnicas
  writeSectionTitle('HABILIDADES TÉCNICAS');
  cv.habilidades.forEach((cat, idx) => {
    ensureSpace(13);
    doc.setFillColor(...COLOR_NAVY_ACCENT);
    doc.rect(marginX, y - 5, 3, 3, 'F');
    writeLabeledLine(
      `${cat.categoria}: `,
      `${cat.itens.join(', ')}.`,
      9.4,
      13,
      idx === cv.habilidades.length - 1 ? 6 : 2,
      7
    );
  });

  // 6. Idiomas
  writeSectionTitle('IDIOMAS');
  writeColoredParagraph(
    cv.idiomas.map((i) => `${i.idioma}: ${i.nivel}`).join('  |  '),
    'normal',
    9.4,
    13,
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
