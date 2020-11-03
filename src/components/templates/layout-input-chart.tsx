import React from 'react'
import styled from 'styled-components'

export const LayoutInputChart: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: 1fr;
  gap: 40px 40px;
  width: 1110px;
  margin: 0 auto;
  padding: 40px 0;
`
