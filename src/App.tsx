import MainContent from "./components/MainContent";
import srcImg from "./assets/prayer.png";
import { useEffect, useState } from "react";
import axios from "axios";

type prayers = {
  Asr: string;
  Dhuhr: string;
  Fajr: string;
  Isha: string;
  Maghrib: string;
};

function App() {
  const [loading, setLoading] = useState(true);
  const [cityN, setCityN] = useState({ name: "cairo", displayName: "القاهرة" });
  const [data, setData] = useState({
    date: {
      readable: "DD-MM-YYYY",
    },
    timings: {
      Asr: "00:00",
      Dhuhr: "00:00",
      Fajr: "00:00",
      Isha: "00:00",
      Maghrib: "00:00",
    },
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://api.aladhan.com/v1/timingsByCity?country=Egyptian General Authority of Survey&city=${cityN.name}`,
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [cityN]);

  console.log(data);
  const prayer: prayers = data.timings;
  const dataLoop = [
    {
      name: "الفجر",
      time: prayer?.Fajr,
      srcImg: srcImg,
    },
    {
      name: "الظهر",
      time: prayer?.Dhuhr,
      srcImg: srcImg,
    },
    {
      name: "العصر",
      time: prayer?.Asr,
      srcImg: srcImg,
    },
    {
      name: "المغرب",
      time: prayer?.Maghrib,
      srcImg: srcImg,
    },
    {
      name: "العشاء",
      time: prayer?.Isha,
      srcImg: srcImg,
    },
  ];
  return (
    <div
      dir="rtl"
      className="App container flex h-screen flex-col items-center justify-center"
    >
      <MainContent
        data={{ readable: data.date?.readable, timings: dataLoop }}
        cityN={[cityN, setCityN]}
        loading={loading}
      />
    </div>
  );
}

export default App;

//https://api.aladhan.com/v1/timingsByCity?country=SA&city=${selectedCity.apiName}
