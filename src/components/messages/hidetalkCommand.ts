import { CommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import { getContentInformationsFromUrl } from '../../services/content-utils';
import { deleteGtts, promisedGtts, readGttsAsStream } from '../../services/gtts';
import { QueueType } from '../../services/prisma/loadPrisma';
import { getDurationFromGuildId } from '../../services/utils';

export const hideTalkCommand = () => ({
  data: new SlashCommandBuilder()
    .setName(rosetty.t('hideTalkCommand')!)
    .setDescription(rosetty.t('hideTalkCommandDescription')!)
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addStringOption((option) =>
      option
        .setName(rosetty.t('hideTalkCommandOptionVoice')!)
        .setDescription(rosetty.t('hideTalkCommandOptionVoiceDescription')!)
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName(rosetty.t('hideTalkCommandOptionText')!)
        .setDescription(rosetty.t('hideTalkCommandOptionTextDescription')!),
    ),
  handler: async (interaction: CommandInteraction) => {
    const text = interaction.options.get(rosetty.t('hideTalkCommandOptionText')!)?.value;
    const voice = interaction.options.get(rosetty.t('hideTalkCommandOptionVoice')!)?.value;

    const filePath = await promisedGtts(voice, rosetty.getCurrentLang());

    const fileStream = readGttsAsStream(filePath);

    const interactionReply = await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(rosetty.t('success')!)
          .setDescription(rosetty.t('hideTalkCommandAnswer')!)
          .setColor(0x2ecc71),
      ],
      files: [fileStream],
      flags: MessageFlags.Ephemeral,
    });

    const message = await interactionReply.fetch();
    const media = message.attachments.first()?.proxyURL;

    const additionalContent = await getContentInformationsFromUrl(media as string);

    await deleteGtts(filePath);

    await prisma.queue.create({
      data: {
        content: JSON.stringify({
          text,
          media,
          mediaContentType: 'audio/mpeg',
          mediaDuration: Math.ceil(additionalContent.mediaDuration),
        }),
        type: QueueType.VOCAL,
        discordGuildId: interaction.guildId!,
        duration: await getDurationFromGuildId(
          additionalContent.mediaDuration ? Math.ceil(additionalContent.mediaDuration) : undefined,
          interaction.guildId!,
        ),
      },
    });
  },
});
