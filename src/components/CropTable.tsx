import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import stardewService from "../service/stardewService";
import { ICrop } from "../interface/ICrop";
import IObject from "../interface/IObject";

interface IRow {
  Id: number;
  Name: string;
  Price: number;
  Sell: number;
  Edibility?: string;
  Type?: string;
  Category?: string;
  Description?: string;
  // Food: string;
  // Buffs?: string;
  GrowthDays: number;
  ReGrowDays?: number;
  GrowthSeasons: string[];
  HarvestMethod: number;
  // ExtraHarvestChance: boolean;
  ExtraHarvestChance: number;
  ExtraHarvestMin: number;
  ExtraHarvestMax: number;
  HarvestIncreasePerLevelMax: number;
  Seeds: string;
  //only reward experience for the first product and do not offer any extra experience for the multiples
  XP: number;
}
const columns: GridColDef[] = [
  { field: "Id", width: 0 }, //only show when needed
  { field: "Name", width: 160 },
  { field: "Price" },
  { field: "Sell" },
  // { field: "Edibility", width: 60 }, //always -300
  // { field: "Type" }, //always Seeds
  // { field: "Category" }, //always -74
  { field: "Description", flex: 1 },
  // { field: "Food" }, // blank
  // { field: "Buffs" }, // blank
  { field: "GrowthDays", headerName: "GDays", width: 60 },
  { field: "ReGrowDays", headerName: "RDays", width: 60 },
  { field: "GrowthSeasons", headerName: "Seasons", width: 150 },
  // { field: "HarvestMethod" }, //1 for scythe else 0
  {
    field: "ExtraHarvestChance",
    headerName: "Xtra %",
    valueFormatter: (p) => `${p.value * 100} %`,
  },
  // { field: "ExtraHarvestMin" },
  // { field: "ExtraHarvestMax" },
  {
    field: "Xtra #",
    valueGetter: (p) => `${p.row.ExtraHarvestMin}-${p.row.ExtraHarvestMax}`,
  },
  // { field: "HarvestIncreasePerLevelMax" },// 10 for rice, 0 for everything else.
  // { field: "Seeds" }, //true for trellis else false
  { field: "XP" },
  { field: "XP/D", valueGetter: (p) => p.row.XP / p.row.GrowthDays },
  { field: "XP/G", valueGetter: (p) => p.row.XP / p.row.Price },
];

export default function CropTable() {
  const [crops, setCrops] = useState<ICrop[]>([]);
  const [objects, setObjects] = useState<IObject[]>([]);
  useEffect(() => {
    (async () => {
      const cropsPromise = stardewService
        .getCrops()
        .then((crops) => setCrops(crops));
      const objectsPromise = stardewService
        .getObjects()
        .then((objects) => setObjects(objects));
      await cropsPromise;
      await objectsPromise;
    })();
  }, []);

  const rows: IRow[] = useMemo(() => {
    return crops.map((c): IRow => {
      const o = objects.find((b) => b["Object Id"] == c["Object Id"]);
      const h = objects.find((b) => b["Object Id"] == c["Index Of Harvest"]);
      return {
        ...c,
        ...o,
        Id: Number(c["Object Id"]),
        Name: o?.Name ?? "",
        Price: Number(o?.Price),
        Sell: Number(h?.Price),
        // Food: o?.["Food and Drink"] ?? "", //Blank
        GrowthDays: [
          c["Days in Stage 1 Growth"],
          c["Days in Stage 2 Growth"],
          c["Days in Stage 3 Growth"],
          c["Days in Stage 4 Growth"],
          c["Days in Stage 5 Growth"],
        ].reduce((sum, d) => sum + Number(d), 0),
        ReGrowDays: Number(c["Regrow After Harvest"]),
        GrowthSeasons: c["Growth Seasons"]?.split(" ") ?? [],
        HarvestMethod: Number(c["Harvest Method"]),
        ExtraHarvestChance: Number(c["Chance For Extra Crops"]),
        ExtraHarvestMin: Number(c["Min Extra Harvest"]),
        ExtraHarvestMax: Number(c["Max Extra Harvest"]),
        HarvestIncreasePerLevelMax: Number(
          c["Max Harvest Increase Per Farming Level"]
        ),
        // Seeds: Boolean(c["Raised Seeds"]),
        Seeds: c["Raised Seeds"],
        XP: Math.round(16 * Math.log(0.018 * Number(h?.Price ?? 0) + 1)),
      };
    });
  }, [crops, objects]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <h3>Crop Table Two</h3>
      <div style={{ minHeight: 0 }}>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.Id}
            density="compact"
          />
        )}
      </div>
    </div>
  );
}
