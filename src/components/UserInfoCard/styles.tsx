import styled from "styled-components";
import theme from "../../styles/theme";

export const UserInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  position: relative;
  padding: 48px;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .25);
  border-radius: 15px;

  .logout-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px;
    background: rgba(255, 255, 255, .05);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 48px;
    transition: .2s;

    &:hover {
      background: #cf6679;

      span.highlighted-bold {
        display: flex;
      }
      .icon::before, .icon::after {
        background: ${({ theme }) => theme.colors.secondary};
      }
    }

    span.highlighted-bold {
      display: none;
      align-items: center;
      padding: 0 4px;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.secondary};
    }
    .icon {
      position: relative;
      width: 18px;
      height: 18px;

      &::before, &::after {
        content: '';
        width: 100%;
        height: 3px;
        background: ${({ theme }) => theme.colors.quintenary};
        border-radius: 2px;
        position: absolute;
        top: 50%;
        left: 0;
      }
      &::before {
        transform: translateY(-50%) rotate(-45deg);
      }
      &::after {
        transform: translateY(-50%) rotate(45deg);
      }
    }
  }
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 96px;
    height: 96px;
    background: rgba(255, 255, 255, .05);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    margin-top: 24px;

    &.empty::before {
      content: '';
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, .1);
      border-radius: 50%;
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
    &.empty::after {
      content: '';
      width: 64px;
      height: 72px;
      background: rgba(255, 255, 255, .1);
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }

    > span {
      z-index: 100;
    }
  }
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    background: rgba(255, 255, 255, .05);
    color: #fff;
    border-radius: 5px;
    max-width: 200px;
    text-align: center;
    overflow-x: auto;
  }
`
