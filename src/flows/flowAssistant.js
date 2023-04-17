const { addKeyword } = require("@bot-whatsapp/bot");
const menuCtrl = require("../controllers/menuController");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "AssistantPromp.txt"), "utf-8");
  return text;
};

module.exports = {
  flowAssistant: (chatgptClass) => {
    return addKeyword("PLATILLOS", { sensitive: true })
      .addAction(async (ctx, { flowDynamic, provider }) => {
        await flowDynamic("Consultando el menu del dia...");
        const jid = ctx.key.remoteJid;
        const refProvider = await provider.getInstance();

        await refProvider.presenceSubscribe(jid);
        await delay(500);

        await refProvider.sendPresenceUpdate("composing", jid);
        const menu = await menuCtrl.getMenu();
        const menutxt = menu.map((m) => {
          const gu = m.menu_guarnicion == 1 ? "Si" : "No";
          return `${m.menu_id}.- *${m.menu_name}* - ${m.menu_desc} \nGuarnicion: ${gu}\nOrden:  ${m.menu_price_orden}, Media: $ ${m.menu_price_media}\n`;
        });
        const guarniciones = await menuCtrl.getGuarniciones();
        const guarnicionestxt = guarniciones.map((g) => {
          return `${g.guarnicion_id}.- *${g.guarnicion_name}*\n`;
        });
        const data = await getPrompt(); //TXT

        await chatgptClass.handleMsgChatGPT(data); //OK

        await refProvider.sendPresenceUpdate("paused", jid);

        const textFromAI = await chatgptClass.handleMsgChatGPT(
          `lista_de_menu="${menutxt.toString()}", lista_guarniciones="${guarnicionestxt.toString()}"`
        );
        await flowDynamic(textFromAI.text);
      })
      .addAnswer(
        `¿Te interesa?`,
        { capture: true },
        async (ctx, { fallBack }) => {
          const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
          await fallBack(textFromAI.text);
        }
      );
  },
};
