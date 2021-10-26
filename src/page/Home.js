import React, { useEffect, useState } from "react";
import Search from "../component/Search";
import Manage from "../component/Manage";
import Main from "../component/Main";
import Header from "../component/Header";
import AppTemplate from "../component/AppTemplate";
import { fetchAllPredictData } from "../lib/api";
import { getLocalStorageItem, setLocalStorageItem } from "../lib/util";

function Home() {
    useEffect(async () => {
        // 계산안된 로컬 주식 목록들
        const undoneList = getLocalStorageItem("PREDICT_LIST").filter(
            (item) => item.isDone === false
        );
        console.log("Home: ", undoneList);

        // 계산완료한 주식 목록 받음
        const calcDoneStocks = await fetchAllPredictData(undoneList);
        console.log("fetch: ", calcDoneStocks);

        // 계산완료한 주식 목록을 로컬로 업데이트
        let nextPredictList = getLocalStorageItem("PREDICT_LIST");
        calcDoneStocks.forEach((predictData) => {
            const targetIdx = nextPredictList.findIndex(
                (item) => item.name === predictData.data.name
            );
            const targetItem = nextPredictList[targetIdx];
            nextPredictList[targetIdx] = {
                ...targetItem,
                isDone: true,
                predictResult: predictData,
            };
        });
        setLocalStorageItem("PREDICT_LIST", nextPredictList);
        return console.log("home dismounted");
    });

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
            <Header />
            <Main onManageOpen={onManageOpen} onSearchOpen={onSearchOpen} />
            <Manage isManageOpen={isManageOpen} onManageQuit={onManageQuit} />
            <Search
                isSearchOpen={isSearchOpen}
                setIsSearchOpen={setIsSearchOpen}
            />
        </AppTemplate>
    );
}
const testCalcDoneStocks = [
    {
        200: "Success",
        data: {
            name: "카카오",
            accuracy: 0.0181183852,
            data: {
                Open: {
                    "D+1": 120091.849609375,
                    "D+2": 120051.849609375,
                    "D+3": 120071.849609375,
                    "D+4": 120093.849609375,
                    "D+5": 120041.849609375,
                    "D+6": 120231.849609375,
                },
                High: {
                    "D+1": 121249.166015625,
                    "D+2": 121319.166015625,
                    "D+3": 121229.166015625,
                    "D+4": 121210.166015625,
                    "D+5": 121329.166015625,
                    "D+6": 121459.166015625,
                },
                Low: {
                    "D+1": 120015.6015625,
                    "D+2": 129315.6015625,
                    "D+3": 120025.6015625,
                    "D+4": 120010.6015625,
                    "D+5": 120325.6015625,
                    "D+6": 120455.6015625,
                },
                Close: {
                    "D+1": 119292.80859375,
                    "D+2": 114338.80859375,
                    "D+3": 115323.80859375,
                    "D+4": 116330.80859375,
                    "D+5": 119329.80859375,
                    "D+6": 120458.80859375,
                },
                Volume: {
                    "D+1": 2089179,
                    "D+2": 3089379,
                    "D+3": 3089129,
                    "D+4": 3089170,
                    "D+5": 3089329,
                    "D+6": 3089459,
                },
            },
            id: 1632410113788,
        },
    },
    {
        200: "Success",
        data: {
            name: "카카오게임즈",
            accuracy: 0.0181183852,
            data: {
                Open: {
                    "D+1": 120091.849609375,
                    "D+2": 120051.849609375,
                    "D+3": 120071.849609375,
                    "D+4": 120093.849609375,
                    "D+5": 120041.849609375,
                    "D+6": 120231.849609375,
                },
                High: {
                    "D+1": 121249.166015625,
                    "D+2": 121319.166015625,
                    "D+3": 121229.166015625,
                    "D+4": 121210.166015625,
                    "D+5": 121329.166015625,
                    "D+6": 121459.166015625,
                },
                Low: {
                    "D+1": 120015.6015625,
                    "D+2": 129315.6015625,
                    "D+3": 120025.6015625,
                    "D+4": 120010.6015625,
                    "D+5": 120325.6015625,
                    "D+6": 120455.6015625,
                },
                Close: {
                    "D+1": 119292.80859375,
                    "D+2": 114338.80859375,
                    "D+3": 115323.80859375,
                    "D+4": 116330.80859375,
                    "D+5": 119329.80859375,
                    "D+6": 120458.80859375,
                },
                Volume: {
                    "D+1": 2089179,
                    "D+2": 3089379,
                    "D+3": 3089129,
                    "D+4": 3089170,
                    "D+5": 3089329,
                    "D+6": 3089459,
                },
            },
            id: 1632410113788,
        },
    },
];
export default Home;
