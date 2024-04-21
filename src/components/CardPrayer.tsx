const CardPrayer = ({
  name,
  time,
  srcImg,
}: {
  name: string;
  time: string;
  srcImg: string;
}) => {
  return (
    <div className="card-prayer border border-gray-900 bg-white text-center">
      <div className="overflow-hidden ">
        <img src={srcImg} alt={name} />
      </div>
      <div className="my-5 ">
        <p className="text-2xl font-bold">{name}</p>
        <p className="mt-10 font-sans text-7xl font-thin">{time}</p>
      </div>
    </div>
  );
};

export default CardPrayer;
