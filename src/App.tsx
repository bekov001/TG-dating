import { useState, useEffect } from 'react';

import "./App.css"


import { WebAppProvider, useExpand, useSwitchInlineQuery, WebAppUser, useWebApp, } from '@vkruglikov/react-telegram-web-app';


import { client } from './socket.ts';

import dayjs from 'dayjs'
import  utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Loading from './components/Pages/Loading.tsx';




// import ReactGA from 'react-ga';

import ReactGA from 'react-ga4';
import Main from './components/Pages/Main.tsx';
import BanPC from './components/Pages/BanPC.tsx';

// ReactGA.initialize('Your-Measurement-ID');
const TRACKING_ID = "G-M462NNXKGD"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Europe/London");

// const images = import.meta.glob('../public/images', { eager: true });
// console.log(images)
// const imageList = images.keys().map((image : any) => {return (image)});
const imageList: any = [];

const overflow = 0
document.body.style.overflowY = 'scroll'



// window.scrollTo(0, overflow)

function App() {
  const [showComponent, setShowComponent] = useState(0);
  const [isExpanded, expand] = useExpand();
  const [webApp, setWebApp] = useState({});
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    age_range: ""
  });
  const [loadingTasks, setLoadingTasks] = useState(true);
  const width = (window.innerWidth);
  // const WebApp = useWebApp(); 
  const WebApp = {  enableClosingConfirmation(): number {
    return 0;
},
platform: 'ios', 'initData': 'query_id=AAFVoUs6AAAAAFWhSzow03Js&user=%7B%22id%22%3A978035029%2C%22first_name%22%3A%22Anuarka%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22anuarka1%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1719298675&hash=a91e0aabe62d449f116ba68f69aca936213808d5ca4cca69d1d881d77238067b'}
  const [balance, setBalance] = useState(0);
  const [status, setStatus] = useState("NOT_STARTED");
  const [timeLeft, setTimeLeft] = useState("");
  const [age, setAge] = useState([18, 25]);
  const [value, setValue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [rewards, setRewards] = useState([]);
  const [currentDay, setCurrentDay] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [dailyReward, setDailyReward] = useState(0);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [earned, setEarned] = useState(0);
  const [userID, setUserID] = useState(0)
  const [showReceivedNotification, setShowReceivedNotification] = useState(false);
  const [tasks, setTasks] = useState<any>([])
  const [showDailyReward, setShowDailyReward] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showError, setShowError] = useState(false);
  const [place, setPlace] = useState('0');
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [refBalance, setRefBalance] = useState(0);
  const [language, setLanguage] = useState("RU");
  const [username, setUsername] = useState("Михаил З.")
  const [avatar, setAvatar] = useState("Михаил З.")
  // const pushed = [];
  let total = 0;
  function setLoaded(){
    total++;
    // pushed.push(1)
  }

  function leaderbord(){
    setShowComponent(3)
    // setShowLeaderBo
  }

  function game(){
    setShowComponent(4)
    // setShowLeaderBo
  }

  function gameEnd( score: number, balance: number) {

    setGameScore(score);
    setBalance(balance)
  }

  function home(){
    setShowComponent(1)
    getPlaceToday()
    // setShowLeaderBo
  }


  let jwt = "";
  const claim = () => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.post('/user/farming/collect', {}, header).then(function (response) {
      const data = response.data;
      setBalance(data.user.balance)
      setStatus("NOT_STARTED")
    });
  }

  const getPlaceToday = () => {
    const header = { 
      headers: { Authorization:localStorage.getItem('jwt') } ,
      params: {
        ranking_period: 'daily',
        ranking_type: 'game'
      }
    };
    client.get('/user/ranking/getUserRankingInfo', header).then(function (response) {
      const data = response.data;
      setPlace(data.place)

    });
  }

  const claimTask = (id: number) => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.post('/user/bonusTasks/claim', {bonus_task_id: id}, header).then(function (response) {
      const data = response.data;
      setBalance(data.user.balance);
      setShowTask(false)
      // console.log(tasks)
      setDailyReward(tasks.find((elem: any) => elem.id === id).reward_amount)
      // if ()
      setShowReceivedNotification(true);
      setTimeout(() => setShowReceivedNotification(false), 3000);

      getUncompletedTasks();
      // setStatus("NOT_STARTED")
    }).catch((error) => {
      setShowError(true)
      setTimeout(() => setShowError(false), 2500);
    });
  }
  
  const startGame = () => {
    setEnergy(energy - 1)
  }

  const click = () => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.post('/user/farming/start', {}, header).then(function (response) {
      // setStatus("NOT_STARTED")
      const data = response.data;
      setStatus(data.user.farming.status)
      intervals(data)
    });

  }

  const getCurrent = () => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.get('/user/rewards/daily/getCurrent', header).then(function (response) {
      // setStatus("NOT_STARTED")
      const data = response.data;
      setClaimed(data.is_claimed)
      setDailyReward(data.reward.reward)
      setCurrentDay(data.reward.day)
      getRefInfo();
    });

  }

  const getUncompletedTasks = () => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.get('/user/bonusTasks/getUncompleted', header).then(function (response) {
      // setStatus("NOT_STARTED")
      const data = response.data;
      setTasks(data.bonus_tasks)
      
      
    });

  }

  const getRefInfo = () => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.get('/user/referrals/stats', header).then(function (response) {
      // setStatus("NOT_STARTED")
      const data = response.data;
      setFriends(data.levels)
      setLoading(false);
      // setEarned(data.total_earned)
      // getUncompletedTasks();
    });

  }

  const changeFilter = (value: number[]) => {
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.post('/user/account/setFilter', {
        type: "age",
        value: {"from": value[0], "to": value[1]}
    }, header).then(function (response) {
      // setStatus("NOT_STARTED")
      const data = response.data;
      setAge(value)
      // // setCurrentDay(data.user.day)
      // setClaimed(true)
      // setShowReceivedNotification(true);
      // setTimeout(() => setShowReceivedNotification(false), 3000)
      // getCurrent();
    });

  }

  


  const updateValue = (start:string, duration: number) => {
    var offset = new Date().getTimezoneOffset();
    let now = dayjs().tz("Europe/London");
    const start_date = dayjs(start).add(-offset, "m");
    const minutes = now.diff(start_date, "m");
    setValue(Math.floor((minutes / (duration * 60)) * 100))
  } 

  

  const updateCoins = (second_m: number, start:string, hour_m: number) => {
    var offset = new Date().getTimezoneOffset();
    let now = dayjs().tz("Europe/London");
    const start_date = dayjs(start).add(-offset, "m");
    const hours = (now.diff(start_date, "h"));
    const seconds =  (now.diff(start_date, "s")) - hours * 60 * 60 ;
    
   
    const minedCoins =  hours * hour_m + (seconds) * second_m;
    // setMined(minedCoins.toFixed(2))
  }

  const updateButton = (hours: number, start:string, duration: number) => {
    var offset = new Date().getTimezoneOffset();
    let now = dayjs().tz("Europe/London");

    // console.log(moment.tz.guess(true));

    const start_date = dayjs(start).add(-offset, "m");
    const minutes = duration * 60 - now.diff(start_date, "m") - 1;
    const minutes_left = (minutes % 60);
    const hours_left = (minutes === 0? 0 : (minutes / 60) - (minutes / 60) % 1);

    setTimeLeft((hours_left < 10 ? "0" : "") + hours_left + "h " + (minutes_left < 10 ? "0" : "") + minutes_left + "m")
    // console.log(start_date, now, (now.diff(start_date, "m")))
    if ((now.diff(start_date, "m")) + 1 >  duration * 60) {
      setStatus("FINISHED")
    }
  }

  function intervals(data: any) {
    updateButton(data.user.farming.duration_hours, data.user.farming.started_at, data.user.farming.duration_hours)
    const interval1 = setInterval(() => updateButton(data.user.farming.duration_hours, data.user.farming.started_at, data.user.farming.duration_hours), 60000)

    updateCoins(data.user.farming.second_mining_rate, data.user.farming.started_at, data.user.farming.hour_mining_rate)
    const interval2 = setInterval(() => updateCoins(data.user.farming.second_mining_rate, data.user.farming.started_at, data.user.farming.hour_mining_rate), 1000)
    

    updateValue(data.user.farming.started_at, data.user.farming.duration_hours)
    const interval3 =setInterval(() =>  updateValue(data.user.farming.started_at, data.user.farming.duration_hours), (data.user.farming.duration_hours * 60 * 60 * 10))
    
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3)
    }
  }



  const login = () => {
    const config : any = {
      'init_data': WebApp.initData,
    }
    console.log(WebApp.initData)
  client.post('/user/account/login', config).then(function (response) {
    const data = response.data;
    jwt = data.jwt_token;
    setWebApp(data.webapp_auth_data);
    // setUsername
    localStorage.setItem("jwt", 'Bearer ' + jwt);
    getMe()
  });




  
  

  
  }

  function getMe(){
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.get('/user/account/getMe', header).then(function (response) {
      const data = response.data;
      setLoading(false)
      setUser(data.user)
      console.log(data.user)
      setAge([data.user.age_range.from_age, data.user.age_range.to_age])
      // setBalance(data.user.balance)
      // setStatus(data.user.farming.status)
      // setStartTime(data.user.farming.started_at)
      // setCurrentDay(data.user.current_daily_reward)
      // setGameScore(data.user.game_alltime_highscore)
      // setEnergy(data.user.game_energy);
      // setRefBalance(data.user.referral_balance);
      setLanguage(data.user.language)
      // if (data.user.farming.status === "IN_PROGRESS"){
      //   // console.log()
      //   intervals(data)
      // }
      // getPlaceToday();
      // getRewards()
      setUserID(data.user.id)
      setUsername(data.user.name)
      // setTotalProfit(data.user.farming.total_profit)
  });
  }

  function getRewards(){
    const header = { headers: { Authorization:localStorage.getItem('jwt') } };
    client.get('/user/rewards/daily/getAll', header).then(function (response) {
      const data = response.data;
      getCurrent()
      setRewards(data.rewards)
  });
  }

  useEffect(() => {
    WebApp.enableClosingConfirmation()

    const scrollableEl = document.getElementById('app-scrollable')

    let ts: number | undefined
    const onTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      if (scrollableEl) {
        // console.log(
        //   'sad'
        // )
        const scroll = scrollableEl.scrollTop
        const te = e.changedTouches[0].clientY
        if (scroll <= 0 && ts! < te + 100) {
          // e.preventDefault()
        }
      } else {
        e.preventDefault()
      }
    }
    document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false })
    document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false })

   
    return () => {
      // setupDocument(false)
      document.documentElement.removeEventListener('touchstart', onTouchStart)
      document.documentElement.removeEventListener('touchmove', onTouchMove)
     
    }
    }
    , [showComponent])

  useEffect(() => {
    // expand();
    // if (WebApp) {WebApp.setHeaderColor("#2b96b9")}
    setTimeout(() => setLoading(false), 3000)
    const loadImage = (image: any) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image()
        loadImg.src = image.replace("./", "images/")
        
        // wait 2 seconds to simulate loading time
        loadImg.onload = () =>
          setTimeout(() => {
            // console.log("i", image)
            resolve(image.replace("./", "images/"))
          }, 2000)

        loadImg.onerror = err => reject(err)
      })
    }

    Promise.all(imageList.map((image: any) => loadImage(image)))
      .then(() => setAllImagesLoaded(true))
      .catch(err => console.log("Failed to load images", err))

    login();
    setInterval(() => login(), 60 * 60 * 1000)
    
  }, [])

  useEffect(() => {
    // Your code that you want to run whenever the info stat is changed
    expand()
},[isExpanded])

