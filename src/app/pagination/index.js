import React, { useCallback } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationLayout from "../../components/pagination-layout";
import PaginationBtn from "../../components/pagination-btn";

function Pagination() {

  const store = useStore();

  const select = useSelector(state => {
    return ({
      current: state.catalog.pages.current,
      last: state.catalog.pages.last,
    })
  }, 'Pagination');

  const callbacks = {
    changeActiveNum: (num) => {
      store.actions.catalog.changeActiveNumPage(num)
    }
  }

  const renders = {
    firstBlock: (num) => {
      const temp = [];
      for (let i = 2; i <= num; i++) {
        temp.push(<PaginationBtn num={i} isActive={i===select.current} onclick={callbacks.changeActiveNum} key={i}/>)
      }
      return ( <>{[...temp]} ... </> )
    },
    middleBlock: (num) => {
      const temp = [];
      for (let i = num - 1; i <= num+1; i++) {
        temp.push(<PaginationBtn num={i} isActive={i===select.current} onclick={callbacks.changeActiveNum} key={i}/>)
      }
      return ( <>... {[...temp]}... </> )
    },
    lastBlock: (num) => {
      const temp = [];
      for (let i = num+1; i <= num+3; i++) {
        temp.push(<PaginationBtn num={i} isActive={i===select.current} onclick={callbacks.changeActiveNum} key={i}/>)
      }
      return ( <>... {[...temp]} </> )
    }
  }

  return (
    <PaginationLayout >
      <PaginationBtn num={1} isActive={select.current===1} onclick={callbacks.changeActiveNum}/>
      {
        select.current < 4
        ? (renders.firstBlock(select.current < 3 ? 3 : 4))
        : select.current > select.last - 3
        ? renders.lastBlock(select.last - select.current < 3 ? select.last - 4 : select.last - 3)
        : (renders.middleBlock(select.current))
      }
      <PaginationBtn num={select.last} isActive={select.current===select.last} onclick={callbacks.changeActiveNum}/>
    </PaginationLayout>
  )
}

export default React.memo(Pagination);