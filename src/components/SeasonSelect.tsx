import { Autocomplete, TextField } from "@mui/material";

interface SeasonSelectProps {
  season?: string;
  onChange(season: string): void;
}
const seasons = ["", "Spring", "Summer", "Fall", "Winter"];

export default function SeasonSelect(props: SeasonSelectProps): JSX.Element {
  const { season, onChange } = props;
  // const [value, setValue] = useState<string | null>(
  //   seasons.find((s) => s.toLowerCase() == season?.toLowerCase()) ?? seasons[0]
  // );
  const value =
    seasons.find((s) => s.toLowerCase() === season?.toLowerCase()) ??
    seasons[0];
  // const [inputValue, setInputValue] = useState("");
  return (
    <Autocomplete
      value={value}
      onChange={(_e: any, newValue: string | null) => {
        // setValue(newValue);
        onChange(newValue ?? "");
      }}
      // inputValue={inputValue}
      // onInputChange={(_e: any, newInputValue: SetStateAction<string>) => {
      //   setInputValue(newInputValue);
      // }}
      id="controllable-states-demo"
      options={seasons}
      sx={{ width: 200 }}
      renderInput={(params: any) => <TextField {...params} label="Season" />}
      size="small"
    />
  );
}
