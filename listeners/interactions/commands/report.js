const { InteractionType, SlashCommandBuilder, CommandInteraction, ChatInputCommandInteraction, ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const InteractionHandler = require("../../../handlers/InteractionHandler");


const command = new ContextMenuCommandBuilder()
    .setType(ApplicationCommandType.Message)
    .setName('Report Message');


/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 */
async function execute(interaction){
    await interaction.reply(`Pong 🏓! \`${Date.now()-interaction.createdTimestamp}ms\``);
}

new InteractionHandler(command.name)
    .setData(command)
    .setExecute(execute)
    .setTypes(InteractionType.ApplicationCommand)
    .handle();