// Central Asset Manifest for Smart Airport Assistant
// Users can easily swap background, logo, hero illustration, and meal images here.

import logoImg from './logo.jpeg';
import airportBackgroundImg from './bakgrund.jpg';
import dashboardHeroImg from './bakgrund.jpg';
import mealSouthIndian from './istockphoto-481149282-612x612.jpg';
import mealBiryani from './biryani images.jpg';
import mealJain from './meal jain images.jpg';
import mealSalad from './salad.jpg';
import mealKids from './kid istockphoto-1138234731-612x612.jpg';
import mealPaneer from './tandoor.jpg';

export const ASSETS = {
  logo: logoImg,
  airportBackground: airportBackgroundImg,
  dashboardHero: dashboardHeroImg,
  meals: {
    southIndian: mealSouthIndian,
    biryani: mealBiryani,
    jain: mealJain,
    salad: mealSalad,
    kids: mealKids,
    paneer: mealPaneer
  }
};

export default ASSETS;
