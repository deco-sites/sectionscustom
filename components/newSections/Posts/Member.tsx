import Image from "apps/website/components/Image.tsx";

interface Props {
  name: string;
  img: string;
  timestamp: string;
  flag: string;
}

export default function Member({ name, img, timestamp, flag }: Props) {
  const dataHoraString = timestamp;
  const dataHoraObj = new Date(dataHoraString);

  // Obtém a data
  const data = dataHoraObj.toISOString().split("T")[0];

  // Obtém a hora
  const hora = dataHoraObj.toISOString().split("T")[1].split(".")[0];

  console.log("Data:", data);
  console.log("Hora:", hora);

  return (
    <div class="flex flex-row justify-start items-center w-full">
      <Image src={img} width={30} height={30} />
      <div class="flex flex-row gap-2">
        <span>
          {name}
        </span>
        <Image src={flag} width={8} height={8} />
        <span>
          {data.replaceAll("-", "/")} - {hora}
        </span>
      </div>
    </div>
  );
}
