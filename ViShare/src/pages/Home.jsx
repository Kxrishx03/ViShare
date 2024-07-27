import styled from "styled-components";
import { Card } from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export function Home({ type }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`https://vi-share-beta.vercel.app/api/videos/${type}`);
        setVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error.message);
        console.error("Error details:", error.response?.data || error);
      }
    };

    if (type) {
      fetchVideos();
    } else {
      console.warn("Type is not defined");
    }
  }, [type]);

  return (
    <Container>
      {videos && videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
}
