import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import React, { useEffect, useState } from 'react';
import { Button } from '../components/common/Button';
import { patchPost } from '../apis/post/patchPost';
import { getPostDetail } from '../apis/get/getPostDetail';

export const Edit = () => {
  const [input, setInput] = useState({
    title: "",
    data: "",
  });
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile
  const navigate = useNavigate();
  const { id } = useParams();

  /**
   * useEffect를 통해 글 정보중 제목과 내용을 불러온다.
   * 그 후 입력값을 {제목, 내용} 으로 설정한다.
   */
  useEffect(() => {
    getPostDetail(id).then(res => {
      if(res) {
        setInput({
          title: res.data.title,
          data: res.data.data
        })
      }
    })
  }, [])

  const handleChange = (e) => { //입력값 변경 감지
    const {value, name} = e.target;
    setInput({...input, [name]: value});
  }
  
  /**
   * 글 수정 버튼 클릭이벤트
   * 만약 응답이 돌아온다면 글 확인 페이지로 이동한다.
   * @event onClick
   */
  const handleClick = () => {
    patchPost(input, id).then(res => {
      if(res) {
        alert("글이 정상적으로 수정되었습니다.");
        navigate(`/posts/${id}`);
      }
    })
  }

  return <Wrapper>
    <WritePost>
      <Form pc={isPc}>
        <input placeholder="제목을 입력해주세요" name="title" onChange={handleChange} value={input.title}/>
        <hr />
        <textarea placeholder="내용을 입력해주세요" name="data" onChange={handleChange} value={input.data}/>
      </Form>
      <Button Text="수정 완료" Click={handleClick} Width={isPc?200:130} Height={50} Style={{alignSelf: "flex-end"}} />
    </WritePost>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 853px;
`

const WritePost = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid black;
  & > input {
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: inherit;
    font-size: ${props => props.pc?"30px":"25px"};
  }
  & > textarea {
    height: 600px;
    padding: 10px;
    border-radius: inherit;
    font-size: ${props => props.pc?"20px":"15px"};
    font-weight: bolder;
  }
`