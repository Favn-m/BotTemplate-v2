const { InteractionType, SlashCommandBuilder, ContextMenuCommandBuilder, BaseInteraction } = require('discord.js');
const client = require('..');

module.exports=class InteractionHandler{
    #name;
    #execute;
    #type;
    #data;

    /**
     * 
     * @param {String} name 
     */
    constructor(name){
        this.#execute = null;
        this.#name    = name;
        this.#type    = null;
        this.#data    = null;
    }

    /**
     * 
     * @param {InteractionType} types 
     */
    setTypes(types){
        this.#type = types;
        return this;
    }

    /**
     * 
     * @param {import('discord.js').ClientEvents} name 
     * @returns 
     */
    setName(name){
        this.#name = name;
        return this;
    }

    /**
     * @callback execute
     * @param {BaseInteraction} interaction
     */

    /**
     * 
     * @param {execute} callback 
     * @returns 
     */
    setExecute(callback){
        this.#execute = callback;
        return this;
    }

    /**
     * 
     * @param {SlashCommandBuilder|ContextMenuCommandBuilder} data 
     * @returns 
     */
    setData(data){
        this.#data = data;
        return this;
    }

    get execute(){
        return this.#execute;
    }

    get name(){
        return this.#name;
    }

    /**
     * @returns {InteractionType}
     */
    get type(){
        return this.#type;
    }

    /**
     * @returns {SlashCommandBuilder|ContextMenuCommandBuilder}
     */
    get data(){
        return this.#data;
    }

    /**
     * Builds event and starts handling
     */
    handle(){
        console.log(client.interactions);
        client.interactions.set(this.name, this);
    }
}