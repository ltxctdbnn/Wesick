import { Grid, Paper } from "@material-ui/core";
import { Container, Col, Row, Card } from "react-bootstrap";
// import "componenets/App.css";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function Sample() {
  return (
    <>
      <Paper>
        <Grid item xs={12}>
          <Row item xs={12}>
            <Col item xs={2}>
              <p>프로필 사진</p>
            </Col>
            <Col item xs={10}>
              <Row>
                <p>닉네임</p>
              </Row>
              <Row>
                <p>몇분전</p>
              </Row>
            </Col>
          </Row>
          <Row>
            <Card style={{ marginLeft: 20 }}>
              <p>본문</p>
            </Card>
          </Row>
          <Row>
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
          <Row>
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
}

export default Sample;
