'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';

const NavbarContainer = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const NavButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const GameInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Timer = styled.span`
  font-size: 1.2rem;
  color: var(--text-color);
  font-weight: bold;
`;

const MineCount = styled.span`
  font-size: 1.2rem;
  color: var(--danger-color);
  font-weight: bold;
`;

interface NavbarProps {
  remainingMines: number;
  time: number;
  onRestart: () => void;
  onSettings: () => void;
}

export default function Navbar({
  remainingMines,
  time,
  onRestart,
  onSettings,
}: NavbarProps) {
  const router = useRouter();

  return (
    <NavbarContainer>
      <NavButton onClick={() => router.push('/')}>Back</NavButton>
      <GameInfo>
        <MineCount>💣 {remainingMines}</MineCount>
        <Timer>⏱️ {time}</Timer>
      </GameInfo>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <NavButton onClick={onRestart}>Restart</NavButton>
        <NavButton onClick={onSettings}>Settings</NavButton>
      </div>
    </NavbarContainer>
  );
}
