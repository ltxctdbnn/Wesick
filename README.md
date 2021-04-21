elice ai track 1기 데이터 분석 웹 서비스 프로젝트 결과물

# 토닥토닥 (코드네임 WeSick)

## 1. 프로젝트 소개

- `동병상련의 아픔을 가진 유저들의 사회적 연대 강화를 목적으로 하는 지역 기반 커뮤니티 서비스`
  - [79개의 1차 데이터세트](https://www.notion.so/778b4912ba9541d3b580ea0456b216b0?v=4d328bd617f44c65af188114148bf23b)<br/>필수데이터세트 별도 사용
  
  - 기술 스택 및 라이브러리<br/>
  >| 분류 | 이름 | 목적 |
  >|-|-|-|
  >| Server | Python-Flask, Socket.io | 전체 서비스 구동을 위한 백엔드 서버, 채팅기능 구현을 위한 Socket.io |
  >| Front | React/css/Bootstrap/material-ui/sweet-alert | Component 관리를 위한 React  |
  >| DB | MySQL / MongoDB | UserInformation 데이터를 위한 MySQL(sqlalchemy)<br/>Community Post 데이터를 위한 MongoDB(pymongo) |
  >| DataAnalysis | Pandas / scikit-learn / ANN / IBM SPSS / d3.js / <br/>neo4j / folium / geoPandas | 데이터 분석 및 시각화를 위한 라이브러리 |
  >| VM | Azure / Docker | 서비스 배포를 위한 Azure<br/>개발환경 일치를 위한 Docker |
  
  - 웹서비스 개요<br/>
  > 같은 병은 같은 아픔을 겪는 다는 동병상련 상황에서 사람들은 종종 특별한 유대감을 느낍니다. 지역에서 소외되고 있는 의료 사각지대의 사람들과 동병상련을 나누고, 정보를 나누고 교류하며 지역의 사회적 연결망을 강화해 나가면 지역사회의 네트워크가 발동하여 집계가 되지 않아 정책에 반영되지 못한 의료 사각지대 사람들에게 실질적 도움을 줄 수 있을 것으로 기대할 수 있습니다. 순기능이 순환하여 작용 할 수 있도록 지역 주민들의 이야기를 공유할 수 있는 커뮤니티와 커뮤니티의 활동으로 누적된 데이터, 공공 데이터로 수집된 데이터를 분석/시각화하여 지역주민들이 정책의사 결정에 직/간접적으로 참여하며 지역 내 의료 사각지대 해소를 도모하는 서비스입니다.
  

## 2. 프로젝트 목표

* `사회적 연결망의 강화가 의료 사각지대를 해소하는 데 도움을 줄 수 있다`
  - 문제의 인식<br/>
  1. 의료 사각지대에 놓인 사람들의 실질적 데이터는 집계되지 않는다.<br/>
  2. 의료 사각지대의 해소를 위해 범정부적 차원에서 많은 리소스들이 이미 투입되고 있다.<br/>
  3. 실질적 의료 사각지대의 해소에는 오프라인의 도움이 필요하다.<br/>
  4. 상시적으로 의료 사각지대 해소의 욕구와 해소가 순환할 수 있는 시스템이 필요하다.<br/>
  5. 현대사회에서 지역 커뮤니티의 사회적 연결성이 약화되어 있다.<br/><br/>


  - 문제 해결을 위한 자료 해석과 가설 제시<br/>
  1. 실질적 의료 사각지대는 통계 데이터로 집계되지 않는다.<br/>
  2. 명목적 의료 사각지대의 통계는 지역별 미충족의료률로 가늠할 수 있다.<br/>
  3. 지역별 [소득/경제활동유형/교육/혼인/주거형태/사회적만족도 등]의 데이터를 회귀분석/인공신경망분석하여 주요 독립변수를 찾을 수 있다.<br/>
  4. 질환별 의료 사각지대는 서로 다른 범주로 나타날 것이다.<br/>
  5. 사회적 활동 [지역 내 단체활동/지역 커뮤니티 시설의 수/봉사활동]이 활발한 지역일수록 사회적 만족도가 높을 것이다.<br/>
  6. 범정부 차원에서 투입되는 많은 리소스들은 정보 불균형 및 정보 미수집의 요인으로 확산되지 못해 불균형을 초래한다.<br/>
  6. 사회적 연결망의 강화가 정보 불균형 및 정보 미수집의 문제를 해결할 수 있을 것이다.<br/>
  7. 사회적 연결망의 강화가 의료 사각지대를 해소하는 데 도움을 줄 수 있다.<br/><br/>


  - 데이터를 통한 가설 검증 방법<br/>
  1. 실질적 의료 사각지대의 데이터 검증은 서비스 실행으로 집게된 유저 데이터를 통해 분석하여 검증한다.<br/>
  2. 지역별 종합요소[독립변수]와 지역별 미충족의료률[종속변수]를 회귀/인공신경망 분석을 통해 주요 독립변수를 찾을 수 있을 것이다.<br/>
  3. 도출된 주요 독립변수에 질환 분류를 추가한 회귀/인공신경망 분석 결과는 불일치도가 높은지 확인한다.<br/>
  4. 사회적 활동요소[독립변수]와 지역별 사회적만족도[종속변수]를 회귀분석한 결과는 낮은 손실함수 값을 가지는 지 확인한다.<br/>
  5. 의료 서비스 개선을 위해 투입된 예산과 의료 서비스 만족도, 미충족의료률[전국 시계열데이터] 분석 결과 예산 상승 분에 비해 낮은 지표 개선을 보이는지 확인한다.<br/>
  6. 지역별 사회적 연결망과 지역별 의료 서비스 만족도, 미충족의료율[지역별 시계열데이터] 분석 결과 양의 상관관계를 가지는 지 확인한다.<br/>

  ### [데이터 분석 결과](https://www.notion.so/DataAnalysis-Result-52edbbb430ee40a7834a60283746834f)


## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
* `토닥토닥 | 지역 커뮤니티 서비스`
  - 주요 기능 (주된 활용성) 및 서브 기능
  >| 영역 | 내용 |
  >|-|-|
  >| 커뮤니티 기능 | 주요기능 | 자신과 같은 유형으로 분류된 혹은 유사 유형으로 분류된 인근 지역 유저들과의 커뮤니티 |
  >| 같이해요 기능 | 주요기능 | 지역 내에서 1회성 운동 모임을 개최하고 참가신청 할 수 있는 기능 |
  >| 채팅기능 | 주요 | 유저간 1:1 채팅 기능 |
  >| 지역 데이터 시각화 | 주요 | 지역의 유저 데이터와 의료 정보 데이터를 시각화하여 제공 |
  >| 유저 사회망 시각화 | 부가 | 자신과 네트워킹이 발생하고 있는 유저들과의 사회적 연결망을 시각화하여 제공 |
  >| 정보 제공 | 부가 | 지역의 의료기관 / 건강증진시설 등 지역 커뮤니티에 대한 정보와 리뷰 제공 (by WebCrwaling) | 
  >| 이주의 토닥러 | 부가 | 한 주 동안 가장 높은 사회적 활동(서비스 내 활동)을 보인 유저 선발 |
  <br/>
  - 프로젝트만의 차별점, 기대 효과<br/>

    1. 지속적으로 집계되는 유저들의 데이터와 공공데이터를 분석하여 제공하는 우리동네 이슈 투표 기능은 정책 의사 결정 과정에 근거로 작용할 수 있습니다. 이를 통해 집계되지 않은 데이터를 공론화 할 수 있습니다.
    
    >_예시) 흡연률이 높은 지역, 금연 욕구가 있으나 지원 시설이 없음 >> 지역내 금연 지원 시설 설치 의견 수렴_

  2. 유저들의 서비스 내 활동 결과를 분석하여(neo4j) 나의 우리동네 네트워크 시각화 기능을 제공하여 심리적으로 사회적 안전망을 체감하게 해줍니다.
  3. 가능한 많은 연령대의 참여가 중요하므로 온라인 서비스에 익숙하지 않은 노령세대를 위한 UI/UX를 제공합니다.

