import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const helpCommand = () => ({
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('List of Commands')
    .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
  handler: async (interaction: CommandInteraction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle('Commands :')
          .setDescription(global.commandsLoaded.map((v) => `\`/${v}\``).join(', ')),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
});
