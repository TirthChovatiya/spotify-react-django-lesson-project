import React from 'react';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import classNames from 'classnames';

export default function PlayButton(props) {
  const colorClassName = props.color || 'text-green-400';

  return (
    <div className={classNames(props.className)}>
      <IconButton
        aria-label="play-pause"
        className="hover:scale-125 duration-500"
        onClick={props.onClick}
        onKeyUp={e => e.preventDefault()}
      >
        {props.isPlaying ? (
          <PauseCircleIcon className={colorClassName} style={{ fontSize: 50 }} />
        ) : (
          <PlayCircleFilledRoundedIcon className={colorClassName} style={{ fontSize: 50 }} />
        )}
      </IconButton>
    </div>
  );
}
