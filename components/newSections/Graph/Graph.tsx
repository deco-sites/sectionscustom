import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { Chart as ChartIsland } from "$store/islands/ChartIsland.tsx";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";
import Teste from "$store/islands/Graph.tsx";
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
    <div class="p-4 mx-auto w-full max-w-screen-md relative min-h-[600px] ">
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
        <Teste member={props} />
      </div>
    </div>
  );
}
