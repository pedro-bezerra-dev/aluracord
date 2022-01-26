import styled from "styled-components";

export const TextFieldWrapper = styled.input`
  display: flex;
  align-items: center;
  border: none;
  border-radius: 15px;
  padding: 16px 24px;
  width: 100%;
  background: #fff;
  color: ${({ theme }) => theme.colors.tertiary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.tertiary};
    opacity: .75;
  }
  &:focus-visible {
    outline-color: ${({ theme }) => theme.colors.tertiary};
  }
`
