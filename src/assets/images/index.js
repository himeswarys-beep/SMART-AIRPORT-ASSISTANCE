// Central Asset Manifest for Smart Airport Assistant
// Users can easily swap background, logo, hero illustration, and meal images here.

import logoImg from './logo.jpeg';
import airportBackgroundImg from './airport-background.svg';
import dashboardHeroImg from './dashboard-hero.svg';
import mealSouthIndian from './meal-south-indian.svg';
import mealBiryani from './meal-biryani.svg';
import mealJain from './meal-jain.svg';
import mealSalad from './meal-salad.svg';
import mealKids from './meal-kids.svg';
import mealPaneer from './meal-paneer.svg';

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
