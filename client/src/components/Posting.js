import React, { useState } from "react";
import axios from "axios";
import "components/css/Posting.css";
import { storageService } from "fBase";
// import "components/css/Posting.css";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { Container, Col, Row, Card } from "react-bootstrap";

// 포스트 카드 컴포넌트
const Posting = ({ postingObj, content, isOwner, onReadPosting }) => {
  const url = `http://localhost:5000`;
  const [editing, setEditing] = useState(false);
  const [newPosting, setNewPosting] = useState(postingObj.content);
  const [like, setLike] = useState(0);

  // 수정 버튼 토글
  const toggleEditing = () => setEditing((prev) => !prev);

  // [UPDATE] 게시글 업데이트 핸들러
  const onUpdatePosting = async (event) => {
    event.preventDefault();
    await axios
      .post(url + "/article/update", {
        method: "POST",
        body: JSON.stringify({
          postingId: postingObj.date,
          editContent: newPosting,
        }),
      })
      .then(() => {
        console.log("[UPDATE] 게시글 수정");
        onReadPosting();
      })
      .catch(() => {
        alert("[UPDATE] response (x)");
      });
    setEditing(false);
  };

  // [DELETE] 게시글 삭제 핸들러
  const onDeletePosting = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await axios
        .post(url + "/article/delete", {
          method: "POST",
          body: JSON.stringify({
            postingId: postingObj.date,
          }),
        })
        .then(() => {
          console.log("[DELETE] 게시글 삭제");
          onReadPosting();
        })
        .catch(() => {
          alert("[DELETE] response (x)");
        });
      if (postingObj.attachmentUrl) {
        await storageService.refFromURL(postingObj.attachmentUrl).delete();
      }
    }
  };

  // 게시글 수정 작성 핸들러
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPosting(value);
  };

  return (
    <>
      {/* {editing ? (
        <>
          {isOwner && (
            <>
              <div id="posting-container">
                <form>
                  <input
                    type="text"
                    placeholder="수정할 내용을 입력해주세요."
                    value={newPosting}
                    required
                    onChange={onChange}
                  />
                  <div className="community-btn-container">
                    <button onClick={toggleEditing}>취소</button>
                    <button onClick={onUpdatePosting}>완료</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div id="posting-container">
            <div className="posting-header-container">
              유저 타입: {postingObj.usertype}
            </div>
            <div className="posting-body-container">
              <div className="posting-content">글 내용: {content}</div>
              {postingObj.attachmentUrl && (
                <div className="posting-attachment">
                  <img
                    src={postingObj.attachmentUrl}
                    width="500px"
                    height="500px"
                  />
                </div>
              )}
            </div>
            <div className="posting-footer-container">
              <p>작성자: {postingObj.nickname}</p>
              <p>작성일: {postingObj.date}</p>
              <p>Like: {like}</p>
            </div>
            <div className="community-btn-container">
              {isOwner && (
                <>
                  <button onClick={onDeletePosting}>삭제</button>
                  <button onClick={toggleEditing}>수정</button>
                </>
              )}
            </div>
          </div>
        </>
      )} */}
      {/* <Card className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} className={classes.Posting}>
            <Grid container spacing={1}>
              <Grid item xs={12} className={classes.PostingTitle}>
                <Grid container spacing={1}>
                  <Grid item xs={3} className={classes.PostingTitleImg}>
                    사진
                  </Grid>
                  <Grid item xs={9} className={classes.PostingTitleName}>
                    작성자 이름
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.PostingContents}>
                내용
              </Grid>
              <Grid item xs={12} className={classes.PostingBtn}>
                포스팅 버튼
              </Grid>
              <Grid item xs={12} className={classes.PostingComments}>
                댓글
              </Grid>
              <Grid item xs={12} className={classes.PostingCommentsAdd}>
                <Grid container spacing={0}>
                  <Grid item xs={10} className={classes.PostingCommentsInput}>
                    댓글 입력란
                  </Grid>
                  <Grid item xs={2} className={classes.PostingCommentsBtn}>
                    댓글 추가 버튼
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card> */}
      <Paper style={{ border: "1px solid lightgray ", marginBottom: "15px" }}>
        <Grid item xs={12}>
          <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
            <Col item xs={2}>
              <p>프로필 사진</p>
            </Col>
            <Col item xs={10}>
              <Row>
                <p>{postingObj.nickname}</p>
              </Row>
              <Row>
                <p>{postingObj.date}</p>
              </Row>
            </Col>
          </Row>

          <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
            <Container>
              <p>
                글 내용: {content}
                {postingObj.attachmentUrl && (
                  <img
                    src={postingObj.attachmentUrl}
                    width="500px"
                    height="500px"
                  />
                )}
              </p>
            </Container>
          </Row>
          <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
            <Col item xs={2}>
              <p>더보기</p>
            </Col>
            <Col item xs={6}></Col>
            <Col item xs={2}>
              <p>댓글 수</p>
            </Col>
            <Col item xs={2}>
              <p>좋아요 수</p>
            </Col>
          </Row>
          <Row style={{ margin: 0, borderBottom: "1px solid lightgray " }}>
            <Card style={{ marginLeft: 20 }}>
              <p>댓글 공간</p>
            </Card>
          </Row>
          <Row>
            <Col item xs={8}>
              <p>댓글 입력란</p>
            </Col>
            <Col item xs={4}>
              <p>댓글추가 버튼</p>
            </Col>
          </Row>
        </Grid>
      </Paper>
    </>
  );
};

export default Posting;
