import Image from "apps/website/components/Image.tsx";

interface Props {
  name: string;
  img: string;
  timestamp: string;
  flag: string;
  teamDeco?: boolean;
}

export default function Member(
  { name, img, timestamp, flag, teamDeco = false }: Props,
) {
  const dataHoraString = timestamp;
  const dataHoraObj = new Date(dataHoraString);

  const day = dataHoraObj.getDate() < 10
    ? "0" + dataHoraObj.getDate().toString()
    : dataHoraObj.getDate();
  const month = dataHoraObj.getMonth() < 10
    ? "0" + (dataHoraObj.getMonth() + 1)
    : (dataHoraObj.getMonth() + 1);
  const year = dataHoraObj.getFullYear();

  // Obtém a hora
  let hour: number = dataHoraObj.getHours();
  const min = dataHoraObj.getMinutes() < 10
    ? "0" + dataHoraObj.getMinutes()
    : dataHoraObj.getMinutes();
  const ampm = hour < 12 ? "AM" : "PM";

  hour = hour % 12;
  hour = hour ? hour : 12;

  return (
    <div class="flex flex-row justify-start gap-2 items-center w-full">
      <Image src={img} width={40} height={40} class="rounded-full" />
      <div class="flex flex-row gap-2">
        <span class="text-white font-bold text-xl leading-3">
          {name}
        </span>
        {teamDeco && <div class="w-[30px] h-[30px] bg-[#fff]"></div>}
        <Image src={flag} width={8} height={8} />
        <span class="text-[#A1A1AA] text-sm font-normal">
          {day + "/" + month + "/" + year} {hour + ":" + min + " " + ampm}
        </span>
      </div>
    </div>
  );
}
