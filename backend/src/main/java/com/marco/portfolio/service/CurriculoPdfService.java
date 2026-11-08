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

    private static final float MARGIN_X = 38f;
    private static final float MARGIN_TOP = 34f;
    private static final float MARGIN_BOTTOM = 24f;

    // Paleta executiva sóbria (azul-marinho profundo, azul-aço e tons ardósia)
    private static final float[] COLOR_NAVY_DARK = {0.06f, 0.14f, 0.25f};     // #0F2440 - Nome e títulos principais
    private static final float[] COLOR_NAVY_PRIMARY = {0.09f, 0.21f, 0.38f};  // #173661 - Títulos de seção e destaques
    private static final float[] COLOR_NAVY_ACCENT = {0.13f, 0.29f, 0.52f};   // #214A85 - Subtítulos e cargos
    private static final float[] COLOR_TEXT_BODY = {0.12f, 0.16f, 0.23f};     // #1E293B - Texto corrido
    private static final float[] COLOR_TEXT_MUTED = {0.28f, 0.34f, 0.42f};    // #475569 - Metadados e contatos
    private static final float[] COLOR_LINE_SUBTLE = {0.80f, 0.84f, 0.89f};   // #CBD5E1 - Linhas divisórias suaves
    private static final float[] COLOR_BG_CALLOUT = {0.965f, 0.976f, 0.992f}; // #F6F9FD - Fundo sutil do destaque NutrIA
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
            info.setKeywords("Desenvolvedor de Software, Engenharia de Software, C#, .NET, Blazor, SQL Server, Python, SQL, BigQuery, Angular, TypeScript, JavaScript, APIs REST, RAG");
            info.setCreationDate(Calendar.getInstance());
            document.setDocumentInformation(info);

            PDFont fontRegular = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
            PDFont fontBold = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
            PDFont fontOblique = new PDType1Font(Standard14Fonts.FontName.HELVETICA_OBLIQUE);

            PdfCursor cursor = new PdfCursor(document, fontRegular, fontBold, fontOblique);

            // 1. CABEÇALHO EXECUTIVO (Coluna única, hierarquia forte e texto 100% selecionável)
            cursor.writeColoredParagraph(
                    dados.perfil().nomeCompleto().toUpperCase(),
                    fontBold, 19f, 20f, 1.5f, COLOR_NAVY_DARK
            );
            cursor.writeColoredParagraph(
                    "Desenvolvedor de Software | Bacharel em Engenharia de Software",
                    fontBold, 11.2f, 14.5f, 3f, COLOR_NAVY_ACCENT
            );
            cursor.writeColoredParagraph(
                    String.format("%s | Telefone / WhatsApp: %s | E-mail: %s",
                            dados.contato().localizacao(),
                            dados.contato().telefoneExibicao(),
                            dados.contato().email()),
                    fontRegular, 8.9f, 12f, 0.5f, COLOR_TEXT_MUTED
            );
            cursor.writeColoredParagraph(
                    String.format("LinkedIn: %s | GitHub: %s",
                            dados.contato().linkedinUrl(),
                            dados.contato().githubUrl()),
                    fontRegular, 8.9f, 12f, 0f, COLOR_TEXT_MUTED
            );
            cursor.drawHeaderDivider();

            // 2. RESUMO PROFISSIONAL
            cursor.writeSectionTitle("RESUMO PROFISSIONAL");
            String resumoAts = "Bacharel em Engenharia de Software pela Católica de Santa Catarina — Centro Universitário, "
                    + "com atuação profissional no desenvolvimento de software e experiência prática em desenvolvimento de aplicações corporativas, "
                    + "integração de sistemas, bancos de dados relacionais e engenharia de dados. Experiência com C#, .NET, .NET MAUI Blazor Hybrid, "
                    + "Blazor Server, JavaScript, TypeScript, Angular, Microsoft SQL Server, APIs REST e Swagger, além de automação e ingestão de dados "
                    + "com Python, SQL, Google BigQuery e Metabase. Perfil proativo, colaborativo e focado em arquitetura limpa, qualidade de entregas e "
                    + "soluções eficientes alinhadas às necessidades do negócio.";
            cursor.writeColoredParagraph(resumoAts, fontRegular, 9.05f, 12.2f, 4f, COLOR_TEXT_BODY);

            // 3. EXPERIÊNCIA PROFISSIONAL (Protagonismo visual com destaque para empresa, cargo e período)
            cursor.writeSectionTitle("EXPERIÊNCIA PROFISSIONAL");
            for (int i = 0; i < dados.experiencias().size(); i++) {
                ExperienciaDto exp = dados.experiencias().get(i);
                float afterExp = (i == dados.experiencias().size() - 1) ? 4f : 5.5f;
                cursor.writeExperienceBlock(exp, afterExp);
            }

            // 4. FORMAÇÃO ACADÊMICA
            cursor.writeSectionTitle("FORMAÇÃO ACADÊMICA");
            FormacaoDto formacao = dados.formacao();
            cursor.writeEducationHeader(formacao.curso(), formacao.instituicao(), 1.5f);
            cursor.writeColoredParagraph(
                    String.format("Status: %s | Localização: %s", formacao.conclusao(), dados.contato().localizacao()),
                    fontRegular, 8.95f, 11.8f, 4f, COLOR_TEXT_MUTED
            );

            // 5. HABILIDADES TÉCNICAS (Categorias alinhadas e destacadas em azul-marinho)
            cursor.writeSectionTitle("HABILIDADES TÉCNICAS");
            for (int i = 0; i < dados.habilidades().size(); i++) {
                CategoriaHabilidadeDto cat = dados.habilidades().get(i);
                float afterSpacing = (i == dados.habilidades().size() - 1) ? 4f : 1.4f;
                cursor.writeSkillCategoryLine(
                        cat.categoria() + ": ",
                        String.join(", ", cat.itens()) + ".",
                        9.0f, 11.7f, afterSpacing
                );
            }

            // 6. PROJETOS RELEVANTES (Destaque executivo especial para o NutrIA)
            cursor.writeSectionTitle("PROJETOS RELEVANTES");
            ProjetoDestaqueDto nutria = dados.projetoDestaque();
            cursor.writeFeaturedProjectBlock(nutria, 7f);

            for (int i = 0; i < dados.outrosProjetos().size(); i++) {
                OutroProjetoDto proj = dados.outrosProjetos().get(i);
                cursor.writeProjectHeader(proj.titulo(), proj.empresa(), 1f);
                cursor.writeColoredParagraph(
                        limparMarkdown(proj.descricao()),
                        fontRegular, 8.9f, 11.6f, 1f, COLOR_TEXT_BODY
                );
                cursor.writeLabeledLine(
                        "Tecnologias: ",
                        String.join(", ", proj.tecnologias()) + ".",
                        8.85f, 11.6f, (i == dados.outrosProjetos().size() - 1) ? 4f : 4f, 0f
                );
            }

            // 7. IDIOMAS
            cursor.writeSectionTitle("IDIOMAS");
            List<String> idiomasFormatados = new ArrayList<>();
            for (IdiomaDto idioma : dados.idiomas()) {
                idiomasFormatados.add(idioma.idioma() + ": " + idioma.nivel());
            }
            cursor.writeColoredParagraph(
                    String.join("  |  ", idiomasFormatados),
                    fontRegular, 9.0f, 11.6f, 0f, COLOR_TEXT_BODY
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
        private final PDFont fontOblique;
        private final float pageWidth;
        private final float pageHeight;
        private final float contentWidth;

        private PDPage currentPage;
        private PDPageContentStream stream;
        private float y;

        PdfCursor(PDDocument document, PDFont fontRegular, PDFont fontBold, PDFont fontOblique) throws IOException {
            this.document = document;
            this.fontRegular = fontRegular;
            this.fontBold = fontBold;
            this.fontOblique = fontOblique;
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
            // y já foi decrementado pelo leading (12f) da última linha de contato;
            // desenhamos a divisória logo abaixo do texto de contato (y + 5.5f) e damos respiro abaixo
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

            this.y = lineY - 12f;
        }

        void writeSectionTitle(String title) throws IOException {
            ensureSpace(24f);
            this.y -= 2.5f;

            // Marcador lateral vetorial em azul-marinho ao lado do título da seção
            this.stream.setNonStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.addRect(MARGIN_X, this.y - 0.8f, 3f, 9f);
            this.stream.fill();

            writeColoredLine(title, fontBold, 9.8f, MARGIN_X + 7f, COLOR_NAVY_PRIMARY);
            this.y -= 3.5f;

            // Linha divisória executiva em dois tons (destaque marinho à esquerda + linha suave)
            this.stream.setStrokingColor(COLOR_LINE_SUBTLE[0], COLOR_LINE_SUBTLE[1], COLOR_LINE_SUBTLE[2]);
            this.stream.setLineWidth(0.6f);
            this.stream.moveTo(MARGIN_X, this.y);
            this.stream.lineTo(this.pageWidth - MARGIN_X, this.y);
            this.stream.stroke();

            this.stream.setStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.setLineWidth(1.3f);
            this.stream.moveTo(MARGIN_X, this.y);
            this.stream.lineTo(MARGIN_X + 54f, this.y);
            this.stream.stroke();

            this.y -= 12f;
        }

        void writeExperienceBlock(ExperienciaDto exp, float spaceAfter) throws IOException {
            float leftOffset = 7f;
            float blockStartBaselineY = this.y;

            // Cabeçalho da experiência: Empresa — Cargo (Período) na mesma linha e em fluxo contínuo
            ensureSpace(15f);
            String empresaClean = sanitize(exp.empresa());
            String sepClean = " — ";
            String cargoClean = sanitize(exp.cargo());
            String spaceBeforePeriod = " ";
            String periodoText = "(" + sanitize(exp.periodo()) + ")";

            float fontSize = 9.7f;
            float periodFontSize = 8.9f;

            float baseX = MARGIN_X + leftOffset;
            float wEmpresa = (fontBold.getStringWidth(empresaClean) / 1000f) * fontSize;
            float wSep = (fontRegular.getStringWidth(sepClean) / 1000f) * fontSize;
            float wCargo = (fontBold.getStringWidth(cargoClean) / 1000f) * fontSize;
            float wSpace = (fontRegular.getStringWidth(spaceBeforePeriod) / 1000f) * fontSize;
            float wPeriodo = (fontBold.getStringWidth(periodoText) / 1000f) * periodFontSize;

            float periodX = baseX + wEmpresa + wSep + wCargo + wSpace + 3f;

            // Pill vetorial sutil destacando o período
            this.stream.setNonStrokingColor(COLOR_BG_BADGE[0], COLOR_BG_BADGE[1], COLOR_BG_BADGE[2]);
            this.stream.addRect(periodX - 3.5f, this.y - 2.2f, wPeriodo + 7f, 11.2f);
            this.stream.fill();

            writeColoredLine(empresaClean, fontBold, fontSize, baseX, COLOR_NAVY_DARK);
            writeColoredLine(sepClean, fontRegular, fontSize, baseX + wEmpresa, COLOR_TEXT_MUTED);
            writeColoredLine(cargoClean, fontBold, fontSize, baseX + wEmpresa + wSep, COLOR_NAVY_ACCENT);
            writeColoredLine(periodoText, fontBold, periodFontSize, periodX, COLOR_NAVY_PRIMARY);

            this.y -= 13f;

            for (String atribuicao : exp.atribuicoes()) {
                writeBullet(limparMarkdown(atribuicao), fontRegular, 9.0f, 11.7f, leftOffset);
            }

            writeLabeledLine(
                    "Tecnologias: ",
                    String.join(", ", exp.tecnologias()) + ".",
                    8.9f, 11.7f, 0f, leftOffset
            );

            // Barra lateral executiva sutil conectando toda a experiência profissional
            float blockTopY = blockStartBaselineY + 8f;
            float blockBottomY = this.y + 9f;
            this.stream.setNonStrokingColor(COLOR_LINE_SUBTLE[0], COLOR_LINE_SUBTLE[1], COLOR_LINE_SUBTLE[2]);
            this.stream.addRect(MARGIN_X, blockBottomY, 1.8f, blockTopY - blockBottomY);
            this.stream.fill();

            // Ponto superior azul-marinho na barra da experiência
            this.stream.setNonStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.addRect(MARGIN_X, blockTopY - 10f, 1.8f, 10f);
            this.stream.fill();

            this.y -= spaceAfter;
        }

        void writeEducationHeader(String curso, String instituicao, float spaceAfter) throws IOException {
            ensureSpace(14f);
            String cursoClean = sanitize(curso);
            String sepClean = " — ";
            String instClean = sanitize(instituicao);
            float fontSize = 9.5f;

            float wCurso = (fontBold.getStringWidth(cursoClean) / 1000f) * fontSize;
            float wSep = (fontRegular.getStringWidth(sepClean) / 1000f) * fontSize;

            writeColoredLine(cursoClean, fontBold, fontSize, MARGIN_X, COLOR_NAVY_DARK);
            writeColoredLine(sepClean, fontRegular, fontSize, MARGIN_X + wCurso, COLOR_TEXT_MUTED);
            writeColoredLine(instClean, fontBold, fontSize, MARGIN_X + wCurso + wSep, COLOR_NAVY_ACCENT);

            this.y -= (12f + spaceAfter);
        }

        void writeProjectHeader(String titulo, String empresa, float spaceAfter) throws IOException {
            ensureSpace(13f);
            String tituloClean = sanitize(titulo);
            String empClean = " (" + sanitize(empresa) + ")";
            float fontSize = 9.25f;

            float wTitulo = (fontBold.getStringWidth(tituloClean) / 1000f) * fontSize;

            writeColoredLine(tituloClean, fontBold, fontSize, MARGIN_X, COLOR_NAVY_DARK);
            writeColoredLine(empClean, fontBold, 8.9f, MARGIN_X + wTitulo, COLOR_NAVY_ACCENT);

            this.y -= (11.6f + spaceAfter);
        }

        void writeFeaturedProjectBlock(ProjetoDestaqueDto nutria, float spaceAfter) throws IOException {
            this.y -= 3f;
            float boxIndent = 9f;
            float innerWidth = contentWidth - boxIndent - 6f;

            String titleText = nutria.titulo() + " (Projeto Autoral)";
            String repoLabel = "Repositório GitHub: ";
            String repoUrl = nutria.repositorioUrl();
            String descText = limparMarkdown(nutria.descricao());
            String techLabel = "Tecnologias: ";
            String techValue = String.join(", ", nutria.tecnologias()) + ".";

            List<String> titleLines = wrapText(titleText, fontBold, 9.5f, innerWidth);
            List<String> descLines = wrapText(descText, fontRegular, 8.95f, innerWidth);
            List<List<String>> bulletLinesList = new ArrayList<>();
            int totalBulletLines = 0;
            for (String func : nutria.funcionalidades()) {
                List<String> bLines = wrapText(limparMarkdown(func) + ".", fontRegular, 8.9f, innerWidth - 9f);
                bulletLinesList.add(bLines);
                totalBulletLines += bLines.size();
            }
            List<String> techLines = wrapText(techLabel + techValue, fontRegular, 8.9f, innerWidth);

            // Cálculo exato do deslocamento vertical (totalDeltaY) desde a primeira linha até a última
            float totalDeltaY = (titleLines.size() * 12f)
                    + 11.8f // repo line
                    + (descLines.size() * 11.5f) + 1.5f
                    + (totalBulletLines * 11.4f) + (bulletLinesList.size() * 0.4f) + 1f
                    + (techLines.size() * 11.5f);

            // Como a última linha de texto termina em (y_inicial - totalDeltaY + 11.5f),
            // ajustamos o topo e a base do card vetorial exatamente ao redor do texto:
            float boxTopY = this.y + 10.5f;
            float lastBaselineY = this.y - totalDeltaY + 11.5f;
            float boxBottomY = lastBaselineY - 5.5f;
            float boxHeight = boxTopY - boxBottomY;

            ensureSpace(boxHeight);

            // Retângulo vetorial sutil de destaque para o NutrIA
            this.stream.setNonStrokingColor(COLOR_BG_CALLOUT[0], COLOR_BG_CALLOUT[1], COLOR_BG_CALLOUT[2]);
            this.stream.addRect(MARGIN_X, boxBottomY, contentWidth, boxHeight);
            this.stream.fill();

            // Barra vertical azul-marinho à esquerda do card do NutrIA
            this.stream.setNonStrokingColor(COLOR_NAVY_PRIMARY[0], COLOR_NAVY_PRIMARY[1], COLOR_NAVY_PRIMARY[2]);
            this.stream.addRect(MARGIN_X, boxBottomY, 2.6f, boxHeight);
            this.stream.fill();

            float xLeft = MARGIN_X + boxIndent;

            // Título do NutrIA
            for (String line : titleLines) {
                writeColoredLine(line, fontBold, 9.5f, xLeft, COLOR_NAVY_DARK);
                this.y -= 12f;
            }

            // Link do Repositório
            writeColoredLine(repoLabel, fontBold, 8.65f, xLeft, COLOR_NAVY_PRIMARY);
            float wRepoLabel = (fontBold.getStringWidth(sanitize(repoLabel)) / 1000f) * 8.65f;
            writeColoredLine(repoUrl, fontOblique, 8.65f, xLeft + wRepoLabel, COLOR_NAVY_ACCENT);
            this.y -= 11.8f;

            // Descrição
            for (String line : descLines) {
                writeColoredLine(line, fontRegular, 8.95f, xLeft, COLOR_TEXT_BODY);
                this.y -= 11.5f;
            }
            this.y -= 1.5f;

            // Funcionalidades (Bullets)
            for (List<String> bLines : bulletLinesList) {
                for (int i = 0; i < bLines.size(); i++) {
                    if (i == 0) {
                        writeColoredLine("-", fontBold, 8.9f, xLeft, COLOR_NAVY_PRIMARY);
                    }
                    writeColoredLine(bLines.get(i), fontRegular, 8.9f, xLeft + 9f, COLOR_TEXT_BODY);
                    this.y -= 11.4f;
                }
                this.y -= 0.4f;
            }
            this.y -= 1f;

            // Tecnologias do NutrIA
            for (int i = 0; i < techLines.size(); i++) {
                String line = techLines.get(i);
                if (i == 0 && line.startsWith(techLabel)) {
                    String rest = line.substring(techLabel.length());
                    writeColoredLine(techLabel, fontBold, 8.9f, xLeft, COLOR_NAVY_PRIMARY);
                    float labelWidth = (fontBold.getStringWidth(sanitize(techLabel)) / 1000f) * 8.9f;
                    writeColoredLine(rest, fontRegular, 8.9f, xLeft + labelWidth, COLOR_TEXT_BODY);
                } else {
                    writeColoredLine(line, fontRegular, 8.9f, xLeft, COLOR_TEXT_BODY);
                }
                this.y -= 11.5f;
            }

            this.y -= spaceAfter;
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
            float bulletIndent = 9f;
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
            this.y -= 0.5f;
        }

        void writeSkillCategoryLine(String label, String value, float fontSize, float leading, float spaceAfter) throws IOException {
            ensureSpace(leading);
            // Pequeno indicador vetorial quadrado em azul-marinho antes da categoria
            this.stream.setNonStrokingColor(COLOR_NAVY_ACCENT[0], COLOR_NAVY_ACCENT[1], COLOR_NAVY_ACCENT[2]);
            this.stream.addRect(MARGIN_X, this.y + 1.8f, 2.8f, 2.8f);
            this.stream.fill();

            writeLabeledLine(label, value, fontSize, leading, spaceAfter, 6.5f);
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
