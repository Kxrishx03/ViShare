import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div`
 width: ${(props)=>props.type !== "sm" ? "300px" : "200px"};
 cursor: pointer;
 margin: ${(props)=>props.type === "sm" && "0px"};
 margin-bottom:${(props)=>props.type === "sm" ? "0px" :"45px"};
 display: ${(props)=>props.type === "sm" && "flex"};
 gap: 10px;
`;

const Img = styled.img`
  width: 50%;
  height: ${(props)=>props.type === "sm" ? "120px" :"190px"};
  background-color: #999;
  flex: 1;
`;

const Details = styled.div`
  height: ${(props) => props.type === "sm" && "200px"};
  width: ${(props) => props.type === "sm" && "100%"};
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 10x;
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
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;


export function Card({type}){
    return(
        <Link  style={{textDecoration:"none",color:"inherit"}} to="/video/test">
        <Container type={type}>
           <Img type={type} src="https://img.youtube.com/vi/HURAE4hnFrI/sddefault.jpg"/>
           <Details type={type}>
            <ChannelImage type={type} />
            <Texts >
                <Title >Test Video</Title>
                <ChannelName>Test Channel</ChannelName>
                <Info>660,908 views • 1 day ago</Info>
            </Texts>
           </Details>
        </Container>
        </Link>
    )
}