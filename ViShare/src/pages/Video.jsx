import styled from "styled-components";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Comments } from "../components/Comments";
import { Card } from "../components/Card";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchSuccess, like, dislike } from "../redux/videoSlice";
import {format} from "timeago.js";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import {subscription } from "../redux/userSlice";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const Recommendation = styled.div`
  flex: 2;
`;

export function Video() {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`http://localhost:3000/api/videos/find/${path}`);
        const channelRes = await axios.get(`http://localhost:3000/api/users/find/${videoRes.data.video.userId}`);
        dispatch(fetchSuccess( videoRes.data.video));
        setChannel(channelRes.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [path, dispatch]);


  const handleLike = async () => {
    await axios.put(`http://localhost:3000/api/users/like/${currentVideo._id}`,null, {withCredentials: true});
    dispatch(like(currentUser._id));
  };
  const handleDislike = async () => {
    await axios.put(`http://localhost:3000/api/users/dislike/${currentVideo._id}`,null, {withCredentials: true});
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    await axios.put(`http://localhost:3000/api/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  }
 
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe
            width="100%"
            height="300"
            src="https://www.youtube.com/embed/yIaXoop8gl4"
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </VideoWrapper>
        <Title>{ currentVideo && currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo && currentVideo.views} views  • { currentVideo && format(currentVideo.createdAt)}</Info>
          <Buttons>

            <Button onClick={handleLike} >
              {currentVideo.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo.likes?.length}
            </Button>

            <Button onClick={handleDislike}>
              {currentVideo.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>


            <Button>
            <ReplyIcon />Share</Button>
            <Button><SaveAltIcon />Download</Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel && channel.img} />
            <ChannelDetail>
              <ChannelName>{ channel && channel.name}</ChannelName>
              <ChannelCounter>{channel && channel.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo && currentVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscribe}>
            {currentUser.subscribedUsers?.includes(channel._id)?"SUBSCRIBED":"SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments />
      </Content>
      {/* <Recommendation>
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
        <Card type="sm" />
      </Recommendation> */}
    </Container>
  );
}
