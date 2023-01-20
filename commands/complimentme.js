const {SlashCommandBuilder}=require('discord.js');

module.exports={

    data: new SlashCommandBuilder()
        .setName('complimentme')
        .setDescription('compliments you'),
    async execute(interaction){
        await interaction.reply(`You have a face that could make a blind person see!.`);
    },

};