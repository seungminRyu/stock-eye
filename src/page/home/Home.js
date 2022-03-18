import React from "react";
import Search from "../../components/home/Search";
import Manage from "../../components/home/Manage";
import HomeMain from "../../components/home/HomeMain";
import HomeBanner from "../../components/home/HomeBanner";
import AppTemplate from "../../components/AppTemplate";
import useHome from "../hooks/useHome";
// import { fetchAllPredictData } from "../lib/api";
// import { getLocalStorageItem, setLocalStorageItem } from "../lib/util";

function Home() {
    // 서버의 연산 완료여부를 확인하기 위해
    // setInterval로 주기적으로 요청 보낸다.
    // 서버없으므로 사용 X
    // const [inter, setInter] = useState(null);

    // if (inter === null) {
    //     setInterval(async () => {
    //         // 계산안된 로컬 주식 목록들
    //         const undoneList = getLocalStorageItem("PREDICT_LIST").filter(
    //             (item) => item.isDone === false
    //         );
    //         console.log("undone: ", undoneList);
    //         // 계산완료한 주식 목록 받음
    //         const calcDoneStocks = await fetchAllPredictData(undoneList);
    //         // const testCalcDoneStocks = [
    //         //     {
    //         //         accuracy: 0,
    //         //         data: "Data Length Error !",
    //         //         id: 1635303977236,
    //         //         name: "카카오뱅크",
    //         //     },
    //         // ];
    //         console.log("fetch: ", calcDoneStocks);

    //         // 계산완료한 주식 목록을 로컬로 업데이트
    //         let nextPredictList = getLocalStorageItem("PREDICT_LIST");
    //         calcDoneStocks.forEach((predictData) => {
    //             const targetIdx = nextPredictList.findIndex(
    //                 (item) => item.name === predictData.name
    //             );
    //             const targetItem = nextPredictList[targetIdx];
    //             nextPredictList[targetIdx] = {
    //                 ...targetItem,
    //                 isDone: true,
    //                 predictResult: predictData,
    //             };
    //         });
    //         console.log("next: ", nextPredictList);
    //         setLocalStorageItem("PREDICT_LIST", nextPredictList);
    //         return console.log("home dismounted");
    //     }, 5000);

    //     setInter(true);
    // }
    const [
        isManageOpen,
        isSearchOpen,
        setIsManageOpen,
        setIsSearchOpen,
        onManageOpen,
        onSearchOpen,
    ] = useHome();

    return (
        <AppTemplate>
            <HomeBanner />
            <HomeMain onManageOpen={onManageOpen} onSearchOpen={onSearchOpen} />
            <Manage
                isManageOpen={isManageOpen}
                setIsManageOpen={setIsManageOpen}
            />
            <Search
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
        </AppTemplate>
    );
}

export default Home;
