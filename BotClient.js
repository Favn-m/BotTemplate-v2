const {Client, Collection} = require('discord.js');

class BotClient extends Client{
    #memberCount = 0;

    constructor(){
        super({intents:['Guilds', 'GuildMembers', 'MessageContent', 'GuildMessages', 'GuildVoiceStates']});

        /** 
         * @type {Collection<string, import('./handlers/InteractionHandler')>} 
         */
        this.interactions = new Collection();

        //Some listeners
        this.on('guildMemberAdd', ()=>this.#memberCount++);
        this.on('guildMemberRemove', ()=>this.#memberCount--);
    }

    /**
     * 
     * @param {Boolean} force 
     * @returns 
     */
    getTotalMemberCount(force){
        if(!force) return _memberCount;
        let result = 0;
        this.guilds.cache.each((guild)=>result+=guild.memberCount);

        this.#memberCount = result;
        return result;
    }
}

module.exports=BotClient;