import styled from 'styled-components';

const TextBox = ({ Title, Date, Author, Id }) => {
  const goPost = Id => {
     window.location.href = `http://localhost:3000/posts/${Id}`;
  }

  return <Wrapper onClick={() => goPost(Id)}>
      <Left>
      <h1>{Title}</h1>
      <h1>{Date}</h1>
    </Left>
    <h1>{Author}</h1>
  </Wrapper>
};

export default TextBox;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 110px;
  background: #EFEAEA;
  border-radius: 15px;
  & > h1 {
    font-size: 25px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const Left = styled.div`
  display: flex;
  font-family: inter;
  flex-direction: column;
  & > h1 {
    margin: 0;
    &:nth-child(2) {
      font-size: 20px;
    }
  }
`;
