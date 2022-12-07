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
// AVATAR COLORING
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

function ResponsiveAppBar({ artists, onChange, onInput, tokenHandler, loginPopUp, drawerMenuHandler, token, username }) {
 
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
    <AppBar id={styles.menu}>
     <div></div>
            <Autocomplete id={styles.search} 
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                onChange(newValue)
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                if (newInputValue !== 'undefined')
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
            /> {token ? 
              <IconButton onClick={drawerMenuHandler} sx={{ p: 0 }}>
                <Avatar {...stringAvatar(`Andrew Lendvai`)} />
              </IconButton> : <button id={styles.signupbutton}onClick={loginPopUp}>Log in</button>}
    </AppBar>
    </StyledEngineProvider>
  );
}
export default ResponsiveAppBar;
