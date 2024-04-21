import CardPrayer from "./CardPrayer";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import dataOptions from "./../dataOptions";

const MainContent = ({
  data,
  cityN,
  loading,
}: {
  data: {
    readable: string;
    timings: { name: string; time: string; srcImg: string }[];
  };
  cityN: [
    { name: string; displayName: string },
    Dispatch<SetStateAction<{ name: string; displayName: string }>>,
  ];
  loading: boolean;
}) => {
  const options: { name: string; displayName: string }[] = dataOptions;
  const [city, setCity] = cityN;
  const [nextPrayer, setnextPrayer] = useState("....");
  // const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const timeNow = new Date();
    let indexNext = -1;
    data?.timings.forEach(({ time }, i) => {
      const prayerNow = new Date();
      prayerNow.setHours(+time.slice(0, 2), +time.slice(3, 5), 0, 0);
      if (timeNow < prayerNow && indexNext === -1) {
        indexNext = i;
      }
    });
    const nextPray = data?.timings[indexNext === -1 ? 0 : indexNext];
    const timeNextPrayer = new Date();
    setnextPrayer(nextPray.name);
    timeNextPrayer.setHours(
      +nextPray.time.slice(0, 2),
      +nextPray.time.slice(3, 5),
      0,
      0,
    );

    // let re = (timeNextPrayer.getTime() - timeNow.getTime()) / 1000 ;
    // const clear = setInterval(() => {
    //   re--
    //   setRemaining(re);

    // }, 1000);

    // return () => {
    //   clearInterval(clear);
    // }
  }, [cityN, data]);

  return (
    <>
      <header className="grid w-full grid-cols-2 border-b border-slate-400 pb-12">
        <div className="text-white">
          <p className="gray-200 text- text-xl font-medium ">
            {data?.readable}
          </p>
          <p className="text-5xl font-bold">{city.displayName}</p>
        </div>
        <div className="text-white">
          <p className="gray-200 text- text-xl font-medium ">
            متبقي حتي صلاة {nextPrayer}
          </p>
          <p className="text-5xl font-bold">{"no working"}</p>
        </div>
      </header>
      <main className="my-5 flex gap-6">
        {data?.timings.map(({ name, time, srcImg }, i: number) => (
          <CardPrayer
            name={name}
            time={
              +time.slice(0, -3) > 12
                ? (+time.slice(0, -3) - 12 >= 10 ? "" : "0") +
                  (+time.slice(0, -3) - 12).toString() +
                  ":" +
                  time.slice(-2)
                : time
            }
            srcImg={srcImg}
            key={i}
          />
        ))}
      </main>
      <footer className="flex items-center gap-5">
        <select
          name=""
          id=""
          className="border border-white bg-transparent p-5 text-white focus:outline-none"
          onChange={(e) => setCity(JSON.parse(e.target.value))}
        >
          {options.map((crrCity, i) => (
            <option
              value={JSON.stringify(crrCity)}
              className="text-black "
              key={i}
            >
              {crrCity.displayName}
            </option>
          ))}
        </select>
        {loading && (
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
        )}
      </footer>
    </>
  );
};

export default MainContent;
