import styled from "styled-components";
import theme from "../../styles/theme";

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 15px;
  cursor: pointer;
  transition: .2s;

  &:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.primary};
  }

  &.outlined {
    border: 2px solid ${({ theme }) => theme.colors.primary};
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.secondary};
      box-shadow: none;
      filter: brightness(.9);
    }
  }
`
