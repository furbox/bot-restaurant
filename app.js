require("dotenv").config();
global.session = {};
const { createBot, createProvider, createFlow } = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MySQLAdapter = require("@bot-whatsapp/database/mysql");

/**
 * GPT
 */
const ChatGPTClass = require("./gpt.class");
const chatGPT = new ChatGPTClass();

/**
 * Flows
 */

const flowPrincipal = require("./src/flows/flowPrincipal");
const { flowMenu } = require("./src/flows/flowMenu");
const flowLocal = require("./src/flows/flowLocal");
const flowInstrucciones = require("./src/flows/flowInstrucciones");
const flowTerminar = require("./src/flows/flowTerminar");
const flowDomicilio = require("./src/flows/flowDomicilio");
const flowComentario = require("./src/flows/flowComentario");
const { flowAssistant } = require("./src/flows/flowAssistant");

const main = async () => {
  const adapterDB = new MySQLAdapter({
    host: process.env.MYSQL_DB_HOST,
    user: process.env.MYSQL_DB_USER,
    database: process.env.MYSQL_DB_NAME,
    password: process.env.MYSQL_DB_PASSWORD,
    port: process.env.MYSQL_DB_PORT,
  });
  const adapterFlow = createFlow([
    flowPrincipal,
    flowTerminar,
    flowDomicilio,
    flowComentario,
    flowInstrucciones,
    flowLocal,
    flowMenu(),
    flowAssistant(chatGPT),
  ]);
  const adapterProvider = createProvider(BaileysProvider);
  createBot({
    flow: adapterFlow,
    provider: adapterProvider,
    database: adapterDB,
  });
  QRPortalWeb();
};

main();
