const Util = require('./Util');
const deployCommands = require('./deploy-commands');
const config = require('./config.json');

const BotClient = require('./BotClient');

const client = new BotClient();

client.once('ready', async ()=>{
    console.log("Initializing..");

    await deployCommands(client).then((commands)=>console.log(`Succesfully deployed ${commands.length} commands!`));

    console.log(`Initialized succesfully! Logged as ${client.user.tag}. Listening for ${client.getTotalMemberCount(true)} members!`);
});

Util.activateAll(__dirname+"\\listeners").then(()=>{
    console.log("Listeners are ready!")
});


client.login(config.token);


module.exports = client;