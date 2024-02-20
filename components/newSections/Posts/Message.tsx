import { Attachment, Embed } from "../SecondSection.tsx";
import Image from "apps/website/components/Image.tsx";

interface Props {
  content: string;
  embeds?: Embed[];
  attachments?: Attachment[];
}

export default function Message({ content, embeds, attachments }: Props) {
  console.log("embed", embeds);

  return (
    <div class="flex flex-col pl-[40px] gap-2">
      <span
        class="text-[#A1A1AA] text-lg"
        dangerouslySetInnerHTML={{ __html: content.replaceAll("\n", "<br>") }}
      >
      </span>
      {embeds && embeds.map((embed) => {
        return (
          <div class="flex flex-col gap-2 px-2 my-2 border-l-2 border-l-[#02F67C]">
            <span class="text-lg text-[#a1a1aaa6]">{embed.provider.name}</span>
            <span class="text-lg text-[#A1A1AA]">{embed.author.name}</span>
            <span class="text-lg text-[#ffff]">{embed.title}</span>
            <iframe
              width="350"
              height="250"
              class="w-full h-[revert-layout]"
              src={embed.video.url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            >
            </iframe>
          </div>
        );
      })}
      {attachments && attachments.map((img) => {
        return (
          <Image
            width={350}
            height={250}
            class="w-full h-auto object-cover"
            src={img.url}
            alt={img.filename}
          />
        );
      })}
    </div>
  );
}
