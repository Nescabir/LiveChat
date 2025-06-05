import { CommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const howToCommand = () => ({
  data: new SlashCommandBuilder()
    .setName(rosetty.t('howToCommand')!)
    .setDescription(rosetty.t('howToCommandDescription')!)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  handler: async (interaction: CommandInteraction) => {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(rosetty.t('howToUseTitle')!)
          .setDescription(rosetty.t('howToUseDescription')!)
          .setColor(0x3498db),
      ],
    });
  },
});
