const { ApplicationCommand, SlashCommandBuilder, ContextMenuCommandBuilder } = require('discord.js');
const fs = require('fs')

// ------------------ Public

/**
 * 
 * @param {String} path 
 * @param {Array<String>} exclusions 
 */
async function activateAll(path, exclusions){
    return await loop(path, exclusions);
}

/**
 * 
 * @param {ApplicationCommand} command 
 * @param {SlashCommandBuilder|ContextMenuCommandBuilder} builder 
 * @returns {boolean}
 */
function compareCommands(command, builder){
    if((!command&&builder)||(!builder&&command)) return false;
    if(builder.constructor.name=='SlashCommandBuilder'){
        return ApplicationCommand.optionsEqual(command.options, builder.options)
            && command.description==builder.description
            && command.name==builder.name
            && command.descriptionLocalizations==builder.description_localizations
            && command.nameLocalizations==builder.name_localizations;
    } else{
        return command.name==builder.name
            && command.type==builder.type
            && command.nameLocalizations==builder.name_localizations;
    }
}

// ------------------ Private

async function loop(path, exclusions){
    return new Promise(async (resolve, reject)=>{
        const promise = new Promise((resolve, reject)=>{
            fs.readdir(path, (err, files)=>{if(!err)resolve(files)});
        })
        const files = await promise;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if(!file.split('.')[1]&&!exclusions?.includes(file)){
                await loop(path+'\\'+file, exclusions);
            } else if(!exclusions?.includes(file)){
                require(path+'\\'+file);
            }
        }
        resolve(files);
    })
}

module.exports.activateAll     = activateAll;
module.exports.compareCommands = compareCommands;