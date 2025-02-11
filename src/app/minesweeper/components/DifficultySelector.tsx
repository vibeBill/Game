'use client';

import styled from '@emotion/styled';

const DifficultyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const DifficultyButton = styled.button`
  width: 200px;
  padding: 12px 24px;
  font-size: 1.1rem;
  background-color: white;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 6px;
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

export interface Difficulty {
  name: string;
  rows: number;
  cols: number;
  mines: number;
}

const difficulties: Difficulty[] = [
  { name: 'Easy', rows: 9, cols: 9, mines: 10 },
  { name: 'Medium', rows: 16, cols: 16, mines: 40 },
  { name: 'Hard', rows: 16, cols: 30, mines: 99 },
];

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void;
}

export default function DifficultySelector({ onSelect }: DifficultySelectorProps) {
  return (
    <DifficultyContainer>
      <Title>Select Difficulty</Title>
      {difficulties.map((difficulty) => (
        <DifficultyButton
          key={difficulty.name}
          onClick={() => onSelect(difficulty)}
        >
          {difficulty.name}
        </DifficultyButton>
      ))}
    </DifficultyContainer>
  );
}
