import react, { useEffect, useState } from 'react';
import CommonTable from './Table/CommonTable';
import CommonTableColumn from './Table/CommonTableColumn';
import CommonTableRow from './Table/CommonTableRow';
import { postList } from './Data/data';
import { Link } from 'react-router-dom';

function PostList() {
  // 게시글 data -> db에서 가져오기
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    setDataList(postList);
  }, []);

  let [title, setTitle] = useState(['ㅎㅇ']);
  let [like, setLike] = useState([0]);

  // 날짜 년/월/일/시 -> 서버에 저장필요
  let Today = new Date();
  let Time = Today.toLocaleDateString() + '' + Today.toDateString();
  let [date, setDate] = useState([Time]);

  // 좋아요 증가함수
  function IncLike(i) {
    var newArray = [...like];
    newArray[i] = newArray[i] + 1;
    setLike(newArray);
  }

  return (
    <>
      <CommonTable headersName={['글번호', '제목', '등록일', '조회수']}>
        {dataList
          ? dataList.map((item, index) => {
              return (
                <CommonTableRow key={index}>
                  <CommonTableColumn>{item.no}</CommonTableColumn>
                  <CommonTableColumn>
                    <Link to={`/postView/${item.no}`}>{item.title}</Link>
                  </CommonTableColumn>
                  <CommonTableColumn>{item.createDate}</CommonTableColumn>
                  <CommonTableColumn>{item.readCount}</CommonTableColumn>
                </CommonTableRow>
              );
            })
          : ''}
      </CommonTable>
    </>
  );
}

export default PostList;
