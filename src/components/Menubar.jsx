import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { StyledEngineProvider } from '@mui/material/styles';
import styles from "./Menubar.module.css";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar({ artists, onChange, onInput }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const options = artists.map((option, index) => {
    const firstLetter = option.artistName[0].toUpperCase();
    return {
      indexOfArtist: index,
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState("");

  return (
    <StyledEngineProvider injectFirst>
    <AppBar id={styles.menu} position="sticky">
    <IconButton className="icon"
                  sx={{ color: "white" }}
                  >
      <Menu/>
      </IconButton>
            <Autocomplete id={styles.search} 
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                onChange(newValue)
                // console.log("newValue", newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
                onInput(newInputValue)
              }}
              freeSolo
              size="small"
              disableClearable
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.artistName}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search by Artist or type any Keywords"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
    </AppBar>
    </StyledEngineProvider>
  );
}
export default ResponsiveAppBar;
