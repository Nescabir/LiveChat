import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const setDisplayMediaFullCommand = () => ({
  data: new SlashCommandBuilder()
    .setName(rosetty.t('setDisplayMediaFullCommand')!)
    .setDescription(rosetty.t('setDisplayMediaFullCommandDescription')!)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addBooleanOption((option) =>
      option
        .setName(rosetty.t('setDisplayMediaFullCommandOptionText')!)
        .setDescription(rosetty.t('setDisplayMediaFullCommandOptionTextDescription')!)
        .setRequired(true),
    ),
  handler: async (interaction: CommandInteraction) => {
    const value = interaction.options.get(rosetty.t('setDisplayMediaFullCommandOptionText')!)?.value as boolean;

    await prisma.guild.upsert({
      where: {
        id: interaction.guildId!,
      },
      create: {
        id: interaction.guildId!,
        displayMediaFull: value,
      },
      update: {
        displayMediaFull: value,
      },
    });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(rosetty.t('success')!)
          .setDescription(rosetty.t('setDisplayMediaFullCommandAnswer')!)
          .setColor(0x2ecc71),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
});
