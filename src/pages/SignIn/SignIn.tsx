import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { Container, Content, Background, AnimationContainer } from "./styles";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { useAuth } from "../../context/authContext";
import { useToast } from "../../context/toastContext";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          password: Yup.string().required("Senha obrigatória"),
        });
        await schema.validate(data, { abortEarly: false });

        await signIn({ email: data.email, password: data.password });

        history.push("/dashboard");
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        // disparar um toast
        addToast({
          title: "Erro na autenticação",
          description: "Ocorreu um erro ao fazer login, cheque as credenciais",
          type: "error",
        });
      }
    },
    [addToast, signIn, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>
            <Input
              name="email"
              type="text"
              placeholder="E-mail"
              icon={FiMail}
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
            />
            <Button type="submit">Entrar</Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
