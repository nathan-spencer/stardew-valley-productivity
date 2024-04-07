import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import stardewService from "../service/stardewService";
import { ICrop } from "../interface/ICrop";
import IObject from "../interface/IObject";
import SeasonSelect, { Season } from "./SeasonSelect";
import { Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import ISeedSource from "../interface/ISeedSource";
import "../style/style.css";
import { AgricultureOutlined, Brightness4Outlined, DateRangeOutlined, EventRepeatOutlined, MonetizationOnOutlined, Numbers, ShoppingBagOutlined, TipsAndUpdatesOutlined } from "@mui/icons-material";

interface IRow {
  Id: number;
  Seed: string;
  Harvest: string;
  Price: number;
  Source: string;
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

const numberColumnProps: Pick<GridColDef, "width" | "align" | "headerAlign" | "hideSortIcons" | "disableColumnMenu"> = {
  width: 0,
  align: "right",
  headerAlign: "right",
  hideSortIcons: true,
  disableColumnMenu: true,
};

const columns: GridColDef[] = [
  { field: "Id", width: 0 }, //only show when needed
  { field: "Seed", width: 160 },
  { field: "Harvest", width: 160 },
  {
    ...numberColumnProps,
    field: "Price",
    width: 60,
    renderHeader: () => (
      <Tooltip title="Price">
        <ShoppingBagOutlined />
      </Tooltip>
    ),
  },
  { field: "Source" },
  {
    ...numberColumnProps,
    field: "Sell",
    renderHeader: () => (
      <Tooltip title="Sell Price">
        <MonetizationOnOutlined />
      </Tooltip>
    ),
  },
  // { field: "Edibility", width: 60 }, //always -300
  // { field: "Type" }, //always Seeds
  // { field: "Category" }, //always -74
  { field: "Description", flex: 1 },
  // { field: "Food" }, // blank
  // { field: "Buffs" }, // blank
  {
    ...numberColumnProps,
    field: "GrowthDays",
    headerName: "Growth Days",
    renderHeader: () => (
      <Tooltip title="Growth Days">
        <DateRangeOutlined />
      </Tooltip>
    ),
  },
  {
    ...numberColumnProps,
    field: "ReGrowDays",
    headerName: "Regrowth Days",
    valueFormatter: ({ value: x }) => (x < 1 ? "-" : x),
    renderHeader: () => (
      <Tooltip title="Regrowth Days">
        <EventRepeatOutlined />
      </Tooltip>
    ),
  },
  {
    field: "GrowthSeasons",
    headerName: "Seasons",
    width: 105,
    valueGetter: (p) => (p.row.GrowthSeasons as string[]).map((s) => s.charAt(0).toUpperCase() + s.slice(1, 2)).join(","),
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
  {
    ...numberColumnProps,
    width: 65,
    field: "XP",
    headerName: "Exp. per Harvest",
    renderHeader: () => (
      <Tooltip title="Experience per Harvest">
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <TipsAndUpdatesOutlined fontSize="small" />/
          <AgricultureOutlined fontSize="small" />
        </Box>
      </Tooltip>
    ),
  },
  {
    ...numberColumnProps,
    field: "Harvests",
    headerName: "Max Harvests",
    renderHeader: () => (
      <Tooltip title="Max Harvests">
        <AgricultureOutlined />
      </Tooltip>
    ),
  },
  {
    ...numberColumnProps,
    field: "XP*H",
    headerName: "Max Exp.",
    renderHeader: () => (
      <Tooltip title="Max Experience">
        <TipsAndUpdatesOutlined />
      </Tooltip>
    ),
    valueGetter: ({ row: p }) => p.XP * p.Harvests,
  },
  {
    ...numberColumnProps,
    field: "Quantity",
    renderHeader: () => (
      <Tooltip title="Quantity">
        <Numbers />
      </Tooltip>
    ),
  },
  {
    ...numberColumnProps,
    width: 65,
    field: "G/D",
    headerName: "Profit per Day",
    renderHeader: () => (
      <Tooltip title="Profit per Day">
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <MonetizationOnOutlined fontSize="small" />/
          <Brightness4Outlined fontSize="small" />
        </Box>
      </Tooltip>
    ),
    valueGetter: ({ row: p }) => (p.Sell * p.Quantity - p.Price) / p.TotalGrowthDays,
    valueFormatter: (p) =>
      p.value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
  },
  {
    ...numberColumnProps,
    width: 65,
    field: "XP/D",
    description: "Exp. per Day",
    renderHeader: () => (
      <Tooltip title="Experience per Day">
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <TipsAndUpdatesOutlined fontSize="small" />/
          <Brightness4Outlined fontSize="small" />
        </Box>
      </Tooltip>
    ),
    valueGetter: ({ row: p }) => (p.TotalGrowthDays <= 0 ? 0 : (p.XP * p.Harvests) / p.TotalGrowthDays),
    // valueFormatter: (p) => round(p.value, 3),
    valueFormatter: (p) =>
      p.value.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }),
  },
  {
    ...numberColumnProps,
    width: 65,
    field: "XP/G",
    headerName: "Exp. per Cost",
    renderHeader: () => (
      <Tooltip title="Experience per Cost">
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <TipsAndUpdatesOutlined fontSize="small" />/
          <MonetizationOnOutlined fontSize="small" />
        </Box>
      </Tooltip>
    ),
    valueGetter: ({ row: p }) => (p.XP * p.Harvests) / p.Price,
    valueFormatter: (p) =>
      p.value.toLocaleString(undefined, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }),
  },
];

