import { Autocomplete, TextField } from "@mui/material";

interface SeasonSelectProps {
  season?: string;
  onChange(season: string): void;
}
const seasons = ["", "Spring", "Summer", "Fall", "Winter"];

export default function SeasonSelect(props: SeasonSelectProps): JSX.Element {
  const { season, onChange } = props;
  const value =
    seasons.find((s) => s.toLowerCase() === season?.toLowerCase()) ??
    seasons[0];
  return (
    <Autocomplete
      value={value}
      onChange={(_e: any, newValue: string | null) => {
        onChange(newValue ?? "");
      }}
      options={seasons}
      sx={{ width: 200 }}
      renderInput={(params: any) => <TextField {...params} label="Season" />}
      size="small"
    />
  );
}
