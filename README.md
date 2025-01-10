## 영화 검색 및 선호작 관리 애플리케이션

- OMDB API를 사용하여 영화를 검색하고, 선호작을 추가 및 삭제 하는 간단한 React 애플리케이션

## [배포 사이트](https://movie-app-ch9729.netlify.app/)

## 주요 기능

1. 영화 검색

- 사용자가 검색어를 입력하면 OMDB API를 통해 관련 영화 목록을 가져온다.
- 검색 결과는 포스터와 함께 화면에 표시

2. 선호작 추가

- 검색된 영화 중 좋아하는 영화를 클릭하여 선호작 목록에 추가할 수 있다.
- 중복 추가 방지를 위한 알림 기능 추가

3. 선호작 제거

- 선호작 목록에서 영화를 제거할수 있다.

4. 로컬 스토리지 연동

- 사용자의 선호작 목록은 브라우저의 로컬 스토리지에 저장되어 애플리케이션을 닫아도 유지

## 주요 코드 설명

1. OMDB API 요청

```javaScript
const url = `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${search}`;
const response = await fetch(url);
const jsonData = await response.json();
setMovies(jsonData.Search);
```

2. 로컬 스토리지 연동

```javaScript
function saveToLocalStorage(items) {
  localStorage.setItem("favorites", JSON.stringify(items));
}

useEffect(() => {
  const movieLikes = JSON.parse(localStorage.getItem("favorites"));
  if (movieLikes) {
    setFavorites(movieLikes);
  }
}, []);
```

3. 검색 필터링

```javaScript
useEffect(() => {
  if (searchValue.length >= 3) {
    getMovieRequest(searchValue);
  }
}, [searchValue]);
```

## Netlify를 통한 배포 방법

1. Nettlify에 로그인

- 웹사이트에서 계정을 생성하거나 로그인

2. 새 사이트 생성

- 대시보드에 "Add new site" 클릭 후 "Import an existing project"

3. GitHub 레포지토리 연결

- GitHub 계정을 Netlify에 연결하고, 배포할 레포지토리를 선택

4. 빌드 설정

- 터미널에 `npm run build` 입력
- dist 폴더가 생성된 것을 확인

5. 웹서버 실행하기

- 터미널에 `npm i-g serve`
- 빌드폴더의 내용을 `serve -s build` 로 배포하기

6. Nettlify 사이트 환경 변수 설정

- 생성한 사이트에 "Site configuration" 안에 "Environment variables"에 접근
- "Add a variable" 클릭
- Key에는 해당 키 명 입력, Values에는 API키 값 입력

7. 배포 시작

- "Deploy site" 클릭하여 배포를 시작

---

![Example GIF](./public/example.gif)
