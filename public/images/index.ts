import Default from "../images/default.jpg";
import WillBanner from "../images/will.jpg";
import AnaUnhasBanner from "../images/ana-unhas.jpg";
import HerickBarber from "../images/herick-barber.jpg";
import JulianaSilva from "../images/juliana-silva.jpg";

interface banners {
  [key: string]: any;
}

export const bannersByUrl: banners = {
  "juliana-silva": JulianaSilva,
  will: WillBanner,
  "ana-unhas": AnaUnhasBanner,
  herick: HerickBarber,
  default: Default,
};
