import { ICrop } from "../interface/ICrop";
import IObject from "../interface/IObject";
import ISeedSource from "../interface/ISeedSource";
import Crops from "./Crops";
import Objects from "./Objects";
import SeedSources from "./SeedSources";

async function getCrops(): Promise<ICrop[]> {
  return Crops;
}

async function getObjects(): Promise<IObject[]> {
  return Objects;
}

async function getSeedSources(): Promise<ISeedSource[]> {
  return SeedSources;
}
/*
async function getSeedSources() {
  //Price in Objects.csv are what the seeds SELL for. Seeds general cost 2x what they sell for with the following exceptions.
  //431 Sunflower Seeds 200g @ Pierre's, 125g @ JojaMart. Also produces seeds which is weird.
  //802 Cactus Seeds 150g @ Oasis.
  //347 Rare Seed 1000g @ Traveling Cart.
  //433 Coffee Bean 2500g @ Traveling Cart.
  //745 Strawberry Seeds 100g @ Egg Festival.

  //Pierre's
  //Crops are 2.5x out of season (must be unlocked with Pierre's Missing Stocklist).
  //Only available after Year 1: 476 Garlic, 273 Rice Shoot, 485 Red Cabbage, 489 Artichoke
  //273,299,301,302,425,427,429,431,453,455
  //472,473,474,475,476,477,479,480,481,482
  //483,484,485,487,488,489,490,491,492,493

  //JojaMart
  //431 Sunflower Seeds are the only seeds that cost less than @ Pierre's.

  //Oasis
  //494,802,478,486

  //Traveling Cart
  //347, 433

  //Egg Festival
  //745
}
*/

const stardewService = { getCrops, getObjects, getSeedSources };

export default stardewService;
