import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const setMaxTimeCommand = () => ({
  data: new SlashCommandBuilder()
    .setName(rosetty.t('setMaxTimeCommand')!)
    .setDescription(rosetty.t('setMaxTimeCommandDescription')!)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addIntegerOption((option) =>
      option
        .setName(rosetty.t('setMaxTimeCommandOptionText')!)
        .setDescription(rosetty.t('setMaxTimeCommandOptionTextDescription')!)
        .setRequired(true),
    ),
  handler: async (interaction: CommandInteraction) => {
    const number = interaction.options.get(rosetty.t('setMaxTimeCommandOptionText')!)?.value as number;

    await prisma.guild.upsert({
      where: {
        id: interaction.guildId!,
      },
      create: {
        id: interaction.guildId!,
        maxMediaTime: number || null,
      },
      update: {
        maxMediaTime: number || null,
      },
    });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(rosetty.t('success')!)
          .setDescription(rosetty.t('setMaxTimeCommandAnswer')!)
          .setColor(0x2ecc71),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
});