// useEffect(() => {
//   // Your code that you want to run whenever the info stat is changed
//   if (loading || !allImagesLoaded) {WebApp.setHeaderColor("#fdc122")}
//   else if (showComponent === 1) {WebApp.setHeaderColor("#2b96b9")}
//   else {WebApp.setHeaderColor("#fdc122")}
// },[showComponent, loading])


  // ebApp.platform !== 'unknown' WebApp.platform != "tdesktop" && WebApp.platform != "weba" && WebApp.platform !== 'web'

  if (WebApp.platform === "weba" || WebApp.platform === 'unknown' || WebApp.platform === 'web' ||  WebApp.platform === 'tdesktop') {
    // if (false){
  return (
      <WebAppProvider>
      <div>
        <BanPC></BanPC>
      </div>
      </WebAppProvider>
    );
  } else {
   {

  
      return (
        <WebAppProvider>
        <div>
          {loading ? <Loading platform={WebApp.platform}></Loading> : ""}
          {<Main changeFilter={changeFilter} age={age} user={user}></Main>}
          {/* {!loading  && allImagesLoaded && showComponent !== 4 ? <Tabs  setShowComponent={setShowComponent} showComponent={showComponent}></Tabs> : ""} */}
        </div>
        </WebAppProvider>
      ); }
  }

}


export default App;