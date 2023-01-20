const {SlashCommandBuilder}=require('discord.js');

module.exports={

    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('replies a joke'),
    async execute(interaction){
        await interaction.reply(`Why did the tomato turn red? Because it saw the salad dressing!.`);
    },

};