import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { Chart as ChartIsland } from "$store/islands/ChartIsland.tsx";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

interface Members {
  month: string;
  count: number;
  total: number;
}


export default function Graph({ props }: { props: Members[] }) {

  // Exemplo de dados com rótulos personalizados
  console.log("props", props)

  // Formatar os dados para o gráfico
  const formattedData = props.map((entry) => ({
    x: entry.month,
    y: entry.total,
  }));

  return (
    <div class="p-4 mx-auto w-full max-w-screen-md">
      <ChartIsland
        type="line"
        options={{
          interaction: { mode: "index", intersect: false },
          plugins: {
            subtitle: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {},
        }}
        data={{
          labels: formattedData.map((entry) => entry.x),
          datasets: [
            {
              label: "teste",
              data: formattedData.map((entry) => entry.y),
              borderColor: ChartColors.Red,
              tension: 0.5,
            },
          ],
        }}
      />
    </div>
  );
}
