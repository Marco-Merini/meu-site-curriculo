import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  Loader2,
  Info,
} from 'lucide-react';
import { submitContactForm } from '../services/api';

const INITIAL_FORM = {
  nome: '',
  email: '',
  assunto: '',
  mensagem: '',
  website: '', // Campo honeypot invisível contra bots
};

function validateForm(values) {
  const errors = {};
  const nome = values.nome.trim();
  const email = values.email.trim();
  const assunto = values.assunto.trim();
  const mensagem = values.mensagem.trim();

  if (!nome) {
    errors.nome = 'Informe seu nome.';
  } else if (nome.length < 2 || nome.length > 100) {
    errors.nome = 'O nome deve ter entre 2 e 100 caracteres.';
  }

  if (!email) {
    errors.email = 'Informe seu endereço de e-mail.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Informe um endereço de e-mail válido.';
  } else if (email.length > 150) {
    errors.email = 'O e-mail deve ter no máximo 150 caracteres.';
  }

  if (!assunto) {
    errors.assunto = 'Informe o assunto da mensagem.';
  } else if (assunto.length < 3 || assunto.length > 140) {
    errors.assunto = 'O assunto deve ter entre 3 e 140 caracteres.';
  }

  if (!mensagem) {
    errors.mensagem = 'Escreva sua mensagem.';
  } else if (mensagem.length < 10 || mensagem.length > 2000) {
    errors.mensagem = 'A mensagem deve ter entre 10 e 2000 caracteres.';
  }

  return errors;
}

function buildLocalFallbackLinks(values, contato) {
  const nome = values.nome.trim() || 'Visitante';
  const email = values.email.trim() || 'não informado';
  const assunto = values.assunto.trim() || 'Contato pelo Portfólio';
  const mensagem = values.mensagem.trim() || 'Olá Marco, gostaria de entrar em contato.';

  const mailSubject = encodeURIComponent(`[Portfólio] ${assunto}`);
  const mailBody = encodeURIComponent(
    `Olá Marco,\n\nMeu nome é ${nome} (${email}).\n\n${mensagem}`
  );
  const whatsappText = encodeURIComponent(
    `Olá Marco! Meu nome é ${nome} (${email}). Assunto: ${assunto}. ${mensagem}`
  );

  return {
    mailtoUrl: `mailto:${contato.email}?subject=${mailSubject}&body=${mailBody}`,
    whatsappUrl: `${contato.whatsappUrl}?text=${whatsappText}`,
  };
}

