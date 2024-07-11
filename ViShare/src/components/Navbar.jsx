import styled from "styled-components";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme})=>theme.bgLight};
`;

const Wrapper = styled.div`
 display:flex;
 justify-content:flex-end;
 align-items:center;
 height:100%;
 padding:0px 20px;
 position:relative;
`;
const Search = styled.div`
       margin-top:10px;
        width:40%;
        position:absolute;
        left: 0px;
        right:0px;
        margin:auto;
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
`;

const Button = styled.button`
padding:5px 15px;
background-color:transparent;
color:#3ea6ff;
border:1px solid #3ea6ff;
border-radius:3px;
font-weight:500;
margin-top:10px;
margin-bottom: 5px;
cursor:pointer;
display:flex;
align-items:center;
gap:5px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  margin-top:10px;
  margin-bottom: 9px;
`;

export function Navbar(){

    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    console.log(currentUser);
    return (
        <Container>
            <Wrapper>
                <Search>
                <Input placeholder="search"></Input>
                <SearchIcon/></Search>
               { currentUser ? (
               <User>
                <VideoCallOutlinedIcon style={{cursor:"pointer"}} onClick={() => setOpen(true)} />
                <Avatar src={currentUser.img} />
                {currentUser.name}
               </User>):
                <Link style={{textDecoration:"none"}} to={"/signin"}>
                <Button> <AccountCircleSharpIcon/>SIGN IN</Button>
                </Link>
               }
                
            </Wrapper>
        </Container>
    )
}