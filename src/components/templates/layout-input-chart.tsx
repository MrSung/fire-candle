import React from 'react'
import styled from 'styled-components'

export const LayoutInputChart: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1110px;
  margin: 0 auto;
  padding: 40px 0;
`
