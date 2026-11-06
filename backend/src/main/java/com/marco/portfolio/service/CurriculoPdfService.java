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

    private static final float MARGIN_X = 40f;
    private static final float MARGIN_TOP = 34f;
    private static final float MARGIN_BOTTOM = 30f;

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

            PdfCursor cursor = new PdfCursor(document, fontRegular, fontBold);

            // 1. CABEÇALHO (Coluna única, texto puro selecionável)
            cursor.writeParagraph(dados.perfil().nomeCompleto().toUpperCase(), fontBold, 15.5f, 18f, 0f);
            cursor.writeParagraph(
                    "Desenvolvedor de Software | Bacharel em Engenharia de Software",
                    fontBold, 10.2f, 13f, 2f
            );
            cursor.writeParagraph(
                    String.format("%s | Telefone / WhatsApp: %s | E-mail: %s",
                            dados.contato().localizacao(),
                            dados.contato().telefoneExibicao(),
                            dados.contato().email()),
                    fontRegular, 9f, 12f, 0f
            );
            cursor.writeParagraph(
                    String.format("LinkedIn: %s | GitHub: %s",
                            dados.contato().linkedinUrl(),
                            dados.contato().githubUrl()),
                    fontRegular, 9f, 12f, 4f
            );
            cursor.drawDivider(4f);

            // 2. RESUMO PROFISSIONAL
            cursor.writeSectionTitle("RESUMO PROFISSIONAL");
            String resumoAts = "Bacharel em Engenharia de Software pela Católica de Santa Catarina — Centro Universitário, "
                    + "com atuação profissional no desenvolvimento de software e experiência prática em desenvolvimento de aplicações corporativas, "
                    + "integração de sistemas, bancos de dados relacionais e engenharia de dados. Experiência com C#, .NET, .NET MAUI Blazor Hybrid, "
                    + "Blazor Server, JavaScript, TypeScript, Angular, Microsoft SQL Server, APIs REST e Swagger, além de automação e ingestão de dados "
                    + "com Python, SQL, Google BigQuery e Metabase. Perfil proativo, colaborativo e focado em arquitetura limpa, qualidade de entregas e "
                    + "soluções eficientes alinhadas às necessidades do negócio.";
            cursor.writeParagraph(resumoAts, fontRegular, 9.2f, 12.2f, 4f);

            // 3. EXPERIÊNCIA PROFISSIONAL
            cursor.writeSectionTitle("EXPERIÊNCIA PROFISSIONAL");
            for (int i = 0; i < dados.experiencias().size(); i++) {
                ExperienciaDto exp = dados.experiencias().get(i);
                cursor.writeParagraph(
                        String.format("%s — %s (%s)", exp.empresa(), exp.cargo(), exp.periodo()),
                        fontBold, 9.6f, 12.5f, 1.5f
                );
                for (String atribuicao : exp.atribuicoes()) {
                    cursor.writeBullet(limparMarkdown(atribuicao), fontRegular, 9.1f, 11.8f);
                }
                cursor.writeLabeledLine(
                        "Tecnologias: ",
                        String.join(", ", exp.tecnologias()) + ".",
                        9f, 11.8f, (i == dados.experiencias().size() - 1) ? 4f : 3.5f
                );
            }

            // 4. FORMAÇÃO ACADÊMICA
            cursor.writeSectionTitle("FORMAÇÃO ACADÊMICA");
            FormacaoDto formacao = dados.formacao();
            cursor.writeParagraph(
                    String.format("%s — %s", formacao.curso(), formacao.instituicao()),
                    fontBold, 9.5f, 12.2f, 1f
            );
            cursor.writeParagraph(
                    String.format("Status: %s | Localização: %s", formacao.conclusao(), dados.contato().localizacao()),
                    fontRegular, 9.1f, 11.8f, 4f
            );

            // 5. HABILIDADES TÉCNICAS
            cursor.writeSectionTitle("HABILIDADES TÉCNICAS");
            for (int i = 0; i < dados.habilidades().size(); i++) {
                CategoriaHabilidadeDto cat = dados.habilidades().get(i);
                float afterSpacing = (i == dados.habilidades().size() - 1) ? 4f : 1f;
                cursor.writeLabeledLine(
                        cat.categoria() + ": ",
                        String.join(", ", cat.itens()) + ".",
                        9.1f, 11.8f, afterSpacing
                );
            }

            // 6. PROJETOS RELEVANTES
            cursor.writeSectionTitle("PROJETOS RELEVANTES");
            ProjetoDestaqueDto nutria = dados.projetoDestaque();
            cursor.writeParagraph(
                    nutria.titulo() + " (Projeto Autoral)",
                    fontBold, 9.5f, 12.2f, 1f
            );
            cursor.writeParagraph(
                    "Repositório GitHub: " + nutria.repositorioUrl(),
                    fontRegular, 8.8f, 11.5f, 1.5f
            );
            cursor.writeParagraph(
                    limparMarkdown(nutria.descricao()),
                    fontRegular, 9.1f, 11.8f, 1.5f
            );
            for (String func : nutria.funcionalidades()) {
                cursor.writeBullet(limparMarkdown(func) + ".", fontRegular, 9f, 11.6f);
            }
            cursor.writeLabeledLine(
                    "Tecnologias: ",
                    String.join(", ", nutria.tecnologias()) + ".",
                    9f, 11.8f, 3.5f
            );

            for (int i = 0; i < dados.outrosProjetos().size(); i++) {
                OutroProjetoDto proj = dados.outrosProjetos().get(i);
                cursor.writeParagraph(
                        String.format("%s (%s)", proj.titulo(), proj.empresa()),
                        fontBold, 9.3f, 12f, 0.5f
                );
                cursor.writeParagraph(
                        limparMarkdown(proj.descricao()),
                        fontRegular, 9f, 11.6f, 0.5f
                );
                cursor.writeLabeledLine(
                        "Tecnologias: ",
                        String.join(", ", proj.tecnologias()) + ".",
                        8.9f, 11.6f, (i == dados.outrosProjetos().size() - 1) ? 4f : 3f
                );
            }

            // 7. IDIOMAS
            cursor.writeSectionTitle("IDIOMAS");
            List<String> idiomasFormatados = new ArrayList<>();
            for (IdiomaDto idioma : dados.idiomas()) {
                idiomasFormatados.add(idioma.idioma() + ": " + idioma.nivel());
            }
            cursor.writeParagraph(
                    String.join("  |  ", idiomasFormatados),
                    fontRegular, 9.1f, 11.8f, 0f
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
            this.y = this.pageHeight - MARGIN_TOP;
        }

        private void ensureSpace(float neededHeight) throws IOException {
            if (this.y - neededHeight < MARGIN_BOTTOM) {
                newPage();
            }
        }

        void drawDivider(float spaceAfter) throws IOException {
            ensureSpace(8f);
            this.stream.setStrokingColor(0.75f, 0.78f, 0.82f);
            this.stream.setLineWidth(0.7f);
            this.stream.moveTo(MARGIN_X, this.y);
            this.stream.lineTo(this.pageWidth - MARGIN_X, this.y);
            this.stream.stroke();
            this.y -= spaceAfter;
        }

        void writeSectionTitle(String title) throws IOException {
            ensureSpace(22f);
            this.y -= 3f;
            writeLine(title, fontBold, 10f, MARGIN_X);
            this.y -= 2.5f;
            this.stream.setStrokingColor(0.15f, 0.18f, 0.22f);
            this.stream.setLineWidth(0.6f);
            this.stream.moveTo(MARGIN_X, this.y);
            this.stream.lineTo(this.pageWidth - MARGIN_X, this.y);
            this.stream.stroke();
            this.y -= 9.5f;
        }

        void writeParagraph(String text, PDFont font, float fontSize, float leading, float spaceAfter) throws IOException {
            List<String> lines = wrapText(text, font, fontSize, contentWidth);
            for (String line : lines) {
                ensureSpace(leading);
                writeLine(line, font, fontSize, MARGIN_X);
                this.y -= leading;
            }
            this.y -= spaceAfter;
        }

        void writeBullet(String text, PDFont font, float fontSize, float leading) throws IOException {
            float bulletIndent = 9f;
            List<String> lines = wrapText(text, font, fontSize, contentWidth - bulletIndent);
            for (int i = 0; i < lines.size(); i++) {
                ensureSpace(leading);
                if (i == 0) {
                    writeLine("-", fontBold, fontSize, MARGIN_X);
                }
                writeLine(lines.get(i), font, fontSize, MARGIN_X + bulletIndent);
                this.y -= leading;
            }
            this.y -= 0.5f;
        }

        void writeLabeledLine(String label, String value, float fontSize, float leading, float spaceAfter) throws IOException {
            String fullText = label + value;
            List<String> lines = wrapText(fullText, fontRegular, fontSize, contentWidth);
            for (int i = 0; i < lines.size(); i++) {
                ensureSpace(leading);
                String line = lines.get(i);
                if (i == 0 && line.startsWith(label)) {
                    String rest = line.substring(label.length());
                    writeLine(label, fontBold, fontSize, MARGIN_X);
                    float labelWidth = (fontBold.getStringWidth(sanitize(label)) / 1000f) * fontSize;
                    writeLine(rest, fontRegular, fontSize, MARGIN_X + labelWidth);
                } else {
                    writeLine(line, fontRegular, fontSize, MARGIN_X);
                }
                this.y -= leading;
            }
            this.y -= spaceAfter;
        }

        private void writeLine(String text, PDFont font, float fontSize, float x) throws IOException {
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
