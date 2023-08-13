import { styled } from 'styled-components';

export const Logo = () => {
  return <Wrapper>TextBoard</Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  border-radius: 15px;
  background: #EFEAEA;
  box-shadow: 4px 0px 6px gray;
  font-size: 40px;
`