const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

async function requestJson(endpoint, options = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), options.timeoutMs || 8000);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      const error = new Error(
        data?.mensagem || `Falha na comunicação com a API (HTTP ${response.status}).`
      );
      error.status = response.status;
      error.payload = data;
      throw error;
    }

    return { data, status: response.status };
  } catch (err) {
    if (err.name === 'AbortError') {
      const timeoutError = new Error('Tempo limite excedido ao conectar com a API do portfólio.');
      timeoutError.isNetworkError = true;
      throw timeoutError;
    }
    if (!err.status) {
      err.isNetworkError = true;
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchPortfolioData() {
  const { data } = await requestJson('/api/portfolio', { method: 'GET' });
  return data;
}

export async function fetchHealthStatus() {
  const { data } = await requestJson('/api/health', { method: 'GET', timeoutMs: 5000 });
  return data;
}

export async function submitContactForm(formData) {
  const { data, status } = await requestJson('/api/contato', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
  return { data, status };
}
