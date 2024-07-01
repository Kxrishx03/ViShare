import styled from "styled-components";
import {Card} from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;


export function Home({type}){

    const [videos,setVideos] = useState([]);

    useEffect(()=>{
          const fetchVideos = async () => {

             const res = await axios.get("http://localhost:3000/api/videos/random");
             console.log(res.data);
             setVideos(res.data);
          };
          fetchVideos();
    },[type]);

    return (
        <Container>
        {videos.map((video) =>{
          <Card  />
        })}
        </Container>
    )
}