import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { getPostDtail } from '../apis/get/getPostDetail';
import { commentPost } from '../apis/post/commentPost';

export const Posts = () => { 
  const [cookies,] = useCookies(); 
  const { id } = useParams();
  const _comment = useRef();
  const [response, setResponse] = useState({});
  const [comment, setComment] = useState([]);
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    getPostDtail(id).then(res => {
      setResponse(res.data);
      setComment(res.data.comments);
    })
  }, [id]) 

  useEffect(() => {
    commentPost(comment, id);
  }, [id, comment])

  const ResetComment = (e) => {
    e.preventDefault();
    _comment.current.value = "";
  }

  const handleEditButton = (e) => {
    _comment.current.value = comment[e.target.id].data;
    setEdit(e.target.id);
  }

  const handleEdit = (e) => {
    if(e.key === "Enter") {
      let tmp = [...comment]; //임시 배열을 생성한다
      if(_comment.current.value==="") { tmp.splice(edit, 1); } //입력값이 비었다면 해당 댓글을 삭제한다
      else { tmp[edit].data = _comment.current.value; } //입력값이 안 비었다면 해당 댓글을 수정한다
      tmp.splice(edit, 1);
      setComment(tmp);
      ResetComment(e);
      setEdit(-1);
    }
  }

  const handlePost = (e) => {
    if(e.key === "Enter") {
      if(cookies.accessToken) {
        setComment([...comment, {
          author: cookies.name,
          data: _comment.current.value
        }]);
        ResetComment(e);
      }
      else { 
        alert("해당 기능은 로그인이 필요합니다."); 
        ResetComment(e);
      }
    }
  }

  return <Wrapper comments={comment.length}>
    <Post>
      <Top> 
        <div>
          <Title>{response.title}</Title>
          <h2>{response.author} | {response.date}</h2>
        </div>
        <Right>
          <h1>{response.likes}</h1>
          <img src="/imgs/Like.svg" onClick={handleLike} alt="Likes"/>
          <img src="/imgs/Menu.svg" alt="Menu"/>
        </Right>
      </Top>
      <hr />
      <Data>{response.data}</Data>
    </Post>
    <Comment>
      <div>
        <h1>총 <span>{comment.length}개</span>의 댓글이 있습니다</h1>
        <textarea ref={_comment} onKeyDown={edit===-1?handlePost:handleEdit} placeholder={edit===-1?"다 작성하신 후 엔터를 누르면 자동으로 등록됩니다.":"이 상태에서 엔터를 누르면 댓글이 삭제됩니다."}/>
      </div>
      <div>
        <ul>
          {
            comment.map((item, index) => {
              return ( <li key={index}>
                <div>
                  {
                    item.author===cookies.name?
                    <button id={index} onClick={handleEditButton}>✏️</button>:
                    undefined
                  }
                  <h1>{item.author} - <span>{item.data}</span></h1>
                  </div>
                </li> )
            })
          }
        </ul>
      </div>
    </Comment>
  </Wrapper>
}

const Wrapper = styled.div`
  gap: 450px;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
`

const Post = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  width: 70%;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 { font-size: 25px; }
`

const Right = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  & > img { cursor: pointer; }
`

const Comment = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  margin-top: 5px;
  margin-bottom: 5px;
  & > div {
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 110px;
    & > textarea {
    border: 2px solid black;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    }
    & > h1 {
    font-size: 15px;
    color: gray;
    & > span { color: black; }
    }
  }
  & > h1 { align-self: flex-start; }
  & li {
    margin-bottom: 5px;
    & > div {
      gap: 5px;
      display: flex;
      align-items: center;
      & > h1 { 
        font-size: 20px;
        & > span { 
          font-size: 15px;
          font-weight: lighter;
        }
      } 
      & > button {
        width: 30px;
        height: 30px;
        border-radius: 10px;
        cursor: pointer;
        &:hover {
          border: 1px solid black; 
        }
      } 
    }
  }
`

const Title = styled.h1` font-size: 40px; `

const Data = styled.h1` font-size: 20px; `