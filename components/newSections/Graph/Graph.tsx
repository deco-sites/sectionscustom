import { Head } from "$fresh/runtime.ts";
import { Chart } from "$fresh_charts/mod.ts";
import { Chart as ChartIsland } from "$store/islands/ChartIsland.tsx";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export default function Graph() {
  // Exemplo de dados com rótulos personalizados
  const rawData = [
    { label: "Label 1", value: 0 },
    { label: "Label 2", value: 23 },
    { label: "Label 3", value: 15 },
    // ... mais dados ...
  ];

  // Formatar os dados para o gráfico
  const formattedData = rawData.map((entry) => ({
    x: entry.label,
    y: entry.value,
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
