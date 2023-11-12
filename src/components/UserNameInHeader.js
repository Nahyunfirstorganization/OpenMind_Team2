import { useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { LocalIdContext } from 'context/LocalIdContext';

export default function UserNameInHeader({ element, setIsOpenList, user }) {
  const context = useContext(LocalIdContext);
  const { setLocalId } = context;

  const useLocalIdContext = useCallback(
    (e) => {
      const nextLocalId = e.currentTarget.getAttribute('value');
      setLocalId(nextLocalId);
      window.localStorage.setItem('id', nextLocalId);
      console.log(nextLocalId);
    },
    [setLocalId],
  );

  const disablePointer = { pointerEvents: 'none' };

  element?.addEventListener('mouseover', () => {
    setIsOpenList(true);
  });

  element?.addEventListener('mouseout', () => {
    setIsOpenList(false);
  });

  return (
    <>
      {user.map((name) => {
        return (
          <ListPageListLi key={name.id} value={name.id} onClick={useLocalIdContext}>
            <Link to={`/post/${name?.id}/answer`}>
              <h5 style={disablePointer}>{name.name}</h5>
              <span style={disablePointer}>받은질문 5개</span>
            </Link>
          </ListPageListLi>
        );
      })}
    </>
  );
}

const ListPageListLi = styled.li`
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 32px;
    text-decoration: none;
    color: #000;
    h5 {
      font-size: 1.3rem;
      width: 56px;
      line-height: 16px;
    }
    &:hover {
      color: #fff;
    }
  }
  &:hover {
    background-color: var(--blue50);
  }
`;