## 4. 프로젝트 구성도
  ### [스토리보드](https://www.figma.com/file/CluTmxhDDigtZG9rCeXKkE/Storyboard-Draft-Ver0.1?node-id=0%3A1)<br/>
  ### [와이어프레임](https://whimsical.com/codename-wesick-SXPvCHJqfSwQZwzPUPm6z)
  <br/>

## 5. 프로젝트 팀원 역할 분담





| 이름 | 담당 업무 |
| ------ | ------ |
| 황정우(CEO) | 리더 / 백엔드 개발 / 데이터 분석 / 실시간 데이터 시각화 구현 |
| 강인선(CTO) | 백엔드 개발 / 데이터 분석 / 커뮤니티 기능 구현/ 채팅 기능 구현 |
| 윤수진(인턴) | 백엔드 개발 / 프론트엔드 개발/ 채팅 기능 구현 | 
| 김수영(프론트엔드 개발자) | 프론트엔드 개발 / 데이터 시각화 / 채팅 기능 구현 |
| 박정환(CIO) | 프론트엔드 개발 / 데이터 시각화 / 커뮤니티 기능 구현/ CSS |



**멤버별 responsibility(R&R, Role and Responsibilities)**

1. 리더 

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드 

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정

 3. 백엔드 & 데이터 담당  

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정

