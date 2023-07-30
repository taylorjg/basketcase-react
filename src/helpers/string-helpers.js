export const applyQuotesIfNecessary = (s) => (/\W/.test(s) ? `"${s}"` : s);
