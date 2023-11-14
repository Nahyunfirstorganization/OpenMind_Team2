import { EditorButton } from './FeedCardStyled';
import editor from '../../assets/images/Edit.svg';
import { useState } from 'react';
import AnswerEditorUI from './AnswerEditorUI';

export default function ButtonForEditorUI({ question, onPatch, onToggle }) {
  const [isOpenedEditorUI, setIsOpenedEditorUI] = useState(false);
  const handleDisplayEditorUI = () => {
    setIsOpenedEditorUI((p) => !p);
    onToggle();
  };
  return (
    <>
      {isOpenedEditorUI ? (
        <AnswerEditorUI question={question} onPatch={onPatch} onClose={handleDisplayEditorUI} />
      ) : (
        <EditorButton onClick={() => handleDisplayEditorUI()}>
          <img src={editor} alt="수정하기" />
          수정하기
        </EditorButton>
      )}
    </>
  );
}
