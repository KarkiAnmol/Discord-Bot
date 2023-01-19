//main entry point of the program
const dotenv=require('dotenv')//importing dotenv
dotenv.config(); //loading environment variablse from .env file

//importing the necessary discord classes
const { Client, Events, GatewayIntentBits } = require('discord.js'); 


//creating a new instance of the client class
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});



client.login(process.env.DISCORDJS_BOT_TOKEN);

