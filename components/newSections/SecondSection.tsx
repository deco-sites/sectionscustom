import ButtonTab from "$store/islands/ButtonTab.tsx";
import Article from "$store/islands/Article.tsx";
import ButtonLink from "$store/components/newSections/ButtonLink.tsx";
import Graph from "./Graph/Graph.tsx";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

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

export default function PrimarySection({ props }: { props: Props }) {
  const { title, subTitle, graph, posts } = { ...BASE_PROPS, ...props };

  return (
    <div class="container max-w-[1280px] mx-auto flex justify-center flex-col w-full py-6 rounded-3xl px-4">
      <h2 class="text-5xl lg:text-7xl text-white font-medium text-center mb-9">
        {title}
      </h2>
      <span
        class="text-center text-lg text-[#A1A1AA]"
        dangerouslySetInnerHTML={{ __html: subTitle }}
      >
      </span>
      <div class="flex flex-row w-full gap-4">
        <div class="flex flex-col w-[60%] gap-4">
          <div class="flex flex-row justify-between items-center bg-[#000D0D] rounded-2xl py-2 px-4">
            <span class="flex flex-row gap-2 justify-center">
              <Icon id="DecoGreen" size={32} />
              <h4 class="text-white font-light text-2xl text-start">
                {graph.title}
              </h4>
            </span>
            <ButtonLink label={graph.buttonLabel} href={graph.buttonHref} />
          </div>

          <div class="flex flex-row w-full justify-between items-center bg-[#000D0D] rounded-2xl py-2 px-4">
            <Graph />
          </div>
        </div>
        <div class="flex w-[40%] h-ful flex-row justify-between items-center bg-[#000D0D] rounded-2xl py-2 px-4">
        </div>
      </div>
    </div>
  );
}
