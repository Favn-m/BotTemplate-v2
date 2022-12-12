const { InteractionType } = require('discord.js');
const Util = require('./Util');

module.exports = 
/**
 * 
 * @param {import('./BotClient')} client 
 */
async function deployCommands(client){
    return new Promise(async (resolve, reject)=>{
        const applicationCommands = await client.application.commands.fetch();
        
        const commands = []
        client.interactions.forEach(interaction=>{
            if(interaction.type!=InteractionType.ApplicationCommand) return;
            const command = applicationCommands.find((c)=>c.name==interaction.name);
            if(command&&Util.compareCommands(command, interaction.data)) return;
            console.log("Deployed new command: "+interaction.data.name);
            commands.push(interaction.data.toJSON());
        });
    
        if(commands.length>0) client.application.commands.set(client.interactions.map(e=>e.data.toJSON())).catch(reject);
        resolve(commands);
    })
}