import React from 'react';
import {ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import LocalBarIcon from '@material-ui/icons/LocalBar';

const Ingredient = ({name, amount}) => {
  return (
      <ListItem>
        <ListItemIcon>
          <LocalBarIcon/>
        </ListItemIcon>
        <ListItemText primary={name + ' - ' + amount}/>
      </ListItem>
  )
}

export default Ingredient;