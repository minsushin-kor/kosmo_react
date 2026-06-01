
// function 형 component >> 함수명의 첫 글자는 대문자로
import {useEffect, useState} from "react";

function Test(){
    const[count, setCount]=useState(1)

    useEffect(() => {
     console.log('use effect 실행');
    }, [count]);

    function fn(){
        console.log("click");
        setCount(count + 1);
        console.log(count);
    }

    //return 안에 html 태그 작성
    return (
        <>
        <h3>Test Page</h3>
        <button onClick={fn}>CLICK</button>
        <div>{count}</div>
        </>
    )
}
export default Test;