import Image from "next/image";

const InfluenceDirections = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center gap-5 mt-16">
      <Image src={"/askmi-1.svg"} height={64} width={76} alt="aslmi" />
      <h2 className="text-[24px] md:text-[28px] font-bold">
        Download the AskMi App to register!
      </h2>

      <div className="flex flex-col sm:flex-row gap-5 items-center">
        <button className="flex min-h-12.5 min-w-44.5 rounded w-full gap-2 justify-center items-center bg-black text-white font-bold">
          <Image
            src={"/images/svgs/apple.svg"}
            height={20}
            width={20}
            alt="apple store"
          />
          App Store
        </button>
        <button className="flex min-h-12.5 px-10 w-full min-w-44.5 rounded gap-2 justify-center items-center bg-black text-white font-bold">
          <Image
            src={"/images/svgs/play-store.svg"}
            height={20}
            width={20}
            alt="apple store"
          />
          Play Store
        </button>
      </div>
    </div>
  );
};

export default InfluenceDirections;
