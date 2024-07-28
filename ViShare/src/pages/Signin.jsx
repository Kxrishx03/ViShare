import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 600px;
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 40px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 20px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 8px 15px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 8px;
  font-size: 10px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 30px;
`;

const Link = styled.span`
  margin-left: 20px;
`;

export function Signin(){
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("https://vi-share-beta.vercel.app/api/auths/signin", { name, password });
      console.log(res.data);
      document.cookie = `access_token=${res.data.access_token}`;
      dispatch(loginSuccess(res.data));
      toast.success('You have been logged in!');
      navigate("/");
    } catch (err) {
      console.error(err);
      dispatch(loginFailure());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
   
    try {
      const res = await axios.post("https://vi-share-beta.vercel.app/api/auths/signup", { name, email, password });
      console.log(res.data);
      dispatch(loginSuccess(res.data));
      toast.success('Account has been created!!');
      navigate("/signin");
      toast.success('Please Signin in your account!');
    } catch (err) {
      console.error(err);
     
    }
  };

  const signInWithGoogle = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth,provider);
      console.log(result);
      const res = await axios.post("https://vi-share-beta.vercel.app/api/auths/google", {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoUrl,
      });
      console.log(res);
      dispatch(loginSuccess(res.data));
      toast.success('You have been logged in!');
      navigate("/");
    } catch (error) {
      console.error(error);
      dispatch(loginFailure());
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to ViShare</SubTitle>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <Title>or</Title>
        <Input placeholder="username" onChange={(e) => setName(e.target.value)} />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignup}>Sign up</Button>
      </Wrapper>
      <More>
        English (USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
}
