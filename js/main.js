window.onload = function () {
  // 메뉴기능
  const nav = document.querySelector(".nav");
  const btMenu = document.querySelector(".bt-menu");
  const navClose = document.querySelector(".nav-close");
  btMenu.addEventListener("click", function () {
    // 클래스를 nav에 추가하고 싶다.
    nav.classList.add("nav-active");
  });
  navClose.addEventListener("click", function () {
    nav.classList.remove("nav-active");
  });
  nav.addEventListener("mouseleave", function () {
    nav.classList.remove("nav-active");
  });
  // 스크롤 기능
  // 스크롤바 상단위치
  let scy = 0;
  let scActive = 50;
  scy = window.document.documentElement.scrollTop;
  let header = document.querySelector(".header");
  let logoW = document.querySelector(".logo-w");
  let logoG = document.querySelector("logo-g");
  header.addEventListener("mouseenter", function () {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  });
  header.addEventListener("mouseleave", function () {
    if (scy < scActive) {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });
  // 새로고침시 적용
  if (scy > scActive) {
    header.classList.add("header-active");
    logoW.style.display = "none";
    logoG.style.display = "block";
  }
  window.addEventListener("scroll", function () {
    scy = window.document.documentElement.scrollTop;
    // console.log(scy);
    if (scy > scActive) {
      header.classList.add("header-active");
      logoW.style.display = "none";
      logoG.style.display = "block";
    } else {
      header.classList.remove("header-active");
      logoW.style.display = "block";
      logoG.style.display = "none";
    }
  });
  // 펼침 언어 기능
  const langWord = document.querySelector(".language-word");
  const language = document.querySelector(".language");
  const languageLi = document.querySelector(".language li");
  setTimeout(function () {
    languageLi.style.transition = "all 0.2s";
  }, 500);
  langWord.addEventListener("click", function () {
    language.classList.toggle("language-box-active");
  });
  // 비디오 항목을 체크(video 태그로 파악)
  let videos = document.querySelectorAll(".swVisual video");
  // console.log(video);
  // 비디오시간체크
  let videosTimeArr = [];
  for (let i = 0; i < videos.length; i++) {
    //시간을 보관
    videosTimeArr[i] = Math.ceil(videos[i].duration);
  }
  // 첫번째 비디오 자동 실행
  let videoIndex = 0;
  videos[videoIndex].play();
  // visual slide
  let swVisual = new Swiper(".swVisual", {
    Loop: true,
  });
  // 슬라이드 변경 이벤트시 처리
  swVisual.on("slideChange", function () {
    // 진행중인 비디오 멈춤
    videos[videoIndex].pause();
    // 다음 화면에 보이는 swiper 슬라이드 변화
    videoIndex = swVisual.realIndex;
    // 현재 보이는 슬라이드에 해당하는 비디오의 재생 시간을
    videos[videoIndex].currentTime = 0;
    const playPromise = videos[videoIndex].play();
    if (playPromise !== undefined) {
      playPromise.then((_) => {}).catch((error) => {});
    }
    // 방어코드
    clearInterval(videoTimer);
    videoReset();
  });
  // 비디오 영상이 플레이가 끝나면 다음 슬라이드로 이동
  // 늘어나는 흰색bar
  let bars = document.querySelectorAll(".bar");
  // 늘어나는 길이를 위한 값(최대100)
  let barScaleW = 0;
  // 타이머를 생성한다
  let videoTimer;
  function videoReset() {
    // 처음에는 0%로 만들려고 한다
    barScaleW = 0;
    // 최초에 bar 를 초기화 시킨다
    for (let i = 0; i < bars.length; i++) {
      let tag = bars[i];
      tag.style.width = `${barScaleW}%`;
    }
    // 활성화 될때 bar 클래스 선택
    let activeBar = bars[videoIndex];
    clearInterval(videoTimer);
    let videotime = videosTimeArr[videoIndex];
    videoTimer = setInterval(() => {
      barScaleW++;
      activeBar.style.width = `${barScaleW}%`;
      if (barScaleW >= 100) {
        swVisual.slideNext();
        clearInterval(videoTimer);
        videoReset();
      }
    }, videotime * 10);
  }
  videoReset();
  const visualControlli = document.querySelectorAll(".visual-control > li");
  visualControlli.forEach((item, index) => {
    item.addEventListener("click", function () {
      videoIndex = index;
      swVisual.slideTo(videoIndex);
    });
  });
  // 비지니스 슬라이드
  const swBusiness = new Swiper(".swBusiness", {
    loop: true,
    speed: 500,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });
};
