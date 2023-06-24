import { useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import stardewService from "../service/stardewService";
import { ICrop } from "../interface/ICrop";
import IObject from "../interface/IObject";
import SeasonSelect from "./SeasonSelect";
import { TextField } from "@mui/material";

interface IRow {
  Id: number;
  Seed: string;
  Harvest: string;
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
  Harvests: number;
  Quantity: number;
  TotalGrowthDays: number;
  Seeds: string;
  //only reward experience for the first product and do not offer any extra experience for the multiples
  XP: number;
}
const columns: GridColDef[] = [
  { field: "Id", width: 0 }, //only show when needed
  { field: "Seed", width: 160 },
  { field: "Harvest", width: 160 },
  { field: "Price" },
  { field: "Sell" },
  // { field: "Edibility", width: 60 }, //always -300
  // { field: "Type" }, //always Seeds
  // { field: "Category" }, //always -74
  { field: "Description", flex: 1 },
  // { field: "Food" }, // blank
  // { field: "Buffs" }, // blank
  { field: "GrowthDays", headerName: "GD", description: "Growth Days" },
  {
    field: "ReGrowDays",
    headerName: "RD",
    description: "ReGrow Days",
    valueFormatter: ({ value: x }) => (x < 1 ? "-" : x),
  },
  {
    field: "GrowthSeasons",
    headerName: "Seasons",
    width: 120,
    valueFormatter: ({ value: x }) =>
      (x as string[])
        .map((s) => s.charAt(0).toUpperCase() + s.slice(1, 2))
        .join(","),
  },
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
  { field: "XP", headerName: "XP/H", description: "Experience per Harvest" },
  { field: "Harvests", headerName: "H #", description: "Max Harvests" },
  { field: "Quantity", headerName: "Qty", description: "Quantity" },
  {
    field: "G/D",
    description: "Profit per Day",
    valueGetter: ({ row: p }) =>
      (p.Sell * p.Quantity - p.Price) / p.TotalGrowthDays,
  },
  {
    field: "XP/D",
    description: "Experience per Day",
    valueGetter: ({ row: p }) => (p.XP * p.Harvests) / p.TotalGrowthDays,
  },
  {
    field: "XP/G",
    description: "Experience per Cost",
    valueGetter: ({ row: p }) => (p.XP * p.Harvests) / p.Price,
  },
];

export default function CropTable() {
  const [crops, setCrops] = useState<ICrop[]>([]);
  const [objects, setObjects] = useState<IObject[]>([]);
  const [season, setSeason] = useState<string>("");
  const [day, setDay] = useState<number>(1);

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
    return crops
      .filter((c) => c["Growth Seasons"].includes(season.toLowerCase()))
      .map((c): IRow => {
        const o = objects.find((b) => b["Object Id"] === c["Object Id"]);
        const h = objects.find((b) => b["Object Id"] === c["Index Of Harvest"]);
        return {
          ...c,
          ...o,
          Id: Number(c["Object Id"]),
          Seed: o?.Name ?? "",
          Harvest: h?.Name ?? "",
          Price: Number(o?.Price) * 2, //temp fix. Need to have a better way for getting seed cost for various seed sources.
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
          Harvests: 0,
          Quantity: 0,
          TotalGrowthDays: 0,
        };
      })
      .map((r): IRow => {
        //track harvests and growth days
        let harvests = 0;
        let gd = 0;
        //If season is not in growth seasons then return 0 (should not happen due to filter).
        //if(!r.GrowthSeasons.includes(season.toLowerCase()))
        //If season is blank use first growth season as season and day as 1
        let s = season.toLowerCase();
        let d = day;
        if (s === "") {
          s = r.GrowthSeasons[0];
          d = 1;
        }
        //Get remaining days in season
        let rd = 28 - d;
        //Add days for multi-season crops.
        //If all 4 seasons set to 4*28
        if (r.GrowthSeasons.length == 4) rd = 4 * 28;
        else if (r.GrowthSeasons.length > 1) {
          //calculate remaining seasons
          let rs = r.GrowthSeasons.length - (r.GrowthSeasons.indexOf(s) + 1);
          rd += rs * 28;
        }
        //subtract initial growth days
        rd -= r.GrowthDays;
        //if remaining days then add 1 to harvest
        if (rd >= 0) {
          harvests++;
          gd += r.GrowthDays;
          //if can regrow
          const rgd = r.ReGrowDays ?? -1;
          if (rgd > 0) {
            rd -= rgd;
            while (rd >= 0) {
              harvests++;
              gd += rgd;
              rd -= rgd;
            }
          }
        }
        return {
          ...r,
          Harvests: harvests,
          Quantity: Math.max(1, r.ExtraHarvestMin) * harvests,
          TotalGrowthDays: gd,
        };
      });
  }, [crops, objects, season, day]);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDay = Number(e.target.value);
    if (newDay < 1) {
      setDay(1);
      return;
    }
    if (newDay > 28) {
      setDay(28);
      return;
    }
    setDay(newDay);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "auto 1fr",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", margin: "20px 10px 5px", gap: "20px" }}>
        <h1 style={{ margin: "0px" }}>Crop Table</h1>
        <SeasonSelect season={season} onChange={(ns) => setSeason(ns)} />
        <TextField
          type="number"
          size="small"
          label="Day"
          value={day}
          onChange={handleDayChange}
          sx={{ width: "100px" }}
        />
      </div>
      <div style={{ minHeight: 0, overflow: "auto" }}>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              columns: {
                ...columns,
                columnVisibilityModel: {
                  Id: false,
                  Description: false,
                },
              },
            }}
            getRowId={(row) => row.Id}
            density="compact"
            hideFooter
            slots={{ toolbar: GridToolbar }}
            //remove export button
            slotProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
