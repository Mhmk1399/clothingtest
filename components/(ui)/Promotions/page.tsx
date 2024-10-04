import Marquee from "react-fast-marquee";

const Page = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center  p-4 ">
      {/* First Box */}
      <div
        className="max-w-sm p-2 bg-white  border border-gray-200 rounded-lg shadow-lg text-dark m-4 flex-1"
        dir="ltr"
      >
        <Marquee
          gradient={false}
          speed={60}
          pauseOnHover
          direction="right"
          className="flex flex-col items-center justify-center"
        >
        <h5 className="text-sm font-semibold  tracking-light text-gray-900  text-center mx-2">
          همین الان تخفیف اولین خریدتو  با ثبت نام در باشگاه مشتریان ما بگیر
        </h5>
        </Marquee>
      </div>
    </div>
  );
};

export default Page;
