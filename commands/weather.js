const {SlashCommandBuilder}=require('discord.js');

module.exports={

    data: new SlashCommandBuilder()
        .setName('weather')
        .setDescription('Provides information about the current weather'),
    async execute(interaction){
        await interaction.reply(`The weather today is hot and sunny, just like you!`);
    },

};