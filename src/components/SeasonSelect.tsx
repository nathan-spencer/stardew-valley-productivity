import { Autocomplete, TextField } from "@mui/material";

export type Season =
  | ""
  | "Spring"
  | "Summer"
  | "Fall"
  | "Winter"
  | "Greenhouse";
interface SeasonSelectProps {
  season?: Season;
  onChange(season: Season): void;
}
const seasons: Season[] = [
  "",
  "Spring",
  "Summer",
  "Fall",
  "Winter",
  "Greenhouse",
];

export default function SeasonSelect(props: SeasonSelectProps): JSX.Element {
  const { season, onChange } = props;
  const value =
    seasons.find((s) => s.toLowerCase() === season?.toLowerCase()) ??
    seasons[0];
  return (
    <Autocomplete
      value={value}
      onChange={(_e: any, newValue: Season | null) => {
        onChange(newValue ?? "");
      }}
      options={seasons}
      sx={{ width: 200 }}
      renderInput={(params: any) => <TextField {...params} label="Season" />}
      size="small"
    />
  );
}
