import Papa from "papaparse";
import ICrop from "../interface/ICrop";

async function getCrops() {
  let crops: ICrop[] = [];
  const response = await fetch("/data/csv/Crops Object Information.csv");
  if (!response?.body) return crops;
  const reader = response.body.getReader();
  const result = await reader?.read(); // raw array
  const decoder = new TextDecoder("utf-8");
  const csv = decoder.decode(result.value); // the csv text
  const results = Papa.parse<ICrop>(csv, { header: true }); // object with { data, errors, meta }
  crops = results.data; // array of objects
  return crops;
}

const stardewService = { getCrops };

export default stardewService;
