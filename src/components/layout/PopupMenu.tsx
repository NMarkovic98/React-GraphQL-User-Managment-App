// @ts-nocheck
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { popupMenuStyleHook } from "../../styles/syleHooks";

const BasicMenu: React.FC<{
  selectionModel;
  deleteUser;
  stopPropagation;
  userId;
}> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = popupMenuStyleHook();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.stopPropagation(event);

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    props.deleteUser();
    setAnchorEl(null);
  };

  const userProfileLink = `user/${props.userId}`;

  return (
    <div>
      <MoreIcon
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem>
          <Link className={classes.editLink} to={userProfileLink}>
            Edit
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};
export default BasicMenu;
