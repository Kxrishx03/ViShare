import styled from "styled-components";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {format} from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;


export function Comment({comment}){
    
  const [channel, setChannel] = useState({});

   useEffect(() => {
      const fetchComment = async () => {
          const res = await axios.get(`https://vi-share-beta.vercel.app/api/users/find/${comment.userId}`);
          setChannel(res.data)
      };
    fetchComment();
     }, [comment.userId]);
   
    return(
        <Container>
            <Avatar src={channel.img}></Avatar>
            <Details>
            <Name>
            {channel.name} <Date>{format(channel.createdAt)}</Date></Name>
            <Text>
            {comment.desc}
            </Text>
            </Details>
        </Container>
    )
}