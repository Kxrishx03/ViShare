import styled from "styled-components";
import {Link} from "react-router-dom";
import {format} from "timeago.js";
import axios from "axios";
import { useState,useEffect } from "react";

const Container = styled.div`
 width: ${(props)=>props.type !== "sm" ? "400px" : "400px"};
 cursor: pointer;
 margin: ${(props)=>props.type === "sm" && "0px"};
 margin-bottom:${(props)=>props.type === "sm" ? "0px" :"30px"};
 display: ${(props)=>props.type === "sm" && "flex"};
 gap: 10px;
`;

const Img = styled.img`
  width: ${(props)=>props.type === "sm" ? "50%" :"100%"};
  height: ${(props)=>props.type === "sm" ? "120px" :"200px"};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  height: ${(props) => props.type === "sm" && "200px"};
  width: ${(props) => props.type === "sm" && "100%"};
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 15px;
  flex: 1;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props)=>props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 7px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


export function Card({type,video}){
 
  const [channel,setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchChannel();
  }, [video.userId]);
    return(
        <Link  style={{textDecoration:"none",color:"inherit"}} to={`/video/${video._id}`}>
        <Container type={type}>
           <Img type={type} src={video.imgUrl
}/>
           <Details type={type}>
            <ChannelImage type={type} src={channel.img} />
            <Texts >
                <Title >{video.title}</Title>
                <ChannelName>{channel.name}</ChannelName>
                <Info>{video.views} views • {format(video.createdAt)}</Info>
            </Texts>
           </Details>
        </Container>
        </Link>
    )
}