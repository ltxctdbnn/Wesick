import React, { useState, useEffect, useCallback } from 'react';
import Posting from 'components/Posting';
import 'components/css/Community.css';

// 커뮤니티 컴포넌트
const Community = ({ postings }) => {
  const [itemIndex, setItemIndex] = useState(1);
  const [result, setResult] = useState(postings.slice(0, 5));

  const _infiniteScroll = useCallback(() => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    let clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight === scrollHeight) {
      setItemIndex(itemIndex + 5);
      setResult(result.concat(postings.slice(itemIndex + 5, itemIndex + 10)));
    }
  }, [itemIndex, result]);

  useEffect(() => {
    window.addEventListener('scroll', _infiniteScroll, true);
    return () => window.removeEventListener('scroll', _infiniteScroll, true);
  }, [_infiniteScroll]);

  return (
    <div id="community-container">
      {console.log('idx' + itemIndex)}
      <div className="postings-container">
        {result &&
          result.map((posting) => (
            <Posting
              key={posting.date}
              postingObj={posting}
              content={posting.content}
              isOwner={posting.userid === sessionStorage.userid}
              // onReadPosting={onReadPosting}
            />
          ))}
      </div>
    </div>
  );
};

export default Community;
