'use client';

import styled from '@emotion/styled';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  z-index: 1000;
`;

const ModalTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const SettingGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const SettingLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-color);
  font-weight: bold;
`;

const VolumeSlider = styled.input`
  width: 100%;
  margin: 0.5rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const SaveButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: var(--secondary-color);
  color: var(--text-color);
`;

interface Settings {
  soundVolume: number;
  musicVolume: number;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  onSave: (settings: Settings) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: SettingsModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newSettings: Settings = {
      soundVolume: Number(formData.get('soundVolume')),
      musicVolume: Number(formData.get('musicVolume')),
    };
    onSave(newSettings);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Settings</ModalTitle>
        <form onSubmit={handleSubmit}>
          <SettingGroup>
            <SettingLabel htmlFor="soundVolume">Sound Effects Volume</SettingLabel>
            <VolumeSlider
              type="range"
              id="soundVolume"
              name="soundVolume"
              min="0"
              max="100"
              defaultValue={settings.soundVolume}
            />
          </SettingGroup>
          <SettingGroup>
            <SettingLabel htmlFor="musicVolume">Background Music Volume</SettingLabel>
            <VolumeSlider
              type="range"
              id="musicVolume"
              name="musicVolume"
              min="0"
              max="100"
              defaultValue={settings.musicVolume}
            />
          </SettingGroup>
          <ButtonGroup>
            <CancelButton type="button" onClick={onClose}>
              Cancel
            </CancelButton>
            <SaveButton type="submit">Save</SaveButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
