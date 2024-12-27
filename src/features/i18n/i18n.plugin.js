const fp = require('fastify-plugin');
const path = require('path');
const fs = require('fs');

const defaultLanguage = 'en-US';

async function i18n(fastify, options) {
  const locales = {};
  
  const localeDir = path.join(__dirname, './locales');
  const files = fs.readdirSync(localeDir);
  for (const file of files) {
    const lang = path.basename(file, '.json');
    locales[lang] = require(path.join(localeDir, file));
  }

  fastify.decorateRequest('i18n', null);

  fastify.addHook('preHandler', (request, reply, done) => {
    const language = request.headers['x-language'] || defaultLanguage;

    request.i18n = locales[language] || locales[defaultLanguage];

    done();
  });
}

module.exports = fp(i18n);