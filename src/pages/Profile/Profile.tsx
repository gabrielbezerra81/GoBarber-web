import React, { useCallback, useRef, ChangeEvent } from "react";
import { FiArrowLeft, FiMail, FiLock, FiUser, FiCamera } from "react-icons/fi";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

import { Container, Content, AvatarInput } from "./styles";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../context/toastContext";
import { useAuth } from "../../context/authContext";

import unknownUserImage from "../../assets/undefinedProfilePicture.png";

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .email("Digite um e-mail válido")
            .required("E-mail obrigatório"),
          old_password: Yup.string(),
          password: Yup.string().when("old_password", {
            is: (val) => !!val,
            then: Yup.string().required("Campo obrigatório"),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when("old_password", {
              is: (val) => !!val,
              then: Yup.string().required("Campo obrigatório"),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref("password")], "Confirmação incorreta"),
        });
        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = Object.assign(
          {
            name,
            email,
          },
          old_password ? { old_password, password, password_confirmation } : {}
        );

        const response = await api.put("profile", formData);

        updateUser(response.data);

        addToast({
          type: "success",
          title: "Perfil atualizado",
          description:
            "Suas informações do perfil foram atualizadas com sucesso!",
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro na atualização",
          description:
            "Ocorreu um erro ao atualizar o perfil, tente novamente.",
        });
      }
    },
    [addToast, history]
  );

  const handleAvatarChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append("avatar", e.target.files[0]);

        api
          .patch("users/avatar", data)
          .then((response) => {
            updateUser(response.data);

            addToast({ type: "success", title: "Avatar atualizado!" });
          })
          .catch(console.log);
      }
    },
    [addToast, updateUser]
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{ name: user.name, email: user.email }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={user.avatar_url || unknownUserImage} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu perfil</h1>
          <Input name="name" type="text" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="text" placeholder="E-mail" icon={FiMail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            placeholder="Senha atual"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar senha"
            icon={FiLock}
          />
          <Button type="submit">Confirmar mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
