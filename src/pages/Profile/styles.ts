import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;

  > header {
    background: #28262e;
    height: 144px;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        font-size: 24px;
        transition: color 0.2s;

        &:hover {
          color: ${shade(0.2, "#999591")};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  margin: -176px auto 0;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    input[name="old_password"] {
      margin-top: 24px;
    }
  }

  > a {
    color: #f4ede8;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;
  margin: 0 auto 32px;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #ff9000;
    border: none;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: ${shade(0.2, "#ff9000")};
    }

    input {
      display: none;
    }

    svg {
      color: #312e38;
      width: 20px;
      height: 20px;
    }
  }
`;
