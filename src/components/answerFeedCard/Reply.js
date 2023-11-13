import { FcAnswerInput, FcAnswerButton } from './FeedCardStyled';

import { useState } from 'react';

export function Reply({ onCreate, question }) {
  const [reply, setReply] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmitReply = (questionId, answerData) => {
    onCreate(questionId, answerData);
  };

  const handleChangeAnswer = (e) => {
    setReply(e.target.value);
    reply ? setIsCompleted(true) : setIsCompleted(false);
    if (e.target.value === '') {
      setIsCompleted(false);
    }
  };
  return (
    <>
      <FcAnswerInput
        name="answer"
        value={reply}
        placeholder="답변을 입력해주세요"
        onChange={(e) => handleChangeAnswer(e)}
        $isCompleted={isCompleted}
      >
        {reply}
      </FcAnswerInput>
      <FcAnswerButton
        onClick={() => handleSubmitReply(question.id, { content: reply, isRejected: false })}
        $isCompleted={isCompleted}
      >
        답변 완료
      </FcAnswerButton>
    </>
  );
}