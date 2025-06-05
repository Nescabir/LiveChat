import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const infoCommand = () => ({
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Bot Informations')
    .setDefaultMemberPermissions(PermissionFlagsBits.UseApplicationCommands),
  handler: async (interaction: CommandInteraction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder().setTitle(`Developed by Quentin Laffont - Edited by NES - ${new Date().getFullYear()}`)
          .setDescription(`
          [LeStudio - Broadcast Software](https://lestudio.qlaffont.com)
          [GitHub](https://github.com/qlaffont)
          [Personal Website](https://qlaffont.com)
          `),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
});
