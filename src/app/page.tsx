'use client';

import { useRouter } from 'next/navigation';
import styled from '@emotion/styled';

const MenuTitle = styled.h1`
  font-size: 3rem;
  color: var(--primary-color);
  margin-bottom: 2rem;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  gap: 2rem;
`;

const GameButton = styled.button`
  width: 250px;
  padding: 15px 30px;
  font-size: 1.2rem;
  background-color: white;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default function Home() {
  const router = useRouter();

  return (
    <MenuContainer>
      <MenuTitle>Game Center</MenuTitle>
      <GameButton onClick={() => router.push('/minesweeper')}>
        Minesweeper
      </GameButton>
      {/* Add more game buttons here in the future */}
    </MenuContainer>
  );
}
