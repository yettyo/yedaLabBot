const { SlashCommandBuilder, userMention, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendimage')
		.setDescription('send your image to the dm channel')
        .addAttachmentOption(Option => Option.setName('image').setDescription('your image').setRequired(true))
		//add optional next option for the user to add a description to the image
		.addStringOption(Option => Option.setName('gamename').setDescription('what game is this?').setRequired(true))
		.addStringOption(Option => Option.setName('twitterusername').setDescription('let us know your twitter (optional)').setRequired(false)),

	async execute(interaction) {
		
		const image = interaction.options.getAttachment('image'); //takes the image.
		const game = interaction.options.getString('gamename'); //takes the game description.
		var twittername = "N/A"; //initialize twittername
		if (interaction.options.getString('twitterusername') != null) { //if the user adds a twitter username
			twittername = interaction.options.getString('twitterusername'); //set the twittername to the user input
		}
		await interaction.reply('Image sent, waiting for approval!');
		
		const channel = interaction.client.channels.cache.get('1086283992287957202'); //#sent-images channel
		channel.send({ 
			files: [image],
			//also attach the user information to the image
			content: `User: ${userMention(interaction.user.id)}, game: ${game}, twitter: ${twittername}`, //sends the image to #sent-images channel
			//Add buttons to this message
			components: [
				new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
								.setCustomId('approve')
								.setLabel('Approve')
								.setStyle(ButtonStyle.Success),
							)
					.addComponents(
						new ButtonBuilder()
								.setCustomId('deny')
								.setLabel('Deny')
								.setStyle(ButtonStyle.Danger))],
		}); 
	
		
		//when the user presses the button, do this
		interaction.client.on('interactionCreate', async interaction => {
			if (!interaction.isButton()) return;
			//if the button pressed is the approve button
			if (interaction.customId === 'approve') {
				//reply 'Image approved!' to the message
				//send the image to the #approved-images channel
				const approvedchannel = interaction.client.channels.cache.get('1086284008704458862'); //#approved-images channel
				await approvedchannel.send({
					files: [image],
					//also attach the user information to the image
					content: `User: ${userMention(interaction.user.id)}, game: ${game}, twitter: ${twittername}`, //sends the image to #sent-images channel
				});
				await interaction.reply('Image approved!');
				
				
			} else if (interaction.customId === 'deny') {
				//reply 'Image approved!' to the message
				//send the image to the #approved-images channel
				const approvedchannel = interaction.client.channels.cache.get('1086284040715374692'); //#approved-images channel
				await approvedchannel.send({
					files: [image],
					//also attach the user information to the image
					content: `User: ${userMention(interaction.user.id)}, game: ${game}, twitter: ${twittername}`, //sends the image to #sent-images channel
				});
				await interaction.reply('Image denied!');
			}
		});
	},
};