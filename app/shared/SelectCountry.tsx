import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface SelectCountryProps {
    options: { label: string; id: number }[];
    selectedCountry: string;
    onSelect: (value: string) => void;
}

export default function SelectCountry({
    options,
    selectedCountry,
    onSelect,
}: Readonly<SelectCountryProps>) {
    return (
        <Autocomplete
            id="country-select-demo"
            sx={{ width: 300 }}
            options={options}
            autoHighlight
            value={
                selectedCountry
                    ? options.find((option) => option.label === selectedCountry)
                    : null
            }
            onChange={(_, newValue) => {
                onSelect(newValue ? newValue.label : "");
            }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                >
                    {option.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Choose a region"
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}
