import styled from "styled-components";
import { Comment } from "./Comment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

export function Comments({videoId}){

   const { currentUser } = useSelector((state) => state.user);
   const [comments,setComments] = useState([]);
  
   useEffect(() =>{
    const fetchComments = async () =>{
      try{
         const res = await axios.get(`https://vi-share-beta.vercel.app/api/comments/${videoId}`);
         setComments(res.data);
      } catch(err) {
          console.log({Error:err.message});
      }
    }
    fetchComments();
   },[videoId]);
    return (
          <Container>
              <NewComment>
                <Avatar src={currentUser.imgUrl}></Avatar>
                <Input placeholder="Add a comment..."></Input>
              </NewComment>
              {comments && comments.map((comment)=>(
                <Comment comment={comment} key={comment._id}/>
              ))}
              
              
          </Container>
    )
}