type PriceType = "Source" | "Seed" | "Seed Maker";
const priceTypes: PriceType[] = ["Source", "Seed", "Seed Maker"];

export default function CropTable() {
  const [crops, setCrops] = useState<ICrop[]>([]);
  const [objects, setObjects] = useState<IObject[]>([]);
  const [season, setSeason] = useState<Season>((localStorage.getItem("season") as Season) ?? "Spring");
  const [price, setPrice] = useState<PriceType>((localStorage.getItem("price") as PriceType) ?? "Source");
  const [day, setDay] = useState<number>((localStorage.getItem("day") as unknown as number) ?? 1);
  const [sources, setSources] = useState<ISeedSource[]>([]);

  const fetchSources = useCallback(async () => {
    await stardewService.getSeedSources().then((r) => setSources(r));
  }, []);
  useEffect(() => {
    fetchSources();
  }, [fetchSources]);

  useEffect(() => {
    (async () => {
      const cropsPromise = stardewService.getCrops().then((crops) => setCrops(crops));
      const objectsPromise = stardewService.getObjects().then((objects) => setObjects(objects));
      await cropsPromise;
      await objectsPromise;
    })();
  }, []);

  const rows: IRow[] = useMemo(() => {
    return crops
      .filter((c) => season.toLowerCase() === "greenhouse" || c["Growth Seasons"].includes(season.toLowerCase()))
      .map((c): IRow => {
        const o = objects.find((b) => b["Object Id"] === c["Object Id"]);
        const h = objects.find((b) => b["Object Id"] === c["Index Of Harvest"]);
        const s = sources.find((s) => s.ObjectId === Number(c["Object Id"]));
        let p = s?.Price ?? 0;
        switch (price) {
          case "Seed":
            p = Number(o?.Price) ?? p;
            break;
          case "Seed Maker":
            p = o?.["Object Id"] === h?.["Object Id"] ? Number(h?.Price) ?? p : (s?.Sell ?? 0) / 2;
        }
        return {
          ...c,
          ...o,
          Id: Number(c["Object Id"]),
          Seed: o?.Name ?? "",
          Harvest: h?.Name ?? "",
          Price: p,
          Source: s?.Source ?? "",
          Sell: s?.Sell ?? 0,
          // Food: o?.["Food and Drink"] ?? "", //Blank
          GrowthDays: [c["Days in Stage 1 Growth"], c["Days in Stage 2 Growth"], c["Days in Stage 3 Growth"], c["Days in Stage 4 Growth"], c["Days in Stage 5 Growth"]].reduce(
            (sum, d) => sum + Number(d),
            0
          ),
          ReGrowDays: Number(c["Regrow After Harvest"]),
          GrowthSeasons: c["Growth Seasons"]?.split(" ") ?? [],
          HarvestMethod: Number(c["Harvest Method"]),
          ExtraHarvestChance: Number(c["Chance For Extra Crops"]),
          ExtraHarvestMin: Number(c["Min Extra Harvest"]),
          ExtraHarvestMax: Number(c["Max Extra Harvest"]),
          HarvestIncreasePerLevelMax: Number(c["Max Harvest Increase Per Farming Level"]),
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
        if (r.GrowthSeasons.length === 4 || s === "greenhouse") rd = 4 * 28;
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
  }, [crops, objects, season, day, sources, price]);

  const handleSeasonChange = (newSeason: Season) => {
    localStorage.setItem("season", newSeason);
    setSeason(newSeason);
  };

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
    localStorage.setItem("day", newDay.toString());
    setDay(newDay);
  };

  const handlePriceChange = (newPrice: PriceType) => {
    localStorage.setItem("price", newPrice);
    setPrice(newPrice as PriceType);
  };

  return (
    <div className="container">
      <div style={{ display: "flex", margin: "15px 0px 5px", gap: "20px" }}>
        <SeasonSelect season={season} onChange={handleSeasonChange} />
        <TextField type="number" size="small" label="Day" value={day} onChange={handleDayChange} sx={{ width: "100px" }} />
        <Autocomplete
          value={price}
          onChange={(_e: any, newValue: PriceType | null) => {
            handlePriceChange(newValue ?? "Source");
          }}
          options={priceTypes}
          sx={{ width: 200 }}
          renderInput={(params: any) => <TextField {...params} label="Price" />}
          size="small"
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
                  Harvest: false,
                  Description: false,
                  ExtraHarvestChance: false,
                  "Xtra #": false,
                  // "XP/G": false,
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
            sx={{
              borderColor: "action.disabled",
              "& .MuiDataGrid-cell, .MuiDataGrid-columnHeaders": {
                borderColor: "action.disabled",
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
