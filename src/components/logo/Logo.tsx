import React from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core";

interface IImageContainerSize {
  width?: number,
  height?: number,
}

interface ILogoProps {
  width?: number;
  height?: number;
  image: string;
  alt?: string;
}

const useStyles = (size: IImageContainerSize) => makeStyles((theme: Theme) => createStyles({
  imageContainer: {
    maxWidth: size.width || '100%',
    height: size.height || '100%',
    textAlign: 'center',
    margin: '10px auto',
    '& img': {
      width: '100%',
      height: '100%',
    }
  },
}))();


export const Logo: React.FC<ILogoProps> = (props) => {
  const classes = useStyles({...props});
  return (
    <div className={classes.imageContainer}>
      <img src={props.image} alt={props.alt ? props.alt : ''}/>
    </div>
  )
}

