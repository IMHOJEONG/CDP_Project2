# Astronomy-Picture-of-the-Day

[![Run on Ainize](https://ainize.ai/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=https://github.com/IMHOJEONG/CDP_Project2)

## 개요 

NASA OPEN API를 활용해 매일매일 바뀌는 우주에서의 하루 중 가장 눈에 띄는 현상과 그에 관한 설명을 보여주는 웹 페이지입니다. 

## API 설명 


- https://api.nasa.gov/ 에 가면 여러 우주 관련 API들을 NASA에서 제공하는 것을 알 수 있습니다. 
    ![Screenshot from 2020-09-09 02-45-38](https://user-images.githubusercontent.com/11308147/92510290-933b7000-f246-11ea-941a-6b2ec8ba2d05.png)

- 간단한 회원 가입 절차가 필요합니다. 이 이후 등록했던 메일로 인증 키가 날아오게 됩니다. 
    ![등록 사진](https://user-images.githubusercontent.com/11308147/92510188-6a1adf80-f246-11ea-9261-30cd18094abc.png)


- 사용하고자 하는 API를 선택 후, 자세한 정보를 보시면, HTTP Request는 이렇게 되는 것을 알 수 있습니다.
    ![api상세정보](https://user-images.githubusercontent.com/11308147/92510533-f6c59d80-f246-11ea-99b7-92febe25a556.png)
  - 지원하지 않는 속성들, Query Parameter를 통해 상세한 정보를 요청할 수 있는 parameter를 알 수 있습니다. 
  - Example Query를 통해 어떻게 api를 요청하고 받을 수 있는지 쉽게 되어 있습니다. 

- 한국 시간 기준으로는 바로 그 날의 정보가 업데이트 되지 않는 경우가 있어서 
    - 제 경우에는 그 날의 정보가 없으면 어제 것을 api 요청해서 보여주도록 Application을 작성하였습니다. 
- 또한, API를 테스트 해 본 결과, 한국 시간으로 새벽부터 오전까지는 그날의 API 결과가 빈 칸으로 나와서 API 정보 업데이트 시간이 달라서 그렇구나 생각해, 두 번 요청을 통해서 작성하였습니다.
    - 첫 번째 요청을 통해서 오늘 API가 업데이트가 되었는지 Title이 빈칸인지 아닌지를 체크하고
    - 빈 칸이라면, 다시 어제 날짜의 api 결과를 가져오도록 get 요청을 합니다.  


## 아쉬운 부분 

- 처음에는 go framework인 gin으로 구현해서 시도했지만, gin framework에서의 cors 정책을 어떻게 정의해야 하고 사용해야 할 지 몰라서 다시 node.js로 구현한 부분이 개인적으로 많이 아쉽습니다. 

- 결국, 로컬에서 직접 & 컨테이너 만들어서 테스트 해 본 것과는 달리, 클라이언트에서 서버로 get 요청 시, localhost가 아닌 올라간 서버의 주소를 직접 하드코딩 해서 넣어 자원을 요청해 받아 화면에 뿌려주는 방식으로 해결했습니다. 

- 웹 크롤링을 시도해서 이전부터 있던 api 결과 정보들을 가져오는 방식을 하려했지만, NASA라서 하기가 힘들었던 부분

## 기술 스택 

- React 
- Express 
