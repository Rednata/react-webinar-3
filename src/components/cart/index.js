import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from "../head";
import Controls from "../controls";
import List from "../list";
import { separateDigits } from "../../utils";

function Cart({
  title="", sum=0, countCart=0, controlTitle="", controlFunc=()=> {}, children=""
}) {

  return (
    <div className="Cart">
      <div className="Cart-head">
        <Head title={title}></Head>
        <Controls controlTitle={controlTitle} controlFunc={controlFunc}/>
      </div>
      <div className="Cart-content">
        {countCart ?
          children :
          <p className="Cart-empty">В корзине пусто</p>
        }
      </div>
      <div className="Cart-footer">
        {sum ?
          (
            <>
              <span>Итого </span>
              <span>{separateDigits(sum)}&nbsp;₽</span>
            </>
          ) : (
            ''
          )
        }
       </div>
    </div>
  )
}

export default React.memo(Cart);

Cart.propTypes = {
  title: PropTypes.string,
  sum: PropTypes.number,
  countCart: PropTypes.number,
  controlTitle: PropTypes.string,
  controlFunc: PropTypes.func,
  children: PropTypes.node,
};