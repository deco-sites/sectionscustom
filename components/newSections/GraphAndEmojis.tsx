import ButtonTab from "$store/islands/ButtonTab.tsx";
import Article from "$store/islands/Article.tsx";
import ButtonLink from "$store/components/newSections/ButtonLink.tsx";
import Graph from "./Graph/Graph.tsx";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";
import type { SectionProps } from "deco/mod.ts";
import Member from "./Posts/Member.tsx";
import Message from "./Posts/Message.tsx";
import EmojisCommunity from "./EmojisCommunity.tsx";
import type { Props as EmojisCommunityProps } from "./EmojisCommunity.tsx";

export interface Props {
  title: string;
  /**
   * @format html
   */
  subTitle: string;

  graph: {
    title: string;
    buttonLabel: string;
    buttonHref: string;
  };
  posts: {
    title: string;
    buttonLabel: string;
    buttonHref: string;
    quantity: number;
  };
  emojiCommunity: EmojisCommunityProps;
}

export interface Embed {
  type: string;
  url: string;
  title: string;
  description: string;
  color: number;
  author: {
    name: string;
    url: string;
  };
  provider: {
    name: string;
    url: string;
  };
  thumbnail: {
    url: string;
    proxy_url: string;
    placeholder: string;
  };
  video: {
    url: string;
    placeholder: string;
  };
  mentions: {
    id: string;
    username: string;
    avatar: string;
  };
}

export interface Attachment {
  id: string;
  filename: string;
  url: string;
  proxy_url: string;
  content_type: string;
  placeholder: string;
  width: number;
  height: number;
}
interface Menssage {
  id: string;
  type: number;
  author: {
    id: string;
    username: string;
    avatar?: string;
    global_name: string;
  };
  content: string;
  timestamp: string;
  embeds: Embed[];
  attachments: Attachment[];
}

interface Chat {
  id?: string;
  avatar?: string;
  name: string;
  content?: string;
  timestamp: string;
  image: string;
  embeds?: Embed[];
  attachments?: Attachment[];
  team_deco?: boolean;
}

interface MemberGuid {
  joined_at: string;
  user: {
    id: string;
  };
}

const BASE_PROPS = {
  title: "Growing community",
  subTitle:
    "<p>Unlock advanced audience insights and comprehensive&nbsp;<br>system observability for optimal perfomance</p>",
  graph: {
    title: "Community members",
    buttonLabel: "Join",
    buttonhref: "#",
  },
  posts: {
    title: "Latest Posts",
    buttonLabel: "Join our discord server",
    buttonHref: "#",
  },
};

