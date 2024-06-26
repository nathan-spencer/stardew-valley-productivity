import ISeedSource from "../interface/ISeedSource";

const SeedSources: ISeedSource[] = [
  { ObjectId: 273, HarvestId: 271, Seed: "Rice Shoot", Harvest: "Unmilled Rice", Price: 40, Sell: 30, Source: "Pierre Yr 2+", Note: "6 days when irrigated" },
  { ObjectId: 299, HarvestId: 300, Seed: "Amaranth Seeds", Harvest: "Amaranth", Price: 70, Sell: 150, Source: "Pierre", Note: "" },
  { ObjectId: 301, HarvestId: 398, Seed: "Grape Starter", Harvest: "Grape", Price: 60, Sell: 80, Source: "Pierre", Note: "" },
  { ObjectId: 302, HarvestId: 304, Seed: "Hops Starter", Harvest: "Hops", Price: 60, Sell: 25, Source: "Pierre", Note: "" },
  { ObjectId: 347, HarvestId: 417, Seed: "Rare Seed", Harvest: "Sweet Gem Berry", Price: 1000, Sell: 3000, Source: "Traveling Cart", Note: "" },
  { ObjectId: 425, HarvestId: 595, Seed: "Fairy Seeds", Harvest: "Fairy Rose", Price: 200, Sell: 290, Source: "Pierre", Note: "" },
  { ObjectId: 427, HarvestId: 591, Seed: "Tulip Bulb", Harvest: "Tulip", Price: 20, Sell: 30, Source: "Pierre", Note: "" },
  { ObjectId: 429, HarvestId: 597, Seed: "Jazz Seeds", Harvest: "Blue Jazz", Price: 30, Sell: 50, Source: "Pierre", Note: "" },
  { ObjectId: 431, HarvestId: 421, Seed: "Sunflower Seeds", Harvest: "Sunflower", Price: 125, Sell: 100, Source: "JojaMart", Note: "Sell = 80 (flower) + 20 (seed)" },
  { ObjectId: 433, HarvestId: 433, Seed: "Coffee Bean", Harvest: "Coffee Bean", Price: 2500, Sell: 15, Source: "Traveling Cart", Note: "" },
  { ObjectId: 453, HarvestId: 376, Seed: "Poppy Seeds", Harvest: "Poppy", Price: 100, Sell: 140, Source: "Pierre", Note: "" },
  { ObjectId: 455, HarvestId: 593, Seed: "Spangle Seeds", Harvest: "Summer Spangle", Price: 50, Sell: 90, Source: "Pierre", Note: "" },
  { ObjectId: 472, HarvestId: 24, Seed: "Parsnip Seeds", Harvest: "Parsnip", Price: 20, Sell: 35, Source: "Pierre", Note: "" },
  { ObjectId: 473, HarvestId: 188, Seed: "Bean Starter", Harvest: "Green Bean", Price: 60, Sell: 40, Source: "Pierre", Note: "" },
  { ObjectId: 474, HarvestId: 190, Seed: "Cauliflower Seeds", Harvest: "Cauliflower", Price: 80, Sell: 175, Source: "Pierre", Note: "" },
  { ObjectId: 475, HarvestId: 192, Seed: "Potato Seeds", Harvest: "Potato", Price: 50, Sell: 80, Source: "Pierre", Note: "" },
  { ObjectId: 476, HarvestId: 248, Seed: "Garlic Seeds", Harvest: "Garlic", Price: 40, Sell: 60, Source: "Pierre Yr 2+", Note: "" },
  { ObjectId: 477, HarvestId: 250, Seed: "Kale Seeds", Harvest: "Kale", Price: 70, Sell: 110, Source: "Pierre", Note: "" },
  { ObjectId: 478, HarvestId: 252, Seed: "Rhubarb Seeds", Harvest: "Rhubarb", Price: 100, Sell: 220, Source: "Oasis", Note: "" },
  { ObjectId: 479, HarvestId: 254, Seed: "Melon Seeds", Harvest: "Melon", Price: 80, Sell: 250, Source: "Pierre", Note: "" },
  { ObjectId: 480, HarvestId: 256, Seed: "Tomato Seeds", Harvest: "Tomato", Price: 50, Sell: 60, Source: "Pierre", Note: "" },
  { ObjectId: 481, HarvestId: 258, Seed: "Blueberry Seeds", Harvest: "Blueberry", Price: 80, Sell: 50, Source: "Pierre", Note: "" },
  { ObjectId: 482, HarvestId: 260, Seed: "Pepper Seeds", Harvest: "Hot Pepper", Price: 40, Sell: 40, Source: "Pierre", Note: "" },
  { ObjectId: 483, HarvestId: 262, Seed: "Wheat Seeds", Harvest: "Wheat", Price: 10, Sell: 25, Source: "Pierre", Note: "" },
  { ObjectId: 484, HarvestId: 264, Seed: "Radish Seeds", Harvest: "Radish", Price: 40, Sell: 90, Source: "Pierre", Note: "" },
  { ObjectId: 485, HarvestId: 266, Seed: "Red Cabbage Seeds", Harvest: "Red Cabbage", Price: 100, Sell: 260, Source: "Pierre Yr 2+", Note: "" },
  { ObjectId: 486, HarvestId: 268, Seed: "Starfruit Seeds", Harvest: "Starfruit", Price: 400, Sell: 750, Source: "Oasis", Note: "" },
  { ObjectId: 487, HarvestId: 270, Seed: "Corn Seeds", Harvest: "Corn", Price: 150, Sell: 50, Source: "Pierre", Note: "" },
  { ObjectId: 488, HarvestId: 272, Seed: "Eggplant Seeds", Harvest: "Eggplant", Price: 20, Sell: 60, Source: "Pierre", Note: "" },
  { ObjectId: 489, HarvestId: 274, Seed: "Artichoke Seeds", Harvest: "Artichoke", Price: 30, Sell: 160, Source: "Pierre Yr 2+", Note: "" },
  { ObjectId: 490, HarvestId: 276, Seed: "Pumpkin Seeds", Harvest: "Pumpkin", Price: 100, Sell: 320, Source: "Pierre", Note: "" },
  { ObjectId: 491, HarvestId: 278, Seed: "Bok Choy Seeds", Harvest: "Bok Choy", Price: 50, Sell: 80, Source: "Pierre", Note: "" },
  { ObjectId: 492, HarvestId: 280, Seed: "Yam Seeds", Harvest: "Yam", Price: 60, Sell: 160, Source: "Pierre", Note: "" },
  { ObjectId: 493, HarvestId: 282, Seed: "Cranberry Seeds", Harvest: "Cranberries", Price: 240, Sell: 75, Source: "Pierre", Note: "" },
  { ObjectId: 494, HarvestId: 284, Seed: "Beet Seeds", Harvest: "Beet", Price: 20, Sell: 100, Source: "Oasis", Note: "" },
  { ObjectId: 495, HarvestId: 16, Seed: "Spring Seeds", Harvest: "Wild Horseradish", Price: 18, Sell: 45, Source: "Recipe", Note: "Price = Sum ingredients / 10. Sell = harvest avg." },
  { ObjectId: 496, HarvestId: 396, Seed: "Summer Seeds", Harvest: "Spice Berry", Price: 21, Sell: 70, Source: "Recipe", Note: "Price = Sum ingredients / 10. Sell = harvest avg." },
  { ObjectId: 497, HarvestId: 404, Seed: "Fall Seeds", Harvest: "Common Mushroom", Price: 23, Sell: 58, Source: "Recipe", Note: "Price = Sum ingredients / 10. Sell = harvest avg." },
  { ObjectId: 498, HarvestId: 412, Seed: "Winter Seeds", Harvest: "Winter Root", Price: 38, Sell: 95, Source: "Recipe", Note: "Price = Sum ingredients / 10. Sell = harvest avg." },
  { ObjectId: 499, HarvestId: 454, Seed: "Ancient Seeds", Harvest: "Ancient Fruit", Price: 550, Sell: 550, Source: "Traveling Cart", Note: "" },
  { ObjectId: 745, HarvestId: 400, Seed: "Strawberry Seeds", Harvest: "Strawberry", Price: 100, Sell: 120, Source: "Egg Festival", Note: "" },
  { ObjectId: 802, HarvestId: 90, Seed: "Cactus Seeds", Harvest: "Cactus Fruit", Price: 150, Sell: 75, Source: "Oasis", Note: "" },
  { ObjectId: 831, HarvestId: 830, Seed: "Taro Tuber", Harvest: "Taro Root", Price: 20, Sell: 100, Source: "Ginger Island", Note: "7 days with irrigation" },
  { ObjectId: 833, HarvestId: 832, Seed: "Pineapple Seeds", Harvest: "Pineapple", Price: 240, Sell: 300, Source: "Ginger Island", Note: "" },
  { ObjectId: 885, HarvestId: 771, Seed: "Fiber Seeds", Harvest: "Fiber", Price: 5, Sell: 1, Source: "Recipe", Note: "" },
  { ObjectId: 890, HarvestId: 889, Seed: "Qi Bean", Harvest: "Qi Fruit", Price: 1, Sell: 1, Source: "Quest", Note: "" },
  { ObjectId: 10908, HarvestId: 10907, Seed: "Carrot Seeds", Harvest: "Carrot", Price: 15, Sell: 35, Source: "Forage", Note: "" },
  { ObjectId: 10910, HarvestId: 10909, Seed: "Summer Squash Seeds", Harvest: "Summer Squash", Price: 20, Sell: 45, Source: "Forage", Note: "" },
  { ObjectId: 10912, HarvestId: 10911, Seed: "Broccoli Seeds", Harvest: "Broccoli", Price: 40, Sell: 70, Source: "Forage", Note: "" },
  { ObjectId: 10914, HarvestId: 10913, Seed: "Powdermelon Seeds", Harvest: "Powdermelon", Price: 20, Sell: 60, Source: "Forage", Note: "" },
];

export default SeedSources;
