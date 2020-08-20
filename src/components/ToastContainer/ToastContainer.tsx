import React from "react";
import { useTransition, animated } from "react-spring";

import { Container } from "./styles";
import { ToastMessage } from "../../context/toastContext";
import Toast from "./Toast/Toast";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: "-120%", opacity: 0 },
      enter: { right: "0%", opacity: 1 },
      leave: { right: "-120%", opacity: 0 },
    }
  );

  const AnimatedToast = animated(Toast);

  return (
    <Container>
      {messagesWithTransitions.map(({ item: message, key, props }) => {
        return <AnimatedToast key={key} style={props} message={message} />;
      })}
    </Container>
  );
};

export default ToastContainer;
