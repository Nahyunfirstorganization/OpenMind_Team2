import CardList from 'components/listPageCard/CardList';
import arrowUp from '../../assets/images/arrow-up.svg';
import arrowDown from '../../assets/images/arrow-down.svg';
import * as S from './ListStyle';
import { useContext, useEffect, useState } from 'react';
import { getAllDataSubjects } from 'api/api.subjects';
import { pathState } from 'components/common/pathState';
import { PagePath } from 'context/PathContext';

export default function ListContainer() {
  const [isDropdownView, setDropdownView] = useState(false);
  const [range, setRange] = useState('');
  const [friends, setFriends] = useState(null);
  const [dataErrorMessage, setDataErrorMessage] = useState('');
  const { setIsPath } = useContext(PagePath);

  const handleSubjectsData = async () => {
    try {
      const data = await getAllDataSubjects();
      setFriends(data);
    } catch (error) {
      setDataErrorMessage(error.message);
    }
  };

  useEffect(() => {
    handleSubjectsData();
    if (pathState()) {
      setIsPath(true);
    } else {
      setIsPath(false);
    }
  }, []);

  const handleClickSelect = () => {
    setDropdownView(!isDropdownView);
  };

  const handleClickList = (e) => {
    const { textContent } = e.target;
    setRange(textContent);
  };

  /* Blur 이벤트 함수 select 포커스 아웃되었을때 반응 */
  const handleBlur = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };

  return (
    <S.ListContainerBox>
      <S.ListWrap>
        <S.ListUpper>
          <S.ListTitle>누구에게 질문할까요?</S.ListTitle>
          <S.Dropdown onBlur={handleBlur}>
            <label onClick={handleClickSelect}>
              <S.DropdownButton $isDropdownView={isDropdownView}>
                <span>{range ? range : '최신순'}</span>
                <img src={isDropdownView ? arrowUp : arrowDown} alt="화살표 이미지"></img>
              </S.DropdownButton>
            </label>
            {isDropdownView && (
              <S.DropdownList>
                <S.DropdownListItem onClick={handleClickList}>이름순</S.DropdownListItem>
                <S.DropdownListItem onClick={handleClickList}>최신순</S.DropdownListItem>
              </S.DropdownList>
            )}
          </S.Dropdown>
        </S.ListUpper>
        <CardList data={friends} message={dataErrorMessage} range={range} />
      </S.ListWrap>
    </S.ListContainerBox>
  );
}
