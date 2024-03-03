import GraphCustom from "$store/islands/Graph.tsx";
export interface Members {
  month: string;
  count: number;
  total: number;
}

export default function Graph({ props }: { props: Members[] }) {
  // Exemplo de dados com rótulos personalizados

  // Formatar os dados para o gráfico
  const formattedData = props.map((entry) => ({
    x: entry.month,
    y: entry.total,
  }));

  return (
    <div class="mx-auto w-full max-w-screen-md relative min-h-[380px] md:min-h-[575px] rounded-3xl ">
      <div class="absolute hidden w-[60px] h-[95%] bg-black flex-col justify-between items-center top-0 left-0 z-10 ">
        <ul class="flex-col-reverse flex items-center justify-between h-full text-white">
          {formattedData.map((entry) => (
            <li>
              {entry.y.toString().substring(0, 3).split("")[0] + "," +
                entry.y.toString().substring(0, 2).split("")[1] + "M"}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <GraphCustom member={props} />
      </div>
    </div>
  );
}
