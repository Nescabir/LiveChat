import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const setDefaultTimeCommand = () => ({
  data: new SlashCommandBuilder()
    .setName(rosetty.t('setDefaultTimeCommand')!)
    .setDescription(rosetty.t('setDefaultTimeCommandDescription')!)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addIntegerOption((option) =>
      option
        .setName(rosetty.t('setDefaultTimeCommandOptionText')!)
        .setDescription(rosetty.t('setDefaultTimeCommandOptionTextDescription')!)
        .setRequired(true),
    ),
  handler: async (interaction: CommandInteraction) => {
    const number = interaction.options.get(rosetty.t('setDefaultTimeCommandOptionText')!)?.value as number;

    await prisma.guild.upsert({
      where: {
        id: interaction.guildId!,
      },
      create: {
        id: interaction.guildId!,
        defaultMediaTime: number || null,
      },
      update: {
        defaultMediaTime: number || null,
      },
    });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(rosetty.t('success')!)
          .setDescription(rosetty.t('setDefaultTimeCommandAnswer')!)
          .setColor(0x2ecc71),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
});
