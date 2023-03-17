const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sendimage')
		.setDescription('send your image to the dm channel')
        .addAttachmentOption(Option => Option.setName('image').setDescription('your image').setRequired(true)),

	async execute(interaction) {
		
		const image = interaction.options.getAttachment('image');
		const channel = interaction.client.channels.cache.get('1086283992287957202');
		channel.send({ files: [image] });

		
		await interaction.reply('Image sent, waiting for approval!');
	},
};