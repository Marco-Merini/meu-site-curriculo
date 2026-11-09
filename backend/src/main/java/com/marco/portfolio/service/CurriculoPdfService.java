package com.marco.portfolio.service;

import com.marco.portfolio.dto.PortfolioResponseDto;
import com.marco.portfolio.dto.PortfolioResponseDto.*;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class CurriculoPdfService {

    private static final float MARGIN_X = 42f;
    private static final float MARGIN_TOP = 38f;
    private static final float MARGIN_BOTTOM = 28f;
    private static final String PORTFOLIO_URL = "https://meu-site-curriculo-one.vercel.app/";

    // Paleta executiva sóbria (azul-marinho profundo, azul-aço e tons ardósia)
    private static final float[] COLOR_NAVY_DARK = {0.06f, 0.14f, 0.25f};     // #0F2440 - Nome e títulos principais
    private static final float[] COLOR_NAVY_PRIMARY = {0.09f, 0.21f, 0.38f};  // #173661 - Títulos de seção e destaques
    private static final float[] COLOR_NAVY_ACCENT = {0.13f, 0.29f, 0.52f};   // #214A85 - Subtítulos e cargos
    private static final float[] COLOR_TEXT_BODY = {0.12f, 0.16f, 0.23f};     // #1E293B - Texto corrido
    private static final float[] COLOR_TEXT_MUTED = {0.28f, 0.34f, 0.42f};    // #475569 - Metadados e contatos
    private static final float[] COLOR_LINE_SUBTLE = {0.80f, 0.84f, 0.89f};   // #CBD5E1 - Linhas divisórias suaves
    private static final float[] COLOR_BG_BADGE = {0.92f, 0.95f, 0.988f};     // #EBF2FC - Fundo sutil do período

    private final PortfolioService portfolioService;

    public CurriculoPdfService(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    public byte[] gerarCurriculoAtsPdf() {
        PortfolioResponseDto dados = portfolioService.obterDadosPortfolio();

        try (PDDocument document = new PDDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDDocumentInformation info = new PDDocumentInformation();
            info.setTitle("Currículo - " + dados.perfil().nomeCompleto());
            info.setAuthor(dados.perfil().nomeCompleto());
            info.setSubject("Currículo Profissional Otimizado para ATS - Desenvolvedor de Software");
            info.setKeywords("Desenvolvedor de Software, Engenharia de Software, C#, .NET, Blazor, SQL Server, Python, SQL, BigQuery, Angular, TypeScript, JavaScript, APIs REST");
            info.setCreationDate(Calendar.getInstance());
            document.setDocumentInformation(info);

            PDFont fontRegular = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            PDFont fontBold = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);

            PdfCursor cursor = new PdfCursor(document, fontRegular, fontBold);

            // 1. CABEÇALHO EXECUTIVO (Coluna única, hierarquia forte e texto 100% selecionável)
            cursor.writeColoredParagraph(
                    dados.perfil().nomeCompleto().toUpperCase(),
                    fontBold, 20f, 22f, 2f, COLOR_NAVY_DARK
            );
            cursor.writeColoredParagraph(
                    "Desenvolvedor de Software | Bacharel em Engenharia de Software",
                    fontBold, 11.5f, 15f, 4f, COLOR_NAVY_ACCENT
            );
            cursor.writeColoredParagraph(
                    String.format("%s | Telefone / WhatsApp: %s | E-mail: %s",
                            dados.contato().localizacao(),
                            dados.contato().telefoneExibicao(),
                            dados.contato().email()),
                    fontRegular, 9.2f, 13f, 0.5f, COLOR_TEXT_MUTED
            );
            cursor.writeColoredParagraph(
                    String.format("LinkedIn: %s | GitHub: %s",
                            dados.contato().linkedinUrl(),
                            dados.contato().githubUrl()),
                    fontRegular, 9.2f, 13f, 0.5f, COLOR_TEXT_MUTED
            );
            cursor.writeColoredParagraph(
                    "Portfólio: " + PORTFOLIO_URL,
                    fontRegular, 9.2f, 13f, 0f, COLOR_TEXT_MUTED
            );
            cursor.drawHeaderDivider();

            // 2. RESUMO PROFISSIONAL
            cursor.writeSectionTitle("RESUMO PROFISSIONAL");
            String resumoAts = "Me chamo Marco, sou bacharel em Engenharia de Software formado pela Católica de Joinville, "
                    + "com experiência em desenvolvimento de sistemas e engenharia de dados. Atualmente atuo como Desenvolvedor Júnior, "
                    + "trabalhando principalmente com C# e tecnologias do ecossistema .NET no desenvolvimento e manutenção de aplicações e APIs. "
                    + "Possuo conhecimentos em SQL, Python, JavaScript e TypeScript, além de experiência com Blazor, Angular, Entity Framework Core "
                    + "e Microsoft SQL Server. Tenho facilidade para aprender novas tecnologias, resolver problemas e colaborar em equipe, "
                    + "buscando sempre desenvolver soluções eficientes.";
            cursor.writeColoredParagraph(resumoAts, fontRegular, 9.5f, 13.4f, 6f, COLOR_TEXT_BODY);

            // 3. EXPERIÊNCIA PROFISSIONAL (Protagonismo visual com destaque para empresa, cargo e período)
            cursor.writeSectionTitle("EXPERIÊNCIA PROFISSIONAL");
            for (int i = 0; i < dados.experiencias().size(); i++) {
                ExperienciaDto exp = dados.experiencias().get(i);
                float afterExp = (i == dados.experiencias().size() - 1) ? 6f : 8f;
                cursor.writeExperienceBlock(exp, afterExp);
            }

            // 4. FORMAÇÃO ACADÊMICA
            cursor.writeSectionTitle("FORMAÇÃO ACADÊMICA");
            FormacaoDto formacao = dados.formacao();
            cursor.writeEducationHeader(formacao.curso(), formacao.instituicao(), 2f);
            cursor.writeColoredParagraph(
                    String.format("Status: %s | Localização: %s", formacao.conclusao(), dados.contato().localizacao()),
                    fontRegular, 9.4f, 13f, 6f, COLOR_TEXT_MUTED
            );

            // 5. HABILIDADES TÉCNICAS (Categorias alinhadas e destacadas em azul-marinho, sem IA)
            cursor.writeSectionTitle("HABILIDADES TÉCNICAS");
            List<CategoriaHabilidadeDto> habilidadesCurriculo = new ArrayList<>();
            for (CategoriaHabilidadeDto cat : dados.habilidades()) {
                if (!cat.categoria().equalsIgnoreCase("Inteligência Artificial")) {
                    habilidadesCurriculo.add(cat);
                }
            }
            for (int i = 0; i < habilidadesCurriculo.size(); i++) {
                CategoriaHabilidadeDto cat = habilidadesCurriculo.get(i);
                float afterSpacing = (i == habilidadesCurriculo.size() - 1) ? 6f : 2f;
                cursor.writeSkillCategoryLine(
                        cat.categoria() + ": ",
                        String.join(", ", cat.itens()) + ".",
                        9.4f, 13f, afterSpacing
                );
            }

            // 6. IDIOMAS
            cursor.writeSectionTitle("IDIOMAS");
            List<String> idiomasFormatados = new ArrayList<>();
            for (IdiomaDto idioma : dados.idiomas()) {
                idiomasFormatados.add(idioma.idioma() + ": " + idioma.nivel());
            }
            cursor.writeColoredParagraph(
                    String.join("  |  ", idiomasFormatados),
                    fontRegular, 9.4f, 13f, 0f, COLOR_TEXT_BODY
            );

            cursor.close();
            document.save(out);
            return out.toByteArray();
        } catch (IOException ex) {
            throw new IllegalStateException("Erro ao gerar o currículo em PDF.", ex);
        }
    }

    private static String limparMarkdown(String texto) {
        if (texto == null) {
            return "";
        }
        return texto.replace("**", "").trim();
    }

    private static class PdfCursor {
        private final PDDocument document;
        private final PDFont fontRegular;
        private final PDFont fontBold;
        private final float pageWidth;
        private final float pageHeight;
        private final float contentWidth;

        private PDPage currentPage;
        private PDPageContentStream stream;
        private float y;

        PdfCursor(PDDocument document, PDFont fontRegular, PDFont fontBold) throws IOException {
            this.document = document;
            this.fontRegular = fontRegular;
            this.fontBold = fontBold;
            this.pageWidth = PDRectangle.A4.getWidth();
            this.pageHeight = PDRectangle.A4.getHeight();
            this.contentWidth = this.pageWidth - (2 * MARGIN_X);
            newPage();
        }

        private void newPage() throws IOException {
            if (this.stream != null) {
                this.stream.close();
            }
            this.currentPage = new PDPage(PDRectangle.A4);
            this.document.addPage(this.currentPage);
            this.stream = new PDPageContentStream(this.document, this.currentPage);

            // Faixa superior executiva em azul-marinho (puramente vetorial, sem interferir no texto)
            this.stream.setNonStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.addRect(0f, this.pageHeight - 5f, this.pageWidth, 5f);
            this.stream.fill();

            this.y = this.pageHeight - MARGIN_TOP;
        }

        private void ensureSpace(float neededHeight) throws IOException {
            if (this.y - neededHeight < MARGIN_BOTTOM) {
                newPage();
            }
        }

        void drawHeaderDivider() throws IOException {
            float lineY = this.y + 5.5f;
            this.stream.setStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.setLineWidth(1.2f);
            this.stream.moveTo(MARGIN_X, lineY);
            this.stream.lineTo(this.pageWidth - MARGIN_X, lineY);
            this.stream.stroke();

            this.stream.setStrokingColor(COLOR_LINE_SUBTLE[0], COLOR_LINE_SUBTLE[1], COLOR_LINE_SUBTLE[2]);
            this.stream.setLineWidth(0.5f);
            this.stream.moveTo(MARGIN_X, lineY - 2f);
            this.stream.lineTo(this.pageWidth - MARGIN_X, lineY - 2f);
            this.stream.stroke();

            this.y = lineY - 14f;
        }

        void writeSectionTitle(String title) throws IOException {
            ensureSpace(26f);
            this.y -= 3f;

            // Marcador lateral vetorial em azul-marinho ao lado do título da seção
            this.stream.setNonStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.addRect(MARGIN_X, this.y - 0.8f, 3.2f, 9.5f);
            this.stream.fill();

            writeColoredLine(title, fontBold, 10.2f, MARGIN_X + 7.5f, COLOR_NAVY_PRIMARY);
            this.y -= 4f;

            // Linha divisória executiva em dois tons (destaque marinho à esquerda + linha suave)
            this.stream.setStrokingColor(COLOR_LINE_SUBTLE[0], COLOR_LINE_SUBTLE[1], COLOR_LINE_SUBTLE[2]);
            this.stream.setLineWidth(0.6f);
            this.stream.moveTo(MARGIN_X, this.y);
            this.stream.lineTo(this.pageWidth - MARGIN_X, this.y);
            this.stream.stroke();

            this.stream.setStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.setLineWidth(1.4f);
            this.stream.moveTo(MARGIN_X, this.y);
            this.stream.lineTo(MARGIN_X + 58f, this.y);
            this.stream.stroke();

            this.y -= 13.5f;
        }

        void writeExperienceBlock(ExperienciaDto exp, float spaceAfter) throws IOException {
            float leftOffset = 8f;
            float blockStartBaselineY = this.y;

            // Cabeçalho da experiência: Empresa — Cargo (Período) na mesma linha e em fluxo contínuo
            ensureSpace(16f);
            String empresaClean = sanitize(exp.empresa());
            String sepClean = " — ";
            String cargoClean = sanitize(exp.cargo());
            String spaceBeforePeriod = " ";
            String periodoText = "(" + sanitize(exp.periodo()) + ")";

            float fontSize = 10.1f;
            float periodFontSize = 9.2f;

            float baseX = MARGIN_X + leftOffset;
            float wEmpresa = (fontBold.getStringWidth(empresaClean) / 1000f) * fontSize;
            float wSep = (fontRegular.getStringWidth(sepClean) / 1000f) * fontSize;
            float wCargo = (fontBold.getStringWidth(cargoClean) / 1000f) * fontSize;
            float wSpace = (fontRegular.getStringWidth(spaceBeforePeriod) / 1000f) * fontSize;
            float wPeriodo = (fontBold.getStringWidth(periodoText) / 1000f) * periodFontSize;

            float periodX = baseX + wEmpresa + wSep + wCargo + wSpace + 3f;

            // Pill vetorial sutil destacando o período
            this.stream.setNonStrokingColor(COLOR_BG_BADGE[0], COLOR_BG_BADGE[1], COLOR_BG_BADGE[2]);
            this.stream.addRect(periodX - 4f, this.y - 2.4f, wPeriodo + 8f, 11.8f);
            this.stream.fill();

            writeColoredLine(empresaClean, fontBold, fontSize, baseX, COLOR_NAVY_DARK);
            writeColoredLine(sepClean, fontRegular, fontSize, baseX + wEmpresa, COLOR_TEXT_MUTED);
            writeColoredLine(cargoClean, fontBold, fontSize, baseX + wEmpresa + wSep, COLOR_NAVY_ACCENT);
            writeColoredLine(periodoText, fontBold, periodFontSize, periodX, COLOR_NAVY_PRIMARY);

            this.y -= 14.5f;

            for (String atribuicao : exp.atribuicoes()) {
                writeBullet(limparMarkdown(atribuicao), fontRegular, 9.4f, 13f, leftOffset);
            }

            writeLabeledLine(
                    "Tecnologias: ",
                    String.join(", ", exp.tecnologias()) + ".",
                    9.3f, 13f, 0f, leftOffset
            );

            // Barra lateral executiva sutil conectando toda a experiência profissional
            float blockTopY = blockStartBaselineY + 8.5f;
            float blockBottomY = this.y + 9.5f;
            this.stream.setNonStrokingColor(COLOR_LINE_SUBTLE[0], COLOR_LINE_SUBTLE[1], COLOR_LINE_SUBTLE[2]);
            this.stream.addRect(MARGIN_X, blockBottomY, 2f, blockTopY - blockBottomY);
            this.stream.fill();

            // Ponto superior azul-marinho na barra da experiência
            this.stream.setNonStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.addRect(MARGIN_X, blockTopY - 11f, 2f, 11f);
            this.stream.fill();

            this.y -= spaceAfter;
        }

        void writeEducationHeader(String curso, String instituicao, float spaceAfter) throws IOException {
            ensureSpace(15f);
            String cursoClean = sanitize(curso);
            String sepClean = " — ";
            String instClean = sanitize(instituicao);
            float fontSize = 9.9f;

            float wCurso = (fontBold.getStringWidth(cursoClean) / 1000f) * fontSize;
            float wSep = (fontRegular.getStringWidth(sepClean) / 1000f) * fontSize;

            writeColoredLine(cursoClean, fontBold, fontSize, MARGIN_X, COLOR_NAVY_DARK);
            writeColoredLine(sepClean, fontRegular, fontSize, MARGIN_X + wCurso, COLOR_TEXT_MUTED);
            writeColoredLine(instClean, fontBold, fontSize, MARGIN_X + wCurso + wSep, COLOR_NAVY_ACCENT);

            this.y -= (13f + spaceAfter);
        }

        void writeColoredParagraph(String text, PDFont font, float fontSize, float leading, float spaceAfter, float[] color) throws IOException {
            List<String> lines = wrapText(text, font, fontSize, contentWidth);
            for (String line : lines) {
                ensureSpace(leading);
                writeColoredLine(line, font, fontSize, MARGIN_X, color);
                this.y -= leading;
            }
            this.y -= spaceAfter;
        }

        void writeBullet(String text, PDFont font, float fontSize, float leading, float leftOffset) throws IOException {
            float bulletIndent = 9.5f;
            float baseX = MARGIN_X + leftOffset;
            List<String> lines = wrapText(text, font, fontSize, contentWidth - leftOffset - bulletIndent);
            for (int i = 0; i < lines.size(); i++) {
                ensureSpace(leading);
                if (i == 0) {
                    writeColoredLine("-", fontBold, fontSize, baseX, COLOR_NAVY_PRIMARY);
                }
                writeColoredLine(lines.get(i), font, fontSize, baseX + bulletIndent, COLOR_TEXT_BODY);
                this.y -= leading;
            }
            this.y -= 1f;
        }

        void writeSkillCategoryLine(String label, String value, float fontSize, float leading, float spaceAfter) throws IOException {
            ensureSpace(leading);
            // Pequeno indicador vetorial quadrado em azul-marinho antes da categoria
            this.stream.setNonStrokingColor(COLOR_NAVY_ACCENT[0], COLOR_NAVY_ACCENT[1], COLOR_NAVY_ACCENT[2]);
            this.stream.addRect(MARGIN_X, this.y + 2f, 3f, 3f);
            this.stream.fill();

            writeLabeledLine(label, value, fontSize, leading, spaceAfter, 7f);
        }

        void writeLabeledLine(String label, String value, float fontSize, float leading, float spaceAfter, float leftOffset) throws IOException {
            float baseX = MARGIN_X + leftOffset;
            String fullText = label + value;
            List<String> lines = wrapText(fullText, fontRegular, fontSize, contentWidth - leftOffset);
            for (int i = 0; i < lines.size(); i++) {
                ensureSpace(leading);
                String line = lines.get(i);
                if (i == 0 && line.startsWith(label)) {
                    String rest = line.substring(label.length());
                    writeColoredLine(label, fontBold, fontSize, baseX, COLOR_NAVY_PRIMARY);
                    float labelWidth = (fontBold.getStringWidth(sanitize(label)) / 1000f) * fontSize;
                    writeColoredLine(rest, fontRegular, fontSize, baseX + labelWidth, COLOR_TEXT_BODY);
                } else {
                    writeColoredLine(line, fontRegular, fontSize, baseX, COLOR_TEXT_BODY);
                }
                this.y -= leading;
            }
            this.y -= spaceAfter;
        }

        private void writeColoredLine(String text, PDFont font, float fontSize, float x, float[] rgb) throws IOException {
            this.stream.setNonStrokingColor(rgb[0], rgb[1], rgb[2]);
            this.stream.beginText();
            this.stream.setFont(font, fontSize);
            this.stream.newLineAtOffset(x, this.y);
            this.stream.showText(sanitize(text));
            this.stream.endText();
        }

        private List<String> wrapText(String text, PDFont font, float fontSize, float maxWidth) throws IOException {
            String clean = sanitize(text);
            String[] words = clean.split("\\s+");
            List<String> lines = new ArrayList<>();
            StringBuilder currentLine = new StringBuilder();

            for (String word : words) {
                if (word.isEmpty()) continue;
                String candidate = currentLine.isEmpty() ? word : currentLine + " " + word;
                float width = (font.getStringWidth(candidate) / 1000f) * fontSize;
                if (width <= maxWidth) {
                    currentLine.setLength(0);
                    currentLine.append(candidate);
                } else {
                    if (!currentLine.isEmpty()) {
                        lines.add(currentLine.toString());
                    }
                    currentLine.setLength(0);
                    currentLine.append(word);
                }
            }
            if (!currentLine.isEmpty()) {
                lines.add(currentLine.toString());
            }
            return lines;
        }

        private String sanitize(String input) {
            if (input == null) return "";
            return input
                    .replace('\u00A0', ' ')
                    .replace("\r", "")
                    .replace("\n", " ");
        }

        void close() throws IOException {
            if (this.stream != null) {
                this.stream.close();
            }
        }
    }
}
