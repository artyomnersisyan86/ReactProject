import React, {useState} from "react"
import s from "./Paginator.module.css"
import cn from "classnames"

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    currentPage: number,
    portionSize?: number
}

let Paginator:React.FC<PropsType> = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = pagesCount / portionSize;
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;
    return (
        <div>

            {/*<div className={s.paginationCursor}>*/}
            <div className={cn(s.paginationCursor)}>
                {portionNumber > 1 &&
                // <button className={`${s.paginatorButton} ${s.paginatorLeftButtonBorderRadius}`} onClick={() => {
                <button className={cn(s.paginatorButton, s.paginatorLeftButtonBorderRadius)} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>}
                {pages.filter((p) => {
                    return p >= leftPortionPageNumber && p <= rightPortionNumber
                })
                    .map(p => {
                        return <span key={p} onClick={(e) => {
                            onPageChanged(p)
                        }}
                            // className={currentPage === p ? s.selectedPage : s.paginatorPage}>{p}</span>
                                     className={cn({
                                             [s.selectedPage]: currentPage === p,
                                         }, s.paginatorPage
                                     )}>{p}</span>
                    })}
                {portionCount > portionNumber &&
                <button className={`${s.paginatorButton} ${s.paginatorRightButtonBorderRadius}`} onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>}
            </div>
        </div>
    )
}
export default Paginator;