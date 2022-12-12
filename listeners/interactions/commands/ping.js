const { InteractionType, SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction } = require("discord.js");
const InteractionHandler = require("../../../handlers/InteractionHandler");


const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Ping the bot/Get bot latency!');


/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(interaction){
    await interaction.reply(`Pong 🏓! \`${Date.now()-interaction.createdTimestamp}ms\``);
}

new InteractionHandler('ping')
    .setData(command)
    .setExecute(execute)
    .setTypes(InteractionType.ApplicationCommand)
    .handle();