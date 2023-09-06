import React, { useState, useEffect, useContext } from "react";
import "./HobbyPopupModal.css";
import { hobbyData } from "../../SignUpPage/AttributeData";
import { hobbyData2 } from "../../SignUpPage/AttributeData";
import { hobbyContext } from "../../SignUpPage/DetailProfile";
import { idealHobbyContext } from "../../SignUpPage/DetailProfile";

// 전체 버튼이 하나의 selected 에 저장되는게 아니라
// 버튼 각각의 selected 값이 존재
// 왜냐하면 HobbyButton 컴포넌트를 selected와 분리하지 않고 여러개를 만들었기 때문..
// 하나의 selected 변수안에 여러가지 버튼이 컨트롤 되도록 해야된다.
function HobbyPopupModal(props) {
  const hobbyName = props.hobbyName;

  // 선
  return (
    <div className="hobbyContainer">
      {hobbyName === "detailHobby" ? <DetailHobby /> : <IdealHobby />}
    </div>
  );
}

const DetailHobby = (props) => {
  const [selected, setSelected] = useState([]);
  // 전달받은 isHobby값을 여기서 컨트롤 함 -> dataContext
  const { isDetailHobby, setIsDetailHobby } = useContext(hobbyContext);

  // 버튼을 최대 2개까지
  // 로컬스토리지에 데이터가 저장되는게 1박자 느리다.
  const handleClick = (e) => {
    const nowValue = e.currentTarget.value;

    // 이미 버튼이 눌러져있을 때 누르는 경우 : 해제
    // filter : 조건을 통과하는 애만 모은다
    if (selected.includes(nowValue))
      setSelected(selected.filter((item) => item !== nowValue));
    // 안 눌러져있던걸 추가하는 경우
    // 추가할때 값이 늘어나니까 length 제한을 걸어두면 됨
    else if (selected.length < 2) setSelected([...selected, nowValue]);
  };

  // 상태값이 바뀐후 저장되도록 -> 동기화 시키기
  useEffect(() => {
    localStorage.setItem("detailHobbyData", JSON.stringify(selected));

    // 배열의 길이 = 0, 그럼 삭제
    if (selected.length === 0) localStorage.removeItem("detailHobbyData");

    // 배열의 길이가 = 2, true / < 2, false
    if (selected.length === 2) setIsDetailHobby(true);
    else setIsDetailHobby(false);
  }, [selected, setIsDetailHobby]);

  // 배열의 최상단에 key 값이 있어야 각각 구별 가능
  return hobbyData.map((i) => (
    <div key={`detail-${i.value}`}>
      <button
        value={i.value}
        label={i.label}
        onClick={handleClick}
        className={
          selected.includes(i.value) ? "buttonItem clicked" : "buttonItem"
        }
        type="button"
      >
        {i.label}
      </button>
    </div>
  ));
};

const IdealHobby = (props) => {
  const [selected2, setSelected2] = useState([]);
  const { isIdealHobby, setIsIdealHobby } = useContext(idealHobbyContext);

  const handleClick = (e) => {
    const nowValue = e.currentTarget.value;

    if (selected2.includes(nowValue))
      setSelected2(selected2.filter((item) => item !== nowValue));
    else if (selected2.length < 2) setSelected2([...selected2, nowValue]);
  };

  useEffect(() => {
    localStorage.setItem("idealHobbyData", JSON.stringify(selected2));

    if (selected2.length === 0) localStorage.removeItem("idealHobbyData");

    if (selected2.length === 2) setIsIdealHobby(true);
    else setIsIdealHobby(false);
  }, [selected2, setIsIdealHobby]);

  // 이상하게 key값이 안들어가있다
  return hobbyData2.map((i) => (
    <div key={`ideal-${i.value}`}>
      <button
        value={i.value}
        label={i.label}
        onClick={handleClick}
        className={
          selected2.includes(i.value) ? "buttonItem clicked" : "buttonItem"
        }
        type="button"
      >
        {i.label}
      </button>
    </div>
  ));
};

export { HobbyPopupModal as default };
