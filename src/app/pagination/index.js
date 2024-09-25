import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {cn as bem} from  '@bem-react/classname';
// import './style.css'
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import PaginationLayout from "../../components/pagination-layout";
import PaginationBtn from "../../components/pagination-btn";

function Pagination({children}) {

  const cn = bem('Pagination');

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

  return (
    <PaginationLayout >
      <PaginationBtn num={1} />
      {
        select.current === 1
        ? (
            <>
              <PaginationBtn num={select.current + 1} onclick={callbacks.changeActiveNum}/>
              <PaginationBtn num={select.current + 2} onclick={callbacks.changeActiveNum}/>
            </>
        )
        : (
          select.current === 2
          ? (
            <>
              <PaginationBtn num={select.current} isActive={true} onclick={callbacks.changeActiveNum}/>
              <PaginationBtn num={select.current + 1} onclick={callbacks.changeActiveNum}/>
            </>
          )
          : ( 
            select.current === 3
            ? (
                <>
                  <PaginationBtn num={select.current - 1} onclick={callbacks.changeActiveNum}/>
                  <PaginationBtn num={select.current} isActive={true} onclick={callbacks.changeActiveNum}/>
                  <PaginationBtn num={select.current + 1} onclick={callbacks.changeActiveNum}/>
                </>
            ) : (
                <>
                  <>...</>
                  <PaginationBtn num={select.current - 1} onclick={callbacks.changeActiveNum}/>
                  <PaginationBtn num={select.current} isActive={true}  onclick={callbacks.changeActiveNum}/>
                  <PaginationBtn num={select.current + 1} onclick={callbacks.changeActiveNum}/>
                </>
            )
          )
        )

      }
      <>...</>
      <PaginationBtn num={select.last}/>
    </PaginationLayout>
  )
}

export default React.memo(Pagination);