export async function loader({ props }: { props: Props }, _req: Request) {
  const token = Deno.env.get("API_TOKEN");
  const server = Deno.env.get("ID_SERVER");
  const channel = Deno.env.get("ID_CHANNEL");

  const apiUrlMessages = `https://discord.com/api/channels/${channel}/messages`;

  const chat: Chat[] = [];

  const response = await fetch(apiUrlMessages + "?limit=10", {
    method: "GET",
    headers: {
      Authorization: `Bot ${token}`,
    },
  }).then((r) => r.json());

  // console.log("res", response);
  response.map(async (r: Menssage) => {
    function getImage(r: Menssage) {
      return r.author.avatar
        ? `https://cdn.discordapp.com/avatars/${r.author.id}/${r.author.avatar}.webp`
        : "https://discord.com/assets/1697e65656e69f0dbdbd.png";
    }

    async function getRole(r: Menssage) {
      const member: MemberGuid = await fetch(
        `https://discord.com/api/guilds/${server}/members/${r.author.id}?limit=100`,
        {
          method: "GET",
          headers: {
            Authorization: `Bot ${token}`,
          },
        },
      ).then((r) => r.json());

      return member;
    }

    const [urlImage, member] = await Promise.all([
      getImage(r),
      getRole(r),
    ]);

    if (r.type !== 18) {
      chat.push({
        id: r.id,
        name: r.author.global_name,
        content: r.content,
        timestamp: r.timestamp,
        image: urlImage,
        embeds: r.embeds,
        attachments: r.attachments,
        // team_deco: member.roles?.includes("1032349015234334800")
      });
    }
  });
  interface MemberGuid {
    user: { id: string };
    joined_at: string; // Certifique-se de que joined_at seja do tipo string
    roles?: string[];
  }

  const apiUrl = `https://discord.com/api/guilds/${server}/members`;

  const allMembers: Array<MemberGuid> = [];
  let hasMore = true;
  let after: string | null = null;
  let totalMembers = 0;

  const membersByMonth: { [month: string]: { count: number; total: number } } =
    {};
  let sortedMembersByMonth: {
    month: string;
    count: number;
    total: number;
  }[] = [];

  try {
    while (hasMore) {
      const responseM: Array<MemberGuid> = await fetch(
        `${apiUrl}?limit=1000${after ? `&after=${after}` : ""}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bot ${token}`,
          },
        },
      ).then((r) => r.json());

      if (responseM && responseM.length > 0) {
        responseM.forEach((member: MemberGuid) => {
          allMembers.push({
            user: { id: member.user.id },
            joined_at: member.joined_at,
          });
          const joinedDate = new Date(member.joined_at);
          if (joinedDate.getFullYear() >= 2023) {
            totalMembers++;
          }
        });

        if (responseM.length < 1000) {
          hasMore = false;
        } else {
          after = responseM[responseM.length - 1].user.id;
        }
      } else {
        hasMore = false;
      }
    }

    // Agrupar membros por mês
    allMembers.forEach((member, index) => {
      const joinedDate = new Date(member.joined_at);
      const year = joinedDate.getFullYear();

      if (year >= 2023) {
        const monthKey = `${year}-${joinedDate.getMonth() + 1}`;

        totalMembers--;

        if (membersByMonth[monthKey]) {
          membersByMonth[monthKey].count++;
          membersByMonth[monthKey].total = allMembers.length - totalMembers;
        } else {
          membersByMonth[monthKey] = {
            count: 1,
            total: allMembers.length,
          };
        }
      }
    });

    // Converter o objeto para um array de objetos
    sortedMembersByMonth = Object.keys(membersByMonth).map((key) => ({
      month: key,
      count: membersByMonth[key].count,
      total: membersByMonth[key].total,
    }));

    // Ordenar o array por data
    sortedMembersByMonth.sort((a, b) =>
      new Date(a.month).getTime() - new Date(b.month).getTime()
    );
  } catch (error) {
    console.error("Erro na requisição:", error);
  }

  return { chat, sortedMembersByMonth, ...props };
}

export default function PrimarySection(
  { ...props }: SectionProps<typeof loader>,
) {
  const {
    title,
    subTitle,
    graph,
    posts,
    chat,
    sortedMembersByMonth,
    emojiCommunity,
  } = {
    ...BASE_PROPS,
    ...props,
  };

  return (
    <div class="w-full h-full bg-[#000]">
      <div class="container max-w-[1280px] mx-auto flex justify-center flex-col w-full py-8 md:py-10 px-4 lg:py-20">
        <h2 class="text-[32px] md:text-[64px] text-white font-medium text-center mb-4">
          {title}
        </h2>
        <span
          class="text-center text-base md:text-xl text-[#A1A1AA] mb-20"
          dangerouslySetInnerHTML={{ __html: subTitle }}
        >
        </span>
        <div class="flex lg:flex-row w-full gap-4 flex-col">
          <div class="flex flex-col w-full lg:w-[60%] bg-[#ffffff0d] rounded-3xl p-4 lg:p-8 gap-4 container">
            <div class="flex flex-row justify-start items-center rounded-2xl gap-4">
              <Icon id="DecoGreen" size={32} />
              <h4 class="text-white font-light text-2xl text-start">
                {graph.title}
              </h4>
            </div>

            <div class="flex flex-row w-full justify-between items-center p-3 rounded-3xl bg-[#000]">
              <Graph props={sortedMembersByMonth} />
            </div>
          </div>
          <div class=" w-full lg:w-[40%] h-full]">
            <EmojisCommunity
              buttons={emojiCommunity.buttons}
              title={emojiCommunity.title}
              button={emojiCommunity.button}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
