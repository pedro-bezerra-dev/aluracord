import styled from "styled-components";

export const UserInfoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 48px;
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .25);
  border-radius: 15px;

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
