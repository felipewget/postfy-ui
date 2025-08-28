/**
 * Cria ou atualiza um cookie.
 * @param {string} key - A chave do cookie.
 * @param {string} value - O valor do cookie.
 * @param {Object} options - Opções adicionais (ex: `expires`, `path`, `secure`).
 */
export const createCookie = (key, value, options = {}) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Cookie key must be a non-empty string.');
  }

  if (typeof value !== 'string') {
    throw new Error('Cookie value must be a string.');
  }

  let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

  // Define o padrão de expiração para 3 meses se não for informado
  if (!options.expires) {
    const defaultExpiration = new Date();
    defaultExpiration.setDate(defaultExpiration.getDate() + 90); // 90 dias
    cookieString += `; expires=${defaultExpiration.toUTCString()}`;
  } else {
    const expires =
      options.expires instanceof Date
        ? options.expires.toUTCString()
        : new Date(options.expires).toUTCString();
    cookieString += `; expires=${expires}`;
  }

  cookieString += `; path=${options.path || '/'}`; // Caminho padrão: root

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    const validSameSite = ['Strict', 'Lax', 'None'].includes(options.sameSite);
    if (!validSameSite) {
      throw new Error(
        'Invalid sameSite value. Must be "Strict", "Lax", or "None".'
      );
    }
    cookieString += `; samesite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

/**
 * Obtém um cookie pelo nome.
 * @param {string} key - O nome do cookie.
 * @returns {string|null} - Retorna o valor do cookie ou `null` se não existir.
 */
export const getCookie = (key) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Cookie key must be a non-empty string.');
  }

  const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
    const [cookieKey, cookieValue] = cookie.split('=');
    if (cookieKey && cookieValue) {
      acc[decodeURIComponent(cookieKey)] = decodeURIComponent(cookieValue);
    }
    return acc;
  }, {});

  return cookies[key] || null;
};

/**
 * Deleta um cookie.
 * @param {string} key - A chave do cookie a ser deletado.
 * @param {Object} options - Opções adicionais como `path` e `domain`.
 */
export const deleteCookie = (key, options = {}) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Cookie key must be a non-empty string.');
  }

  createCookie(key, '', {
    expires: 'Thu, 01 Jan 1970 00:00:00 UTC',
    path: options.path || '/',
    domain: options.domain,
  });
};

/**
 * Atualiza um cookie existente.
 * @param {string} key - A chave do cookie.
 * @param {string} value - O novo valor do cookie.
 * @param {Object} options - Opções adicionais para o cookie.
 */
export const updateCookie = (key, value, options = {}) => {
  if (!key || typeof key !== 'string') {
    throw new Error('Cookie key must be a non-empty string.');
  }

  if (typeof value !== 'string') {
    throw new Error('Cookie value must be a string.');
  }

  createCookie(key, value, options);
};