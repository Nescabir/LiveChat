import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const stopCommand = (fastify: FastifyCustomInstance) => ({
  data: new SlashCommandBuilder()
    .setName(rosetty.t('stopCommand')!)
    .setDescription(rosetty.t('stopCommandDescription')!)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  handler: async (interaction: CommandInteraction) => {
    fastify.io.to(`messages-${interaction.guildId!}`).emit('stop');

    await prisma.guild.update({
      where: {
        id: interaction.guildId!,
      },
      data: {
        busyUntil: null,
      },
    });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(rosetty.t('success')!)
          .setDescription(rosetty.t('stopCommandAnswer')!)
          .setColor(0x2ecc71),
      ],
      flags: MessageFlags.Ephemeral,
    });
  },
});
