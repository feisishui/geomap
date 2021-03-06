import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { DOMParser } from 'xmldom';

import startLocSrc from '../images/icon_起.png';
import endLocSrc from '../images/icon_终.png';

import styles from './BusLineResult.css';

const Panel = Collapse.Panel;

function html2Escape(sHtml) {
  return sHtml.replace(/<[^<>]+?>/g, ''); //删除所有HTML标签
}

function toDecimal(x) {
  var f = parseFloat(x / 1000);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(f * 10) / 10;
  return f;
}

  const RideLineResult = props => {

  function handleSwitchLine(key) {
    if (key) {
      const index = key.replace('rideline-', '');
      props.dispatch({ type: 'search/drawBusLine', payload: index });
    }
  }

  function highlightSegment(index) {
    props.dispatch({ type: 'search/highlightSegment', payload: index });
  }

  function renderLineDetails(line) {
    const details = [];

    // start
    details.push(
      <div className={styles.lineDetailWrap} key="linedetail-start">
        <span className={styles.lineDetailStartIconWrap} />
        <img alt="" src={startLocSrc} className={styles.lineDetailStartIcon} />
        <div className={styles.lineDetailContentWrap}>
          <div className={styles.lineDetailStartContent}>起点</div>
        </div>
      </div>
    );

    line.steps.forEach((segment, index) => {
      const { instruction, name, distance } = segment;
      const zhuan = html2Escape(instruction);
      details.push(
        <div className={styles.lineDetailBusWrap} key={`linedetail-${index}`}>
          <span className={styles.lineDetailBusIconWrap} />
          <div className={styles.lineDetailContentWrap}>
            <div className={styles.lineDetailBusLineSolution}>
              <span>{name}</span>
            </div>
            <div
              className={styles.lineDetailSegment}
              onMouseDown={() => this.highlightSegment(index)}
            >
              <div className={styles.lineDetailBusLine}>{zhuan}</div>
            </div>
          </div>
        </div>
      );
    });
    // end
    details.push(
      <div className={styles.lineDetailWrap} key="linedetail-end">
        <span className={styles.lineDetailEndIconWrap} />
        <img alt="" src={endLocSrc} className={styles.lineDetailEndIcon} />
        <div className={styles.lineDetailContentWrap}>
          <div className={styles.lineDetailStartContent}>终点</div>
        </div>
      </div>
    );

    return <div>{details}</div>;
  }

  function renderLines() {
    if (props.search.rideresult) {
      return (
        <Panel
          key="rideline-result"
          header={
            <div className={styles.headerWrap}>
              <div className={styles.lineSubject}>
                规划路径
              </div>
              <div className={styles.lineDesc}>
                <span>
                  约<strong>{Math.round(props.search.rideresult.duration / 60)}</strong>
                  分钟
                </span>
                <span className={styles.lineDescSep}>|</span>
                <span>
                  约<strong>{toDecimal(props.search.rideresult.distance)}</strong>
                  公里
                </span>
              </div>
            </div>
          }
        >
          {renderLineDetails(props.search.rideresult)}
        </Panel>
      );
    }

    return [];
  }

  
    return (
      <div className={styles.wrap}>
        {/* <Scrollbars style={{ height: 400 }}> */}
          <Collapse accordion onChange={handleSwitchLine} className="busline-result-collapse">
            {renderLines()}
          </Collapse>
        {/* </Scrollbars> */}
      </div>
    );
}

export default connect(({ search }) => {
  return {search};
})(RideLineResult);
