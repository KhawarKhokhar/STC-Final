import React from "react";
import styled from "styled-components";
import { ArrowUp, MessageCircle, Phone, Users } from "lucide-react";

interface CustomButtonProps {
  text?: string;
  href?: string;
  icon?: "chat" | "meeting" | "call" | "arrow";
}

const iconMap = {
  arrow: <ArrowUp className="icon" size={18} />,
  chat: <MessageCircle className="icon" size={18} />,
  meeting: <Users className="icon" size={18} />,
  call: <Phone className="icon" size={18} />,
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text = "Back to Top",
  href = "#top",
  icon = "arrow",
}) => {
  return (
    <StyledWrapper $buttonText={text}>
      <a href={href} className="button">
        {iconMap[icon]}
      </a>
    </StyledWrapper>
  );
};

// 💡 Note the `$` prefix here
const StyledWrapper = styled.div<{ $buttonText: string }>`
  .button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgb(20, 20, 20);
    border: none;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 0px 4px rgba(61, 211, 206, 0.25);
    cursor: pointer;
    transition-duration: 0.3s;
    overflow: hidden;
    position: relative;
    text-decoration: none;
  }

  .icon {
    color: white;
    transition: all 0.3s ease;
  }

  .button:hover {
    width: 140px;
    border-radius: 50px;
    background-color: #3dd3ce;
    align-items: center;
  }

  .button:hover .icon {
    transform: translateY(-200%);
  }

  .button::before {
    position: absolute;
    bottom: -20px;
    content: "${(props) => props.$buttonText}";
    color: white;
    font-size: 0px;
    transition: all 0.3s ease;
  }

  .button:hover::before {
    font-size: 13px;
    opacity: 1;
    bottom: unset;
  }
`;

export default CustomButton;
