import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

import { StartButton } from '../atoms/start-button'

export interface IStartBlockProps {
  onStartButtonClick: () => void
}

export const StartBlock = ({ onStartButtonClick }: IStartBlockProps) => (
  <Wrapper>
    <TextBlock>
      <Typography>デモトレを始める</Typography>
    </TextBlock>
    <StartButton onClick={onStartButtonClick}>START</StartButton>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 640px;
  margin: 0 auto;
  padding: 60px 0;
`

const TextBlock = styled.div`
  margin-bottom: 1rem;
`
