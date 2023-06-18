export default interface ICropObject {
  "Object Id": string;
  Name: string;
  Price: string;
  Edibility: string;
  Type: string;
  Category: string;
  "English Name": string;
  Description: string;
}

export interface ICrop {
  "Object Id": string;
  "Days in Stage 1 Growth": string;
  "Days in Stage 2 Growth": string;
  "Days in Stage 3 Growth": string;
  "Days in Stage 4 Growth": string;
  "Days in Stage 5 Growth": string;
  "Growth Seasons": string;
  "Index In Sprite Sheet": string;
  "Index Of Harvest": string;
  "Regrow After Harvest": string;
  "Harvest Method": string;
  "Chance For Extra Harvest": string;
  "Min Extra Harvest": string;
  "Max Extra Harvest": string;
  "Max Harvest Increase Per Farming Level": string;
  "Chance For Extra Crops": string;
  "Raised Seeds": string;
  "Tint Color": string;
}
