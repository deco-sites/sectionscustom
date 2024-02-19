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

  return (
    <div class="flex flex-row justify-start gap-2 items-center w-full">
      <Image src={img} width={40} height={40} class="rounded-full" />
      <div class="flex flex-row gap-2">
        <span class="text-white font-bold text-xl leading-3">
          {name}
        </span>
        <Image src={flag} width={8} height={8} />
        <span class="text-[#A1A1AA] text-sm font-normal">
          {data.replaceAll("-", "/")} - {hora}
        </span>
      </div>
    </div>
  );
}
