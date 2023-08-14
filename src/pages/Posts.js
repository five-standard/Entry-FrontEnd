import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { styled } from 'styled-components';
import { useCookies } from 'react-cookie';
import { getPostDetail } from '../apis/get/getPostDetail';
import { commentPost } from '../apis/post/commentPost';
import { deletePost } from '../apis/post/deletePost';
import { likePost } from '../apis/post/likePost';

export const Posts = () => {
  const [response, setResponse] = useState({});
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [edit, setEdit] = useState(-1); 
  const [cookies,] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();
  const _init = useRef(false);
  const isPc = useMediaQuery({ query: "(min-width: 820px)" }); //true: PC, false: Mobile

  useEffect(() => {
    getPostDetail(id).then(res => {
      setResponse(res.data);
      setComments(res.data.comments);
      setLikes(res.data.likes);
    })
  }, []) 

  useEffect(() => { //댓글목록 수정시 업로드
    if(_init.current) { commentPost(comments, id); }
  }, [comments])

  useEffect(() => {
    if(_init.current) { likePost(likes, id); }
    else { _init.current = true; }
  }, [likes])

  const handleCEdit = (e) => { //댓글 수정 후 이벤트
    if(e.key === "Enter") {
      let tmp = [...comments]; //임시 배열을 생성한다
      if(comment==="") { tmp.splice(edit, 1); } //입력값이 비었다면 해당 댓글을 삭제한다
      else { tmp[edit].data = comment; } //입력값이 안 비었다면 해당 댓글을 수정한다
      setComments(tmp);
      ResetComment(e);
      setEdit(-1);
    }
  }

  const handleCEditButton = (e) => { //댓글 수정 버튼 이벤트
    setComment(comments[e.target.id].data);
    setEdit(e.target.id);
  }

  const handleCPost = (e) => { //댓글 업로드 이벤트
    if(e.key === "Enter") {
      if(cookies.accessToken) {
        if(comment!=="") {
          setComments(comments => [...comments, {
            author: cookies.name,
            data: comment
          }]);
          ResetComment(e);
        } else {
          alert("글을 작성해주세요.");
          ResetComment(e);
        }
      } else { 
        alert("해당 기능은 로그인이 필요합니다."); 
        ResetComment(e);
      }
    }
  }

  const handleChange = (e) => { //댓글 수정 감지
    setComment(e.target.value);
  }

  const ResetComment = (e) => { //댓글 입력창 초기화
    e.preventDefault();
    setComment("");
  }

  const handleLike = () => {
    if(cookies.accessToken) {
      if(likes.includes(cookies.name)) {
        let tmp = [...likes];
        tmp = tmp.filter(data =>  data !== cookies.name);
        setLikes(tmp);
      } else {
        setLikes(likes => [...likes, cookies.name]);
      }
    } else { alert("해당 기능은 로그인이 필요합니다."); }
  }

  const handleEdit = () => {
    navigate(`/editPost/${id}`);
  }

  const handleDelete = () => {
    if(window.confirm("정말 삭제하시겠습니까?")) {
      deletePost(id).then(res => {
        if(res) {
          alert("삭제되었습니다");
          navigate("/");
        }
      })
    }
  }


  return <Wrapper comments={comment.length}>
    <Post>
      <Top pc={isPc}> 
        <div>
          <Title>{response.title}</Title>
          <h2>{response.author} | {response.date}</h2>
        </div>
        <Right pc={isPc}>
          <h1>{likes?likes.length:0}</h1>
          <Like src="/imgs/Like.svg" alt="Likes" width="30" liked={cookies.name?likes.includes(cookies.name):false} onClick={handleLike} title="좋아요" />
          {
            response.author === cookies.name
            ? <>
              <img src="/imgs/edit.svg" alt="Edit" width="30" title="글 수정하기" onClick={handleEdit} />
              <img src="/imgs/delete.svg" alt="Delete" width="30" title="글 삭제하기" onClick={handleDelete}/>
            </>
            : undefined
          }
        </Right>
      </Top>
      <hr />
      <Data pc={isPc}>{response.data}</Data>
    </Post>
    <Comment pc={isPc}>
      <div>
        <h1>총 <span>{comments.length}개</span>의 댓글이 있습니다</h1>
        <textarea onChange={handleChange} value={comment} onKeyDown={edit===-1?handleCPost:handleCEdit} placeholder={edit===-1?"다 작성하신 후 엔터를 누르면 자동으로 등록됩니다.":"이 상태에서 엔터를 누르면 댓글이 삭제됩니다."}/>
      </div>
      <div>
        <ul>
          {
            comments.map((item, index) => {
              return <li key={index}>
                <div>
                  {
                    item.author===cookies.name
                    ? <button id={index} onClick={handleCEditButton}>✏️</button>
                    : undefined
                  }
                  <h1>{item.author} - <span>{item.data}</span></h1>
                </div>
              </li>
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
  gap: 10px;
  display: flex;
  flex-direction: ${props => props.pc?"row":"column"};
  justify-content: space-between;
  align-items: ${props => props.pc?"center":"flex-start"};
  h1 { font-size: ${props => props.pc?"":"30px"}; }
  h2 { font-size: ${props => props.pc?"":"20px"}; }
`

const Right = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: ${props => props.pc?"20px":"15px"};
  & > img { 
    cursor: pointer; 
    width: ${props => props.pc?"30px":"20px"};
  }
  & > h1 { font-size: ${props => props.pc?"":"25px"}; }
`

const Comment = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 70%;
  margin-top: 5px;
  margin-bottom: 5px;
  & > h1 { align-self: flex-start; }
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
  & li {
    margin-bottom: 5px;
    & > div {
      gap: 5px;
      display: flex;
      align-items: center;
      & > h1 { 
        font-size: ${props => props.pc?"20px":"17px"};
        & > span { 
          font-size: ${props => props.pc?"15px":"13px"};
          font-weight: lighter;
        }
      } 
      & > button {
        cursor: pointer;
        width: 30px;
        height: 30px;
        border-radius: 10px;
        font-size: ${props => props.pc?"":"9px"};
        &:hover {
          border: 1px solid black; 
        }
      } 
    }
  }
`

const Title = styled.h1` font-size: 40px; `

const Data = styled.h1` font-size: ${props => props.pc?"20px":"15px"}; `

const Like = styled.img` filter: ${props => props.liked?"invert(90%)":undefined}; `