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
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.5,
              backgroundColor: (context) => {
                const gradient = context.chart.ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(128, 180, 2, 1)');
                gradient.addColorStop(1, 'rgba(255, 255, 100, 0.9)');  // Cor no final (transparente)
                return gradient;
              }
            },
          ],
        }}
      />
    </div>
  );
}
