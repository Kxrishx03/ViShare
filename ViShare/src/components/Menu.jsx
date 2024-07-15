import styled from "styled-components";
import logo from "../components/images/logo.png";
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsSharpIcon from '@mui/icons-material/SubscriptionsSharp';
import VideoLibrarySharpIcon from '@mui/icons-material/VideoLibrarySharp';
import HistorySharpIcon from '@mui/icons-material/HistorySharp';
import SportsEsportsSharpIcon from '@mui/icons-material/SportsEsportsSharp';
import SportsBasketballSharpIcon from '@mui/icons-material/SportsBasketballSharp';
import NewspaperSharpIcon from '@mui/icons-material/NewspaperSharp';
import LiveTvSharpIcon from '@mui/icons-material/LiveTvSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import FlagSharpIcon from '@mui/icons-material/FlagSharp';
import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
import LightModeSharpIcon from '@mui/icons-material/LightModeSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import LibraryMusicSharp from "@mui/icons-material/LibraryMusicSharp";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from "../redux/userSlice";

const Container = styled.div`
flex:1;
height:100%;
background-color:${({theme})=>theme.bgLight};
color:${({theme})=>theme.text};
font-size:14px;
position: sticky;
top: 0;`
;

const Wrapper = styled.div`
padding:18px 26px`;

const Logo = styled.div`
display:flex;
align-items:center;
gap:5px;
font-weight:bold;
margin-bottom:25px;
`;

const Img = styled.img`
      height:25px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 7.5px 0px;
  gap: 20px;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;


const Hr = styled.hr`
  margin:15px 0px;
  border:0.5px solid ${({theme})=>theme.soft};
`;

const Login = styled.div`
`;
const Button = styled.button`
padding:5px 15px;
background-color:transparent;
color:#3ea6ff;
border:1px solid #3ea6ff;
border-radius:3px;
font-weight:500;
margin-top:10px;
cursor:pointer;
display:flex;
align-items:center;
gap:5px;
`;

const Title = styled.h2`font-size:14px;
font-weight:500;
color:#aaaaaa;
margin-bottom:20px`;

export function Menu({darkMode,setDarkMode}){
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { currentUser } = useSelector((state) => state.user); 
   const handleSignout = () =>{
        try{
         dispatch(logout());
         navigate("/");
        } catch(err){
          console.log(err);
        }
   }
   return (
    <Container>
          <Wrapper>
            <Logo>
                <Img src={logo} />
                    VISHARE
            </Logo>
            <Link style={{textDecoration:"none",color:"inherit"}} to="/">
            <Item>
            <HomeIcon/> Home
            </Item>
            </Link>
            <Link style={{textDecoration:"none",color:"inherit"}} to="trends">
            <Item>
               <ExploreIcon/> Explore
            </Item>
            </Link>
            <Link style={{textDecoration:"none",color:"inherit"}} to="/sub">
            <Item>
               <SubscriptionsSharpIcon/> Subcriptions
            </Item>
            </Link>
            <Hr></Hr>
            <Item>
               <VideoLibrarySharpIcon/> Library
            </Item>
            <Item>
               <HistorySharpIcon/> History
            </Item>
            <Hr></Hr>
            {!currentUser && <><Login>
            Sign in to Like videos,comment,and subscribe.
            <Link style={{textDecoration:"none"}} to={"/signin"}>
                <Button> <AccountCircleSharpIcon/>SIGN IN</Button>
            </Link>   
            </Login> <Hr></Hr> </>}
            {currentUser && <>
            <Login>
            Sign out here.
                <Button onClick={handleSignout} > <AccountCircleSharpIcon/>SIGN OUT</Button> 
            </Login> <Hr></Hr> </>}
            
            <Title>BEST OF VISHARE</Title>
            <Item>
               <LibraryMusicSharp/> Music
            </Item>
            <Item>
               <SportsBasketballSharpIcon/> Sports
            </Item>
            <Item>
               <SportsEsportsSharpIcon/> Games
            </Item>
            <Item>
               <NewspaperSharpIcon/> News
            </Item>
            <Item>
               <LiveTvSharpIcon/> Live
            </Item>
            <Hr></Hr>
            <Item>
               <SettingsSharpIcon/> Settings
            </Item>
            <Item>
               <FlagSharpIcon/> Report
            </Item>
            <Item>
               <HelpOutlineSharpIcon/> Help
            </Item>
            <Item onClick={()=>setDarkMode(!darkMode)}>
            {darkMode ? (
    <>
      <LightModeSharpIcon /> Light
    </>
  ) : (
    <>
      <DarkModeIcon /> Dark
    </>
  )} 
            </Item>
          </Wrapper>
    </Container>
    )
}