export function ContactSection({ contato }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contato.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback silencioso caso o navegador bloqueie clipboard
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setApiResponse(null);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setStatus('error');
      setErrorMessage('Revise os campos destacados antes de enviar.');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    try {
      const { data } = await submitContactForm({
        nome: formData.nome.trim(),
        email: formData.email.trim(),
        assunto: formData.assunto.trim(),
        mensagem: formData.mensagem.trim(),
        website: formData.website,
      });

      setApiResponse(data);
      setStatus('success');
    } catch (err) {
      if (err.payload?.camposInvalidos) {
        setFieldErrors(err.payload.camposInvalidos);
      }
      setErrorMessage(
        err.message ||
          'Não foi possível comunicar com o servidor de contato no momento. Utilize abaixo os canais diretos por WhatsApp ou e-mail.'
      );
      setStatus('error');
    }
  };

  const fallbackLinks = buildLocalFallbackLinks(formData, contato);

  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-left">
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
            05 // Contato Direto
          </span>
          <h2
            id="contato-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white"
          >
            Vamos conversar sobre oportunidades, arquitetura e projetos
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Entre em contato diretamente por e-mail, WhatsApp, LinkedIn ou utilize o formulário integrado à API do portfólio.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 text-left">
          {/* Coluna Esquerda: Canais Diretos Confirmados */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs dark:border-slate-800 dark:bg-[#0f1623]">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Canais de Contato
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Disponível para oportunidades como Desenvolvedor de Software / Engenheiro de Software em Joinville/SC ou remotamente.
              </p>

              <div className="mt-6 space-y-4">
                {/* E-mail */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#0b101b]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          E-mail
                        </span>
                        <a
                          href={`mailto:${contato.email}`}
                          className="mt-0.5 block truncate font-mono text-xs sm:text-sm font-semibold text-slate-900 hover:text-emerald-700 dark:text-slate-100 dark:hover:text-emerald-400"
                        >
                          {contato.email}
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-emerald-400"
                      aria-label="Copiar endereço de e-mail"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp / Telefone */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#0b101b]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Telefone &amp; WhatsApp
                        </span>
                        <p className="mt-0.5 font-mono text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {contato.telefoneInternacional}
                        </p>
                      </div>
                    </div>
                    <a
                      href={contato.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      Abrir WhatsApp
                    </a>
                  </div>
                </div>

                {/* Localização */}
                <div className="rounded-xl border border-slate-200/90 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-[#0b101b]">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Localização
                      </span>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {contato.localizacao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Profissionais */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Redes Profissionais &amp; Repositórios
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={contato.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-400"
                  >
                    LinkedIn
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                  </a>
                  <a
                    href={contato.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-400"
                  >
                    GitHub
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato Integrado ao Backend */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs dark:border-slate-800 dark:bg-[#0f1623]">
              <h3 className="text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                Enviar mensagem
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Preencha os campos abaixo. Os dados são validados pelo endpoint <code className="font-mono text-xs text-emerald-700 dark:text-emerald-400">POST /api/contato</code>.
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                {/* Honeypot anti-bot oculto */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Não preencha este campo</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Nome */}
                  <div>
                    <label
                      htmlFor="contato-nome"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Nome *
                    </label>
                    <input
                      id="contato-nome"
                      name="nome"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.nome}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      aria-invalid={Boolean(fieldErrors.nome)}
                      aria-describedby={fieldErrors.nome ? 'erro-nome' : undefined}
                      className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors dark:bg-[#0b101b] dark:text-slate-100 ${
                        fieldErrors.nome
                          ? 'border-red-500 bg-red-50/30 dark:border-red-500/80 dark:bg-red-950/20'
                          : 'border-slate-300 bg-white focus:border-emerald-500 dark:border-slate-700'
                      }`}
                    />
                    {fieldErrors.nome && (
                      <p id="erro-nome" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                        {fieldErrors.nome}
                      </p>
                    )}
                  </div>

                  {/* E-mail */}
                  <div>
                    <label
                      htmlFor="contato-email"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      E-mail *
                    </label>
                    <input
                      id="contato-email"
                      name="email"
                      type="email"
                      required
                      maxLength={150}
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu.email@empresa.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'erro-email' : undefined}
                      className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors dark:bg-[#0b101b] dark:text-slate-100 ${
                        fieldErrors.email
                          ? 'border-red-500 bg-red-50/30 dark:border-red-500/80 dark:bg-red-950/20'
                          : 'border-slate-300 bg-white focus:border-emerald-500 dark:border-slate-700'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="erro-email" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Assunto */}
                <div>
                  <label
                    htmlFor="contato-assunto"
                    className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    Assunto *
                  </label>
                  <input
                    id="contato-assunto"
                    name="assunto"
                    type="text"
                    required
                    maxLength={140}
                    value={formData.assunto}
                    onChange={handleChange}
                    placeholder="Ex.: Oportunidade Desenvolvedor .NET / Engenharia de Software"
                    aria-invalid={Boolean(fieldErrors.assunto)}
                    aria-describedby={fieldErrors.assunto ? 'erro-assunto' : undefined}
                    className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors dark:bg-[#0b101b] dark:text-slate-100 ${
                      fieldErrors.assunto
                        ? 'border-red-500 bg-red-50/30 dark:border-red-500/80 dark:bg-red-950/20'
                        : 'border-slate-300 bg-white focus:border-emerald-500 dark:border-slate-700'
                    }`}
                  />
                  {fieldErrors.assunto && (
                    <p id="erro-assunto" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                      {fieldErrors.assunto}
                    </p>
                  )}
                </div>

                {/* Mensagem */}
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contato-mensagem"
                      className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Mensagem *
                    </label>
                    <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                      {formData.mensagem.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contato-mensagem"
                    name="mensagem"
                    rows={4}
                    required
                    maxLength={2000}
                    value={formData.mensagem}
                    onChange={handleChange}
                    placeholder="Descreva como posso contribuir com sua equipe ou projeto..."
                    aria-invalid={Boolean(fieldErrors.mensagem)}
                    aria-describedby={fieldErrors.mensagem ? 'erro-mensagem' : undefined}
                    className={`mt-1.5 w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors dark:bg-[#0b101b] dark:text-slate-100 ${
                      fieldErrors.mensagem
                        ? 'border-red-500 bg-red-50/30 dark:border-red-500/80 dark:bg-red-950/20'
                        : 'border-slate-300 bg-white focus:border-emerald-500 dark:border-slate-700'
                    }`}
                  />
                  {fieldErrors.mensagem && (
                    <p id="erro-mensagem" className="mt-1 text-xs font-medium text-red-600 dark:text-red-400">
                      {fieldErrors.mensagem}
                    </p>
                  )}
                </div>

                {/* Botões de Ação do Formulário */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        Processando na API...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        Validar e preparar envio
                      </>
                    )}
                  </button>

                  <a
                    href={fallbackLinks.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-500/40 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-emerald-400"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    Conversar pelo WhatsApp
                  </a>
                </div>

                {/* Estado de Erro */}
                {status === 'error' && errorMessage && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs sm:text-sm text-red-800 dark:border-red-500/30 dark:bg-red-950/40 dark:text-red-200"
                  >
                    <div className="flex items-start gap-2.5">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
                      <div className="space-y-2">
                        <p className="font-semibold">{errorMessage}</p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={fallbackLinks.mailtoUrl}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-red-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-800"
                          >
                            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                            Abrir no cliente de e-mail
                          </a>
                          <a
                            href={fallbackLinks.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-400/50 bg-white px-3 py-1.5 text-xs font-semibold text-red-800 dark:bg-slate-900 dark:text-red-200"
                          >
                            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            Enviar via WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Estado de Resposta da API (Com transparência sobre configuração de e-mail) */}
                {status === 'success' && apiResponse && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border p-5 text-xs sm:text-sm ${
                      apiResponse.emailEnviado
                        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100'
                        : 'border-amber-500/40 bg-amber-500/10 text-slate-800 dark:border-amber-500/30 dark:bg-amber-950/30 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {apiResponse.emailEnviado ? (
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <Info
                          className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400"
                          aria-hidden="true"
                        />
                      )}
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-bold">
                            {apiResponse.emailEnviado
                              ? 'E-mail enviado com sucesso!'
                              : 'Dados validados pela API — Conclua o envio pelo canal direto de sua preferência'}
                          </span>
                          {apiResponse.protocolo && (
                            <span className="rounded-md bg-white/80 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                              Protocolo: {apiResponse.protocolo}
                            </span>
                          )}
                        </div>

                        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
                          {apiResponse.mensagem}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <a
                            href={apiResponse.canaisAlternativos?.mailtoUrl || fallbackLinks.mailtoUrl}
                            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                          >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            Abrir cliente de e-mail com mensagem pronta
                          </a>
                          <a
                            href={apiResponse.canaisAlternativos?.whatsappUrl || fallbackLinks.whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 transition-colors hover:border-emerald-500/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                          >
                            <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                            Enviar pelo WhatsApp com texto preenchido
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
