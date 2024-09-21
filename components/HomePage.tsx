'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const slides = [
  {
    bgColor: 'bg-black',
    text: '"オチビ"になって、<br/>今すぐ始めよう！',
    subText:
      '迷わず、OTBで未来を創る一歩を踏み出そう！<br/>あなたのアイデアが、つながりを生み、新たな一歩が世界を変える。',
    imgSrc: '/img/mv/mv-img1.svg',
  },
  {
    bgColor: 'bg-purple-600',
    text: '新たな変化が始まる。<br/>"本気の副業"コミュニティ, OTB',

    subText:
      '本業だけじゃ満足できないなら、"オチビ"で始める新たな挑戦！<br/>新しい自分に出会うチャンスがここに。OTBで仲間と共に、次のステップへ。',
    imgSrc: '/img/mv/mv-img2.svg',
  },
];

export function Page() {
  return (
    <>
      <section className="w-full h-[500px]">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className={`${slide.bgColor} w-full h-[500px] flex items-center`}
              >
                <div className="flex w-full max-w-5xl mx-auto justify-between items-center">
                  <div className="text-white">
                    <p
                      className="text-4xl font-bold mb-4"
                      dangerouslySetInnerHTML={{ __html: slide.text }}
                    ></p>
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={{ __html: slide.subText }}
                    ></p>
                  </div>
                  <div className="ml-10">
                    <img
                      src={slide.imgSrc}
                      alt={`Slide ${index + 1}`}
                      className="h-auto"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section className="max-w-7xl mx-auto py-16">
        <p className="text-xl font-bold">新しいプロジェクト</p>
        <div></div>
      </section>
      <section>
        <div className="bg-gradient-to-r from-[#200071] to-[#3D00D7] h-[120px] ">
          <div className="bg-[url('/img/top-bg.png')] bg-cover bg-center h-full">
            <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-bold text-white text-2xl flex items-center h-full">
              今すぐオチビに登録する！
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto py-16">
        <p className="text-xl font-bold">ようこそOTBへ！</p>
        <div></div>
      </section>
    </>
  );
}
