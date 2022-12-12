const client = require('..');

module.exports=class EventHandler{
    /**
     * 
     * @param {import('discord.js').ClientEvents} event 
     */
    constructor(event){
        this.execute  = null;
        this.name     = event;
        this.once     = false;
    }

    get client(){
        return client;
    }

    /**
     * 
     * @param {import('discord.js').ClientEvents} name 
     * @returns 
     */
    setName(name){
        this.name = name;
        return this;
    }

    /**
     * 
     * @param {Function} callback 
     * @returns 
     */
    setExecute(callback){
        this.execute = callback;
        return this;
    }

    /**
     * 
     * @param {boolean} once 
     * @returns 
     */
    setOnce(once=true){
        this.once = once;
        return this;
    }

    /**
     * Builds event and starts handling
     */
    handle(){
        if(this.once) client.once(this.name, this.execute);
        else client.on(this.name, this.execute);
    }
}