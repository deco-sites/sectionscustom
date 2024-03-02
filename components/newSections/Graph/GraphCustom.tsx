import { Chart } from "$fresh_charts/mod.ts";
import { Chart as ChartIsland } from "$store/islands/ChartIsland.tsx";
import { ChartColors, transparentize } from "$fresh_charts/utils.ts";

export interface Member {
  month: string;
  count: number;
  total: number;
}

export interface Props {
  member: Member[];
}

export default function GraphCustom({ member }: Props) {
  const formattedData = member.map((entry) => ({
    x: entry.month,
    y: entry.total,
  }));

  return (
    <div>
      <ChartIsland
        type="line"
        options={{
          responsive: false,
          maintainAspectRatio: false,
          interaction: { mode: "index", intersect: false },
          plugins: {
            subtitle: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: true,
              ticks: {
                color: "#fff",
                font: {
                  size: 24,
                },
                // Include a dollar sign in the ticks
                callback: function (value, index, ticks) {
                  return `${
                    value && typeof value === "number" && value / 1000
                  }K`;
                },
              },
            },
          },
        }}
        data={{
          labels: formattedData.map((entry) => entry.x),
          datasets: [
            {
              label: "teste",
              data: formattedData.map((entry) => entry.y),
              fill: true,
              borderColor: " #02F67C",
              tension: 0.5,
              backgroundColor: (context) => {
                const gradient = context.chart.ctx.createLinearGradient(
                  0,
                  0,
                  300,
                  500,
                );
                gradient.addColorStop(0, "#02F67C");
                gradient.addColorStop(1, "rgba(0, 225, 0, 0)"); // Cor no final (transparente)
                return gradient;
              },
            },
          ],
        }}
      />
    </div>
  );
}
