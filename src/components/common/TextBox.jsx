import { styled } from 'styled-components';

export const TextBox = ({ Title, Date, Author, Likes, Id }) => {
  return <Wrapper onClick={() => window.location.href = `http://localhost:3000/posts/${Id}`}>
    <Left> <h1>{Title}</h1> <h1>{Date}</h1> </Left>
    <Right>
      <h1>{Author}</h1>
      <Like>
        <h1>{Likes}</h1>
        <img src="/imgs/like.svg" alt="likes" width="20px" height="20px"/>
      </Like>
    </Right>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 110px;
  cursor: pointer;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 15px;
  background: #EFEAEA;
  box-sizing: border-box;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  & > h1:nth-child(2) { font-size: 20px; }
`
const Right = styled.div`
  display: flex;
  flex-direction: column;
  & > h1 { font-size: 25px; }
`
const Like = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  h1 { font-size: 25px; }
`