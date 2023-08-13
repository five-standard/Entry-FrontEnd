// 완성
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const TextBox = ({ Title, Date, Author, Likes, Id }) => {
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/posts/${Id}`)
  }

  return <Wrapper onClick={handleClick}>
    <Left pc={isPc}> <h1>{Title.length > (isPc?11:8) ? Title.substr(0, (isPc?11:8)) + "..." : Title}</h1> <h1>{Date}</h1> </Left>
    <Right pc={isPc}>
      <h1>{Author}</h1>
      <Like pc={isPc}>
        <h1>{Likes}</h1>
        <img src="/imgs/like.svg" alt="likes" width={isPc?"20px":"15px"} height={isPc?"20px":"15px"} />
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
  & > h1 { font-size: ${props => props.pc?"30px":"20px"} }
  & > h1:nth-child(2) { font-size: ${props => props.pc?"20px":"15px"} }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  & > h1 { font-size: ${props => props.pc?"25px":"20px"} }
`

const Like = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  h1 { font-size: ${props => props.pc?"25px":"20px"} }
`