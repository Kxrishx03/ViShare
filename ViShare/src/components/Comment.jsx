import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

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


export function Comment(){
  const { currentUser } = useSelector((state) => state.user);
    return(
        <Container>
            <Avatar src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"></Avatar>
            <Details>
            <Name>
            John Doe <Date>1 day ago</Date></Name>
            <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae dolor odit reprehenderit. Quo, dolor. Ipsum nesciunt est officiis tenetur, unde praesentium facere, architecto nemo consequatur animi, accusantium deserunt a quasi?</Text>
            </Details>
        </Container>
    )
}