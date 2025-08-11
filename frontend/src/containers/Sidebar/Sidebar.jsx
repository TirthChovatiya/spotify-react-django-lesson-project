import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import spotifyLogo from '../../assets/images/ChatGPT Image Aug 3, 2025, 01_59_03 PM.png';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="basis-[20%] h-full bg-stone-900">
      <div className="p-5">
        <img src={spotifyLogo} alt="Spotify Logo" width={250} height={10} />
      </div>

      <List className="text-white">
        <NavLink to="/">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
        </NavLink>

        <NavLink to="/search">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SearchIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItemButton>
          </ListItem>
        </NavLink>
      </List>

      <List className="text-white">
        <NavLink to="/liked-songs">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FavoriteRoundedIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Liked Songs" />
            </ListItemButton>
          </ListItem>
        </NavLink>
        <Divider className="bg-white" />
      </List>
    </div>
  );
}
