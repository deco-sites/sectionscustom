import { Attachment, Embed } from "../SecondSection.tsx";
import Image from "apps/website/components/Image.tsx";
import { CSS, KATEX_CSS, render } from "https://deno.land/x/gfm/mod.ts";

interface Props {
  content: string;
  embeds?: Embed[];
  attachments?: Attachment[];
}

export default function Message({ content, embeds, attachments }: Props) {

  return (
    <div class="flex flex-col pl-[50px] gap-2 w-full">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <style dangerouslySetInnerHTML={{ __html: KATEX_CSS }} />
      <span
        class="w-full break-words markdown-body "
        dangerouslySetInnerHTML={{ __html: render(content) }}
        style={{
          background: "transparent",
          color: "#A1A1AA",
          fontSize: "1.125rem",
          fontFamily: "Albert Sans",
        }}
      >
      </span>
      {embeds && embeds.map((embed) => (
        <div>
          {embed.type === "video"
            ? (
              <div class="flex flex-col gap-2 px-2 my-2 border-l-2 border-l-[#02F67C]">
                <span class="text-lg text-[#a1a1aaa6]">
                  {embed.provider.name ?? ""}
                </span>
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
            )
            : embed.type === "article"
            ? (
              <div class="flex flex-col gap-2 px-2 my-2 border-l-2 border-l-[#1e1f22]">
                <a href={embed.url} class="text-lg text-[#0087ff]">
                  {embed.title}
                </a>
                <span
                  dangerouslySetInnerHTML={{
                    __html: embed.description.replaceAll("\n", "<br>"),
                  }}
                  class="text-lg text-white"
                >
                </span>
                <Image
                  width={350}
                  height={250}
                  class="w-full h-auto object-cover rounded-md"
                  src={embed.thumbnail.url}
                  alt={embed.title}
                />
              </div>
            )
            : embed.type === "link"
            ? (
              <div class="flex flex-col gap-2 p-2 border-l-2 border-l-[#003232] rounded-md bg-[#252b2b9e]">
                {embed.provider && (
                  <span class="text-sm text-[#a1a1aaa6]">
                    {embed.provider.name}
                  </span>
                )}
                <a href={embed.url} class="text-lg text-[#0087ff]">
                  {embed.title}
                </a>
                <span
                  dangerouslySetInnerHTML={{
                    __html: embed.description.replaceAll("\n", "<br>"),
                  }}
                  class="text-base text-white"
                >
                </span>
              </div>
            )
            : (null)}
        </div>
      ))}
      {attachments && attachments.map((img) => {
        return (
          <Image
            width={350}
            height={250}
            class="w-full h-auto object-cover rounded-md"
            src={img.url}
            alt={img.filename}
          />
        );
      })}
    </div>
  );
}
