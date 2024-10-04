"use cliet";

import { useState, useEffect } from "react";
import { NextResponse } from "next/server";
import Story from "@/components/(ui)/story/page";
import Image from "next/image";
import Link from "next/link";
import Promotions from "@/components/(ui)/Promotions/page";
import Marquee from "react-fast-marquee";
import ProductCard from "@/components/(ui)/ProductCard/page";
import EmblaCarousel from "@/components/(header)/EmblaCarousel";
import { Griffy } from "next/font/google";
import Grid from "@/components/Grid";
import Bubbles from "@/components/Bubles";
const Page = () => {
  return (
    <div>
      <Story />
      <div>
        {/* Banner Section */}
        <section className="py-5">
          <div className="container mx-auto px-2 ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              <div className="relative overflow-hidden rounded-lg shadow-lg pb-6 px-2  pt-3">
              <Grid />
              </div>
            </div>
          </div>
        </section>

        {/* Services Marquee */}
        <Marquee
          speed={30}
          gradient={false}
          pauseOnHover={true}
          className="bg-transparent"
        >
          <section className="services-wrapper py-10 bg-white">
            <div className="container mx-auto">
              <div className="flex flex-wrap justify-center gap-16">
                {/* Service 1 */}
                <div className="text-center w-36">
                  <svg
                    fill="#000000"
                    height="45px"
                    width="45px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 476.583 476.583"
                    xmlSpace="preserve"
                    className="mx-auto"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <path d="M476.583,262.835c0-32.208-25.811-58.375-57.815-59.259c-2.33-3.642-5.623-6.553-9.505-8.495 c5.14-76.723-61.653-157.01-144.843-167.175c-10.731-1.864-15.576-1.568-26.105-2.29C115.523,29.172,62.645,132.404,67.288,195.135 c-3.851,1.942-7.097,4.829-9.411,8.433C25.841,204.421,0,230.604,0,262.835c0,32.224,25.841,58.407,57.878,59.261 c4.239,6.631,11.632,11.057,20.079,11.057c13.169,0,23.853-10.677,23.853-23.853v-92.935c0-8.045-4.006-15.126-10.109-19.444 c10.295-57.87,62.893-122.232,146.613-123.598c5.063,0.364,15.964,0.278,20.562,1.498c41.649,3.844,111.531,44.663,125.99,122.162 c-6.056,4.325-10.031,11.376-10.031,19.382v92.935c0,10.017,6.18,18.55,14.922,22.091v10.117c0,26.415-17.842,49.594-43.373,56.364 l-72.042,19.078c-3.882-5.148-9.767-8.687-16.74-8.687c-11.787,0-21.353,9.565-21.353,21.352c0,11.803,9.567,21.353,21.353,21.353 c10.855,0,19.428-8.183,20.81-18.644l72.042-19.078c32.502-8.619,55.206-34.948,55.206-81.249 c5.467-1.678,10.095-5.187,13.108-9.909C450.772,321.202,476.583,295.035,476.583,262.835z"></path>{" "}
                        <path d="M184.443,293.405h-23.201v-0.256c13.402-11.135,29.63-24.537,29.63-41.953c0-37.783-60.207-27.783-53.888-11.88 c1.724,4.635,6.305,5.933,9.831,4.217c11.213-5.475,24.739-3.161,24.739,9.317c-0.374,13.767-20.546,29.173-36.448,43.561 c-2.392,2.166-3.013,12.889,2.702,12.889h46.635C194.956,309.299,194.956,293.405,184.443,293.405z"></path>{" "}
                        <path d="M247.741,309.299c10.343,0,9.147-9.497,9.147-19.706c13.914,0,13.572-14.498,0-14.498v-44.421 c0-2.222-1.802-4.023-4.023-4.023c-25.653,0-14.861-7.663-49.166,47.544c-2.794,4.542-3.354,15.398,2.283,15.398h32.596 C238.578,299.78,237.383,309.299,247.741,309.299z M220.021,275.095v-0.256l11.057-18.052c2.796-5.211,4.969-10.041,7.625-15.382 h0.512c-0.854,12.175-0.636,15.264-0.636,33.69H220.021z"></path>{" "}
                        <path d="M278.038,233.33v66.241c0,12.842,19.46,12.897,19.46,0v-26.129h31.913v26.191c0,12.75,19.334,12.796,19.334,0v-66.364 c0-5.343-4.332-9.667-9.659-9.667c-13.278,0-9.675,19.31-9.675,32.93h-31.913V233.33 C297.497,220.432,278.038,220.487,278.038,233.33z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <h6 className="text-lg font-semibold text-gray-800 mt-4 transition-colors hover:text-gray-600">
                    پشتیبانی 24 ساعته
                  </h6>
                </div>

                {/* Service 2 */}
                <div className="text-center w-36">
                  <svg
                    height="45px"
                    width="45px"
                    version="1.1"
                    id="_x32_"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    fill="#000000"
                    transform="rotate(180)"
                    className="mx-auto"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <style type="text/css"> .st0{"fill:#000000"} </style>{" "}
                      <g>
                        {" "}
                        <path
                          className="st0"
                          d="M311.069,130.515c-0.963-5.641-5.851-9.768-11.578-9.768H35.43c-7.61,0-13.772,6.169-13.772,13.765 c0,7.61,6.162,13.772,13.772,13.772h64.263c7.61,0,13.772,6.17,13.772,13.773c0,7.603-6.162,13.772-13.772,13.772H13.772 C6.169,175.829,0,181.998,0,189.601c0,7.603,6.169,13.764,13.772,13.764h117.114c6.72,0,12.172,5.46,12.172,12.18 c0,6.72-5.452,12.172-12.172,12.172H68.665c-7.61,0-13.772,6.17-13.772,13.773c0,7.602,6.162,13.772,13.772,13.772h45.857 c6.726,0,12.179,5.452,12.179,12.172c0,6.719-5.453,12.172-12.179,12.172H51.215c-7.61,0-13.772,6.169-13.772,13.772 c0,7.603,6.162,13.772,13.772,13.772h87.014l5.488,31.042h31.52c-1.854,4.504-2.911,9.421-2.911,14.598 c0,21.245,17.218,38.464,38.464,38.464c21.237,0,38.456-17.219,38.456-38.464c0-5.177-1.057-10.094-2.911-14.598h100.04 L311.069,130.515z M227.342,352.789c0,9.146-7.407,16.553-16.553,16.553c-9.152,0-16.56-7.407-16.56-16.553 c0-6.364,3.627-11.824,8.892-14.598h15.329C223.714,340.965,227.342,346.424,227.342,352.789z"
                        ></path>{" "}
                        <path
                          className="st0"
                          d="M511.598,314.072l-15.799-77.941l-57.689-88.759H333.074l32.534,190.819h38.42 c-1.846,4.504-2.904,9.421-2.904,14.598c0,21.245,17.219,38.464,38.456,38.464c21.246,0,38.464-17.219,38.464-38.464 c0-5.177-1.057-10.094-2.91-14.598h16.741c6.039,0,11.759-2.708,15.582-7.386C511.273,326.136,512.8,319.988,511.598,314.072z M392.529,182.882h26.314l34.162,52.547h-51.512L392.529,182.882z M456.14,352.789c0,9.146-7.407,16.553-16.56,16.553 c-9.138,0-16.552-7.407-16.552-16.553c0-6.364,3.635-11.824,8.892-14.598h15.329C452.513,340.965,456.14,346.424,456.14,352.789z"
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <h6 className="text-lg font-semibold text-gray-800 mt-4 transition-colors hover:text-gray-600">
                    ارسال سریع
                  </h6>
                </div>

                {/* Service 3 */}
                <div className="text-center w-36 mx-8">
                  <svg
                    fill="#000000"
                    width="44px"
                    height="44px"
                    viewBox="0 0 64 64"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g id="a"></g>{" "}
                      <g id="b">
                        {" "}
                        <path d="M26.5,51c1.3789,0,2.5-1.1211,2.5-2.5s-1.1211-2.5-2.5-2.5-2.5,1.1211-2.5,2.5,1.1211,2.5,2.5,2.5Zm0-4c.8271,0,1.5,.6729,1.5,1.5s-.6729,1.5-1.5,1.5-1.5-.6729-1.5-1.5,.6729-1.5,1.5-1.5Zm1.0254-18.9443c-.6943-.46-1.0898-.7627-1.1455-.8086-.0186-.127,.0234-.2441,.0703-.2969,.0156-.0186,.0303-.0352,.1006-.04,.1572-.002,.2617,.1045,.2676,.1113,.4609,.6377,1.3604,.8164,2.0488,.4062,.6826-.4043,.8916-1.25,.4854-1.9678-.3096-.5462-1.1729-1.2924-2.4286-1.4048-.0156-.0726-.0285-.1354-.0327-.1725-.0724-.444-.7509-.436-.8206,0l-.0422,.2158c-.7497,.1201-1.421,.4658-1.9034,1.0188-.6045,.6904-.874,1.6113-.7402,2.5264,.1904,1.292,1.4189,2.1074,2.4072,2.7637,.3105,.2061,.9561,.6348,1.0645,.8047,.0928,.1523,.1816,.3721,.0762,.5537-.085,.1455-.2637,.2373-.4971,.2539-.1924,.0078-.5342-.291-.6699-.498-.4258-.6729-1.3262-.8975-2.0449-.5068-.6699,.3633-.9062,1.1299-.5869,1.9072,.3528,.8613,1.5208,1.7751,2.8857,1.934l.0511,.2616c.0697,.436,.7482,.4439,.8206,0,.0062-.0555,.0311-.1678,.0576-.29,1.1255-.1612,2.1003-.7606,2.6313-1.6771,.6045-1.043,.5654-2.2734-.1074-3.376-.4355-.7168-1.2041-1.2256-1.9473-1.7188Zm1.1895,4.5928c-.4102,.71-1.2041,1.1709-2.1182,1.2344l-.1699,.0059c-1.125,0-2.1377-.7842-2.3672-1.3467-.0586-.1406-.1611-.4863,.1367-.6475,.085-.0459,.1787-.0684,.2715-.0684,.1826,0,.3613,.085,.458,.2373,.0059,.0098,.6982,1.0029,1.584,.9531,.5635-.0391,1.0322-.3115,1.2871-.748,.2715-.4688,.2393-1.0439-.0869-1.5781-.2012-.3291-.6924-.6699-1.3662-1.1172-.8643-.5742-1.8447-1.2246-1.9688-2.0742-.0928-.626,.0908-1.2539,.5029-1.7236,.3721-.4268,.9131-.6855,1.5215-.7285,1.1299-.0791,1.8955,.5742,2.083,.9053,.1055,.1875,.1367,.46-.126,.6152-.2393,.1416-.5723,.084-.7383-.1465-.1016-.1289-.4688-.5527-1.1348-.5088-.3203,.0234-.585,.1504-.7861,.3789-.251,.2881-.3662,.6992-.3076,1.1006,.0557,.3809,.4258,.7314,1.583,1.498,.6523,.4316,1.3262,.8789,1.6465,1.4053,.4766,.7803,.5107,1.6377,.0957,2.3535Zm26.0879-12.5459c-.123-.0938-.2822-.124-.4355-.085-.0156,.0059-1.6318,.4346-3.3975-.3428-.5264-.2314-1.127-.5078-1.7568-.7969-1.9437-.8945-3.9327-1.8059-5.2129-2.1177v-2.2603c0-2.4814-2.0186-4.5-4.5-4.5H13.5c-2.4814,0-4.5,2.0186-4.5,4.5V49.5c0,2.4814,2.0186,4.5,4.5,4.5h26c2.4814,0,4.5-2.0186,4.5-4.5v-15.8103c.3678,.1519,.7612,.3335,1.1855,.533,1.6982,.7969,3.8115,1.7891,6.4727,1.7891,2.1777,0,3.1797-1.1377,3.2207-1.1855,.0781-.0908,.1211-.207,.1211-.3262v-14c0-.1562-.0732-.3027-.1973-.3975Zm-.8027,14.1836c-.2754,.2324-1.0186,.7256-2.3418,.7256-2.4375,0-4.4395-.9395-6.0479-1.6943-1.0498-.4932-1.957-.9189-2.7715-.9893-.5498-.0479-1.1416-.0752-1.7471-.1025-2.2402-.1035-4.7783-.2217-5.752-1.4678-.3682-.4717-.4424-1.1826-.1895-1.8135,.3125-.7754,1.0566-1.3018,2.043-1.4434,.7441-.1074,1.6709-.1426,2.6533-.1807,2.3857-.0908,5.0898-.1943,6.9961-1.3281,.2373-.1406,.3154-.4482,.1738-.6855-.1426-.2373-.4492-.3145-.6855-.1738-1.6865,1.0039-4.2559,1.1016-6.5225,1.1885-.4174,.0157-.8212,.0326-1.2123,.0535-1.4095-5.455-6.4222-9.3748-12.0963-9.3748-6.8926,0-12.5,5.6074-12.5,12.5s5.6074,12.5,12.5,12.5c5.582,0,10.4257-3.6604,11.9813-8.9614,.8444,.1016,1.7225,.1468,2.5646,.186,.5918,.0273,1.1699,.0537,1.707,.0996,.0767,.0066,.1649,.0322,.2471,.048v16.1277c0,1.9297-1.5703,3.5-3.5,3.5H13.5c-1.9297,0-3.5-1.5703-3.5-3.5V14.5c0-1.9297,1.5703-3.5,3.5-3.5h26c1.9297,0,3.5,1.5703,3.5,3.5v2.1494c-1.6783,.1625-5.3053,2.1736-5.7402,2.4122-.2422,.1328-.3311,.4365-.1982,.6787,.1338,.2432,.4385,.3301,.6787,.1982,1.6641-.9111,4.6211-2.3096,5.5303-2.2979,.9609,.0459,3.4912,1.21,5.5244,2.1455,.6348,.292,1.2412,.5713,1.7725,.8047,1.3877,.6094,2.6914,.5908,3.4326,.5039v13.1914Zm-19.4482-2.9131c.6519,.8354,1.7186,1.2675,2.9341,1.5099-1.4708,4.8082-5.8954,8.1171-10.9859,8.1171-6.3408,0-11.5-5.1592-11.5-11.5s5.1592-11.5,11.5-11.5c5.1597,0,9.7238,3.5217,11.0817,8.4492-.1823,.0181-.3618,.0373-.5309,.0616-1.3486,.1943-2.3789,.9453-2.8281,2.0605-.3896,.9697-.2637,2.043,.3291,2.8018Z"></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  <h6 className="text-lg font-semibold text-gray-800 mt-4 transition-colors hover:text-gray-600">
                  پرداخت ایمن
                  </h6>
                </div>
              </div>
            </div>
          </section>
        </Marquee>

        {/* set banners */}
        <Promotions />
      </div>

      <div className="flex  mt-8 text-xs justify-content-between border-b border-gray-950 pb-2 mx-2 px-1 " dir="rtl">
        <h2 className=" txt-xs mr-2">پر فروش های هفته</h2>
        <Link href={"/store"} className="mr-56 txt-xs">
        مشاهده همه
        </Link>
      

      </div>
      <div className="flex overflow-y-auto gap-4 ">
        <div className="flex-shrink-0">
          <ProductCard />
        </div>
      </div>
      <div className="flex  mt-8 text-xs justify-content-between mb-4 border-b border-gray-950 pb-2 mx-2 px-1 " dir="rtl">
        <h2 className=" txt-xs">ست های جذاب و خوش قیمت</h2>
        <Link href={"/store"} className="mr-48 txt-xs">
        مشاهده همه
        </Link>
      

      </div>

      <EmblaCarousel />
      
      
      <div>
        {/* <div className="bg-gray-200 mt-16" dir="rtl">
          <div className="container mx-auto py-8 px-4 md:px-0 md:flex md:justify-center md:items-center">
            <div className="md:w-1/2 lg:w-1/3 md:mr-8">
              <h1 className="text-3xl font-bold mb-4">
                بزرگترین سمینار استایل ایران
              </h1>
              <p className="text-lg mb-4">
                توی این سمینار قراره که یاد بگیری چجوری استایل خودتو خودت بچینی
                که همه مجروب استایل تو بشن{" "}
              </p>
              <Link
                href="/tickets"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto"
              >
                ثبت نام در سمینار
              </Link>
            </div>
            <div className="md:w-1/2 lg:w-2/3 mt-8 md:mt-0">
              <Image
                src="/assets/garden5.jpg"
                alt="garden"
                className=" object-cover w-full h-full"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div> */}
        <Bubbles />
      </div>
      <div className="text-xl font-semibold tracking-tight text-gray-900 mt-16 text-center ">
        پرفروش ترین های سه ماه گذشته
      </div>
      <div className="flex overflow-y-auto gap-4 p-10">
        <div className="flex-shrink-0">
          <ProductCard />
        </div>
      </div>
    </div>
  );
};

export default Page;
