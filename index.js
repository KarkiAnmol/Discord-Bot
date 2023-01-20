//main entry point of the program
const dotenv=require('dotenv')//importing dotenv
dotenv.config(); //loading environment variablse from .env file

// fs, a Node's native file system module, is used to read the commands directory and identify our command files.
const fs = require('node:fs');

// The path module is Node's native path utility module. path helps construct paths to access files and directories.
const path = require('node:path');

//importing the necessary discord classes
const { Client, Events, GatewayIntentBits } = require('discord.js'); 


//creating a new instance of the client class
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

//attaching a .commands property to the client instance to access commands in other files
//Collection class is used to store and efficiently retrieve commands for execution.
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

//Creating a listener for the event 'InteractionCreate' that will execute code when the application recieves an interaction
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
	//trying to get the matching command from the client.commands collection based on the interaction.commandName.
	const command = interaction.client.commands.get(interaction.commandName);
    
	//If no matching command is found the event is ignored and an error message is logged to the console.
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});


//logging in the bot
client.login(process.env.DISCORDJS_BOT_TOKEN);

