const { BaseInteraction, InteractionType } = require("discord.js");
const EventHandler = require("../../handlers/EventHandler");

/**
 * 
 * @param {BaseInteraction} interaction 
 */
async function execute(interaction){
    /** @type {import('../../BotClient')} */
    const client = interaction.client;
    try{
        if(interaction.isMessageComponent()||interaction.isModalSubmit()){
            await client.interactions.get(interaction.customId).execute(interaction);
        } else if(interaction.isCommand()||interaction.isAutocomplete()){
            await client.interactions.get(interaction.commandName).execute(interaction);
        }
    } catch(e) { console.log(e); }
}


new EventHandler('interactionCreate')
    .setExecute(execute)
    .handle();