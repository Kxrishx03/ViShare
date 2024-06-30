import styled from "styled-components";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Comments } from "../components/Comments";
import {Card} from "../components/Card"

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

export function Video(){
    return(
        <Container>
            <Content>
            <VideoWrapper>
                <iframe
                 width="100%"
                 height="300"
                 src="https://www.youtube.com/embed/yIaXoop8gl4"
                 title="YouTube Video Player"
                 frameBorder="0"
                 allow="accelerometer;autoplay;clipboard-write;encrpted-media;gyroscope;picture-i-picture"
                 allowFullScreen>
                </iframe>
            </VideoWrapper>
            <Title>Test Video</Title>
            <Details>
                <Info>7,948,657 •Jun 29 2022</Info>
                <Buttons>
                    <Button><ThumbUpIcon/>2.1k</Button>
                    <Button><ThumbDownIcon/>Dislike</Button>
                    <Button><ReplyIcon/>Share</Button>
                    <Button><SaveAltIcon/>Download</Button>
                </Buttons>
            </Details>
            <Hr/>
            <Channel>
                <ChannelInfo>
                <Image src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"></Image>
                <ChannelDetail>
                    <ChannelName>KIARA DEV</ChannelName>
                    <ChannelCounter>500K</ChannelCounter>
                    <Description>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit quisquam ad veritatis quas. Atque eos quisquam nobis quo minima asperiores, autem sed modi qui deleniti voluptatem deserunt rerum ex mollitia?
                    </Description>
                </ChannelDetail>
                </ChannelInfo>
                <Subscribe>SUBSCRIBE</Subscribe>
            </Channel>
            <Hr/>
            <Comments />
            </Content>
            <Recommendation>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            <Card type="sm"/>
            </Recommendation>
        </Container>
    )
}