import Papa from "papaparse";
import { ICrop } from "../interface/ICrop";
import IObject from "../interface/IObject";

async function getCrops() {
  let crops: ICrop[] = [];
  const response = await fetch("/data/csv/Crops.csv");
  if (!response?.body) return crops;
  const reader = response.body.getReader();
  const result = await reader?.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse<ICrop>(csv, { header: true }); // object with { data, errors, meta }
  crops = results.data; // array of objects
  return crops;
}

async function getObjects() {
  let objects: IObject[] = [];
  const response = await fetch("/data/csv/Objects.csv");
  if (!response?.body) return objects;
  const reader = response.body.getReader();
  const result = await reader?.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse<IObject>(csv, { header: true }); // object with { data, errors, meta }
  objects = results.data; // array of objects
  return objects;
}

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

  let objects: IObject[] = [];
  const response = await fetch("/data/csv/Objects.csv");
  if (!response?.body) return objects;
  const reader = response.body.getReader();
  const result = await reader?.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse<IObject>(csv, { header: true }); // object with { data, errors, meta }
  objects = results.data; // array of objects
  return objects;
}

const stardewService = { getCrops, getObjects };

export default stardewService;
