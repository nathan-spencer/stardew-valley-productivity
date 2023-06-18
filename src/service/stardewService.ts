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

const stardewService = { getCrops, getObjects };

export default stardewService;
