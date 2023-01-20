const {SlashCommandBuilder}=require('discord.js');

module.exports={

    data: new SlashCommandBuilder()
        .setName('whoami')
        .setDescription('Provides information about you'),
    async execute(interaction){
        await interaction.reply(`You are not just a dissappointment,but you are an embarassment to ${interaction.user.username}.`);
    },

};