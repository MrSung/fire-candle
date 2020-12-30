import React from 'react'
import Button from '@material-ui/core/Button'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'

export interface IStartButtonProps {
  onClick: () => void
}

export const StartButton: React.FC<IStartButtonProps> = ({
  children,
  onClick
}) => (
  <Button
    variant='contained'
    color='primary'
    startIcon={<PlayArrowIcon />}
    onClick={onClick}
  >
    {children}
  </Button>
)