## 6. 버전 및 개발계획
  - 현재(1주차) Web Ver0.1 작업 중 (Basic 기능 커뮤니티 기능 구현 예정)
  - 2주차 Web Ver1.0 작업 예정 (데이터 시각화기능[지역정보,유저연결정보], 부가기능 구현 예정)
  - 3주차 Mobile App Ver1.0 작업 예정 (React Native로 Android/iOS 배포[iOS는 검수에 시간이 소요되어 프로젝트 기간 내 배포 불가능할 것으로 판단됨])

  #### Ver 0.1 [2021.04.15]
  
  ***구현기능***
  - 로그인
  - 회원가입
  - 로그아웃
  - 프로필 자기소새 작성
  - 프로필 사진 업로드
  - 프로필 관심 질환 및 관심 정보 설정
  - 프로필 주소 입력
  - 프로필 의사 인증
  - 커뮤니티 게시물 작성
  - 커뮤니티 게시물 수정
  - 커뮤니티 게시물 삭제
  - 커뮤니티 게시물 읽기
  - 커뮤니티 이미지 첨부
  - 커뮤니티 게시물 좋아요
  - 채팅 목록 보기
  - 1:1 채팅 하기



## 7. FAQ
  ### 환경설정 및 에러 대응
  ***Ubuntu 18.04 LTS를 기준으로 작성되었습니다***

  - #### Flask 서버 구동 시 설정 사항
> *Bash Script에 포함되어 있습니다.*
  ```
  ~ % export FLASK_APP=medical
  ~ % export FLASK_ENV=development
  ~ % flask run
  ```
<br/>

- #### MongoDB 설치 및 설정사항
> *MongoDB 설치 및 실행 설정*
```
~ % curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
~ % sudo echo "deb http://repo.mongodb.org/apt/ubuntu bionic/~ % mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
~ % sudo apt-get update
~ % sudo apt-get install -y mongodb-org
~ % mkdir data
~ % cd data
~ data % mkdir db
~ data % cd ..
~ % mongod --dbpath=data/db/
```
<br/>

- #### MySQL 관련 이슈
> *MySQL 실행법*
```
~ % mysql -u root -r
# 위 코드 실행 시 root@localhost permission denied 에러가 발생한다면 아래 스크립트를 실행해주세요
```
```
~ % sudo mysql -u root

mysql> USE mysql;
mysql> SELECT User, Host, plugin FROM mysql.user;
mysql> UPDATE user SET PLUGIN='mysql_native_password' WHERE user='root';
mysql> FLUSH PRIVILEGES;
mysql> SELECT user, host, plugin FROM user;
```
<br/>

> *git pull 이후 실행 시*
```
~ % service mysql restart
# 새로 git pull 후에 위 스크립트를 실행해주세요
```
<br/>

> *ERROR 2002 (HY000): Can’t connect to local MySQL server through socket ‘/var/lib/mysql/mysql.sock’ 에러 발생 시*
```
~ % service mysql restart
# 위 코드로 에러가 해결 되지 않을 시 아래 스크립트를 실행해주세요
```
```
~ % service mysql stop
~ % chmod 755 -R /var/lib/mysql
~ % chown mysql:mysql -R /var/lib/mysql
~ % service mysql start
```
<br/>

> SQLalchemy 실행 설정
```
# SQLalchemy 실행 전 MySQL에서 database를 생성한 뒤 실행해주세요

# 최초 1회 실행
~ % flask db init

# 모델링 이후 1회
~ % flask db migrate

# 이후 실행 시 모델이 생성됩니다
~ % flask db upgrade
```
<br/>

> *SQLalchemy 리모델링*
```
# 이미 만든 모델을 다시 만들어야 할 경우 아래 스크립트를 실행해주세요

mysql> DROP DATABASE medical;
mysql> CREATE DATABASE medical;

~ % flask upgrade

# 리모델링이 안된다면 migration 디렉토리를 삭제 후 SQLalchemy를 최초 실행해주세요
```
