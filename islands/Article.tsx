import Component from "$store/components/newSections/Article.tsx";
import type { Props } from "$store/components/newSections/Article.tsx";

export default function island({ ...props }: Props) {
  return <Component props={props} />;
}
