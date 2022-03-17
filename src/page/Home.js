import React, { useEffect, useState } from "react";
import Search from "../components/Search";
import Manage from "../components/Manage";
import HomeMain from "../components/home/HomeMain";
import HomeBanner from "../components/home/HomeBanner";
import AppTemplate from "../components/AppTemplate";
import { fetchAllPredictData } from "../lib/api";
import { getLocalStorageItem, setLocalStorageItem } from "../lib/util";

function Home() {
    const [inter, setInter] = useState(null);

    if (inter === null) {
        setInterval(async () => {
            // 계산안된 로컬 주식 목록들
            const undoneList = getLocalStorageItem("PREDICT_LIST").filter(
                (item) => item.isDone === false
            );
            console.log("undone: ", undoneList);
            // 계산완료한 주식 목록 받음
            const calcDoneStocks = await fetchAllPredictData(undoneList);
            // const testCalcDoneStocks = [
            //     {
            //         accuracy: 0,
            //         data: "Data Length Error !",
            //         id: 1635303977236,
            //         name: "카카오뱅크",
            //     },
            // ];
            console.log("fetch: ", calcDoneStocks);

            // 계산완료한 주식 목록을 로컬로 업데이트
            let nextPredictList = getLocalStorageItem("PREDICT_LIST");
            calcDoneStocks.forEach((predictData) => {
                const targetIdx = nextPredictList.findIndex(
                    (item) => item.name === predictData.name
                );
                const targetItem = nextPredictList[targetIdx];
                nextPredictList[targetIdx] = {
                    ...targetItem,
                    isDone: true,
                    predictResult: predictData,
                };
            });
            console.log("next: ", nextPredictList);
            setLocalStorageItem("PREDICT_LIST", nextPredictList);
            return console.log("home dismounted");
        }, 5000);

        setInter(true);
    }

    const [isManageOpen, setIsManageOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const onManageOpen = () => {
        const activateManage = () => setIsManageOpen(true);
        activateManage();
    };

    const onManageQuit = () => {
        const deactivateManage = () => setIsManageOpen(false);
        deactivateManage();
    };

    const onSearchOpen = () => {
        const activateSearch = () => setIsSearchOpen(true);
        activateSearch();
    };

    return (
        <AppTemplate>
            <HomeBanner />
            <HomeMain onManageOpen={onManageOpen} onSearchOpen={onSearchOpen} />
            <Manage isManageOpen={isManageOpen} onManageQuit={onManageQuit} />
            <Search
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
        </AppTemplate>
    );
}

export default Home;
